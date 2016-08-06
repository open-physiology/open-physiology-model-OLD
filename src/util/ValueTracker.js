import includes      from 'lodash-bound/includes';
import isArray       from 'lodash-bound/isArray';
import isString      from 'lodash-bound/isString';
import isFunction    from 'lodash-bound/isFunction';
import set           from 'lodash-bound/set';
import _entries      from 'lodash-bound/entries';
import ldIsEqual     from 'lodash/isEqual';
import assert        from 'power-assert';

import {Subject}              from 'rxjs/Subject';
import {BehaviorSubject}      from 'rxjs/BehaviorSubject';
import {never}                from 'rxjs/observable/never';
import {combineLatest}        from 'rxjs/operator/combineLatest';
import {distinctUntilChanged} from 'rxjs/operator/distinctUntilChanged';
import {filter}               from 'rxjs/operator/filter';
import {takeUntil}            from 'rxjs/operator/takeUntil';

const $$events             = Symbol('$$events');
const $$properties         = Symbol('$$properties');
const $$settableProperties = Symbol('$$settableProperties');
const $$initialize         = Symbol('$$initialize');
const $$takeUntil          = Symbol('$$takeUntil');
const $$filterBy           = Symbol('$$filterBy');
const $$currentValues      = Symbol('$$currentValues');

/**
 * Use this as a subclass (or just mix it in) to provide support for
 * events and observable properties through Kefir.js.
 *
 * @export
 * @class ValueTracker
 */
export default class ValueTracker {

	[$$initialize]() {
		if (this[$$events]) { return }
		this[$$events]             = {};
		this[$$properties]         = {};
		this[$$settableProperties] = {};
		this[$$currentValues]      = {};

		/* add the events and properties added with ES7 annotations */
		for (let [key, options] of (this.constructor[$$events] || {})::_entries()) {
			this.newEvent(key, options);
		}
		for (let [key, options] of (this.constructor[$$properties] || {})::_entries()) {
			this.newProperty(key, options);
		}
	}
	
	constructor() {
		this[$$takeUntil] = never();
		this[$$filterBy]  = (()=>true);
	}
	
	setValueTrackerOptions({ takeUntil = never(), filterBy = (()=>true) }) {
		this[$$takeUntil] = takeUntil;
		this[$$filterBy]  = filterBy;
		this[$$initialize]();
	}
	
	/**
	 * Declares a new event stream for this object.
	 *
	 * @public
	 * @method
	 * @param  {String} name - the name of the event, used to trigger or subscribe to it
	 * @return {Subject} - the created event stream
	 */
	newEvent(name, {} = {}) {
		this[$$initialize]();

		/* is the event name already taken? */
		assert(!this[$$events][name],
			`There is already an event '${name}' on this object.`);
		assert(!this[$$properties][name],
			`There is already a property '${name}' on this object.`);
		
		this[$$events][name] = new Subject()
			::takeUntil(this[$$takeUntil])
			::filter   (this[$$filterBy] );
		
		return this[$$events][name];
	}

	/**
	 * This method defines a new property on this object.
	 *
	 * @public
	 * @method
	 * @param  {String}                   name            - the name of the new property
	 * @param  {Boolean}                 [readonly=false] - whether the value can be manually set
	 * @param  {function(*,*):Boolean}   [isEqual]        - a predicate function by which to test for duplicate values
	 * @param  {function(*):Boolean}     [isValid]        - a predicate function to validate a given value
	 * @param  {*}                       [initial]        - the initial value of this property
	 *
	 * @return {BehaviorSubject} - the property associated with the given name
	 */
	newProperty(name, {
		readonly = false,
		isEqual  = ldIsEqual,
		isValid  = ()=>true,
		initial
	} = {}) {
		this[$$initialize]();

		/* is the property name already taken? */
		assert(!this[$$events][name],
			`There is already an event '${name}' on this object.`);
		assert(!this[$$properties][name],
			`There is already a property '${name}' on this object.`);

		/* if isValid is an array, check for inclusion */
		if (isValid::isArray()) {
			let options = isValid;
			isValid = options::includes;
		}
		
		/* define the bus which manages the property */
		this[$$settableProperties][name] = new BehaviorSubject(initial)
			::filter              (this[$$filterBy] )
			::filter              (this::isValid    )
			::takeUntil           (this[$$takeUntil])
			::distinctUntilChanged(this::isEqual    );
		if (readonly) {
			this[$$properties][name] = this[$$settableProperties][name].asObservable();
		} else {
			this[$$properties][name] = this[$$settableProperties][name];
		}
		
		/* keep track of current value */
		this[$$properties][name].subscribe((v) => {
			this[$$currentValues][name] = v;
		});
		
		/* create event version of the property */
		this[$$events][name] = this[$$settableProperties][name].asObservable();
		
		/* return property */
		return this[$$settableProperties][name];
	}

	/**
	 * Retrieve an event stream by name. If the name of a property is given, a stream
	 * based on changes to that property is returned.
	 *
	 * @public
	 * @method
	 * @param  {String}  name - the name of the event stream to retrieve
	 * @return {Observable} - the event stream associated with the given name
	 */
	e(name) {
		this[$$initialize]();
		return this[$$events][name] || never();
	}
	
	/**
	 * Retrieve a property by name.
	 *
	 * @public
	 * @method
	 * @param  {String|Array} nameOrDeps          - the name of the property to retrieve, or a list of active dependencies for a derived property
	 * @param  {Function?}    optionalTransformer - an optional function to map the dependencies to a new value for the derived property
	 * @return {BehaviorSubject | Observable} - the property associated with the given name or an observable of combined properties
	 */
	p(nameOrDeps, optionalTransformer) {
		this[$$initialize]();
		if (nameOrDeps::isArray()) {
			return combineLatest(nameOrDeps.map(n => this.p(n)), optionalTransformer);
		} else if (nameOrDeps::isString()) {
			assert(this[$$properties][nameOrDeps], `No property '${nameOrDeps}' exists.`);
			return this[$$properties][nameOrDeps];
		}
	}
	
	/**
	 * Retrieve a property by name. This returns as a Subject
	 * regardless of 'readonly' option, only to be used by
	 * the 'owner' of the property.
	 *
	 * @public
	 * @method
	 * @param  {String} name     - the name of the property to retrieve
	 * @return {BehaviorSubject} - the property associated with the given name
	 */
	pSubject(name) {
		this[$$initialize]();
		return this[$$settableProperties][name];
	}

};

export const property = (options = {}) => (target, key) => {
	target::set(['constructor', $$properties, key], options);
	return {
		get() { return this[$$currentValues][key] },
		...(!options.readonly && {
			set(value) { this.p(key).set(value) }
		})
	};
};

export const event = (options = {}) => (target, key) => {
	let match = key.match(/^(\w+)Event$/);
	assert(match);
	let name = match[1];
	target::set(['constructor', $$events, name], options);
	return { get() { return this.e(name) } };
};
