import {distributionSchema} from "../util/schemas";
import Module               from '../Module';

import resources from './resources';


export default Module.create('typed', [
	resources
], (M, {
	Resource, IsRelatedTo
}) => {
	
	
	
	const Type = M.RESOURCE({////////////////////////////////////////////////
		
		name: 'Type',
		
		abstract: true,
		
		extends: Resource,
		
		singular: "type"
		
	});/////////////////////////////////////////////////////////////////////////////
	
	
	const IsSubtypeOf = M.RELATIONSHIP({
		
		name: 'IsSubtypeOf',
		
		abstract: true,
		
		extends: IsRelatedTo,
		
		singular: "is subtype of",
		
		1: [Type, '0..*', {                key: 'subtypes'   }],
		2: [Type, '0..*', { anchors: true, key: 'supertypes' }],
		
		noCycles: true
		
	});
	
	
	const Template = M.RESOURCE({////////////////////////////////////////////
		
		name: 'Template',
		
		abstract: true,
		
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
		
		// abstract: true, // not while the concrete versions of HasType are also called HasType
		
		extends: IsRelatedTo,
		
		singular: "has type",
		
		1: [Template, '1..1', { anchors: true, key: 'type' }],
		2: [Type,     '0..*',                               ]
		
	});
	
	
	const Typed = M.OBJECT({/////////////////////////////////////////////////
		
		name: 'Typed',
		
		isTypedResource: true,
		
		abstract: true,
		
		singular: "typed resource",
		
		Type,
		Template,
		HasType,
		IsSubtypeOf
		
	});/////////////////////////////////////////////////////////////////////////////
	
	
	
	
	
});
	
