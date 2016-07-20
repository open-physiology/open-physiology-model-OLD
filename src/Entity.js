import isInteger  from 'lodash/isInteger';
import isString   from 'lodash/isString';
import assert     from 'power-assert';
import {humanMsg} from "./util/misc";

export default class Entity {
	
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
	
	static createGetterSetters(cls) {
		/* getters / setters for the properties */
		for (let desc of Object.values(cls.properties || {})) {
			Entity.createPropertyInterface(cls, desc);
		}
		/* getters / setters for relationships starting in this resource */
		if (cls.isResource) {
			for (let desc of Object.values(cls.relationships || {})) {
				Entity.createRelationshipInterface(cls, desc);
			}
		}
		/* getters / setters for [1] and [2] in a relationship */
		if (cls.isRelationship) {
			Entity.create12Interface(cls);
		}
	}
	
	static create12Interface(cls) {
		if (cls.prototype.hasOwnProperty(1)) { return }
		for (let side of [1, 2]) {
			Object.defineProperty(cls.prototype, side, {
				get() {
					return this._sides[side];
				},
				set(newObj) {
					console.log('?');
					// TODO: validate newObj as fitting this relationship class
					let old = this._sides[side];
					let clsSide = cls.domains[0][side]; // TODO: adapt to multiple domains
					this._sides[side] = newObj;
					if (clsSide.cardinality.max > 1) {
						if (old) { old[clsSide.key].delete(this) }
						newObj[clsSide.key].add(this);
					} else {
						if (old) { old[clsSide.key] = undefined }
						newObj[clsSide.key] = this;
					}
				},
				enumerable:   true,
				configurable: false
			});
		}
	}
	
	static createPropertyInterface(cls, desc) {
		if (cls.prototype.hasOwnProperty(desc.key)) { return }
		Object.defineProperty(cls.prototype, desc.key, {
			get() {
				if ('value' in desc) {
					return desc.value;
				} else if (desc.key in this._properties) {
					return this._properties[desc.key];
				} else if ('default' in desc) {
					return desc.default;
				}
			},
			set(newValue) {
				// TODO: if (!validate(this, key, newValue)) { throw Error }
				this._properties[desc.key] = newValue;
			},
			enumerable:   true,
			configurable: false
		});
	}
	
	static createRelationshipInterface(cls, desc) {
		if (cls.prototype.hasOwnProperty(desc.key)) { return }
		if (desc.cardinality.max === 1) {
			Object.defineProperty(cls.prototype, desc.key, {
				get() {
					return this._relationships[desc.key];
				},
				set(newValue) {
					// TODO: this can be a new one or an existing one;
					//     : if it's a new one, add it
					this._relationships[desc.key] = newValue;
				},
				enumerable:   true,
				configurable: false
			});
			if (isString(desc.options.key)) {
				Object.defineProperty(cls.prototype, desc.options.key, {
					get()         { return this[desc.key][desc.side]     },
					set(newValue) { this[desc.key][desc.side] = newValue }
				});
			}
		} else if (desc.cardinality.max > 1) {
			function init() {
				if (!this._relationships[desc.key]) {
					let set          = this._relationships[desc.key]          = new Set;
					const relInterface = this._relationshipInterfaces[desc.key] = {
						add(obj) {
							set.add(obj);
							return relInterface;
						},
						delete(obj) {
							return set.delete(obj);
						},
						has:     set.has    .bind(set),
						entries() { return set.entries() },
						keys   () { return set.keys   () },
						values () { return set.values () },
						[Symbol.iterator]() { return this.values() }
					};
					if (isString(desc.options.key)) {
						let shortcutInterface = this._relationshipShortcutInterfaces[desc.options.key] = {
							add: (obj) => {
								// TODO: validate obj to be inserted here for a new relationship
								set.add(new desc.relationshipClass({
									[desc.side]:       this,
									[desc.other.side]: obj
								}));
								return shortcutInterface;
							},
							delete: (obj) => {
								for (let rel of set) {
									if (rel[desc.other.side] === obj) {
										return set.delete(rel);
									}
								}
								return false;
							},
							clear: () => {
								assert(desc.cardinality.min === 0);
								set.clear();
								return shortcutInterface;
							},
							has: (obj) => {
								for (let rel of set) {
									if (rel[desc.other.side] === obj) {
										return true;
									}
								}
								return false;
							},
							*entries() {
								for (let rel of set) {
									yield [rel[desc.other.side], rel[desc.other.side]];
								}
							},
							*keys() {
								for (let rel of set) {
									yield rel[desc.other.side];
								}
							},
							*values() {
								for (let rel of set) {
									yield rel[desc.other.side];
								}
							},
							[Symbol.iterator]() { return this.values() }
						};
					}
				}
				return {
					relInterface:      this._relationshipInterfaces        [desc.key],
					shortcutInterface: this._relationshipShortcutInterfaces[desc.options.key]
				};
			}
			Object.defineProperty(cls.prototype, desc.key, {
				get() { return init.call(this).relInterface },
				enumerable:   true,
				configurable: false
			});
			if (isString(desc.options.key)) {
				Object.defineProperty(cls.prototype, desc.options.key, {
					get() { return init.call(this).shortcutInterface },
					enumerable:   true,
					configurable: false
				});
			}
		}
	}
	
