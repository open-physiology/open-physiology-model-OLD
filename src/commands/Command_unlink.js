import {pick} from 'lodash-bound';
import Command_factory from './Command.js';


/** @wrapper */
export default (env) => {
	
	const {backend, registerCommandClass} = env;
	
	const Command = Command_factory(env);
	
	/**
	 * Commands for removing a specific relationship between two specific entities.
	 */
	class Command_unlink extends Command {
		
		/**
		 * the left-hand side entity to the relationship to unlink
		 * @type {Entity}
		 */
		entity1;
		
		/**
		 * the key (including '-->' or '<--') of the relationship to unlink
		 * @type {Entity}
		 */
		key;
		
		/**
		 * the right-hand side entity to the relationship to unlink
		 * @type {Entity}
		 */
		entity2;
		
		/**
		 * Create a relationship-unlinking command.
		 * @param {Entity}  entity1 - the left-hand side entity to the relationship to unlink
		 * @param {string}  key     - the key (including '-->' or '<--') of the relationship to unlink
		 * @param {Entity}  entity2 - the right-hand side entity to the relationship to unlink
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
				commandType: 'unlink',
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
				this.entity1.fields[this.key].delete(this.entity2);
			});
		}
		
		/**
		 * Commit this command, and only this command (i.e., not its dependencies),
		 * by calling `commit_unlink` on the backend object.
		 * Assumes that this command has run, but has not yet committed.
		 * @protected
		 */
		async localCommit() {
			return await env.backend.commit_unlink(
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
				this.entity1.fields[this.key].add(this.entity2);
			});
		}
		
	}
	
	return registerCommandClass('Command_unlink', Command_unlink);
	
};
