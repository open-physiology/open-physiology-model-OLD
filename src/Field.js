import {Subject}                  from 'rxjs/Subject';
import {map}                      from 'rxjs/operator/map';
import {filter}                   from 'rxjs/operator/filter';
import {pairwise}                 from 'rxjs/operator/pairwise';
import {takeUntil}                from 'rxjs/operator/takeUntil';
import {switchMap}                from 'rxjs/operator/switchMap';
import {take}                     from 'rxjs/operator/take';
import {startWith}                from 'rxjs/operator/startWith';
import {withLatestFrom}           from 'rxjs/operator/withLatestFrom';
import {defer as deferObservable} from 'rxjs/observable/defer';
import {concat}                   from 'rxjs/observable/concat';

import inRange     from 'lodash-bound/inRange';
import get         from 'lodash-bound/get';
import size        from 'lodash-bound/size';
import pick        from 'lodash-bound/pick';
import isFunction  from 'lodash-bound/isFunction';
import isUndefined from 'lodash-bound/isUndefined';
import isNull      from 'lodash-bound/isNull';
import values      from 'lodash-bound/values';
import entries     from 'lodash-bound/entries';

import _isObject from 'lodash/isObject';

import {defineProperties, defineProperty} from 'bound-native-methods';

import assert from 'power-assert';

import ValueTracker,  {event, property}           from "./util/ValueTracker";
import ObservableSet, {setEquals, copySetContent} from './util/ObservableSet';
import {humanMsg, assign} from "./util/misc";

const $$owner    = Symbol('$$owner');
const $$key      = Symbol('$$key');
const $$desc     = Symbol('$$key');
const $$value    = Symbol('$$value');
const $$pristine = Symbol('$$pristine');
const $$initSet  = Symbol('$$initSet');
const $$entriesIn = Symbol('$$entriesIn');

