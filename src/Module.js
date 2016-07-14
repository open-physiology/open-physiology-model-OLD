// import Graph from 'graph.js';

import isFunction from 'lodash/isFunction';
import isInteger  from 'lodash/isInteger';
import isString   from 'lodash/isString';
import isArray    from 'lodash/isArray';
import defaults   from 'lodash/defaults';

import {humanMsg} from './util';

// import Entity from './Entity';
import Graph from 'graph.js/dist/graph.js';

////////////////////////////////////////////////////////////////////////////////
// Module / Resource / Relationship Factory                                   //
////////////////////////////////////////////////////////////////////////////////

const CLASS  = 'CLASS';  // TODO: Symbol
const CONFIG = 'CONFIG'; // TODO: Symbol
const MODULE = 'MODULE'; // TODO: Symbol

// TODO: reintroduce these
//
// function jsonSchemaConfig(config) {
// 	let result = {
// 		...config,
// 		allProperties: { ...config.properties }
// 	};
//
// 	if (isFunction(config.extends)) {
// 		/* merge each property with properties of the same name in the superclass */
// 		for (let key of Object.keys(config.extends.allProperties)) {
// 			// TODO: check for conflicts
// 			// TODO: merge certain sub-items (e.g., enums can be made narrower)
// 			result.allProperties[key] = {
// 				...config.extends.allProperties[key],
// 				...result.allProperties[key]
// 			};
// 		}
// 	}
//
// 	/* folding superclass properties into one object */
// 	Object.assign(result.allProperties, config.extends && config.extends.allProperties);
//
// 	return result;
//
// 	// return {
// 	// 	...config,
// 	// 	schema: {
// 	// 		$schema:             'http://json-schema.org/draft-04/schema#',
// 	// 		type:                'Object',
// 	// 		properties:           { ...(config.properties || {})         },
// 	// 		patternProperties:    { ...(config.patternProperties || {})  },
// 	// 		additionalProperties: ( config.additionalProperties === true )  // default: no additional properties allowed
// 	//
// 	// 		// TODO: have this object conform to json schema syntax
// 	// 		//     : - add 'required' field?
// 	// 		//     : - sanitize config.properties
// 	// 		//     : - add properties '1' and '2' to it (if config.isRelationship)
// 	//
// 	// 		// TODO: fold superclass properties, patternProperties, etc. into this
// 	// 		//     : - fold property flags into each other
// 	// 	}
// 	// };
// }
//
//


// TODO: disallow duplicate names for resource classes
// TODO: folding same-name relationship classes

function mapOptionalArray(config, fn) {
	let isArray = Array.isArray(config);
	config = (isArray ? config : [config]).map(fn);
	return isArray ? config : config[0];
}


export default class Module {
	
	configurations = new Graph;
	classes        = new Graph;

	constructor(dependencies = []) {
		for (let dependency of dependencies) {
			this.configurations.mergeIn(dependency.configurations);
			this.classes.mergeIn(dependency.classes);
		}
	}

	OBJECT(config) {
		return mapOptionalArray(config, (conf) => {
			this.preProcessingConfig (conf);
			this.postProcessingConfig(conf);
			return conf;
		});
	}

	RESOURCE(config) {
		return mapOptionalArray(config, (conf) => {
			conf.isResource = true;
			this.preProcessingConfig                          (conf);
			this.basicNormalization                           (conf);
			// jsonSchemaConfig                               (conf); // TODO
			let constructor = this.createConstructorFromConfig(conf);
			this.postProcessingConfig                  (constructor);
			return constructor;
		});
	}

	RELATIONSHIP(config) {
		return mapOptionalArray(config, (conf) => {
			conf.isRelationship = true;
			this.preProcessingConfig                          (conf);
			this.basicNormalization                           (conf);
			// conf = jsonSchemaConfig                        (conf); // TODO
			let constructor = this.createConstructorFromConfig(conf);
			this.relationshipSidesConfig               (constructor);
			
			
			
			this.postProcessingConfig                  (constructor);
			return constructor;
		});
	}
	
	////////////////////////////////////////////////////////////////////////////
	
	preProcessingConfig(config) {
		console.assert(!this.configurations.hasVertex(config), humanMsg`
			The ${config.name} class is being processed multiple times.
			Something is wrong here.
		`);
		this.configurations.addVertex(config, config);
		// console.log(`Processing the '${config.name}' class.`);
	}
	
