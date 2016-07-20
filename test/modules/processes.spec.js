import {xdescribe, describe, it, expect} from '../test.helper';

import * as exports from '../../src/modules/processes';
const { default: module, ...exportedClasses } = exports;

xdescribe("'processes' Module", () => {

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
