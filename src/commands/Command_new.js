import {entries, pick} from 'lodash-bound';
import assert     from 'power-assert';
import deepFreeze from 'deep-freeze-strict';

import {humanMsg} from 'utilities';

import Command_factory from './Command.js';



/** @wrapper */
export default (env) => {
	
	const Command = Command_factory(env);

	/**
	 * Commands for creating a new entity of a specific class.
	 */
	class Command_new extends Command {
		
		/**
		 * the name of the class of entity to create
		 * @type {string}
		 */
		class;
		
		/**
		 * the created entity, if it has been created
		 * @type {?Entity}
		 */
		entity;
		
		/**
		 * Create an entity-creation command that's either pre-run or post-run.
		 * @param {Entity|string} entityOrClass -
		 *        either a string to represent the class of the entity to be created,
		 *        or an entity that already exists (putting the command in post-run state)
		 * @param {Object} options
		 */
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
		
		/**
		 * @returns a set that contains the entity created by this command,
		 *          or an empty set if this command hasn't run
		 */
		get associatedEntities() {
			return new Set(this.entity ? [this.entity] : []);
		}
		
		/**
		 * @returns a JSON (plain data) representation of this command
		 */
		toJSON(options = {}) {
			return {
				commandType: 'new',
				class: this.class
			};
		}
		
		/**
		 * Run this command, and only this command (i.e., not its dependencies).
		 * Assumes that this command has not already run.
		 * @protected
		 */
		localRun() {
			/* create entity for the first time */
			this.entity = env.entityClasses[this.class].new();
			
			// TODO: register with the module, probably?
			//     : We haven't yet tried to roll back Command_new,
			//     : so this method has never yet been called.
			
			/* add to command-tracking data-structures */
			Command.registerEntity(this.entity).origin = this;
		}
		
		/**
		 * Commit this command, and only this command (i.e., not its dependencies),
		 * by calling `commit_new` on the backend object.
		 * Assumes that this command has run, but has not yet committed.
		 * @protected
		 */
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
	
		/**
		 * Roll back this command, and only this command (i.e., not its dependencies).
		 * Assumes that this command has run, but has not yet committed.
		 * @protected
		 */
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
