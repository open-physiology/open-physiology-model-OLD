import {
	RESOURCE,
	RELATIONSHIP,
	MANY,
	idSchema,
	uriSchema,
	identifierSchema
} from './util';


////////////////////////////////////////////////////////////
export const Resource = RESOURCE('Resource', {

	abstract: true,

	properties: {
		'id':    { ...idSchema,         readonly: true },
		'href':  { ...uriSchema,        readonly: true },
		'class': { ...identifierSchema, readonly: true }
	}

});
////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////
export const Typed = RESOURCE('Typed', {

    extends:  Resource,
    abstract: true,

    properties: {
	    'name': { ...identifierSchema }
    }

});
////////////////////////////////////////////////////////////

export const r_Supertype = RELATIONSHIP('r_Supertype', {

    1: [Typed, [0, MANY], { key: 'supertypes' }],
    2: [Typed, [0, MANY], { key: 'subtypes'   }],

	noCycles: true

});


////////////////////////////////////////////////////////////
export const Group = RESOURCE('Group', {

	extends: Typed,

	singular: "group"

});
////////////////////////////////////////////////////////////


export const r_GroupElements = RELATIONSHIP('r_GroupElements', {

	1: [Group, [0, MANY], { key: 'elements', anchors: true }],
	2: [Typed, [0, MANY], {                                }],

});


////////////////////////////////////////////////////////////
export const ExternalResource = RESOURCE('ExternalResource', {

    extends: Resource,

    singular: "external resource",

    properties: {
	    uri: { ...uriSchema, required: true }
    }

});
////////////////////////////////////////////////////////////


export const r_ExternalRelationship = RELATIONSHIP('r_ExternalRelationship', {

    1: [ExternalResource, [0, MANY], { key: 1 }],
    2: [ExternalResource, [0, MANY], { key: 2 }],

	// TODO: figure out how external relationships will work, and rewrite this class

	properties: {
		name: { type: 'string' }
	}

});

export const r_ResourceExternal = RELATIONSHIP('r_ResourceExternal', {

    1: [Resource,         [0, MANY], { key: 'externals' }],
	2: [ExternalResource, [0, MANY], { key: 'locals'    }],

});
