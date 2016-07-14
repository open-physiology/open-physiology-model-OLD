import {describe, it, expect} from '../test.helper';

import * as exports from '../../src/modules/visualisations';
const { default: module, ...exportedClasses } = exports;

describe("'visualisation' Module", () => {

	it("exports the expected classes", () => {

		expect(exportedClasses).to.contain.resources(
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
		expect(exportedClasses).to.contain.relationships(
			'PrescribesStyleFor',
			'PresentsModel',
			'ContainsArtefact'
		);

	});

});
