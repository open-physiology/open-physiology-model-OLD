import {qualitySchema} from './util';
import module, {MANY}  from './typed-module';

import resources, {IsRelatedTo}                  from './resources';
import typed,     {Typed}                        from './typed';
import lyphs,     {Material, Lyph, Border, Node} from "./lyphs";
import processes, {Process}                      from "./processes";


const M = new module([resources, typed, lyphs, processes]);
export default M;


export const Measurable = M.TYPED_RESOURCE({/////////////////////////////////////////////////////////////////

	name: 'Measurable',
	
	extends: Typed,

	singular: "measurable",

	properties: {
		'quality': {
			Type: { ...qualitySchema }
		}
	}

});//////////////////////////////////////////////////////////////////////////


export const MeasuresMaterial = M.RELATIONSHIP({

	name: 'MeasuresMaterial',

	extends: IsRelatedTo,
	
	singular: "measures material",

	1: [Measurable.Type, [0, MANY], { anchors: true, covariant: true, key: 'materials' }],
	2: [Material.Type,   [0, MANY],                                                     ],

	// TODO: CONSTRAINT: such a measurable must be
	//     : in a place where such a material exists

});


export const [HasMeasurable] = M.RELATIONSHIP([Lyph, Border, Node, Process].map((Class) => ({

	name: 'HasMeasurable',

	extends: IsRelatedTo,
	
	singular: "has measurable",

	1: [Class.Type,          [0, MANY], { anchors: true, covariant: true, key: 'measurables' }],
	2: [Measurable.Template, [1, 1   ],                                                       ],

})));

export const [InheritsAllMeasurablesFrom] = M.RELATIONSHIP([Lyph, Border, Node, Process].map((Class) => ({

	name: 'InheritsAllMeasurablesFrom',

	extends: IsRelatedTo,
	
	singular: "inherits all measurables from",

	1: [Class.Type, [0, MANY], { anchors: true, covariant: true, key: 'inheritsMeasurables' }],
	2: [Class.Type, [0, MANY],                                                               ],

	noCycles: true

})));


export const Causality = M.TYPED_RESOURCE({/////////////////////////////////////////////////////////////////

	name: 'Causality',
	
	extends: Typed,

	singular: "causality",
	plural:   "causalities",

});//////////////////////////////////////////////////////////////////////////


export const [Causes] = M.RELATIONSHIP([{

	name: 'Causes',

	extends: IsRelatedTo,
	
	singular: "causes",

	1: [Measurable.Template, [0, MANY], {                key: 'effects' }],
	2: [Causality.Template,  [1, 1   ], { anchors: true, key: 'cause'   }],

}, {

	name: 'Causes',

	extends: IsRelatedTo,

	1: [Causality.Template,  [1, 1   ], { anchors: true, key: 'effect' }],
	2: [Measurable.Template, [0, MANY], {                key: 'causes' }],

}]);
