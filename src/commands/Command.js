import Graph from 'graph.js/dist/graph';
import assert from 'power-assert';

import ValueTracker, {property, event} from '../util/ValueTracker';

import {filter, map} from '../util/bound-hybrid-functions';

const $$graph        = Symbol('$$graph');
const $$running      = Symbol('$$running');
const $$hasRun       = Symbol('$$hasRun');
const $$committed    = Symbol('$$committed');
const $$committing   = Symbol('$$committing');
const $$rolledBack   = Symbol('$$rolledBack');
const $$rollingBack  = Symbol('$$rollingBack');
const $$commitHere   = Symbol('$$commitHere');
const $$rollbackHere = Symbol('$$rollbackHere');

export default (module) => {
	
	/* track commands in a dependency graph */
	const commands = new Graph;
	
	/* create 'commit' and 'rollback' event emitters */
	const eventTracker = new ValueTracker;
	eventTracker.newEvent('run');
	eventTracker.newEvent('commit');
	eventTracker.newEvent('rollback');
	
	/***/
	return class Command {
		
		////////// About forced commands //////////
		// If command A forces command B,
		// then A runs/commits before B,
		// but committing   A commits    B,
		// and rolling back B rolls back A.
		// Example: A 'new Lyph' command forces
		//          some 'new Border' commands.
		//////////////////////////////////////////
		
		constructor({
			commandDependencies = [],
			commandCauses       = [],
			hasRun              = false,
			committed           = false,
			rolledBack          = false
		} = {}) {
			commands.addVertex(this, this);
			for (let dep of commandDependencies) { commands.addEdge(dep, this, {})               }
			for (let dep of commandCauses)       { commands.addEdge(dep, this, { forced: true }) }
			this[$$running]     = false;
			this[$$hasRun]      = hasRun;
			this[$$committing]  = false;
			this[$$committed]   = committed;
			this[$$rollingBack] = false;
			this[$$rolledBack]  = rolledBack;
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
		
		/// /// /// /// /// Entity association /// /// /// /// ///
		
		associations = new Set;
		
		/// /// /// /// /// Smart run /// /// /// /// ///
		
		// TODO: keep track of whether a command has run or not
		// TODO:  and only do a `localRun` if it's the first time
		
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
				dep[$$committing] = true;
				commandsToCommitBeforeMe.add(dep);
			}
			
			// forced command commits
			for (let [rdep,, {forced}] of commands.verticesFrom(this)) {
				if (!forced)                                 { continue }
				if (rdep[$$committing] || rdep[$$committed]) { continue }
				rdep[$$committing] = true;
				commandsToCommitBeforeMe.add(rdep);
			}
			
			/* await those commits first */
			await Promise.all(
				commandsToCommitBeforeMe
					::map(c=>c.commit())
			);
			
			/* then commit this command */
			await this.localCommit();
			this[$$committing] = false;
			this[$$committed]  = true;
			module.commit(this); // TODO: test
			// eventTracker.e('commit').next(this);
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
				rdep[$$rollingBack] = true;
				commandsToRolledBackBeforeMe.add(rdep);
			}
			
			// forced command rollbacks
			for (let [dep,, {forced}] of commands.verticesTo(this)) {
				if (!forced)                                 { continue }
				if (dep[$$rollingBack] || dep[$$rolledBack]) { continue }
				dep[$$rollingBack] = true;
				commandsToRolledBackBeforeMe.add(dep);
			}
			
			/* await those rollbacks first */
			for (let c of commandsToRolledBackBeforeMe) { c.rollback() }
			
			/* then roll back this command */
			this.localRollback();
			this[$$rollingBack] = false;
			this[$$rolledBack]  = true;
			eventTracker.e('rollback').next(this);
			// NOTE: in theory, a rolled back command can be run again,
			//       but we do not support this yet.
		}
		
	};
};


// export class CreateEntity extends Command {
// 	constructor(cls, props = {}, options = {}) {}
// 	run() {}
// 	commit() {}
// 	rollback() {}
// }
// export class DeleteEntity extends Command {}
// export class SetPropertyField extends Command {}
// export class SetSideField extends Command {}
// export class SetRel1Field extends Command {}
// export class SetRel1ShortcutField extends Command {}
// export class SetRel$Field extends Command {}
// export class SetRel$ShortcutField extends Command {}
