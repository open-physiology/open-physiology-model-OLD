import TypedModule, {MANY}  from '../TypedModule';

import resources, {IsRelatedTo} from './resources';
import groups,    {Group}       from './groups';
import lyphs,     {Node}        from './lyphs';


const M = new TypedModule([resources, groups, lyphs]);
export default M;


export const OmegaTree = M.TYPED_RESOURCE({///////////////////////////////////////////////////////////

	name: 'OmegaTree',

	extends: Group,

	singular: "omega tree",

});//////////////////////////////////////////////////////////////////////////


export const HasAsRoot = M.RELATIONSHIP({

	name: 'HasAsRoot',

	extends: IsRelatedTo,
	
	singular: "has as root",

	1: [OmegaTree.Type, [1, 1   ], { anchors: true, covariant: true, key: 'root' }],
	2: [Node.Template,  [0, MANY],                                                ],

	// TODO: CONSTRAINT: tree.root is in (<Group>tree).elements

});
