import isNumber    from 'lodash/isNumber';
import TypedModule from '../TypedModule';
import {
	arrayContainsValue,
	normalizeToRange
} from '../util/misc';
import {
	enumArraySchema,
	enumSchema,
	rangeSchema,
	oneOf,
	distributionSchema
} from '../util/schemas';

import resources, {Resource, IsRelatedTo} from './resources';
import typed,     {Typed}                 from './typed';


const M = new TypedModule('lyphs', [resources, typed]);
export default M;


export const Material = M.TYPED_RESOURCE({//////////////////////////////////////

	name: 'Material',
	
	extends: Typed,

	singular: "material"

});/////////////////////////////////////////////////////////////////////////////
export const MaterialType     = Material.Type;
export const MaterialTemplate = Material.Template;


export const ContainsMaterial = M.RELATIONSHIP({

	name: 'ContainsMaterial',

	extends: IsRelatedTo,

	singular: "contains material",

	1: [Material.Type, '0..*', { anchors: true, key: 'materials' }],
	2: [Material.Type, '0..*'                                     ],

	noCycles: true,

});

export const InheritsAllMaterialsFrom = M.RELATIONSHIP({

	name: 'InheritsAllMaterialsFrom',

	singular: "inherits all materials from",

	extends: IsRelatedTo,

	1: [Material.Type, '0..*', { anchors: true, key: 'materialProviders' }],
	2: [Material.Type, '0..*'                                             ],

	noCycles: true,

});


export const Lyph = M.TYPED_RESOURCE({//////////////////////////////////////////

	name: 'Lyph',

	extends: Material,

	singular: "lyph",

	properties: {
		'species': {
			Type: { type: 'string' }
		}
	},

});/////////////////////////////////////////////////////////////////////////////
export const LyphType     = Lyph.Type;
export const LyphTemplate = Lyph.Template;


export const HasPart = M.RELATIONSHIP({

	name: 'HasPart',

	extends: IsRelatedTo,

	singular: "has part",

	1: [Lyph.Type,     '0..*', { anchors: true, covariant: true, key: 'parts' }],
	2: [Lyph.Template, '0..*',                                                 ],

	noCycles: true,

});

export const HasLayer = M.RELATIONSHIP({

	name: 'HasLayer',

	extends: HasPart,

	singular: "has layer",

	1: [Lyph.Type,     '0..*', { anchors: true, covariant: true, key: 'layers' }],
	2: [Lyph.Template, '0..*'                                                   ],

	noCycles: true,

});

export const HasPatch = M.RELATIONSHIP({

	name: 'HasPatch',

	extends: HasPart,

	singular: "has part",

	1: [Lyph.Type,     '0..*', { anchors: true, covariant: true, key: 'patches' }],
	2: [Lyph.Template, '0..*'                                                    ],

	properties: {
		'patchMap': { type: 'string' }
	},

	noCycles: true,

});


export const InheritsAllPartsFrom = M.RELATIONSHIP({
	
	name: 'InheritsAllPartsFrom',
	
	extends: IsRelatedTo,
	
	singular: "inherits all parts from",
	
	1: [Lyph.Type, '0..*', { anchors: true, covariant: true, key: 'partProviders' }],
	2: [Lyph.Type, '0..*'                                                          ],
	
	noCycles: true,
	
});


export const InheritsAllPatchesFrom = M.RELATIONSHIP({

	name: 'InheritsAllPatchesFrom',

	extends:    IsRelatedTo,
	extendedBy: InheritsAllPartsFrom,

	singular: "inherits all patches from",

	1: [Lyph.Type, '0..*', { anchors: true, covariant: true, key: 'patchProviders' }],
	2: [Lyph.Type, '0..*'                                                           ],

	noCycles: true,

});


export const InheritsAllLayersFrom = M.RELATIONSHIP({

	name: 'InheritsAllLayersFrom',

	extends:    IsRelatedTo,
	extendedBy: InheritsAllPartsFrom,

	singular: "inherits all layers from",

	1: [Lyph.Type, '0..*', { anchors: true, covariant: true, key: 'layerProviders' }],
	2: [Lyph.Type, '0..*'                                                           ],

	noCycles: true,

});


export const CylindricalLyph = M.TYPED_RESOURCE({///////////////////////////////

	name: 'CylindricalLyph',

	extends: Lyph,

	singular: "cylindrical lyph"

});/////////////////////////////////////////////////////////////////////////////
export const CylindricalLyphType     = CylindricalLyph.Type;
export const CylindricalLyphTemplate = CylindricalLyph.Template;


M.RELATIONSHIP({
	
	name: 'HasLayer',
	
	extends: HasPart,
	
	singular: "has layer",
	
	1: [CylindricalLyph.Type,     '0..*', { anchors: true, covariant: true, key: 'layers' }],
	2: [CylindricalLyph.Template, '0..*'                                                   ],
	
	noCycles: true,
	
});

