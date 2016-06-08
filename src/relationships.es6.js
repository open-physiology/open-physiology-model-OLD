////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// relationship specifications                                                                                        //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// RelationshipName: [
//     'ResourceType1', c1, 'fieldName1', { /* options1 */ },
//     'ResourceType2', c2, 'fieldName2', { /* options2 */ },
//     { /* options */ }
// ]
// This means that RelationshipName is a type of c1-to-c2 relationship
// (c stands for cardinality: many-to-many, one-to-many, many-to-one, one-to-one)
// between ResourceType1 resources and ResourceType2 resources.
// So: "a ResourceType1 resource can be related to 'c1' ResourceType2 resource(s),
//      exposed through fieldName1 in that resource"
// and vice versa.
//
// A couple of possible options:
// - options.readOnly:       this relationship type is managed programmatically, not to be exposed through the API directly
// - options.symmetric:      this relationship type is bidirectional, 1->2 always implies 2->1
// - options.anti-reflexive: a resource may not be related to itself with this type
// - options1.sustains:      when a ResourceType1 instance is deleted,
//                           the ResourceType2 instance that is being sustained by it is deleted automatically
// - options1.anchors:       a ResourceType2 instance cannot be deleted
//                           while there are still ResourceType1 instances pointing to it
// - options1.implicit:      (only when c2 = 'one') a new ResourceType2 instance, plus this kind of relationship,
//                           is automatically created for a new ResourceType1 instance
// - options1.getSummary:    an explanation in English of the corresponding REST endpoint for HTTP GET
// - options1.putSummary:    an explanation in English of the corresponding REST endpoint for HTTP PUT
// - options1.deleteSummary: an explanation in English of the corresponding REST endpoint for HTTP DELETE

/* cardinality abbreviations */
const _0 = 'optional';
const _1 = 'one';
const _$ = 'many';

