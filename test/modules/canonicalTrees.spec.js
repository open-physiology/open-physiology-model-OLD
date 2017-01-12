import {describe, it, expect} from '../test.helper';

import moduleFactory from '../../src/modules/canonicalTrees';
import {simpleMockHandlers} from "../mock-handlers.helper";


describe("'canonicalTrees' Module", () => {
	
	let module, backend, frontend;
	beforeEach(() => {
		({backend, frontend} = simpleMockHandlers());
		module = moduleFactory(frontend);
	});
	
	it("exports the expected classes", () => {
		
		expect(module.classes).to.contain.resources(
			'CanonicalTree',
			'CanonicalTreeBranch'
		);
		expect(module.classes).to.contain.relationships(
			'HasBranch',
			'BranchesTo',
			'IsConveyedBy'
		);
		
	});

});
