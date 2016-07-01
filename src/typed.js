import module, {MANY} from './module';

import resources from "./resources";
const {Resource, IsRelatedTo} = resources;

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

	})//////////////////////////////////////////////////////////////////////////


	.RELATIONSHIP(({Template}) => [{

	    name: 'HasCardinalityBaseOf',

		extends: IsRelatedTo,

	    1: [Template,          [1, 1   ], { anchors: true, sustains: true , key: 'cardinalityBase'}], // TODO: reorder option fields like this everywhere, for better intuitive meaning
	    2: [ValueDistribution, [0, MANY]                                                           ],

	}])



	.RELATIONSHIP(({Template}) => [{

	    name: 'HasCardinalityMultipliedByThatOf',

		extends: IsRelatedTo,

	    1: [Template, [0, MANY], { anchors: true, key: 'cardinalityMultipliers' }],
	    2: [Template, [0, MANY],                                                 ],

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

		extends: IsRelatedTo,

		1: [Typed.Template, [1, 1   ], { anchors: true, key: 'type' }], // TODO: covariance
		2: [Typed.Type,     [0, MANY],                               ]

	}]);
