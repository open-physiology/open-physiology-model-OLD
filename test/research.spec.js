import {describe, it, expect} from './test.helper';

import research from '../src/research';

describe("'research' module", () => {

	it("exports the expected classes", () => {

		expect(research).to.contain.resources(
			'Correlation',
			'ClinicalIndex',
			'Publication'
		);
		expect(research).to.contain.relationships(
			'InvolvesMeasurable',
			'EncompassesClinicalIndex',
			'InvolvesClinicalIndex',
			'InvolvesPublication'
		);

	});

});