	/////////////////////////////////////////////////////////////////////
	////////// STATIC (creating / caching / finding instances) //////////
	/////////////////////////////////////////////////////////////////////
	
	static _cacheById   : { [id  :number]: Entity } = {};
	static _cacheByHref : { [href:string]: Entity } = {};
	
	static new(
		values  : Object = {},
	    options : Object = {}
	): this {
		
		// if (this.name === 'ContainsMaterial') {
		//
		// }
		// console.log('(1)');
		//
		// let x = { ...values, href: null, id: null };
		// console.log(values[1]);
		// console.log(x[1]);
		
		
		
		let result = new this(
			{ ...values, href: null, id: null, class: this.name },
			{ ...options, new: true }
		);
		
		// console.log('(2)');
		
		return result;
	}
	
	static get(
		identification : { href: string } | { id: number } | string | number,
		options        : Object = {} // TODO: filtering, expanding, paging, ...
	): Promise<Entity> {
		for (let [key, check, cacheKey] of [
			['id',   isInteger, '_cacheByHref'],
			['href', isString,  '_cacheById'  ]
		]) {
			if (check(identification)) {
				identification = { [key]: identification };
			}
			if (identification[key]) {
				let entity;
				if (identification[key] in Entity[cacheKey]) {
					entity = Entity[cacheKey][identification[key]];
				}
				
				assert(entity instanceof this, humanMsg`
					The entity ${JSON.stringify(identification)} is not
					of class '${this.name}'
					but of class '${entity.constructor.name}'.
				`);
				return entity;
			}
		}
		assert(false, humanMsg`You did not give a valid 'href' or 'id' reference.`);
	}
	
	
	///////////////////////////////
	////////// INSTANCES //////////
	///////////////////////////////
	
	// all possible properties the model might have are available in this.constructor.properties
	_pristineProperties    :         {} = {}; // local values as they were at last fetch or commit
	_properties            :         {} = {}; // local values as they are now
	                                 
	_pristineRelationships :         {} = {};
	_relationships         :         {} = {};
	_relationshipInterfaces:         {} = {};
	_relationshipShortcutInterfaces: {} = {};
	
	_pristineSides:                  {} = {};
	_sides:                          {} = {};
	
	constructor(
		values:  Object = {},
		options: Object = {}
	) {
		
		if (this.constructor.name === 'ContainsMaterial') {
			console.log('---', this.constructor.name, values, options);
		}
		
		for (let key of Object.keys(this.constructor.properties)) {
			if (key in values) {
				// TODO: CHECK CONSTRAINT: given property value conforms to JSON schema
				// TODO: CHECK ADDITIONAL (PROPERTY-SPECIFIC) CONSTRAINTS: e.g., if this is a template, does it conform to its corresponding type?
				this._pristineProperties[key] = values[key];
				this[key] = values[key];
			} else {
				// TODO: If there is a default or constant value, no problem.
				//     : If this property is not required, no problem.
				//     : Otherwise: REGISTER CONSTRAINT VIOLATION: required property not present
			}
		}
		if (this.constructor.isResource) {
			for (let key of Object.keys(this.constructor.relationships)) {
				if (key in values) {
					this._pristineRelationships[key] = values[key];
					this[key] = values[key];
				}
			}
		}
		if (this.constructor.isRelationship) {
			for (let key of [1, 2]) {
				if (key in values) {
					this._pristineSides[key] = values[key];
					this[key] = values[key];
				}
			}
		}
		// if (this.constructor.name === 'ContainsMaterial') {
		// 	console.log(Object.keys(this.constructor.properties)); // TODO
		// }
		// TODO: CHECK ADDITIONAL (CROSS-PROPERTY) CONSTRAINTS
	}
	
	commit(): Promise<this> {
		// TODO: update pristine storage
		// TODO: call commit implementation
		return new Promise((resolve) => {
			setTimeout(() => {
				Object.assign(this._pristineProperties, this._properties);
				if (this.constructor.isResource) {
					Object.assign(this._pristineRelationships, this._relationships);
				}
				if (this.constructor.isRelationship) {
					Object.assign(this._pristineSides, this._sides);
				}
				resolve(this);
			});
		});
	}
	
	rollback(): Promise<this> {
		// TODO: overwrite local storage with pristine
		return new Promise((resolve) => {
			setTimeout(() => {
				Object.assign(this._properties, this._pristineProperties);
				if (this.constructor.isResource) {
					Object.assign(this._relationships, this._pristineRelationships);
				}
				if (this.constructor.isRelationship) {
					Object.assign(this._sides, this._pristineSides);
				}
				resolve(this);
			});
		});
	}
	

}
