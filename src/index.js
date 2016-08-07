import resources      from './modules/resources';
import typed          from './modules/typed';
import lyphs          from './modules/lyphs';
import groups         from './modules/groups';
import measurables    from './modules/measurables';
import omegaTrees     from './modules/omegaTrees';
import processes      from './modules/processes';
import research       from './modules/research';
import visualisations from './modules/visualisations';

import Module from './Module';
const M = new Module('all', [
	resources,
	typed,
	lyphs,
	groups,
	measurables,
	omegaTrees,
	processes,
	research,
	visualisations
]);
export default M;

let classesObject = {};
for (let [key, val] of M.classes.vertices()) {
	classesObject[key] = val;
}

export const {
	Resource,
	IsRelatedTo,
	ExternalResource,
	IsExternallyRelatedTo,
	CorrespondsTo,
	Type,
	IsSubtypeOf,
	Template,
	HasCardinalityMultipliedByThatOf,
	HasType,
	MaterialType,
	MaterialTemplate,
	ContainsMaterial,
	InheritsAllMaterialsFrom,
	LyphType,
	LyphTemplate,
	HasPart,
	HasLayer,
	HasPatch,
	InheritsAllPartsFrom,
	InheritsAllPatchesFrom,
	InheritsAllLayersFrom,
	CylindricalLyphType,
	CylindricalLyphTemplate,
	HasSegment,
	InheritsAllSegmentsFrom,
	BorderType,
	BorderTemplate,
	HasInnerBorder,
	HasOuterBorder,
	HasMinusBorder,
	HasPlusBorder,
	Coalescence,
	CoalescesWith,
	CoalescesThroughLayer,
	NodeType,
	NodeTemplate,
	HasNode,
	GroupType,
	GroupTemplate,
	HasElement,
	ProcessType,
	ProcessTemplate,
	FlowsTo,
	ConveysProcess,
	TransportsMaterial,
	HasChannel,
	InheritsAllChannelsFrom,
	MeasurableType,
	MeasurableTemplate,
	MeasuresMaterial,
	MeasurableLocationType,
	MeasurableLocationTemplate,
	HasMeasurable,
	InheritsAllMeasurablesFrom,
	CausalityType,
	CausalityTemplate,
	Causes,
	OmegaTreeType,
	OmegaTreeTemplate,
	HasAsRoot,
	Correlation,
	InvolvesMeasurable,
	ClinicalIndex,
	EncompassesClinicalIndex,
	InvolvesClinicalIndex,
	Publication,
	InvolvesPublication,
	Theme,
	PrescribesStyleFor,
	Artefact,
	Dim2Artefact,
	Dim1Artefact,
	Dim0Artefact,
	Dim2Container,
	Dim1Container,
	Dim0Container,
	ContainsArtefact,
	LyphCanvas,
	MaterialGlyph,
	LyphRectangle,
	CylindricalLyphRectangle,
	BorderLine,
	CoalescenceRectangle,
	NodeGlyph,
	ProcessEdge,
	MeasurableGlyph,
	CausalityArrow,
	PresentsModel,
	OmegaTreePart,
	HasTreeParent,
	OmegaTreePartType,
	OmegaTreePartTemplate
} = classesObject;

// export * from './modules/resources';
// export * from './modules/typed';
// export * from './modules/lyphs';
// export * from './modules/groups';
// export * from './modules/measurables';
// export * from './modules/omegaTrees';
// export * from './modules/processes';
// export * from './modules/research';
// export * from './modules/visualisations';
