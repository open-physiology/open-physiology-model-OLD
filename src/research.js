import module, {MANY} from "./module";

import resources from './resources';
const {Resource, IsRelatedTo} = resources;
import measurables from "./measurables";
const {Measurable} = measurables;


export default new module()


	.RESOURCE({/////////////////////////////////////////////////////////////////

		name: 'Correlation',

		extends: Resource,

		singular: "correlation",

		properties: {
			'comment': { type: 'string' }
		}

	})//////////////////////////////////////////////////////////////////////////


	.RELATIONSHIP(({Correlation}) => ({

		name: 'InvolvesMeasurable',

		extends: IsRelatedTo,

		1: [Correlation,         [0, MANY], { anchors: true, key: 'measurables' }],
		2: [Measurable.Template, [0, MANY],                                      ],

	}))


	.RESOURCE({/////////////////////////////////////////////////////////////////

		name: 'ClinicalIndex',

		extends: Resource,

		singular: "clinical index",
		plural:   "clinical indices"

	})//////////////////////////////////////////////////////////////////////////


	.RELATIONSHIP(({ClinicalIndex}) => ({

		name: 'EncompassesClinicalIndex',

		extends: IsRelatedTo,

		1: [ClinicalIndex, [0, MANY], { key: 'children' }],
		2: [ClinicalIndex, [0, 1   ], { key: 'parent'   }],

		noCycles: true,

	}))


	.RELATIONSHIP(({Correlation, ClinicalIndex}) => ({

		name: 'InvolvesClinicalIndex',

		extends: IsRelatedTo,

		1: [Correlation,   [0, MANY], { key: 'clinicalIndices', anchors: true }],
		2: [ClinicalIndex, [0, MANY],                                          ],

	}))


	.RESOURCE({/////////////////////////////////////////////////////////////////

		name: 'Publication',

		extends: Resource,

		singular: "publication"

		// TODO?: Formalize that a publication needs a
		//      : pub.externals reference to, e.g., a pubmed?

	})//////////////////////////////////////////////////////////////////////////


	.RELATIONSHIP(({Correlation, Publication}) => ({

		name: 'InvolvesPublication',

		extends: IsRelatedTo,

		1: [Correlation, [0, 1   ], { key: 'publication', anchors: true }],
		2: [Publication, [0, MANY],                                      ],

	}));
