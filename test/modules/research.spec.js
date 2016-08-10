import {xdescribe, describe, it, expect} from '../test.helper';

import moduleFactory from '../../src/modules/research';


describe("'research' Module", () => {
	
	let module;
	beforeEach(() => { module = moduleFactory() });
	
	it("exports the expected classes", () => {

		expect(module.classes).to.contain.resources(
			'Correlation',
			'ClinicalIndex',
			'Publication'
		);
		expect(module.classes).to.contain.relationships(
			'InvolvesMeasurable',
			'EncompassesClinicalIndex',
			'InvolvesClinicalIndex',
			'InvolvesPublication'
		);

	});

});
