import {describe, it, expect} from '../test.helper';

import moduleFactory from '../../src/modules/resources';
import {simpleMockHandlers} from "../mock-handlers.helper";


describe("'resources' Module", () => {
	
	let module, backend, frontend;
	beforeEach(() => {
		({backend, frontend} = simpleMockHandlers());
		module = moduleFactory(frontend);
	});
	
	it("exports the expected classes", () => {

		expect(module.classes).to.contain.resources(
			'Resource',
			'ExternalResource'
		);
		expect(module.classes).to.contain.relationships(
			'IsRelatedTo',
			'IsExternallyRelatedTo',
			'CorrespondsTo'
		);
		
	});
	
	it("has abstract classes", () => {
		
		const {Resource, IsRelatedTo} = module.classes;
		
		expect(Resource)   .to.have.property('abstract', true);
		expect(IsRelatedTo).to.have.property('abstract', true);
	});
	
});
