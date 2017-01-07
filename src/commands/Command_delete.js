import {constraint, humanMsg} from '../util/misc';


export default (cls) => class Command_delete extends cls.Command {
	
	static commandType = 'delete';
	
	static get entityClass() { return cls }
	
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
		
		
		// TODO: Command_delete on all relevant linked entities (test if they're already scheduled for deletion)
		// TODO: Store a reference to this Command on the entity
		// TODO: Keep the entity in memory (this.entity) so the deletion can be rolled back.
		// TODO: decide how and when to trigger signals about this deletion
		
		
		/* track this command in the entity */
		this.entity.deleteCommand = this;
		
		//////// old Entity#delete method:
		// Entity#delete() {
		// 	if (this.isDeleted) { return }
		// 	console.warn("The delete operation does not yet use the Command pattern.");
		// 	this.pSubject('isDeleted') .next(true);
		// 	this.pSubject('isPristine').next(false);
		// 	Entity[$$entities].delete(this);
		// }
		
	}
	
	async localCommit() {
		// TODO
	}

	localRollback() {
		
		/* untrack this command in the entity */
		this.entity.deleteCommand = null;
		
		// TODO
	}
};
