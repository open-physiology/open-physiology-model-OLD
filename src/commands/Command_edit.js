import {constraint, humanMsg} from '../util/misc';

import assert  from 'power-assert';
import keys    from 'lodash-bound/keys';
import entries from 'lodash-bound/entries';

import {
	$$isPlaceholder
} from '../symbols';


// TODO: Make all field-setter code use this command

export default (cls) => class Command_edit extends cls.Command {
	
	static commandType = 'edit';
	
	static get entityClass() { return cls }
	
	static create(entity, newValues = {}, options = {}) {
		return super.create([entity, newValues], options);
	}
	
	constructor(entity, newValues = {}, options = {}) {
		super({
			...options,
			commandDependencies: [
				entity.originCommand,
				...(entity.editCommands         || []),
				...(options.commandDependencies || [])
				// TODO: only dependent on edit commands with shared property keys
			]
		});
		this.entity    = entity;
		this.newValues = newValues;
	}
	
	get associatedEntities() {
		return new Set(this.entity ? [this.entity] : []);
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
		constraint(!this.entity[$$isPlaceholder], humanMsg`
			Cannot edit a placeholder.
			Load the entity fully before editing.
		`);
		
		/* store old values so we have the ability to roll back */
		this.oldValues = {};
		let thereAreChanges = false;
		for (let key of this.newValues::keys()) {
			if (this.oldValues[key] !== this.entity[key]) {
				this.oldValues[key] = this.entity[key];
				thereAreChanges = true;
			}
		}
		
		/* set the new values */
		for (let [key, newValue] of this.newValues::entries()) {
			this.entity.fields[key].set(newValue, { createEditCommand: false });
		}
		
		/* track this command in the entity */
		this.entity.editCommands.push(this);
		
		/* if changes were made, the entity is no longer pristine */
		if (thereAreChanges) {
			this.entity.pSubject('isPristine').next(false);
		}
	}
	
	async localCommit() {
		const backend = cls.environment.backend;
		let response = await backend.commit_edit(
			this.entity.href,
			this.entity.constructor.objectToJSON(this.newValues, { sourceEntity: this.entity })
		);
		// TODO: integrate response
		// TODO: catch possible exception, meaning the commit failed
		/* after it's first committed, it may be pristine */
		if ([this.entity.originCommand, ...this.entity.editCommands].every(cmd => cmd === this || cmd.committed || cmd.rolledBack)) {
			this.entity.pSubject('isPristine').next(true);
		}
	}

	localRollback() {
		/* un-track this command in the entity */
		const popped = this.entity.editCommands.pop();
		assert(popped === this, humanMsg`
			Somehow the invariant of the entity editCommands stack
			was not maintained, or commands have been rolled back
			in the wrong order.
		`);
		
		/* set the old values back */
		for (let [key, oldValue] of this.oldValues::entries()) {
			this.entity.fields[key].set(oldValue, { createEditCommand: false });
		}
	}
};
