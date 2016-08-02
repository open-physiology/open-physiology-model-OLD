import {xdescribe, describe, it, expect} from '../test.helper';

import * as exports from '../../src/modules/lyphs';
const { default: module, ...exportedClasses } = exports;

describe("'lyphs' Module", () => {
	
	const {
		LyphType,
		CylindricalLyphType,
		LyphTemplate,
		CylindricalLyphTemplate
    } = exportedClasses;
	
	it("exports the expected classes", () => {

		expect(exportedClasses).to.contain.typedResources(
			'Lyph',
			'CylindricalLyph',
			'Border',
			'Node'
		);
		expect(exportedClasses).to.contain.resources(
			'Coalescence'
		);
		expect(exportedClasses).to.contain.relationships(
			'ContainsMaterial',
			'InheritsAllMaterialsFrom',
			'HasPart',
			'HasLayer',
			'HasPatch',
			'InheritsAllPatchesFrom',
			'InheritsAllLayersFrom',
			'InheritsAllPartsFrom',
			'HasSegment',
			'InheritsAllSegmentsFrom',
			'HasInnerBorder',
			'HasOuterBorder',
			'HasMinusBorder',
			'HasPlusBorder',
			'HasNode',
			'CoalescesWith',
			'CoalescesThroughLayer'
		);

	});

	it("exports classes that can be instantiated", async () => {
		
		let lyphType                = LyphType.new();
		let lyphTemplate            = LyphTemplate.new({ type: lyphType });
		let cylindricalLyphType     = CylindricalLyphType.new();
		let cylindricalLyphTemplate = CylindricalLyphTemplate.new({ type: cylindricalLyphType });
		
		expect(lyphType               ).to.be.an.instanceof(                         LyphType    );
		expect(lyphTemplate           ).to.be.an.instanceof(                         LyphTemplate);
		expect(cylindricalLyphType    ).to.be.an.instanceof(CylindricalLyphType    , LyphType    );
		expect(cylindricalLyphTemplate).to.be.an.instanceof(CylindricalLyphTemplate, LyphTemplate);

	});
	
	it("exports classes that have the properties, relationships and relationshipShortcuts of their superclasses", () => {
		
		expect(LyphType.properties           ).to.have.property('href');
		expect(LyphType.relationships        ).to.have.property('-->ContainsMaterial');
		expect(LyphType.relationshipShortcuts).to.have.property('materials');
		
	})
	
});
