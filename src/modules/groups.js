import TypedModule from '../TypedModule';

import resources from './resources';
import typed     from './typed';


export default TypedModule.create('groups', [
	resources, typed
], (M, {
	IsRelatedTo, Typed, Template
}) => {
	
	
	const Group = M.TYPED_RESOURCE({/////////////////////////////////////////
		
		name: 'Group',
		
		extends: Typed,
		
		singular: "group"
		
	});/////////////////////////////////////////////////////////////////////////////
	const GroupType     = Group.Type;
	const GroupTemplate = Group.Template;
	
	
	const HasElement = M.RELATIONSHIP({
		
		name: 'HasElement',
		
		extends: IsRelatedTo,
		
		singular: "has element",
		
		1: [Group.Type, '0..*', { anchors: true, key: 'elements' }],
		2: [Template,   '0..*',                                   ],
		
	});



});

