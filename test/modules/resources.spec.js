import {describe, it, expect} from '../test.helper';

import * as exports from '../../src/modules/resources';
const { default: module, ...exportedClasses } = exports;

describe("'resources' Module", () => {

	it("exports the expected classes", () => {

		expect(exportedClasses).to.contain.resources(
			'Resource',
			'ExternalResource'
		);
		expect(exportedClasses).to.contain.relationships(
			'IsRelatedTo',
			'IsExternallyRelatedTo',
			'CorrespondsTo'
		);

	});




});
