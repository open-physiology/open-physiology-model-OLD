import {xdescribe, describe, it, expect} from '../test.helper';

import moduleFactory from '../../src/modules/omegaTrees';


describe("'omegaTrees' Module", () => {
	
	let module;
	beforeEach(() => { module = moduleFactory() });
	
	it("exports the expected classes", () => {
		
		expect(module.classes).to.contain.resources(
			'OmegaTree'
		);
		expect(module.classes).to.contain.relationships(
			'HasAsRoot'
		);
		
	});
	
	it("exports provisional classes to meet deadline", () => {
		
		expect(module.classes).to.contain.resources(
			'OmegaTreePart'
		);
		expect(module.classes).to.contain.relationships(
			'HasTreeChildren',
			'HasTreePart'
		);
		 
	});

});
