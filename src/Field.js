import {Subject}         from 'rxjs/Subject';
import {map}             from 'rxjs/operator/map';
import {filter}          from 'rxjs/operator/filter';
import {pairwise}        from 'rxjs/operator/pairwise';
import {takeUntil}       from 'rxjs/operator/takeUntil';
import {switchMap}       from 'rxjs/operator/switchMap';
import {take}            from 'rxjs/operator/take';
import {startWith}       from 'rxjs/operator/startWith';
import {merge}           from 'rxjs/observable/merge';
import {concat}          from 'rxjs/observable/concat';
import 'rxjs/add/operator/do';

import inRange           from 'lodash/inRange';
import isString          from 'lodash/isString';
import isArray           from 'lodash/isArray';

import assert            from 'power-assert';

import ValueTracker,  {event, property}         from "./util/ValueTracker";
import ObservableSet, {setEquals, transformSet} from './util/ObservableSet';
import {humanMsg} from "./util/misc";

const $$owner           = Symbol('$$owner');
const $$key             = Symbol('$$key');
const $$desc            = Symbol('$$key');
const $$value           = Symbol('$$value');
const $$pristine        = Symbol('$$pristine');
// const $$subjectValue    = Symbol('$$subjectValue');
// const $$subjectCommit   = Symbol('$$subjectCommit');
// const $$subjectRollback = Symbol('$$subjectRollback');

const $$fields = Symbol('$$fields');

const $$initialized = Symbol('$$initialized');



// TODO: handle destruction of objects, and use it also to stop subscriptions



export class Field extends ValueTracker {
	
	////////////
	// static //
	////////////
	
	static augmentClass(cls, onlyForKey) {
		/* allow each kind of field to perform its initializations */
		for (let FieldClass of [
			PropertyField,
			SideField,
			Rel1Field,
			RelShortcut1Field,
			Rel$Field,
			RelShortcut$Field
		]) {
			for (let [key, desc] of FieldClass.entriesIn(cls)) {
				if (!onlyForKey || onlyForKey === key) {
					FieldClass.initClass({ cls, key, desc });
				}
			}
		}
		
		/* only initialize a class once */
		if (cls[$$initialized]) { return }
		cls[$$initialized] = true;
		
		Object.defineProperties(cls.prototype, {
			get:      { value(key)        { return this[$$fields][key].get()      } },
			set:      { value(key, value) { return this[$$fields][key].set(value) } },
			commit:   { async value(keys) {
				if (isString(keys)) { return await this[$$fields][keys].commit() }
				if (keys === undefined) { keys = Object.keys(this[$$fields]) }
				assert(isArray(keys));
				return await Promise.all(keys.map(key => this.commit(key)));
				// TODO: commit all fields in a single transaction?
			}},
			rollback: { async value(keys) {
				if (isString(keys)) { return await this[$$fields][keys].rollback() }
				if (keys === undefined) { keys = Object.keys(this[$$fields]) }
				assert(isArray(keys));
				return await Promise.all(keys.map(key => this.rollback(key)));
				// TODO: rollback all fields in a single transaction?
			}},
			field: { value(key) {
				assert(this[$$fields][key], humanMsg`
					This entity does not have a '${key}' field.
				`);
				return Object.assign(...[
					'e',
				    'p',
				    'get',
				    'set',
				    'validate',
				    'commit',
				    'rollback'
				].map(m => ({ [m]: ::this[$$fields][key][m] })));
			}}
		});
		
	}
	
	static initializeEntity(owner, initialValues) {
		if (owner[$$fields]) { return }
		owner[$$fields] = {};
		
		/* allow specific field-init code to wait until all fields are initialized */
		let constructing = new Subject;
		let waitUntilConstructed = function() {
			return concat(constructing, this);
		};
		
		/* initialize all fields */
		for (let FieldClass of [
			PropertyField,
			SideField,
			Rel1Field,
			RelShortcut1Field,
			Rel$Field,
			RelShortcut$Field
		]) {
			for (let [key, desc] of FieldClass.entriesIn(owner.constructor)) {
				new FieldClass({
					waitUntilConstructed,
					owner,
					key,
					desc,
					initialValue: initialValues[key]
				});
			}
		}
		
		/* notify completion of field initialization */
		constructing.complete();
	}
	
