import deepFreeze from 'deep-freeze-strict';
import {pick} from 'lodash-bound';
import Command_factory from './Command.js';

/** @wrapper */
export default (env) => {
	
	const {backend, registerCommandClass} = env;
	
	const Command = Command_factory(env);

	/**
	 * Commands for relating two specific entities through some specific relationship class.
	 */
	class Command_link extends Command {
		
		/**
		 * the left-hand side entity to the relationship to link
		 * @type {Entity}
		 */
		entity1;
		
		/**
		 * the key (including '-->' or '<--') of the relationship to link
		 * @type {Entity}
		 */
		key;
		
		/**
		 * the right-hand side entity to the relationship to link
		 * @type {Entity}
		 */
		entity2;
		
		/**
		 * Create a relationship-linking command.
		 * @param {Entity}  entity1 - the left-hand side entity to the relationship to link
		 * @param {string}  key     - the key (including '-->' or '<--') of the relationship to link
		 * @param {Entity}  entity2 - the right-hand side entity to the relationship to link
		 * @param {Object} [options]
		 */
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
		
		/**
		 * @returns a set that contains the two entities involved in the relationship
		 */
		get associatedEntities() {
			return new Set([this.entity1, this.entity2]);
		}
		
		/**
		 * @returns a JSON (plain data) representation of this command
		 */
		toJSON(options = {}) {
			return {
				commandType: 'link',
				address1:    this.entity1::pick('class', 'id'),
				key:         this.key,
				address2:    this.entity2::pick('class', 'id')
			};
		}
		
		/**
		 * Run this command, and only this command (i.e., not its dependencies).
		 * Assumes that this command has not already run.
		 * @protected
		 */
		localRun() {
			env.internalOperation(() => {
				this.entity1.fields[this.key].add(this.entity2);
			});
		}
		
		/**
		 * Commit this command, and only this command (i.e., not its dependencies),
		 * by calling `commit_link` on the backend object.
		 * Assumes that this command has run, but has not yet committed.
		 * @protected
		 */
		async localCommit() {
			return await env.backend.commit_link(
				this.entity1::pick('class', 'id'),
				this.key,
				this.entity2::pick('class', 'id')
			);
		}
		
		/**
		 * Roll back this command, and only this command (i.e., not its dependencies).
		 * Assumes that this command has run, but has not yet committed.
		 * @protected
		 */
		localRollback() {
			env.internalOperation(() => {
				this.entity1.fields[this.key].delete(this.entity2);
			});
		}
		
	}
	
	return registerCommandClass('Command_link', Command_link);
	
};
