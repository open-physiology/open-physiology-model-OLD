import {constraint, humanMsg} from '../util/misc';

// import {
// 	$$isPlaceholder
// } from '../symbols';

export default (cls) => class Command_delete extends cls.TrackedCommand {
	
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
				...(entity.editCommands || []),
				...(options.commandDependencies || [])
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
		constraint(!this.entity.isPlaceholder, humanMsg`
			Cannot delete a placeholder.
			Load the entity fully before editing.
		`);
		
		
		// TODO: Command_delete on all relevant linked entities (test if they're already scheduled for deletion)
		// TODO: Keep the entity in memory (this.entity) so the deletion can be rolled back.
		
		
		/* track this command in the entity */
		this.entity.deleteCommand = this;
		this.entity.pSubject('isDeleted') .next(true);
	}
	
	toJSON(options = {}) {
		return {
			commandType: 'delete',
			entity: this.entity.constructor.normalizeAddress(this, options)
		};
	}
	
	async localCommit() {
		const backend = cls.environment.backend;
		const response = await backend.commit_delete(this.toJSON());
		this.handleCommitResponse(response);
	}
	
	handleCommitResponse(response) {
		// TODO: stuff?
	}

	localRollback() {
		
		/* untrack this command in the entity */
		this.entity.deleteCommand = null;
		
		// TODO: other stuff?
	}
};
