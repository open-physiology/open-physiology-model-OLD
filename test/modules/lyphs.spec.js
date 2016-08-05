import {xdescribe, describe, it, expect} from '../test.helper';

import * as exports from '../../src/modules/lyphs';
const { default: module, ...exportedClasses } = exports;

describe("'lyphs' Module", () => {
	
	const {
		MaterialType,
		LyphType,
		CylindricalLyphType,
		MaterialTemplate,
		LyphTemplate,
		CylindricalLyphTemplate,
		BorderTemplate
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
		
		let materialType            = MaterialType.new();
		let materialTemplate        = MaterialTemplate.new({ type: materialType });
		let lyphType                = LyphType.new();
		let lyphTemplate            = LyphTemplate.new({ type: lyphType });
		let cylindricalLyphType     = CylindricalLyphType.new();
		let cylindricalLyphTemplate = CylindricalLyphTemplate.new({ type: cylindricalLyphType });
		
		expect(materialType           ).to.be.an.instanceof(                                       MaterialType    );
		expect(materialTemplate       ).to.be.an.instanceof(                                       MaterialTemplate);
		expect(lyphType               ).to.be.an.instanceof(                         LyphType    , MaterialType    );
		expect(lyphTemplate           ).to.be.an.instanceof(                         LyphTemplate, MaterialTemplate);
		expect(cylindricalLyphType    ).to.be.an.instanceof(CylindricalLyphType    , LyphType    , MaterialType    );
		expect(cylindricalLyphTemplate).to.be.an.instanceof(CylindricalLyphTemplate, LyphTemplate, MaterialTemplate);
		
		expect(lyphType.innerBorder).to.be.an.instanceof(BorderTemplate);
		expect(lyphType.outerBorder).to.be.an.instanceof(BorderTemplate);
		expect(lyphType.minusBorder).to.be.undefined;
		expect(lyphType.plusBorder ).to.be.undefined;
		
		expect(cylindricalLyphType.innerBorder).to.be.an.instanceof(BorderTemplate);
		expect(cylindricalLyphType.outerBorder).to.be.an.instanceof(BorderTemplate);
		expect(cylindricalLyphType.minusBorder).to.be.an.instanceof(BorderTemplate);
		expect(cylindricalLyphType.plusBorder ).to.be.an.instanceof(BorderTemplate);

	});
	
	it("exports classes that have the properties, relationships and relationshipShortcuts of their superclasses", () => {
		
		expect(LyphType.properties           ).to.have.property('href');
		expect(LyphType.relationships        ).to.have.property('-->ContainsMaterial');
		expect(LyphType.relationshipShortcuts).to.have.property('materials');
		
	})
	
});
