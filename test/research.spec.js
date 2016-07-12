import {describe, it, expect} from './test.helper';

import * as exports from '../src/research';
const { default: module, ...exportedClasses } = exports;

describe("'research' Module", () => {

	it("exports the expected classes", () => {

		expect(exportedClasses).to.contain.resources(
			'Correlation',
			'ClinicalIndex',
			'Publication'
		);
		expect(exportedClasses).to.contain.relationships(
			'InvolvesMeasurable',
			'EncompassesClinicalIndex',
			'InvolvesClinicalIndex',
			'InvolvesPublication'
		);

	});

});
