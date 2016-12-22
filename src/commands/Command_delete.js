import {constraint, humanMsg} from '../util/misc';


export default (cls) => class Command_delete extends cls.Command {
	
	static commandType = 'delete';
	
	constructor(entity, options = {}) {
		super({ ...options });
		this.entity = entity;
	}

	entity = null;
	
	localRun() {
		/* sanity checks */
		constraint(this.entity, humanMsg`
			Cannot delete an entity
			that was not specified in
			the Command_delete constructor.
		`);
		
		console.log("DELETING:", this.entity);
		for (let field of this.entity.fields) {
			console.log("    FIELD:", field); // TODO: test
		}
		
		
		// TODO: Command_delete on all relevant linked entities (test if they're already scheduled for deletion)
		// TODO: Store a reference to this Command on the entity
		// TODO: Keep the entity in memory (this.entity) so the deletion can be rolled back.
	}
	
	async localCommit() {
		// TODO
	}

	localRollback() {
		// TODO
	}
};
