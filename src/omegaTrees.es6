import {RESOURCE, RELATIONSHIP, MANY} from './util';

import {Group} from "./resources";


///////////////////////////////////////////////////////////
export const OmegaTree = RESOURCE('OmegaTree', {

	extends: Group,

	singular: "omega tree",

});
////////////////////////////////////////////////////////////


export const r_OmegaTreeRoot = RELATIONSHIP('r_OmegaTreeRoot', {

    1: [OmegaTree, [1, 1   ], { key: 'root' }],
    2: [Node,      [0, MANY], {             }],

	// TODO: constraint: tree.root is in (<Group>tree).elements

});
