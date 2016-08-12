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
import {wrapInArray} from "../util/misc";
import {setEquals} from "../util/ObservableSet";


export default TypedModule.create('lyphs', [
	resources, typed
], (M, {
	Resource, IsRelatedTo, Template, PullsIntoTypeDefinition, Has
}) => {
	
	const Material = M.TYPED_RESOURCE({/////////////////////////////////////////
		
		name: 'Material',
		
		extends: Template,
		
		singular: "material"
		
	});/////////////////////////////////////////////////////////////////////////
	
	
	const ContainsMaterial = M.RELATIONSHIP({
		
		name: 'ContainsMaterial',
		
		extends: IsRelatedTo,
		
		singular: "has material",
		
		1: [Material,      '0..*', { anchors: true, key: 'materials' }],
		2: [Material.Type, '0..*'                                     ],
		
		noCycles: true
		
	});
	
	
	const Lyph = M.TYPED_RESOURCE({/////////////////////////////////////////////
		
		name: 'Lyph',
		
		extends: Material,
		
		singular: "lyph",
		
		properties: {
			'species': {
				type: 'string',
				isRefinement(a, b) {
					return !a || a === b;
				}
			},
			'thickness': {
				...oneOf(
					{ type: 'number'        },
					{ ...rangeSchema        },
					{ ...distributionSchema }
				),
				default: rangeDefault,
				isRefinement(a, b) {
					a = normalizeToRange(a);
					b = normalizeToRange(b);
					return a.min <= b.min && b.max <= a.max;
				}
			}
		}
		
	});/////////////////////////////////////////////////////////////////////////
	
	
	const HasPart = M.RELATIONSHIP({
		
		name: 'HasPart',
		
		extends: Has,
		
		singular: "has part",
		
		1: [Lyph, '0..*', { anchors: true, key: 'parts' }],
		2: [Lyph, '0..1',                                ],
		
		noCycles: true,
		
	});
	
	const HasLayer = M.RELATIONSHIP({
		
		name: 'HasLayer',
		
		extends: Has,
		
		singular: "has layer",
		
		1: [Lyph, '0..*', { anchors: true, key: 'layers' }],
		2: [Lyph, '0..1'                                  ],
		
		noCycles: true,
		
	});
	
	const HasPatch = M.RELATIONSHIP({
		
		name: 'HasPatch',
		
		extends: HasPart,
		
		singular: "has part",
		
		1: [Lyph, '0..*', { anchors: true, key: 'patches' }],
		2: [Lyph, '0..1'                                   ],
		
		properties: {
			'patchMap': { type: 'string' }
		},
		
		noCycles: true,
		
	});
	
	
	const CylindricalLyph = M.TYPED_RESOURCE({//////////////////////////////////
		
		name: 'CylindricalLyph',
		
		extends: Lyph,
		
		singular: "cylindrical lyph",
		
		properties: {
			'length': {
				...oneOf(
					{ type: 'number'        },
					{ ...rangeSchema        },
					{ ...distributionSchema }
				),
				default: rangeDefault,
				isRefinement(a, b) {
					a = normalizeToRange(a);
					b = normalizeToRange(b);
					return a.min <= b.min && b.max <= a.max;
				}
			}
		}
		
	});/////////////////////////////////////////////////////////////////////////
	
	
	M.RELATIONSHIP({
		
		// specific version between cylindrical lyphs
		
		name: 'HasLayer',
		
		extends: HasPart,
		
		singular: "has layer",
		
		1: [CylindricalLyph, '0..*', { anchors: true, key: 'layers' }],
		2: [CylindricalLyph, '0..1'                                  ],
		
		noCycles: true,
		
	});
	
	const HasSegment = M.RELATIONSHIP({
		
		name: 'HasSegment',
		
		extends: HasPatch,
		
		singular: "has segment",
		
		1: [CylindricalLyph, '0..*', { anchors: true, key: 'segments' }],
		2: [CylindricalLyph, '0..1'                                    ],
		
		noCycles: true
		
	});
	
	
	const Border = M.TYPED_RESOURCE({///////////////////////////////////////////
		
		name: 'Border',
		
		extends: Template,
		
		singular: "border",
		
		properties: {
			nature: {
				...oneOf(
					{ ...enumArraySchema('open', 'closed') },
					{ ...enumSchema     ('open', 'closed') }
				),
				default: ['open', 'closed'],
				required: true,
				isRefinement(a, b) {
					a = new Set(a ? wrapInArray(a) : []);
					b = new Set(b ? wrapInArray(b) : []);
					return !(b.has('open'  ) && !a.has('open'  )) &&
					       !(b.has('closed') && !a.has('closed'));
					
				}
			}
		}
		
	});/////////////////////////////////////////////////////////////////////////
	
	
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
		
		name: name,
		
		extends: Has,
		
		singular: singular,
		
		1: [LyphClass, '1..1', { auto: true, readonly: true, sustains: true, anchors: true, expand: true, key }],
		2: [Border,    '0..1'                                                                                                   ],
		
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
	
	
	const Coalescence = M.RESOURCE({////////////////////////////////////////////
		
		name: 'Coalescence',
		
		extends: Resource,
		
		singular: "coalescence"
		
		// coalescence between two or more lyph templates means
		// that at least one lyph from each participating lyph template
		// shares its outer layer with the other participating lyphs
		
	});/////////////////////////////////////////////////////////////////////////
	
	
	const Coalesces = M.RELATIONSHIP({
		
		name: 'Coalesces',
		
		extends: PullsIntoTypeDefinition,
		
		singular: "coalesces",
		
		1: [Coalescence, '2..*', { anchors: true, key: 'lyphs'        }],
		2: [Lyph,        '0..*', {                key: 'coalescences' }],
		
	});
	
	
	const CoalescesThrough = M.RELATIONSHIP({
		
		name: 'CoalescesThrough',
		
		extends: PullsIntoTypeDefinition,
		
		singular: "coalesces through",
		
		1: [Coalescence, '0..*', { anchors: true, key: 'interfaceLayers' }],
		2: [Lyph,        '0..*',                                          ],
		
		// TODO: CONSTRAINT: each interface layer has to be
		//     : a refinement of all outer layers of the coalescing lyphs
		
	});
	
	
	const Node = M.TYPED_RESOURCE({/////////////////////////////////////////////
		
		name: 'Node',
		
		extends: Template,
		
		singular: "node",
		
	});/////////////////////////////////////////////////////////////////////////
	
	
	const NodeLocation = M.TYPED_RESOURCE({/////////////////////////////////////
		
		name: 'NodeLocation',
		
		abstract: true,
		
		extends:    Template,
		extendedBy: [Lyph, Border],
		
		singular: "node location",
		
	});/////////////////////////////////////////////////////////////////////////
	
	
	const ContainsNode = M.RELATIONSHIP({
		
		name: 'ContainsNode',
		
		singular: "contains node",
		
		extends: PullsIntoTypeDefinition,
		
		1: [NodeLocation, '0..*'                                     ],
		2: [Node,         '0..*', { anchors: true, key: 'locations' }],
		
	});

});

