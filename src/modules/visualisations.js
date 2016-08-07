import TypedModule                                          from '../TypedModule';
import {identifierRegex, rationalNumberSchema, angleSchema} from '../util/schemas';

import resources,   {Resource, IsRelatedTo}                                      from './resources';
import lyphs,       {Material, Lyph, CylindricalLyph, Border, Coalescence, Node} from './lyphs';
import typed,       {Typed}                                                      from './typed';
import processes,   {Process}                                                    from './processes';
import measurables, {Measurable, Causality}                                      from './measurables';


const M = new TypedModule('visualisations', [resources, lyphs, typed, processes, measurables]);
export default M;


export const Theme = M.RESOURCE({///////////////////////////////////////////////

	name: 'Theme',

	extends: Resource,

	singular: "theme",

});/////////////////////////////////////////////////////////////////////////////


export const PrescribesStyleFor = M.RELATIONSHIP({

	name: 'PrescribesStyleFor',

	extends: IsRelatedTo,

	singular: "prescribes style for",

	1: [Theme,    '0..*', { key: 'resources' }],
	2: [Resource, '0..*', { key: 'themes'    }],

	patternProperties: {
		[identifierRegex]: { type: 'string', minLength: 1 }
	}

});


////////////////////////////
//// Artefact Hierarchy ////
////////////////////////////

export const Artefact = M.RESOURCE({////////////////////////////////////////////

	name: 'Artefact',

	extends:  Resource,
	abstract: true,

	singular: "artefact",

});/////////////////////////////////////////////////////////////////////////////

export const Dim2Artefact = M.RESOURCE({////////////////////////////////////////

	name: 'Dim2Artefact',

	extends:  Artefact,
	abstract: true,

	singular: "2-dimensional artefact"

});/////////////////////////////////////////////////////////////////////////////

export const Dim1Artefact = M.RESOURCE({////////////////////////////////////////

	name: 'Dim1Artefact',

	extends:  Dim2Artefact,
	abstract: true,

	singular: "1-dimensional artefact"

});/////////////////////////////////////////////////////////////////////////////

export const Dim0Artefact = M.RESOURCE({////////////////////////////////////////

	name: 'Dim0Artefact',

	extends:  Dim1Artefact,
	abstract: true,

	singular: "0-dimensional artefact"

});/////////////////////////////////////////////////////////////////////////////


//////////////////////////////////////
//// Artefact Container Hierarchy ////
//////////////////////////////////////

export const ArtefactContainer = M.RESOURCE({///////////////////////////////////
	
	name: 'ArtefactContainer',
	
	extends:  Artefact,
	abstract: true,
	
	singular: "artefact container",
	
});/////////////////////////////////////////////////////////////////////////////

export const Dim2Container = M.RESOURCE({///////////////////////////////////////

	name: 'Dim2Container',

	extends:  [ArtefactContainer, Dim2Artefact],
	abstract: true,

	singular: "2-dimensional container",

});/////////////////////////////////////////////////////////////////////////////

export const Dim1Container = M.RESOURCE({///////////////////////////////////////

	name: 'Dim1Container',

	extends:  [ArtefactContainer, Dim1Artefact],
	abstract: true,

	singular: "1-dimensional container"

});/////////////////////////////////////////////////////////////////////////////

export const Dim0Container = M.RESOURCE({///////////////////////////////////////

	name: 'Dim0Container',

	extends:  [ArtefactContainer, Dim0Artefact],
	abstract: true,

	singular: "0-dimensional container"

});/////////////////////////////////////////////////////////////////////////////


/////////////////////////////////////////////////////
//// Artefact Containment Relationship Hierarchy ////
/////////////////////////////////////////////////////

export const ContainsArtefact = M.RELATIONSHIP({
	
	name: 'ContainsArtefact',
	
	abstract: true,
	
	extends: IsRelatedTo,
	
	singular: "contains artefact",
	
	1: [ArtefactContainer, '0..*', { anchors: true, key: 'children' }],
	2: [Artefact,          '0..1', {                key: 'parent'   }]
	
});

/* in 2-dimensional containers */
const ContainsArtefact_22 = M.RELATIONSHIP({
	
	name: 'ContainsArtefact_22',
	
	extends: ContainsArtefact,
	
	1: [Dim2Container, '0..*', { anchors: true, key: 'children' }],
	2: [Dim2Artefact,  '0..1', {                key: 'parent'   }],
	
	properties: {
		'x':        { ...rationalNumberSchema,    required: true },
		'y':        { ...rationalNumberSchema,    required: true },
		'rotation': { ...angleSchema, default: 0, required: true },
		'width':    { ...rationalNumberSchema,    required: true },
		'height':   { ...rationalNumberSchema,    required: true }
	}
	
});
const ContainsArtefact_21 = M.RELATIONSHIP({
	
	name: 'ContainsArtefact_21',
	
	extends: ContainsArtefact_22,
	
	1: [Dim2Container, '0..*', { anchors: true, key: 'children' }],
	2: [Dim1Artefact,  '0..1', {                key: 'parent'   }],
	
	properties: { 'height': { value: 0 } }
	
});
const ContainsArtefact_20 = M.RELATIONSHIP({
	
	name: 'ContainsArtefact_20',
	
	extends: ContainsArtefact_21,
	
	1: [Dim2Container, '0..*', { anchors: true, key: 'children' }],
	2: [Dim0Artefact,  '0..1', {                key: 'parent'   }],
	
	properties: { 'width': { value: 0 } }
	
});

