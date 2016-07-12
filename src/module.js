import isFunction from 'lodash/isFunction';
import isInteger  from 'lodash/isInteger';
import isString   from 'lodash/isString';

import Entity from './Entity';

////////////////////////////////////////////////////////////////////////////////
// Module / Resource / Relationship Factory                                   //
////////////////////////////////////////////////////////////////////////////////

const PROCESSED = Symbol('PROCESSED');

function normalizeConfig(config) {

	/* check 'extends' */
	if (!['Resource', 'IsRelatedTo'].includes(config.name)) {
		console.assert(config.extends, `
				The '${config.name}' class is being processed,
				but it does not extend another class, which it should.
		`);
		console.assert(config.extends[PROCESSED], `
			The '${config.name}' class is being processed,
			but it extends the '${config.extends.name}' class,
			which has not yet been processed.
		`);
	}

	/* check plural */
	config.plural = config.plural || `${config.singular}s`;

	/* return modified object */
	return {
		properties:        {},
		patternProperties: {},
		...config,
	};
}


function jsonSchemaConfig(config) {
	let result = {
		...config,
		allProperties: { ...config.properties }
	};

	if (isFunction(config.extends)) {
		/* merge each property with properties of the same name in the superclass */
		for (let key of Object.keys(config.extends.allProperties)) {
			// TODO: check for conflicts
			// TODO: merge certain sub-items (e.g., enums can be made narrower)
			result.allProperties[key] = {
				...config.extends.allProperties[key],
				...result.allProperties[key]
			};
		}
	}

	/* folding superclass properties into one object */
	Object.assign(result.allProperties, config.extends && config.extends.allProperties);

	return result;

	// return {
	// 	...config,
	// 	schema: {
	// 		$schema:             'http://json-schema.org/draft-04/schema#',
	// 		type:                'Object',
	// 		properties:           { ...(config.properties || {})         },
	// 		patternProperties:    { ...(config.patternProperties || {})  },
	// 		additionalProperties: ( config.additionalProperties === true )  // default: no additional properties allowed
	//
	// 		// TODO: have this object conform to json schema syntax
	// 		//     : - add 'required' field?
	// 		//     : - sanitize config.properties
	// 		//     : - add properties '1' and '2' to it (if config.isRelationship)
	//
	// 		// TODO: fold superclass properties, patternProperties, etc. into this
	// 		//     : - fold property flags into each other
	// 	}
	// };
}


function relationshipSidesConfig(config) {

	// generally speaking:
	// - 1 is left-hand side, and
	// - 2 is right-hand side

	/* initialize result config */
	let result = {
		...config,
		1: { key: `-[:${config.name}]->` },
		2: { key: `<-[:${config.name}]-` }
	};

	/* create objects for both sides 1 and 2 */
	for (let side of [1, 2]) {
		console.assert(Array.isArray(config[side]), `
			Relationship sides 1, 2 need to be arrays.
		`);
		let thisSide  = result[side];
		let otherSide = result[3-side]; // {1↦2, 2↦1}
		Object.assign(thisSide, {
			normalized: result,
			other: otherSide,
			class: config[side][0],
			cardinality: { // NOTE: this is the cardinality of outgoing connections
				min: config[side][1][0],
				max: config[side][1][1]
			},
			options: config[side]
		});
	}

	return result;
}

// TODO: disallow duplicate names for resource classes
// TODO: folding same-name relationship classes

function createConstructorFromConfig(config) {
	/* create the class with the right name, constructor  and static content */
	const {name, ...rest} = config;
	const NewClass = class extends (config.extends || Entity) {
		constructor(givenProperties = {}) {
			
			super(givenProperties);
			
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
				/* description of new entity */

			}


			// TODO: initialization stuff?

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
	};
	Object.defineProperty(NewClass, 'name', { value: name });
	Object.assign(NewClass, rest);

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

function mapOptionalArray(config, fn) {
	let isArray = Array.isArray(config);
	config = (isArray ? config : [config]).map(fn);
	return isArray ? config : config[0];
}

export default class Module {

	classes      = {};
	dependencies = [];

	constructor(dependencies = []) {
		this.dependencies.push(...dependencies);
	}

	preProcessingConfig(config) {
		console.assert(!config[PROCESSED],
			`The ${config.name} class is being processed multiple times. That's no good.`);

		// console.log(`Processing the '${config.name}' class.`);

		return config;
	}

	postProcessingConfig(config) {
		config[PROCESSED] = true;
		this.classes[config.name] = config;
		return config;
	}

	OBJECT(config) {
		return mapOptionalArray(config, (conf) => {
			conf = this.preProcessingConfig (conf);
			conf = this.postProcessingConfig(conf);
			return conf;
		});
	}

	RESOURCE(config) {
		return mapOptionalArray(config, (conf) => {
			conf.isResource = true;
			conf = this.preProcessingConfig   (conf);
			conf = normalizeConfig            (conf);
			conf = jsonSchemaConfig           (conf);
			conf = createConstructorFromConfig(conf);
			conf = this.postProcessingConfig  (conf);
			return conf;
		});
	}

	RELATIONSHIP(config) {
		return mapOptionalArray(config, (conf) => {
			conf.isRelationship = true;
			conf = this.preProcessingConfig   (conf);
			conf = normalizeConfig            (conf);
			conf = jsonSchemaConfig           (conf);
			conf = relationshipSidesConfig    (conf);
			conf = createConstructorFromConfig(conf);
			conf = this.postProcessingConfig  (conf);
			return conf;
		});
	}

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
