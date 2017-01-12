import isFunction from 'lodash-bound/isFunction';
import isString   from 'lodash-bound/isString';
import assert     from 'power-assert';
import {
	$$entities,
	$$committedEntitiesByHref,
	$$committedEntities
} from '../symbols';
import {constraint, humanMsg} from '../util/misc';

export default (cls) => class Command_load extends cls.Command {
	
	static commandType = 'load';
	
	static get entityClass() { return cls }
	
	static create(values, options = {}) {
		return super.create([values], options);
	}
	
	constructor(values = {}, options = {}) {
		super({
			...options,
			run:       true,
			committed: true,
			commandDependencies: [
				...(options.commandDependencies || []),
				...(()=>{
					let r = [];
					if (cls.isRelationship) {
						for (let side of [1, 2]) {
							if (initialValues[side]) {
								r.push(initialValues[side].originCommand);
							}
						}
					}
					return r;
				})()
			]
		});
		this.values = values;
	}
	
	get associatedEntities() {
		return new Set(this.result ? [this.result] : []);
	}
	
	result = null;
	
	localRun() {
		/* identify class */
		const realCls = this.values.class::isString()
			? cls.environment.classes[this.values.class]
			: cls;
		/* sanity checks */
		// TODO: check that realCls is subclass of cls
		
		constraint(!realCls.abstract || humanMsg`
			Cannot instantiate the abstract
			class ${realCls.name}.
		`);
		/* construct entity */
		this.result = new realCls(
			{ ...this.values },
			{ ...this.options, allowInvokingConstructor: true }
		);
		/* track this command in the entity */
		/* this is already done in the Entity constructor (earlier than this) */
		// this.result.originCommand = this;
		
		const Entity = cls.Entity;
		
		/* register this entity */
		Entity[$$entities].add(this.result);
		
		/* after it's first committed, it's no longer new, but is pristine */
		this.result.pSubject('isNew')     .next(false);
		this.result.pSubject('isPristine').next(true);
		
		/* maintain caches */
		Entity[$$committedEntitiesByHref][this.result.href] = this.result;
		Entity[$$committedEntities].add(this.result);
		
	}
	
	localCommit({id, href}) {
		assert(false, humanMsg`
			Command_load#localCommit should never be called,
			because a load command starts out as being committed.
			(${href})
		`);
	}

	localRollback() {
		assert(false, humanMsg`
			Command_load#localRollback should never be called,
			because a load command starts out as being committed.
			(${this.result.href})
		`);
	}
};
