import deepFreeze from 'deep-freeze-strict';
import {pick} from 'lodash-bound';
import Command_factory from './Command.js';

export default (env) => {
	
	const {backend, registerCommandClass} = env;
	
	const Command = Command_factory(env);

	class Command_link extends Command {
		
		entity1;
		key;
		entity2;
		
		constructor(entity1, key, entity2, options = {}) {
			super({
				...options,
				dependencies: [
					...(options.dependencies || []),
					...Command.getLinkUnlinkDependencies(entity1, key, entity2)
				]
			});
			this.entity1 = entity1;
			this.key     = key;
			this.entity2 = entity2;
			
			/* add to command-tracking data-structures */
			Command.registerRelationship(entity1, key, entity2).push(this);
		}
		
		get associatedEntities() {
			return new Set(
				this.entity1 && this.entity2
				? [this.entity1, this.entity2]
				: []
			);
		}
		
		toJSON(options = {}) {
			return {
				commandType: 'link',
				address1:    this.entity1::pick('class', 'id'),
				key:         this.key,
				address2:    this.entity2::pick('class', 'id')
			};
		}
		
		localRun() {
			this.entity1[this.key] = this.entity2;
		}
		
		async localCommit() {
			return await env.backend.commit_link(
				this.entity1::pick('class', 'id'),
				this.key,
				this.entity2::pick('class', 'id')
			);
		}
		
		localRollback() {
			this.entity1[this.key] = null;
		}
		
	}
	
	return registerCommandClass('Command_link', Command_link);
	
};
