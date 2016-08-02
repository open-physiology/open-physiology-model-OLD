import {xdescribe, describe, it, expect} from '../test.helper';

import * as exports from '../../src/modules/materials';
const { default: module, ...exportedClasses } = exports;

describe("'materials' Module", () => {
	
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
			'Material'
		);
		expect(exportedClasses).to.contain.relationships(
			'ContainsMaterial',
			'InheritsAllMaterialsFrom'
		);

	});

	it("exports classes that can be instantiated", async () => {
		
		let materialType            = MaterialType.new();
		let materialTemplate        = MaterialTemplate.new({ type: materialType });
		
		expect(materialType           ).to.be.an.instanceof(MaterialType    );
		expect(materialTemplate       ).to.be.an.instanceof(MaterialTemplate);
		
	});
	
});
