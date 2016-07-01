import module, {MANY}  from './typed-module';
import {enumArraySchema, enumSchema, arrayContainsValue} from "./util";

import resources from './resources';
const {IsRelatedTo} = resources;

import typed from "./typed";
const {Typed} = typed;

import lyphs from "./lyphs";
const {Material, Lyph, Node} = lyphs;


export default new module()


	.RESOURCE({///////////////////////////////////////////////////////////

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
			'species': { Type: { type: 'string' } }
		}

	})//////////////////////////////////////////////////////////////////////////


	.RELATIONSHIP(({Process}) => ({

		name: 'FlowsTo',

		extends: IsRelatedTo,

		1: [Node.Template,    [0, MANY], { key: 'outgoingProcesses'     }],
		2: [Process.Template, [1, 1   ], { key: 'source', anchors: true }],

	}))
	.RELATIONSHIP(({Process}) => ({

		name: 'FlowsTo',

		extends: IsRelatedTo,

		1: [Process.Template, [1, 1   ], { key: 'target', anchors: true }],
		2: [Node.Template,    [0, MANY], { key: 'incomingProcesses'     }],

	}))


	// TODO: CONSTRAINT: the two nodes from a process may not both be
	//     : on the same lyph border; it's confusing, and we don't want
	//     : to allow a process to run 'along a border', which would
	//     : require a BorderProcess relationship, and would also
	//     : mess with the LyphProcess relationship constraint below


	.RELATIONSHIP(({Process}) => ({

		name: 'ConveysProcess',

		extends: IsRelatedTo,

		1: [Lyph.Type,        [0, MANY], { key: 'processes'     }],
		2: [Process.Template, [0, 1   ], { key: 'conveyingLyph' }],

		// TODO: CONSTRAINT: source and target nodes have to be inside
		//     : the same lyph (possibly indirectly, like on its borders)

		// TODO: either remove this relationship entirely,
		//     : or implicitly create it when the nodes are present

	}))


	.RELATIONSHIP(({Process}) => ({

		name: 'TransportsMaterial',

		extends: IsRelatedTo,

		1: [Process.Type,  [0, MANY], { key: 'materials', anchors: true }],
		2: [Material.Type, [0, MANY],                                    ],

	}))


	.RELATIONSHIP(({Process}) => ({

		name: 'InheritsAllMaterialsFrom',

		extends: IsRelatedTo,

		1: [Process.Type, [0, MANY], { key: 'materialProviders', anchors: true }],
		2: [Process.Type, [0, MANY],                                            ],

	}))


	.RELATIONSHIP(({Process}) => ({

		name: 'HasSegment',

		extends: IsRelatedTo,

		1: [Process.Type,     [0, MANY], { key: 'segments' }],
		2: [Process.Template, [0, MANY],                    ],

		// TODO: CONSTRAINT: segments are connected in a straight line
		//     : through nodes, starting and ending with the same nodes
		//     : as this process; all of those nodes have to be children
		//     : of this process too

	}))
	.RELATIONSHIP(({Process}) => ({

		name: 'InheritsAllSegmentsFrom',

		extends: IsRelatedTo,

		1: [Process.Type, [0, MANY], { key: 'segmentProviders' }],
		2: [Process.Type, [0, MANY],                            ],

	}))


	.RELATIONSHIP(({Process}) => ({

		name: 'HasChannel',

		extends: IsRelatedTo,

		1: [Process.Type,     [0, MANY], { key: 'channels', anchors: true }],
		2: [Process.Template, [0, MANY],                                   ],

		// TODO: CONSTRAINT: channels must have the same start / end node
		//     : as this process, and they must have a strict subset

	}))
	.RELATIONSHIP(({Process}) => ({

		name: 'InheritsAllChannelsFrom',

		extends: IsRelatedTo,

		1: [Process.Type, [0, MANY], { key: 'channelProviders', anchors: true }],
		2: [Process.Type, [0, MANY],                                           ],

	}))
	.RELATIONSHIP(({Node}) => ({

		name: 'HasChannel',

		extends: IsRelatedTo,

		1: [Node.Type,     [0, MANY], { key: 'channels', anchors: true }],
		2: [Node.Template, [0, MANY],                                   ],

	}))
	.RELATIONSHIP(({Node}) => ({

		name: 'InheritsAllChannelsFrom',

		extends: IsRelatedTo,

		1: [Node.Type, [0, MANY], { key: 'channelProviders', anchors: true }],
		2: [Node.Type, [0, MANY],                                           ],

	}))


	// TODO: all Inheritance relationships are almost identical, so
	//     : create a shorthand for them in the original relationship,
	//     : so they can be auto-generated (like: 'inheritable: true')

	// TODO?: there are many kinds of children/parents types of relationships;
	//      : can we unify them somehow?

