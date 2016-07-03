import {describe, it, expect} from './test.helper';

import omegaTrees from '../src/omegaTrees';

describe("'omegaTrees' module", () => {

	it("exports the expected classes", () => {

		expect(omegaTrees).to.contain.typedResources(
			'OmegaTree'
		);
		expect(omegaTrees).to.contain.relationships(
			'HasAsRoot'
		);

	});

});
