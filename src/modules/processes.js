import TypedModule, {MANY}                               from '../TypedModule';
import {enumArraySchema, enumSchema, arrayContainsValue} from '../util';

import resources, {IsRelatedTo}          from './resources';
import typed,     {Typed}                from './typed';
import lyphs,     {Material, Lyph, Node} from './lyphs';


const M = new TypedModule([resources, typed, lyphs]);
export default M;


export const Process = M.TYPED_RESOURCE({/////////////////////////////////////////////

	name: 'Process',

	extends: Typed,

	singular: "process",
	plural:   "processes",

	properties: {
		'transportPhenomenon': {
			Template: { ...enumSchema     ('advection', 'diffusion'), required: true                      },
			Type:     { ...enumArraySchema('advection', 'diffusion'), default: ['advection', 'diffusion'] },
			typeCheck: arrayContainsValue
		},
		'species': {
			Type: { type: 'string' }
		}
	}

});/////////////////////////////////////////////////////////////////////////////


export const [FlowsTo] = M.RELATIONSHIP([{

	name: 'FlowsTo',

	extends: IsRelatedTo,

	singular: "flows to",

	1: [Node.Template,    [0, MANY], {                key: 'outgoingProcesses' }],
	2: [Process.Template, [1, 1   ], { anchors: true, key: 'source'            }],

}, {

	name: 'FlowsTo',

	extends: IsRelatedTo,

	singular: "flows to",

	1: [Process.Template, [1, 1   ], { anchors: true, key: 'target'            }],
	2: [Node.Template,    [0, MANY], {                key: 'incomingProcesses' }],

}]);


// TODO: CONSTRAINT: the two nodes from a process may not both be
//     : on the same lyph border; it's confusing, and we don't want
//     : to allow a process to run 'along a border', which would
//     : require a BorderProcess relationship, and would also
//     : mess with the LyphProcess relationship constraint below


export const ConveysProcess = M.RELATIONSHIP({

	name: 'ConveysProcess',

	extends: IsRelatedTo,

	singular: "conveys process",

	1: [Lyph.Type,        [0, MANY], { anchors: true, covariant: true, key: 'processes'     }],
	2: [Process.Template, [0, 1   ], {                                 key: 'conveyingLyph' }],

	// TODO: CONSTRAINT: source and target nodes have to be inside
	//     : the same lyph (possibly indirectly, like on its borders)

	// TODO: either remove this relationship entirely,
	//     : or implicitly create it when the nodes are present

});


export const TransportsMaterial = M.RELATIONSHIP({

	name: 'TransportsMaterial',

	extends: IsRelatedTo,

	singular: "transports material",

	1: [Process.Type,  [0, MANY], { anchors: true, covariant: true, key: 'materials' }],
	2: [Material.Type, [0, MANY],                                                     ],

});

export const InheritsAllMaterialsFrom = M.RELATIONSHIP({

	name: 'InheritsAllMaterialsFrom',

	extends: IsRelatedTo,

	singular: "inherits all materials from",

	1: [Process.Type, [0, MANY], { anchors: true, covariant: true, key: 'materialProviders' }],
	2: [Process.Type, [0, MANY],                                                             ],

});


export const HasSegment = M.RELATIONSHIP({

	name: 'HasSegment',

	extends: IsRelatedTo,

	singular: "has segment",

	1: [Process.Type,     [0, MANY], { anchors: true, covariant: true, key: 'segments' }],
	2: [Process.Template, [0, MANY],                                                    ],

	// TODO: CONSTRAINT: segments are connected in a straight line
	//     : through nodes, starting and ending with the same nodes
	//     : as this process; all of those nodes have to be children
	//     : of this process too

});

export const InheritsAllSegmentsFrom = M.RELATIONSHIP({

	name: 'InheritsAllSegmentsFrom',

	extends: IsRelatedTo,

	singular: "inherits all segments from",

	1: [Process.Type, [0, MANY], { anchors: true, covariant: true, key: 'segmentProviders' }],
	2: [Process.Type, [0, MANY],                                                            ],

});


export const [HasChannel] = M.RELATIONSHIP([Process, Node].map(Class => ({

	name: 'HasChannel',

	extends: IsRelatedTo,

	singular: "has channel",

	1: [Class.Type,     [0, MANY], { anchors: true, covariant: true, key: 'channels' }],
	2: [Class.Template, [0, MANY],                                                    ],

	// TODO: CONSTRAINT: channels must have the same start / end node
	//     : as this process, and they must have a strict subset

})));


export const [InheritsAllChannelsFrom] = M.RELATIONSHIP([Process, Node].map(Class => ({

	name: 'InheritsAllChannelsFrom',

	extends: IsRelatedTo,

	singular: "inherits all channels from",

	1: [Class.Type, [0, MANY], { anchors: true, covariant: true, key: 'channelProviders' }],
	2: [Class.Type, [0, MANY],                                                            ],

})));


// TODO: all Inheritance relationships are almost identical, so
//     : create a shorthand for them in the original relationship,
//     : so they can be auto-generated (like: 'inheritable: true')

// TODO?: there are many kinds of children/parents types of relationships;
//      : can we unify them somehow?
