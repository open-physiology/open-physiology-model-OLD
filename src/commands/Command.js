import Graph from 'graph.js/dist/graph';
import assert from 'power-assert';
import {last, values, flattenDepth} from 'lodash-bound';
import {event, ValueTracker, property} from 'utilities';

const $$running      = Symbol('$$running');
const $$committing   = Symbol('$$committing');
const $$rollingBack  = Symbol('$$rollingBack');
const $$state        = Symbol('$$state');

export default (env) => {
	
	/**
	 *
	 */
	class Command extends ValueTracker {
	
		/* track commands */
		static commandGraph    = new Graph;
		static commandHistory  = new Array;
		static entityToCommand = new WeakMap;
		// ^ type of entityToCommand:
		//
		// entity -> {
		//     origin:        cmd,                     // Command_new or Command_load
		//     edit:        { key: [cmd] },            // Command_edit
		//     delete:        cmd,                     // Command_delete
		//     relationships: key --> entity --> [cmd] // alternate between Command_link and Command_unlink
		// }
		
		static registerEntity(entity) {
			if (!Command.entityToCommand.has(entity)) {
				Command.entityToCommand.set(entity, {
					origin: null,
					edit:   {},
					delete: null,
					relationships: {}
				});
			}
			return Command.entityToCommand.get(entity);
		}
		
		static registerEntityProperty(entity, key) {
			const e = Command.registerEntity(entity);
			if (!e.edit[key]) { e.edit[key] = [] }
			return e.edit[key];
		}
		
		static registerRelationship(entity1, key, entity2) {
			const e1 = Command.registerEntity(entity1);
			const e2 = Command.registerEntity(entity2);
			
			/* reverse key */
			// e.g., '-->HasLayer' into '<--HasLayer'
			const rKey = key.replace(/^(-->|<--)/, m => m[0] === '<' ? '-->' : '<--');
			
			/* prime the data-structures */
			if (!e1.relationships[key])  { e1.relationships[key]  = new WeakMap }
			if (!e2.relationships[rKey]) { e2.relationships[rKey] = new WeakMap }
			if (!e1.relationships[key].has(entity2)) {
				let linkUnlinkCommands = [];
				e1.relationships[key] .set(entity2, linkUnlinkCommands);
				e2.relationships[rKey].set(entity1, linkUnlinkCommands);
			}
			
			/* return the shared array of link/unlink commands */
			return e1.relationships[key].get(entity2);
		}
		
		static getDependencies(entity, arrays) {
			let result = new Set;
			let commandsToDelete = new Set;
			let e = Command.registerEntity(entity);
			/* check out the edit and link/unlink commands */
			for (let arr of arrays) {
				let cmdToDelete = null;
				while (arr::last() && arr::last().state === 'pre-run') {
					cmdToDelete = arr.pop();
				}
				if (cmdToDelete) {
					commandsToDelete.add(cmdToDelete);
				}
				if (arr.length > 0) {
					result.add(arr::last());
				}
			}
			/* if necessary, use the origin command */
			if (result.size === 0) {
				assert(!!e.origin);
				result.add(e.origin);
			}
			/* delete commands that are pre-run and would conflict with a new delete command */
			let finalCommandsToDelete = new Set(commandsToDelete);
			for (let cmdI of commandsToDelete) {
				for (let cmdJ of Command.commandGraph.verticesWithPathFrom(cmdI)) {
					finalCommandsToDelete.add(cmdJ);
				}
			}
			for (let cmd of finalCommandsToDelete) {
				Command.commandGraph.destroyVertex(cmd);
			}
			if (e.delete) {
				assert(e.delete.state === 'pre-run');
				Command.commandGraph.destroyVertex(e.delete);
			}
			/***/
			return result;
		}
		
		static getEditDependencies(entity, keys) {
			let e = Command.registerEntity(entity);
			return Command.getDependencies(entity, keys.map(key=>e.edit[key]).filter(v=>!!v));
		}
		
		static getLinkUnlinkDependencies(entity1, key, entity2) {
			let e1e2 = Command.registerRelationship(entity1, key, entity2);
			
			let dep1 = [...Command.getDependencies(entity1, [e1e2])];
			let dep2 = [...Command.getDependencies(entity2, [e1e2])];
			
			assert(dep1.length > 0 && !!dep1[0]);
			assert(dep2.length > 0 && !!dep2[0]);
			
			return new Set([...dep1, ...dep2]);
		}
		
		static getDeleteDependencies(entity) {
			let e = Command.registerEntity(entity);
			return Command.getDependencies(entity, [
				...e.edit::values(),
				...e.relationships::values().map(m=>[...m.values()])::flattenDepth(2)
			]);
		}
		
		/** @private */
		static _fringe({direction, entities = null, states = ['pre-run', 'post-run', 'post-commit']} = {}) {
			/* distinguish between earliest and latest */
			const [sourceSinks, verticesFromTo] = (direction === 'earliest')
				? ['sources', 'verticesFrom']
				: ['sinks'  , 'verticesTo'  ];
			
			/* fringe commands filtered by entity */
			let fringe = new Set([...Command.commandGraph[sourceSinks]()]
					.filter(([,cmd]) => !entities || entities.some(e => cmd.associatedEntities.has(e)))
					.map(([,cmd]) => cmd));

			/* filtering by state */
			let result = new Set;
			function process(cmd) {
				if (states.includes(cmd.state)) {
					result.add(cmd);
				} else {
					for (let [,prevCmd] of Command.commandGraph[verticesFromTo](cmd)) {
						process(prevCmd);
					}
				}
			}
			for (let cmd of fringe) { process(cmd) }
			
			/***/
			return result;
		}
		
		static earliest(options = {}) {
			return Command._fringe({
				...options,
				direction: 'earliest'
			});
		}
		
		static latest(options = {}) {
			return Command._fringe({
				...options,
				direction: 'latest'
			});
		}
		
		
		/// /// /// /// /// Instances /// /// /// /// ///
		
		@event() commitEvent;
		@event() rollbackEvent;
	
		@property({ readonly: true }) state: 'pre-run' | 'post-run' | 'post-commit';
		
		// [$$state]: ('pre-run' | 'post-run' | 'post-commit');
		// get state() { return this[$$state] }
		
		constructor({state, dependencies = []} = {}) {
			super();
			
			/* register in the command graph and history */
			Command.commandGraph.addVertex(this, this);
			for (let dep of dependencies) {
				Command.commandGraph.addEdge(dep, this);
			}
			Command.commandHistory.push(this);

			/* handle state */
			this[$$running]     = false;
			this[$$committing]  = false;
			this[$$rollingBack] = false;
			this.pSubject('state').next(state);
		}
		
		
		/// /// /// /// /// Basic methods /// /// /// /// ///
		
		get associatedEntities()    { assert(false, `The ${this.constructor.name}#associatedEntities accessor is not implemented.`) }
		localRun()                  { assert(false, "Command subclass must override 'localRun'.")                                   }
		async localCommit()         { assert(false, "Command subclass must override 'localCommit'.")                                }
		localHandleCommitResponse() { assert(false, "Command subclass must override 'localHandleCommitResponse'.")                  }
		localRollback()             { assert(false, "Command subclass must override 'localRollback'.")                              }
		
		toJSON(options = {}) { assert(false, "Command subclass must override 'toJSON'.") }
		
		/// /// /// /// /// Smart run, commit, rollback /// /// /// /// ///
		
		run() {
			if (this[$$running] || this.state !== 'pre-run') { return }
			this[$$running] = true;

			/* scheduling runs that need to happen before this one */
			// NOTE: We always have to ensure that the graph has no cycles.
			for (let [dep] of Command.commandGraph.verticesTo(this)) { dep.run() }

			/* then run this command */
			this.localRun();
			Command.commandHistory.push(this);
			this[$$running] = false;
			this.pSubject('state').next('post-run');
		}
		
		async commit() {
			assert(this.state === 'post-run', "Cannot commit a command that hasn't yet run.");
			if (this[$$committing] || this.state === 'post-commit') { return }
			this[$$committing] = true;

			/* run commits that need to happen before this one */
			await Promise.all(
				[...Command.commandGraph.verticesTo(this)]
					.map(([dep])=>dep.commit())
			);

			/* then commit this command */
			await this.localCommit();
			
			/***/
			this[$$committing] = false;
			this.pSubject('state').next('post-commit');
			// this.e('commit').next();
		}
		
		rollback() {
			assert(this.state === 'post-run', "Can only roll back a command that has been run but not committed.");
			assert(!this[$$committing], "Cannot roll back a command that's in the process of being committed.");
			if (this[$$rollingBack] || this.state === 'pre-run') { return }
			this[$$rollingBack] = true;

			/* rollbacks that need to happen before this one */
			for (let [rdep] of Command.commandGraph.verticesFrom(this)) { rdep.rollback() }

			/* then roll back this command */
			this.localRollback();
			
			/***/
			Command.commandHistory.splice(Command.commandHistory.indexOf(this), 1);
			this[$$rollingBack] =  false;
			this.pSubject('state').next('pre-run');
			// this.e('rollback').next();
		}
		
	}
	
	/* debugging output for command dependencies */
	// commands.on('vertex-added', ([k, v]) => {
	// 	switch (k.commandType) {
	// 		case 'new':    console.log('+   NEW ', k.entityClass.name, k.initialValues.name); break;
	// 		case 'edit':   console.log('+   EDIT', k.entityClass.name, k.entity.name);        break;
	// 		case 'delete': console.log('+   DEL ', k.entityClass.name, k.entity.name);        break;
	// 	}
	// });
	// commands.on('edge-added', ([[f, t], e]) => {
	// 	let fromCmd, toCmd;
	// 	switch (f.commandType) {
	// 		case 'new':    fromCmd = ('NEW  ' + f.entityClass.name + ' ' + f.initialValues.name); break;
	// 		case 'edit':   fromCmd = ('EDIT ' + f.entityClass.name + ' ' + f.entity.name);        break;
	// 		case 'delete': fromCmd = ('DEL  ' + f.entityClass.name + ' ' + f.entity.name);        break;
	// 	}
	// 	switch (t.commandType) {
	// 		case 'new':    toCmd = ('NEW  ' + t.entityClass.name + ' ' + t.initialValues.name); break;
	// 		case 'edit':   toCmd = ('EDIT ' + t.entityClass.name + ' ' + t.entity.name);        break;
	// 		case 'delete': toCmd = ('DEL  ' + t.entityClass.name + ' ' + t.entity.name);        break;
	// 	}
	// 	console.log(`+  (${fromCmd}) --> (${toCmd})`, e);
	// });
	// commands.on('vertex-removed', (k) => {
	// 	switch (k.commandType) {
	// 		case 'new':    console.log('-   NEW ', k.entityClass.name, k.initialValues.name); break;
	// 		case 'edit':   console.log('-   EDIT', k.entityClass.name, k.entity.name);        break;
	// 		case 'delete': console.log('-   DEL ', k.entityClass.name, k.entity.name);        break;
	// 	}
	// });
	// commands.on('edge-removed', ([f, t]) => {
	// 	let fromCmd, toCmd;
	// 	switch (f.commandType) {
	// 		case 'new':    fromCmd = ('NEW  ' + f.entityClass.name + ' ' + f.initialValues.name); break;
	// 		case 'edit':   fromCmd = ('EDIT ' + f.entityClass.name + ' ' + f.entity.name);        break;
	// 		case 'delete': fromCmd = ('DEL  ' + f.entityClass.name + ' ' + f.entity.name);        break;
	// 	}
	// 	switch (t.commandType) {
	// 		case 'new':    toCmd = ('NEW  ' + t.entityClass.name + ' ' + t.initialValues.name); break;
	// 		case 'edit':   toCmd = ('EDIT ' + t.entityClass.name + ' ' + t.entity.name);        break;
	// 		case 'delete': toCmd = ('DEL  ' + t.entityClass.name + ' ' + t.entity.name);        break;
	// 	}
	// 	console.log(`-  (${fromCmd}) --> (${toCmd})`);
	// });
	
	/***/
	return env.registerCommandClass('Command', Command);
	
};
