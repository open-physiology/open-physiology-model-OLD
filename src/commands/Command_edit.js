import {constraint, humanMsg} from '../util/misc';

import keys    from 'lodash-bound/keys';
import entries from 'lodash-bound/entries';

export default (cls) => class Command_edit extends cls.Command {
	
	static commandType = 'edit';
	
	constructor(entity, newValues = {}, options = {}) {
		super({ ...options });
		this.entity    = entity;
		this.newValues = newValues;
	}

	entity;
	oldValues = null;
	
	localRun() {
		/* sanity checks */
		constraint(this.entity, humanMsg`
			Cannot edit an entity
			that was not specified in
			the Command_edit constructor.
		`);
		
		/* store old values so we can roll back */
		this.oldValues = {};
		for (let key of this.newValues::keys()) {
			this.oldValues[key] = this.entity[key];
		}
		
		/* set the new values */
		for (let [key, newValue] of this.newValues::entries()) {
			this.entity[key] = newValue;
		}
	}
	
	async localCommit() {
		// TODO
	}

	localRollback() {
		// TODO
	}
};
