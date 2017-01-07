import isObject    from 'lodash-bound/isObject';
import defaults    from 'lodash-bound/defaults';

import {humanMsg, definePropertiesByValue, definePropertyByValue} from './util/misc';
import ObservableSet                   from './util/ObservableSet';
import {Field}                         from './fields/fields';
import ValueTracker, {event, property} from './util/ValueTracker';
import {BehaviorSubject}               from 'rxjs/BehaviorSubject';
import {combineLatest}                 from 'rxjs/observable/combineLatest';
import                                      'rxjs/add/operator/do';

import {filter, map} from './util/bound-hybrid-functions';

import {defineProperties, defineProperty, assign} from 'bound-native-methods';

import babelHelpers from './util/babel-helpers';
import {constraint} from './util/misc';

import command_newClassFactory    from './commands/Command_new';
import command_deleteClassFactory from './commands/Command_delete';
import command_editClassFactory   from './commands/Command_edit';

import {
	$$committedEntitiesByHref,
	$$committedEntities,
	$$entities
} from './symbols';
const $$singletonObject          = Symbol('$$singletonObject'    );
const $$newEntitySubject         = Symbol('$$newEntitySubject'   );
const $$deleted                  = Symbol('$$deleted'            );
const $$entitiesSubject          = Symbol('$$allSubject'         );
const $$committedEntitiesSubject = Symbol('$$allCommittedSubject');
const $$set                      = Symbol('$$set'                );

////////////////////////////////////////////////////////////////////////////////

let moduleCount = 0;

export default (environment) => {
	
	class Entity extends ValueTracker {
		
		static get Entity() { return Entity }
		
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
				Command: environment.Command
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
			EntitySubclass::definePropertyByValue('Command_delete', command_deleteClassFactory(EntitySubclass));
			EntitySubclass::definePropertyByValue('Command_edit',   command_editClassFactory  (EntitySubclass));
			
			/***/
			return EntitySubclass;
		}
		
		//////////////////////////////////////////////////
		////////// EXPLICITLY CREATING COMMANDS //////////
		//////////////////////////////////////////////////
		
		//// new
		
		static commandNew(
			initialValues: Object = {},
		    options:       Object = {}
		) {
			return this.Command_new.create(initialValues, options);
		}
		
		//// edit
		
		static commandEdit(
			entity,
			newValues: Object = {},
		    options:   Object = {}
		) {
			return this.Command_edit.create(entity, newValues, options);
		}
		
		commandEdit(
			newValues: Object = {},
		    options:   Object = {}
		) {
			return this.constructor.commandEdit(this, newValues, options);
		}
		
		//// delete
		
		static commandDelete(
			entity,
		    options: Object = {}
		) {
			return this.Command_delete.create(entity, options);
		}
		
		commandDelete(
		    options: Object = {}
		) {
			return this.constructor.commandDelete(this, options);
		}
		
		/////////////////////////////////////////////////////////////////////
		////////// STATIC (creating / caching / finding instances) //////////
		/////////////////////////////////////////////////////////////////////
		
		static new(
			initialValues: Object = {},
		    options:       Object = {}
		) : this {
			return this.commandNew(initialValues, { ...options, run: true }).result;
		}
		
		edit(
			newValues: Object,
		    options:   Object = {}
		) {
			this.commandEdit(newValues, { ...options, run: true });
		}
		
		delete(options: Object = {}) {
			this.commandDelete({ ...options, run: true });
		}
		
		static get(
			href:    { href: string } | string | number,
			options: Object = {} // TODO: filtering, expanding, paging, ...
		) : this {
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
		
		// TODO: Double-check singleton-related stuff;
		//       Haven't looked at this in a while, and many things have changed.
		
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
			initialValues: Object = {},
			options               = {}
		) {
			
			/* initialize value tracking */
			super();
			super.setValueTrackerOptions({
				takeUntil: combineLatest(
					this.p('isDeleted'),
					this.p('isPristine'),
					this.p('isNew'),
					(d, p, n) => d && (p || n)
				)::filter(v=>!!v),
				filterAllBy: () => this.isDeleted.getValue()
			});
			
			/* make sure this constructor was invoked under proper conditions */
			constraint(options.allowInvokingConstructor, humanMsg`
				Do not use 'new ${this.constructor.name}(...args)'.
				Instead, use '${this.constructor.name}.new(...args)'.
			`);
			
			/* keeping track of related commands */
			this.originCommand = options.command;
			this.editCommands  = [];
			this.deleteCommand = null;
			
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
			
			// TODO: remove this? Fields are no longer 'in charge' of committing
			// /* entity is pristine if all its fields are pristine */
			// combineLatest(
			// 	...this.fields::values()::map(f=>f.p('isPristine')),
			// 	(...fieldPristines) => fieldPristines.every(v=>!!v)
			// ).subscribe( this.pSubject('isPristine') );
			
			// TODO: CHECK CROSS-PROPERTY CONSTRAINTS?
			
		}
		
		// NOTE: a method .undelete was here, but we'll now use
		// NOTE: the Command system to undo that kind of thing
		
		get(key)               { return this.fields[key].get()             }
		set(key, val, options) { return this.fields[key].set(val, options) }
		
		
		// TODO: remove 'per-field'-commit/rollback code (using commands now)
		async commit() {
			/* commit all latest commands associated with this entity */
			// NOTE: committing the latest commands also commits their
			//       dependencies, i.e., commits every associated command
			
			const latestCommands = [...environment.Command.latest({entity: this, committable: true})];
			
			await Promise.all( latestCommands.map(cmd => cmd.commit()) );
		}
		
		rollback() {
			/* commit all latest commands associated with this entity */
			// NOTE: committing the latest commands also commits their
			//       dependencies, i.e., commits every associated command
			for (let cmd of environment.Command.earliest({entity: this, rollbackable: true})) {
				cmd.rollback();
			} // TODO: test
			
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
