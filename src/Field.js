import {Subject}                  from 'rxjs/Subject';
import {map}                      from 'rxjs/operator/map';
import {filter}                   from 'rxjs/operator/filter';
import {pairwise}                 from 'rxjs/operator/pairwise';
import {takeUntil}                from 'rxjs/operator/takeUntil';
import {switchMap}                from 'rxjs/operator/switchMap';
import {take}                     from 'rxjs/operator/take';
import {startWith}                from 'rxjs/operator/startWith';
import {defer as deferObservable} from 'rxjs/observable/defer';
import {merge}                    from 'rxjs/observable/merge';
import {concat}                   from 'rxjs/observable/concat';

import inRange           from 'lodash/inRange';
import isString          from 'lodash/isString';
import isArray           from 'lodash/isArray';
import isUndefined       from 'lodash/isUndefined';
import isFunction        from 'lodash/isFunction';
import pick              from 'lodash/pick';
import get               from 'lodash/get';

import assert            from 'power-assert';

import ValueTracker,  {event, property}         from "./util/ValueTracker";
import ObservableSet, {setEquals, transformSet} from './util/ObservableSet';
import {humanMsg} from "./util/misc";

const $$owner    = Symbol('$$owner');
const $$key      = Symbol('$$key');
const $$desc     = Symbol('$$key');
const $$value    = Symbol('$$value');
const $$pristine = Symbol('$$pristine');
const $$initSet  = Symbol('$$initSet');

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
			for (let {key, desc} of FieldClass.entriesIn(cls)) {
				if (!onlyForKey || onlyForKey === key) {
					FieldClass.initClass({ cls, key, desc });
				}
			}
		}
		
		/* only initialize a class once */
		if (cls[$$initialized]) { return }
		cls[$$initialized] = true;
		
		/* create instance properties related to fields */
		Object.defineProperties(cls.prototype, {
			field_get:      { value(key)                 { return this[$$fields][key].get()               } },
			field_set:      { value(key, value, options) { return this[$$fields][key].set(value, options) } },
			field_commit:   { async value(keys) {
				if (isString(keys)) { return await this[$$fields][keys].commit() }
				if (isUndefined(keys)) { keys = Object.keys(this[$$fields]) }
				assert(isArray(keys));
				return await Promise.all(keys.map(::this.field_commit));
				// TODO: commit all fields in a single transaction?
			}},
			field_rollback: { async value(keys) {
				if (isString(keys)) { return await this[$$fields][keys].rollback() }
				if (isUndefined(keys)) { keys = Object.keys(this[$$fields]) }
				assert(isArray(keys));
				return await Promise.all(keys.map(::this.field_rollback));
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
		const entries = {};
		for (let FieldClass of [
			PropertyField,
			SideField,
			Rel1Field,
			RelShortcut1Field,
			Rel$Field,
			RelShortcut$Field
		]) for (let { key, desc, relatedKeys } of FieldClass.entriesIn(owner.constructor)) {
			entries[key] = {
				waitUntilConstructed,
				owner,
				key,
				desc,
				initialValue: initialValues[key],
				relatedKeys,
				FieldClass
			};
		}
		for (let entry of Object.values(entries)) {
			entry.related = pick(entries, entry.relatedKeys);
		}
		for (let entry of Object.values(entries)) {
			let {FieldClass} = entry;
			delete entry.FieldClass;
			delete entry.relatedKeys;
			new FieldClass(entry);
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
	
	constructor({ owner, key, desc, setValueThroughSignal = true }) {
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
	
	//noinspection JSDuplicatedDeclaration // (to suppress warning due to Webstorm bug)
	get() { return this[$$value] }
	
	set(val, { ignoreReadonly = false, ignoreValidation = false, updatePristine = false } = {}) {
		if (!this.constructor.isEqual(this[$$value], val)) {
			assert(ignoreReadonly || !this[$$desc].readonly, humanMsg`
				Tried to set the readonly field '${this[$$owner].constructor.name} # ${this[$$key]}'.
			`);
			if (!ignoreValidation) {
				this.validate(val);
			}
			if (updatePristine) {
				this[$$pristine] = val;
			}
			this[$$value] = val;
			this.p('value').next(val);
		}
	}
	
	[$$initSet](...alternatives) {
		
		for (let [guard, value] of alternatives) {
			if (isFunction(guard) ? guard() : guard) {
				if (isUndefined(value)) { return }
				let val = isFunction(value) ? value() : value;
				if (this.constructor.isEqual(this[$$value], val)) { return }
				this.validate(val);
				this.set(val, {
					ignoreReadonly:   true,
					ignoreValidation: true,
					updatePristine:   true
				});
				return;
			}
		}
		
		assert(false, humanMsg`
			No value given for '${this[$$owner].constructor.name} # ${this[$$key]}'.
		`);
		
	}
	
	validate(val) {}
	
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
		return Object.entries(cls.properties)
		             .map(([key, desc])=>({
			             key,
			             desc,
			             relatedKeys: []
		             }));
	}
	
	
	//////////////
	// instance //
	//////////////
	
	constructor(options) {
		super(options);
		const { owner, key, desc, initialValue } = options;
		
		/* sanity checks */
		assert(isUndefined(desc.value) || isUndefined(initialValue), humanMsg`
			You tried to manually assign a value ${JSON.stringify(initialValue)}
			to ${owner.constructor.name}#${key},
			but it already has a fixed value of ${JSON.stringify(desc.value)}.
		`);
		
		/* set the initial value */
		this[$$initSet](
			[!isUndefined(initialValue), initialValue],
			['default' in desc,          desc.default],
			['value'   in desc,          desc.value  ],
			[!desc.required]
		);
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
			{ key: 1, cls, desc: cls.domains[0][1], relatedKeys: [2] },
			{ key: 2, cls, desc: cls.domains[0][2], relatedKeys: [1] }
		];
		// TODO: unify multiple overlapping domains when needed
	}
	
	
	//////////////
	// instance //
	//////////////
	
	constructor(options) {
		super(options);
		const { owner, desc, key, initialValue, waitUntilConstructed } = options;
		
		/* set the initial value */
		this[$$initSet](
			[!isUndefined(initialValue), initialValue                   ],
			[desc.class.singleton,       ::desc.other.class.getSingleton],
			[desc.options.auto,          ::desc.other.class.new         ]
		);
		
		/* if one side becomes null, then so does the other, */
		/* releasing the relationship                        */
		this.p('value')
			::waitUntilConstructed()
			::filter(v=>v===null)
			.subscribe(owner[$$fields][desc.other.side]);
		
		/* when a side changes, let the relevant resources know */
		this.p('value')
			::startWith(null)
			::waitUntilConstructed()
			::pairwise()
			.subscribe(([prev, curr]) => {
				if (desc.cardinality.max === 1) {
					if (prev) { prev[$$fields][desc.key][$$value] = null          }
					if (curr) { curr[$$fields][desc.key][$$value] = this[$$owner] }
				} else {
					if (prev) { prev[$$fields][desc.key][$$value].delete(this[$$owner]) }
					if (curr) { curr[$$fields][desc.key][$$value].add   (this[$$owner]) }
				}
			});
		
		
	}
	
	validate(val) {
		/* the value must be of the proper domain */
		if ((!val instanceof this[$$desc].class)) {
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
				set(val) { this[$$fields][key].set(val) }
			}),
			enumerable:   true,
			configurable: false
		});
	}
	
	static entriesIn(cls) {
		if (!cls.isResource) { return [] }
		return Object.entries(cls.relationships)
		             .filter(([,desc]) => desc.cardinality.max === 1)
		             .map(([key, desc]) => ({
		                 key,
		                 desc,
		                 relatedKeys: desc.options.key ? [desc.options.key] : []
		             }));
	}
	
	
	//////////////
	// instance //
	//////////////
	
	constructor(options) {
		super(options);
		const { owner, key, desc, initialValue, waitUntilConstructed, related } = options;
		
		/* you cannot give a value as an actual relation and as a shortcut at the same time */
		let givenShortcutInitialValue = get(related, [desc.options.key, 'initialValue']);
		assert(!(initialValue || desc.other.class.singleton) || !givenShortcutInitialValue);
		
		/* set the initial value */
		this[$$initSet](
			[initialValue,               initialValue                       ],
			[desc.other.class.singleton, () => desc.relationshipClass.new({ //
					[desc.side]:       this[$$owner],                       //
					[desc.other.side]: desc.other.class.getSingleton()      //
				})                                                          ],
			[givenShortcutInitialValue],
			[desc.options.auto, () => desc.relationshipClass.new({          //
					[desc.side]:       this[$$owner],                       //
					[desc.other.side]: desc.other.class.new()               //
				})                                                          ],
			[desc.cardinality.min === 0, null                               ]
		);
		
		// TODO: must have synchronous way to create new uncommitted object
				
		/* keep the relationship up to date with changes here */
		this.p('value')
			::waitUntilConstructed()
			::startWith(null)
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
		assert(val !== null || this[$$desc].cardinality.min === 0, humanMsg`
			Invalid value '${val}' given for ${this[$$owner].constructor.name}#${this[$$key]}.
		`);
		/* the value must be of the proper domain */
		assert(val === null || val instanceof this[$$desc].relationshipClass, humanMsg`
			Invalid value '${val}' given for ${this[$$owner].constructor.name}#${this[$$key]}.
		`);
		// TODO: these should not be assertions, but proper constraint-checks,
		//     : recording errors, possibly allowing them temporarily, etc.
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
		             .filter(([,rel]) => rel.cardinality.max === 1)
		             .map(([key, desc]) => ({
			             key,
			             desc,
			             relatedKeys: desc.key ? [desc.key] : []
		             }));
	}
	
	
	//////////////
	// instance //
	//////////////
	
	constructor(options) {
		super(options);
		const { owner, key, desc, initialValue, waitUntilConstructed, related } = options;
		
		/* set the initial value */
		this[$$initSet](
			[initialValue, initialValue],
			[true]
		);
		// shortcuts are only initialized with explicit initial values;
		// all the fallback options are left to the actual relationship field,
		// so that the two don't compete. Therefore, this constructor is very
		// forgiving. The constraint checks are done on the other constructor.
		
		const correspondingRel = deferObservable(() => owner[$$fields][desc.key].p('value'))
			::waitUntilConstructed();
		
		/* keep this value up to date with new sides of new relationships */
		correspondingRel
			::filter(rel => rel)
			::switchMap(rel => rel[$$fields][desc.other.side].p('value'))
			.subscribe( this.p('value') );
		
		/* keep the relationship up to date */
		correspondingRel
			::filter(rel => rel)
			.subscribe((rel) => {
				this.p('value')
					::takeUntil(correspondingRel::filter(r => r !== rel))
					.subscribe( rel[$$fields][desc.other.side].p('value') );
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
		             .filter(([,rel]) => rel.cardinality.max > 1)
		             .map(([key, desc]) => ({
				         key,
				         desc,
				         relatedKeys: desc.options.key ? [desc.options.key] : []
		             }));
	}
	
	static isEqual: setEquals;
	
	
	//////////////
	// instance //
	//////////////
	
	constructor(options) {
		super({ ...options, setValueThroughSignal: false });
		const { owner, desc, initialValue, waitUntilConstructed, related } = options;
		
		this[$$pristine] = new Set();
		this[$$value]    = new ObservableSet();
		
		/* emit 'value' signals (but note that setValueThroughSignal = false) */
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
		
		/* handle initial values */
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
		} else if (desc.cardinality.min === 0) {
			// OK, this field is optional
		} else if (related[desc.options.key] && related[desc.options.key].initialValue) {
			// OK, a shortcut was given
		} else {
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
		             .filter(([,rel]) => rel.cardinality.max > 1)
		             .map(([key, desc]) => ({
				         key,
				         desc,
				         relatedKeys: desc.key ? [desc.key] : []
		             }));
	}
	
	static isEqual: setEquals;
	
	
	//////////////
	// instance //
	//////////////
	
	constructor(options) {
		super({ ...options, setValueThroughSignal: false });
		const { owner, desc, initialValue, waitUntilConstructed, related } = options;
		
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
		
		/* handle initial values */
		if (initialValue !== undefined) {
			for (let res of initialValue) {
				// TODO: - rel may be a reference to an existing resource;
				//     :   then go get it
				//     : - It may also be a description of a new resource;
				//     :   then create it
				this[$$pristine].add(res);
				this[$$value]   .add(res);
			}
		} else if (desc.cardinality.min === 0) {
			// OK, this field is optional
		} else if (related[desc.key].initialValue) {
			// OK, a non-shortcut value was given
		} else {
			assert(false, humanMsg`
				No value given for '${this[$$owner].constructor.name} # ${this[$$key]}'.
			`);
		}
		
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
		if (!(element instanceof this[$$desc].class)) {
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
