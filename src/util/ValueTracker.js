import includes      from 'lodash/includes';
import isArray       from 'lodash/isArray';
import set           from 'lodash/set';
import ldIsEqual     from 'lodash/isEqual';
import assert        from 'power-assert';

import {Subject}              from 'rxjs/Subject';
import {BehaviorSubject}      from 'rxjs/BehaviorSubject';
import {never}                from 'rxjs/observable/never';
import {combineLatest}        from 'rxjs/operator/combineLatest';
import {distinctUntilChanged} from 'rxjs/operator/distinctUntilChanged';
import {filter}               from 'rxjs/operator/filter';
import {takeUntil}            from 'rxjs/operator/takeUntil';

const $$events     =      Symbol('$$events');
const $$properties =      Symbol('$$properties');
const $$initialize =      Symbol('$$initialize');
const $$deleteEventName = Symbol('$$deleteEventName');

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
		this[$$events]     = {};
		this[$$properties] = {};

		/* add the events and properties added with ES7 annotations */
		for (let [key, options] of Object.entries(this.constructor[$$events] || {})) {
			this.newEvent(key, options);
		}
		for (let [key, options] of Object.entries(this.constructor[$$properties] || {})) {
			this.newProperty(key, options);
		}
	}
	
	constructor({ deleteEventName = null } = {}) {
		this[$$deleteEventName] = deleteEventName;
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
		assert(() => !this[$$events][name],
			`There is already an event '${name}' on this object.`);
		assert(() => !this[$$properties][name],
			`There is already a property '${name}' on this object.`);
		
		this[$$events][name] = new Subject()
			::takeUntil(this.e(this[$$deleteEventName]));
		
		// this[$$events][name].subscribe((v) => {
		// 	console.log(this.constructor.name, `[[[${name}]]]`, v);
		// });
		
		return this[$$events][name];
	}

	/**
	 * This method defines a new property on this object.
	 *
	 * @public
	 * @method
	 * @param  {String}                   name           - the name of the new property
	 * @param  {Boolean}                 [settable=true] - whether the value can be manually set
	 * @param  {function(*,*):Boolean}   [isEqual]       - a predicate function by which to test for duplicate values
	 * @param  {function(*):Boolean}     [isValid]       - a predicate function to validate a given value
	 * @param  {*}                       [initial]       - the initial value of this property
	 *
	 * @return {BehaviorSubject} - the property associated with the given name
	 */
	newProperty(name, {
		settable = true,
		isEqual  = ldIsEqual,
		isValid  = ()=>true,
		initial
	} = {}) {
		this[$$initialize]();

		/* is the property name already taken? */
		assert(() => !this[$$events][name],
			`There is already an event '${name}' on this object.`);
		assert(() => !this[$$properties][name],
			`There is already a property '${name}' on this object.`);

		/* if isValid is an array, check for inclusion */
		if (isArray(isValid)) {
			let options = isValid;
			isValid = (v) => includes(options, v)
		}

		/* bind functions to their proper context */
		isValid = this::isValid;
		isEqual = this::isEqual;

		/* define the bus which manages the property */
		this[$$properties][name] = new BehaviorSubject(initial)
			::takeUntil           (this.e(this[$$deleteEventName]))
			::filter              (isValid)
			::distinctUntilChanged(isEqual);
		
		// this[$$properties][name].subscribe((v) => {
		// 	console.log(this.constructor.name, `[[[${name}]]]`, v);
		// });
		
		/* create event version of the property */
		this[$$events][name] = this[$$properties][name].asObservable();
		
		/* return property */
		return this[$$properties][name];
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
		if (isArray(nameOrDeps)) {
			return combineLatest(nameOrDeps.map(n => this.p(n)), optionalTransformer);
		} else {
			return this[$$properties][nameOrDeps] || never();
		}
	}

};

export const property = (options = {}) => (target, key) => {
	set(target, ['constructor', $$properties, key], options);
	let {settable = true} = options;
	return Object.assign({
		get() { return this.p(key).get() }
	}, settable && {
		set(value) { this.p(key).set(value) }
	});
};

export const event = (options = {}) => (target, key) => {
	let match = key.match(/^(\w+)Event$/);
	assert(match);
	set(target, ['constructor', $$events, match[1]], options);
	return { get() { return this.e(match[1]) } };
};
