import { describe, it, expect} from '../test.helper';

import moduleFactory from '../../src/modules/measurables';
import {simpleMockHandlers} from "../mock-handlers.helper";

describe("'measurables' Module", () => {
	
	let module, backend, frontend;
	beforeEach(() => {
		({backend, frontend} = simpleMockHandlers());
		module = moduleFactory(frontend);
	});
	
	it("exports the expected classes", () => {

		expect(module.classes).to.contain.resources(
			'Measurable',
			'Causality'
		);
		expect(module.classes).to.contain.relationships(
			'MeasuresMaterial',
			'HasMeasurable',
			'IsCauseOf',
			'HasEffect'
		);

	});
 
});
