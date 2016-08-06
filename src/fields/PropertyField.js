import isUndefined from 'lodash-bound/isUndefined';
import entries     from 'lodash-bound/entries';
import keys        from 'lodash-bound/keys';

import {defineProperty} from 'bound-native-methods';

import assert from 'power-assert';

import {humanMsg, assign} from "../util/misc";

import {Field} from './Field';

import {
	$$registerFieldClass,
	$$owner,
	$$key,
	$$desc,
	$$initSet,
	$$entriesIn,
} from './symbols';


Field[$$registerFieldClass](class PropertyField extends Field {
	
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
	
});