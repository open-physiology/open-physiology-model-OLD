import Graph from 'graph.js/dist/graph';
import assert from 'power-assert';
import {last, values, flatten} from 'lodash-bound';
import {event, ValueTracker, property} from 'utilities';

const $$running      = Symbol('$$running');
const $$committing   = Symbol('$$committing');
const $$rollingBack  = Symbol('$$rollingBack');
const $$state        = Symbol('$$state');

/** @wrapper */
export default (env) => {
	
	/**
	 * an object pointing to the commands relevant to a specific entity
	 * @typedef {{
	 *     origin: (Command_new | Command_load),
	 *     edit: Object<string, Array<Command_edit>>,
	 *     delete: Command_delete?,
	 *     relationships: Object<string, Map<Entity, Array<Command_link | Command_unlink>>>
	 * }} EntityCommands
	 */
	
	/**
	 * one of three possible states a command can be in
	 * @typedef {'pre-run'|'post-run'|'post-commit'} CommandState
	 */
	
	/**
	 * The main class of the command design-pattern used in this project.
	 * There are commands for creating new entities, loading them from
	 * an asynchronous source, editing them and deleting them; and for
	 * linking or unlinking entities through specific relationships.
	 * A command can be run, rolled back and committed asynchronously.
	 * Commands have prerequisite commands. For example, a command for
	 * editing a lyph (e.g., changing its name) has to be preceded by
	 * a command for creating or loading that lyph.
	 */
	class Command extends ValueTracker {
	
		///// command tracking /////
		
		/**
		 * the graph containing the currently relevant commands,
		 * partially ordered by command prerequisites
		 * @type {Graph}
		 */
		static commandGraph    = new Graph;
		
		/**
		 * an array of commands that have been run, in the order that they were run
		 * @type {Array}
		 */
		static commandHistory  = new Array;
		
		/**
		 * mapping each entity to the commands relevant to it, categorized by command class
		 * @type {
		 *     WeakMap<Entity, EntityCommands>
		 * }
		 */
		static entityToCommand = new WeakMap;
		
		/**
		 * register an entity, so we can start keeping track of related commands
		 * @param {Entity} entity - the entity to register
		 * @return {EntityCommands} the object tracking the entity's commands
		 */
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
		
		/**
		 * Register a property field of an entity so we can start tracking related commands.
		 * @param {Entity} entity - the entity to track property commands for
		 * @param {string} key    - the key of the property field
		 * @return {Array<Command_edit>} the array tracking the relevant edit commands
		 */
		static registerEntityProperty(entity, key) {
			const e = Command.registerEntity(entity);
			if (!e.edit[key]) { e.edit[key] = [] }
			return e.edit[key];
		}
		
		/**
		 * register a specific relationship between two specific entities so we can start tracking related commands
		 * @param {Entity} entity1 - the entity on the left-hand side
		 * @param {string} key     - the key of the relationship field; this should always be prefixed with '-->' or '<--'
		 * @param {Entity} entity2 - the entity on the right-hand side
		 * @return {Array<Command_link|Command_unlink>} the array tracking the relevant link and unlink commands
		 */
		static registerRelationship(entity1, key, entity2) {
			const e1 = Command.registerEntity(entity1);
			const e2 = Command.registerEntity(entity2);
			
			/* reverse key */
			// e.g., '-->HasLayer' into '<--HasLayer'
			const rKey = key.replace(/^(-->|<--)/, m => m[0] === '<' ? '-->' : '<--');
			
			/* prime the data-structures */
			if (!e1.relationships[key])  { e1.relationships[key]  = new Map }
			if (!e2.relationships[rKey]) { e2.relationships[rKey] = new Map }
			if (!e1.relationships[key].has(entity2)) {
				let linkUnlinkCommands = [];
				e1.relationships[key] .set(entity2, linkUnlinkCommands);
				e2.relationships[rKey].set(entity1, linkUnlinkCommands);
			}
			
			/* return the shared array of link/unlink commands */
			return e1.relationships[key].get(entity2);
		}
		
		/**
		 * a method with common code used by `Command.getEditDependencies`,
		 * `Command.getLinkUnlinkDependencies` and `Command.getDeleteDependencies`
		 * @private
		 */
		static _getDependencies(entity, arrays) {
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
		
		/**
		 * Get the direct dependencies for a new edit-command for specific property fields on a specific entity,
		 * and deregister any currently rolled back commands that would now be in conflict.
		 * @param {Entity} entity      - the entity for which to track edit commands
		 * @param {Array<string>} keys - the keys of the property fields in the edit command
		 * @return {Set<Command>} the requested command dependencies
		 */
		static getEditDependencies(entity, keys) {
			let e = Command.registerEntity(entity);
			return Command._getDependencies(entity, keys.map(key=>e.edit[key]).filter(v=>!!v));
		}
		
		/**
		 * Get the direct dependencies for a new link- or unlink-command for a specific relationship between two specific entities,
		 * and deregister any currently rolled back commands that would now be in conflict.
		 * @param {Entity} entity1 - the entity on the left-hand side
		 * @param {string} key     - the key of the relationship field; this should always be prefixed with '-->' or '<--'
		 * @param {Entity} entity2 - the entity on the right-hand side
		 * @return {Set<Command>} the requested command dependencies
		 */
		static getLinkUnlinkDependencies(entity1, key, entity2) {
			let e1e2 = Command.registerRelationship(entity1, key, entity2);
			
			let dep1 = [...Command._getDependencies(entity1, [e1e2])];
			let dep2 = [...Command._getDependencies(entity2, [e1e2])];
			
			assert(dep1.length > 0 && !!dep1[0]);
			assert(dep2.length > 0 && !!dep2[0]);
			
			return new Set([...dep1, ...dep2]);
		}
		
		/**
		 * Get the direct dependencies for a new delete-command for a specific entity,
		 * and deregister any currently rolled back commands that would now be in conflict.
		 * @param {Entity} entity - the entity for which to track delete commands
		 * @return {Set<Command>} the requested command dependencies
		 */
		static getDeleteDependencies(entity) {
			let e = Command.registerEntity(entity);
			return Command._getDependencies(entity, [
				...e.edit::values(),
				...e.relationships::values().map(m=>[...m.values()])::flatten()
			]);
		}
		
		/**
		 * a method with common code used by `Command.earliest` and `Command.latest`
		 * @private
		 */
		static _fringe(options = {}) {
			const {direction, entities = null, states = ['pre-run', 'post-run', 'post-commit']} = options;
			
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
		
		/**
		 * Get all commands that have no dependencies, optionally filtered by entity or command state.
		 * @param {Object}               options
		 * @param {Array<Entity>}       [options.entities] - if given, limits the result to commands related to the given entities
		 * @param {Array<CommandState>} [options.states]   - if given, limits the result to commands in one of the given states
		 * @return {Set<Command>} the requested commands
		 */
		static earliest(options = {}) {
			return Command._fringe({
				...options,
				direction: 'earliest'
			});
		}
		
		/**
		 * Get all commands that are not dependencies, optionally filtered by entity or command state.
		 * @param {Object}               options
		 * @param {Array<Entity>?}      [options.entities] - if given, limits the result to commands related to the given entities
		 * @param {Array<CommandState>} [options.states]   - if given, limits the result to commands in one of the given states
		 * @return {Set<Command>} the requested commands
		 */
		static latest(options = {}) {
			return Command._fringe({
				...options,
				direction: 'latest'
			});
		}
		
		
		/// /// /// /// /// Instances /// /// /// /// ///
		
		/**
		 * Emits an event when this command is committed.
		 * @type {Observable}
		 */
		@event() commitEvent;
		
		/**
		 * Emits an event when this command is rolled back.
		 * @type {Observable}
		 */
		@event() rollbackEvent;
	
		
		/**
		 * Emits an event when this command is committed.
		 * @type {CommandState}
		 */
		@property({ readonly: true }) state: 'pre-run' | 'post-run' | 'post-commit';
		
		/** @protected */
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
		
		/**
		 * Get a set of entities associated with this command.
		 * This should be implemented by subclasses.
		 * @abstract
		 */
		get associatedEntities() { assert(false, `The ${this.constructor.name}#associatedEntities accessor is not implemented.`) }
		
		/**
		 * Run this command, and only this command (i.e., not its dependencies).
		 * Assumes that this command has not already run.
		 * This should be implemented by subclasses to bring about the effect of the command.
		 * @abstract
		 * @protected
		 */
		localRun() { assert(false, "Command subclass must override 'localRun'.")                                   }
		
		/**
		 * Commit this command, and only this command (i.e., not its dependencies).
		 * Assumes that this command has run, but has not yet committed.
		 * This should be implemented by subclasses.
		 * @abstract
		 * @protected
		 */
		async localCommit() { assert(false, "Command subclass must override 'localCommit'.")                                }
		
		/**
		 * Roll back this command, and only this command (i.e., not its dependencies).
		 * Assumes that this command has run, but has not yet committed.
		 * This should be implemented by subclasses.
		 * @abstract
		 * @protected
		 */
		localRollback() { assert(false, "Command subclass must override 'localRollback'.")                              }
		
		/**
		 * Get a JSON (plain data) representation of this command.
		 * This should be implemented by subclasses.
		 * @abstract
		 */
		toJSON(options = {}) { assert(false, "Command subclass must override 'toJSON'.") }
		
		/// /// /// /// /// Smart run, commit, rollback /// /// /// /// ///
		
		/**
		 * Run this command now.
		 */
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
		
		/**
		 * Commit this command now.
		 * @returns {Promise} a promise that resolves when the command is confirmed to be committed
		 */
		async commit() {
			assert(this.state !== 'pre-run', "Cannot commit a command that hasn't yet run.");
			if (this[$$committing] || this.state === 'post-commit') { return }
			this[$$committing] = true;

			/* run commits that need to happen before this one */
			for (let [cmd] of Command.commandGraph.verticesTo(this)) {
				await cmd.commit();
			}

			/* then commit this command */
			await this.localCommit();
			
			/***/
			this[$$committing] = false;
			this.pSubject('state').next('post-commit');
		}
		
		/**
		 * Roll this command back now.
		 * @throws {AssertionError} if this command was, or is being, committed
		 */
		rollback() {
			assert(this.state !== 'post-commit', "Can only roll back a command that has been run but not committed.");
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
