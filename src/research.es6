import {RESOURCE, RELATIONSHIP, MANY} from "./util";

import {Resource}   from "./resources";
import {Measurable} from "./measurables";


////////////////////////////////////////////////////////////
export const Correlation = RESOURCE('Correlation', {

    extends: Resource,

    singular: "correlation",

    properties: {
	    comment: { type: 'string' }
    }

});
////////////////////////////////////////////////////////////


export const r_CorrelationMeasurable = RELATIONSHIP('r_CorrelationMeasurable', {

    1: [Correlation, [0, MANY], { key: 'measurables' }],
    2: [Measurable,  [0, MANY], {                    }],

});


////////////////////////////////////////////////////////////
export const ClinicalIndex = RESOURCE('ClinicalIndex', {

    extends: Resource,

    singular: "clinical index",
	plural:   "clinical indices",

	properties: {
		// title = name
	}

});
////////////////////////////////////////////////////////////


export const r_SubClinicalIndex = RELATIONSHIP('r_SubClinicalIndex', {

    1: [ClinicalIndex, [0, MANY], { key: 'children' }],
    2: [ClinicalIndex, [0, 1   ], { key: 'parent'   }],

	noCycles: true,

});


export const r_CorrelationClinicalIndex = RELATIONSHIP('r_CorrelationClinicalIndex', {

    1: [Correlation,   [0, MANY], { key: 'clinicalIndices' }],
    2: [ClinicalIndex, [0, MANY], {                        }],

});


////////////////////////////////////////////////////////////
export const Publication = RESOURCE('Publication', {

    extends: Resource,

    singular: "publication",

    properties: {
	    // title = name
    }

	// TODO?: Formalize that a publication needs a
	//      : pub.externals reference to, e.g., a pubmed?

});
////////////////////////////////////////////////////////////


export const r_CorrelationPublication = RELATIONSHIP('r_CorrelationPublication', {

    1: [Correlation, [0, 1   ], {}],
    2: [Publication, [0, MANY], {}],

});
