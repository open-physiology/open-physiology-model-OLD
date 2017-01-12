import defaults    from 'lodash-bound/defaults';
import isString    from 'lodash-bound/isString';
import isInteger   from 'lodash-bound/isInteger';
import isSet       from 'lodash-bound/isSet';
import isObject    from 'lodash-bound/isObject';
import isUndefined from 'lodash-bound/isUndefined';
import pick        from 'lodash-bound/pick';
import entries     from 'lodash-bound/entries';

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
import command_loadClassFactory   from './commands/Command_load';
const $$Command_load = Symbol('$$Command_load');

import {
	$$committedEntitiesByHref,
	$$committedEntities,
	$$entities
} from './symbols';
const $$newEntitySubject         = Symbol('$$newEntitySubject'   );
const $$deleted                  = Symbol('$$deleted'            );
const $$entitiesSubject          = Symbol('$$allSubject'         );
const $$committedEntitiesSubject = Symbol('$$allCommittedSubject');

////////////////////////////////////////////////////////////////////////////////

export default (environment) => {
	
	let {Command, backend} = environment;
	
	class Entity extends ValueTracker {
		
		static get environment() { return environment }
		
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
				Command: Command
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
			EntitySubclass::definePropertyByValue($$Command_load,   command_loadClassFactory  (EntitySubclass));
			
			/***/
			return EntitySubclass;
		}
		
		//////////////////////////////////////////////////
		////////// EXPLICITLY CREATING COMMANDS //////////
		//////////////////////////////////////////////////
		
		//// new
		
		static commandNew(
			initialValues: {} = {},
		    options:       {} = {}
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
			initialValues: {} = {},
		    options:       {} = {}
		) : this {
			return this.commandNew(initialValues, { ...options, run: true }).result;
		}
		
		edit(
			newValues: {},
		    options:   {} = {}
		) {
			this.commandEdit(newValues, { ...options, run: true });
		}
		
		delete(options: {} = {}) {
			this.commandDelete({ ...options, run: true });
		}
		
		static async get(
			address: { href: string } | { id: number } | string | number,
			options: {} = {} // TODO: filtering, expanding, paging, ...
		) : this {
			/* normalize address */
			if (address::isString())  { address = { href: address } }
			if (address::isInteger()) { address = { id:   address } }
			
			/* if it's not yet cached, load it now (async) */
			if (!Entity[$$committedEntitiesByHref][address.href]) {
				const values = await backend.load(address, options);
				const cmd    = this[$$Command_load].create(values);
				Entity[$$committedEntitiesByHref][address.href] = cmd.result;
			}
			
			/* fetch the entity from the cache */
			let entity = Entity[$$committedEntitiesByHref][address.href];
			
			/* make sure the retrieved entity is of the expected class */
			constraint(this.hasInstance(entity), humanMsg`
				The entity at '${JSON.stringify(address.href)}'
				is not of class '${this.name}'
				but of class '${entity.constructor.name}'.
			`);
			
			return entity;
		}
		
		static async getAll(
			options: {} = {} // TODO: filtering, expanding, paging, ...
		) : this {

			let response = await backend.loadAll(this, options);
			let result = new Set;

			/* cache response */
			for (let values of response) {
				if (!Entity[$$committedEntitiesByHref][values.href]) {
					Entity[$$committedEntitiesByHref][values.href] = values;
					const cmd = this[$$Command_load].create(values);
					Entity[$$committedEntitiesByHref][cmd.result.href] = cmd.result;
					result.add(cmd.result);
				}
			}

			return result;
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
		
		constructor(
			initialValues: {} = {},
			options      : {} = {}
		) {
			
			/* initialize value tracking */
			super();
			super.setValueTrackerOptions({
				takeUntil: combineLatest(
					this.p('isDeleted'),
					this.p('isPristine'),
					this.p('isNew'),
					(d, p, n) => d && (p || n)
				)::filter(v=>!!v)
			});
			
			/* make sure this constructor was invoked under proper conditions */
			constraint(options.allowInvokingConstructor, humanMsg`
				Do not use 'new ${this.constructor.name}(...args)'.
				Instead, use '${this.constructor.name}.new(...args)'
				          or '${this.constructor.name}.get(...args)'.
			`);
			delete options.allowInvokingConstructor;
			
			/* keeping track of related commands */
			this.originCommand = options.command;
			this.editCommands  = [];
			this.deleteCommand = null;
			
			/* set defaults for the core initial field values */
			initialValues::defaults({
				id:    null,
				href:  null,
				class: this.constructor.name
			});
			
			/* initialize all fields in this entity */
			Field.initializeEntity(this, initialValues);
			
		}
		
		get [Symbol.toStringTag]() {
			return `${this.constructor.name}: ${this.href || this.name}`;
		}
		
		
		//// Transforming to/from JSON
		
		static getIdentificationObjectFrom(val) {
			if (val::isString())  { return { href: val }           }
			if (val::isInteger()) { return { id:   val }           }
			if (val::isObject())  { return val::pick('href', 'id') }
			assert(false);
		}
		
		static objectToJSON(obj, options = {}) {
			let { sourceEntity } = options;
			// TODO: rather than sourceEntity, accept an entity class,
			//       which should have a good description of the fields
			let result = {};
			for (let [key, value] of obj::entries()) {
				result[key] = sourceEntity.fields[key].constructor.valueToJSON(value, options);
			}
		}
		
		toJSON(options = {}) {
			let { minimal } = options;
			let result = {};
			for (let [key, field] of this.fields::entries()) {
				if (!minimal || (field.constructor !== RelShortcut$Field
				              && field.constructor !== RelShortcut1Field)) {
					result[key] = field.value;
				}
			}
			return this.constructor.objectToJSON(result, { ...options, sourceEntity: this });
		}
		
		
		//// Setting / getting of fields
		
		get(key)               { return this.fields[key].get()             }
		set(key, val, options) { return this.fields[key].set(val, options) }
		
		
		//// Commit & Rollback
		
		/**
		 * Commit all changes to this entity,
		 * taking the command dependency tree into account.
		 * @returns {Promise.<void>}
		 */
		async commit() {
			/* commit all latest commands associated with this entity */
			// NOTE: committing the latest commands also commits their
			//       dependencies, i.e., commits every associated command
			const latestCommands = Command.latest({ entity: this, committable: true });
			await Promise.all( latestCommands::map(cmd => cmd.commit()) );
		}
		
		/**
		 * Roll back all changes to this entity,
		 * taking the command dependency tree into account.
		 */
		rollback() {
			/* commit all latest commands associated with this entity */
			// NOTE: rolling back the earliest commands also rolls back their
			//       reverse dependencies, i.e., rolls back every associated command
			for (let cmd of Command.earliest({ entity: this, rollbackable: true })) {
				cmd.rollback();
			}
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



///// FROM Entity CLASS
// // TODO: check if getAll / getAllCommitted are ever used by any of our apps
// static getAll() {
// 	return new Set([...this[$$entities]].filter(::this.hasInstance));
// }
//
// static getAllCommitted() {
// 	return new Set([...this[$$committedEntities]].filter(::this.hasInstance));
// }

///// FROM Entity CONSTRUCTOR
// // TODO: remove this? Fields are no longer 'in charge' of committing
// /* entity is pristine if all its fields are pristine */
// combineLatest(
// 	...this.fields::values()::map(f=>f.p('isPristine')),
// 	(...fieldPristines) => fieldPristines.every(v=>!!v)
// ).subscribe( this.pSubject('isPristine') );

///// FROM Entity CONSTRUCTOR
// // TODO: CHECK CROSS-PROPERTY CONSTRAINTS?
