import {describe, it, expect} from './test.helper';
import moduleFactory from '../src/index';

import {map} from 'rxjs/operator/map';
import {take} from 'rxjs/operator/take';
import {toPromise} from 'rxjs/operator/toPromise';
import {filter} from '../src/util/bound-hybrid-functions';

describe("regression tests", () => {

    let module;
    beforeEach(() => { module = moduleFactory() });
    
    it("(regression 1: HasType[2] set to null?)", async () => {
   		const {OmegaTree, Lyph, HasMaterial} = module.classes;
   		
   		let lyph1 = Lyph.new();
   		let lyph2 = Lyph.new();
   		let omegaTree = OmegaTree.new();
   
   		omegaTree.elements.add(lyph1);
   		omegaTree.elements.add(lyph2);
   		
   		await lyph1.commit();
   		await lyph2.commit();
   		await omegaTree.commit();
   
   		expect([...omegaTree.elements]).to.eql([lyph1, lyph2]);
   		
   	});
   
   	it("(regression 2: setting type in initializer fails at commit)", async () => {
   		const {Lyph} = module.classes;
   		let t1 = Lyph.new({ name: "Renal hilum" });
   		await t1.commit();
   		// await expect(t1.commit()).to.not.be.rejected;
   	});
   
   	it("(regression 3: Missing 'treeParent' field in Lyph)", async () => {
   		const {Lyph, OmegaTree} = module.classes;
   		let lyph = Lyph.new();
   
   		expect(lyph.fields).to.have.a.property('treeParent');
   		expect(lyph)       .to.have.a.property('treeParent');
   
   		let tree = OmegaTree.new();
   		lyph.treeParent = tree;
   
   		expect([...tree.treeChildren]).to.include(lyph);
   
   	});
   
   	it("(regression 4: no property called 'root'", async () => {
   		const {OmegaTree} = module.classes;
   
   		let tree = OmegaTree.new({ name: "Tree" });
   
   		expect(()=>tree.p('root')).not.to.throw();
   	});
   
   	it("(regression 5: No property '...' exists.)", async () => {
   		const {OmegaTree} = module.classes;
   		
   		let treeP = OmegaTree.p('all')
   			::filter(s => s.size > 0)
   			::take(1)
   			::map(s => [...s][0])
   			::toPromise();
   		
   		let tree = OmegaTree.new();
   		
   		let treeFromP = await treeP;
   			
   		expect(treeFromP).to.be.instanceOf(OmegaTree);
   		
   		expect(() => treeFromP.p('root')).not.to.throw();
   	});
   	
   	it("(regression 6: Trying to instantiate abstract class Has.)", async () => {
   		const {Lyph, HasPart} = module.classes;
   		
   		let sublyph = Lyph.new(
   			{ name: 'Sublyph' },
   			{ createAxis: true, createRadialBorders: true }
   		);
   		
   		let layer1 = Lyph.new(
   	        { name: 'Vessel Wall' },
   		    { createRadialBorders: true }
   	    );
   		
   		let layer2 = Lyph.new({
   			name: 'Blood Layer',
   			parts: [ sublyph ]
   		}, { createRadialBorders: true });
   		
   		let bloodVessel = Lyph.new({
   			name: 'Blood Vessel',
   			layers: [ layer1, layer2 ]
   		}, { createAxis: true, createRadialBorders: true });
   		
   		expect(() => { layer1.parts.add(sublyph) }).not.to.throw();
   		
   		expect([...layer1.parts])   .to.include(sublyph);
   		expect([...layer1.children]).to.include(sublyph);
   		expect([...sublyph.parents]).to.include(layer1);
   		expect([...sublyph.parents]).to.include(layer2);
   		expect([...sublyph['<--HasPart']][0]).to.be.instanceOf(HasPart);
   		expect([...sublyph['<--Has']][0]).to.be.instanceOf(HasPart);
   		
   	});
   	
   	it("(regression 7: Relationship mismatch)", async () => {
   		const {Lyph, Type} = module.classes;
   		
   		let blood = Lyph.new({ name: "Blood" });
   		let bloodType = Type.new({ name: blood.name, definition: blood });
   		blood.types.add(bloodType);
   
   		await expect(blood.commit()).to.be.fulfilled;
   	});
   
   
   	it("(regression 8: Export manually defined plural)", async () => {
   		const {Process, Causality} = module.classes;
   
   		let process   = Process.new({ name: "Blood advection" });
   		let causality = Causality.new({});
   
   		expect(process.constructor).to.have.a.property('plural', "processes");
   		expect(causality.constructor).to.have.a.property('plural', "causalities");
   	});
	
	it("(regression test 9: auto-synchronized border-natures?)", async () => {
		
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
    
    it("(regression 10: commit causality resource)", async () => {
        const {Measurable, Causality} = module.classes;

        let measurable1 =  Measurable.new({ name: "Concentration of water" });
        let measurable2 =  Measurable.new({ name: "Concentration of ion" });

        let causality1 = Causality.new({
            name:   "Functional dependency",
            cause:  measurable1,
            effect: measurable2
        });

        expect(() => { measurable1.commit()}).not.to.throw();
        expect(() => { measurable2.commit()}).not.to.throw();
        expect(() => { causality1.commit()}).not.to.throw();

    });

});
