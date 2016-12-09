import Module               from '../Module';

import resources                 from './resources';
import {definePropertyByValue}   from '../util/misc';
import {typedDistributionSchema} from '../util/schemas';


export default Module.create('typed', [
	resources
], (M, {
	Resource, IsRelatedTo
}) => {
	
	
	const Type = M.RESOURCE({///////////////////////////////////////////////////
		
		name: 'Type',
		
		extends: Resource,
		
		singular: "type"
		
	});/////////////////////////////////////////////////////////////////////////
	
	
	const IsSubtypeOf = M.RELATIONSHIP({
		
		name: 'IsSubtypeOf',
		
		extends: IsRelatedTo,
		
		singular: "is subtype of",
		
		1: [Type, '0..*', {                key: 'subtypes'   }],
		2: [Type, '0..*', { anchors: true, key: 'supertypes' }],
		
		noCycles: true
		
	});
	
	
	const Template = M.RESOURCE({///////////////////////////////////////////////
		
		name: 'Template',
		
		abstract: true,
		
		extends: Resource,
		
		singular: "template",

		properties: {
			'cardinalityBase': {
				...typedDistributionSchema,
				default: 1
			},
			'species': {
				type: 'string',
				isRefinement(a, b) {
					return !a || a === b;
				}
			}
		}
		
	});/////////////////////////////////////////////////////////////////////////
	
	Template::definePropertyByValue('Type',     Type    );
	Type    ::definePropertyByValue('Template', Template);
	
	
	const HasCardinalityMultipliedByThatOf = M.RELATIONSHIP({
		
		name: 'HasCardinalityMultipliedByThatOf',
		
		extends: IsRelatedTo,
		
		singular: "has cardinality multiplied by that of",
		
		1: [Template, '0..*', { anchors: true, key: 'cardinalityMultipliers' }],
		2: [Template, '0..*',                                                 ],
		
		noCycles: true
		
	});
	
	
	const HasType = M.RELATIONSHIP({
		
		name: 'HasType',
		
		extends: IsRelatedTo,
		
		singular: "has type",
		
		1: [Template, '0..*', { anchors: true, key: 'types' }],
		2: [Type,     '0..*',                                ]
		
	});
	
	 
	const DefinesType = M.RELATIONSHIP({
		
		name: 'DefinesType',
		
		extends: HasType,
		
		singular: "defines type",
		
		1: [Template, '0..1', { anchors: true, key: 'definedType' }],
		2: [Type,     '1..1', { anchors: true, key: 'definition'  }]
		
	});
	
	
	const PullsIntoTypeDefinition = M.RELATIONSHIP({
		
		name: 'PullsIntoTypeDefinition',
		
		abstract: true,
		
		extends: IsRelatedTo,
		
		singular: "pulls into type definition",
		plural:   "pull into type definition",
		
		1: [Template, '0..*'],
		2: [Template, '0..*']
		
	});
	
	
	const Has = M.RELATIONSHIP({
		
		name: 'Has',
		
		abstract: true,
		
		extends: PullsIntoTypeDefinition,
		
		singular: "has",
		plural:   "have",
		
		1: [Template, '0..*', { anchors: true, key: 'children' }],
		2: [Template, '0..*', {                key: 'parents'  }],
		
		noCycles: true
		
	});
	
	
});