	static isEqual(a, b) { return a === b }
	
	
	/////////////////////////
	// events & properties //
	/////////////////////////
	
	@event()    commitEvent;
	@event()    rollbackEvent;
	@property() value;
	
	
	//////////////
	// instance //
	//////////////
	
	//noinspection JSDuplicatedDeclaration // (to suppress Webstorm bug)
	get [Symbol.toStringTag]() {
		return `Field: ${this[$$owner].constructor.name} # ${this[$$key]}`;
	}
	
	constructor({ owner, key, desc, initialValue, setValueThroughSignal = true }) {
		super();
		owner[$$fields][key] = this;
		this[$$owner]  = owner;
		this[$$key]    = key;
		this[$$desc]   = desc;
		if (setValueThroughSignal) {
			// allow signal-push to change value
			this.p('value').subscribe(::this.set);
		}
	}
	
	//noinspection JSDuplicatedDeclaration // (to suppress Webstorm bug)
	get() { return this[$$value] }
	
	set(val) {
		if (!this.constructor.isEqual(this[$$value], val)) {
			assert(!this[$$desc].readonly);
			this.validate(val);
			this[$$value] = val;
			this.p('value').next(val);
		}
	}
	
	validate(val) { return (val !== undefined) }
	
	commit() {
		const old = this[$$pristine];
		const nw = this[$$pristine] = this[$$value];
		this.e('commit').next({ old, new: nw });
	}
	
	rollback() {
		this.e('rollback').next({
			old: this[$$value],
			new: this[$$pristine]
		});
		this.set(this[$$pristine]);
	}
	
	isPristine() {
		return this.constructor.isEqual(this[$$value], this[$$pristine]);
	}
	
	// s(op: 'value' | 'commit' | 'rollback') {
	// 	switch (op) {
	// 		case 'value':    return this[$$subjectValue];
	// 		case 'commit':   return this[$$subjectCommit]  .asObservable();
	// 		case 'rollback': return this[$$subjectRollback].asObservable();
	// 	}
	// }
	
}




export class PropertyField extends Field {
	
	// this[$$owner] instanceof RelatedTo | Resource
	// this[$$key]   instanceof "name" | "class" | "href" | ...
	// this[$$value] instanceof any
	
	////////////
	// static //
	////////////
	
	static initClass({ cls, key, desc: {readonly} }) {
		if (cls.prototype.hasOwnProperty(key)) { return }
		Object.defineProperty(cls.prototype, key, {
			get() { return this[$$fields][key].get() },
			...(readonly ? undefined : {
				set(val) { this[$$fields][key].set(val)}
			}),
			enumerable:   true,
			configurable: false
		});
	}
	
	static entriesIn(cls) {
		return Object.entries(cls.properties);
	}
	
	
	//////////////
	// instance //
	//////////////
	
	constructor(options) {
		super(options);
		const { owner, key, desc, initialValue } = options;
		
		/* sanity checks */
		assert(!('value' in desc) || (initialValue === undefined), humanMsg`
			You tried to manually assign a value to ${owner.constructor.name}#${key},
			but it already has a fixed value.
		`);
		
		/* set the initial values */
		if (initialValue !== undefined) {
			this[$$pristine] = initialValue;
			if (this[$$desc].readonly) {
				this[$$value] = initialValue;
			} else {
				this.set(initialValue);
			}
		} else if ('default' in desc) {
			this[$$pristine] = desc.default;
			this.set(desc.default);
		} else if ('value' in desc) {
			this[$$pristine] = desc.value;
			this.set(desc.value);
		} else if (desc.required) {
			assert(false, humanMsg`
				Trying to create a '${owner.constructor.name}' instance,
				but the required property '${key}' did not receive a value.
			`);
		}
	}
	
