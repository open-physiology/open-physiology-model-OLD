import {humanMsg} from 'utilities';
import deepFreeze from 'deep-freeze-strict';
import {pick} from 'lodash-bound';

import Command_factory from './Command.js';


/** @wrapper */
export default (env) => {
	
	const {backend, registerCommandClass} = env;
	
	const Command = Command_factory(env);

	/**
	 * Commands for deleting entities.
	 */
	class Command_delete extends Command {
	
		/**
		 * the entity to delete
		 * @type {Entity}
		 */
		entity;
		
		/**
		 * Create an entity-deleting command.
		 * @param {Entity}  entity - the entity to delete
		 * @param {Object} [options]
		 */
		constructor(entity, options = {}) {
			super({
				...options,
				dependencies: [
					...(options.dependencies || []),
					...Command.getDeleteDependencies(entity)
				]
			});
			this.entity = entity;
			Command.registerEntity(entity).delete = this;
		}
		
		/**
		 * @returns a set that contains the entity created by this command,
		 *          or an empty set if this command hasn't run
		 */
		get associatedEntities() {
			return new Set([this.entity]);
		}
		
		/**
		 * @returns a JSON (plain data) representation of this command
		 */
		toJSON(options = {}) {
			return {
				commandType: 'delete',
				address: this.entity::pick('class', 'id')
			};
		}
		
		/**
		 * Run this command, and only this command (i.e., not its dependencies).
		 * Assumes that this command has not already run.
		 * @protected
		 */
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
		
		/**
		 * Commit this command, and only this command (i.e., not its dependencies),
		 * by calling `commit_delete` on the backend object and silencing
		 * the entity permanently (stopping all `ValueTracker` signals).
		 * Assumes that this command has run, but has not yet committed.
		 * @protected
		 */
		async localCommit() {
			this.entity.silence();
			return await env.backend.commit_delete(
				this.entity::pick('class', 'id')
			);
		}
		
		/**
		 * Roll back this command, and only this command (i.e., not its dependencies).
		 * Assumes that this command has run, but has not yet committed.
		 * @protected
		 */
		localRollback() {
			env.internalOperation(() => {
				this.entity.undelete();
			});
		}
	}
	
	return registerCommandClass('Command_delete', Command_delete);
	
};
