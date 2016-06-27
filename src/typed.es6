import module, {MANY} from './module';

import resources from "./resources";
const {Resource} = resources;

import distributions from './distributions';
const {ValueDistribution} = distributions;


export default new module()


	.RESOURCE({/////////////////////////////////////////////////////////////////

		name: 'Type',

		extends: Resource,

		singular: "type",

		properties: {}

	})//////////////////////////////////////////////////////////////////////////


	.RELATIONSHIP(({Type}) => ({

		name: 'Extends',

		1: [Type, [0, MANY], { key: 'subtypes'                  }],
		2: [Type, [0, MANY], { key: 'supertypes', anchors: true }],

		noCycles: true

	}))


	.RESOURCE({/////////////////////////////////////////////////////////////////

		name: 'Template',

		extends: Resource,

		singular: "template",

		// properties: {
		// 	'cardinalityBase': { type: 'integer', required: true, default: 1 }
		// }

	})//////////////////////////////////////////////////////////////////////////


	.RELATIONSHIP(({Template}) => [{

	    name: 'CardinalityBase',

	    1: [Template, [1, 1], {}],
	    2: [ValueDistribution, [0, MANY], {}],

	}])



	.RELATIONSHIP(({Template}) => [{

	    name: 'CardinalityMultipliedByThatOf',

	    1: [Template, [0, MANY], { key: 'cardinalityMultipliers' }],
	    2: [Template, [0, MANY],                                  ],

		noCycles: true

	}])


	.RESOURCE(({Type, Template}) => ({//////////////////////////////////////////

		name: 'Typed',

		extends:  Resource,
		abstract: true,

		singular: "typed resource",

		Type,
		Template

	}))/////////////////////////////////////////////////////////////////////////


	.RELATIONSHIP(({Typed}) => [{

		name: 'HasType',

		1: [Typed.Template, [1, 1   ], { key: 'type' }], // TODO: covariance
		2: [Typed.Type,     [0, MANY],                ]

	}]);
