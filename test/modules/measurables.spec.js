import {describe, it, expect} from '../test.helper';

import * as exports from '../../src/modules/measurables';
const { default: module, ...exportedClasses } = exports;

describe("'measurables' Module", () => {

	it("exports the expected classes", () => {

		expect(exportedClasses).to.contain.typedResources(
			'Measurable',
			'Causality'
		);
		expect(exportedClasses).to.contain.relationships(
			'MeasuresMaterial',
			'HasMeasurable', // TODO: put back
			'InheritsAllMeasurablesFrom',
			'Causes'
		);

	});

});
