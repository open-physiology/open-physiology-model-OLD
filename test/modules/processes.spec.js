import {xdescribe, describe, it, expect} from '../test.helper';

import moduleFactory from '../../src/modules/processes';


describe("'processes' Module", () => {
	
	let module;
	beforeEach(() => { module = moduleFactory() });
	
	it("exports the expected classes", () => {

		expect(module.classes).to.contain.resources(
			'Process'
		);
		expect(module.classes).to.contain.relationships(
			'FlowsTo',
			'ConveysProcess',
			'TransportsMaterial',
			'HasSegment',
			'HasChannel'
		);

	});

});
