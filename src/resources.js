import {idSchema, uriSchema, identifierSchema} from './util';

import module, {MANY} from './module';


export default new module()


	.RESOURCE({/////////////////////////////////////////////////////////////////

		name: 'Resource',

		abstract: true,

		properties: {
			'id':    { ...idSchema,         readonly: true },
			'href':  { ...uriSchema,        readonly: true },
			'class': { ...identifierSchema, readonly: true },
			'name':  { type: 'string' }
		}

	})//////////////////////////////////////////////////////////////////////////


	.RELATIONSHIP(({Resource}) => ({

		name: 'IsRelatedTo',

		abstract: true,

		1: [Resource, [0, MANY]],
		2: [Resource, [0, MANY]],

		properties: {
			'id':    { ...idSchema,         readonly: true },
			'href':  { ...uriSchema,        readonly: true },
			'class': { ...identifierSchema, readonly: true }
		}

	}))


	.RESOURCE(({Resource}) => ({////////////////////////////////////////////////

		name: 'ExternalResource',

		extends: Resource,

		singular: "external resource",

		properties: {
			'uri':  { ...uriSchema, required: true },
			'type': { type: 'string'               } // "fma" or "cocomac", etc.
		}

	}))/////////////////////////////////////////////////////////////////////////


	.RELATIONSHIP(({ExternalResource, IsRelatedTo}) => ({

		name: 'IsExternallyRelatedTo',

		extends: IsRelatedTo,

		1: [ExternalResource, [0, MANY], { key: 1 }],
		2: [ExternalResource, [0, MANY], { key: 2 }],

		// TODO: figure out how external relationships will work, and perhaps modify this class

		properties: {
			'type': { type: 'string', required: true }
		}

	}))


	.RELATIONSHIP(({Resource, ExternalResource, IsRelatedTo}) => ({

		name: 'CorrespondsTo',

		extends: IsRelatedTo,

		1: [Resource,         [0, MANY], { anchors: true, key: 'externals' }],
		2: [ExternalResource, [0, MANY], {                key: 'locals'    }],

	}));
