import {constraint, humanMsg} from '../util/misc';

import {
	$$isPlaceholder
} from '../symbols';

export default (cls) => class Command_delete extends cls.Command {
	
	static commandType = 'delete';
	
	static get entityClass() { return cls }
	
	static create(entity, options = {}) {
		return super.create([entity], options);
	}
	
	constructor(entity, options = {}) {
		super({
			...options,
			commandDependencies: [
				entity.originCommand,
				...entity.editCommands,
				...options.commandDependencies
			]
		});
		this.entity = entity;
	}
	
	get associatedEntities() {
		return new Set(this.entity ? [this.entity] : []);
	}

	entity = null;
	
	localRun() {
		/* sanity checks */
		constraint(this.entity, humanMsg`
			Cannot delete an entity
			that was not specified in
			the Command_delete constructor.
		`);
		constraint(!this.entity[$$isPlaceholder], humanMsg`
			Cannot delete a placeholder.
			Load the entity fully before editing.
		`);
		
		
		// TODO: Command_delete on all relevant linked entities (test if they're already scheduled for deletion)
		// TODO: Keep the entity in memory (this.entity) so the deletion can be rolled back.
		
		
		/* track this command in the entity */
		this.entity.deleteCommand = this;
		this.pSubject('isDeleted') .next(true);
		this.pSubject('isPristine').next(false);
		
	}
	
	async localCommit() {
		let response = await cls.environment.backend.commit_delete(this);
		this.pSubject('isPristine').next(true);
		// TODO: integrate response
		// TODO: catch possible exception (meaning the commit failed)
		// TODO: other stuff?
	}

	localRollback() {
		
		/* after it's rolled back, it may be pristine */
		if ([this.entity.originCommand, ...this.entity.editCommands].every(cmd => cmd === this || cmd.committed || cmd.rolledBack)) {
			this.entity.pSubject('isPristine').next(true);
		}
		/* untrack this command in the entity */
		this.entity.deleteCommand = null;
		
		// TODO: other stuff?
	}
};
