import module, {MANY}  from './typed-module';

import groups from "./groups";
const {Group} = groups;


export default new module()


	.RESOURCE({///////////////////////////////////////////////////////////

		name: 'OmegaTree',

		extends: Group,

		singular: "omega tree",

	})//////////////////////////////////////////////////////////////////////////


	.RELATIONSHIP(({OmegaTree}) => ({

		name: 'HasAsRoot',

		1: [OmegaTree.Type, [1, 1   ], { key: 'root', anchors: true }],
		2: [Node.Template,  [0, MANY],                               ],

		// TODO: CONSTRAINT: tree.root is in (<Group>tree).elements

	}));
