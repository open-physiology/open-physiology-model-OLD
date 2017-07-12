import {entries, pick} from 'lodash-bound';
import assert     from 'power-assert';
import deepFreeze from 'deep-freeze-strict';

import {humanMsg} from 'utilities';

import Command_factory from './Command.js';



export default (env) => {
	
	const Command = Command_factory(env);

	class Command_new extends Command {
		
		class;
		entity;
		
		constructor(entityOrClass, options = {}) {
			super({
				...options,
				state: entityOrClass instanceof env.entityClasses.Entity
					       ? 'post-run'
					       : 'pre-run'
			});
			if (entityOrClass instanceof env.entityClasses.Entity) {
				
				this.entity = entityOrClass;
				this.class  = entityOrClass.class;
				
				/* add to command-tracking data-structures */
				Command.registerEntity(this.entity).origin = this;
				
				/* record initial values */
				this.initialValues = {};
				for (let [key, field] of this.entity.fields::entries()) {
					if (field instanceof env.PropertyField) {
						this.initialValues[key] = field.get();
					}
				}
				
			} else {
				
				assert(typeof entityOrClass === 'string');
				this.class = entityOrClass;
				
			}
		}
		
		get associatedEntities() {
			return new Set(this.entity ? [this.entity] : []);
		}
		
		toJSON(options = {}) {
			return {
				commandType: 'new',
				class: this.class
			};
		}
		
		localRun() {
			/* create new entity */
			if (!this.entity) {
				/* create entity for the first time */
				this.entity = env.entityClasses[this.class].new();
				
				/* add to command-tracking data-structures */
				Command.registerEntity(this.entity).origin = this;
			}
		}
		
		async localCommit() {
			/* commit through the backend and wait for the response */
			let response = await env.backend.commit_new(
				this::pick('class')
			);
			
			/* assign the new id to the entity */
			assert(typeof response.id === 'number', humanMsg`
				The backend function commit_new needs to
				return an object with an id property.
			`);
			this.entity.fields['id'].set(response.id, { ignoreReadonly: true });
			
			/***/
			return response;
		}
	
		localRollback() {
			/* delete the entity */
			env.internalOperation(() => {
				this.entity.delete();
			});
			
			/* remove from command-tracking data-structures */
			Command.registerEntity(this.entity).origin = null;
			
			/* forget about created entity */
			this.entity = null;
		}
	}
	
	return env.registerCommandClass('Command_new', Command_new);
	
};
