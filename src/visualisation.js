import {identifierRegex, rationalNumberSchema, angleSchema} from "./util";

import module, {MANY} from './typed-module';

import resources from "./resources";
const {Resource, IsRelatedTo} = resources;

import lyphs from "./lyphs";
const {Material, Lyph, CylindricalLyph, Border, Coalescence, Node} = lyphs;

import typed from "./typed";
const {Type} = typed;

import processes from './processes';
const {Process} = processes;

import measurables from './measurables';
const {Measurable, Causality} = measurables;

export default new module()


	.RESOURCE({/////////////////////////////////////////////////////////////////

		name: 'Theme',

		extends: Resource,

		singular: "theme",

	})//////////////////////////////////////////////////////////////////////////


	.RELATIONSHIP(({Theme}) => ({

		name: 'PrescribesStyleFor',

		extends: IsRelatedTo,

		1: [Theme,    [0, MANY], { key: 'resources' }],
		2: [Resource, [0, MANY], { key: 'themes'    }],

		patternProperties: {
			[identifierRegex]: { type: 'string', minLength: 1 }
		}

	}))


	.RESOURCE({/////////////////////////////////////////////////////////////////

		name: 'Artefact',

		extends:  Resource,
		abstract: true,

		singular: "artefact",

	})//////////////////////////////////////////////////////////////////////////


	.RELATIONSHIP(({Artefact}) => ({

		name: 'PresentsModel',

		extends: IsRelatedTo,

		1: [Artefact, [1, 1   ], { anchors: true, key: 'model' }],
		2: [Type,     [0, MANY],                                ],

	}))


	.RESOURCE(({Artefact}) => ({////////////////////////////////////////////////

		name: 'Dim2Artefact',

		extends:  Artefact,
		abstract: true,

		singular: "2-dimensional artefact",

		properties: {
			'width':  { ...rationalNumberSchema, required: true },
			'height': { ...rationalNumberSchema, required: true }
		}

	})).RESOURCE(({Dim2Artefact}) => ({/////////////////////////////////////////

		name: 'Dim1Artefact',

		extends:  Dim2Artefact,
		abstract: true,

		singular: "1-dimensional artefact",

		properties: {
			'height': { value: { n: 0 } }
		}

	})).RESOURCE(({Dim1Artefact}) => ({/////////////////////////////////////////

		name: 'Dim0Artefact',

		extends:  Dim1Artefact,
		abstract: true,

		singular: "0-dimensional artefact",

		properties: {
			'width': { value: { n: 0 } }
		}

	}))/////////////////////////////////////////////////////////////////////////


	.RESOURCE(({Dim2Artefact}) => ({////////////////////////////////////////////

		name: 'Dim2Container',

		extends:  Dim2Artefact,
		abstract: true,

		singular: "2-dimensional container",

	})).RESOURCE(({Dim1Artefact}) => ({/////////////////////////////////////////

		name: 'Dim1Container',

		extends:  Dim1Artefact,
		abstract: true,

		singular: "1-dimensional container"

	})).RESOURCE(({Dim0Artefact}) => ({/////////////////////////////////////////

		name: 'Dim0Container',

		extends:  Dim0Artefact,
		abstract: true,

		singular: "0-dimensional container"

	}))/////////////////////////////////////////////////////////////////////////


	.RELATIONSHIP(({Dim2Container, Dim2Artefact}) => ({

		name: 'Contains',

		extends: IsRelatedTo,

		1: [Dim2Container, [0, MANY], { key: 'children', anchors: true }],
		2: [Dim2Artefact,  [0, 1   ], { key: 'parent'                  }],

		properties: {
			'x':        { ...rationalNumberSchema,    required: true },
			'y':        { ...rationalNumberSchema,    required: true },
			'rotation': { ...angleSchema, default: 0, required: true }
		}

		// TODO: CONSTRAINT: a relationship like this requires
		//     : a corresponding parent/child relationship on the associated models

	})).RELATIONSHIP(({Dim1Container, Dim1Artefact}) => ({

		name: 'Contains',

		extends: IsRelatedTo,

		1: [Dim1Container, [0, MANY], { anchors: true, key: 'children' }],
		2: [Dim1Artefact,  [0, 1   ], {                key: 'parent'   }],

		properties: {
			'x': { ...rationalNumberSchema, required: true }
		}

		// TODO: CONSTRAINT: a relationship like this requires
		//     : a corresponding parent/child relationship on the associated models

	}))
	.RELATIONSHIP(({Dim0Container, Dim0Artefact}) => ({

		name: 'Contains',

		extends: IsRelatedTo,

		1: [Dim0Container, [0, MANY], { anchors: true, key: 'children' }],
		2: [Dim0Artefact,  [0, 1   ], {                key: 'parent'   }],

		// TODO: CONSTRAINT: a relationship like this requires
		//     : a corresponding parent/child relationship on the associated models

	}))


	.RESOURCE(({Dim2Container}) => ({///////////////////////////////////////////

		name: 'LyphCanvas',

		extends: Dim2Container,

		singular: "lyph canvas",
		plural:   "lyph canvases"

	}))/////////////////////////////////////////////////////////////////////////


	.RELATIONSHIP(({ArtefactModel, LyphCanvas}) => [{
	
	    name: 'PresentsModel',

		extends: IsRelatedTo,
	
	    1: [LyphCanvas, [1, 1   ], { anchors: true, key: 'model' }],
	    2: [Lyph.Type,  [0, MANY],                                ],
	    
	}])


	.RESOURCE(({Dim0Artefact}) => ({////////////////////////////////////////////

		name: 'MaterialGlyph',

		extends: Dim0Artefact,

		singular: "material glyph"

	}))/////////////////////////////////////////////////////////////////////////


	.RELATIONSHIP(({ArtefactModel, MaterialGlyph}) => [{

		name: 'PresentsModel',

		extends: IsRelatedTo,

		1: [MaterialGlyph, [1, 1   ], { anchors: true, key: 'model' }],
		2: [Material.Type, [0, MANY],                                ],

	}])


	.RESOURCE(({Dim2Container}) => ({///////////////////////////////////////////

		name: 'LyphRectangle',

		extends: Dim2Container,

		singular: "lyph rectangle"

	}))/////////////////////////////////////////////////////////////////////////


	.RELATIONSHIP(({ArtefactModel, LyphRectangle}) => [{

		name: 'PresentsModel',

		extends: IsRelatedTo,

		1: [LyphRectangle, [1, 1   ], { anchors: true, key: 'model' }],
		2: [Lyph.Type,     [0, MANY],                                ],

	}])


	.RESOURCE(({LyphRectangle}) => ({

		name: 'CylindricalLyphRectangle',

		extends: LyphRectangle,

		singular: "cylindrical lyph rectangle"

	}))


	.RELATIONSHIP(({ArtefactModel, CylindricalLyphRectangle}) => [{

		name: 'PresentsModel',

		extends: IsRelatedTo,

		1: [CylindricalLyphRectangle, [1, 1   ], { anchors: true, key: 'model' }],
		2: [CylindricalLyph.Type,     [0, MANY],                                ],

	}])


	.RESOURCE(({Dim1Container}) => ({

		name: 'BorderLine',

		extends: Dim1Container,

		singular: "border line"

	}))


	.RELATIONSHIP(({ArtefactModel, BorderLine}) => [{

		name: 'PresentsModel',

		extends: IsRelatedTo,

		1: [BorderLine,  [1, 1   ], { anchors: true, key: 'model' }],
		2: [Border.Type, [0, MANY],                                ],

	}])


	.RESOURCE(({Dim2Container}) => ({

		name: 'CoalescenceRectangle',

		extends: Dim2Container,

		singular: "coalescence rectangle"

	}))


	.RELATIONSHIP(({ArtefactModel, CoalescenceRectangle}) => [{

		name: 'PresentsModel',

		extends: IsRelatedTo,

		1: [CoalescenceRectangle, [1, 1   ], { anchors: true, key: 'model' }],
		2: [Coalescence.Type,     [0, MANY],                                ],

	}])


	.RESOURCE(({Dim0Container}) => ({

		name: 'NodeGlyph',

		extends: Dim0Container,

		singular: "node glyph"

	}))


	.RELATIONSHIP(({ArtefactModel, NodeGlyph}) => [{

		name: 'PresentsModel',

		extends: IsRelatedTo,

		1: [NodeGlyph, [1, 1   ], { anchors: true, key: 'model' }],
		2: [Node.Type, [0, MANY],                                ],

	}])


	.RESOURCE(({Dim1Container}) => ({

		name: 'ProcessEdge',

		extends: Dim1Container,

		singular: "process edge"

	}))


	.RELATIONSHIP(({ArtefactModel, ProcessEdge}) => [{

		name: 'PresentsModel',

		extends: IsRelatedTo,

		1: [ProcessEdge,  [1, 1   ], { anchors: true, key: 'model' }],
		2: [Process.Type, [0, MANY],                                ],

	}])


	.RESOURCE(({Dim0Artefact}) => ({

		name: 'MeasurableGlyph',

		extends: Dim0Artefact,

		singular: "measurable glyph"

	}))


	.RELATIONSHIP(({ArtefactModel, MeasurableGlyph}) => [{

		name: 'PresentsModel',

		extends: IsRelatedTo,

		1: [MeasurableGlyph, [1, 1   ], { anchors: true, key: 'model' }],
		2: [Measurable.Type, [0, MANY],                                ],

	}])


	.RESOURCE(({Dim1Artefact}) => ({

		name: 'CausalityArrow',

		extends: Dim1Artefact,

		singular: "causality arrow"

	}))


	.RELATIONSHIP(({ArtefactModel, CausalityArrow}) => [{

		name: 'PresentsModel',

		extends: IsRelatedTo,

		1: [CausalityArrow, [1, 1   ], { anchors: true, key: 'model' }],
		2: [Causality.Type, [0, MANY],                                ],

	}]);
