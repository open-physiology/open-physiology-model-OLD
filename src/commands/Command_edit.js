import {humanMsg} from 'utilities';

import assert from 'power-assert';
import {mapValues, keys, pick, entries, omit} from 'lodash-bound';

import deepFreeze from 'deep-freeze-strict';

import Command_factory from './Command.js';



/** @wrapper */
export default (env) => {
	
	const Command = Command_factory(env);

	/**
	 * Commands for editing property fields on an existing entity.
	 */
	class Command_edit extends Command {
		
		/**
		 * the entity to edit
		 * @type {Entity}
		 */
		entity;
		
		/**
		 * the property values before this command is/was run,
		 * stored so that the command can be rolled back;
		 * might be undefined if this command has never run
		 * @type {Object}
		 */
		oldValues;
		
		/**
		 * the property values after this command is/was run;
         * might be undefined if this command started out 'post-run' and has never been rolled back
		 * @type {Object}
		 */
		newValues;
		
		/**
		 * Create an entity-editing command.
		 * @param {Entity} entity      - the entity to edit
		 * @param {Object} [newValues] - the new values for the entity (if given, start in 'pre-run' state)
		 * @param {Object} [oldValues] - the old values of the entity  (if given, start in 'post-run' state)
		 * @param {Object} [options]
		 */
		constructor(entity, newValues = null, oldValues = null, options = {}) {
			super({
				...options,
				state: options.state || (newValues ? 'pre-run' : 'post-run'),
				dependencies: [
					...(options.dependencies || []),
					...Command.getEditDependencies(
						entity,
						(oldValues || newValues)::keys()
					)
				]
			});
			this.entity    = entity;
			this.oldValues = oldValues;
			this.newValues = newValues;
			
			/* add to command-tracking data-structures */
			for (let key of (oldValues || newValues)::keys()) {
				Command.registerEntityProperty(entity, key).push(this);
			}

			assert(options.state !== 'pre-run'  || newValues);
			assert(options.state !== 'post-run' || oldValues);
		}
		
		/**
		 * @returns a set that contains the entity to be edited
		 */
		get associatedEntities() {
			return new Set([this.entity]);
		}
		
		/**
		 * @returns a JSON (plain data) representation of this command
		 */
		toJSON(options = {}) {
			return {
				commandType: 'edit',
				address:     this.entity::pick('class', 'id'),
				newValues:   deepFreeze(this.newValues)
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
				Cannot edit a placeholder.
				Load the entity fully before editing.
			`);
			
			/* store old values so we have the ability to roll back */
			if (!this.oldValues) {
				this.oldValues = this.newValues::mapValues((val,key) => this.entity.fields[key].get());
			}
			
			/* set the new values */
			env.internalOperation(() => {
				for (let [key, newValue] of this.newValues::entries()) {
					this.entity.fields[key].set(newValue);
				}
			});
		}
		
		/**
		 * Commit this command, and only this command (i.e., not its dependencies),
		 * by calling `commit_edit` on the backend object.
		 * Assumes that this command has run, but has not yet committed.
		 * @protected
		 */
		async localCommit() {
			return await env.backend.commit_edit(
				this.entity::pick('class', 'id'),
				deepFreeze(this.newValues)
			);
		}
		
		/**
		 * Roll back this command, and only this command (i.e., not its dependencies).
		 * Assumes that this command has run, but has not yet committed.
		 * @protected
		 */
		localRollback() {
			/* store new values so we have the ability to re-run */
			if (!this.newValues) {
				this.newValues = this.oldValues::mapValues((val,key) => entity.fields[key].get());
			}
			/* set the old values back */
			env.internalOperation(() => {
				for (let [key, oldValue] of this.oldValues::omit('id', 'class')::entries()) {
					this.entity.fields[key].set(oldValue);
				}
			});
		}
		
	}
	
	return env.registerCommandClass('Command_edit', Command_edit);
	
};
