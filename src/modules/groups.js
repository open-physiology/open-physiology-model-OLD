import TypedModule from '../TypedModule';

import resources, {IsRelatedTo}     from './resources';
import typed,     {Typed, Template} from './typed';


const M = new TypedModule('groups', [resources, typed]);
export default M;


export const Group = M.TYPED_RESOURCE({/////////////////////////////////////////

	name: 'Group',

	extends: Typed,

	singular: "group"

});/////////////////////////////////////////////////////////////////////////////


export const HasElement = M.RELATIONSHIP({

	name: 'HasElement',

	extends: IsRelatedTo,
	
	singular: "has element",

	1: [Group.Type, '0..*', { anchors: true, key: 'elements' }],
	2: [Template,   '0..*',                                   ],

});