	basicNormalization(config) {
		
		/* properties objects */
		defaults(config, {
			properties:        {},
			patternProperties: {},
			extends:           [],
			extendedBy:        [],
		});
		
		/* normalizing sub/superclass data */
		if (!isArray(config.extends))           { config.extends = [config.extends]             }
		config.extends    = config.extends   .map(cls=>cls[CONFIG]);
		for (let extendee of config.extends)    { this.configurations.addEdge(extendee, config) }
		if (!isArray(config.extendedBy))        { config.extendedBy = [config.extendedBy]       }
		config.extendedBy = config.extendedBy.map(cls=>cls[CONFIG]);
		for (let extender of config.extendedBy) { this.configurations.addEdge(config, extender) }
		
		/* check 'extends' */
		if (!['Resource', 'IsRelatedTo'].includes(config.name)) {
			for (let extendee of config.extends) {
				console.assert(extendee, humanMsg`
					The '${config.name}' class is being processed,
					but it does not extend another class, which it should.
				`);
				console.assert(this.configurations.hasVertex(extendee), humanMsg`
					The '${config.name}' class is being processed,
					but it extends the '${extendee.name}' class,
					which has not yet been processed.
				`);
			}
		}
		
		/* check plural */
		config.plural = config.plural || `${config.singular}s`;
	}
	
	createConstructorFromConfig(config) {
		/* create the class with the right name, constructor  and static content */
		const {name, ...rest} = config;
		const NewClass = class {
			
			constructor(givenProperties = {}) {
				
				/* normalize into object */
				if (isInteger(givenProperties)) { givenProperties = { id:   givenProperties } }
				if (isString (givenProperties)) { givenProperties = { href: givenProperties } }
				
				/* distinguish between a new object and a reference to an existing one */
				const {id, href} = givenProperties;
				if ('href' in givenProperties) {
					/* reference to existing entity by href */
					if (!isString(givenProperties.href)) {
						throw new TypeError(`
						The 'href' property on a
						resource construction object
						must be a string.
					`);
					}
					if (Object.keys(givenProperties).length > 1) {
						throw new TypeError(`
						If a resource construction object contains
						an 'href' or 'id' property, it shouldn't 
						any other properties.
					`);
					}
					// TODO: assert that the entity exists
					// TODO: assert that the entity is a subclass of NewClass
					// TODO: return a reference to the locally stored entity (from this constructor)
				} else if ('id' in givenProperties) {
					/* reference to existing entity by id  */
					if (!isInteger(givenProperties.id) && givenProperties.id > 0) {
						throw new TypeError(`
						The 'id' property on a
						resource construction object
						must be a positive integer.
					`);
					}
					if (Object.keys(givenProperties).length > 1) {
						throw new TypeError(`
						If a resource construction object contains an
						'id' property, it shouldn't any other properties.
					`);
					}
					// TODO: assert that the entity exists
					// TODO: assert that the entity is a subclass of NewClass
					// TODO: return a reference to the locally stored entity (from this constructor)
				} else {
					/* storing values */
					this._values = {};
					
					/* initializing */
					for (let [key, desc] of Object.entries(NewClass.properties)) {
						if (key in givenProperties) {
							// TODO: if (!validate(this, key, givenProperties[key])) { throw Error }
							this._values[key] = givenProperties[key];
						}
					}
				}
				
				
				// TODO: other initialization stuff?
				
				
				
			}
			
		};
		Object.defineProperties(NewClass, {
			/**
			 * Set the name property of this class to
			 * the name given in the configuration.
			 */
			name: { value: name },
			/**
			 * Implement the `instanceof` operator to support
			 * our own flavor of multiple inheritance.
			 */
			[Symbol.hasInstance]: {
				value: (instance) => {
					if (instance.constructor === NewClass) { return true }
					for (let [SubClass] of instance.constructor[MODULE].classes.verticesFrom(NewClass)) {
						if (SubClass[Symbol.hasInstance](instance)) { return true }
					}
					return false;
				}
			}
		});
		Object.assign(NewClass, rest);
		
		/* register new class */
		config  [CLASS]  = NewClass;
		NewClass[CONFIG] = config;
		config  [MODULE] = this;
		NewClass[MODULE] = this;
		this.classes.addVertex(NewClass, NewClass);
		for (let extendee of config.extends) {
			this.classes.addEdge(extendee[CLASS], NewClass);
		}
		for (let extender of config.extendedBy) {
			this.classes.addEdge(NewClass, extender[CLASS]);
		}
		
		
		/* getters / setters for the properties */
		for (let [key, desc] of Object.entries(NewClass.properties)) {
			Object.defineProperty(NewClass.prototype, key, {
				get() {
					if (key in this._values) {
						return this._values[key];
					} else if ('default' in desc) {
						return desc.default;
					} else if (desc.type === 'array') {
						return [];
					} // TODO: is this it?
				},
				set(newValue) {
					// TODO: if (!validate(this, key, newValue)) { throw Error }
					this._values[key] = newValue;
				}
			});
		}
		
		return NewClass;
	}
	
