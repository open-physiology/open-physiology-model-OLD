import isObject    from 'lodash-bound/isObject';
import defaults    from 'lodash-bound/defaults';
import size        from 'lodash-bound/size';
import keys        from 'lodash-bound/keys';
import values      from 'lodash-bound/values';
import isFunction  from 'lodash-bound/isFunction';
import isUndefined from 'lodash-bound/isUndefined';

import _uniqueId from 'lodash/uniqueId';

import assert   from 'power-assert';

import ObservableSet         from './util/ObservableSet';
import {humanMsg, definePropertiesByValue}            from './util/misc';
import {Field}               from './fields/fields';
import ValueTracker, {event, property} from './util/ValueTracker';
import {BehaviorSubject}     from 'rxjs/BehaviorSubject';
import {filter}              from 'rxjs/operator/filter';
import {combineLatest}       from 'rxjs/observable/combineLatest';
import                            'rxjs/add/operator/do';

import {defineProperties, defineProperty, assign} from 'bound-native-methods';

import babelHelpers from './util/babel-helpers';
import {constraint} from './util/misc';

const $$committedEntitiesByHref  = Symbol('$$committedEntitiesByHref');
const $$committedEntities        = Symbol('$$committedEntities'      );
const $$entities                 = Symbol('$$allEntities'            );
const $$singletonObject          = Symbol('$$singletonObject'        );
const $$newEntitySubject         = Symbol('$$newEntitySubject'       );
const $$deleted                  = Symbol('$$deleted'                );
const $$entitiesSubject          = Symbol('$$allSubject'             );
const $$committedEntitiesSubject = Symbol('$$allCommittedSubject'    );
const $$set                      = Symbol('$$set'                    );

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
		const EntitySubclass = new Function('Entity', `
			'use strict';
			${babelHelpers};
			return function (_Entity) {
				_inherits(${name}, _Entity);
				function ${name}() {
					_classCallCheck(this, ${name});
					return _possibleConstructorReturn(this, Object.getPrototypeOf(${name}).apply(this, arguments));
				}
				return ${name};
			}(Entity);
		`)(Entity);
		
		/* populate it with the necessary data and behavior */
		EntitySubclass::assign(rest);
		EntitySubclass::definePropertiesByValue({
			name,
			[Symbol.hasInstance](instance) {
				return this.hasInstance(instance);
			},
			hasInstance(instance) {
				if (!instance) { return false }
				return this.hasSubclass(instance.constructor);
			},
			allSubclasses() {
				let result = [this];
				for (let subClass of this.extendedBy) {
					result = [...result, ...subClass.allSubclasses()];
				}
				return new Set(result);
			},
			hasSubclass(otherClass) {
				if (!otherClass)         { return false }
				if (otherClass === this) { return true  }
				for (let SubClass of this.extendedBy) {
					if (SubClass.hasSubclass(otherClass)) {
						return true;
					}
				}
				return false;
			},
			p(name) {
				switch (name) {
					case 'all':          return this[$$entitiesSubject];
					case 'allCommitted': return this[$$committedEntitiesSubject];
					default: constraint(false, humanMsg`
						The ${name} property does not exist on ${this.name}.
					`);
				}
			},
			Change: config.module.Change
		});
		
		/* maintaining <Class>.p('all') and <Class>.p('allCommitted') */
		for (let [$$set,               $$subject                 ] of [
			     [$$entities,          $$entitiesSubject         ],
			     [$$committedEntities, $$committedEntitiesSubject]
		]) {
			const localSet = new ObservableSet();
			Entity[$$set].e('add'   )::filter(::EntitySubclass.hasInstance).subscribe(localSet.e('add'   ));
			Entity[$$set].e('delete')::filter(::EntitySubclass.hasInstance).subscribe(localSet.e('delete'));
			EntitySubclass::defineProperty($$subject, { value: localSet.p('value') });
		}
		
		/* introduce Change subclasses */
		for (let clsName of [
			'Change_new',
		    'Change_load',
		    'Change_delete',
		    'Change_edit'
		]) {
			EntitySubclass::defineProperty(
				clsName,
				{ value: changeClassDefinitions[clsName](EntitySubclass) }
			);
		}
		
		
		
		/***/
		return EntitySubclass;
	}
	
	
	/////////////////////////////////////////////////////////////////////
	////////// STATIC (creating / caching / finding instances) //////////
	/////////////////////////////////////////////////////////////////////
	
	static new(
		initialValues: Object = {},
	    options:       Object = {}
	) : this {
		let change = new this.Change_new(initialValues, options);
		change.run();
		return change.result;
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
		constraint(this.hasInstance(entity), humanMsg`
			The entity at '${JSON.stringify(href)}'
			is not of class '${this.name}'
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
		return this.singleton ? this.getSingleton() : this.new();
	}
	
	static getSingleton() {
		constraint(this.singleton, humanMsg`
			The '${this.name}' class is not a singleton class.
		`);
		if (!this[$$singletonObject]) {
			this[$$singletonObject] = this.new({
				name: this.singular
			});
			this[$$singletonObject].commit();
			// TODO: make sure that the singleton object is always loaded,
			//     : so this can be done synchronously
		}
		return this[$$singletonObject];
	}
	
	
	// // TODO: `load` method for informing the module of an existing entity
	// //     : (retrieved from an external server, for instance)
	// static async load(
	// 	href:    {href: string} | string | number,
	// 	options: Object = {} // TODO: filtering, expanding, paging, ...
	// ) {}
	
	
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
		constraint(allowInvokingConstructor, humanMsg`
			Do not use 'new ${this.constructor.name}(...args)'.
			Instead, use '${this.constructor.name}.new(...args)'.
		`);
		
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
		).subscribe( this.pSubject('isPristine') );
		
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


////////////////////////////////////////////////////////////////////////////////
///// Change class definitions /////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

const changeClassDefinitions = {};

///// Change_new ///////////////////////////////////////////////////////////////

changeClassDefinitions['Change_new'] = (cls) => class Change_new extends cls.Change {
	
	static changeType = 'new';
	
	constructor(initialValues = {}, options = {}) {
		super(options);
		this.initialValues = initialValues;
		this.options       = options;
	}

	result: Entity = null;
	
	localRun() {
		this.result = null;
		if (!this.result && cls.behavior.new::isFunction()) {
			this.result = cls.behavior.new(this) || null;
		}
		if (!this.result) {
			constraint(!cls.abstract, humanMsg`
				Cannot instantiate the abstract
				class ${cls.name}.
			`);
			this.result = new cls(
				{ ...this.initialValues },
				{ ...this.options, allowInvokingConstructor: true }
			);
		}
	}

	localRollback() {
		// TODO
	}
};

///// Change_load //////////////////////////////////////////////////////////////

changeClassDefinitions['Change_load'] = (cls) => class Change_load extends cls.Change {
	
	static changeType = 'load';
	
	constructor(initialValues = {}, options = {}) {
		// when loading an entity, it starts out committed
		super({ ...options, committed: true });
		this.initialValues = initialValues;
		this.options       = options;
	}

	result: Entity = null;
	
	localRun() {
		constraint(cls.initialValues.id, humanMsg`
			Cannot load an instance of the class
			${cls.name} without a provided 'id' field.
		`);
		constraint(!cls.abstract, humanMsg`
			Cannot load an instance of the abstract
			class ${cls.name}.
		`);
		this.result = new cls(
			{ ...this.initialValues },
			{ ...this.options, allowInvokingConstructor: true }
		);
	}

	localRollback() {
	} // intentionally empty
};

///// Change_delete ////////////////////////////////////////////////////////////

changeClassDefinitions['Change_delete'] = (cls) => class Change_delete extends cls.Change {
	
	static changeType = 'delete';
	
	constructor(entity, options = {}) {
		super({ ...options });
		this.entity = entity;
	}

	entity: Entity = null;
	
	localRun() {
		constraint(this.entity, humanMsg`
			Cannot delete an entity
			that was not specified in
			the Change_delete constructor.
		`);
		
		// TODO: Either make a separate Change class for Resource and Relationship,
		// TODO:   or use an if-statement right here.
		
		// TODO: Change_delete on all relevant linked entities (test if they're already scheduled for deletion)
		// TODO: Store a reference to this Change on the entity
		// TODO: Keep the entity in memory (this.entity) so the deletion can be rolled back.
	}

	localRollback() {
		// TODO
	}
};

///// Change_delete ////////////////////////////////////////////////////////////

changeClassDefinitions['Change_edit'] = (cls) => class Change_edit extends cls.Change {
	
	static changeType = 'edit';
	
	constructor(entity, newValues = {}, options = {}) {
		super({ ...options });
		this.entity = entity;
		this.newValues = newValues;
	}

	entity:    Entity = null;
	newValues: Object = {};
	
	localRun() {
		constraint(this.entity, humanMsg`
			Cannot edit an entity
			that was not specified in
			the Change_edit constructor.
		`);
		
		// TODO: limit this Change class to simple properties
		
		// TODO: store the current values of these properties so we can roll back
		
		// TODO: Store a reference to this Change on the entity.
		// TODO: In fact, we need to maintain a stack, and keep the latest Change
		// TODO: visible, to be used as a dependency for further changes on the entity.
	}

	localRollback() {
		// TODO
	}
};
