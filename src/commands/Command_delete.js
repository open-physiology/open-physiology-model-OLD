import {humanMsg} from 'utilities';
import deepFreeze from 'deep-freeze-strict';
import {pick} from 'lodash-bound';

import Command_factory from './Command.js';


export default (env) => {
	
	const {backend, registerCommandClass} = env;
	
	const Command = Command_factory(env);

	class Command_delete extends Command {
		
		constructor(entity, options = {}) {
			super({
				...options,
				dependencies: [
					...(options.dependencies || []),
					...Command.getDeleteDependencies(entity)
				]
			});
			this.entity = entity;
				
			// TODO: register command in env.entityToCommand
			
		}
		
		get associatedEntities() {
			return new Set(this.entity ? [this.entity] : []);
		}
	
		entity;
		
		localRun() {
			/* sanity checks */
			assert(!this.entity.isPlaceholder, humanMsg`
				Cannot delete a placeholder.
				Load the entity fully before editing.
			`);
			/* delete the entity */
			env.internalOperation(() => {
				this.entity.delete();
			});
		}
		
		toJSON(options = {}) {
			return {
				commandType: 'delete',
				address: this.entity::pick('class', 'id')
			};
		}
		
		async localCommit() {
			this.entity.silence();
			return await env.backend.commit_delete(
				this.entity::pick('class', 'id')
			);
		}
		
		localRollback() {
			env.internalOperation(() => {
				this.entity.undelete();
			});
		}
	}
	
	return registerCommandClass('Command_delete', Command_delete);
	
};
