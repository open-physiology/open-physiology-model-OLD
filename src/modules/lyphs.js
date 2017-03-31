import TypedModule from '../TypedModule';
import {
	normalizeToRange
} from '../util/misc';
import {
	enumArraySchema
} from '../util/schemas';

import resources from './resources';
import typed     from './typed';
import {universalDistanceRange} from "../util/schemas";
import {wrapInArray} from "../util/misc";

import _union from 'lodash/union';

import defaults from 'lodash-bound/defaults';
import isUndefined from 'lodash-bound/isUndefined';
import assign from 'lodash-bound/assign';
import max from 'lodash-bound/max';
import map from 'lodash-bound/map';
import {typedDistributionSchema} from "../util/schemas";
import {Field} from '../fields/Field';

import {$$value} from '../fields/symbols';

export default TypedModule.create('lyphs', [
	resources, typed
], (M, {
	Resource, IsRelatedTo, Template, PullsIntoTypeDefinition, Has
}) => {
	
	const Material = M.TYPED_RESOURCE({/////////////////////////////////////////
		
		name: 'Material',
		
		extends: Template,
		
		singular: "material",
		
		icon: require('./icons/material.png')
		
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
				
		icon: require('./icons/lyph.png'),
		
		properties: {
			'thickness': { // size in radial dimension
				...typedDistributionSchema,
				default: universalDistanceRange,
				isRefinement(a, b) {
					a = normalizeToRange(a);
					b = normalizeToRange(b);
					return a.min <= b.min && b.max <= a.max;
				}
			},
			'length': { // size in longitudinal dimension
				...typedDistributionSchema,
				default: universalDistanceRange,
				isRefinement(a, b) {
					a = normalizeToRange(a);
					b = normalizeToRange(b);
					return a.min <= b.min && b.max <= a.max;
				}
			}
		},
		
		behavior: {
			new(command) {
				let {initialValues = {}, options = {}} = command;
				initialValues = { ...initialValues };
				initialValues::defaults({
					longitudinalBorders: [],
					radialBorders:       [],
					axis:              null
				});
				if (options.createAxis) {
					const axis = Border.new({}, { forcedDependencies: [command] });
					initialValues::assign({ axis });
				}
				if (initialValues.axis) {
					initialValues.longitudinalBorders = _union(
						[...initialValues.longitudinalBorders],
						[initialValues.axis]
					);
				}
				if (options.createRadialBorders) {
					if (options.createRadialBorders === true) {
						options.createRadialBorders = 2;
					}
					const nr = Math.min(options.createRadialBorders , 2);
					for (let i = initialValues.radialBorders.length; i < nr; ++i) {
						initialValues.radialBorders.push(
							Border.new({}, { forcedDependencies: [command] })
						);
					}
				}
				return new Lyph(
					initialValues,
					{ ...options, allowInvokingConstructor: true }
				);
			}
		}
		
	});/////////////////////////////////////////////////////////////////////////
	
	
	const HasPart = M.RELATIONSHIP({
		
		name: 'HasPart',
		
		extends: Has,
		
		singular: "has part",
		
		1: [Lyph, '0..*', { anchors: true, key: 'parts' }],
		2: [Lyph, '0..*',                                ],
		
		noCycles: true,
		
	});
	
	const HasLayer = M.RELATIONSHIP({
		
		name: 'HasLayer',
		
		extends: Has,
		
		singular: "has layer",
		
		1: [Lyph, '0..*', { anchors: true, key: 'layers' }],
		2: [Lyph, '0..*'                                  ],
		
		properties: {
			'relativePosition': {
				type: 'number',
				required: true,
				default() { return [...this[1]['-->HasLayer']]::map((hasLayerRel) => {
					let pos = hasLayerRel.fields.relativePosition[$$value];
					if (pos::isUndefined()) { pos = -Infinity }
					return pos;
					// TODO: Having to reference $$value here to avoid getting
					//     : a stack-overflow by using .get() (which would call this default function again)
					//     : Not a very nice solution.
					// TODO: go back to explicitly setting the default value at initialization,
					//     : but time it right, so that this[1] above is already defined
				}).concat([0])::max() + 1 }
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
		2: [Lyph, '0..*'                                   ],
		
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
		2: [Lyph, '0..*'                                    ],
		
		properties: {
			'relativePosition': {
				type: 'number',
				required: true,
				default() { return [...this[1]['-->HasSegment']]::map((hasLayerRel) => {
					let pos = hasLayerRel.fields.relativePosition[$$value];
					if (pos::isUndefined()) { pos = -Infinity }
					return pos;
					// TODO: See layer relativePosition above
				}).concat([0])::max() + 1 }
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
				
		icon: require('./icons/border.png'),
		
		properties: {
			nature: {
				...enumArraySchema('open', 'closed'),
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
	
	const borderRel = (name, Superclass, c1, c2, key, singular, flags = {}, options = {}) => M.RELATIONSHIP({
			 
			name: name,
			
			extends: Superclass,
			
			singular: singular,
		
			...flags,
			
			1: [Lyph,   c1, { ...options, sustains: true, anchors: true, expand: true, key }],
			2: [Border, c2                                                                  ],
			
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
	const HasBorder             = borderRel('HasBorder',             Has,       '0..4', '1..1', 'borders',             'has border', { abstract: true });
	const HasLongitudinalBorder = borderRel('HasLongitudinalBorder', HasBorder, '2..2', '0..1', 'longitudinalBorders', 'has longitudinal border', {}, {});
	const HasRadialBorder       = borderRel('HasRadialBorder',       HasBorder, '0..2', '0..1', 'radialBorders',       'has radial border');
	
	/* one of the longitudinal borders can be an axis */
	const HasAxis = borderRel('HasAxis', HasLongitudinalBorder, '0..1', '0..1', 'axis', 'has axis');
	
	
	const CoalescenceScenario = M.TYPED_RESOURCE({//////////////////////////////
		
		name: 'CoalescenceScenario',
		
		extends: Template,
		
		singular: "coalescence scenario",
				
		icon: require('./icons/coalescenceScenario.png')
		
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
		
		singular: "coalescence",
				
		icon: require('./icons/coalescence.png')
		
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
				
		icon: require('./icons/node.png'),
		
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
		
		1: [NodeLocation, '0..*', { anchors: true, key: 'nodes'     }],
		2: [Node,         '0..*', { anchors: true, key: 'locations' }],
		
	});

});

