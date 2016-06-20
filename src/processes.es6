import {RESOURCE, RELATIONSHIP, MANY} from './util';

import {Typed} from "./resources";
import {Material}     from "./lyphs";


////////////////////////////////////////////////////////////
export const Process = RESOURCE('Process', {

    extends: Typed,

    singular: "process",
	plural:   "processes",

    properties: {
	    'transportPhenomenon': { type: 'string', enum: ['advection', 'diffusion'], required: true },
	    'species':             { type: 'string'                                                   }
    }

	// TODO: have type class automatically contain superclass properties
	//     : for specific types of properties in the template class

});
////////////////////////////////////////////////////////////


export const r_NodeToProcess = RELATIONSHIP('r_NodeToProcess', {

	1: [Node,    { template: true }, [0, MANY], { key: 'outgoingProcesses' }],
	2: [Process, { template: true }, [1, 1   ], { key: 'source'            }],

});


export const r_ProcessToNode = RELATIONSHIP('r_ProcessToNode', {

	1: [Process, { template: true }, [1, 1   ], { key: 'target'            }],
	2: [Node,    { template: true }, [0, MANY], { key: 'incomingProcesses' }],

});


export const r_ProcessMaterial = RELATIONSHIP('r_ProcessMaterial', {

    1: [Process,  [0, MANY], { key: 'materials', covariant: true }],
    2: [Material, [0, MANY], {                                   }],

});


export const r_ProcessMaterialInheritance = RELATIONSHIP('r_ProcessMaterialInheritance', {

    1: [Process, [0, MANY], { key: 'inheritsMaterials' }],
    2: [Process, [0, MANY], {                          }],

});


export const r_ProcessSegment = RELATIONSHIP('r_ProcessSegment', {

    1: [Process, [0, MANY], { key: 'segments', covariant: true }],
    2: [Process, [0, MANY], {                                  }],

	// TODO: CONSTRAINT: segments are connected in a straight line
	//     : through nodes, starting and ending with the same nodes
	//     : as this process; all of those nodes have to be children
	//     : of this process too

});


export const r_ProcessSegmentInheritance = RELATIONSHIP('r_ProcessSegmentInheritance', {

	1: [Process, [0, MANY], { key: 'inheritsSegments' }],
	2: [Process, [0, MANY], {                         }],

});


export const r_ProcessChannel = RELATIONSHIP('r_ProcessChannel', {

    1: [Process, [0, MANY], { key: 'channels', covariant: true }],
    2: [Process, [0, MANY], {                                  }],

	// TODO: CONSTRAINT: channels must have the same start / end node
	//     : as this process, and they must have a strict subset

});


export const r_ProcessChannelInheritance = RELATIONSHIP('r_ProcessChannelInheritance', {

	1: [Process, [0, MANY], { key: 'inheritsParallels' }],
	2: [Process, [0, MANY], {                          }],

});

// TODO: all Inheritance relationships are almost identical, so
//     : create a shorthand for them in the original relationship,
//     : so they can be auto-generated (like: 'inheritable: true')

// TODO?: there are many kinds of children/parents types of relationships;
//      : can we unify them somehow?

