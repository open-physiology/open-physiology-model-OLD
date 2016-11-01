import TypedModule                   from '../TypedModule';
import {arrayContainsValue}          from '../util/misc';
import {enumArraySchema, enumSchema} from '../util/schemas';

import resources from './resources';
import typed     from './typed';
import lyphs     from './lyphs';
import {wrapInArray} from "../util/misc";

export default TypedModule.create('processes', [
	resources, typed, lyphs
], (M, {
	IsRelatedTo, Template, Material, Lyph, Node,
	Has, PullsIntoTypeDefinition
}) => {
	
	
	const Process = M.TYPED_RESOURCE({//////////////////////////////////////////
		
		name: 'Process',
		
		extends: Template,
		
		singular: "process",
		plural:   "processes",
		
		properties: {
			'transportPhenomenon': {
				...enumArraySchema('advection', 'diffusion'),
				default: ['advection', 'diffusion'],
				required: true,
				isRefinement(a, b) {
					a = new Set(a ? wrapInArray(a) : []);
					b = new Set(b ? wrapInArray(b) : []);
					return !(b.has('advection') && !a.has('advection')) &&
					       !(b.has('diffusion') && !a.has('diffusion'));
				}
			}
		}
		
	});/////////////////////////////////////////////////////////////////////////
	
	
	const [FlowsTo] = M.RELATIONSHIP([{
		
		name: 'FlowsTo',
		
		extends: PullsIntoTypeDefinition,
		
		singular: "flows to",
		
		1: [Node,    '0..*', {                key: 'outgoingProcesses' }],
		2: [Process, '0..1', { anchors: true, key: 'source'            }],
		
	}, {
		
		name: 'FlowsTo',
		
		extends: PullsIntoTypeDefinition,
		
		singular: "flows to",
		
		1: [Process, '0..1', { anchors: true, key: 'target'            }],
		2: [Node,    '0..*', {                key: 'incomingProcesses' }],
		
	}]);
	
	
	const [provisional_FlowsTo] = M.RELATIONSHIP([{
		
		name: 'provisional_FlowsTo',
		
		extends: PullsIntoTypeDefinition,
		
		singular: "flows to",
		
		1: [Lyph,    '0..*', {                key: 'outgoingProcesses' }],
		2: [Process, '0..1', { anchors: true, key: 'sourceLyph'        }],
		
	}, {
		
		name: 'provisional_FlowsTo',
		
		extends: PullsIntoTypeDefinition,
		
		singular: "flows to",
		
		1: [Process, '0..1', { anchors: true, key: 'targetLyph'        }],
		2: [Lyph,    '0..*', {                key: 'incomingProcesses' }],
		
	}]);
	
	
	const ConveysProcess = M.RELATIONSHIP({
		
		name: 'ConveysProcess',
		
		extends: Has,
		
		singular: "conveys process",
		
		1: [Lyph,    '0..*', { anchors: true, key: 'processes'     }],
		2: [Process, '0..*', {                key: 'conveyingLyph' }],
		
	});
	
	
	const TransportsMaterial = M.RELATIONSHIP({
		
		name: 'TransportsMaterial',
		
		extends: Has,
		
		singular: "transports material",
		
		1: [Process,       '0..*', { anchors: true, key: 'materials' }],
		2: [Material.Type, '0..*',                                    ],
		
	});
	
	const HasSegment = M.RELATIONSHIP({
		
		name: 'HasSegment',
		
		extends: Has,
		
		singular: "has segment",
		
		1: [Process, '0..*', { anchors: true, key: 'segments' }],
		2: [Process, '0..*',                                   ],
		
		// TODO: CONSTRAINT: segments are connected in a straight line
		//     : through nodes, starting and ending with the same nodes
		//     : as this process; all of those nodes have to be children
		//     : of this process too
		
	});
	
	
	const [HasChannel] = M.RELATIONSHIP([Process, Node].map(Class => ({
		
		name: 'HasChannel',
		
		extends: Has,
		
		singular: "has channel",
		
		1: [Class, '0..*', { anchors: true, key: 'channels' }],
		2: [Class, '0..*',                                   ],
		
		// TODO: make a class for the transitional closure
		//     : of a relationship, which can be used to
		//     : manually specify part-hood without excluding
		//     : the possibility of parts being 'inbetween'.
		
	})));
	
	
});