	validate(val) {
		// TODO: CHECK CONSTRAINT: given property value conforms to JSON schema
		// TODO: CHECK ADDITIONAL (PROPERTY-SPECIFIC) CONSTRAINTS: e.g., if this
		//     : is a template, does it conform to its corresponding type?
	}
	
}


// TODO: when setting values that are resources or relationships,
//     : the given object can be a new one or an existing one;
//     : if it's a new one, actually create it


export class SideField extends Field {
	
	// this[$$owner] instanceof RelatedTo
	// this[$$key]   instanceof 1 | 2
	// this[$$value] instanceof Resource
	
	////////////
	// static //
	////////////
	
	static initClass({ cls, key, desc: {readonly} }) {
		assert(cls.isRelationship);
		if (cls.prototype.hasOwnProperty(key)) { return }
		Object.defineProperty(cls.prototype, key, {
			get() { return this[$$fields][key].get() },
			...(readonly ? undefined : {
				set(val) { this[$$fields][key].set(val)}
			}),
			enumerable:   true,
			configurable: false
		});
	}
	
	static entriesIn(cls) {
		if (!cls.isRelationship) { return [] }
		return [
			[1, { key: 1, cls, domain: cls.domains[0][1] }],
			[2, { key: 2, cls, domain: cls.domains[0][2] }]
		];
		// TODO: unify multiple overlapping domains when needed
	}
	
	
	//////////////
	// instance //
	//////////////
	
	constructor(options) {
		super(options);
		const { owner, desc: {domain}, key, initialValue, waitUntilConstructed } = options;
		
		assert(initialValue);
		this[$$pristine] = initialValue;
		this.set(initialValue);
		
		/* if one side becomes null, then so does the other, */
		/* releasing the relationship                        */
		this.p('value')
			::waitUntilConstructed()
			::filter(v=>v===null)
			.subscribe(owner[$$fields][domain.other.side]);
		
		/* when a side changes, let the relevant resources know */
		this.p('value')
			::startWith(null)
			::waitUntilConstructed()
			::pairwise()
			.subscribe(([prev, curr]) => {
				if (domain.cardinality.max === 1) {
					if (prev) { prev[$$fields][domain.key][$$value] = null          }
					if (curr) { curr[$$fields][domain.key][$$value] = this[$$owner] }
				} else {
					if (prev) { prev[$$fields][domain.key][$$value].delete(this[$$owner]) }
					if (curr) { curr[$$fields][domain.key][$$value].add   (this[$$owner]) }
				}
			});
		
		
	}
	
	validate(val) {
		/* the value must be of the proper domain */
		if ((!val instanceof this[$$desc].domain.class)) {
			throw new Error(humanMsg`
				Invalid value '${val}' given for ${this[$$owner].constructor.name}#${this[$$key]}.
			`);
		}
	}
	
}

export class Rel1Field extends Field {
	
	// this[$$owner] instanceof Resource
	// this[$$key]   instanceof "-->HasInnerBorder" | "<--HasPlusBorder" | ...
	// this[$$value] instanceof IsRelatedTo
	
	////////////
	// static //
	////////////
	
	static initClass({ cls, key, desc: {readonly} }) {
		assert(cls.isResource);
		if (cls.prototype.hasOwnProperty(key)) { return }
		Object.defineProperty(cls.prototype, key, {
			get() { return this[$$fields][key].get() },
			...(readonly ? undefined : {
				set(val) { this[$$fields][key].set(val)}
			}),
			enumerable:   true,
			configurable: false
		});
	}
	
	static entriesIn(cls) {
		if (!cls.isResource) { return [] }
		return Object.entries(cls.relationships)
		             .filter(([,rel]) => rel.cardinality.max === 1);
	}
	
	
	//////////////
	// instance //
	//////////////
	
