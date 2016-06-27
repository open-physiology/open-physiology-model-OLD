import module, {MANY} from "./typed-module";

import typed from "./typed";
const {Typed, Template} = typed;


export default new module()


	.RESOURCE({/////////////////////////////////////////////////////////////////

		name: 'Group',

		extends: Typed,

		singular: "group"

	})//////////////////////////////////////////////////////////////////////////


	.RELATIONSHIP(({Group}) => ({

		name: 'HasElement',

		1: [Group.Type, [0, MANY], { key: 'elements', anchors: true }],
		2: [Template,   [0, MANY],                                   ],

	}));
