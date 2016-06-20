//////////////////////////////////////////////////////////////////////
// Resource / Relationship Factories                                //
//////////////////////////////////////////////////////////////////////

// RESOURCE('ResourceName', {
//
//     extends: Superclass,
//     abstract: <true/false>
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

// RELATIONSHIP('RelationshipName', {
//     1: [ ResourceType1, { ...options1 }, [c1min, c1max], { ...options1to2 },
//     2: [ ResourceType2, { ...options2 }, [c2min, c2max], { ...options2to1 },
//     properties: {
//         ...properties
//     },
//     ...options
// })
// This means that RelationshipName is a type of c1-to-c2 relationship
// (c stands for cardinality: many-to-many, one-to-many, etc. both sides
// have a min and max) between ResourceType1 resources and ResourceType2 resources.
// So: "a ResourceType1 resource can be related to 'c1' ResourceType2 resource(s),
//      exposed through through the key 'options1to2.key' in that resource"
// and vice versa, if a key field is present, which is not mandatory.
//
// A couple of possible options:
// - options1.template:        true if this relationship involves a template rather than a type
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
// - options.symmetric:        this relationship type is bidirectional, 1->2 always implies 2->1; TODO: implement when needed
// - options.antiReflexive:    a resource may not be related to itself with this type;            TODO: implement when needed



function process(config) {
	let result = { ...config };

	// TODO: normalize 1: / 2: array notation (if config.isRelationship)
	//     : - implement left-to-right and right-to-left perspectives

	// make json-schema compatible object
	result.schema = {
		$schema:             'http://json-schema.org/draft-04/schema#',
		type:                'Object',
		properties:           { ...config.properties                 },
		patternProperties:    { ...config.patternProperties          },
		additionalProperties: ( config.additionalProperties === true )

		// TODO: have this object conform to json schema syntax
		//     : - add 'required' field?
		//     : - sanitize config.properties
		//     : - add properties '1' and '2' to it (if config.isRelationship)

		// TODO: fold superclass properties, patternProperties, etc. into this
		//     : - fold property flags into each other
	};

	return result;
}


// TODO: separate resource and relationship code again,
//     : and have them call common subroutines
//     : - have Typed resources generate a Type and Template subclass,
//     :   rather than using the main class given

// TODO: the Typed classes split into Type and Template classes
//     : - Template class has to do the cardinality thing

export const RESOURCE     = (name, config) => process({ ...config, name, isResource    : true });
export const RELATIONSHIP = (name, config) => process({ ...config, name, isRelationship: true });

//////////////////////////////////////////////////////////////////////
// Cardinalities                                                    //
//////////////////////////////////////////////////////////////////////

// just use 0, 1, 2, where appropriate
export const MANY = Infinity;

//////////////////////////////////////////////////////////////////////
// Schema Data Types                                                //
//////////////////////////////////////////////////////////////////////

export const identifierRegex = `^[a-zA-Z_][a-zA-Z0-9_]*$`;

export const qualitySchema = {
	type: 'string'
};

export const identifierSchema = {
	type:    'string',
	pattern: '^[a-zA-Z_][a-zA-Z0-9_]*$'
};

export const uriSchema = {
	type: 'string',
	format: 'uri'
};

export const idSchema = {
	type: 'integer'
};

export const minusPlusSchema = {
	type: 'string',
	enum: ['minus', 'plus']
};

export const innerOuterSchema = {
	type: 'string',
	enum: ['inner', 'outer']
};

export const lyphDirectionSchema = {
	type: minusPlusSchema.type,
	enum: [...minusPlusSchema.enum, ...innerOuterSchema.enum]
};

export const rationalNumberSchema = {
	type: 'object',
	properties: {
		'n': { type: 'integer',                         required: true }, // numerator
		'd': { type: 'integer', minimum: 1, default: 1, required: true }, // denominator
		's': { type: 'integer', enum: [-1, 1],          required: true }  // sign
	}
};

export const angleSchema = {
	type: 'number',
	minimum: 0,   exclusiveMinimum: false,
	maximum: 360, exclusiveMaximum: true
};
