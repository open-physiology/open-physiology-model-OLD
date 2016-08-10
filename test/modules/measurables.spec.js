import {xdescribe, describe, it, expect} from '../test.helper';

import moduleFactory from '../../src/modules/measurables';

describe("'measurables' Module", () => {
	
	let module;
	beforeEach(() => { module = moduleFactory() });
	
	it("exports the expected classes", () => {

		expect(module.classes).to.contain.typedResources(
			'Measurable',
			'Causality'
		);
		expect(module.classes).to.contain.relationships(
			'MeasuresMaterial',
			'HasMeasurable', // TODO: put back
			'InheritsAllMeasurablesFrom',
			'Causes'
		);

	});

});
