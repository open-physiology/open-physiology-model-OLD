import isString   from 'lodash/isString';
import defer      from 'lodash/defer';
import isObject   from 'lodash/isObject';
import assert     from 'power-assert';

import {Subject}         from 'rxjs/Subject';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {map}             from 'rxjs/operator/map';

import {humanMsg} from "./util/misc";
import {setDefault}  from "./util/misc";
import ObservableSet from "./util/ObservableSet";
import {Field} from "./Field";
import ValueTracker, {event, property} from "./util/ValueTracker";

const $$cache         = Symbol('$$cache'      );
const $$createSubject = Symbol('$$createSubject');
const $$subjects      = Symbol('$$subjects'   );
const $$observables   = Symbol('$$observables');

////////////////////////////////////////////////////////////////

export default class Entity extends ValueTracker {
	
	////////////////////////////////////////////////////////////
	////////// STATIC (building Entity-based classes) //////////
	////////////////////////////////////////////////////////////
	
	static createClass(config): Class<Entity> {
		/* create the class with the right name, constructor and static content */
		const {name, ...rest} = config;
		const NewClass = class extends Entity {};
		Object.defineProperties(NewClass, {
			/**
			 * Set the name property of this class to
			 * the name given in the configuration.
			 **/
			name: { value: name },
			/**
			 * Implement the `instanceof` operator to support
			 * our own flavor of multiple inheritance.
			 **/
			[Symbol.hasInstance]: {
				value: (instance) => {
					if (instance.constructor === NewClass) { return true }
					for (let SubClass of NewClass.extendedBy) {
						if (SubClass[Symbol.hasInstance](instance)) { return true }
					}
					return false;
				}
			}
		});
		Object.assign(NewClass, rest);
		
		return NewClass;
	}
		
	
	/////////////////////////////////////////////////////////////////////
	////////// STATIC (creating / caching / finding instances) //////////
	/////////////////////////////////////////////////////////////////////
	
	static async new(
		values  : Object = {},
	    options : Object = {}
	): Promise<this> {
		return new this(
			{ ...values, id: null, href: null, class: this.name },
			{ ...options, new: true }
		);
	}
	
	static async get(
		href:    { href: string } | string | number,
		options: Object = {} // TODO: filtering, expanding, paging, ...
	): Promise<Entity> {
		if (isObject(href)) { href = {href} }
		let entity;
		if (href in Entity[$$cache]) {
			entity = Entity[$$cache][href];
		} else {
			
		}
		
		assert(entity instanceof this, humanMsg`
			The entity at '${JSON.stringify(href)}' is not
			of class '${this.name}'
			but of class '${entity.constructor.name}'.
		`);
	}
	
	// static async load(
	// 	href:    {href: string} | string | number,
	// 	options: Object = {} // TODO: filtering, expanding, paging, ...
	// ) {
	//
	// 	// TODO
	//
	// }
	
	
	////////////////////////////
	////////// EVENTS //////////
	////////////////////////////
	
	@event() deleteEvent;
	
	
	///////////////////////////////
	////////// INSTANCES //////////
	///////////////////////////////
	
	get [Symbol.toStringTag]() { return this.constructor.name }
	
	constructor(
		values:  Object = {},
		options: Object = {}
	) {
		super({ deleteEventName: 'delete' });
		
		Field.initializeEntity(this, values);
		
		// TODO: CHECK CROSS-PROPERTY CONSTRAINTS?
	}
	
	[$$createSubject](key: string | number) {
		this[$$subjects]   [key] = new BehaviorSubject();
		this[$$observables][key] = this[$$subjects][key].asObservable();
	}
	
	delete() {
		// TODO: this is the synchronous delete operation;
		//     : a `.commit()` call is required before it
		//     : is actually deleted from asynchronous storage.
		//     : That means we need to be able to rollback a deletion.
		//     : We need to create a partially ordered
		//     : log of performed actions (since last commit),
		//     : that also allows undo. This will replace storing 'pristine' ops.
		//     : (This is the Command design pattern.)
		
		this.e('delete').next();
		
	}
	
	

}

Object.assign(Entity, {
	[$$cache] : {}
});
