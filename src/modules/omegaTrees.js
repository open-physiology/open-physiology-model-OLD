import TypedModule from '../TypedModule';

import resources, {IsRelatedTo}           from './resources';
import typed,     {Typed}                 from './typed';
import groups,    {Group}                 from './groups';
import lyphs,     {CylindricalLyph, Node} from './lyphs';


const M = new TypedModule('omegaTrees', [resources, typed, groups, lyphs]);
export default M;


export const OmegaTree = M.TYPED_RESOURCE({/////////////////////////////////////

	name: 'OmegaTree',

	extends: Group,

	singular: "omega tree",

});/////////////////////////////////////////////////////////////////////////////
export const OmegaTreeType     = OmegaTree.Type;
export const OmegaTreeTemplate = OmegaTree.Template;


export const HasAsRoot = M.RELATIONSHIP({

	name: 'HasAsRoot',

	extends: IsRelatedTo,
	
	singular: "has as root",

	1: [OmegaTree.Type, '0..*', { anchors: true, covariant: true, key: 'root' }],
	2: [Node.Template,  '0..*',                                                ],

	// TODO: CONSTRAINT: all root nodes must be on a plus-border or minus-border
	
});


export const OmegaTreePart_PROVISIONAL = M.TYPED_RESOURCE({/////////////////////
	
	name: 'OmegaTreePart',
	
	extends: Typed,
	extendedBy: [CylindricalLyph, OmegaTree],
	
	singular: "omega tree part",
	
});/////////////////////////////////////////////////////////////////////////////


export const HasTreeParent_PROVISIONAL = M.RELATIONSHIP({
	
	name: 'HasTreeParent',
	
	extends: IsRelatedTo,
	
	singular: "has tree-parent",
	
	1: [OmegaTreePart_PROVISIONAL.Template, '0..1', { key: 'treeParent'   }],
	2: [OmegaTreePart_PROVISIONAL.Template, '0..*', { key: 'treeChildren' }],
	
	noCycles: true
	
});


export const HasTreePart_PROVISIONAL = M.RELATIONSHIP({
	
	name: 'HasTreePart',
	
	extends: IsRelatedTo,
	
	singular: "has tree-part",
	
	1: [OmegaTree.Type,                     '0..*', { anchors: true, key: 'treeParts' }],
	2: [OmegaTreePart_PROVISIONAL.Template, '0..*',                                    ],
	
});
