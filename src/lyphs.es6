import {RESOURCE, RELATIONSHIP, MANY, minusPlusSchema} from "./util";

import {Resource, Typed} from "./resources";


///////////////////////////////////////////////////////////
export const Material = RESOURCE('Material', {

    extends: Typed,

    singular: "material"

});
////////////////////////////////////////////////////////////


export const r_MaterialMaterial = RELATIONSHIP('r_MaterialMaterial', {

    1: [Material, [0, MANY], { key: 'materials', covariant : true }],
    2: [Material, [0, MANY]                                        ],

    noCycles: true,

});


////////////////////////////////////////////////////////////
export const Lyph = RESOURCE('Lyph', {

    extends: Material,

    singular: "lyph",

    properties: {
        'species': { type: 'string' }
    },

});
////////////////////////////////////////////////////////////


export const r_LyphLayer = RELATIONSHIP('r_LyphLayer', {

    1: [Lyph,                      [0, MANY], { key: 'layers', covariant : true  }],
    2: [Lyph, { template: true  }, [0, MANY]                                      ],

    noCycles: true,

});
export const r_LyphLayerInheritance = RELATIONSHIP('r_LyphLayerInheritance', {

	1: [Lyph, [0, MANY], {key: 'inheritsLayers' }],
	2: [Lyph, [0, MANY]                          ],

	noCycles: true,

});


export const r_LyphPatch = RELATIONSHIP('r_LyphPatch', {

    1: [Lyph,                      [0, MANY], { key: 'patches', covariant : true }],
    2: [Lyph, { template: true  }, [0, MANY]                                      ],

    noCycles: true,

});
export const r_LyphPatchInheritance = RELATIONSHIP('r_LyphPatchInheritance', {

	1: [Lyph, [0, MANY], {key: 'inheritsPatches' }],
	2: [Lyph, [0, MANY]                           ],

	noCycles: true,

});


export const r_LyphPart = RELATIONSHIP('r_LyphPart', {

    1: [Lyph,                      [0, MANY], { key: 'parts', covariant : true }],
    2: [Lyph, { template: true  }, [0, MANY]                                    ],

    noCycles: true,

});
export const r_LyphPartInheritance = RELATIONSHIP('r_LyphPartInheritance', {

    1: [Lyph, [0, MANY], {key: 'inheritsParts' }],
    2: [Lyph, [0, MANY]                         ],

    noCycles: true,

});


////////////////////////////////////////////////////////////
export const CylindricalLyph = RESOURCE('CylindricalLyph', {

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

});
////////////////////////////////////////////////////////////


export const r_CylindricalLyphSegment = RELATIONSHIP('r_CylindricalLyphSegment', {

    1: [CylindricalLyph,                      [0, MANY], { key: 'segments', covariant : true }],
    2: [CylindricalLyph, { template: true  }, [0, MANY]                                       ],

    noCycles: true

});
export const r_CylindricalLyphSegmentInheritance = RELATIONSHIP('r_CylindricalLyphSegmentInheritance', {

    1: [CylindricalLyph, [0, MANY], { key: 'inheritsSegments' }],
    2: [CylindricalLyph, [0, MANY],                            ],

    noCycles: true,

});


////////////////////////////////////////////////////////////
export const Border = RESOURCE('Border', {

    extends: Typed,

    singular: "border",

    // TODO: position: { min: number, max: number };

    // TODO?: static readOnly = true; // four borders are added automatically to all lyphs
    // TODO: Add readOnly and autoCreate to the actual relationship class
});
////////////////////////////////////////////////////////////


const borderRELATIONSHIP = (rel, LyphClass, key) => RELATIONSHIP(rel, {

    1: [LyphClass, {sustains: true, anchors: true,}, [1, 1], { key: key, covariant : true, implicit: true }],
    2: [Border,                                      [1, 1]                                                ],

    // TODO: make up flag that states that the border object should by default be 'expand'ed in a requested lyph object

});
export const r_InnerBorder = borderRELATIONSHIP('r_InnerBorder', Lyph           , 'innerBorder');
export const r_OuterBorder = borderRELATIONSHIP('r_OuterBorder', Lyph           , 'outerBorder');
export const r_MinusBorder = borderRELATIONSHIP('r_MinusBorder', CylindricalLyph, 'minusBorder');
export const r_PlusBorder  = borderRELATIONSHIP('r_PlusBorder' , CylindricalLyph, 'plusBorder' );


///////////////////////////////////////////////////////////
export const Node = RESOURCE('Node', {

	extends: Typed,

	singular: "node",

});
////////////////////////////////////////////////////////////


export const r_LyphNode = RELATIONSHIP('r_LyphNode', {

	1: [Lyph, [0, MANY], { key: 'nodes', anchors: true }],
	2: [Node, [0, MANY], {                             }],

});

export const r_BorderNode = RELATIONSHIP('r_BorderNode', {

	1: [Border,                     [0, MANY], { key: 'nodes', anchors: true }],
	2: [Node,   { template: true }, [0, MANY], {                             }],

});

export const r_NodeChannel = RELATIONSHIP('r_NodeChannel', {

	1: [Node,                     [0, MANY], { key: 'channels', anchors: true }],
	2: [Node, { template: true }, [0, MANY], {                                }],

});


////////////////////////////////////////////////////////////
export const Coalescence = RESOURCE('Coalescence', {

    extends: Resource,

    singular: "coalescence"

	// coalescence between two or more lyph templates means
	// that at least one lyph from each participating lyph template
	// shares its outer layer with the other participating lyphs

});
////////////////////////////////////////////////////////////


export const r_CoalescenceLyphs = RELATIONSHIP('r_CoalescenceLyphs', {

	1: [Coalescence, { template: true }, [0, MANY], { key: 'lyphs'        }],
	2: [Lyph,        { template: true }, [2, MANY], { key: 'coalescences' }],

	// TODO: CONSTRAINT: The outer layers of the lyphs in a coalescence
	//     : must all be type-wise compatible, e.g., there must exist a
	//     : LyphType that is a subtype of each of those outer layers.
	//     : If that common subtype is actually one of them, that's fine.
	//     : If not, a witness must have been provided in the form of
	//     : a r_CoalescenceInterface

});


export const r_CoalescenceInterface = RELATIONSHIP('r_CoalescenceInterface', {

    1: [Coalescence, { template: true }, [0, MANY], { key: 'interfaces' }],
    2: [Lyph,                            [1, MANY], {                   }],

	// TODO: CONSTRAINT: The given interface lyph type must be a subtype of
	//     : each of the outer layers of the lyphs of the given coalescence.

});
