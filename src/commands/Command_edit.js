import {humanMsg} from 'utilities';

import assert from 'power-assert';
import {mapValues, keys, pick, entries, omit} from 'lodash-bound';

import deepFreeze from 'deep-freeze-strict';

import Command_factory from './Command.js';



export default (env) => {
	
	const Command = Command_factory(env);

	class Command_edit extends Command {
		
		entity;
		oldValues;
		
		/**
		 *
		 * @param entity
		 * @param newValues
		 * @param oldValues
		 * @param options
		 */
		constructor(entity, newValues = null, oldValues = null, options = {}) {
			super({
				...options,
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
		
		get associatedEntities() {
			return new Set(this.entity ? [this.entity] : []);
		}
		
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
		
		toJSON(options = {}) {
			return {
				commandType: 'edit',
				address:     this.entity::pick('class', 'id'),
				newValues:   this.newValues
			};
		}
		
		async localCommit() {
			return await env.backend.commit_edit(
				this.entity::pick('class', 'id'),
				deepFreeze(this.newValues)
			);
		}
		
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
