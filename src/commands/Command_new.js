import isFunction from 'lodash-bound/isFunction';
import entries    from 'lodash-bound/entries';
import isArray    from 'lodash-bound/isArray';
import assert     from 'power-assert';

import {constraint, humanMsg} from '../util/misc';

import {
	$$entities,
	$$entitiesByHref,
	$$committedEntities,
	$$isPlaceholder
} from '../symbols';
import {Field} from '../fields/Field';
// import {$$commands} from './symbols';

export default (cls) => class Command_new extends cls.TrackedCommand {
	
	static commandType = 'new';
	
	static get entityClass() { return cls }
	
	static create(initialValues = {}, options = {}) {
		return super.create([initialValues], options);
	}
	
	constructor(initialValues = {}, options = {}) {
		super({
			...options,
			commitDependencies: [
				...(options.commitDependencies || []),
				...(()=>{
					if (!cls.isResource) { return [] }
					let r = [];
					for (let [key, value] of initialValues::entries()) {
						const relDesc = (cls.relationships[key] || cls.relationshipShortcuts[key]);
						if (relDesc && value) {
							if (relDesc.cardinality.max <= 1) { value = [value] }
							r.push(...value.map(addr=>cls.Entity.getLocalOrNewPlaceholder(addr).originCommand));
						}
					}
					return r;
				})(),
				...(()=>{
					if (!cls.isRelationship) { return [] }
					let r = [];
					for (let side of [1, 2]) {
						if (initialValues[side]) {
							r.push(cls.Entity.getLocalOrNewPlaceholder(initialValues[side]).originCommand);
						}
					}
					return r;
				})()
			]
		});
		this.initialValues = initialValues;
	}
	
	get associatedEntities() {
		return new Set(this.result ? [this.result] : []);
	}
	
	result = null;
	
	localRun() {
		/* sanity checks */
		constraint(!cls.abstract, humanMsg`
			Cannot instantiate the abstract
			class ${cls.name}.
		`);
		/* construct entity */
		if (cls.behavior['new']::isFunction()) {
			this.result = cls.behavior['new'](this) || null;
		} else {
			this.result = new cls(
				{ ...this.initialValues },
				{ ...this.options, allowInvokingConstructor: true }
			);
		}
		this.result[$$isPlaceholder] = false;
		/* track this command in the entity */
		this.result.originCommand = this;
		/* register as new */
		this.result.pSubject('isNew').next(true);
		/* register this entity */
		cls.Entity[$$entities].add(this.result);
	}
	
	toJSON(options = {}) {
		const {entityToTemporaryHref = new Set} = options;
		return {
			commandType: 'new',
			values: this.result.constructor.objectToJSON({
				...this.initialValues,
				class: cls.name,
				...(entityToTemporaryHref.has(this.result)
					? { href: entityToTemporaryHref.get(this.result) }
					: {})
			}, {
				...options,
				sourceEntity: this.result
			})
		};
	}
	
	async localCommit() {
		const backend = cls.environment.backend;
		//debugger;
		const response = await backend.commit_new(this.toJSON());
		//debugger;
		this.handleCommitResponse(response);
	}
	
	handleCommitResponse(response) {
		assert(!!response.href, humanMsg`
			The backend function commit_new needs to
			return an object with an href property.
		`);
		
		/* set the new values */
		for (let [key, newValue] of response::entries()) {
			if (this.result.fields[key]) {
				this.result.fields[key].set(newValue, {
					ignoreReadonly:    true,
					createEditCommand: false
				});
			}
		}
		
		/* after it's first committed, it's no longer new */
		this.result.pSubject('isNew').next(false);
		
		/* maintain caches */
		cls.Entity[$$entitiesByHref][response.href] = this.result;
		cls.Entity[$$committedEntities].add(this.result);
	}

	localRollback() {
		/* destruct each field */
		Field.destructEntity(this.result);
		
		/* un-register the entity */
		delete cls.Entity[$$entitiesByHref][this.result.href];
		cls.Entity[$$entities].delete(this.result);
		cls.Entity[$$committedEntities].delete(this.result);
		
		/* untrack this command in the entity */
		this.result.originCommand = null;
		
		/* forget about created entity */
		this.result = null;
	}
};
