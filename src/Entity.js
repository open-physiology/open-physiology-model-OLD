import isObject    from 'lodash-bound/isObject';
import defaults    from 'lodash-bound/defaults';
import size        from 'lodash-bound/size';
import keys        from 'lodash-bound/keys';
import values      from 'lodash-bound/values';

import _uniqueId   from 'lodash/uniqueId';

import ObservableSet                   from './util/ObservableSet';
import {humanMsg, definePropertiesByValue, definePropertyByValue} from './util/misc';
import {Field}                         from './fields/fields';
import ValueTracker, {event, property} from './util/ValueTracker';
import {BehaviorSubject}               from 'rxjs/BehaviorSubject';
import {filter}                        from 'rxjs/operator/filter';
import {combineLatest}                 from 'rxjs/observable/combineLatest';
import                                      'rxjs/add/operator/do';

import {defineProperties, defineProperty, assign} from 'bound-native-methods';

import babelHelpers from './util/babel-helpers';
import {constraint} from './util/misc';

import command_newClassFactory    from './commands/Command_new';
import command_loadClassFactory   from './commands/Command_load';
import command_deleteClassFactory from './commands/Command_delete';
import command_editClassFactory   from './commands/Command_edit';

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

let moduleCount = 0;

export default (module) => {
	
	class Entity extends ValueTracker {
		
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
				Command: module.Command
			});
			
			/* maintaining <Class>.p('all') and <Class>.p('allCommitted') */
			for (let [$$set,               $$subject                 ] of [
				     [$$entities,          $$entitiesSubject         ],
				     [$$committedEntities, $$committedEntitiesSubject]
			]) {
				const localSet = new ObservableSet();
				Entity[$$set].e('add'   )::filter(::EntitySubclass.hasInstance).subscribe(localSet.e('add'   ));
				Entity[$$set].e('delete')::filter(::EntitySubclass.hasInstance).subscribe(localSet.e('delete'));
				EntitySubclass::definePropertyByValue($$subject, localSet.p('value'));
			}
			
			/* introduce Command subclasses */
			EntitySubclass::definePropertyByValue('Command_new',    command_newClassFactory   (EntitySubclass));
			EntitySubclass::definePropertyByValue('Command_load',   command_loadClassFactory  (EntitySubclass));
			EntitySubclass::definePropertyByValue('Command_delete', command_deleteClassFactory(EntitySubclass));
			EntitySubclass::definePropertyByValue('Command_edit',   command_editClassFactory  (EntitySubclass));
			
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
			const command = new this.Command_new(initialValues, options);
			command.run();
			return command.result;
		}
		
		static load(
			values:  Object = {},
		    options: Object = {}
		) : this {
			const command = new this.Command_load(values, options);
			command.run();
			return command.result;
		}
		
		edit(newValues) {
			const command = new this.constructor.Command_edit(this, newValues);
			command.run();
		}
		
		// TODO: make this method create and run a new Command instance
		// this is the synchronous delete operation;
		// a `.commit()` call is required before it
		// is actually deleted from asynchronous storage.
		// That means we need to be able to rollback a deletion.
		// We need to create a partially ordered
		// log of performed actions (since last commit),
		// that also allows undo. This will replace storing 'pristine' ops.
		// (This is the Command design pattern.)
		delete() {
			if (this.isDeleted) { return }
			console.warn("The delete operation does not yet use the Command pattern.");
			this.pSubject('isDeleted') .next(true);
			this.pSubject('isPristine').next(false);
			Entity[$$entities].delete(this);
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
		// TODO: also create async method for requesting an entity from whatever
		// TODO: backend is connected to this library (e.g., REST client or database)
		// TODO: (support filtering, expanding, paging,...)
		
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
		
		// NOTE: a method .undelete was here, but we'll now use
		// NOTE: the Command system to undo that kind of thing
		
		get(key)               { return this.fields[key].get()             }
		set(key, val, options) { return this.fields[key].set(val, options) }
		
		
		// TODO: make this method call .commit on the related Command instances
		async commit(...keysToCommit) {
			
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
		
		//noinspection JSCheckFunctionSignatures
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
	
	return Entity;
}
