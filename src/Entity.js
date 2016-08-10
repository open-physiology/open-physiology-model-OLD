import isObject from 'lodash-bound/isObject';
import defaults from 'lodash-bound/defaults';
import size     from 'lodash-bound/size';
import keys     from 'lodash-bound/keys';
import values   from 'lodash-bound/values';

import _uniqueId from 'lodash/uniqueId';

import assert   from 'power-assert';

import ObservableSet         from './util/ObservableSet';
import {humanMsg}            from './util/misc';
import {Field}               from './fields/fields';
import ValueTracker, {event, property} from './util/ValueTracker';
import {tracker}             from './changes/Change';
import {BehaviorSubject}     from 'rxjs/BehaviorSubject';
import {filter}              from 'rxjs/operator/filter';
import {merge}               from 'rxjs/observable/merge';
import {map}                 from 'rxjs/operator/map';
import {combineLatest}       from 'rxjs/observable/combineLatest';
import                            'rxjs/add/operator/do';

import {defineProperties, defineProperty, assign} from 'bound-native-methods';

import babelHelpers from './util/babel-helpers';

const $$committedEntitiesByHref  = Symbol('$$committedEntitiesByHref');
const $$committedEntities        = Symbol('$$committedEntities'      );
const $$entities                 = Symbol('$$allEntities'            );
const $$singletonObject          = Symbol('$$singletonObject'        );
const $$newEntitySubject         = Symbol('$$newEntitySubject'       );
const $$deleted                  = Symbol('$$deleted'                );
const $$entitiesSubject          = Symbol('$$allSubject'             );
const $$committedEntitiesSubject = Symbol('$$allCommittedSubject'    );
const $$set                      = Symbol('$$set'                    );
const $$PreferredClass           = Symbol('$$PreferredClass'         );

////////////////////////////////////////////////////////////////////////////////

export default class Entity extends ValueTracker {
	
	////////////////////////////////////////////////////////////
	////////// STATIC (building Entity-based classes) //////////
	////////////////////////////////////////////////////////////
	