const $$initialized = Symbol('$$initialized');

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
			for (let {key, desc} of FieldClass[$$entriesIn](cls)) {
				if (!onlyForKey || onlyForKey === key) {
					FieldClass.initClass({ cls, key, desc });
				}
			}
		}
		
		/* only initialize a class once */
		if (cls[$$initialized]) { return }
		cls[$$initialized] = true;
		
	}
	
	static initializeEntity(owner, initialValues) {
		if (owner.fields) { return }
		owner::defineProperty('fields', { value: {} });
		
		/* allow specific field-init code to wait until all fields are initialized */
		const constructing = new Subject();
		const waitUntilConstructed = function() {
			return concat(constructing, this);
		};
		
		/* initialize all fields */
		const keyDescs = {};
		for (let FieldClass of [
			PropertyField,
			SideField,
			Rel1Field,
			RelShortcut1Field,
			Rel$Field,
			RelShortcut$Field
		]) for (let { key, desc, relatedKeys } of FieldClass[$$entriesIn](owner.constructor)) {
			keyDescs[key] = {
				waitUntilConstructed,
				owner,
				key,
				desc,
				initialValue: initialValues[key],
				relatedKeys,
				FieldClass
			};
		}
		for (let entry of keyDescs::values()) {
			entry.related = keyDescs::pick(entry.relatedKeys);
		}
		for (let entry of keyDescs::values()) {
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
	
	@event() commitEvent;
	@event() rollbackEvent;
	
	@property({ initial: true, readonly: true }) isPristine;
	@property() value;
	
	
	//////////////
	// instance //
	//////////////
	
	//noinspection JSDuplicatedDeclaration // (to suppress Webstorm bug)
	get [Symbol.toStringTag]() {
		return `Field: ${this[$$owner].constructor.name}#${this[$$key]}`;
	}
	
	constructor({ owner, key, desc, setValueThroughSignal = true }) {
		super();
		owner.fields[key] = this;
		this[$$owner] = owner;
		this[$$key]   = key;
		this[$$desc]  = desc;
		if (setValueThroughSignal) {
			// allow signal-push to change value
			this.p('value').subscribe(::this.set);
		}
		this.p('value')
			::map(v => this.constructor.isEqual(v, this[$$pristine]))
			.subscribe( this.pSubject('isPristine') );
	}
	
	//noinspection JSDuplicatedDeclaration // (to suppress warning due to Webstorm bug)
	get() { return this[$$value] }
	
	set(val, { ignoreReadonly = false, ignoreValidation = false, updatePristine = false } = {}) {
		if (!this.constructor.isEqual(this[$$value], val)) {
			assert(ignoreReadonly || !this[$$desc].readonly, humanMsg`
				Tried to set the readonly field
				'${this[$$owner].constructor.name}#${this[$$key]}'.
			`);
			if (!ignoreValidation) { this.validate(val, ['set']) }
			if (updatePristine)    { this[$$pristine] = val      }
			this[$$value] = val;
			this.pSubject('value').next(val);
		}
	}
	
	[$$initSet](...alternatives) {
		
		for (let [guard, value] of alternatives) {
			if (guard::isFunction() ? guard() : guard) {
				if (value::isUndefined()) { return }
				let val = value::isFunction() ? value() : value;
				if (this.constructor.isEqual(this[$$value], val)) { return }
				this.validate(val, ['initialize', 'set']);
				this.set(val, {
					ignoreReadonly:   true,
					ignoreValidation: true,
					updatePristine:   true
				});
				return;
			}
		}
		
	}
	
	isInvalid(val) {
		try {
			let valueToValidate = val::isUndefined() ? this[$$value] : val;
			this.validate(valueToValidate, ['set', 'commit']);
			return false;
		} catch (err) {
			return err;
		}
	}
	
	validate(val, stages = []) {}
	
	async commit() {
		this.validate(this[$$value], ['commit']);
		this[$$pristine] = this[$$value];
		this.pSubject('isPristine').next(true);
	}
	
	rollback() {
		this.set(this[$$pristine]);
	}
	
}




export class PropertyField extends Field {
	
	//////////////////
	// Change class //
	//////////////////
	
	
	
	
	
	
	// this[$$owner] instanceof RelatedTo | Resource
	// this[$$key]   instanceof "name" | "class" | "href" | ...
	// this[$$value] instanceof any
	
	////////////
	// static //
	////////////
	
	static initClass({ cls, key, desc: {readonly} }) {
		if (cls.prototype.hasOwnProperty(key)) { return }
		cls.prototype::defineProperty(key, {
			get() { return this.fields[key].get() },
			...(readonly ? undefined : {
				set(val) { this.fields[key].set(val)}
			}),
			enumerable:   true,
			configurable: false
		});
	}
	
	static [$$entriesIn](cls) {
		return cls.properties::entries()
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
		assert(desc.value::isUndefined() || initialValue::isUndefined(), humanMsg`
			You tried to manually assign a value ${JSON.stringify(initialValue)}
			to ${owner.constructor.name}#${key},
			but it already has a fixed value of ${JSON.stringify(desc.value)}.
		`);
		
		/* set the initial value */
		this[$$initSet](
			[!initialValue::isUndefined(), initialValue],
			['default' in desc,            desc.default],
			['value'   in desc,            desc.value  ],
			[!desc.required]
		);
	}
	
	validate(val, stages = []) {
		
		if (stages.includes('commit')) {
			assert(!this[$$desc].required || !val::isUndefined(), humanMsg`
			    No value given for required field
			    '${this[$$owner].constructor.name}#${this[$$key]}'.
			`);
		}
		
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
		cls.prototype::defineProperty(key, {
			get() { return this.fields[key].get() },
			...(readonly ? undefined : {
				set(val) { this.fields[key].set(val)}
			}),
			enumerable:   true,
			configurable: false
		});
	}
	
	static [$$entriesIn](cls) {
		if (!cls.isRelationship) { return [] }
		return [
			{ key: 1, cls, desc: cls.domainPairs[0][1], relatedKeys: [2] },
			{ key: 2, cls, desc: cls.domainPairs[0][2], relatedKeys: [1] }
		];
		// TODO: unify multiple overlapping domainPairs when needed
	}
	
	
	//////////////
	// instance //
	//////////////
	
	constructor(options) {
		super(options);
		const { owner, desc, key, initialValue, waitUntilConstructed } = options;
		
		/* set the initial value */
		this[$$initSet](
			[!initialValue::isUndefined(), initialValue                       ],
			[desc.resourceClass.singleton, ::desc.codomain.resourceClass.getSingleton],
			[desc.options.auto,            ::desc.codomain.resourceClass.new         ]
		);
		
		/* if one side becomes null, then so does the other, */
		/* releasing the relationship                        */
		this.p('value')
			::waitUntilConstructed()
			::filter(v=>v===null)
			.subscribe(owner.fields[desc.codomain.keyInRelationship]);
		
		/* when a side changes, let the relevant resources know */
		this.p('value')
			::startWith(null)
			::waitUntilConstructed()
			::pairwise()
			.subscribe(([prev, curr]) => {
				if (desc.cardinality.max === 1) {
					if (prev) { prev.fields[desc.keyInResource].set(null)          }
					if (curr) { curr.fields[desc.keyInResource].set(this[$$owner]) }
				} else {
					if (prev) { prev.fields[desc.keyInResource].get().delete(this[$$owner]) }
					if (curr) { curr.fields[desc.keyInResource].get().add   (this[$$owner]) }
				}
			});
		
		
	}
	
	validate(val, stages = []) {
		
		const notGiven = val::isNull() || val::isUndefined();
		
		if (stages.includes('commit')) {
			/* if there's a minimum cardinality, a value must have been given */
			assert(!notGiven, humanMsg`
			    No resource specified for side ${this[$$key]} of
				this '${this[$$owner].constructor.name}'.
			`);
		}
		
		/* the value must be of the proper domain */
		if (!(notGiven || this[$$desc].resourceClass.hasInstance(val))) {
			throw new Error(humanMsg`
				Invalid value '${val}' given for ${this[$$owner].constructor.name}#${this[$$key]}.
			`);
		}
		
		// TODO: these should not be assertions, but proper constraint-checks,
		//     : recording errors, possibly allowing them temporarily, etc.
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
		cls.prototype::defineProperty(key, {
			get() { return this.fields[key].get() },
			...(readonly ? undefined : {
				set(val) { this.fields[key].set(val) }
			}),
			enumerable:   true,
			configurable: false
		});
	}
	
	static [$$entriesIn](cls) {
		if (!cls.isResource) { return [] }
		return cls.relationships::entries()
		             .filter(([,desc]) => desc.cardinality.max === 1)
		             .map(([key, desc]) => ({
		                 key,
		                 desc,
		                 relatedKeys: desc.shortcutKey ? [desc.shortcutKey] : []
		             }));
	}
	
	
	//////////////
	// instance //
	//////////////
	
	constructor(options) {
		super(options);
		const { owner, key, desc, initialValue, waitUntilConstructed, related } = options;
		
		/* you cannot give a value as an actual relation and as a shortcut at the same time */
		let givenShortcutInitialValue = related::get([desc.shortcutKey, 'initialValue']);
		assert(!initialValue || !givenShortcutInitialValue, humanMsg`
			You cannot set the fields '${key}' and '${desc.shortcutKey}'
			at the same time for a ${this.constructor.singular}.
		`);
		
		/* set the initial value */
		this[$$initSet](
			[initialValue, initialValue],
			[givenShortcutInitialValue ],
			[desc.options.auto, () => desc.relationshipClass.new({                                    //
					[desc.keyInRelationship]         : this[$$owner],                                 //
					[desc.codomain.keyInRelationship]: desc.codomain.resourceClass.newOrSingleton()   //
				})],
			[desc.cardinality.min === 0, null]
		);
		
		/* keep the relationship up to date with changes here */
		this.p('value')
			::waitUntilConstructed()
			::startWith(null)
			::pairwise()
			.subscribe(([prev, curr]) => {
				if (prev) { prev.fields[desc.keyInRelationship].set(null)          } // TODO: delete relationship
				if (curr) { curr.fields[desc.keyInRelationship].set(this[$$owner]) } //     : setting side to null is always error
			});
		
		/* set the value of this field to null when the relationship replaces this resource */
		this.p('value')
			::waitUntilConstructed()
			::filter(_isObject)
			::switchMap(newRel => newRel.fields[desc.keyInRelationship].p('value'))
			::filter(res => res !== owner)
			::map(()=>null)
			.subscribe( this.p('value') );
	}
	
	validate(val, stages = []) {
		
		const notGiven = val::isNull() || val::isUndefined();
		
		if (stages.includes('commit')) {
			/* if there's a minimum cardinality, a value must have been given */
			assert(!notGiven || this[$$desc].cardinality.min === 0, humanMsg`
				No value given for required field
				${this[$$owner].constructor.name}#${this[$$key]}.
			`);
		}
		
		/* the value must be of the proper domain */
		if (!(notGiven || this[$$desc].relationshipClass.hasInstance(val))) {
			throw new Error(humanMsg`
				Invalid value '${val}' given for field ${this[$$owner].constructor.name}#${this[$$key]}.
			`);
		}
		
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
		cls.prototype::defineProperty(key, {
			get() { return this.fields[key].get() },
			...(readonly ? undefined : {
				set(val) {
					this.fields[key].set(val)
				}
			}),
			enumerable:   true,
			configurable: false
		});
	}
	
	static [$$entriesIn](cls) {
		if (!cls.isResource) { return [] }
		return cls.relationshipShortcuts::entries()
		             .filter(([,rel]) => rel.cardinality.max === 1)
		             .map(([key, desc]) => ({
			             key,
			             desc,
			             relatedKeys: desc.keyInResource ? [desc.keyInResource] : []
		             }));
	}
	
	
	//////////////
	// instance //
	//////////////
	
	constructor(options) {
		super(options);
		const { owner, key, desc, initialValue, waitUntilConstructed, related } = options;
		
		/* set the initial value */
		// shortcuts are only initialized with explicit initial values;
		// all the fallback options are left to the actual relationship field,
		// so that the two don't compete. Therefore, this constructor is very
		// forgiving. The constraint checks are done on the other constructor.
		this[$$initSet](
			[initialValue, initialValue],
			[true]
		);
		
		const correspondingRelValue =
			deferObservable(() => owner.fields[desc.keyInResource].p('value'))
				::waitUntilConstructed();
		
		/* keep this value up to date with new sides of new relationships */
		correspondingRelValue
			::filter(rel => rel)
			::switchMap(rel => rel.fields[desc.codomain.keyInRelationship].p('value'))
			.subscribe( this.p('value') );
		
		/* keep the relationship up to date */
		this.p('value')::withLatestFrom(correspondingRelValue).subscribe(([scValue, relValue]) => {
			if (relValue) {
				relValue.fields[desc.codomain.keyInRelationship].set(scValue || null);
			} else {
				owner.fields[desc.keyInResource].set(desc.relationshipClass.new({
					[desc.keyInRelationship]         : owner,
					[desc.codomain.keyInRelationship]: scValue
				}));
			}
		});
	}
		
	validate(val, stages = []) {
		
		const notGiven = val === null || val::isUndefined();
		
		if (stages.includes('commit')) {
			/* if there's a minimum cardinality, a value must have been given */
			assert(!notGiven || this[$$desc].cardinality.min === 0, humanMsg`
				No value '${val}' given for required field ${this[$$owner].constructor.name}#${this[$$key]}.
			`);
		}
		
		/* the value must be of the proper domain */
		if (!(notGiven || this[$$desc].codomain.resourceClass.hasInstance(val))) {
			throw new Error(humanMsg`
				Invalid value '${val}' given for field ${this[$$owner].constructor.name}#${this[$$key]}.
			`);
		}
		
		// TODO: these should not be assertions, but proper constraint-checks,
		//     : recording errors, possibly allowing them temporarily, etc.
		
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
		cls.prototype::defineProperty(key, {
			get() { return this.fields[key].get() },
			...(readonly ? undefined : {
				set(val) { this.fields[key].set(val)}
			}),
			enumerable:   true,
			configurable: false
		});
	}
	
	static [$$entriesIn](cls) {
		if (!cls.isResource) { return [] }
		return cls.relationships::entries()
			.filter(([,rel]) => rel.cardinality.max > 1)
			.map(([key, desc]) => ({
				key,
				desc,
				relatedKeys: desc.shortcutKey ? [desc.shortcutKey] : []
			}));
	}
	
	static isEqual: setEquals;
	
	
	//////////////
	// instance //
	//////////////
	
	constructor(options) {
		super({ ...options, setValueThroughSignal: false });
		const { owner, desc, initialValue, waitUntilConstructed, related } = options;
		
		this::defineProperty($$pristine, { value: new Set           });
		this::defineProperty($$value,    { value: new ObservableSet });
		
		/* emit 'value' signals (but note that setValueThroughSignal = false) */
		this[$$value].p('value')::waitUntilConstructed().subscribe(this.p('value'));
		
		/* update relationships that are added or deleted here */
		this[$$value].e('add')
			::waitUntilConstructed()
			.subscribe((addedRel) => {
				addedRel.fields[desc.keyInRelationship].set(this[$$owner]);
			});
		this[$$value].e('delete')
			::waitUntilConstructed()
			.subscribe((deletedRel) => { deletedRel.delete() });
		
		/* decouple a relationship when it decouples from this resource */
		this[$$value].e('add')
			::waitUntilConstructed()
			::switchMap(newRel => newRel.fields[desc.keyInRelationship].p('value')
				::filter(res => res !== owner)
				::map(() => newRel)
			).subscribe( this[$$value].e('delete') );
		
		/* handle initial values */
		if (initialValue && initialValue[Symbol.iterator]) {
			for (let rel of initialValue) {
				// TODO: - rel may be a reference to an existing relationship;
				//     :   then go get it
				//     : - It may also be a description of a new relationship;
				//     :   then create it
				if (!rel.fields[desc.keyInRelationship].get()) {
					rel.fields[desc.keyInRelationship].set(this);
				}
				assert(rel[desc.keyInRelationship] === this);
				
				this[$$pristine].add(rel);
				this[$$value]   .add(rel);
			}
		} else if (related::get([desc.shortcutKey, 'initialValue'])) {
			// OK, a shortcut was given
		} else if (desc.cardinality.min === 0) {
			// OK, this field is optional
		}
	}
	
	set(newValue, { ignoreReadonly = false, ignoreValidation = false, updatePristine = false } = {}) {
		assert(ignoreReadonly || !this[$$desc].readonly);
		if (!ignoreValidation) { this.validate(newValue, ['set'])           }
		if (updatePristine)    { copySetContent(this[$$pristine], newValue) }
		copySetContent(this[$$value], newValue);
	}
	
	validate(val, stages = []) {
		assert(val[Symbol.iterator], humanMsg`
			The value ${val} given for ${this[$$owner].constructor.name}#${this[$$key]}
			is not an iterable collection (like array or set).
		`);
		if (stages.includes('commit')) {
			const { min, max } = this[$$desc].cardinality;
			assert(val::size()::inRange(min, max + 1));
		}
		val.forEach(::this.validateElement);
	}
	
	validateElement(element) {
		/* the value must be of the proper domain */
		if (!this[$$desc].relationshipClass.hasInstance(element)) {
			throw new Error(humanMsg`
				Invalid value ${element} given as element for
				${this[$$owner].constructor.name}#${this[$$key]}.
			`);
		}
	}
	
	async commit() {
		this.validate(this[$$value], ['commit']);
		copySetContent(this[$$pristine], this[$$value]);
		this.e('commit').next(this[$$value]);
	}
	
	rollback() {
		copySetContent(this[$$value], this[$$pristine]);
		this.e('rollback').next(this[$$value]);
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
		cls.prototype::defineProperty(key, {
			get() { return this.fields[key].get() },
			...(readonly ? undefined : {
				set(val) { this.fields[key].set(val)}
			}),
			enumerable:   true,
			configurable: false
		});
	}
	
	static [$$entriesIn](cls) {
		if (!cls.isResource) { return [] }
		return cls.relationshipShortcuts::entries()
		             .filter(([,rel]) => rel.cardinality.max > 1)
		             .map(([key, desc]) => ({
				         key,
				         desc,
				         relatedKeys: desc.keyInResource ? [desc.keyInResource] : []
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
		this[$$value].p('value')
			::waitUntilConstructed()
			.subscribe(this.p('value'));
		
		/* syncing with relationship field */
		const correspondingRelField = owner.fields[desc.keyInResource][$$value];
		correspondingRelField.e('add')
			::waitUntilConstructed()
			.subscribe((newRel) => {
				let newRelDisconnected = newRel.fields[desc.keyInRelationship].p('value')
					::filter(v => v !== owner)
					::take(1);
				newRel.fields[desc.codomain.keyInRelationship].p('value')
					::takeUntil(newRelDisconnected)
					::startWith(null)::pairwise().subscribe(([prev, curr]) => {
						if (prev) { this[$$value].delete(prev) }
						if (curr) { this[$$value].add   (curr) }
					});
				newRelDisconnected.subscribe(() => {
					this[$$value].delete(newRel.fields[desc.codomain.keyInRelationship][$$value]);
				});
			});
		
		/* syncing with relationship field */
		this[$$value].e('add')
			::waitUntilConstructed()
			.subscribe((newRes) => {
				let rel = [...correspondingRelField]
					.find(rel => rel.fields[desc.keyInRelationship]      [$$value] === owner &&
					             rel.fields[desc.codomain.keyInRelationship][$$value] === newRes);
				if (!rel) {
					correspondingRelField.add(desc.relationshipClass.new({
						[desc.keyInRelationship]          :       owner,
						[desc.codomain.keyInRelationship]: newRes
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
		}
	}
	
	set(newValue, { ignoreReadonly = false, ignoreValidation = false, updatePristine = false } = {}) {
		assert(ignoreReadonly || !this[$$desc].readonly);
		if (!ignoreValidation) { this.validate(newValue, ['set'])           }
		if (updatePristine)    { copySetContent(this[$$pristine], newValue) }
		copySetContent(this[$$value], newValue);
	}
	
	validate(val, stages = []) {
		assert(val[Symbol.iterator], humanMsg`
			The value ${val} given for ${this[$$owner].constructor.name}#${this[$$key]}
			is not an iterable collection (like array or set).
		`);
		if (stages.includes('commit')) {
			const {min, max} = this[$$desc].cardinality;
			assert(val::size()::inRange(min, max+1));
		}
		val.forEach(::this.validateElement);
	}
	
	validateElement(element) {
		/* the value must be of the proper domain */
		if (!this[$$desc].codomain.resourceClass.hasInstance(element)) {
			throw new Error(humanMsg`
				Invalid value ${element} given as element for
				${this[$$owner].constructor.name}#${this[$$key]}.
			`);
		}
	}
	
	async commit() {
		this.validate(this[$$value], ['commit']);
		copySetContent(this[$$pristine], this[$$value]);
		this.e('commit').next(this[$$value]);
	}
	
	rollback() {
		copySetContent(this[$$value], this[$$pristine]);
		this.e('rollback').next(this[$$value]);
	}
	
}
