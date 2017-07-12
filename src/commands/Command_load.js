import {entries, isUndefined, pick, omit} from 'lodash-bound';
import assert from 'power-assert';

import {humanMsg} from 'utilities';

import Command_factory from './Command.js';



export default (env) => {
	
	const Command = Command_factory(env);

	class Command_load extends Command {
		
		entity;
		response;
		
		constructor(entity, options = {}) {
			super({
				...options,
				state: 'post-commit'
			});
			assert(entity instanceof env.entityClasses.Entity, humanMsg`
				A Command_load must be constructed with the entity that
				was or should be loaded. It can be a placeholder entity
				to be filled in later.
			`);
			this.entity = entity;
			
			/* add to command-tracking data-structures */
			Command.registerEntity(this.entity).origin = this;
		}
		
		get associatedEntities() {
			return new Set(this.entity ? [this.entity] : []);
		}
		
		syncLoad(values) {
			/* register the entity */
			env.registerToModule(this.entity);
			
			/* add to command-tracking data-structures */
			Command.registerEntity(this.entity).origin = this;
			
			if (this.entity.isPlaceholder) {
				/* sanity check */
				assert(values.class === this.entity.constructor.name);
				
				/* make the entity not be a placeholder anymore */
				this.entity.pSubject('isPlaceholder').next(false);
				
				/* fill in the fields */
				this.response = values;
				for (let [key, field] of this.entity.fields::omit('id', 'class')::entries()) {
					if (!this.response[key]::isUndefined()) {
						if (field instanceof env.Rel1Field) {
							
							field.set( env.getLocalOrPlaceholder(this.response[key]) );
							
						} else if (field instanceof env.Rel$Field) {
							
							for (let addr of this.response[key]) {
								field.add( env.getLocalOrPlaceholder(addr) );
							}
							
						} else if (field instanceof env.PropertyField) {
							
							field.set( this.response[key] );
							
						}
					}
				}
			}
			return this.entity;
		}
		
		async load() {
			if (this.entity.isPlaceholder) {
				const [response] = await env.backend.load([this.entity::pick('class', 'id')]);
				if (response) {
					this.syncLoad(response);
				} else {
					this.entity = null;
				}
			}
			return this.entity;
		}
		
		localRun() {
			assert(false, humanMsg`
				Command_load#localRun should never be called,
				because a load command starts out as being committed.
				Call Command_load#load instead.
			`);
		}
		
		toJSON() {
			assert(false, humanMsg`
				Command_load#toJSON should never be called,
				because a load command starts out as being committed.
			`);
		}
		
		localCommit() {
			assert(false, humanMsg`
				Command_load#localCommit should never be called,
				because a load command starts out as being committed.
			`);
		}
		
		localRollback() {
			assert(false, humanMsg`
				Command_load#localRollback should never be called,
				because a load command starts out as being committed.
			`);
		}
	}
	
	return env.registerCommandClass('Command_load', Command_load);
	
};