	static createClass(config): Class<Entity> {
		/* create the class with the right name, constructor and static content */
		const {name, ...rest} = config;
		
		/* create the new class */
		// using Function constructor to give the class a dynamic name
		// http://stackoverflow.com/a/9947842/681588
		// (and using babel-technique to build it, rather than using class
		// expression, so that it can be extended by babel-compiled code)
		// const EntitySubclass = new Function('Entity', `
		// 	'use strict';
		// 	${babelHelpers}
		// 	return function (_Entity) {
		// 		_inherits(${name}, _Entity);
		// 		function ${name}() {
		// 			_classCallCheck(this, ${name});
		// 			return _possibleConstructorReturn(this, Object.getPrototypeOf(${name}).apply(this, arguments));
		// 		}
		// 		return ${name};
		// 	}(Entity);
		// `)(Entity);
		const EntitySubclass = new Function('Entity', `
			'use strict';
			return class ${name} extends Entity {};
		`)(Entity);
		
		/* populate it with the necessary data and behavior */
		EntitySubclass::assign(rest);
		EntitySubclass::defineProperties({
			name: { value: name },
			[Symbol.hasInstance]: {
				value(instance) { return this.hasInstance(instance) }
			},
			hasInstance: {
				value(instance) {
					if (!instance) { return false }
					return this.hasSubclass(instance.constructor);
				}
			},
			hasSubclass: {
				value(otherClass) {
					// For both sides of this, there are two possibilities:
					// 1) the class is derived by this library
					// 2) the class is an extension of such
					// We need to check both possibilities.
					// We assume there is no subclass cycle.
					const isExtension = c => (c && c.__proto__ !== Entity);
					if (isExtension(this)) {
						// 'this' is an extension
						while (isExtension(otherClass) && otherClass !== this) {
							otherClass = otherClass.__proto__;
						}
						return otherClass === this;
					} else {
						while (isExtension(otherClass)) {
							// 'otherClass' is an extension
							otherClass = otherClass.__proto__;
						}
						if (!otherClass) { return false }
						// both 'this' and 'otherClass' are library-derived
						if (otherClass === this) { return true }
						for (let SubClass of this.extendedBy) {
							if (SubClass.hasSubclass(otherClass)) { return true }
						}
						return false;
					}
				}
			},
			p: {
				value(name) {
					switch (name) {
						case 'all':          return this[$$entitiesSubject];
						case 'allCommitted': return this[$$committedEntitiesSubject];
						default: assert(false, humanMsg`
							The ${name} property does not exist on ${this.name}.
						`);
					}
				}
			},
			// [$$PreferredClass]: {
			// 	value: EntitySubclass,
			// 	configurable: true
			// },
			// supersede: {
			// 	value(factory: (OriginalClass: Class<this>) => Class<this>): Class<this> {
			// 		let SupersedingClass = factory(this[$$PreferredClass]);
			// 		this::defineProperty($$PreferredClass, {
			// 			value:        SupersedingClass,
			// 			configurable: true
			// 		});
			// 		return SupersedingClass;
			// 	}
			// }
		});
		
		/* maintaining <Class>.p('all') and <Class>.p('allCommitted') */
		for (let [$$set, $$subject] of [
			[$$entities,          $$entitiesSubject         ],
			[$$committedEntities, $$committedEntitiesSubject]
		]) {
			const localSet = new ObservableSet();
			Entity[$$set].e('add'   )::filter(::EntitySubclass.hasInstance).subscribe(localSet.e('add'   ));
			Entity[$$set].e('delete')::filter(::EntitySubclass.hasInstance).subscribe(localSet.e('delete'));
			EntitySubclass::defineProperty($$subject, { value: localSet.p('value') });
		}
		
		return EntitySubclass;
	}
	
	
	/////////////////////////////////////////////////////////////////////
	////////// STATIC (creating / caching / finding instances) //////////
	/////////////////////////////////////////////////////////////////////
	
	
	static Change_new = class extends tracker.Change {
		constructor(context, props = {}, options = {}) {
			super(options);
			this.context       = context;
			this.initialValues = props;
			this.options       = options;
		}

		run() {
			assert(!this.context.abstract, humanMsg`
				Cannot instantiate the abstract
				class ${this.context.name}.
			`);
			return new this.context(
				{ ...this.initialValues },
				{ ...this.options, allowInvokingConstructor: true, new: true }
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
		vals:    Object = {},
	    options: Object = {}
	): this {
		return (new this.Change_new(this, vals, options)).run();
	}
	
	static get(
		href:    { href: string } | string | number,
		options: Object = {} // TODO: filtering, expanding, paging, ...
	): this {
		if (href::isObject()) { href = {href} }
		let entity;
		if (href in Entity[$$committedEntitiesByHref]) {
			entity = Entity[$$committedEntitiesByHref][href];
		} else {
			// We're assuming that this is solely a synchronous method call,
			// so we can't query the server here.
			return null;
		}
		assert(this.hasInstance(entity), humanMsg`
			The entity at '${JSON.stringify(href)}' is not
			of class '${this.name}'
			but of class '${entity.constructor.name}'.
		`);
		return entity;
	}
	
	static getAll() {
		return new Set([...this[$$entities]].filter(::this.hasInstance));
	}
	
	static getAllCommitted() {
		return new Set([...this[$$committedEntities]].filter(::this.hasInstance));
	}
	
	static newOrSingleton() {
		if (this.singleton) { return this.getSingleton() }
		return this.new();
	}
	
	static getSingleton() {
		assert(this.singleton, humanMsg`
			The '${this.name}' class is not a singleton class.
		`);
		if (!this[$$singletonObject]) {
			this[$$singletonObject] = this.new({
				name: 'Border Type'
			});
			this[$$singletonObject].commit();
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
	@property({ initial: false, readonly: true }) isDeleted;
	@property({ initial: true,  readonly: true }) isPristine;
	@property({ initial: false, readonly: true }) isNew;
	
	
	///////////////////////////////
	////////// INSTANCES //////////
	///////////////////////////////
	
	//noinspection JSDuplicatedDeclaration // hiding warning due to Webstorm bug
	get [Symbol.toStringTag]() { return this.constructor.name }
	
	constructor(
		initialValues: Object                = {},
		{ allowInvokingConstructor = false } = {}
	) {
		
		/* initialize value tracking */
		super();
		super.setValueTrackerOptions({
			takeUntil: combineLatest(
				this.p('isDeleted'), this.p('isPristine'), this.p('isNew'),
				(isDeleted, isPristine, isNew) => isDeleted && (isPristine || isNew)
			)::filter(isGone => isGone),
			filterAllBy: () => this.isDeleted.getValue()
		});
		
		/* make sure this constructor was invoked under proper conditions */
		assert(allowInvokingConstructor, humanMsg`
			Do not use 'new ${this.constructor.name}(...args)'.
			Instead, use '${this.constructor.name}.new(...args)'.
		`);
		// assert(this.constructor === this.constructor[$$PreferredClass]);
		
		/* Treating singleton classes specially? Or do we double-check singleton-ness here? */
		if (this.constructor.singleton) {
			// TODO
		}
		
		/* set defaults for the core initial field values */
		initialValues::defaults({
			id:    null,
			href:  null,
			class: this.constructor.name
		});
		
		/* initialize all fields in this entity */
		Field.initializeEntity(this, initialValues);
		
		/* entity is pristine if all its fields are pristine */
		combineLatest(
			...this.fields::values().map(f=>f.p('isPristine')),
			(...fieldPristines) => fieldPristines.every(v=>!!v)
		).subscribe(this.pSubject('isPristine'));
		
		/* register this entity */
		Entity[$$entities].add(this);
		
		
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
		
		if (this.isDeleted) { return }
		this.pSubject('isDeleted') .next(true);
		this.pSubject('isPristine').next(false);
		Entity[$$entities].delete(this);
	}
	
	undelete() {
		if (!this.isDeleted) { return }
		this.pSubject('isDeleted') .next(false);
		this.pSubject('isPristine').next(false);
		Entity[$$entities].add(this);
	}
	
	//noinspection JSDuplicatedDeclaration // temporary, to suppress warning due to Webstorm bug; TODO: report bug
	get(key)               { return this.fields[key].get()             }
	set(key, val, options) { return this.fields[key].set(val, options) }
	
	async commit(...keysToCommit) {
		if (this.isDeleted) {
			// TODO
		}
		
		
		/* commit each field individually */ // TODO: commit all in a single transaction?
		if (keysToCommit::size() === 0) { keysToCommit = this.fields::keys() }
		await Promise.all(keysToCommit.map((key) => this.fields[key].commit()));
		
		/* setting up as a committed entity */
		// TODO: remove when the server actually does this
		if (this.get('id') === null) {
			/* id and href are set here until actual server communication is set up */
			const newId   = parseInt(_uniqueId());
			const newHref = `cache://${newId}`;
			const opts = { ignoreReadonly: true, updatePristine: true };
			this.set('id',   newId,   opts);
			this.set('href', newHref, opts);
			
			/* after it's first committed, it's no longer new */
			this.pSubject('isNew').next(false);
			
			/* maintain caches */
			Entity[$$committedEntitiesByHref][newHref] = this;
			Entity[$$committedEntities].add(this);
		}
		
		/* directly after a commit, it's pristine */
		this.pSubject('isPristine').next(true);
		
	}
	
	rollback(...keysToRollback) {
		if (keysToRollback::size() === 0) { keysToRollback = this.fields::keys() }
		keysToRollback.map((key) => { this.fields[key].rollback() });
		this.e('rollback').next(this);
	}
	
	p(key, t) {
		// Provide easier access to field property observables
		return (this.fields && this.fields[key])
			? this.fields[key].p('value', t)
			: super.p(key, t);
	}

}

Entity::assign({
	[$$entities]                : new ObservableSet(),
	[$$entitiesSubject]         : new BehaviorSubject(new Set()),
	
	[$$committedEntities]       : new ObservableSet(),
	[$$committedEntitiesSubject]: new BehaviorSubject(new Set()),
	
	[$$committedEntitiesByHref] : {}
});
