import module, {MANY} from "./module";

import resources   from "./resources";
import measurables from "./measurables";
const {Resource}   = resources;
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

		1: [Correlation,         [0, MANY], { key: 'measurables', anchors: true }],
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

		1: [ClinicalIndex, [0, MANY], { key: 'children' }],
		2: [ClinicalIndex, [0, 1   ], { key: 'parent'   }],

		noCycles: true,

	}))


	.RELATIONSHIP(({Correlation, ClinicalIndex}) => ({

		name: 'InvolvesClinicalIndex',

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

		1: [Correlation, [0, 1   ], { key: 'publication', anchors: true }],
		2: [Publication, [0, MANY],                                      ],

	}));
