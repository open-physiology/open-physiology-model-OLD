import {describe, it, expect} from './test.helper';

import typed from '../src/typed';

describe("'typed' module", () => {

	it("exports the expected classes", () => {

		expect(typed).to.contain.resources(
			'Type',
			'Template'
		);
		expect(typed).to.contain.typedResources(
			'Typed'
		);
		expect(typed).to.contain.relationships(
			'IsSubtypeOf',
			'HasCardinalityMultipliedByThatOf',
			'HasType'
		);

	});

});
