import {qualitySchema} from '../util/schemas';
import TypedModule     from '../TypedModule';

import resources from './resources';
import typed     from './typed';
import lyphs     from './lyphs';
import processes from './processes';
import {dimensionalitySchema} from "../util/schemas";


export default TypedModule.create('measurables', [
	resources, typed, lyphs, processes
], (M, {
	Resource, IsRelatedTo, Typed,
	Lyph, Material, Border, Node,
	Process
}) => {
	
	
	const Measurable = M.TYPED_RESOURCE({/////////////////////////////////////////////////////////////////
		
		name: 'Measurable',
		
		extends: Typed,
		
		singular: "measurable",
		
		properties: {
			'quality': {
				Type: { ...qualitySchema }
			}
		}
		
	});//////////////////////////////////////////////////////////////////////////
	const MeasurableType     = Measurable.Type;
	const MeasurableTemplate = Measurable.Template;
	
	
	const MeasuresMaterial = M.RELATIONSHIP({
		
		name: 'MeasuresMaterial',
		
		extends: IsRelatedTo,
		
		singular: "measures material",
		
		1: [Measurable.Type, '0..*', { anchors: true, covariant: true, key: 'materials' }],
		2: [Material.Type,   '0..*',                                                     ],
		
		properties: {
			'dimensionality': { ...dimensionalitySchema }
		},
		
	});
	
	
	const MeasurableLocation = M.TYPED_RESOURCE({////////////////////////////
		
		name: 'MeasurableLocation',
		
		abstract: true,
		
		extends: Typed,
		
		extendedBy: [Lyph, Border, Node, Process]
		
	});/////////////////////////////////////////////////////////////////////////////
	const MeasurableLocationType     = MeasurableLocation.Type;
	const MeasurableLocationTemplate = MeasurableLocation.Template;
	
	
	const HasMeasurable = M.RELATIONSHIP({
		
		name: 'HasMeasurable',
		
		extends: IsRelatedTo,
		
		singular: "has measurable",
		
		1: [MeasurableLocation.Type, '0..*', { anchors: true, sustains: true, covariant: true, key: 'measurables' }],
		2: [Measurable.Template,     '1..1', {                                                 key: 'location'    }],
		
	});
	
	const InheritsAllMeasurablesFrom = M.RELATIONSHIP({
		
		name: 'InheritsAllMeasurablesFrom',
		
		extends: IsRelatedTo,
		
		singular: "inherits all measurables from",
		
		1: [MeasurableLocation.Type, '0..*', { anchors: true, covariant: true, key: 'measurableProviders' }],
		2: [MeasurableLocation.Type, '0..*',                                                               ],
		
		noCycles: true
		
	});
	
	
	const Causality = M.TYPED_RESOURCE({/////////////////////////////////////////////////////////////////
		
		name: 'Causality',
		
		extends: Typed,
		
		singular: "causality",
		plural:   "causalities",
		
	});//////////////////////////////////////////////////////////////////////////
	const CausalityType     = Causality.Type;
	const CausalityTemplate = Causality.Template;
	
	
	const [Causes] = M.RELATIONSHIP([{
		
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


});

