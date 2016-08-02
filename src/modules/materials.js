import TypedModule from '../TypedModule';

import resources, {IsRelatedTo} from './resources';
import typed,     {Typed}       from './typed';


const M = new TypedModule('materials', [resources, typed]);
export default M;


export const Material = M.TYPED_RESOURCE({//////////////////////////////////////

	name: 'Material',
	
	extends: Typed,

	singular: "material"

});/////////////////////////////////////////////////////////////////////////////
export const MaterialType     = Material.Type;
export const MaterialTemplate = Material.Template;


export const ContainsMaterial = M.RELATIONSHIP({

	name: 'ContainsMaterial',

	extends: IsRelatedTo,

	singular: "contains material",

	1: [Material.Type, '0..*', { anchors: true, key: 'materials' }],
	2: [Material.Type, '0..*'                                     ],

	noCycles: true,

});

export const InheritsAllMaterialsFrom = M.RELATIONSHIP({

	name: 'InheritsAllMaterialsFrom',

	singular: "inherits all materials from",

	extends: IsRelatedTo,

	1: [Material.Type, '0..*', { anchors: true, key: 'materialProviders' }],
	2: [Material.Type, '0..*'                                             ],

	noCycles: true,

});