export const HasSegment = M.RELATIONSHIP({

	name: 'HasSegment',

	extends: HasPatch,

	singular: "has segment",

	1: [CylindricalLyph.Type,     '0..*', { anchors: true, covariant: true, key: 'segments' }],
	2: [CylindricalLyph.Template, '0..*'                                                     ],

	noCycles: true

});


export const InheritsAllSegmentsFrom = M.RELATIONSHIP({

	name: 'InheritsAllSegmentsFrom',

	extends:    IsRelatedTo,
	extendedBy: InheritsAllPartsFrom,

	singular: "inherits all segments from",

	1: [CylindricalLyph.Type, '0..*', { anchors: true, covariant: true, key: 'segmentProviders' }],
	2: [CylindricalLyph.Type, '0..*',                                                            ],

	noCycles: true,

});


export const Border = M.TYPED_RESOURCE({////////////////////////////////////////

	name: 'Border',
	
	extends: Typed,

	singular: "border",
	
	properties: {
		nature: {
			Template: { ...enumSchema     ('open', 'closed'), default: 'open', required: true },
			Type:     { ...enumArraySchema('open', 'closed'), default: ['open', 'closed']     },
			typeCheck: arrayContainsValue
		}
	}

});/////////////////////////////////////////////////////////////////////////////
export const BorderType     = Border.Type;
export const BorderTemplate = Border.Template;


export const [
     HasInnerBorder,
     HasOuterBorder,
     HasMinusBorder,
     HasPlusBorder
] = M.RELATIONSHIP([
	['HasInnerBorder', Lyph           , 'innerBorder', "has inner border"],
	['HasOuterBorder', Lyph           , 'outerBorder', "has outer border"],
	['HasMinusBorder', CylindricalLyph, 'minusBorder', "has minus border"],
	['HasPlusBorder' , CylindricalLyph, 'plusBorder' , "has plus border" ],
].map(([name, LyphClass, key, singular]) => ({

	name,

	extends: IsRelatedTo,

	singular,

	1: [LyphClass.Type,  '1..1', { auto: true, readonly: true, sustains: true, anchors: true, expand: true, covariant: true, key }],
	2: [Border.Template, '1..1'                                                                                                   ],

	// The 'readonly' flag above implies that when a lyph is created,
	// its borders are also automatically created.

	properties: {
		'position': {
			Type:     { ...oneOf({ type: 'number' }, { ...rangeSchema        }), required: false },
			Template: { ...oneOf({ type: 'number' }, { ...distributionSchema }), required: true  },
			typeCheck(t, v) {
				t = normalizeToRange(t);
				v = normalizeToRange(v);
				return t.min <= v.min && v.max <= t.max;
			}
		}
	}

	// Two lyphs never share the same border, formally speaking.
	// The degree to which two borders overlap can be controlled through
	// the existence of shared nodes on those borders.
	// (1) Simply a single shared node between two borders indicates that they overlap anywhere.
	// (2) If a node is on, e.g., the minus and top borders, it is in the corner, with all meaning it implies.
	// (3) In the strictest case, two nodes could be used to connect four corners and perfectly align two lyphs.
	
	// TODO: CONSTRAINT: Outer border                 always has `nature: 'closed'`.
	//     :             Inner border of position = 0 always has `nature: 'open'  `.
	//     :             Inner border of position > 0 always has `nature: 'closed'`.
	//     : Plus border and minus border can be either.

})));


export const Coalescence = M.RESOURCE({/////////////////////////////////////////

	name: 'Coalescence',
	
	extends: Resource,

	singular: "coalescence"

	// coalescence between two or more lyph templates means
	// that at least one lyph from each participating lyph template
	// shares its outer layer with the other participating lyphs

});/////////////////////////////////////////////////////////////////////////////


export const CoalescesWith = M.RELATIONSHIP({

	name: 'CoalescesWith',

	extends: IsRelatedTo,

	singular: "coalesces with",

	1: [Lyph.Template, '0..*', {                key: 'coalescences' }],
	2: [Coalescence,   '2..*', { anchors: true, key: 'lyphs'        }],

});


export const CoalescesThroughLayer = M.RELATIONSHIP({

	name: 'CoalescesThroughLayer',

	extends: IsRelatedTo,

	singular: "coalesces through layer",

	1: [Coalescence, '0..*', { anchors: true, key: 'interfaceLayers' }],
	2: [Lyph.Type,   '0..*',                                          ],

});


export const Node = M.TYPED_RESOURCE({//////////////////////////////////////////

	name: 'Node',
	
	extends: Typed,

	singular: "node",

});/////////////////////////////////////////////////////////////////////////////
export const NodeType     = Node.Type;
export const NodeTemplate = Node.Template;


export const [HasNode] = M.RELATIONSHIP([Lyph, Border].map(Class => ({

	name: 'HasNode',

	singular: "has node",

	extends: IsRelatedTo,

	1: [Class.Type,    '0..*', { anchors: true, covariant: true, key: 'nodes' }],
	2: [Node.Template, '0..*',                                                 ],

})));
