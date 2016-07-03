import {describe, it, expect} from './test.helper';

import measurables from '../src/measurables';

describe("'measurables' module", () => {

	it("exports the expected classes", () => {

		expect(measurables).to.contain.typedResources(
			'Measurable',
			'Causality'
		);
		expect(measurables).to.contain.relationships(
			'MeasuresMaterial',
			'HasMeasurable',
			'InheritsAllMeasurablesFrom',
			'Causes'
		);

	});

});
