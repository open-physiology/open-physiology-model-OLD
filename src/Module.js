import {assign, pick, omit, parseInt, entries, isArray, isUndefined} from 'lodash-bound';
import _uniqueId from 'lodash/uniqueId';
import assert from 'power-assert';
import commandClassesFactory from './commands/commandClasses.js';

const $$noValue = Symbol('$$noValue');


/**
 * An entity address that uniquely identifies it.
 * @typedef {{ class: string, id: number }} Address
 */

/**
 * The Entity class from open-physiology-manifest.
 * @typedef {open-physiology-manifest~Entity} Entity
 */

/**
 * The Module class from open-physiology-manifest.
 * @typedef {open-physiology-manifest~Module} opmModule
 */

/**
 * An object with asynchronous functions that should be provided to
 * a new `Module`, and determines how to store and retrieve entities.
 * @typedef {{
 *     commit_new:    function (:{class: string})         : Promise<Object>,
 *     commit_edit:   function (Address, Object)         : Promise<Object>,
 *     commit_delete: function (Address)                 : Promise,
 *     commit_link:   function (Address, string, Address): Promise,
 *     commit_unlink: function (Address, string, Address): Promise,
 *     load:          function (Array<Address>)          : Promise<Array<Object>>,
 *     loadAll:       function (:{class: string})         : Promise<Array<Object>>
 * }} Backend
 */

/**
 * A module that can track and synchronize entities from open-physiology-manifest.
 */
export class Module {
	
	/**
	 * the backend used by this module
	 * @type {Backend}
	 */
	backend;
	
	/**
	 * a graph and string-to-Class dictionary of the Entity subclasses (straight from open-physiology-manifest)
	 * @type {Graph}
	 */
	entityClasses;
	
	/** The `Command`        class. */ Command        : Class;
	/** The `Command_new`    class. */ Command_new    : Class;
	/** The `Command_load`   class. */ Command_load   : Class;
	/** The `Command_edit`   class. */ Command_edit   : Class;
	/** The `Command_delete` class. */ Command_delete : Class;
	/** The `Command_link`   class. */ Command_link   : Class;
	/** The `Command_unlink` class. */ Command_unlink : Class;
	
	/** The `Field`         class. */ Field         : Class;
	/** The `PropertyField` class. */ PropertyField : Class;
	/** The `RelField`      class. */ RelField      : Class;
	/** The `Rel1Field`     class. */ Rel1Field     : Class;
	/** The `Rel$Field`     class. */ Rel$Field     : Class;
	
	/**
	 * the currently registered resource entities
	 * @type {Set<Entity>}
	 */
	resources     = new Set;
	
	/**
	 * the currently registered resource entities mapped from their `id`
	 * @type {Map<number, Entity>}
	 */
	resourcesById = new Map; // id --> entity
	
	/**
	 * whether this Module is currently listening to entity-mutations
	 * (to generate commands representing them);
	 * `true` means it is _not_ listening
	 * @type {boolean}
	 */
	nonReactiveMode = false;
	
	/**
	 * Create a new Module for tracking and synchronizing entities
	 * from the open-physiology-manifest.
	 * @param {Object}    options
	 * @param {opmModule} options.manifest - an open-physiology-manifest module
	 * @param {Backend}   options.backend  - the backend to be used by this module
	 */
	constructor(options) {
		const {manifest, backend} = options;
		let env = {};
		env::assign({
			backend,
			entityClasses: manifest.classes,
			...commandClassesFactory(env)::pick(
				'Command',
				'Command_new',
				'Command_load',
				'Command_edit',
				'Command_delete',
				'Command_link',
				'Command_unlink',
			),
			...manifest::pick(
				'Field',
				'PropertyField',
				'RelField',
				'Rel1Field',
				'Rel$Field'
			),
			internalOperation: (fn) => {
				this.nonReactiveMode = true;
				fn();
				this.nonReactiveMode = false;
			},
			getLocalOrPlaceholder: (address) => {
				return this._getLocalOrPlaceholder(address);
			}
		});
		this::assign(env);
	}


	///// High level operations (defined over the whole ecosystem of browser-server-database) /////

