import {xdescribe, describe, it, expect} from '../test.helper';

import {Resource, IsRelatedTo} from '../../src/modules/resources';
import {Type, Template}        from '../../src/modules/typed';

import * as exports from '../../src/modules/lyphs';
const { default: module, ...exportedClasses } = exports;

describe("'lyphs' Module", () => {
	
	const {
		MaterialType,
		LyphType,
		CylindricalLyphType,
		MaterialTemplate,
		LyphTemplate,
		CylindricalLyphTemplate
    } = exportedClasses;
	
	it("exports the expected classes", () => {

		expect(exportedClasses).to.contain.typedResources(
			'Material',
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
		
		let materialType            = await MaterialType.new();
		let materialTemplate        = await MaterialTemplate.new({ type: materialType });
		let lyphType                = await LyphType.new();
		let lyphTemplate            = await LyphTemplate.new({ type: lyphType });
		let cylindricalLyphType     = await CylindricalLyphType.new();
		let cylindricalLyphTemplate = await CylindricalLyphTemplate.new({ type: cylindricalLyphType });
		
		expect(materialType           ).to.be.an.instanceof(                                       MaterialType    );
		expect(materialTemplate       ).to.be.an.instanceof(                                       MaterialTemplate);
		expect(lyphType               ).to.be.an.instanceof(                         LyphType    , MaterialType    );
		expect(lyphTemplate           ).to.be.an.instanceof(                         LyphTemplate, MaterialTemplate);
		expect(cylindricalLyphType    ).to.be.an.instanceof(CylindricalLyphType    , LyphType    , MaterialType    );
		expect(cylindricalLyphTemplate).to.be.an.instanceof(CylindricalLyphTemplate, LyphTemplate, MaterialTemplate);

	});
	
	it("exports classes that have the properties, relationships and relationshipShortcuts of their superclasses", () => {
		
		expect(LyphType.properties           ).to.have.property('href');
		expect(LyphType.relationships        ).to.have.property('-->ContainsMaterial');
		expect(LyphType.relationshipShortcuts).to.have.property('materials');
		
	})




});
