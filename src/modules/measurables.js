import {qualitySchema} from '../util/schemas';
import TypedModule     from '../TypedModule';

import resources, {Resource, IsRelatedTo}  from './resources';
import typed,     {Typed}                  from './typed';
import lyphs,     {Material, Border, Node} from './lyphs';
import processes, {Process}                from './processes';


const M = new TypedModule('measurables', [resources, typed, lyphs, processes]);
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
export const MeasurableType     = Measurable.Type;
export const MeasurableTemplate = Measurable.Template;


export const MeasuresMaterial = M.RELATIONSHIP({

	name: 'MeasuresMaterial',

	extends: IsRelatedTo,
	
	singular: "measures material",

	1: [Measurable.Type, '0..*', { anchors: true, covariant: true, key: 'materials' }],
	2: [Material.Type,   '0..*',                                                     ],

});


export const MeasurableLocation = M.TYPED_RESOURCE({
	
	name: 'MeasurableLocation',
	
	abstract: true,
	
	extends: Typed,
	
	extendedBy: [Material, Border, Node, Process]
	
});


export const HasMeasurable = M.RELATIONSHIP({

	name: 'HasMeasurable',

	extends: IsRelatedTo,
	
	singular: "has measurable",

	1: [MeasurableLocation.Type, '0..*', { anchors: true, sustains: true, covariant: true, key: 'measurables' }],
	2: [Measurable.Template,     '1..1', {                                                 key: 'location'    }],

});

export const InheritsAllMeasurablesFrom = M.RELATIONSHIP({

	name: 'InheritsAllMeasurablesFrom',

	extends: IsRelatedTo,
	
	singular: "inherits all measurables from",

	1: [MeasurableLocation.Type, '0..*', { anchors: true, covariant: true, key: 'measurableProviders' }],
	2: [MeasurableLocation.Type, '0..*',                                                               ],

	noCycles: true

});


export const Causality = M.TYPED_RESOURCE({/////////////////////////////////////////////////////////////////

	name: 'Causality',
	
	extends: Typed,

	singular: "causality",
	plural:   "causalities",

});//////////////////////////////////////////////////////////////////////////
export const CausalityType     = Causality.Type;
export const CausalityTemplate = Causality.Template;


export const [Causes] = M.RELATIONSHIP([{

	name: 'Causes',

	extends: IsRelatedTo,
	
	singular: "causes",

	1: [Measurable.Template, '0..*', {                key: 'effects' }],
	2: [Causality.Template,  '1..1', { anchors: true, key: 'cause'   }],

}, {

	name: 'Causes',

	extends: IsRelatedTo,

	1: [Causality.Template,  '1..1', { anchors: true, key: 'effect' }],
	2: [Measurable.Template, '0..*', {                key: 'causes' }],

}]);