	/**
	 * Register a local entity to this module and assign a
	 * temporary id to it if it doesn't have an id already.
	 * Note that you may instead want to
	 * create new resources directly from this module.
	 * @param {Entity} entity - the entity to register
	 */
	register(entity) {
		/* only register once */
		if (this.resources.has(entity)) { return }

		/* generate unique temporary id (a negative number) if necessary */
		if (!entity.fields['id'].get()) {
			entity.fields['id'].set( - _uniqueId()::parseInt(), { ignoreReadonly: true } );  // TODO: do this in Command_new

			/* create Command_new for this, in 'post-run' state */
			this._new(entity);
		}

		/* synchronizing entity deletion with deletion from storage */
		entity.p('deleted').subscribe((deleted) => {
			if (deleted) {
				this.resourcesById.delete(entity.id);
				this.resources.delete(entity);
			} else {
				this.resourcesById.set(entity.id, entity);
				this.resources.add(entity);
			}
		});

		/* handling id change (meaning the entity was committed) */
		entity.fields['id'].p('value').pairwise().subscribe(([prev, next]) => {
			assert(prev < 0 && next > 0); // from a temporary id to a permanent id
			this.resourcesById.delete(prev);
			this.resourcesById.set(next, entity);
		});

		/* respond to edit, link and unlink from outside */
		const isConcreteRelKey = (key) => {
			let match = key.match(/^-->(\w+)/); // we only record --> commands (model lib always pairs them for us)
			if (!match) { return false }
			return !this.entityClasses[match[1]].abstract;
		};
		const reactive = ()=>!this.nonReactiveMode;
		for (let [key, field] of entity.fields::omit('id', 'class')::entries()) {
			if (field instanceof this.Rel1Field && isConcreteRelKey(key)) {
				field.p('value').startWith(null).pairwise().filter(reactive).subscribe(([prev, next]) => {
					if (prev) { this._unlink(entity, key, prev) }
					if (next) { this._link  (entity, key, next) }
				});
			} else if (field instanceof this.Rel$Field && isConcreteRelKey(key)) {
				field.get().e('delete').filter(reactive).subscribe((prev) => { this._unlink(entity, key, prev) });
				field.get().e('add'   ).filter(reactive).subscribe((next) => { this._link  (entity, key, next) });
			} else if (field instanceof this.PropertyField) {
				field.p('value').skip(1).startWith($$noValue).pairwise().filter(reactive).subscribe(([prev, next]) => {
					// don't record commands for default values
					if (prev === $$noValue && next === entity.constructor.properties[key].default) { return }
					if (prev === $$noValue) { prev = undefined }
					// record commands for other values
					this._edit(entity, { [key]: next }, { [key]: prev });
				});
			}
		}

		/* respond to delete from outside */
		entity.p('deleted').filter(reactive).filter(d=>!!d).subscribe(() => { this._delete(entity) });

		/***/
		return entity;
	}
	
	/**
	 * Set a number of fields of an entity at the same time,
	 * including both property and relationship fields.
	 * Relationship fields can be just addresses, which are
	 * replaced by actual entities; loaded if locally available,
	 * placeholders if not.
	 * @param {Entity} entity - the entity on which to set fields
	 * @param {Object} values - the new field values (with either
	 *                          addresses or actual entities for relationship fields)
	 */
	setEntityFields(entity, values) {
		for (let [key, field] of entity.fields::omit('id', 'class')::entries()) {
			if (!values[key]::isUndefined()) {
				if (field instanceof this.Rel1Field) {

					if (values[key] === null) {
						field.set(null);
					} else {
						let relatedResource = this.getLocalOrPlaceholder(values[key]);
						assert(relatedResource);
						field.set(relatedResource);
					}

				} else if (field instanceof this.Rel$Field) {

					for (let addr of values[key]) {
						let relatedResource = this.getLocalOrPlaceholder(addr);
						assert(relatedResource);
						field.add(relatedResource);
					}

				} else if (field instanceof this.PropertyField) {

					field.set(values[key]);

				}
			}
		}
	}

	/**
	 * Reset a number of fields of an entity at the same time,
	 * including both property and relationship fields.
	 * @param {Entity} entity        - the entity on which to reset fields
	 * @param {Array<string>} [keys] - keys of the fields to reset
	 */
	resetEntityFields(entity, keys) {
		for (let [key, field] of entity.fields::omit('id', 'class')::entries()) {
			if (!keys || keys.includes(key)) {
				if (field instanceof this.Rel1Field) {

					field.set(null);

				} else if (field instanceof this.Rel$Field) {

					field.get().clear();

				} else if (field instanceof this.PropertyField) {

					field.set(entity.constructor.properties[key].default);

				}
			}
		}
	}
	
	/**
	 * Create a new registered entity.
	 * @param {{class: string}}  desc - a description of the new entity, containing at least a `class` field
	 * @param {Object} [options={}]   - options passed to the entity factory function
	 * @return {Entity} the new entity
	 */
	new(desc, options = {}) {
		const { class: clsName, ...initialValues } = desc;
		const entity = this.entityClasses[clsName].new({}, options);
		this.register(entity);
		this.setEntityFields(entity, initialValues);
		return entity;
	}
	
