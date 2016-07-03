import {describe, it, expect} from './test.helper';

import lyphs from '../src/lyphs';


describe("'lyphs' module", () => {

	it("exports the expected classes", () => {

		expect(lyphs).to.contain.resources(
			'Coalescence',
			'Material',
			'Lyph',
			'CylindricalLyph',
			'Border',
			'Node'
		);
		expect(lyphs).to.contain.typedResources(
			'Material',
			'Lyph',
			'CylindricalLyph',
			'Border',
			'Node'
		);
		expect(lyphs).to.contain.relationships(
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
			'InheritsAllPartsFrom',
			'HasInnerBorder',
			'HasOuterBorder',
			'HasMinusBorder',
			'HasPlusBorder',
			'HasNode',
			'CoalescesWith',
			'CoalescesThroughLayer'
		);
		
		// for (let cls of [
		// 	'Material',
		// 	'Lyph',
		// 	'CylindricalLyph',
		// 	'Border',
		// 	'Node'
		// ]) {
		// 	expect(lyphs).to.have.property(cls).that.contains.properties({
		// 		Type:     lyphs[`${cls}Type`],
		// 		Template: lyphs[`${cls}Template`],
		// 		HasType:  undefined
		// 	});
		// }

	});




});