/* the full list of relationships */
export const relationships = {
	LyphTemplateLayer: [
		'LyphTemplate',     _$, 'layers',       { sustains: true },
		'LayerTemplate',    _1, 'lyphTemplate', { indexFieldName: 'position' }
	], // TODO: somehow unify 'indexFieldName' (if only in style) with the 'disambiguation' property used at the bottom
	LyphTemplateChildLyphTemplate: [
		'LyphTemplate',     _$, 'children', {},
		'LyphTemplate',     _$, 'parents',  {},
		{
			getSummary:    "find all lyph template children of a given lyph template",
			putSummary:    "add a given lyph template to a given lyph template as a child",
			deleteSummary: "remove a given lyph template from a given lyph template as a child"
		}
	],
	LyphTemplateSubLyphTemplate: [
		'LyphTemplate',     _$, 'subTemplates',    {},
		'LyphTemplate',     _$, 'superTemplates',  {},
		{
			getSummary:    "find all sub-templates of a given lyph template",
			putSummary:    "make a given lyph template a sub-template of another given lyph template",
			deleteSummary: "remove a given lyph template as a sub-template from another given lyph template"
		}
	],
	LyphTemplateMaterial: [
		'LyphTemplate',     _$, 'materials',       {},
		'LyphTemplate',     _$, 'materialInLyphs', {},
		// TODO: what would go wrong if this ^ was also called 'materialIn', overloaded with the relationship type below?
		{
			getSummary:    "find the lyph templates in which a given lyph template is a material",
			putSummary:    "add a given lyph template to a given lyph template as a material",
			deleteSummary: "remove a given lyph template from a given lyph template as material"
		}
	],
	LayerTemplateMaterial: [
		'LayerTemplate',    _$, 'materials',  {
			getSummary:    "find all lyph templates acting as materials in a given layer template",
			putSummary:    "add a given lyph template to a given layer template as a material",
			deleteSummary: "remove a given lyph template from a given layer template as material"
		},
		'LyphTemplate',     _$, 'materialIn', {
			getSummary:    "find the layer templates in which a given lyph template is a material",
			putSummary:    "add a given lyph template to a given layer template as a material",
			deleteSummary: "remove a given lyph template from a given layer template as material"
		}
	],
	LayerTemplateLyphIdentity: [
		'LayerTemplate',    _$, 'lyphIdentity',  {
			getSummary:    "find all lyph templates that are equated with a given layer template",
			putSummary:    "equate a given lyph template with a given layer template",
			deleteSummary: "remove the equation between a given lyph template and a given layer template"
		},
		'LyphTemplate',     _$, 'layerIdentity', {
			getSummary:    "find all lyph templates that are equated with a given layer template",
			putSummary:    "equate a given lyph template with a given layer template",
			deleteSummary: "remove the equation between a given lyph template and a given layer template"
		}
	],
	LyphTemplateInstantiation: [
		'LyphTemplate',     _$, 'instantiations', {
			sustains: true,
			getSummary: "find all lyphs instantiated from a given lyph template"
		},
		'Lyph',             _1, 'template',       {},
		{ readOnly: true } // instantiation has a single template from creation
	],
	LayerTemplateInstantiation: [
		'LayerTemplate',    _$, 'instantiations', {
			sustains: true,
			getSummary: "find all layers instantiated from a given layer template"
		},
		'Layer',            _1, 'template',       {},
		{ readOnly: true } // instantiation has a single template from creation
	],
	LyphLayer: [
		'Lyph',             _$, 'layers', { sustains: true },
		'Layer',            _1, 'lyph',   { indexFieldName: 'position' },
		{ readOnly: true } // layers sync through templates
	],
	LayerChildLyph: [
		'Layer',            _$, 'childLyphs', {
			sustains:      true,
			getSummary:    "find all lyphs that are located in a given layer",
			putSummary:    "add a given lyph into a given layer",
			deleteSummary: "remove a given lyph from inside a given layer"
		},
		'Lyph',             _$, 'inLayers',   {
			getSummary:    "find the layer(s) in which a given lyph is located",
			putSummary:    "add a given lyph to a given layer location",
			deleteSummary: "remove a given lyph from a given layer location"
		}
	],
	LayerCoalescence: [
		'Layer',            _$, 'coalescesWith', {},
		'Layer',            _$, 'coalescesWith', {},
		{
			symmetric:     true,
			antiReflexive: true,
			getSummary:    "find all layers that coalesce with a given layer",
			putSummary:    "make two given layers coalesce",
			deleteSummary: "make two coalescing layers not coalesce"
		}
	],
	LyphInCompartment: [
		'Lyph',             _$, 'inCompartments', {
			getSummary:    "find all compartments in which a given lyph is a member",
			putSummary:    "add a given lyph to a given compartment as a member",
			deleteSummary: "remove a given lyph from a given compartment as a member"
		},
		'Compartment',      _$, 'lyphs',          { anchors: true }
	],
	LyphTemplateLocatedMeasure: [
		'LyphTemplate',     _$, 'locatedMeasures', { // TODO: this should probably be 'Lyph', but we need it to be 'LyphTemplate' right now for the correlation editor (should discuss)
			sustains:      true,
			getSummary:    "find all located measures associated with a given lyph template",
			putSummary:    "associate a given located measure with a given lyph template",
			deleteSummary: "remove a given located measure associated with a given lyph template"
		},
		'LocatedMeasure',   _1, 'lyphTemplate',    {}
	],
	BorderNode: [
		'Border',           _$, 'nodes',   { sustains: true },
		'Node',             _$, 'borders', {}
	],
	NodeProcess: [
		'Node',             _$, 'outgoingProcesses', { sustains: true },
		'Process',          _1, 'source',            {}
	],
	ProcessNode: [ // swapped sides to directionally align with above
		'Process',          _1, 'target',            {},
		'Node',             _$, 'incomingProcesses', { sustains: true }
	],

	CanonicalTreeLevel: [
		'CanonicalTree',      _$, 'levels', { sustains: true             },
		'CanonicalTreeLevel', _1, 'tree',   { indexFieldName: 'position' }
	],
	CanonicalTreeLevelTemplate: [
		'CanonicalTreeLevel', _1, 'template',            { anchors: true },
		'LyphTemplate',       _$, 'canonicalTreeLevels', {}
	],
	CanonicalTreeLevelSubtree: [
		'CanonicalTreeLevel', _$, 'connectedTrees', {},
		'CanonicalTree',      _$, 'connectedAt',    {}
	],

	NodePotentialProcess: [
		'Node',             _$, 'outgoingPotentialProcesses', { sustains: true },
		'PotentialProcess', _1, 'source',                     {}
	],
	PotentialProcessNode: [ // swapped sides to directionally align with above
		'PotentialProcess', _1, 'target',                     {},
		'Node',             _$, `incomingPotentialProcesses`, { sustains: true }
	],
	CorrelationPublication: [
		'Correlation',      _0, 'publication',   { anchors: true },
		'Publication',      _$, 'correlations',  {}
	],
	CorrelationLocatedMeasure: [
		'Correlation',      _$, 'locatedMeasures', { anchors: true },
		'LocatedMeasure',   _$, 'correlations',    {}
	],
	CorrelationClinicalIndex: [
		'Correlation',      _$, 'clinicalIndices', { anchors: true },
		'ClinicalIndex',    _$, 'correlations',    {}
	],
	ClinicalIndexChildren: [
		'ClinicalIndex',    _$, 'children', {},
		'ClinicalIndex',    _$, 'parents',  {}
	],
	LocatedMeasureBagOfPathologies: [
		'BagOfPathologies', _$, 'locatedMeasures',   { anchors: true },
		'LocatedMeasure',   _$, 'bagsOfPathologies', {}
	],
	BagOfPathologiesRemovedProcess: [
		'BagOfPathologies', _$, 'removedProcesses',           {
			anchors:       true,
			getSummary:    "find all processes 'removed' by a given bag of pathologies",
			putSummary:    "make a given bag of pathologies 'remove' a given process",
			deleteSummary: "stop a given bag of pathologies from 'removing' a given process"
		},
		'Process',          _$, 'removedByBagsOfPathologies', {
			getSummary:    "find all bags of pathologies that 'remove' a given process",
			putSummary:    "make a given bag of pathologies 'remove' a given process",
			deleteSummary: "stop a given bag of pathologies from 'removing' a given process"
		}
	],
	BagOfPathologiesAddedProcess: [
		'BagOfPathologies', _$, 'addedProcesses',           {
			anchors:       true,
			getSummary:    "find all potential processes 'added' by a given bag of pathologies",
			putSummary:    "make a given bag of pathologies 'add' a given potential process",
			deleteSummary: "stop a given bag of pathologies from 'adding' a given potential process"
		},
		'PotentialProcess', _$, 'addedByBagsOfPathologies', {
			getSummary:    "find all bags of pathologies that 'add' a given potential process",
			putSummary:    "make a given bag of pathologies 'add' a given potential process",
			deleteSummary: "stop a given bag of pathologies from 'adding' a given potential process"
		}
	]
};

/* adding these four relationships through a loop, to avoid duplication */
for (let side of ['plus', 'minus', 'inner', 'outer']) {
	relationships[`LayerBorder_${side}`] = [
		'Layer',  _1,  side,   {
			sustains: true,
			anchors:  true,
			implicit: true
		},
		'Border', _0, 'layer', { // a border is either of a layer or of a lyph
			disambiguation: { side }
		}
	];
	relationships[`LyphBorder_${side}`] = [
		'Lyph',   _1,  side,   {
			sustains: true,
			anchors:  true,
			implicit: true
		},
		'Border', _0, 'lyph', { // a border is either of a layer or of a lyph
			disambiguation: { side }
		}
	];
	// TODO: polymorphism on the field in Border would be better than this _0 optionality thing
}

// TODO: We need polymorphism on the Swagger side and on the Neo4j side.
