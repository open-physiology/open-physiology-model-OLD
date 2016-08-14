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
import {universalDistanceRange} from "../util/schemas";
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
			'thickness': { // size in radial dimension
				...oneOf(
					{ type: 'number'        },
					{ ...rangeSchema        },
					{ ...distributionSchema }
				),
				default: universalDistanceRange,
				isRefinement(a, b) {
					a = normalizeToRange(a);
					b = normalizeToRange(b);
					return a.min <= b.min && b.max <= a.max;
				}
			},
			'length': { // size in axial dimension
				...oneOf(
					{ type: 'number'        },
					{ ...rangeSchema        },
					{ ...distributionSchema }
				),
				default: universalDistanceRange,
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
	
	const HasSegment = M.RELATIONSHIP({

		name: 'HasSegment',

		extends: HasPatch,

		singular: "has segment",

		1: [Lyph, '0..*', { anchors: true, key: 'segments' }],
		2: [Lyph, '0..1'                                    ],

		noCycles: true
		
		// Note that two segments can only be formally adjacent if they share
		// an axial border (which must therefore exist; used to be enforced with the Cylindrical)

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
	
	const borderRel = (name, Superclass, cardinality, key, singular, flags = {}, options = {}) => M.RELATIONSHIP({
			 
			name: name,
			
			extends: Superclass,
			
			singular: singular,
		
			...flags,
			
			1: [Lyph,   cardinality, { ...options, sustains: true, anchors: true, expand: true, key }],
			2: [Border, '1..1'                                                                       ],
			
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
			
			// TODO: CONSTRAINT - a lyph can only have a non-infinite thickness
			//     :              if it has two radial borders
			
			// TODO: CONSTRAINT - a lyph can only have a non-infinite length
			//     :              if it has two axial borders
		
		});
	
	// radial = inner & outer
	// axial  = minus & plus
	const HasBorder       = borderRel('HasBorder',       Has,       '0..4', 'borders',       'has border', { abstract: true });
	const HasRadialBorder = borderRel('HasRadialBorder', HasBorder, '2..2', 'radialBorders', 'has radial border', {}, {auto: true, readonly: true});
	const HasAxialBorder  = borderRel('HasAxialBorder',  HasBorder, '0..2', 'axialBorders',  'has axial border' );
	
	const HasAxis = borderRel('HasAxis', HasRadialBorder, '0..1', 'axis', 'has axis');
	
	const CoalescenceScenario = M.TYPED_RESOURCE({//////////////////////////////
		
		name: 'CoalescenceScenario',
		
		extends: Template,
		
		singular: "coalescence scenario"
		
	});/////////////////////////////////////////////////////////////////////////
	
	
	const JoinsLyph = M.RELATIONSHIP({
		
		name: 'JoinsLyph',
		
		extends: PullsIntoTypeDefinition,
		
		singular: "joins lyph",
		
		1: [CoalescenceScenario, '2..2', { anchors: true, key: 'lyphs' }],
		2: [Lyph,                '0..*'                                 ],
		
		// cardinality max=2, because we're only working in two dimensions right now
		
		// TODO: CONSTRAINT: both joint lyphs of a given scenario need to
		//     :             use the same Lyph entity as their outer layer
		// TODO: CONSTRAINT: cardinality = 1 on both lyphs and their layers
		
	});
	
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
		
		extends: IsRelatedTo,
		
		singular: "coalesces",
		
		1: [Coalescence, '2..2', { anchors: true, key: 'lyphs'        }],
		2: [Lyph,        '0..*', {                key: 'coalescences' }],
		
		// cardinality max=2, because we're only working in two dimensions right now
				
	});
	
	
	const CoalescesLike = M.RELATIONSHIP({
		
		name: 'CoalescesLike',
		
		extends: IsRelatedTo,
		
		singular: "coalesces through",
		
		1: [Coalescence,         '0..*', { anchors: true, key: 'scenarios' }],
		2: [CoalescenceScenario, '0..*',                                    ],
		
		// TODO: CONSTRAINT: the two lyphs for every scenario each have to be
		//     :             a refinement of their respective lyphs in the coalescence
		
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

