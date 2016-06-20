import {
	RESOURCE,
	RELATIONSHIP,
	MANY,
	qualitySchema
} from './util';

import {Typed}                  from "./resources";
import {Material, Lyph, Border} from "./lyphs";
import {Process}                from "./processes";


///////////////////////////////////////////////////////////
export const Measurable = RESOURCE('Measurable', {

	extends: Typed,

	singular: "measurable",

	properties: {
		quality: { ...qualitySchema }
	}

});
///////////////////////////////////////////////////////////


export const r_MeasurableMaterial = RELATIONSHIP('r_MeasurableMaterial', {
    1: [Measurable, [0, MANY], { key: 'materials' }],
    2: [Material,   [0, MANY], {                  }],
});


const locMsrRELATIONSHIP = (rel, cls) => RELATIONSHIP(rel, {
	1: [cls,        [0, MANY], { key: 'measurables' }],
	2: [Measurable, [1, 1   ], {                    }],
});
const inheritsLocMsrRELATIONSHIP = (rel, cls) => RELATIONSHIP(rel, {
	1: [cls, [0, MANY], { key: 'inheritsMeasurables' }],
	2: [cls, [0, MANY], {                            }],
	noCycles: true
});
export const r_LyphMeasurable               = locMsrRELATIONSHIP        ('r_LyphMeasurable',              Lyph   );
export const r_LyphMeasurableInheritance    = inheritsLocMsrRELATIONSHIP('r_LyphMeasurableInheritance',    Lyph   );
export const r_BorderMeasurable             = locMsrRELATIONSHIP        ('r_BorderMeasurable',            Border );
export const r_BorderMeasurableInheritance  = inheritsLocMsrRELATIONSHIP('r_BorderMeasurableInheritance',  Border );
export const r_NodeMeasurable               = locMsrRELATIONSHIP        ('r_NodeMeasurable',              Node   );
export const r_NodeMeasurableInheritance    = inheritsLocMsrRELATIONSHIP('r_NodeMeasurableInheritance',    Node   );
export const r_ProcessMeasurable            = locMsrRELATIONSHIP        ('r_ProcessMeasurable',           Process);
export const r_ProcessMeasurableInheritance = inheritsLocMsrRELATIONSHIP('r_ProcessMeasurableInheritance', Process);


///////////////////////////////////////////////////////////
export const Causality = RESOURCE('Causality', {

	extends: Typed,

	singular: "causality",
	plural:   "causalities",

});
///////////////////////////////////////////////////////////


export const r_CauseToCausality = RELATIONSHIP('r_CauseToCausality', {

	1: [Measurable, [0, MANY], { key: 'effects' }],
	2: [Causality,  [1, 1   ], { key: 'cause'   }],

});
export const r_CausalityToEffect = RELATIONSHIP('r_CausalityToEffect', {

	1: [Causality,  [1, 1   ], { key: 'effect' }],
	2: [Measurable, [0, MANY], { key: 'causes' }],

});