	constructor(options) {
		super(options);
		const { owner, key, desc, initialValue, waitUntilConstructed } = options;
		
		if (initialValue) {
			this[$$pristine] = initialValue;
			this.set(initialValue);
		} else if (desc.cardinality.min === 0) {
			this.set(key, null);
		} else {
			//// TODO: check whether the value was given through a shortcut field
			// assert(false, humanMsg`
			// 	No value given for '${owner.constructor.name}#${key}'.
			// `);
		}
		// TODO: option to auto-create default relationship + opposing resource?
		
		
		
		
		/* keep the relationship up to date with changes here */
		this.p('value')
			::startWith(null)
			::waitUntilConstructed()
			::pairwise()
			.subscribe(([prev, curr]) => {
				if (prev) { prev[$$fields][desc.side].set(null) }
				if (curr) { curr[$$fields][desc.side].set(this) }
			});
		
		/* set the value of this field to null when the relationship replaces this resource */
		this.p('value')
			::waitUntilConstructed()
			::filter(v=>v)
			::switchMap((newRel) => newRel[$$fields][desc.side].p('value'))
			::filter((res) => res !== owner)
			::map(()=>null)
			.subscribe( this.p('value') );
	}
	
	validate(val) {
		/* if there's a minimum cardinality, a value must have been given */
		if (val === null && this[$$desc].cardinality.min > 0) {
			throw new Error(humanMsg`
				Invalid value '${val}' given for ${this[$$owner].constructor.name}#${this[$$key]}.
			`);
		}
		/* the value must be of the proper domain */
		if (!(val instanceof this[$$desc].relationshipClass)) {
			throw new Error(humanMsg`
				Invalid value '${val}' given for ${this[$$owner].constructor.name}#${this[$$key]}.
			`);
		}
	}
	
}

export class RelShortcut1Field extends Field {
	
	// this[$$owner] instanceof Resource
	// this[$$key]   instanceof "innerBorder" | "plusBorder" | ...
	// this[$$value] instanceof Resource
	
	////////////
	// static //
	////////////
	
	static initClass({ key, cls, desc: {readonly} }) {
		assert(cls.isResource);
		if (cls.prototype.hasOwnProperty(key)) { return }
		Object.defineProperty(cls.prototype, key, {
			get() { return this[$$fields][key].get() },
			...(readonly ? undefined : {
				set(val) { this[$$fields][key].set(val)}
			}),
			enumerable:   true,
			configurable: false
		});
	}
	
	static entriesIn(cls) {
		if (!cls.isResource) { return [] }
		return Object.entries(cls.relationshipShortcuts)
		             .filter(([,rel]) => rel.cardinality.max === 1);
	}
	
	
	//////////////
	// instance //
	//////////////
	
	constructor(options) {
		super(options);
		const { owner, desc, initialValue, waitUntilConstructed } = options;
		
		if (initialValue) {
			this[$$pristine] = initialValue;
			this.set(initialValue);
		} else if (desc.cardinality.min === 0) {
			this.set(null);
		} else if (desc.options.auto) {
			// auto-creating auto-creatable stuff
			desc.other.class.new().then(::this.set); // TODO: must have synchronous way to create new uncommitted object
		} else {
			assert(false);
		}
		// TODO: option to auto-create default relationship + opposing resource?
		
		const correspondingRel = owner[$$fields][desc.key].p('value')
			::filter(rel => rel);
		
		/* keep this value up to date with new sides of new relationships */
		correspondingRel
			::waitUntilConstructed()
			::filter(rel => rel)
			::switchMap(rel => rel[$$fields][desc.other.side].p('value'))
			.subscribe(this.p('value'));
		
		/* keep the relationship up to date */
		correspondingRel
			::waitUntilConstructed()
			.subscribe((rel) => {
				this.p('value')
					::takeUntil(correspondingRel::filter(r => r !== rel))
					.subscribe(rel[$$fields][desc.other.side].p('value'));
			});
	}
		
	validate(val) {
		/* if there's a minimum cardinality, a value must have been given */
		if (val === null && this[$$desc].cardinality.min > 0) {
			throw new Error(humanMsg`
				Invalid value '${val}' given for ${this[$$owner].constructor.name}#${this[$$key]}.
			`);
		}
		/* the value must be of the proper domain */
		if (!(val instanceof this[$$desc].other.class)) {
			throw new Error(humanMsg`
				Invalid value '${val}' given for ${this[$$owner].constructor.name}#${this[$$key]}.
			`);
		}
	}
	
}

