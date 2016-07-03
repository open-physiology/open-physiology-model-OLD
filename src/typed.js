import module, {MANY} from './module';

import resources from "./resources";
const {Resource, IsRelatedTo} = resources;

import {distributionSchemaOr} from "./util";


export default new module()


	.RESOURCE({/////////////////////////////////////////////////////////////////

		name: 'Type',

		extends: Resource,

		singular: "type",

		properties: {}

	})//////////////////////////////////////////////////////////////////////////


	.RELATIONSHIP(({Type}) => ({

		name: 'IsSubtypeOf',

		extends: IsRelatedTo,

		1: [Type, [0, MANY], { key: 'subtypes'                  }],
		2: [Type, [0, MANY], { key: 'supertypes', anchors: true }],

		noCycles: true

	}))


	.RESOURCE({/////////////////////////////////////////////////////////////////

		name: 'Template',

		extends: Resource,

		singular: "template",

		properties: {
			'cardinalityBase': {
				...distributionSchemaOr({
					type:   'integer',
					minimum: 1
				})
			}
		}

	})//////////////////////////////////////////////////////////////////////////

	.RELATIONSHIP(({Template}) => [{

	    name: 'HasCardinalityMultipliedByThatOf',

		extends: IsRelatedTo,

	    1: [Template, [0, MANY], { anchors: true, key: 'cardinalityMultipliers' }],
	    2: [Template, [0, MANY],                                                 ],

		noCycles: true

	}])

	.RELATIONSHIP(({Template, Type}) => [{

		name: 'HasType',

		extends: IsRelatedTo,

		1: [Template, [1, 1   ], { anchors: true, key: 'type' }], // TODO: covariance
		2: [Type,     [0, MANY],                               ]

	}])

	.RESOURCE(({Type, Template, HasType}) => ({//////////////////////////////////////////

		name: 'Typed',

		extends:  Resource,
		abstract: true,

		singular: "typed resource",

		Type,
		Template,
		HasType

	}))/////////////////////////////////////////////////////////////////////////

;
