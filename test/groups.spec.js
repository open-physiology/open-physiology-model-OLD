import {describe, it, expect} from './test.helper';

import groups from '../src/groups';

describe("'groups' module", () => {

	it("exports the expected classes", () => {

		expect(groups).to.contain.typedResources(
			'Group'
		);
		expect(groups).to.contain.relationships(
			'HasElement'
		);

	});

});
