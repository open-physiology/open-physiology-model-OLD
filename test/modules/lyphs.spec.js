import {xdescribe, describe, it, expect} from '../test.helper';

import {Resource, IsRelatedTo} from '../../src/modules/resources';
import {Type, Template}        from '../../src/modules/typed';

import * as exports from '../../src/modules/lyphs';
const { default: module, ...exportedClasses } = exports;

xdescribe("'lyphs' Module", () => {

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

	it("exports classes that can be instantiated", () => {

		for (let cls of Object.values(exportedClasses)) {
			if (cls.isResource) {
				expect(new cls()).to.be.an.instanceof(cls, Resource);
			} else if (cls.isRelationship) {
				expect(new cls()).to.be.an.instanceof(cls, IsRelatedTo);
			} else if (cls.isTypedResource) {
				expect(new cls.Type()    ).to.be.an.instanceof(cls.Type,     Type,     Resource);
				expect(new cls.Template()).to.be.an.instanceof(cls.Template, Template, Resource);
			}
		}

		const {
			Material,
			Lyph,
			CylindricalLyph
		} = exportedClasses;

		expect(new Material.Type()           ).to.be.an.instanceof(                                         Material.Type    );
		expect(new Material.Template()       ).to.be.an.instanceof(                                         Material.Template);
		expect(new Lyph.Type()               ).to.be.an.instanceof(                          Lyph.Type    , Material.Type    );
		expect(new Lyph.Template()           ).to.be.an.instanceof(                          Lyph.Template, Material.Template);
		expect(new CylindricalLyph.Type()    ).to.be.an.instanceof(CylindricalLyph.Type    , Lyph.Type    , Material.Type    );
		expect(new CylindricalLyph.Template()).to.be.an.instanceof(CylindricalLyph.Template, Lyph.Template, Material.Template);

	});




});