/* in 1-dimensional containers */
const ContainsArtefact_11 = M.RELATIONSHIP({
	
	name: 'ContainsArtefact_11',
	
	extends: ContainsArtefact,
	
	1: [Dim1Container, '0..*', { anchors: true, key: 'children' }],
	2: [Dim1Artefact,  '0..1', {                key: 'parent'   }],
	
	properties: {
		'x':        { ...rationalNumberSchema, required: true },
		'width':    { ...rationalNumberSchema, required: true }
	}
	
});
const ContainsArtefact_10 = M.RELATIONSHIP({
	
	name: 'ContainsArtefact_10',
	
	extends: ContainsArtefact_11,
	
	1: [Dim1Container, '0..*', { anchors: true, key: 'children' }],
	2: [Dim0Artefact,  '0..1', {                key: 'parent'   }],
	
	properties: { 'width': { value: 0 } }
	
});

/* containment in 0-dimensional containers */
const ContainsArtefact_00 = M.RELATIONSHIP({

	name: 'ContainsArtefact_00',

	extends: ContainsArtefact,

	1: [Dim0Container, '0..*', { anchors: true, key: 'children' }],
	2: [Dim0Artefact,  '0..1', {                key: 'parent'   }]

});


////////////////////////////
//// Specific Artefacts ////
////////////////////////////

export const LyphCanvas = M.RESOURCE({//////////////////////////////////////////

	name: 'LyphCanvas',

	extends: Dim2Container,

	singular: "lyph canvas",
	plural:   "lyph canvases"

});/////////////////////////////////////////////////////////////////////////////

export const MaterialGlyph = M.RESOURCE({///////////////////////////////////////

	name: 'MaterialGlyph',

	extends: Dim0Artefact,

	singular: "material glyph"

});/////////////////////////////////////////////////////////////////////////////

export const LyphRectangle = M.RESOURCE({///////////////////////////////////////

	name: 'LyphRectangle',

	extends: Dim2Container,

	singular: "lyph rectangle"

});/////////////////////////////////////////////////////////////////////////////

export const LyphArtefact = M.RESOURCE({////////////////////////////////////////
	
	name: 'LyphArtefact',
	
	extends: Dim2Container,
	extendedBy: [LyphCanvas, LyphRectangle],
	
	singular: "lyph artefact"
	
});/////////////////////////////////////////////////////////////////////////////

export const CylindricalLyphRectangle = M.RESOURCE({////////////////////////////

	name: 'CylindricalLyphRectangle',

	extends: LyphRectangle,

	singular: "cylindrical lyph rectangle"

});/////////////////////////////////////////////////////////////////////////////

export const BorderLine = M.RESOURCE({//////////////////////////////////////////

	name: 'BorderLine',

	extends: Dim1Container,

	singular: "border line"

});/////////////////////////////////////////////////////////////////////////////

export const CoalescenceRectangle = M.RESOURCE({////////////////////////////////

	name: 'CoalescenceRectangle',

	extends: Dim2Container,

	singular: "coalescence rectangle"

});/////////////////////////////////////////////////////////////////////////////

export const NodeGlyph = M.RESOURCE({///////////////////////////////////////////

	name: 'NodeGlyph',

	extends: Dim0Container,

	singular: "node glyph"

});/////////////////////////////////////////////////////////////////////////////

export const ProcessEdge = M.RESOURCE({/////////////////////////////////////////

	name: 'ProcessEdge',

	extends: Dim1Container,

	singular: "process edge"

});/////////////////////////////////////////////////////////////////////////////

export const MeasurableGlyph = M.RESOURCE({/////////////////////////////////////

	name: 'MeasurableGlyph',

	extends: Dim0Artefact,

	singular: "measurable glyph"

});/////////////////////////////////////////////////////////////////////////////

export const CausalityArrow = M.RESOURCE({//////////////////////////////////////

	name: 'CausalityArrow',

	extends: Dim1Artefact,

	singular: "causality arrow"

});/////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////
//// Model - Artefact Relationships ////
////////////////////////////////////////

export const [PresentsModel] = M.RELATIONSHIP([
	[Artefact,                 Typed          .Type],
	[MaterialGlyph,            Material       .Type],
	[LyphArtefact,             Lyph           .Type],
	[CylindricalLyphRectangle, CylindricalLyph.Type],
	[BorderLine,               Border         .Type],
	[NodeGlyph,                Node           .Type],
	[ProcessEdge,              Process        .Type],
	[MeasurableGlyph,          Measurable     .Type],
	[CausalityArrow,           Causality      .Type],
	[CoalescenceRectangle,     Coalescence         ]
].map(([ArtefactClass, ModelClass]) => ({

	name: 'PresentsModel',

	extends: IsRelatedTo,

	singular: "presents model",

	1: [ArtefactClass, '1..1', { anchors: true, key: 'model' }],
	2: [ModelClass,    '0..*',                                ],

})));
