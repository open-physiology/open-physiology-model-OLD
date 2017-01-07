import {describe, it, expect} from '../test.helper';

import moduleFactory from '../../src/modules/visualisations';
import {simpleMockHandlers} from "../mock-handlers.helper";


describe("'visualisation' Module", () => {
	
	let module, backend;
	beforeEach(() => {
		backend = simpleMockHandlers();
		module  = moduleFactory(backend.frontendInterface);
	});
	
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
