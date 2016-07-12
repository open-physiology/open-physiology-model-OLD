import {describe, it, expect} from './test.helper';

import * as exports from '../src/processes';
const { default: module, ...exportedClasses } = exports;

describe("'processes' Module", () => {

	it("exports the expected classes", () => {

		expect(exportedClasses).to.contain.typedResources(
			'Process'
		);
		expect(exportedClasses).to.contain.relationships(
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
