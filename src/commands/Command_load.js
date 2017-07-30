import {entries, isUndefined, pick, omit} from 'lodash-bound';
import assert from 'power-assert';

import {humanMsg} from 'utilities';

import Command_factory from './Command.js';



/** @wrapper */
export default (env) => {
	
	const Command = Command_factory(env);

	/**
	 * Commands for loading a specific entity (for which we have an address)
	 * from an asynchronous source.
	 */
	class Command_load extends Command {
		
		entity;
		response;
		
		/**
		 * Create an entity-loading command. It expects an already existing
		 * entity placeholder to load the values into.
		 * @param {Entity}  entity - an existing entity with `entity.isPlaceholder === true`
		 * @param {Object} [options]
		 */
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
		
		/**
		 * @returns a set that contains the (to be) loaded entity
		 */
		get associatedEntities() {
			return new Set([this.entity]);
		}
		
		/**
		 * Synchronously load the entity with values already available in JSON form.
		 * @param {Object} values - the values to put into the entity
		 * @return {Entity} the loaded entity
		 */
		syncLoad(values) {

			/* add to command-tracking data-structures */
			Command.registerEntity(this.entity).origin = this;

			/* fill in the fields */
			this.response = values;
			
			if (this.entity.isPlaceholder) {
				/* sanity check */
				assert(values.class === this.entity.constructor.name);

				/* make the entity not be a placeholder anymore */
				this.entity.pSubject('isPlaceholder').next(false);
			}

			return this.entity;
		}
		
		/**
		 * Asynchronously load the entity by calling `commit_edit` on the backend object.
		 * @return {Promise<Entity>} a promise that resolves as the entity after it is loaded
		 */
		async load() {
			if (this.entity.isPlaceholder) {
				const [response] = await env.backend.load([this.entity::pick('class', 'id')]);
				if (response) {
					this.syncLoad(response);
				} else {
					return null;
				}
			}
			return this.entity;
		}
		
		/**
		 * This is not supposed to be called, as a load command starts out in 'post-commit'.
		 * (TODO: Put this class elsewhere in the class hierarchy?)
		 */
		localRun() {
			assert(false, humanMsg`
				Command_load#localRun should never be called,
				because a load command starts out as being committed.
				Call Command_load#load instead.
			`);
		}
		
		/**
		 * This is not supposed to be called, as a load command starts out in 'post-commit'.
		 * (TODO: Put this class elsewhere in the class hierarchy?)
		 */
		toJSON() {
			assert(false, humanMsg`
				Command_load#toJSON should never be called,
				because a load command starts out as being committed.
			`);
		}
		
		/**
		 * This is not supposed to be called, as a load command starts out in 'post-commit'.
		 * (TODO: Put this class elsewhere in the class hierarchy?)
		 */
		localCommit() {
			assert(false, humanMsg`
				Command_load#localCommit should never be called,
				because a load command starts out as being committed.
			`);
		}
		
		/**
		 * This is not supposed to be called, as a load command starts out in 'post-commit'.
		 * (TODO: Put this class elsewhere in the class hierarchy?)
		 */
		localRollback() {
			assert(false, humanMsg`
				Command_load#localRollback should never be called,
				because a load command starts out as being committed.
			`);
		}
		
	}
	
	return env.registerCommandClass('Command_load', Command_load);
	
};
