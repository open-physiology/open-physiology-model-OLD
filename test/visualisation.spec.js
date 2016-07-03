import {describe, it, expect} from './test.helper';

import visualisation from '../src/visualisation';

describe("'visualisation' module", () => {

	it("exports the expected classes", () => {

		expect(visualisation).to.contain.resources(
			'Theme',
			'Artefact',
			'Dim2Artefact',
			'Dim1Artefact',
			'Dim0Artefact',
			'Dim2Container',
			'Dim1Container',
			'Dim0Container',
			'LyphCanvas',
			'MaterialGlyph',
			'LyphRectangle',
			'CylindricalLyphRectangle',
			'BorderLine',
			'CoalescenceRectangle',
			'NodeGlyph',
			'ProcessEdge',
			'MeasurableGlyph',
			'CausalityArrow'
		);
		expect(visualisation).to.contain.relationships(
			'PrescribesStyleFor',
			'PresentsModel',
			'Contains'
		);

	});

});
