import {
	RESOURCE,
	RELATIONSHIP,
	MANY,
	identifierRegex,
	rationalNumberSchema,
	angleSchema
} from "./util";

import {Resource, Typed} from "./resources";


////////////////////////////////////////////////////////////
export const Theme = RESOURCE('Theme', {

    extends: Resource,

    singular: "theme",

});
////////////////////////////////////////////////////////////


export const r_ThemeStyle = RELATIONSHIP('r_ThemeStyle', {

    1: [Theme,    [0, MANY], {}],
    2: [Resource, [0, MANY], {}],

	patternProperties: {
		[identifierRegex]: { type: 'string', minLength: 1 }
	}

});


////////////////////////////////////////////////////////////
export const Artefact = RESOURCE('Artefact', {

    extends: Resource,
    
    singular: "artefact",

});
////////////////////////////////////////////////////////////


export const r_ArtefactModel = RELATIONSHIP('r_ArtefactModel', {

    1: [Artefact,     [1, 1   ], { key: 'model', anchors: true }],
    2: [Typed, [0, MANY], {                             }],

});


////////////////////////////////////////////////////////////
export const Dim2Artefact = RESOURCE('Dim2Artefact', {

	extends: Artefact,

	singular: "2-dimensional artefact",

	properties: {
		'x':        { ...rationalNumberSchema,    required: true },
		'y':        { ...rationalNumberSchema,    required: true },
		'width':    { ...rationalNumberSchema,    required: true },
		'height':   { ...rationalNumberSchema,    required: true },
		'rotation': { ...angleSchema, default: 0, required: true }
	}

});
////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////
export const Dim2Container = RESOURCE('Dim2Container', {

    extends: Dim2Artefact,

    singular: "2-dimensional container",

    properties: {}

});
////////////////////////////////////////////////////////////


export const r_Dim2ContainerChild = RELATIONSHIP('r_Dim2ContainerChild', {

    1: [Dim2Container, [0, MANY], { key: 'children' }],
    2: [Dim2Artefact,  [0, 1   ], {                 }],

});


////////////////////////////////////////////////////////////
export const Dim1Artefact = RESOURCE('Dim1Artefact', {

    extends: Dim2Artefact,

    singular: "1-dimensional artefact",

    properties: {
	    'height': { constant: 0 }
    }

});
////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////
export const Dim1Container = RESOURCE('Dim1Container', {

    extends: Dim1Artefact,

    singular: "1-dimensional container",

    properties: {}

});
////////////////////////////////////////////////////////////


export const r_Dim1ContainerChild = RELATIONSHIP('r_Dim1ContainerChild', {

	1: [Dim1Container, [0, MANY], { key: 'children' }],
	2: [Dim1Artefact,  [0, 1   ], {                 }],

});


////////////////////////////////////////////////////////////
export const Dim0Artefact = RESOURCE('Dim0Artefact', {

	extends: Dim1Artefact,

	singular: "0-dimensional artefact",

	properties: {
		'width': { constant: 0 }
	}

});
////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////
export const Dim0Container = RESOURCE('Dim0Container', {

    extends: Dim0Artefact,

    singular: "0-dimensional container",

    properties: {}

});
////////////////////////////////////////////////////////////


export const r_Dim0ContainerChild = RELATIONSHIP('r_Dim0ContainerChild', {

	1: [Dim0Container, [0, MANY], { key: 'children' }],
	2: [Dim0Artefact,  [0, 1   ], {                 }],

});


////////////////////////////////////////////////////////////
export const LyphCanvas = RESOURCE('LyphCanvas', {
	
	extends: Dim2Container,
	
	singular: "lyph canvas",
	
	properties: {
		'x': { constant: 0 },
		'y': { constant: 0 }
	}
	
});
////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////
export const MaterialGlyph = RESOURCE('MaterialGlyph', {

    extends: Dim0Artefact,

    singular: "material glyph",

    properties: {}

});
////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////
export const LyphRectangle = RESOURCE('LyphRectangle', {
	
	extends: Dim2Container,
	
	singular: "lyph rectangle",
	
	properties: {}
	
});
////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////
export const CylindricalLyphRectangle = RESOURCE('CylindricalLyphRectangle', {

    extends: LyphRectangle,

    singular: "cylindrical lyph rectangle",

    properties: {}

});
////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////
export const BorderLine = RESOURCE('BorderLine', {

    extends: Dim1Container,

    singular: "border line",

    properties: {}

});
////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////
export const CoalescenceRectangle = RESOURCE('CoalescenceRectangle', {

    extends: Dim2Container,

    singular: "coalescence rectangle",

    properties: {}

});
////////////////////////////////////////////////////////////



////////////////////////////////////////////////////////////
export const NodeGlyph = RESOURCE('NodeGlyph', {

	extends: Dim0Container,

	singular: "node glyph",

	properties: {}

});
////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////
export const ProcessEdge = RESOURCE('ProcessEdge', {

	extends: Dim1Container,

	singular: "process edge",

	properties: {}

});
////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////
export const MeasurableGlyph = RESOURCE('MeasurableGlyph', {

    extends: Dim0Artefact,

    singular: "measurable glyph",

    properties: {}

});
////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////
export const CausalityArrow = RESOURCE('CausalityArrow', {

    extends: Dim1Artefact,

    singular: "causality arrow",

    properties: {}

});
////////////////////////////////////////////////////////////
