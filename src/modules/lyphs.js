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

import union from 'lodash/union';
import uniqueId from 'lodash/uniqueId';

import defaults from 'lodash-bound/defaults';
import assign from 'lodash-bound/assign';
import entries from 'lodash-bound/entries';
import parseInt from 'lodash-bound/parseInt';
import max from 'lodash-bound/max';
import map from 'lodash-bound/map';


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
			'length': { // size in longitudinal dimension
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
		},
		
		behavior: {
			new(vals = {}, options = {}) {
				if (options.customLyphBehaviorDone) { return }
				
				vals = { ...vals };
				vals::defaults({
					longitudinalBorders: [],
					radialBorders:       [],
					axis:              null
				});
				if (options.createAxis) {
					const axis = Border.new();
					vals::assign({ axis });
				}
				if (vals.axis) {
					vals.longitudinalBorders = union(
						[...vals.longitudinalBorders],
						[vals.axis]
					);
				}
				if (options.createRadialBorders) {
					if (options.createRadialBorders === true) {
						options.createRadialBorders = 2;
					}
					const nr = Math.min(options.createRadialBorders , 2);
					for (let i = vals.radialBorders.length; i < nr; ++i) {
						vals.radialBorders.push(Border.new());
					}
				}
				return Lyph.new(
					vals,
					{ ...options, customLyphBehaviorDone: true }
				);
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
		
		properties: {
			'relativePosition': {
				type: 'number',
				required: true,
				default() { return [...this[1]['-->HasLayer']]::map('relativePosition').concat([0])::max() + 1 }
			}
			// TODO: CONSTRAINT - two layers of the same lyph cannot have the same relativePosition
		},
		
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
		
		properties: {
			'relativePosition': {
				type: 'number',
				required: true,
				default() { return [...this[1]['-->HasSegment']]::map('relativePosition').concat([0])::max() + 1 }
			}
			// TODO: CONSTRAINT - two segments of the same lyph cannot have the same relativePosition
		},

		noCycles: true
		
		// Note that two segments can only be formally adjacent if they share
		// a radial border (which must therefore exist; used to be enforced with the Cylindrical)

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
			//     :              if it has two longitudinal borders
			
			// TODO: CONSTRAINT - a lyph can only have a non-infinite length
			//     :              if it has two radial borders
		
		});
	
	//// //// //// //// ////
	// We're using a cylindrical coordinate system:
	// + https://en.wikipedia.org/wiki/Cylindrical_coordinate_system
	// + longitudinal dimension = 'length' dimension
	// +              borders   = inner & outer borders
	// + radial dimension       = 'thickness' dimension
	// +        borders         = minus & plus borders
	//// //// //// //// ////
	
	/* 4 borders maximum; at least two longitudinal borders; optionally one or two radial borders */
	const HasBorder             = borderRel('HasBorder',             Has,       '0..4', 'borders',             'has border', { abstract: true });
	const HasLongitudinalBorder = borderRel('HasLongitudinalBorder', HasBorder, '2..2', 'longitudinalBorders', 'has longitudinal border', {}, {auto: true, readonly: true});
	const HasRadialBorder       = borderRel('HasRadialBorder',       HasBorder, '0..2', 'radialBorders',       'has radial border');
	
	/* one of the longitudinal borders can be an axis */
	const HasAxis = borderRel('HasAxis', HasLongitudinalBorder, '0..1', 'axis', 'has axis');
	
	
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

