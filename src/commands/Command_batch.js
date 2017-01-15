import isFunction from 'lodash-bound/isFunction';
import assert     from 'power-assert';

import {constraint, humanMsg} from '../util/misc';

import {$$entities} from '../symbols';
import {Field} from '../fields/Field';
// import {$$commands} from './symbols';

export default (cls) => class Command_batch extends cls.Command {
	
	static commandType = 'batch';
	
	static get entityClass() { return cls }
	
	static create(commands, options = {}) {
		return super.create([commands], options);
	}
	
	constructor(commands, options = {}) {
		super({
			...options,
			commandDependencies: [
				...(options.commandDependencies || []),
				...(() => {
					let deps = [];
					for (let cmd of commands) {
						// TODO: Do we need a concept of dependencies?
						//       Or will we always make batch a one-off thing?
					}
				})()
			]
		});
		this.commands = commands;
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
		/* track this command in the entity */
		/* this is already done in the Entity constructor (earlier than this) */
		// this.result.originCommand = this;
		/* register as new */
		this.result.pSubject('isNew').next(true);
		/* register this entity */
		cls.Entity[$$entities].add(this.result);
	}
	
	async localCommit() {
		const backend = cls.environment.backend;
		const {id, href} = await backend.commit_new(this.result.toJSON());
		
		assert(id && href, humanMsg`
			Command_new#localCommit needs to
			receive both id and href arguments.
		`);
		
		/* set id and href */
		const opts = {
			ignoreReadonly:    true,
			updatePristine:    true, // TODO: does this option make sense?
			createEditCommand: false
		};
		this.result.fields['id']  .set(id,   opts);
		this.result.fields['href'].set(href, opts);
		
		/* after it's first committed, it's no longer new, but is pristine */
		this.result.pSubject('isNew')     .next(false);
		this.result.pSubject('isPristine').next(true);
		
		/* maintain caches */
		cls.Entity[$$entitiesByHref][href] = this.result;
		cls.Entity[$$committedEntities].add(this.result);
	}

	localRollback() {
		/* destruct each field */
		Field.destructEntity(this.result); // TODO: test
		
		/* un-register the entity */
		cls.Entity[$$entities].delete(this.result);
		// TODO: remove other traces of the entity
		
		/* untrack this command in the entity */
		this.result.originCommand = null;
		
		/* forget about created entity */
		this.result = null;
	}
};
