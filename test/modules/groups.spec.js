import {describe, it, expect} from '../test.helper';
import moduleFactory from '../../src/modules/groups';
import {simpleMockHandlers} from "../mock-handlers.helper";


describe("'groups' Module", () => {
	
	let module, backend, frontend;
	beforeEach(() => {
		({backend, frontend} = simpleMockHandlers());
		module = moduleFactory(frontend);
	});
	
	it("exports the expected classes", () => {

		expect(module.classes).to.contain.resources(
			'Group'
		);
		expect(module.classes).to.contain.relationships(
			'IncludesElement'
		);

	});

});
