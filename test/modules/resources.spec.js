import {xdescribe, describe, it, expect} from '../test.helper';

import moduleFactory from '../../src/modules/resources';


describe("'resources' Module", () => {
	
	let module;
	beforeEach(() => { module = moduleFactory() });
	
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
