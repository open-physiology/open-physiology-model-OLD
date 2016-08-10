import {xdescribe, describe, it, expect} from '../test.helper';

import moduleFactory from '../../src/modules/typed';


describe("'typed' Module", () => {
	
	let module;
	beforeEach(() => { module = moduleFactory() });
	
	it("exports the expected classes", () => {

		expect(module.classes).to.contain.resources(
			'Type',
			'Template'
		);
		expect(module.classes).to.contain.typedResources(
			'Typed'
		);
		expect(module.classes).to.contain.relationships(
			'IsSubtypeOf',
			'HasCardinalityMultipliedByThatOf',
			'HasType'
		);

	});

});
