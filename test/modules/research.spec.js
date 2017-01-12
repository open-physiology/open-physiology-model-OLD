import {describe, it, expect} from '../test.helper';
import moduleFactory from '../../src/modules/research';
import {simpleMockHandlers} from "../mock-handlers.helper";


describe("'research' Module", () => {
	
	let module, backend, frontend;
	beforeEach(() => {
		({backend, frontend} = simpleMockHandlers());
		module = moduleFactory(frontend);
	});
	
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
