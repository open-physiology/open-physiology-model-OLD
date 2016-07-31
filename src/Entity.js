import isObject   from 'lodash-bound/isObject';
import defaults   from 'lodash-bound/defaults';
import uniqueId   from 'lodash/uniqueId';
import assert     from 'power-assert';

import ObservableSet from './util/ObservableSet';
import {humanMsg} from "./util/misc";
import {Field} from "./Field";
import ValueTracker, {event, property} from "./util/ValueTracker";
import {tracker} from './changes/Change';
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {filter} from 'rxjs/operator/filter';
import {map} from 'rxjs/operator/map';

const $$cache            = Symbol('$$cache'           );
const $$cacheSet         = Symbol('$$cacheSet'        );
const $$singletonObject  = Symbol('$$singletonObject' );
const $$newEntitySubject = Symbol('$$newEntitySubject');
const $$deleted          = Symbol('$$deleted'         );
const $$allSubject       = Symbol('$$allSubject'      );

////////////////////////////////////////////////////////////////

export default class Entity extends ValueTracker {
	
	////////////////////////////////////////////////////////////
	////////// STATIC (building Entity-based classes) //////////
	////////////////////////////////////////////////////////////
	
	static createClass(config): Class<Entity> {
		/* create the class with the right name, constructor and static content */
		const {name, ...rest} = config;
		
		const NewClassObj = {};
		NewClassObj[name] = class extends Entity {};
		const NewClass = NewClassObj[name];
		
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
				value(instance) {
					if (!instance) { return false }
					return this.hasSubclass(instance.constructor);
				}
			},
			hasSubclass: {
				value(otherClass) {
					if (!otherClass) { return false }
					if (otherClass === this) { return true }
					for (let SubClass of this.extendedBy) {
						if (SubClass.hasSubclass(otherClass)) { return true }
					}
					return false;
				}
			},
			p: {
				value(name) {
					switch (name) {
						case 'all': {
							return this[$$allSubject]; // TODO
						}
						default: assert(false, humanMsg`
							The ${name} property does not exist on ${this.name}.
						`);
					}
				}
			}
		});
		Object.assign(NewClass, rest);
		
		/* maintaining <Class>.p('all') */
		let allSubject = new BehaviorSubject(new Set());
		Entity[$$cacheSet].e('add')
			::filter(::NewClass[Symbol.hasInstance])
			.subscribe(() => { allSubject.next(new Set(Entity[$$cacheSet])) });
		Entity[$$cacheSet].e('delete')
			::filter(::NewClass[Symbol.hasInstance])
			.subscribe(() => { allSubject.next(new Set(Entity[$$cacheSet])) });
		Object.defineProperty(NewClass, $$allSubject, { value: allSubject.asObservable() });
		
		return NewClass;
	}
	
	
	/////////////////////////////////////////////////////////////////////
	////////// STATIC (creating / caching / finding instances) //////////
	/////////////////////////////////////////////////////////////////////
	
	
	static Change_new = class extends tracker.Change {
		constructor(context, props = {}, options = {}) {
			super(options);
			this.context       = context;
			this.initialValues = props;
		}

		run() {
			assert(!this.context.abstract, humanMsg`
				Cannot instantiate the abstract
				class ${this.context.name}.
			`);
			return new this.context(
				{ ...this.initialValues },
				{ ...this.options, new: true }
			);
		}

		async commit() {
			//TODO
		}

		rollback() {
			// TODO
		}
	};
	
	static new(
		values  : Object = {},
	    options : Object = {}
	): this {
		return new this.Change_new(
			this,
			{ ...values },
			{ ...options, new: true }
		).run();
	}
	
	static get(
		href:    { href: string } | string | number,
		options: Object = {} // TODO: filtering, expanding, paging, ...
	): this {
		if (href::isObject()) { href = {href} }
		let entity;
		if (href in Entity[$$cache]) {
			entity = Entity[$$cache][href];
		} else {
			// We're assuming that this is solely a synchronous method call,
			// so we can't query the server here.
			return null;
		}
		assert(entity instanceof this, humanMsg`
			The entity at '${JSON.stringify(href)}' is not
			of class '${this.name}'
			but of class '${entity.constructor.name}'.
		`);
		return entity;
	}
	
	static getAll() { return new Set([...this[$$cacheSet]].filter(e=>e instanceof this)) }
	
	static getSingleton() {
		assert(this.singleton, humanMsg`
			The '${this.name}' class is not a singleton class.
		`);
		if (!this[$$singletonObject]) {
			this[$$singletonObject] = this.new();
			// TODO: make sure that the singleton object is always loaded,
			//     : so this can be done synchronously
		}
		return this[$$singletonObject];
	}
	
	static async load(
		href:    {href: string} | string | number,
		options: Object = {} // TODO: filtering, expanding, paging, ...
	) {
		
		// TODO

	}
	
	
	////////////////////////////
	////////// EVENTS //////////
	////////////////////////////
	
	@event() deleteEvent;
	@event() commitEvent;
	@event() rollbackEvent;
	
	
	///////////////////////////////
	////////// INSTANCES //////////
	///////////////////////////////
	
	//noinspection JSDuplicatedDeclaration // hiding warning due to Webstorm bug
	get [Symbol.toStringTag]() { return this.constructor.name }
	
	constructor(
		values:  Object = {},
		options: Object = {}
	) {
		
		super({ deleteEventName: 'delete' });
		
		if (this.constructor.singleton) {
			
		}
		
		values::defaults({
			id: null,
			href: null,
			class: this.constructor.name
		});
		
		Field.initializeEntity(this, values);
		
		// TODO: CHECK CROSS-PROPERTY CONSTRAINTS?
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
		
		if (this[$$deleted]) { return }
		this[$$deleted] = true;
		this.e('delete').next(this);
	}
	
	isDeleted() { return !!this[$$deleted] }
	
	//noinspection JSDuplicatedDeclaration // temporary, to suppress warning due to Webstorm bug
	get(key)               { return this.field_get(key)               }
	set(key, val, options) { return this.field_set(key, val, options) }
	
	async commit() {
		
		await this.field_commit();
		
		// setting up id and href here until actual server communication is set up
		// TODO: remove when the server actually does this
		if (this.get('id') === null) {
			const newId = parseInt(uniqueId());
			const opts = { ignoreReadonly: true, updatePristine: true };
			this.set('id',    newId,             opts);
			this.set('href', `cache://${newId}`, opts);
			Entity[$$cache][this.href] = this;
			Entity[$$cacheSet].add(this);
		}
		
		this.e('commit').next(this);
	}
	
	rollback() {
		this.field_rollback();
		this.e('rollback').next(this);
	}
	
	p(key, t) {
		// Provide easier access to field property observables
		return this.field(key) ? this.field(key).p('value', t) : super.p(key, t);
	}

}

Object.assign(Entity, {
	[$$cache]     : {},
	[$$cacheSet]  : new ObservableSet(),
	[$$allSubject]: new BehaviorSubject(new Set())
});
