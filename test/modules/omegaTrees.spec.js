import {xdescribe, describe, it, expect} from '../test.helper';

import moduleFactory from '../../src/modules/omegaTrees';


describe("'omegaTrees' Module", () => {
	
	let module;
	beforeEach(() => { module = moduleFactory() });
	
	it("exports the expected classes", () => {

		expect(module.classes).to.contain.typedResources(
			'OmegaTree'
		);
		expect(module.classes).to.contain.relationships(
			'HasAsRoot'
		);

	});

});
