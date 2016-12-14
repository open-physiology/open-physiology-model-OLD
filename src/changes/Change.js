import Graph from 'graph.js/dist/graph';
import assert from 'power-assert';

import ValueTracker, {property, event} from '../util/ValueTracker';

import {filter, map} from '../util/bound-hybrid-functions';

const $$graph        = Symbol('$$graph');
const $$committed    = Symbol('$$committed');
const $$committing   = Symbol('$$committing');
const $$rolledBack   = Symbol('$$rolledBack');
const $$rollingBack  = Symbol('$$rollingBack');
const $$commitHere   = Symbol('$$commitHere');
const $$rollbackHere = Symbol('$$rollbackHere');

export default ({ onCommit } = {}) => {
	
	/* track changes in a dependency graph */
	const changes = new Graph;
	
	/* create 'commit' and 'rollback' event emitters */
	const eventTracker = new ValueTracker;
	eventTracker.newEvent('commit');
	eventTracker.newEvent('rollback');
	
	/***/
	return class Change {
		
		////////// About forced changes //////////
		// If change A forces change B,
		// then A runs/commits before B,
		// but committing   A commits    B,
		// and rolling back B rolls back A.
		// Example: A 'new Lyph' change forces
		//          some 'new Border' changes.
		//////////////////////////////////////////
		
		constructor({
			changeDependencies = [],
			changeCauses       = [],
			committed          = false
		} = {}) {
			changes.addVertex(this, this);
			for (let dep of changeDependencies) { changes.addEdge(dep, this, {})               }
			for (let dep of changeCauses)       { changes.addEdge(dep, this, { forced: true }) }
			this[$$committing]  = false;
			this[$$committed]   = committed;
			this[$$rollingBack] = false;
			this[$$rolledBack]  = false;
		}
		
		/// /// /// /// /// static event method /// /// /// /// ///
		
		static e = ::eventTracker.e;
		
		/// /// /// /// /// Basic methods /// /// /// /// ///
		
		get changeType() { return this.constructor.changeType }
		
		localRun()       { assert(false, `Change subclass must override 'localRun'`)            }
		localRollback()  { assert(false, `Change subclass must override 'localRollback'`)       }
		
		get committed()  { return this[$$committed ] }
		get rolledBack() { return this[$$rolledBack] }
		
		/// /// /// /// /// Smart run /// /// /// /// ///
		
		// TODO: keep track of whether a change has run or not
		// TODO:  and only do a `localRun` if it's the first time
		
		run() { this.localRun() }
		
		/// /// /// /// /// Smart commit /// /// /// /// ///
		
		async commit() {
			if (this[$$committing] || this[$$committed]) { return }
			this[$$committing] = true;
			
			/* scheduling commits that need to happen before this one */
			const changesToCommitBeforeMe = new Set;
			
			// dependency commits
			for (let [dep] of changes.verticesTo(this)) {
				if (dep[$$committing] || dep[$$committed]) { continue }
				dep[$$committing] = true;
				changesToCommitBeforeMe.add(dep);
			}
			
			// forced change commits
			for (let [rdep,, {forced}] of changes.verticesFrom(this)) {
				if (rdep[$$committing] || rdep[$$committed]) { continue }
				if (!forced)                                 { continue }
				rdep[$$committing] = true;
				changesToCommitBeforeMe.add(rdep);
			}
			
			/* await those commits first */
			await Promise.all(
				changesToCommitBeforeMe
					::map(c=>c.commit())
			);
			
			/* then commit this change */
			eventTracker.e('commit').next(this);
			this[$$committing] = false;
			this[$$committed]  = true;
		}
		
		/// /// /// /// /// Smart rollback /// /// /// /// ///
		
		rollback() {
			assert(!this[$$committed],  "Cannot roll back a change that's already committed.");
			assert(!this[$$committing], "Cannot roll back a change that's in the process of being committed.");
			if (this[$$rollingBack] || this[$$rolledBack]) { return }
			this[$$rollingBack] = true;
			
			/* scheduling rollbacks that need to happen before this one */
			const changesToRolledBackBeforeMe = new Set;
			
			// dependency rollbacks
			for (let [rdep] of changes.verticesFrom(this)) {
				if (rdep[$$rollingBack] || rdep[$$rolledBack]) { continue }
				rdep[$$rollingBack] = true;
				changesToRolledBackBeforeMe.add(rdep);
			}
			
			// forced change rollbacks
			for (let [dep,, {forced}] of changes.verticesTo(this)) {
				if (dep[$$rollingBack] || dep[$$rolledBack]) { continue }
				if (!forced)                                 { continue }
				dep[$$rollingBack] = true;
				changesToRolledBackBeforeMe.add(dep);
			}
			
			/* await those rollbacks first */
			for (let c of changesToRolledBackBeforeMe) { c.rollback() }
			
			/* then roll back this change */
			this.localRollback();
			this[$$rollingBack] = false;
			this[$$rolledBack]  = true;
			eventTracker.e('rollback').next(this);
		}
		
	};
};


// export class CreateEntity extends Change {
// 	constructor(cls, props = {}, options = {}) {}
// 	run() {}
// 	commit() {}
// 	rollback() {}
// }
// export class DeleteEntity extends Change {}
// export class SetPropertyField extends Change {}
// export class SetSideField extends Change {}
// export class SetRel1Field extends Change {}
// export class SetRel1ShortcutField extends Change {}
// export class SetRel$Field extends Change {}
// export class SetRel$ShortcutField extends Change {}
