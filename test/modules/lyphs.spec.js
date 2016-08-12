import {xdescribe, describe, it, expect} from '../test.helper';

import moduleFactory from '../../src/modules/lyphs';


describe("'lyphs' Module", () => {
	
	let module;
	beforeEach(() => { module = moduleFactory() });
	
	it("exports the expected classes", () => {
		
		expect(module.classes).to.contain.resources(
			'Material',
			'Lyph',
			'CylindricalLyph',
			'Border',
			'Node',
			'Coalescence'
		);
		expect(module.classes).to.contain.relationships(
			'ContainsMaterial',
			'HasPart',
			'HasLayer',
			'HasPatch',
			'HasSegment',
			'HasInnerBorder',
			'HasOuterBorder',
			'HasMinusBorder',
			'HasPlusBorder',
			'ContainsNode',
			'Coalesces',
			'CoalescesThrough'
		);

	});

	it("exports classes that can be instantiated", async () => {
		
		const {
			Material,
			Lyph,
			CylindricalLyph,
			Border
		} = module.classes;
		
		let material        = Material.new();
		let lyph            = Lyph.new();
		let cylindricalLyph = CylindricalLyph.new();
		
		expect(material       ).to.be.an.instanceof(                       Material);
		expect(lyph           ).to.be.an.instanceof(                 Lyph, Material);
		expect(cylindricalLyph).to.be.an.instanceof(CylindricalLyph, Lyph, Material);
		
		expect(lyph.innerBorder).to.be.an.instanceof(Border);
		expect(lyph.outerBorder).to.be.an.instanceof(Border);
		expect(lyph.minusBorder).to.be.undefined;
		expect(lyph.plusBorder ).to.be.undefined;
		
		expect(cylindricalLyph.innerBorder).to.be.an.instanceof(Border);
		expect(cylindricalLyph.outerBorder).to.be.an.instanceof(Border);
		expect(cylindricalLyph.minusBorder).to.be.an.instanceof(Border);
		expect(cylindricalLyph.plusBorder ).to.be.an.instanceof(Border);
		
		expect(new Set([
			cylindricalLyph.innerBorder,
			cylindricalLyph.outerBorder,
			cylindricalLyph.minusBorder,
			cylindricalLyph.plusBorder
		]).size).to.equal(4);
		
	});
	
	it("exports classes that have the properties, relationships and relationshipShortcuts of their superclasses", () => {
		
		const {Lyph} = module.classes;
		
		expect(Lyph.properties           ).to.have.property('href');
		expect(Lyph.relationships        ).to.have.property('-->ContainsMaterial');
		expect(Lyph.relationshipShortcuts).to.have.property('materials');
		
	});
	
	it("(regression test: auto-synchronized border-natures?)", async () => {
		
		const {
			CylindricalLyph,
			Border
		} = module.classes;
		
		let cylindricalLyph = CylindricalLyph.new();
		
		expect(new Set([
			cylindricalLyph.innerBorder,
			cylindricalLyph.outerBorder,
			cylindricalLyph.minusBorder,
			cylindricalLyph.plusBorder
		]).size).to.equal(4);
		
		expect(cylindricalLyph.innerBorder.nature).to.eql(['open', 'closed']);
		
		cylindricalLyph.innerBorder.nature = ['open'];
		
		expect(cylindricalLyph.innerBorder.nature).to.eql(['open']);
		
		expect(cylindricalLyph.innerBorder.nature).to.eql(['open']);
		
	});
	
});
