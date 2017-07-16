import {assign, pick, omit, parseInt, entries, isArray, isUndefined} from 'lodash-bound';
import _uniqueId from 'lodash/uniqueId';
import assert from 'power-assert';
import commandClassesFactory from './commands/commandClasses.js';

const $$noValue = Symbol('$$noValue');


export class Module {
	
	backend;
	entityClasses;
	
	Command        : Class;
	Command_new    : Class;
	Command_load   : Class;
	Command_edit   : Class;
	Command_delete : Class;
	Command_link   : Class;
	Command_unlink : Class;
	
	Field         : Class;
	PropertyField : Class;
	RelField      : Class;
	Rel1Field     : Class;
	Rel$Field     : Class;
	
	resources     = new Set;
	resourcesById = new Map; // id --> entity
	
	nonReactiveMode = false;
	
	constructor({manifest, backend}) {
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
	 * temporary id to it. Note that you may instead want to
	 * create new resources directly from this module.
	 *
	 * @param entity
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

	setEntityFields(entity, initialValues) {
		for (let [key, field] of entity.fields::omit('id', 'class')::entries()) {
			if (!initialValues[key]::isUndefined()) {
				if (field instanceof this.Rel1Field) {

					if (initialValues[key] === null) {
						field.set(null);
					} else {
						let relatedResource = this.getLocalOrPlaceholder(initialValues[key]);
						assert(relatedResource);
						field.set(relatedResource);
					}

				} else if (field instanceof this.Rel$Field) {

					for (let addr of initialValues[key]) {
						let relatedResource = this.getLocalOrPlaceholder(addr);
						assert(relatedResource);
						field.add(relatedResource);
					}

				} else if (field instanceof this.PropertyField) {

					field.set(initialValues[key]);

				}
			}
		}
	}

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

	new({ class: clsName, ...initialValues }, options = {}) {
		const entity = this.entityClasses[clsName].new({}, options);
		this.register(entity);
		this.setEntityFields(entity, initialValues);
		return entity;
	}

	async get(addresses = []) {
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

	async commit({entities = null} = {}) {
		let latestCmds = [...this.Command.latest({entities, states: ['post-run']})];
		for (let cmd of latestCmds) { await cmd.commit() }
		// TODO: we should be able to wait for all of the above commits simultaneously,
		//     : but just awaiting a Promise.all seems to expose some race conditions,
		//     : at least in the server test setup
	}

	rollback({entities = null} = {}) {
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
