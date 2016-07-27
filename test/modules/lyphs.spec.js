import {xdescribe, describe, it, expect} from '../test.helper';

import {Resource, IsRelatedTo} from '../../src/modules/resources';
import {Type, Template}        from '../../src/modules/typed';

import * as exports from '../../src/modules/lyphs';
const { default: module, ...exportedClasses } = exports;

describe("'lyphs' Module", () => {

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

		// for (let cls of Object.values(exportedClasses)) {
		// 	if (cls.isResource) {
		// 		expect(new cls()).to.be.an.instanceof(cls, Resource);
		// 	} else if (cls.isRelationship) {
		// 		expect(new cls()).to.be.an.instanceof(cls, IsRelatedTo);
		// 	} else if (cls.isTypedResource) {
		// 		expect(new cls.Type()    ).to.be.an.instanceof(cls.Type,     Type,     Resource);
		// 		expect(new cls.Template()).to.be.an.instanceof(cls.Template, Template, Resource);
		// 	}
		// }

		const {
			Material,
			Lyph,
			CylindricalLyph
		} = exportedClasses;
		
		
		let materialType            = await Material.Type.new();
		let materialTemplate        = await Material.Template.new({ type: materialType });
		let lyphType                = await Lyph.Type.new();
		let lyphTemplate            = await Lyph.Template.new({ type: lyphType });
		let cylindricalLyphType     = await CylindricalLyph.Type.new();
		let cylindricalLyphTemplate = await CylindricalLyph.Template.new({ type: cylindricalLyphType });
		
		
		expect(materialType           ).to.be.an.instanceof(                                         Material.Type    );
		expect(materialTemplate       ).to.be.an.instanceof(                                         Material.Template);
		expect(lyphType               ).to.be.an.instanceof(                          Lyph.Type    , Material.Type    );
		expect(lyphTemplate           ).to.be.an.instanceof(                          Lyph.Template, Material.Template);
		expect(cylindricalLyphType    ).to.be.an.instanceof(CylindricalLyph.Type    , Lyph.Type    , Material.Type    );
		expect(cylindricalLyphTemplate).to.be.an.instanceof(CylindricalLyph.Template, Lyph.Template, Material.Template);

	});




});