export class Rel$Field extends Field {
	
	// this[$$owner] instanceof Resource
	// this[$$key]   instanceof "-->ContainsMaterial" | "-->HasPart" | "<--FlowsTo" | ...
	// this[$$value] instanceof Set<IsRelatedTo>
	
	////////////
	// static //
	////////////
	
	static initClass({ cls, key, desc: {readonly} }) {
		assert(cls.isResource);
		if (cls.prototype.hasOwnProperty(key)) { return }
		Object.defineProperty(cls.prototype, key, {
			get() { return this[$$fields][key].get() },
			...(readonly ? undefined : {
				set(val) { this[$$fields][key].set(val)}
			}),
			enumerable:   true,
			configurable: false
		});
	}
	
	static entriesIn(cls) {
		if (!cls.isResource) { return [] }
		return Object.entries(cls.relationships)
		                   .filter(([,rel]) => rel.cardinality.max > 1);
	}
	
	static isEqual: setEquals;
	
	
	//////////////
	// instance //
	//////////////
	
	constructor(options) {
		super({ ...options, setValueThroughSignal: false });
		const { owner, desc, initialValue, waitUntilConstructed } = options;
		
		this[$$pristine] = new Set();
		this[$$value]    = new ObservableSet();
		
		// we emit 'value' signals, but note that setValueThroughSignal = false
		merge(this.get().e('add'), this.get().e('delete'))
			::waitUntilConstructed()
			::map(::this.get)
			.subscribe(this.p('value'));
		
		/* update relationships that are added or deleted here */
		this.get().e('add')
			::waitUntilConstructed()
			.subscribe((addedRel) => {
				addedRel[$$fields][desc.side].set(this[$$owner]);
			});
		this.get().e('delete')
			::waitUntilConstructed()
			.subscribe((deletedRel) => {
				deletedRel.delete();
			});
		
		/* remove a relationship when it removes this resource */
		this.get().e('add')
			::waitUntilConstructed()
			::switchMap(newRel => newRel[$$fields][desc.side].p('value')
				::filter(res => res !== owner)
				::map(()=>newRel)
		).subscribe( this.get().e('delete') );
		
		if (initialValue !== undefined) {
			for (let rel of initialValue) {
				// TODO: - rel may be a reference to an existing relationship;
				//     :   then go get it
				//     : - It may also be a description of a new relationship;
				//     :   then create it
				if (!rel[$$fields][desc.side].get()) {
					rel[$$fields][desc.side].set(this);
				}
				assert(rel[desc.side] === this);
				
				this[$$pristine].add(rel);
				this[$$value]   .add(rel);
			}
		} else if (desc.cardinality.min > 0) {
			assert(false);
		}
		// TODO: option to auto-create default relationship + opposing resource?
		
	}
	
	set(newValue) {
		assert(!this[$$desc].readonly);
		this.validate(newValue);
		transformSet(this[$$value], newValue);
	}
	
	validate(val) {
		assert(val[Symbol.iterator]);
		const {min, max} = this[$$desc].cardinality;
		assert(inRange(val.size, min, max+1));
		val.forEach(::this.validateElement);
	}
	
	validateElement(element) {
		/* the value must be of the proper domain */
		if (!(element instanceof this[$$desc].relationshipClass)) {
			throw new Error(humanMsg`
				Invalid value '${element}' given as element for ${this[$$owner].constructor.name}#${this[$$key]}.
			`);
		}
	}
	
	commit() {
		this.e('commit').next({
			old: this[$$pristine],
			new: this[$$value]
		});
		transformSet(this[$$pristine], this[$$value]);
	}
	
	rollback() {
		this.e('rollback').next({
			old: this[$$value],
			new: this[$$pristine]
		});
		transformSet(this[$$value], this[$$pristine]);
	}
	
}

export class RelShortcut$Field extends Field {
	
