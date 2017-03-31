import TypedModule from '../TypedModule';

import resources from './resources';
import typed     from './typed';


export default TypedModule.create('groups', [
	resources, typed
], (M, {
	IsRelatedTo, Template, PullsIntoTypeDefinition
}) => {
	
	
	const Group = M.TYPED_RESOURCE({/////////////////////////////////////////
		
		name: 'Group',
		
		extends: Template,
		
		singular: "group",
				
		icon: require('./icons/group.png')
		
	});/////////////////////////////////////////////////////////////////////////////
	
	
	const IncludesElement = M.RELATIONSHIP({
		
		name: 'IncludesElement',
		
		extends: PullsIntoTypeDefinition,
		
		singular: "includes element",
		
		1: [Group,    '0..*', { anchors: true, key: 'elements' }],
		2: [Template, '0..*',                                   ],
		
	});



});

