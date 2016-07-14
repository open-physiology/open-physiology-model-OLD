import {distributionSchema} from "../util";
import Module, {MANY} from '../Module';

import resources, {Resource, IsRelatedTo} from './resources';


////////////////////////////////////////////////////////////////////////////////
// Type / Template classes                                                    //
////////////////////////////////////////////////////////////////////////////////


const M = new Module([resources]);
export default M;


export const Type = M.RESOURCE({////////////////////////////////////////////////

	name: 'Type',

	extends: Resource,

	singular: "type"

});/////////////////////////////////////////////////////////////////////////////


export const IsSubtypeOf = M.RELATIONSHIP({

	name: 'IsSubtypeOf',

	extends: IsRelatedTo,
	
	singular: "is subtype of",

	1: [Type, [0, MANY], {                key: 'subtypes'   }],
	2: [Type, [0, MANY], { anchors: true, key: 'supertypes' }],

	noCycles: true

});


export const Template = M.RESOURCE({////////////////////////////////////////////

	name: 'Template',

	extends: Resource,

	singular: "template",

	properties: {
		'cardinalityBase': {
			oneOf: [
				distributionSchema,
				{ type: 'integer', minimum: 1 }
			],
			default: 1
		}
	}

});/////////////////////////////////////////////////////////////////////////////


export const HasCardinalityMultipliedByThatOf = M.RELATIONSHIP({

    name: 'HasCardinalityMultipliedByThatOf',

	extends: IsRelatedTo,
	
	singular: "has cardinality multiplied by that of",

    1: [Template, [0, MANY], { anchors: true, key: 'cardinalityMultipliers' }],
    2: [Template, [0, MANY],                                                 ],

	noCycles: true

});


export const HasType = M.RELATIONSHIP({

	name: 'HasType',

	extends: IsRelatedTo,
	
	singular: "has type",

	1: [Template, [1, 1   ], { anchors: true, key: 'type' }],
	2: [Type,     [0, MANY],                               ]

});


export const Typed = M.OBJECT({/////////////////////////////////////////////////

	name: 'Typed',

	abstract: true,

	singular: "typed resource",

	Type,
	Template,
	HasType

});/////////////////////////////////////////////////////////////////////////////
