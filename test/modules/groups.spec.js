import {xdescribe, describe, it, expect} from '../test.helper';

import moduleFactory from '../../src/modules/groups';


describe("'groups' Module", () => {
	
	let module;
	beforeEach(() => { module = moduleFactory() });
	
	it("exports the expected classes", () => {

		expect(module.classes).to.contain.typedResources(
			'Group'
		);
		expect(module.classes).to.contain.relationships(
			'HasElement'
		);

	});

});
