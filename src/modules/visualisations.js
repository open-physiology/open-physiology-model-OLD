import TypedModule, {MANY}                                  from '../TypedModule';
import {identifierRegex, rationalNumberSchema, angleSchema} from '../util';

import resources,   {Resource, IsRelatedTo}                                      from './resources';
import lyphs,       {Material, Lyph, CylindricalLyph, Border, Coalescence, Node} from './lyphs';
import typed,       {Typed}                                                      from './typed';
import processes,   {Process}                                                    from './processes';
import measurables, {Measurable, Causality}                                      from './measurables';


const M = new TypedModule([resources, lyphs, typed, processes, measurables]);
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

	1: [Theme,    [0, MANY], { key: 'resources' }],
	2: [Resource, [0, MANY], { key: 'themes'    }],

	patternProperties: {
		[identifierRegex]: { type: 'string', minLength: 1 }
	}

});


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

	singular: "2-dimensional artefact",

	properties: {
		'width':  { ...rationalNumberSchema, required: true },
		'height': { ...rationalNumberSchema, required: true }
	}

});/////////////////////////////////////////////////////////////////////////////

export const Dim1Artefact = M.RESOURCE({////////////////////////////////////////

	name: 'Dim1Artefact',

	extends:  Dim2Artefact,
	abstract: true,

	singular: "1-dimensional artefact",

	properties: {
		'height': { value: { n: 0 } }
	}

});/////////////////////////////////////////////////////////////////////////////

export const Dim0Artefact = M.RESOURCE({////////////////////////////////////////

	name: 'Dim0Artefact',

	extends:  Dim1Artefact,
	abstract: true,

	singular: "0-dimensional artefact",

	properties: {
		'width': { value: { n: 0 } }
	}

});/////////////////////////////////////////////////////////////////////////////


export const Dim2Container = M.RESOURCE({///////////////////////////////////////

	name: 'Dim2Container',

	extends:  Dim2Artefact,
	abstract: true,

	singular: "2-dimensional container",

});/////////////////////////////////////////////////////////////////////////////

export const Dim1Container = M.RESOURCE({///////////////////////////////////////

	name: 'Dim1Container',

	extends:  Dim1Artefact,
	abstract: true,

	singular: "1-dimensional container"

});/////////////////////////////////////////////////////////////////////////////

export const Dim0Container = M.RESOURCE({///////////////////////////////////////

	name: 'Dim0Container',

	extends:  Dim0Artefact,
	abstract: true,

	singular: "0-dimensional container"

});/////////////////////////////////////////////////////////////////////////////


export const [ContainsArtefact] = M.RELATIONSHIP([{

	name: 'ContainsArtefact',

	extends: IsRelatedTo,

	singular: "contains artefact",

	1: [Dim2Container, [0, MANY], { anchors: true, key: 'children' }],
	2: [Dim2Artefact,  [0, 1   ], {                key: 'parent'   }],

	properties: {
		'x':        { ...rationalNumberSchema,    required: true },
		'y':        { ...rationalNumberSchema,    required: true },
		'rotation': { ...angleSchema, default: 0, required: true }
	}

	// TODO: CONSTRAINT: a relationship like this requires
	//     : a corresponding parent/child relationship on the associated models

}, {

	name: 'ContainsArtefact',

	extends: IsRelatedTo,

	1: [Dim1Container, [0, MANY], { anchors: true, key: 'children' }],
	2: [Dim1Artefact,  [0, 1   ], {                key: 'parent'   }],

	properties: {
		'x': { ...rationalNumberSchema, required: true }
	}

	// TODO: CONSTRAINT: a relationship like this requires
	//     : a corresponding parent/child relationship on the associated models

}, {

	name: 'ContainsArtefact',

	extends: IsRelatedTo,

	1: [Dim0Container, [0, MANY], { anchors: true, key: 'children' }],
	2: [Dim0Artefact,  [0, 1   ], {                key: 'parent'   }],

	// TODO: CONSTRAINT: a relationship like this requires
	//     : a corresponding parent/child relationship on the associated models

}]);


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


export const [PresentsModel] = M.RELATIONSHIP([
	[Artefact,                 Typed          .Type],
	[LyphCanvas,               Lyph           .Type],
	[MaterialGlyph,            Material       .Type],
	[LyphRectangle,            Lyph           .Type],
	[CylindricalLyphRectangle, CylindricalLyph.Type],
	[BorderLine,               Border         .Type],
	[CoalescenceRectangle,     Coalescence         ],
	[NodeGlyph,                Node           .Type],
	[ProcessEdge,              Process        .Type],
	[MeasurableGlyph,          Measurable     .Type],
	[CausalityArrow,           Causality      .Type]
].map(([ArtefactClass, ModelClass]) => ({

	name: 'PresentsModel',

	extends: IsRelatedTo,

	singular: "presents model",

	1: [ArtefactClass, [1, 1   ], { anchors: true, key: 'model' }],
	2: [ModelClass,    [0, MANY],                                ],

})));
