import TypedModule from '../TypedModule';

import resources from './resources';
import typed     from './typed';
import groups    from './groups';
import lyphs     from './lyphs';


export default TypedModule.create('omegaTrees', [
	resources, typed, groups, lyphs
], (M, {
	IsRelatedTo, Typed, Group, CylindricalLyph, Node
}) => {
	
	
	const OmegaTree = M.TYPED_RESOURCE({/////////////////////////////////////
		
		name: 'OmegaTree',
		
		extends: Group,
		
		singular: "omega tree",
		
	});/////////////////////////////////////////////////////////////////////////////
	
	
	const HasAsRoot = M.RELATIONSHIP({
		
		name: 'HasAsRoot',
		
		extends: IsRelatedTo,
		
		singular: "has as root",
		
		1: [OmegaTree.Type, '0..*', { anchors: true, covariant: true, key: 'root' }],
		2: [Node.Template,  '0..*',                                                ],
		
		// TODO: CONSTRAINT: all root nodes must be on a plus-border or minus-border
		
	});
	
	
	const OmegaTreePart = M.TYPED_RESOURCE({/////////////////////
		
		name: 'OmegaTreePart',
		
		abstract: true,
		
		extends: Typed,
		extendedBy: [CylindricalLyph, OmegaTree],
		
		singular: "omega tree part",
		
	});/////////////////////////////////////////////////////////////////////////////
	
	
	const HasTreeParent = M.RELATIONSHIP({
		
		name: 'HasTreeParent',
		
		extends: IsRelatedTo,
		
		singular: "has tree-parent",
		
		1: [OmegaTreePart.Template, '0..1', { key: 'treeParent'   }],
		2: [OmegaTreePart.Template, '0..*', { key: 'treeChildren' }],
		
		noCycles: true
		
	});
	
	
	const HasTreePart = M.RELATIONSHIP({
		
		name: 'HasTreePart',
		
		extends: IsRelatedTo,
		
		singular: "has tree-part",
		
		1: [OmegaTree.Type,         '0..*', { anchors: true, key: 'parts' }],
		2: [OmegaTreePart.Template, '0..*',                                ],
		
	});



});