	// this[$$owner] instanceof Resource
	// this[$$key]   instanceof "materials" | "parts" | "incomingProcesses" | ...
	// this[$$value] instanceof Set<Resource>
	
	////////////
	// static //
	////////////
	
	static initClass({ key, cls, desc: {readonly} }) {
		assert(cls.isResource);
		if (cls.prototype.hasOwnProperty(key)) { return }
		Object.defineProperty(cls.prototype, key, {
			get() { return this[$$fields][key].get() },
			...(readonly ? undefined : {
				set(val) { this[$$fields][key].set(val)}
			}),
			enumerable:   true,
			configurable: false
		});
	}
	
	static entriesIn(cls) {
		if (!cls.isResource) { return [] }
		return Object.entries(cls.relationshipShortcuts)
		             .filter(([,rel]) => rel.cardinality.max > 1);
	}
	
	static isEqual: setEquals;
	
	
	//////////////
	// instance //
	//////////////
	
	constructor(options) {
		super({ ...options, setValueThroughSignal: false });
		const { owner, desc, initialValue, waitUntilConstructed } = options;
		
		this[$$pristine] = new Set();
		this[$$value]    = new ObservableSet();

		// we emit 'value' signals, but note that setValueThroughSignal = false
		merge(this.get().e('add'), this.get().e('delete'))
			::waitUntilConstructed()
			::map(::this.get)
			.subscribe(this.p('value'));
		
		const correspondingRelField = owner[$$fields][desc.key][$$value];
		correspondingRelField.e('add')
			::waitUntilConstructed()
			.subscribe((newRel) => {
				let newRelDisconnected = newRel[$$fields][desc.side].p('value')
					::filter(v => v !== owner)
					::take(1);
				
				newRel[$$fields][desc.other.side].p('value')
					::takeUntil(newRelDisconnected)
					::startWith(null)::pairwise().subscribe(([prev, curr]) => {
						if (prev) { this[$$value].delete(prev) }
						if (curr) { this[$$value].add   (curr) }
					});
				newRelDisconnected.subscribe(() => {
					this[$$value].delete(newRel[$$fields][desc.other.side][$$value]);
				});
			});
		
		this[$$value].e('add')
			::waitUntilConstructed()
			.subscribe((newRes) => {
				let rel = [...correspondingRelField]
					.find(rel => rel[$$fields][desc.side]      [$$value] === owner &&
					             rel[$$fields][desc.other.side][$$value] === newRes);
				if (!rel) {
					correspondingRelField.add(desc.relationshipClass.new({
						[desc.side]:       owner,
						[desc.other.side]: newRes
					}));
				}
			});
		
		if (initialValue !== undefined) {
			for (let res of initialValue) {
				// TODO: - rel may be a reference to an existing resource;
				//     :   then go get it
				//     : - It may also be a description of a new resource;
				//     :   then create it
				this[$$pristine].add(res);
				this[$$value]   .add(res);
			}
		} else if (desc.cardinality.min > 0) {
			assert(false);
		}
		// TODO: option to auto-create default relationship + opposing resource?
		
	}
	
	set(newValue) {
		assert(!this[$$desc].readonly);
		this.validate(newValue);
		transformSet(this[$$value], newValue);
	}
	
	validate(val) {
		assert(val[Symbol.iterator]);
		const {min, max} = this[$$desc].cardinality;
		assert(inRange(val.size, min, max+1));
		val.forEach(::this.validateElement);
	}
	
	validateElement(element) {
		/* the value must be of the proper domain */
		if (!(element instanceof this[$$desc].relationshipClass)) {
			throw new Error(humanMsg`
				Invalid value '${element}' given as element for ${this[$$owner].constructor.name}#${this[$$key]}.
			`);
		}
	}
	
	async commit() {
		this.e('commit').next({
			old: this[$$pristine],
			new: this[$$value]
		});
		transformSet(this[$$pristine], this[$$value]);
	}
	
	async rollback() {
		this.e('rollback').next({
			old: this[$$value],
			new: this[$$pristine]
		});
		transformSet(this[$$value], this[$$pristine]);
	}
	
}
