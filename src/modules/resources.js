import {idSchema, uriSchema, identifierSchema} from '../util/schemas';
import Module                                  from '../Module';


export default Module.create('resources', [], (M) => {
	
	
	const Resource = M.RESOURCE({/////////////////////////////////////////////////////////////////
		
		name: 'Resource',
		
		abstract: true,
		
		singular: "resource",
		
		properties: {
			'id':    { ...idSchema,         readonly: true },
			'class': { ...identifierSchema, readonly: true },
			'name':  { type: 'string' }
		}
		
	});//////////////////////////////////////////////////////////////////////////
	 
	
	const IsRelatedTo = M.RELATIONSHIP({
		
		name: 'IsRelatedTo',
		
		abstract: true,
		
		singular: "is related to",
		
		1: [Resource, '0..*'],
		2: [Resource, '0..*'],
		
		properties: {
			'id':    { ...idSchema,         readonly: true }, // TODO: id will disappear from relationships in future refactoring
			'class': { ...identifierSchema, readonly: true }
		}
		
	});
	
	
	const ExternalResource = M.RESOURCE({///////////////////////////////////////
		
		name: 'ExternalResource',
		
		extends: Resource,
		
		singular: "external resource",
		
		properties: {
			'uri':  { ...uriSchema, required: true },
			'type': { type: 'string'               } // "fma" or "cocomac", etc.
		}
		
	});/////////////////////////////////////////////////////////////////////////
	
	
	const IsExternallyRelatedTo = M.RELATIONSHIP({
		
		name: 'IsExternallyRelatedTo',
		
		extends: IsRelatedTo,
		
		singular: "is externally related to",
		
		1: [ExternalResource, '0..*'],
		2: [ExternalResource, '0..*'],
		
		properties: {
			'type': { type: 'string', required: true }
		}
		
	});
	
	
	const CorrespondsTo = M.RELATIONSHIP({
		
		name: 'CorrespondsTo',
		
		extends: IsRelatedTo,
		
		singular: "corresponds to",
		
		1: [Resource,         '0..*', { anchors: true, key: 'externals' }],
		2: [ExternalResource, '0..*', {                key: 'locals'    }],
		
	});
	
	
});
