import TypedModule                   from '../TypedModule';
import {arrayContainsValue}          from '../util/misc';
import {enumArraySchema, enumSchema} from '../util/schemas';

import resources, {IsRelatedTo} from './resources';
import typed,     {Typed}       from './typed';
import materials, {Material}    from './materials';
import lyphs,     {Lyph, Node}  from './lyphs';


const M = new TypedModule('processes', [resources, typed, materials, lyphs]);
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
export const ProcessType     = Process.Type;
export const ProcessTemplate = Process.Template;


export const [FlowsTo] = M.RELATIONSHIP([{

	name: 'FlowsTo',

	extends: IsRelatedTo,

	singular: "flows to",

	1: [Node.Template,    '0..*', {                key: 'outgoingProcesses' }],
	2: [Process.Template, '1..1', { anchors: true, key: 'source'            }],

}, {

	name: 'FlowsTo',

	extends: IsRelatedTo,

	singular: "flows to",

	1: [Process.Template, '1..1', { anchors: true, key: 'target'            }],
	2: [Node.Template,    '0..*', {                key: 'incomingProcesses' }],

}]);


export const ConveysProcess = M.RELATIONSHIP({

	name: 'ConveysProcess',

	extends: IsRelatedTo,

	singular: "conveys process",

	1: [Lyph.Type,        '0..*', { anchors: true, covariant: true, key: 'processes'     }],
	2: [Process.Template, '0..1', {                                 key: 'conveyingLyph' }],

});


export const TransportsMaterial = M.RELATIONSHIP({

	name: 'TransportsMaterial',

	extends: IsRelatedTo,

	singular: "transports material",

	1: [Process.Type,  '0..*', { anchors: true, covariant: true, key: 'materials' }],
	2: [Material.Type, '0..*',                                                     ],

});

export const InheritsAllMaterialsFrom = M.RELATIONSHIP({

	name: 'InheritsAllMaterialsFrom',

	extends: IsRelatedTo,

	singular: "inherits all materials from",

	1: [Process.Type, '0..*', { anchors: true, covariant: true, key: 'materialProviders' }],
	2: [Process.Type, '0..*',                                                             ],

});


export const HasSegment = M.RELATIONSHIP({

	name: 'HasSegment',

	extends: IsRelatedTo,

	singular: "has segment",

	1: [Process.Type,     '0..*', { anchors: true, covariant: true, key: 'segments' }],
	2: [Process.Template, '0..*',                                                    ],

	// TODO: CONSTRAINT: segments are connected in a straight line
	//     : through nodes, starting and ending with the same nodes
	//     : as this process; all of those nodes have to be children
	//     : of this process too

});

export const InheritsAllSegmentsFrom = M.RELATIONSHIP({

	name: 'InheritsAllSegmentsFrom',

	extends: IsRelatedTo,

	singular: "inherits all segments from",

	1: [Process.Type, '0..*', { anchors: true, covariant: true, key: 'segmentProviders' }],
	2: [Process.Type, '0..*',                                                            ],

});


export const [HasChannel] = M.RELATIONSHIP([Process, Node].map(Class => ({

	name: 'HasChannel',

	extends: IsRelatedTo,

	singular: "has channel",

	1: [Class.Type,     '0..*', { anchors: true, covariant: true, key: 'channels' }],
	2: [Class.Template, '0..*',                                                    ],

})));


export const [InheritsAllChannelsFrom] = M.RELATIONSHIP([Process, Node].map(Class => ({

	name: 'InheritsAllChannelsFrom',

	extends: IsRelatedTo,

	singular: "inherits all channels from",

	1: [Class.Type, '0..*', { anchors: true, covariant: true, key: 'channelProviders' }],
	2: [Class.Type, '0..*',                                                            ],

})));
