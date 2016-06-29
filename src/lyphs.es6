import {minusPlusSchema} from "./util";
import module, {MANY} from './typed-module';

import resources from "./resources";
const {Resource} = resources;

import typed from './typed';
const {Typed} = typed;


export default new module()


	.RESOURCE({/////////////////////////////////////////////////////////////////

		name: 'Material',

		extends: Typed,

		singular: "material"

	})//////////////////////////////////////////////////////////////////////////


	.RELATIONSHIP(({Material}) => ({

		name: 'ContainsMaterial',

		1: [Material.Type, [0, MANY], { key: 'materials', anchors: true }],
		2: [Material.Type, [0, MANY]                                     ],

		noCycles: true,

	}))

	.RELATIONSHIP(({Material}) => ({

		name: 'InheritsAllMaterialsFrom',

		1: [Material.Type, [0, MANY], { key: 'materialProviders', anchors: true }],
		2: [Material.Type, [0, MANY]                                             ],

		noCycles: true,

	}))


	.RESOURCE(({Material}) => ({////////////////////////////////////////////////

		name: 'Lyph',

		extends: Material,

		singular: "lyph",

		properties: {
			'species': { type: 'string' }
		},

	}))/////////////////////////////////////////////////////////////////////////


	.RELATIONSHIP(({Lyph}) => ({

		name: 'HasPart',

		1: [Lyph.Type,     [0, MANY], { key: 'parts', anchors: true }],
		2: [Lyph.Template, [0, MANY], {                             }],

		noCycles: true,

	}))

	.RELATIONSHIP(({HasPart, Lyph}) => ({

		name: 'HasLayer',

		extends: HasPart,

		1: [Lyph.Type,     [0, MANY], { key: 'layers', anchors: true }],
		2: [Lyph.Template, [0, MANY]                                  ],

		noCycles: true,

	}))

	.RELATIONSHIP(({HasPart, Lyph}) => ({

		name: 'HasPatch',

		extends: HasPart,

		1: [Lyph.Type,     [0, MANY], { key: 'patches', anchors: true }],
		2: [Lyph.Template, [0, MANY]                                   ],

		properties: {
			'patchMap': { type: 'string' }
		},

		noCycles: true,

	}))


	.RELATIONSHIP(({Lyph}) => ({

		name: 'InheritsAllPatchesFrom',

		1: [Lyph.Type, [0, MANY], { key: 'patchProviders', anchors: true }],
		2: [Lyph.Type, [0, MANY]                                          ],

		noCycles: true,

	}))
	.RELATIONSHIP(({Lyph}) => ({

		name: 'InheritsAllLayersFrom',

		1: [Lyph.Type, [0, MANY], { key: 'layerProviders', anchors: true }],
		2: [Lyph.Type, [0, MANY]                                          ],

		noCycles: true,

	}))
	.RELATIONSHIP(({Lyph}) => ({

		name: 'InheritsAllPartsFrom',

		1: [Lyph.Type, [0, MANY], { key: 'partProviders', anchors: true }],
		2: [Lyph.Type, [0, MANY]                                         ],

		noCycles: true,

	}))
	.RELATIONSHIP(({InheritsAllPatchesFrom}) => ({

		name: 'InheritsAllPartsFrom',
		extends: InheritsAllPatchesFrom

	}))
	.RELATIONSHIP(({InheritsAllLayersFrom}) => ({

		name: 'InheritsAllPartsFrom',
		extends: InheritsAllLayersFrom

	}))


	.RESOURCE(({Lyph}) => ({////////////////////////////////////////////////////

		name: 'CylindricalLyph',

		extends: Lyph,

		singular: "cylindrical lyph",

		properties: {
			closedAt: {
				type       : 'array',
				items      : minusPlusSchema,
				uniqueItems: true,
				maxItems   : 2
			}
		}

	}))/////////////////////////////////////////////////////////////////////////


	.RELATIONSHIP(({HasPatch, CylindricalLyph}) => ({

		name: 'HasSegment',

		extends: HasPatch,

		1: [CylindricalLyph.Type,     [0, MANY], { key: 'segments', anchors: true }],
		2: [CylindricalLyph.Template, [0, MANY]                                    ],

		noCycles: true

	})).RELATIONSHIP(({CylindricalLyph}) => ({

		name: 'InheritsAllSegmentsFrom',

		1: [CylindricalLyph.Type, [0, MANY], { key: 'segmentProviders', anchors: true }],
		2: [CylindricalLyph.Type, [0, MANY],                                           ],

		noCycles: true,

	})).RELATIONSHIP(({InheritsAllSegmentsFrom}) => ({

		name: 'InheritsAllPartsFrom',
		extends: InheritsAllSegmentsFrom,

	}))


	.RESOURCE({/////////////////////////////////////////////////////////////////

		name: 'Border',

		extends: Typed,

		singular: "border",

		// TODO: position: { min: number, max: number };

		// TODO?: static readOnly = true; // four borders are added automatically to all lyphs
		// TODO: Add readOnly and autoCreate to the actual relationship class

	})//////////////////////////////////////////////////////////////////////////


	.RELATIONSHIP(({Border, Lyph, CylindricalLyph}) => [
		['HasInnerBorder', Lyph           , 'innerBorder'],
		['HasOuterBorder', Lyph           , 'outerBorder'],
		['HasMinusBorder', CylindricalLyph, 'minusBorder'],
		['HasPlusBorder' , CylindricalLyph, 'plusBorder' ],
	].map(([name, LyphClass, key]) => ({

		name,

		1: [LyphClass.Type,  [1, 1], { key, implicit: true, sustains: true, anchors: true }],
		2: [Border.Template, [1, 1]                                                        ],

		// TODO: make up flag that states that the border object should by default be 'expand'ed in a requested lyph object

	})))


	.RESOURCE({/////////////////////////////////////////////////////////////////

		name: 'Node',

		extends: Typed,

		singular: "node",

	})//////////////////////////////////////////////////////////////////////////


	.RELATIONSHIP(({Lyph, Node}) => ({

		name: 'HasNode',

		1: [Lyph.Type,     [0, MANY], { key: 'nodes', anchors: true }],
		2: [Node.Template, [0, MANY],                                ],

	}))


	.RELATIONSHIP(({Border, Node}) => ({

		name: 'HasNode',

		1: [Border.Type,   [0, MANY], { key: 'nodes', anchors: true }],
		2: [Node.Template, [0, MANY],                                ],

	}))


	.RESOURCE({/////////////////////////////////////////////////////////////////

		name: 'Coalescence',

		extends: Resource,

		singular: "coalescence"

		// coalescence between two or more lyph templates means
		// that at least one lyph from each participating lyph template
		// shares its outer layer with the other participating lyphs

	})//////////////////////////////////////////////////////////////////////////


	.RELATIONSHIP(({Coalescence, Lyph}) => ({

		name: 'CoalescesWith',

		1: [Lyph.Template, [2, MANY], { key: 'coalescences'         }],
		2: [Coalescence,   [0, MANY], { key: 'lyphs', anchors: true }],

		// TODO: CONSTRAINT: The outer layers of the lyphs in a coalescence
		//     : must all be type-wise compatible, e.g., there must exist a
		//     : LyphType that is a subtype of each of those outer layers.
		//     : If that common subtype is actually one of them, that's fine.
		//     : If not, a witness must have been provided in the form of
		//     : a CoalescenceInterface

	}))


	.RELATIONSHIP(({Coalescence, Lyph}) => ({

		name: 'CoalescesThroughLayer',

		1: [Coalescence, [0, MANY], { key: 'interfaceLayers', anchors: true }],
		2: [Lyph.Type,   [0, MANY],                                          ],

		// TODO: CONSTRAINT: The given interface lyph type must be a subtype of
		//     : each of the outer layers of the lyphs of the given coalescence.

	}));
