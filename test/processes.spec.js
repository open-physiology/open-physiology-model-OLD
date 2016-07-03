import {describe, it, expect} from './test.helper';

import processes from '../src/processes';

describe("'processes' module", () => {

	it("exports the expected classes", () => {

		expect(processes).to.contain.typedResources(
			'Process'
		);
		expect(processes).to.contain.relationships(
			'FlowsTo',
			'ConveysProcess',
			'TransportsMaterial',
			'InheritsAllMaterialsFrom',
			'HasSegment',
			'InheritsAllSegmentsFrom',
			'HasChannel',
			'InheritsAllChannelsFrom'
		);

	});

});
