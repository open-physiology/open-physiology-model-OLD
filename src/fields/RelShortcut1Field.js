import {filter}                   from 'rxjs/operator/filter';
import {switchMap}                from 'rxjs/operator/switchMap';
import {startWith}                from 'rxjs/operator/startWith';
import {defer as deferObservable} from 'rxjs/observable/defer';
import 'rxjs/add/operator/do';

import entries     from 'lodash-bound/entries';
import isObject    from 'lodash-bound/isObject';

import {defineProperty} from 'bound-native-methods';

import assert from 'power-assert';

import {humanMsg, assign} from "../util/misc";

import {Field, RelField} from './Field';

import {
	$$registerFieldClass,
	$$owner,
	$$key,
	$$desc,
	$$initSet,
	$$entriesIn,
	$$value,
} from './symbols';
import {constraint} from "../util/misc";

Field[$$registerFieldClass](class RelShortcut1Field extends RelField {
	
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
			...(readonly ? {} : {
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
			::filter(v=>v)
			::switchMap(rel => rel.fields[desc.codomain.keyInRelationship].p('value'))
			.subscribe( this.p('value') );
	
		/* keep the relationship up to date */
		this.p('value')::waitUntilConstructed()
			.subscribe((scValue) => {
				const relValue = owner.fields[desc.keyInResource].get();
				if (relValue) {
					relValue.fields[desc.codomain.keyInRelationship].set(scValue || null);
				} else if (scValue) {
					owner.fields[desc.keyInResource].set(desc.relationshipClass.new({
						[desc.keyInRelationship]         : owner,
						[desc.codomain.keyInRelationship]: scValue
					}));
				}
			});
	}
		
	validate(val, stages = []) {
		
		if (stages.includes('commit')) {
			/* if there's a minimum cardinality, a value must have been given */
			constraint(val::isObject() || this[$$desc].cardinality.min === 0, humanMsg`
				No value given for required field ${this[$$owner].constructor.name}#${this[$$key]}.
			`);
		}
		
		/* a given value must always be of the proper domain */
		constraint(!val::isObject() || this[$$desc].codomain.resourceClass.hasInstance(val), humanMsg`
			Invalid value '${val}' given for field ${this[$$owner].constructor.name}#${this[$$key]}.
		`);
		
		// TODO: these should not be assertions, but proper constraint-checks,
		//     : recording errors, possibly allowing them temporarily, etc.
		
	}
	
});
