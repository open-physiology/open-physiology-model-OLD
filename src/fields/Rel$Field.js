import {map}       from 'rxjs/operator/map';
import {filter}    from 'rxjs/operator/filter';
import {switchMap} from 'rxjs/operator/switchMap';
import 'rxjs/add/operator/do';

import inRange from 'lodash-bound/inRange';
import get     from 'lodash-bound/get';
import size    from 'lodash-bound/size';
import entries from 'lodash-bound/entries';

import {defineProperty} from 'bound-native-methods';

import assert from 'power-assert';

import ObservableSet, {setEquals, copySetContent} from '../util/ObservableSet';
import {humanMsg, assign} from "../util/misc";

import {Field, RelField} from './Field';

import {
	$$registerFieldClass,
	$$owner,
	$$key,
	$$desc,
	$$value,
	$$pristine,
	$$entriesIn
} from './symbols';


Field[$$registerFieldClass](class Rel$Field extends RelField {
	
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
		
		/* fill up missing required values with 'auto'matic ones */
		if (desc.options.auto) {
			for (let i = this[$$value]::size(); i < desc.cardinality.min; ++i) {
				const rel = desc.relationshipClass.new({
					[desc.keyInRelationship]         : this[$$owner],
					[desc.codomain.keyInRelationship]: desc.codomain.resourceClass.newOrSingleton()
				});
				this[$$pristine].add(rel);
				this[$$value]   .add(rel);
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
			const { min, max } = this[$$desc].cardinality;
			assert(val.size::inRange(min, max + 1));
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
	
});
