import {xdescribe, describe, it, expect} from '../test.helper';

import * as exports from '../../src/modules/typed';
const { default: module, ...exportedClasses } = exports;

describe("'typed' Module", () => {

	it("exports the expected classes", () => {

		expect(exportedClasses).to.contain.resources(
			'Type',
			'Template'
		);
		expect(exportedClasses).to.contain.typedResources(
			'Typed'
		);
		expect(exportedClasses).to.contain.relationships(
			'IsSubtypeOf',
			'HasCardinalityMultipliedByThatOf',
			'HasType'
		);

	});

});
