import {idSchema, uriSchema, identifierSchema} from './util';

import module, {MANY} from './module';


export default new module()

	.RESOURCE({/////////////////////////////////////////////////////////////////

		name: 'Resource',

		abstract: true,

		properties: {
			'id':    { ...idSchema,         readonly: true },
			'href':  { ...uriSchema,        readonly: true },
			'class': { ...identifierSchema, readonly: true }
		}

	})//////////////////////////////////////////////////////////////////////////


	.RESOURCE(({Resource}) => ({////////////////////////////////////////////////

		name: 'ExternalResource',

		extends: Resource,

		singular: "external resource",

		properties: {
			'uri': { ...uriSchema }
		}

	}))/////////////////////////////////////////////////////////////////////////


	.RELATIONSHIP(({ExternalResource}) => ({

		name: 'RelatedTo',

		1: [ExternalResource, [0, MANY], { key: 1 }],
		2: [ExternalResource, [0, MANY], { key: 2 }],

		// TODO: figure out how external relationships will work, and rewrite this class

		properties: {
			'type': { type: 'string' }
		}

	}))


	.RELATIONSHIP(({Resource, ExternalResource}) => ({

		name: 'CorrespondsTo',

		1: [Resource,         [0, MANY], { key: 'externals' }],
		2: [ExternalResource, [0, MANY], { key: 'locals'    }],

	}));
