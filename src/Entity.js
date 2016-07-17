import isInteger  from 'lodash/isInteger';
import isString   from 'lodash/isString';
import {humanMsg} from "./util/misc";

export default class Entity {
	
	////////////////////////////////////////////////////////////
	////////// STATIC (building Entity-based classes) //////////
	////////////////////////////////////////////////////////////
	
	static createClass(config) {
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
		
		/* getters / setters for the properties */
		for (let [key, desc] of Object.entries(NewClass.properties)) {
			Object.defineProperty(NewClass.prototype, key, {
				get() {
					if (key in this._values) {
						return this._values[key];
					} else if ('default' in desc) {
						return desc.default;
					}
				},
				set(newValue) {
					// TODO: if (!validate(this, key, newValue)) { throw Error }
					this._values[key] = newValue;
				}
			});
		}
		
		return NewClass;
	}
	
	///////////////////////////////////////////////////////////
	////////// STATIC (building / finding instances) //////////
	///////////////////////////////////////////////////////////
	
	static _cacheById   = {};
	static _cacheByHref = {};
	
	static get(identification = {}, options = {}) {
		for (let [key, check] of [
			['id',   isInteger],
			['href', isString ]
		]) {
			if (check(identification)) {
				identification = { [key]: identification };
			}
			if (identification[key]) {
				
				console.assert(check(identification[key]), humanMsg`
					The '${key}' property on a
					resource construction object
					must be a string.
				`);
				
				console.assert(Object.keys(identification).length === 1, humanMsg`
					If a resource construction object contains
					an '${key}' property, it shouldn't 
					any other properties.
				`);
				
				let entity = Entity._cacheByHref[identification[key]];
				
				console.assert(entity, humanMsg`
					An entity with ${key} '${identification[key]}' does not exist.
				`);// TODO: do remote loading, etc. It doesn't have to be cache.
				
				console.assert(entity instanceof this, humanMsg`
					The entity with ${key} '${identification[key]}'
					is not of class '${this.name}',
					so you used the wrong constructor.
				`);
				
				return entity;
			}
		}
		console.assert(false, humanMsg`
			You did not give a valid 'href' or 'id' reference.
		`);
	}
	
	
	///////////////////////////////
	////////// INSTANCES //////////
	///////////////////////////////
	
	_values = {};
	
	constructor(givenProperties = {}) {
		
		/* initializing */
		for (let [key, desc] of Object.entries(this.constructor.properties)) {
			if (key in givenProperties) {
				// TODO: if (!validate(this, key, givenProperties[key])) { throw Error }
				this._values[key] = givenProperties[key];
			}
		}
		
		// TODO: other initialization stuff
		
	}
	

}
