import isFunction from 'lodash-bound/isFunction';
import isString   from 'lodash-bound/isString';
import entries    from 'lodash-bound/entries';
import assert     from 'power-assert';
import {setPrototype} from 'bound-native-methods';
import {
	$$entities,
	$$entitiesByHref,
	$$committedEntities,
	$$isPlaceholder
} from '../symbols';
import {constraint, humanMsg} from '../util/misc';

export default (cls) => class Command_load extends cls.TrackedCommand {
	
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
			commitDependencies: [
				...(options.commitDependencies || []),
				...(()=>{
					if (!cls.isResource) { return [] }
					let r = [];
					for (let [key, value] of values::entries()) {
						if ((cls.relationships[key] || cls.relationshipShortcuts[key]) && value) {
							// TODO: loop for rel$ class fields
							r.push(value.originCommand);
						}
					}
					return r;
				})(),
				...(()=>{
					if (!cls.isRelationship) { return [] }
					let r = [];
					for (let side of [1, 2]) {
						if (values[side]) {
							r.push(values[side].originCommand);
						}
					}
					return r;
				})()
			],
			commandDependencies: [
				...(options.commandDependencies || []),
				...(()=>{
					let entity = cls.getLocal(values);
					return entity && entity.originCommand
						? [entity.originCommand]
						: [];
				})(),
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
		this.values      = values;
		this.placeholder = options.placeholder;
	}
	
	get associatedEntities() {
		return new Set(this.result ? [this.result] : []);
	}
	
	values;
	placeholder;
	result;
	
	localRun() {
		this.result = cls.getLocal(this.values);
		if (!this.result) {
			/* identify class */
			const realCls = this.values.class::isString()
				? cls.environment.classes[this.values.class]
				: cls;
			
			/* sanity checks */
			constraint(this.placeholder || !realCls.abstract, humanMsg`
				Cannot instantiate the abstract
				class ${realCls.name}.
			`);
			constraint(cls.hasSubclass(realCls), humanMsg`
				Expected ${realCls.name} to be
				a subclass of ${cls.name}.
			`);
			
			/* construct entity */
			this.result = new realCls(
				{ ...this.values },
				{ ...this.options, allowInvokingConstructor: true }
			);
			this.result[$$isPlaceholder] = this.placeholder;
			
			/* track this command in the entity */
			this.result.originCommand = this; // TODO: maintain array of originCommands instead
			
			/* register this entity */
			cls[$$entities].add(this.result);
			cls[$$entitiesByHref][this.result.href] = this.result;
			cls[$$committedEntities].add(this.result);
			
			/* after it's first committed, it's no longer new */
			this.result.pSubject('isNew').next(false);
		} else {
			/* sanity checks */
			constraint(this.result.isPristine, humanMsg`
				Cannot load data into the ${this.result.class}
				with href="${this.result.href}", because it has local changes.
			`);
			
			/* check class compatibility */
			const oldCls = cls.environment.classes[this.result.class];
			const newCls = cls.environment.classes[this.values.class];
			if (this.result.isPlaceholder) {
				constraint(oldCls.hasSubclass(newCls), humanMsg`
					Expected ${newCls.name} to be
					a subclass of ${oldCls.name}.
				`);
				if (oldCls !== newCls) {
					this.result::setPrototype(newCls.prototype);
				}
			} else {
				constraint(oldCls === newCls, humanMsg`
					Expected ${newCls.name} to be ${oldCls.name}.
				`);
			}
			
			/* track this command in the entity */
			this.result.originCommand = this; // TODO: maintain array of originCommands instead
			
			/* if we're loading a placeholder, we're done now */
			if (this.placeholder) { return }
			
			/* otherwise, set the values */
			for (let [key, value] of this.values::entries()) {
				this.result.fields[key].set(value, {
					createEditCommand: false,
					ignoreReadonly:    true,
					ignoreValidation:  true
				});
			}
			this.result[$$isPlaceholder] = false;
		}
	}
	
	toJSON(options = {}) {
		assert(false, humanMsg`
			Command_load#toJSON should never be called.
			It is meant for commands that can be serialized and transmitted.
		`);
	}
	
	localCommit() {
		assert(false, humanMsg`
			Command_load#localCommit should never be called,
			because a load command starts out as being committed.
			(${href})
		`);
	}
	
	handleCommitResponse(response) {
	} // intentionally empty

	localRollback() {
		assert(false, humanMsg`
			Command_load#localRollback should never be called,
			because a load command starts out as being committed.
			(${this.result.href})
		`);
	}
};
