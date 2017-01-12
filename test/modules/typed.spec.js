import {describe, it, expect} from '../test.helper';

import moduleFactory from '../../src/modules/typed';
import {simpleMockHandlers} from "../mock-handlers.helper";


describe("'typed' Module", () => {
	
	let module, backend, frontend;
	beforeEach(() => {
		({backend, frontend} = simpleMockHandlers());
		module = moduleFactory(frontend);
	});
	
	it("exports the expected classes", () => {

		expect(module.classes).to.contain.resources(
			'Type',
			'Template'
		);
		expect(module.classes).to.contain.relationships(
			'IsSubtypeOf',
			'HasCardinalityMultipliedByThatOf',
			'HasType',
			'DefinesType'
		);

	});

});