	relationshipSidesConfig(cls) {
	
		// generally speaking:
		// - 1 is left-hand side, and
		// - 2 is right-hand side
		
		let old = { [1]: cls[1], [2]: cls[2] };
		
		Object.assign(cls, {
			1: { key: `-[:${cls.name}]->` },
			2: { key: `<-[:${cls.name}]-` }
		});
			
		/* create objects for both sides 1 and 2 */
		for (let side of [1, 2]) {
			console.assert(Array.isArray(old[side]), humanMsg`
				Relationship sides 1, 2 need to be arrays.
			`);
			let thisSide  = cls[side  ];
			let otherSide = cls[3-side]; // {1↦2, 2↦1}
			Object.assign(thisSide, {
				other: otherSide,
				relationship: cls,
				class: old[side][0],
				cardinality: { // NOTE: this is the cardinality of outgoing connections
					min: old[side][1][0],
					max: old[side][1][1]
				},
				options: old[side][2] || {},
				properties: cls.properties
			});
			
			/* put back-reference in classes */
			let resourceClass = thisSide.class; {
				resourceClass.relationships = resourceClass.relationships || {};
				resourceClass.relationships[thisSide.key] = thisSide;
			}
		}
	}
	
	postProcessingConfig(cls) {}

}

////////////////////////////////////////////////////////////
// RESOURCE({
//
//     name: 'ResourceName',
//
//     extends: <superclass>,
//     abstract: <true/false>,
//
//     singular: 'singular name',
//     plural:   'plural names',
//
//     properties: {
//         ...properties
//     },
//     patternProperties: {
//         ...patternProperties
//     },
//     ...options
// })
////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////
// RELATIONSHIP({
//
//     name: 'RelationshipName',
//
//     extends: <superclass>,
//     abstract: <true/false>,
//
//     1: [ ResourceType1, [c1min, c1max], { ...options1to2 } ],
//     2: [ ResourceType2, [c2min, c2max], { ...options2to1 } ],
//
//     properties: {
//         ...properties
//     },
//
//     ...options
// })
//
// This means that RelationshipName is a type of c1-to-c2 relationship
// (c stands for cardinality: many-to-many, one-to-many, etc. both sides
// have a min and max) between ResourceType1 resources and ResourceType2 resources.
// So: "a ResourceType1 resource can be related to 'c1' ResourceType2 resource(s),
//      exposed through through the key 'options1to2.key' in that resource"
// and vice versa, if a key field is present, which is not mandatory.
//
// A couple of possible options:
// - options1to2.sustains:     when the last related ResourceType1 instance is deleted,
//                             the ResourceType2 instance that is being sustained by it is deleted automatically
// - options1to2.anchors:      a ResourceType2 instance cannot be deleted
//                             while there are still ResourceType1 instances related with it
// - options1to2.implicit:     (only when c1min > 0) a new ResourceType2 instance, plus this kind of relationship,
//                             is automatically created for a new ResourceType1 instance;
// - options1to2.getSummary:   a human-readable explanation of the corresponding REST endpoint for HTTP GET
// - options1to2.putSummary:   a human-readable explanation of the corresponding REST endpoint for HTTP PUT
// - options1to2.deleteSummary:a human-readable explanation of the corresponding REST endpoint for HTTP DELETE
// - options.readOnly:         this relationship type is managed programmatically, not to be exposed through the API directly
// - options.noCycles:         no cycles of this relationship type are allowed
// - options.symmetric:        this relationship type is bidirectional, 1->2 always implies 2->1; TODO: implement when needed
// - options.antiReflexive:    a resource may not be related to itself with this type;            TODO: implement when needed
////////////////////////////////////////////////////////////



////////////////////////////////////////////////////////////////////////////////
// Cardinalities                                                              //
////////////////////////////////////////////////////////////////////////////////

// just use 0, 1, 2, where appropriate
export const MANY = Infinity;
