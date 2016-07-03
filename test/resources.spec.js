import {describe, it, expect} from './test.helper';

import resources from '../src/resources';


describe("'resources' module", () => {

	it("exports the expected classes", () => {

		expect(resources).to.contain.resources(
			'Resource',
			'ExternalResource'
		);
		expect(resources).to.contain.relationships(
			'IsRelatedTo',
			'IsExternallyRelatedTo',
			'CorrespondsTo'
		);

	});




});
