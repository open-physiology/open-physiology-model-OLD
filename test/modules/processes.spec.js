import {describe, it, expect} from '../test.helper';

import moduleFactory from '../../src/modules/processes';
import {simpleMockHandlers} from "../mock-handlers.helper";


describe("'processes' Module", () => {
	
	let module, backend;
	beforeEach(() => {
		backend = simpleMockHandlers();
		module  = moduleFactory(backend.frontendInterface);
	});
	
	it("exports the expected classes", () => {

		expect(module.classes).to.contain.resources(
			'Process'
		);
		expect(module.classes).to.contain.relationships(
			'IsSourceFor',
			'HasTarget',
			'ConveysProcess',
			'TransportsMaterial',
			'HasSegment',
			'HasProcessChannel',
			'HasNodeChannel'
		);

	});

});
