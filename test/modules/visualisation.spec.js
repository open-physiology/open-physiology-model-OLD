import {xdescribe, describe, it, expect} from '../test.helper';

import moduleFactory from '../../src/modules/visualisations';


describe("'visualisation' Module", () => {
	
	let module;
	beforeEach(() => { module = moduleFactory() });
	
	it("exports the expected classes", () => {

		expect(module.classes).to.contain.resources(
			'Theme',
			'Artefact',
			'Dim2Artefact',
			'Dim1Artefact',
			'Dim0Artefact',
			'ArtefactContainer',
			'Dim2Container',
			'Dim1Container',
			'Dim0Container',
			'LyphCanvas',
			'MaterialGlyph',
			'LyphRectangle',
			'LyphArtefact',
			'CylindricalLyphRectangle',
			'BorderLine',
			'CoalescenceRectangle',
			'NodeGlyph',
			'ProcessEdge',
			'MeasurableGlyph',
			'CausalityArrow'
		);
		expect(module.classes).to.contain.relationships(
			'PrescribesStyleFor',
			'PresentsModel',
			'ContainsArtefact'
		);

	});

});
