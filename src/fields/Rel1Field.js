import {map}       from 'rxjs/operator/map';
import {filter}    from 'rxjs/operator/filter';
import {pairwise}  from 'rxjs/operator/pairwise';
import {switchMap} from 'rxjs/operator/switchMap';
import {startWith} from 'rxjs/operator/startWith';
import 'rxjs/add/operator/do';

import get         from 'lodash-bound/get';
import isUndefined from 'lodash-bound/isUndefined';
import isNull      from 'lodash-bound/isNull';
import entries     from 'lodash-bound/entries';

import _isObject from 'lodash/isObject';

import {defineProperty} from 'bound-native-methods';

import assert from 'power-assert';

import {humanMsg, callOrReturn, constraint} from "../util/misc";

import {Field, RelField} from './Field';

import {
	$$registerFieldClass,
	$$owner,
	$$key,
	$$desc,
	$$initSet,
	$$entriesIn,
} from './symbols';


Field[$$registerFieldClass](class Rel1Field extends RelField {
	
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
		const { owner, key, desc, initialValue, waitUntilConstructed, constructingOwner, related } = options;
		
		/* you cannot give a value as an actual relation and as a shortcut at the same time */
		let givenShortcutInitialValue = related::get([desc.shortcutKey, 'initialValue']);
		constraint(!initialValue || !givenShortcutInitialValue, humanMsg`
			You cannot set the fields '${key}' and '${desc.shortcutKey}'
			at the same time for a ${this.constructor.singular}.
		`);
		
		/* set the initial value */
		this[$$initSet](
			[initialValue, initialValue],
			[givenShortcutInitialValue ],
			[desc.options.auto, () => desc.relationshipClass.new({
				[desc.keyInRelationship]         : this[$$owner],
				[desc.codomain.keyInRelationship]: desc.codomain.resourceClass.newOrSingleton()
			})],
			[desc.options.default, () => desc.relationshipClass.new({
				[desc.keyInRelationship]         : this[$$owner],
				[desc.codomain.keyInRelationship]: desc.options.default::callOrReturn()
			})],
			[desc.cardinality.min === 0, null]
		);
		
		/* pull in values set in sub-fields */
		constructingOwner.subscribe({complete: ()=>{
			for (let subCls of desc.relationshipClass.extendedBy) {
				const subFieldKey = subCls.keyInResource[desc.keyInRelationship];
				const subField = owner.fields[subFieldKey];
				if (!subField) { continue }
				subField.p('value').subscribe( this.p('value') );
			}
		}});
		
		/* keep the relationship up to date with changes here */
		this.p('value')
			::waitUntilConstructed()
			::startWith(null)
			::pairwise()
			.subscribe(([prev, curr]) => {
				if (prev) { prev.fields[desc.keyInRelationship].set(null)          }
				if (curr) { curr.fields[desc.keyInRelationship].set(this[$$owner]) }
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
			constraint(!notGiven || this[$$desc].cardinality.min === 0, humanMsg`
				No value given for required field
				${this[$$owner].constructor.name}#${this[$$key]}.
			`);
		}
		
		/* the value must be of the proper domain */
		const expectedRelationshipClass = this[$$desc].relationshipClass;
		const hasCompatibleType = expectedRelationshipClass.hasInstance(val);
		constraint(notGiven || hasCompatibleType, humanMsg`
			Invalid value '${val}' given for field ${this[$$owner].constructor.name}#${this[$$key]}.
		`);
		
		// TODO: these should not be assertions, but proper constraint-checks,
		//     : recording errors, possibly allowing them temporarily, etc.
	}
	
});
