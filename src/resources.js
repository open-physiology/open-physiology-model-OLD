import {idSchema, uriSchema, identifierSchema} from './util';
import Module, {MANY}                          from './module';


const M = new Module();
export default M;


export const Resource = M.RESOURCE({/////////////////////////////////////////////////////////////////

	name: 'Resource',

	abstract: true,

	properties: {
		'id':    { ...idSchema,         readonly: true },
		'href':  { ...uriSchema,        readonly: true },
		'class': { ...identifierSchema, readonly: true },
		'name':  { type: 'string' }
	}

});//////////////////////////////////////////////////////////////////////////


export const IsRelatedTo = M.RELATIONSHIP({

	name: 'IsRelatedTo',

	abstract: true,

	singular: "is related to",

	1: [Resource, [0, MANY]],
	2: [Resource, [0, MANY]],

	properties: {
		'id':    { ...idSchema,         readonly: true },
		'href':  { ...uriSchema,        readonly: true },
		'class': { ...identifierSchema, readonly: true }
	}

});


export const ExternalResource = M.RESOURCE({////////////////////////////////////////////////

	name: 'ExternalResource',

	extends: Resource,

	singular: "external resource",

	properties: {
		'uri':  { ...uriSchema, required: true },
		'type': { type: 'string'               } // "fma" or "cocomac", etc.
	}

});/////////////////////////////////////////////////////////////////////////


export const IsExternallyRelatedTo = M.RELATIONSHIP({

	name: 'IsExternallyRelatedTo',

	extends: IsRelatedTo,

	singular: "is externally related to",

	1: [ExternalResource, [0, MANY]],
	2: [ExternalResource, [0, MANY]],

	// TODO: figure out how external relationships will work, and perhaps modify this class

	properties: {
		'type': { type: 'string', required: true }
	}

});


export const CorrespondsTo = M.RELATIONSHIP({

	name: 'CorrespondsTo',

	extends: IsRelatedTo,

	singular: "corresponds to",

	1: [Resource,         [0, MANY], { anchors: true, key: 'externals' }],
	2: [ExternalResource, [0, MANY], {                key: 'locals'    }],

});
