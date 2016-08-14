import TypedModule from '../TypedModule';

import resources from './resources';
import typed     from './typed';
import groups    from './groups';
import lyphs     from './lyphs';


export default TypedModule.create('omegaTrees', [
	resources, typed, groups, lyphs
], (M, {
	IsRelatedTo, Template, Group, Lyph, Node, Has, PullsIntoTypeDefinition
}) => {
	
	
	const OmegaTree = M.TYPED_RESOURCE({////////////////////////////////////////
		
		name: 'OmegaTree',
		
		extends: Group,
		
		singular: "omega tree",
		
	});/////////////////////////////////////////////////////////////////////////
	
	
	const HasAsRoot = M.RELATIONSHIP({
		
		name: 'HasAsRoot',
		
		extends: PullsIntoTypeDefinition,
		
		singular: "has as root",
		
		1: [OmegaTree, '0..*', { anchors: true, key: 'root' }],
		2: [Node,      '0..*',                               ],
		
		// TODO: CONSTRAINT: all root nodes must be on a plus-border or minus-border
		
	});
	
	
	const OmegaTreePart = M.TYPED_RESOURCE({////////////////////////////////////
		
		name: 'OmegaTreePart',
		
		abstract: true,
		
		extends:    Template,
		extendedBy: [Lyph, OmegaTree],
		
		singular: "omega tree part",
		
	});/////////////////////////////////////////////////////////////////////////
	
	
	const HasTreeChildren = M.RELATIONSHIP({
		
		name: 'HasTreeChildren',
		
		extends: PullsIntoTypeDefinition,
		
		singular: "has tree-children",
		
		1: [OmegaTreePart, '0..*', { key: 'treeChildren' }],
		2: [OmegaTreePart, '0..1', { key: 'treeParent'   }],
		
		noCycles: true
		
	});
	
	
	const HasTreePart = M.RELATIONSHIP({
		
		name: 'HasTreePart',
		
		extends: PullsIntoTypeDefinition,
		
		singular: "has tree-part",
		
		1: [OmegaTree,     '0..*', { anchors: true, key: 'parts' }],
		2: [OmegaTreePart, '0..*',                                ],
		
	});

	
});

