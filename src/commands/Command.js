import Graph from 'graph.js/dist/graph';
import assert from 'power-assert';

import isUndefined from 'lodash-bound/isUndefined';
import defaults    from 'lodash-bound/defaults';
import last        from 'lodash-bound/last';
import initial     from 'lodash-bound/initial';

import ValueTracker from '../util/ValueTracker';

import {map, filter} from '../util/bound-hybrid-functions';
import {constraint, humanMsg} from "../util/misc";

const $$graph        = Symbol('$$graph');
const $$running      = Symbol('$$running');
const $$hasRun       = Symbol('$$hasRun');
const $$committed    = Symbol('$$committed');
const $$committing   = Symbol('$$committing');
const $$rolledBack   = Symbol('$$rolledBack');
const $$rollingBack  = Symbol('$$rollingBack');
const $$commitHere   = Symbol('$$commitHere');
const $$rollbackHere = Symbol('$$rollbackHere');

export default (backend) => {
	
	/* track commands in a dependency graph */
	const commands = new Graph;
	
	/* create 'commit' and 'rollback' event emitters */
	const eventTracker = new ValueTracker;
	eventTracker.newEvent('run');
	eventTracker.newEvent('commit');
	eventTracker.newEvent('rollback');
	
	// // TODO: remove debugging below
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
	return class Command {
		
		////////////
		// Static //
		////////////
		
		get entityClass() { return this.constructor.entityClass }
		
		static create(initialArgs, options) {
			
			let cmd = new this(...initialArgs, { ...options, allowInvokingConstructor: true });
			cmd.options.command = cmd;
			
			let {
				commandDependencies,
				commandCauses,
				run,
				hasRun,
				committed,
				rolledBack
			} = cmd.options;
			
			/* option normalization and sanity-check */
			assert(!committed || !rolledBack);
			assert(!committed && !rolledBack || hasRun !== false);
			assert(!run || !hasRun);
			
			/* update command dependency graph */
			commands.addVertex(cmd, cmd);
			for (let dep of commandDependencies || []) { commands.addEdge(dep, cmd, {})               }
			for (let dep of commandCauses       || []) { commands.addEdge(dep, cmd, { forced: true }) }
			
			/* handle state */
			this[$$running]     = false;
			this[$$committing]  = false;
			this[$$rollingBack] = false;
			if (run) { cmd.run() }
			this[$$hasRun]      = hasRun;
			this[$$committed]   = committed;
			this[$$rolledBack]  = rolledBack;
			
			return cmd;
		}
		
		static latest({entity, committable} = {}) {
			/* checking if a command is a candidate */
			const isCandidate = (cmd) => (
				!entity ||
				cmd.associatedEntities.has(entity)
			) && (
				!committable ||
				!cmd[$$committed]  &&
				!cmd[$$committing] &&
				!cmd[$$rolledBack] &&
				!cmd[$$rollingBack]
			);
			
			/* if an associated entity is not given, just return the non-dependency commands */
			if (!entity) {
				return new Set(commands.sinks()
					::filter(([key, cmd]) => isCandidate(cmd))
					::map(([key]) => key));
			}
			
			/* otherwise, find all associated commands that are not dependencies of other associated commands */
			const result = new Set(commands.vertices()
				::filter(([key, cmd]) => isCandidate(cmd))
				::map(([key]) => key));
			const visited = new WeakSet;
			function eliminateCandidates(cmd, latestAssociatedCmd) {
				if (visited.has(cmd)) { return }
				visited.add(cmd);
				for (let [postCmd] of commands.verticesFrom(cmd)) {
					if (isCandidate(postCmd)) {
						result.delete(latestAssociatedCmd);
						eliminateCandidates(postCmd, postCmd);
					} else {
						eliminateCandidates(postCmd, latestAssociatedCmd);
					}
				}
			}
			for (let cmd of result) { eliminateCandidates(cmd, cmd) }
			return result;
		}
		
		static earliest({entity, rollbackable} = {}) {
			/* checking if a command is a candidate */
			const isCandidate = (cmd) => (
				!entity ||
				cmd.associatedEntities.has(entity)
			) && (
				!rollbackable ||
				!cmd[$$committed]  &&
				!cmd[$$committing] &&
				!cmd[$$rolledBack] &&
				!cmd[$$rollingBack]
			);
			
			/* if an associated entity is not given, just return all non-dependent commands */
			if (!entity) {
				return new Set(commands.sources()
					::filter(([key, cmd]) => isCandidate(cmd))
					::map(([key]) => key));
			}
			
			/* otherwise, find all associated commands that are not dependencies of other associated commands */
			const result = new Set(commands.vertices()
				::filter(([key, cmd]) => isCandidate(cmd))
				::map(([key]) => key));
			const visited = new WeakSet;
			const eliminateCandidates = (cmd, latestAssociatedCmd) => {
				if (visited.has(cmd)) { return }
				visited.add(cmd);
				for (let [preCmd] of commands.verticesTo(cmd)) {
					if (isCandidate(preCmd)) {
						result.delete(latestAssociatedCmd);
						eliminateCandidates(preCmd, preCmd);
					} else {
						eliminateCandidates(preCmd, latestAssociatedCmd);
					}
				}
			};
			for (let cmd of result) { eliminateCandidates(cmd, cmd) }
			return result;
		}
		
		
		////////// About forced commands //////////
		// If command A forces command B,
		// then A runs/commits before B,
		// but committing   A commits    B,
		// and rolling back B rolls back A.
		// Example: A 'new Lyph' command forces
		//          some 'new Border' commands.
		//////////////////////////////////////////
		
		constructor(options = {}) {
			this.options = options::defaults({
				commandDependencies: [],
				commandCauses      : []
			});
			
			/* make sure this constructor was invoked under proper conditions */
			constraint(options.allowInvokingConstructor, humanMsg`
				Do not use 'new ${this.constructor.name}(...args)'.
				Instead, use '${this.constructor.name}.create(...args)'.
			`);
			delete options.allowInvokingConstructor;
		}
		
		/// /// /// /// /// static event method /// /// /// /// ///
		
		static e = ::eventTracker.e;
		
		/// /// /// /// /// Basic methods /// /// /// /// ///
		
		get commandType() { return this.constructor.commandType }
		
		localRun()          { assert(false, "Command subclass must override 'localRun'.")      }
		async localCommit() { assert(false, "Command subclass must override 'localCommit'.")   }
		localRollback()     { assert(false, "Command subclass must override 'localRollback'.") }
		
		get hasRun()     { return this[$$hasRun    ] }
		get committed()  { return this[$$committed ] }
		get rolledBack() { return this[$$rolledBack] }
		
		
		/// /// /// /// /// Smart run /// /// /// /// ///
		
		run() {
			if (this[$$running] || this[$$hasRun]) { return }
			this[$$running] = true;
			
			/* scheduling runs that need to happen before this one */
			const commandsToRunBeforeMe = new Set;
			
			// dependency runs
			for (let [dep] of commands.verticesTo(this)) {
				if (dep[$$running] || dep[$$hasRun]) { continue }
				dep[$$running] = true;
				commandsToRunBeforeMe.add(dep);
			}
			
			// forced command runs
			for (let [rdep,, {forced}] of commands.verticesFrom(this)) {
				if (!forced)                           { continue }
				if (rdep[$$running] || rdep[$$hasRun]) { continue }
				rdep[$$running] = true;
				commandsToRunBeforeMe.add(rdep);
			}
			
			/* await those rollbacks first */
			for (let c of commandsToRunBeforeMe) { c.run() }
			
			
			/* then run this command */
			this.localRun();
			this[$$running] = false;
			this[$$hasRun]  = true;
			eventTracker.e('run').next(this);
		}
		
		/// /// /// /// /// Smart commit /// /// /// /// ///
		
		async commit() {
			
			assert(this[$$hasRun], "Cannot commit a command that hasn't yet run.");
			if (this[$$committing] || this[$$committed]) { return }
			this[$$committing] = true;
			
			/* scheduling commits that need to happen before this one */
			const commandsToCommitBeforeMe = new Set;
			
			// dependency commits
			for (let [dep] of commands.verticesTo(this)) {
				if (dep[$$committing] || dep[$$committed]) { continue }
				commandsToCommitBeforeMe.add(dep);
			}
			
			// forced commits
			for (let [rdep,, {forced}] of commands.verticesFrom(this)) {
				if (!forced)                                 { continue }
				if (rdep[$$committing] || rdep[$$committed]) { continue }
				commandsToCommitBeforeMe.add(rdep);
			}
			
			/* await those commits first */
			await Promise.all([...commandsToCommitBeforeMe].map(c=>c.commit()));
			
			/* then commit this command */
			await this.localCommit();
			this[$$committing] = false;
			this[$$committed]  = true;
			eventTracker.e('commit').next(this);
		}
		
		/// /// /// /// /// Smart rollback /// /// /// /// ///
		
		rollback() {
			assert( this[$$hasRun],     "Cannot roll back a command that hasn't yet run.");
			assert(!this[$$committed],  "Cannot roll back a command that's already committed.");
			assert(!this[$$committing], "Cannot roll back a command that's in the process of being committed.");
			if (this[$$rollingBack] || this[$$rolledBack]) { return }
			this[$$rollingBack] = true;
			
			/* scheduling rollbacks that need to happen before this one */
			const commandsToRolledBackBeforeMe = new Set;
			
			// dependency rollbacks
			for (let [rdep] of commands.verticesFrom(this)) {
				if (rdep[$$rollingBack] || rdep[$$rolledBack]) { continue }
				commandsToRolledBackBeforeMe.add(rdep);
			}
			
			// forced command rollbacks
			for (let [dep,, {forced}] of commands.verticesTo(this)) {
				if (!forced)                                 { continue }
				if (dep[$$rollingBack] || dep[$$rolledBack]) { continue }
				commandsToRolledBackBeforeMe.add(dep);
			}
			
			/* await those rollbacks first */
			for (let c of commandsToRolledBackBeforeMe) { c.rollback() }
			
			/* then roll back this command */
			this.localRollback();
			this[$$rollingBack] = false;
			this[$$rolledBack]  = true;
			commands.destroyVertex(this);
			eventTracker.e('rollback').next(this);
			// NOTE: in theory, a rolled back command can be run again,
			//       but we do not support this yet.
		}
		
	};
};
