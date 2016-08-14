import {xdescribe, describe, it, expect} from '../test.helper';

import moduleFactory from '../../src/modules/lyphs';

describe("'lyphs' Module", () => {
	
	let module;
	beforeEach(() => { module = moduleFactory() });
	
	it("exports the expected classes", () => {
		
		expect(module.classes).to.contain.resources(
			'Material',
			'Lyph',
			'Border',
			'Node',
			'CoalescenceScenario',
			'Coalescence'
		);
		expect(module.classes).to.contain.relationships(
			'ContainsMaterial',
			'HasPart',
			'HasLayer',
			'HasPatch',
			'HasSegment',
			'HasBorder',
			'HasRadialBorder',
			'HasAxialBorder',
			'ContainsNode',
			'JoinsLyph',
			'Coalesces',
			'CoalescesLike'
		);

	});

	it("exports classes that can be instantiated", async () => {
		
		const {
			Material,
			Lyph,
			Border
		} = module.classes;
		
		let material = Material.new();
		let lyph     = Lyph.new();
		
		expect(material).to.be.an.instanceOf(Material);
		expect(lyph    ).to.be.an.instanceOf(Material, Lyph);
		
		expect([...lyph.radialBorders]).to.have.a.lengthOf(2);
		expect([...lyph.radialBorders][0]).to.be.an.instanceOf(Border);
		expect([...lyph.radialBorders][1]).to.be.an.instanceOf(Border);
		
	});
	
	it("exports classes that have the properties, relationships and relationshipShortcuts of their superclasses", () => {
		
		const {Lyph} = module.classes;
		
		expect(Lyph.properties           ).to.have.property('href');
		expect(Lyph.relationships        ).to.have.property('-->ContainsMaterial');
		expect(Lyph.relationshipShortcuts).to.have.property('materials');
		
	});
	
	it("(regression test: auto-synchronized border-natures?)", async () => {
		
		const {Lyph, Border} = module.classes;
		
		let lyph = Lyph.new();
		
		expect(new Set([
			[...lyph.radialBorders][0].nature,
			[...lyph.radialBorders][1].nature
		]).size).to.equal(2);
		
		// To compare, this was the nature of the original bug.
		// The default value of properties was shared among entities:
		let singleArray = [];
		expect(new Set([
			singleArray,
			singleArray
		]).size).to.equal(1);
		
	});
	
});
