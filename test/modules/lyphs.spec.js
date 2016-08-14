import {xdescribe, describe, it, expect} from '../test.helper';

import moduleFactory from '../../src/modules/lyphs';

import map from 'lodash-bound/map';

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
			'HasLongitudinalBorder',
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
		
	});

	it("exports lyph type that can be given custom borders and axes", async () => {
		
		const {
			Lyph,
			Border
		} = module.classes;
		
		let lyph = Lyph.new({}, {
			createRadialBorders: 1
		});
		
		expect([...lyph.longitudinalBorders]).to.have.a.lengthOf(2);
		expect([...lyph.longitudinalBorders][0]).to.be.an.instanceOf(Border);
		expect([...lyph.longitudinalBorders][1]).to.be.an.instanceOf(Border);
		
		expect([...lyph.radialBorders]).to.have.a.lengthOf(1);
		expect([...lyph.radialBorders][0]).to.be.an.instanceOf(Border);
		
		
		let lyph2 = Lyph.new({}, {
			createRadialBorders: 2,
			createAxis: 1
		});
		
		expect([...lyph2.longitudinalBorders]).to.have.a.lengthOf(2);
		expect([...lyph2.longitudinalBorders][0]).to.be.an.instanceOf(Border);
		expect([...lyph2.longitudinalBorders][1]).to.be.an.instanceOf(Border);
		
		expect([...lyph2.radialBorders]).to.have.a.lengthOf(2);
		expect([...lyph2.radialBorders][0]).to.be.an.instanceOf(Border);
		expect([...lyph2.radialBorders][1]).to.be.an.instanceOf(Border);
		expect(lyph2.axis).to.be.an.instanceOf(Border);
		
	});
	
	it("exports classes that have the properties, relationships and relationshipShortcuts of their superclasses", () => {
		
		const {Lyph} = module.classes;
		
		expect(Lyph.properties           ).to.have.property('href');
		expect(Lyph.relationships        ).to.have.property('-->ContainsMaterial');
		expect(Lyph.relationshipShortcuts).to.have.property('materials');
		
	});
	
	it("exports lyph classes that can have layers", () => {
		
		const {Lyph} = module.classes;
		
		let lyph = Lyph.new();
		
		let layer1 = Lyph.new();
		let layer2 = Lyph.new();
		let layer3 = Lyph.new();
		
		lyph.layers.add(layer1);
		lyph.layers.add(layer2);
		lyph.layers.add(layer3);
		
		expect(new Set([...lyph['-->HasLayer']]::map('relativePosition')).size).to.equal(3);
		expect([...lyph['-->HasLayer']]::map('relativePosition')[0]).to.be.a('number');
		expect([...lyph['-->HasLayer']]::map('relativePosition')[1]).to.be.a('number');
		expect([...lyph['-->HasLayer']]::map('relativePosition')[2]).to.be.a('number');
		
	});
	
	it("(regression test: auto-synchronized border-natures?)", async () => {
		
		const {Lyph, Border} = module.classes;
		
		let lyph = Lyph.new();
		
		expect(new Set([
			[...lyph.longitudinalBorders][0].nature,
			[...lyph.longitudinalBorders][1].nature
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
