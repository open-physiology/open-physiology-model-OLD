import {xdescribe, describe, it, expect} from '../test.helper';

import * as exports from '../../src/modules/omegaTrees';
const { default: module, ...exportedClasses } = exports;

describe("'omegaTrees' Module", () => {

	it("exports the expected classes", () => {

		expect(exportedClasses).to.contain.typedResources(
			'OmegaTree'
		);
		expect(exportedClasses).to.contain.relationships(
			'HasAsRoot'
		);

	});

});
