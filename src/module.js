import {isObject} from './util';

////////////////////////////////////////////////////////////////////////////////
// Module / Resource / Relationship Factory                                   //
////////////////////////////////////////////////////////////////////////////////


const PROCESSED = Symbol('PROCESSED');
function normalizeConfig(config) {
	console.log(`Processing the '${config.name}' class.`);
	console.assert(!config[PROCESSED],
		`The ${config.name} class is being processed multiple times.`);

	/* set 'id' */
	config.id = config.id || config.name;

	/* check 'extends' */
	if (isObject(config.extends)) {
		console.assert(config.extends[PROCESSED], `
			The '${config.name}' class is being processed,
			but it extends the '${config.extends.name}',
			which has not yet been processed.
		`);
	} else {
		console.assert(['Resource', 'IsRelatedTo'].includes(config.name), `
			The '${config.name}' class is being processed,
			but it does not extend another class, which it should.
		`);
	}

	/* return modified object */
	return {
		...config,
		properties: config.properties || {},
		patternProperties: config.patternProperties || {},
		[PROCESSED]: true
	};
}


function jsonSchemaConfig(config) {
	let result = {
		...config,
		allProperties: { ...config.properties }
	};

	if (isObject(config.extends)) {
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


	// TODO: for each property, allow for a division into '{ Template: {}, Type: {}, typeCheck(type, value) {} }'
	//     : and normalize to that if this division is not given
	//     : -
}


function relationshipSidesConfig(config) {

	// generally speaking:
	// - 1 is left-hand side, and
	// - 2 is right-hand side

	let result = {
		...config,
		1: {},
		2: {}
	};

	for (let side of [1, 2]) {
		console.assert(Array.isArray(config[side]));
		let thisSide  = result[side];
		let otherSide = result[3-side]; // {1↦2, 2↦1}
		Object.assign(thisSide, {
			normalized: result,
			other: otherSide,
			key: side === 1 ? `-[${config.name}]->` : `<-[${config.name}]-`,
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


export default class module {

	normalizeConfig(config) {
		if (typeof config === 'function') { config = config(this) }
		if (!Array.isArray(config))       { config = [config]     }
		return config;
	}



	RESOURCE(config) {
		for (let conf of this.normalizeConfig(config)) {
			conf.isResource = true;
			conf = [
				normalizeConfig,
				jsonSchemaConfig
			].reduce((c, t) => t(c), conf);
			this.constructor[conf.id] = this[conf.id] = conf;
		}
		return this;
	}

	RELATIONSHIP(config) {
		for (let conf of this.normalizeConfig(config)) {
			conf.isRelationship = true;
			conf = [
				normalizeConfig,
				jsonSchemaConfig,
				relationshipSidesConfig
			].reduce((c, t) => t(c), conf);
			this.constructor[conf.id] = this[conf.id] = conf;
		}
		return this;
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
//     1: [ ResourceType1, [c1min, c1max], { ...options1to2 },
//     2: [ ResourceType2, [c2min, c2max], { ...options2to1 },
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
// - options1to2.implicit:     (only when c2min > 0) a new ResourceType2 instance, plus this kind of relationship,
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
