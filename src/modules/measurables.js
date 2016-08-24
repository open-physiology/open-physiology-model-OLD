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
	Resource, IsRelatedTo, Template,
	Lyph, Material, Border, Node,
	Process, Has, PullsIntoTypeDefinition
}) => {
	
	
	const Measurable = M.TYPED_RESOURCE({///////////////////////////////////////
		
		name: 'Measurable',
		
		extends: Template,
		
		singular: "measurable",
		
		properties: {
			'quality': {
				type: 'string',
				isRefinement(a, b) {
					return !a || a === b;
				}
			}
		}
		
	});/////////////////////////////////////////////////////////////////////////
	
	  
	const MeasuresMaterial = M.RELATIONSHIP({
		
		name: 'MeasuresMaterial',
		
		extends: PullsIntoTypeDefinition,
		
		singular: "measures material",
		
		1: [Measurable,    '0..*', { anchors: true, key: 'materials' }],
		2: [Material.Type, '0..*',                                    ],
		
		properties: {
			'dimensionality': { ...dimensionalitySchema }
		},
		
	});
	
	
	const MeasurableLocation = M.TYPED_RESOURCE({///////////////////////////////
		
		name: 'MeasurableLocation',
		
		abstract: true,
		
		extends: Template,
		
		extendedBy: [Lyph, Border, Node, Process],
		
		singular: "measurable location"
		
	});/////////////////////////////////////////////////////////////////////////
	
	
	const HasMeasurable = M.RELATIONSHIP({
		
		name: 'HasMeasurable',
		
		extends: Has,
		
		singular: "has measurable",
		
		1: [MeasurableLocation, '0..*', { anchors: true, sustains: true, key: 'measurables' }],
		2: [Measurable,         '0..*', {                                key: 'location'    }],
		
		// TODO: auto-create classes for the inverse of relationships,
		//     : so that HasMeasurable_inverse can extend PullsIntoTypeDefinition
		
	});
	
	
	const Causality = M.TYPED_RESOURCE({////////////////////////////////////////
		
		name: 'Causality',
		
		extends: Template,
		
		singular: "causality",
		plural:   "causalities",
		
	});/////////////////////////////////////////////////////////////////////////
	
	
	const [Causes] = M.RELATIONSHIP([{
		
		name: 'Causes',
		
		extends: PullsIntoTypeDefinition,
		
		singular: "causes",
		
		1: [Measurable, '0..*', {                key: 'effects' }],
		2: [Causality,  '1..1', { anchors: true, key: 'cause'   }],
		
	}, {
		
		name: 'Causes',
		
		extends: PullsIntoTypeDefinition,
		
		1: [Causality,  '1..1', { anchors: true, key: 'effect' }],
		2: [Measurable, '0..*', {                key: 'causes' }],
		
	}]);


});

