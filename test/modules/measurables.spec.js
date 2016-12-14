import { describe, it, expect} from '../test.helper';

import moduleFactory from '../../src/modules/measurables';

describe("'measurables' Module", () => {
	
	let module;
	beforeEach(() => { module = moduleFactory() });
	
	it("exports the expected classes", () => {

		expect(module.classes).to.contain.resources(
			'Measurable',
			'Causality'
		);
		expect(module.classes).to.contain.relationships(
			'MeasuresMaterial',
			'HasMeasurable',
			'Causes'
		);

	});
 
});
