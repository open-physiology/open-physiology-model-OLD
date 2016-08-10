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

import resources from './resources';
import typed     from './typed';
import {rangeDefault} from "../util/schemas";


export default TypedModule.create('lyphs', [
	resources, typed
], (M, {
	Resource, IsRelatedTo, Typed
}) => {
	
	
	
	
	const Material = M.TYPED_RESOURCE({//////////////////////////////////////
		
		name: 'Material',
		
		extends: Typed,
		
		singular: "material"
		
	});/////////////////////////////////////////////////////////////////////////////
	const MaterialType     = Material.Type;
	const MaterialTemplate = Material.Template;
	
	
	const ContainsMaterial = M.RELATIONSHIP({
		
		name: 'ContainsMaterial',
		
		extends: IsRelatedTo,
		
		singular: "contains material",
		
		1: [Material.Type, '0..*', { anchors: true, key: 'materials' }],
		2: [Material.Type, '0..*'                                     ],
		
		noCycles: true,
		
	});
	
	const InheritsAllMaterialsFrom = M.RELATIONSHIP({
		
		name: 'InheritsAllMaterialsFrom',
		
		singular: "inherits all materials from",
		
		extends: IsRelatedTo,
		
		1: [Material.Type, '0..*', { anchors: true, key: 'materialProviders' }],
		2: [Material.Type, '0..*'                                             ],
		
		noCycles: true,
		
	});
	
	
	const Lyph = M.TYPED_RESOURCE({//////////////////////////////////////////
		
		name: 'Lyph',
		
		extends: Material,
		
		singular: "lyph",
		
		properties: {
			'species': {
				Type: { type: 'string' }
			},
			'thickness': {
				Type:     { ...oneOf({ type: 'number' }, { ...rangeSchema        }), default: rangeDefault },
				Template: { ...oneOf({ type: 'number' }, { ...distributionSchema })                        },
				typeCheck(t, v) {
					t = normalizeToRange(t);
					v = normalizeToRange(v);
					return t.min <= v.min && v.max <= t.max;
				}
			}
		}
		
	});/////////////////////////////////////////////////////////////////////////////
	const LyphType     = Lyph.Type;
	const LyphTemplate = Lyph.Template;
	
	
	const HasPart = M.RELATIONSHIP({
		
		name: 'HasPart',
		
		extends: IsRelatedTo,
		
		singular: "has part",
		
		1: [Lyph.Type,     '0..*', { anchors: true, covariant: true, key: 'parts' }],
		2: [Lyph.Template, '0..*',                                                 ],
		
		noCycles: true,
		
	});
	
	const HasLayer = M.RELATIONSHIP({
		
		name: 'HasLayer',
		
		extends: HasPart,
		
		singular: "has layer",
		
		1: [Lyph.Type,     '0..*', { anchors: true, covariant: true, key: 'layers' }],
		2: [Lyph.Template, '0..*'                                                   ],
		
		noCycles: true,
		
	});
	
	const HasPatch = M.RELATIONSHIP({
		
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
	
	
	const InheritsAllPartsFrom = M.RELATIONSHIP({
		
		name: 'InheritsAllPartsFrom',
		
		extends: IsRelatedTo,
		
		singular: "inherits all parts from",
		
		1: [Lyph.Type, '0..*', { anchors: true, covariant: true, key: 'partProviders' }],
		2: [Lyph.Type, '0..*'                                                          ],
		
		noCycles: true,
		
	});
	
	
	const InheritsAllPatchesFrom = M.RELATIONSHIP({
		
		name: 'InheritsAllPatchesFrom',
		
		extends:    IsRelatedTo,
		extendedBy: InheritsAllPartsFrom,
		
		singular: "inherits all patches from",
		
		1: [Lyph.Type, '0..*', { anchors: true, covariant: true, key: 'patchProviders' }],
		2: [Lyph.Type, '0..*'                                                           ],
		
		noCycles: true,
		
	});
	
	
	const InheritsAllLayersFrom = M.RELATIONSHIP({
		
		name: 'InheritsAllLayersFrom',
		
		extends:    IsRelatedTo,
		extendedBy: InheritsAllPartsFrom,
		
		singular: "inherits all layers from",
		
		1: [Lyph.Type, '0..*', { anchors: true, covariant: true, key: 'layerProviders' }],
		2: [Lyph.Type, '0..*'                                                           ],
		
		noCycles: true,
		
	});
	
	
	const CylindricalLyph = M.TYPED_RESOURCE({///////////////////////////////
		
		name: 'CylindricalLyph',
		
		extends: Lyph,
		
		singular: "cylindrical lyph",
		
		properties: {
			'length': {
				Type:     { ...oneOf({ type: 'number' }, { ...rangeSchema        }), default: rangeDefault },
				Template: { ...oneOf({ type: 'number' }, { ...distributionSchema })                        },
				typeCheck(t, v) {
					t = normalizeToRange(t);
					v = normalizeToRange(v);
					return t.min <= v.min && v.max <= t.max;
				}
			}
		}
		
	});/////////////////////////////////////////////////////////////////////////////
	const CylindricalLyphType     = CylindricalLyph.Type;
	const CylindricalLyphTemplate = CylindricalLyph.Template;
	
	
	M.RELATIONSHIP({
		
		name: 'HasLayer',
		
		extends: HasPart,
		
		singular: "has layer",
		
		1: [CylindricalLyph.Type,     '0..*', { anchors: true, covariant: true, key: 'layers' }],
		2: [CylindricalLyph.Template, '0..*'                                                   ],
		
		noCycles: true,
		
	});
	
	const HasSegment = M.RELATIONSHIP({
		
		name: 'HasSegment',
		
		extends: HasPatch,
		
		singular: "has segment",
		
		1: [CylindricalLyph.Type,     '0..*', { anchors: true, covariant: true, key: 'segments' }],
		2: [CylindricalLyph.Template, '0..*'                                                     ],
		
		noCycles: true
		
	});
	
	
	const InheritsAllSegmentsFrom = M.RELATIONSHIP({
		
		name: 'InheritsAllSegmentsFrom',
		
		extends:    IsRelatedTo,
		extendedBy: InheritsAllPartsFrom,
		
		singular: "inherits all segments from",
		
		1: [CylindricalLyph.Type, '0..*', { anchors: true, covariant: true, key: 'segmentProviders' }],
		2: [CylindricalLyph.Type, '0..*',                                                            ],
		
		noCycles: true,
		
	});
	
	
	const Border = M.TYPED_RESOURCE({////////////////////////////////////////
		
		name: 'Border',
		
		extends: Typed,
		
		singular: "border",
		
		properties: {
			nature: {
				Type:     { ...enumArraySchema('open', 'closed'), value: ['open', 'closed']       },
				Template: { ...enumSchema     ('open', 'closed'), default: 'open', required: true },
				typeCheck: arrayContainsValue
			}
		},
		
		singleton: true // there is only one border-type
		
	});/////////////////////////////////////////////////////////////////////////////
	const BorderType     = Border.Type;
	const BorderTemplate = Border.Template;
	
	
	const [
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
		2: [Border.Template, '0..1'                                                                                                   ],
		
		// The 'readonly' flag above implies that when a lyph is created,
		// its borders are also automatically created.
		
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
	
	
	const Coalescence = M.RESOURCE({/////////////////////////////////////////
		
		name: 'Coalescence',
		
		extends: Resource,
		
		singular: "coalescence"
		
		// coalescence between two or more lyph templates means
		// that at least one lyph from each participating lyph template
		// shares its outer layer with the other participating lyphs
		
	});/////////////////////////////////////////////////////////////////////////////
	
	
	const CoalescesWith = M.RELATIONSHIP({
		
		name: 'CoalescesWith',
		
		extends: IsRelatedTo,
		
		singular: "coalesces with",
		
		1: [Lyph.Template, '0..*', {                key: 'coalescences' }],
		2: [Coalescence,   '2..*', { anchors: true, key: 'lyphs'        }],
		
	});
	
	
	const CoalescesThroughLayer = M.RELATIONSHIP({
		
		name: 'CoalescesThroughLayer',
		
		extends: IsRelatedTo,
		
		singular: "coalesces through layer",
		
		1: [Coalescence, '0..*', { anchors: true, key: 'interfaceLayers' }],
		2: [Lyph.Type,   '0..*',                                          ],
		
	});
	
	
	const Node = M.TYPED_RESOURCE({//////////////////////////////////////////
		
		name: 'Node',
		
		extends: Typed,
		
		singular: "node",
		
	});/////////////////////////////////////////////////////////////////////////////
	const NodeType     = Node.Type;
	const NodeTemplate = Node.Template;
	
	
	const NodeLocation = M.TYPED_RESOURCE({//////////////////////////////////
		
		name: 'NodeLocation',
		
		abstract: true,
		
		extends:    Typed,
		extendedBy: [Lyph, Border],
		
		singular: "node location",
		
	});/////////////////////////////////////////////////////////////////////////////
	const NodeLocationType     = NodeLocation.Type;
	const NodeLocationTemplate = NodeLocation.Template;
	
	
	const HasNode = M.RELATIONSHIP({
		
		name: 'HasNode',
		
		singular: "has node",
		
		extends: IsRelatedTo,
		
		1: [NodeLocation.Type, '0..*', { anchors: true, covariant: true, key: 'nodes' }],
		2: [Node.Template,     '0..*',                                                 ],
		
	});

	
	
	
});