	/**
	 * Asynchronously get one or multiple entities by address. Unknown entities
	 * are fetched through the backend, but known ones are included from local storage.
	 * @param  {Address|Array<Address>} addresses - a single address or an array of addresses
	 * @return {Promise<Entity|Array<Entity>>} - an entity / entities corresponding to the given addresses
	 */
	async get(addresses) {
		// TODO: can be made faster, maybe, loading
		// TODO: multiple at the same time from backend
		let paramIsArray = addresses::isArray();
		if (!paramIsArray) { addresses = [addresses] }
		let result = await Promise.all(addresses.map(async (addr) => {

			let entity = this._getLocalOrPlaceholder(addr);

			if (entity && entity.isPlaceholder) {
				const placeholder = entity;

				const command = this.Command.entityToCommand.get(placeholder).origin;
				assert(command instanceof this.Command_load);
				entity = await command.load();

				if (entity === null) {
					this._undoEntityCreation(placeholder);
				} else {
					this.setEntityFields(entity, command.response);
				}
			}

			return entity;

		}));

		return paramIsArray ? result : result[0];
	}
	
	/**
	 * Asynchronously get all entities of a certain description.
	 * @param {{class: string}} descriptor - the description of which entities to get (currently only understands 'class')
	 * @return {Promise<Array<Entity>>}    - an array of the fetched Entities
	 */
	async getAll(descriptor) {
		let entitiesJson = await this.backend.loadAll(descriptor);
		return entitiesJson.map((json) => {
			let entity = this._getLocalOrPlaceholder(json);
			if (entity && entity.isPlaceholder) {

				const placeholder = entity;

				const command = this.Command.entityToCommand.get(placeholder).origin;
				assert(command instanceof this.Command_load);
				entity = command.syncLoad(json);

				if (entity === null) { // TODO: Double check. Does this ever become null here? Probably not.
					this._undoEntityCreation(placeholder);
				} else {
					this.setEntityFields(entity, command.response);
				}

			}
			return entity;
		});
	}
	
	/**
	 * Commit all commands, or only those related to a given set of entities.
	 * @param {Object} options
	 * @param {Array<Entity>} [options.entities] - if given, only commits commands related to the given entities (and their dependencies)
	 * @return {Promise} a promise which resolves when the commit is complete
	 */
	async commit(options = {}) {
		const {entities = null} = options;
		let latestCmds = [...this.Command.latest({entities, states: ['post-run']})];
		for (let cmd of latestCmds) { await cmd.commit() }
		// TODO: we should be able to wait for all of the above commits simultaneously,
		//     : but just awaiting a Promise.all seems to expose some race conditions,
		//     : at least in the server test setup
	}
	
	/**
	 * Roll back all commands, or only those related to a given set of entities.
	 * @param {Object} options
	 * @param {Array<Entity>} [options.entities] - if given, only rolls back commands related to the given entities (and the ones dependent on them)
	 */
	rollback(options = {}) {
		const {entities = null} = options;
		for (let cmd of this.Command.earliest({entities, states: ['post-run']})) {
			cmd.rollback();
		}
	}


	///// Reactive command creation /////

	/** @private */
	_new(entity) {
		return new this.Command_new(entity, { state: 'post-run' });
	}

	/** @private */
	_edit(entity, newValues, oldValues) {
		return new this.Command_edit(entity, newValues, oldValues, { state: 'post-run' });
	}

	/** @private */
	_link(entity1, relationship, entity2) {
		return new this.Command_link(entity1, relationship, entity2, { state: 'post-run' });
	}

	/** @private */
	_unlink(entity1, relationship, entity2) {
		return new this.Command_unlink(entity1, relationship, entity2, { state: 'post-run' });
	}

	/** @private */
	_delete(entity) {
		return new this.Command_delete(entity, { state: 'post-run' });
	}


	///// Other operations /////

	/** @private */
	_undoEntityCreation(entity) {
		/* clean up related commands */
		let e = this.Command.entityToCommand.get(entity);
		for (let [key, r] of e.relationships::entries()) for (let [otherEntity, arr] of r.entries()) {
			this.Command.entityToCommand.get(otherEntity).relationships[key].delete(entity);
		}
		this.Command.entityToCommand.delete(entity);

		/* remove from storage */
		this.resourcesById.delete(entity.id);
		this.resources.delete(entity);

		/* delete for good measure */
		entity.delete();
	}

	/** @private */
	_getLocalOrPlaceholder({ class: cls, id }) {
		let entity = this.resourcesById.get(id) || null;
		if (!entity) {
			entity = this.entityClasses[cls].new({ id }, { isPlaceholder: true });
			this.register(entity);
			new this.Command_load(entity);
		} else if (!this.entityClasses[cls].hasSubclass(entity.constructor)) {
			entity = null;
		}
		return entity;
	}
	
}
