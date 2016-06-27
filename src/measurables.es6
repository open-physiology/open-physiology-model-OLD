import {qualitySchema} from './util';
import module, {MANY}  from './typed-module';

import typed from './typed';
const {Typed} = typed;


import lyphs     from "./lyphs";
import processes from "./processes";
const {Material, Lyph, Border} = lyphs;
const {Process}                = processes;


export default new module()

	.RESOURCE({

		name: 'Measurable',

		extends: Typed,

		singular: "measurable",

		properties: {
			quality: { ...qualitySchema }
		}

	})

	.RELATIONSHIP(({Measurable}) => ({

		name: 'MeasuresMaterial',

		1: [Measurable.Type, [0, MANY], { key: 'materials', anchors: true }],
		2: [Material.Type,   [0, MANY],                                    ],

		// TODO: CONSTRAINT: such a measurable must be
		//     : in a place where such a material exists

	}))

	.RELATIONSHIP(({Measurable}) => [Lyph, Border, Node, Process].map((Class) => ({

		name: 'HasMeasurable',

		1: [Class.Type,          [0, MANY], { key: 'measurables', anchors: true }],
		2: [Measurable.Template, [1, 1   ],                                      ],

	})))

	.RELATIONSHIP(({Measurable}) => [Lyph, Border, Node, Process].map((Class) => ({

		name: 'InheritsAllMeasurablesFrom',

		1: [Class.Type, [0, MANY], { key: 'inheritsMeasurables', anchors: true }],
		2: [Class.Type, [0, MANY],                                              ],

		noCycles: true

	})))

	.RESOURCE({

		name: 'Causality',

		extends: Typed,

		singular: "causality",
		plural:   "causalities",

	})

	.RELATIONSHIP(({Measurable, Causality}) => ({

		name: 'Causes',

		1: [Measurable.Template, [0, MANY], { key: 'effects'              }],
		2: [Causality.Template,  [1, 1   ], { key: 'cause', anchors: true }],

	}))

	.RELATIONSHIP(({Measurable, Causality}) => ({

		name: 'Causes',

		1: [Causality.Template,  [1, 1   ], { key: 'effect', anchors: true }],
		2: [Measurable.Template, [0, MANY], { key: 'causes'                }],

	}));
