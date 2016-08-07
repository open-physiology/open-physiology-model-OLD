import {xdescribe, describe, it, expect} from './test.helper';
import {MaterialType, MaterialTemplate, ContainsMaterial, MeasurableType} from '../src/index';

import {Resource, IsRelatedTo}   from '../src/modules/resources';
import {Type, Template, HasType} from '../src/modules/typed';
import {Process} from '../src/modules/processes';
import {Lyph, CylindricalLyph} from '../src/modules/lyphs';
import {OmegaTree} from '../src/modules/omegaTrees';

describe("integrated workflow", () => {
	
	it("can track available entities with a stream per class", async () => {
		// TODO: These tests have to come first, because otherwise the global
		//     : caches of the classes are already populated.
		//     : We need to make it more modular.
		
		let gathered_MaterialType  = new Set;
		let gathered_Type          = new Set;
		let gathered_Resource      = new Set;
		let committed_MaterialType = new Set;
		let committed_Type         = new Set;
		let committed_Resource     = new Set;
		
		MaterialType.p('all').subscribe((all) => { gathered_MaterialType = all });
		Type        .p('all').subscribe((all) => { gathered_Type         = all });
		Resource    .p('all').subscribe((all) => { gathered_Resource     = all });
		MaterialType.p('allCommitted').subscribe((all) => { committed_MaterialType = all });
		Type        .p('allCommitted').subscribe((all) => { committed_Type         = all });
		Resource    .p('allCommitted').subscribe((all) => { committed_Resource     = all });
		
		expect([...gathered_MaterialType]).to.eql([]);
		expect([...gathered_Type        ]).to.eql([]);
		expect([...gathered_Resource    ]).to.eql([]);
		
		let blood = MaterialType.new({
			name: "blood"
		});
		
		expect([...committed_MaterialType]).to.eql([]);
		expect([...committed_Type        ]).to.eql([]);
		expect([...committed_Resource    ]).to.eql([]);
		expect([...gathered_MaterialType]).to.eql([blood]);
		expect([...gathered_Type        ]).to.eql([blood]);
		expect([...gathered_Resource    ]).to.eql([blood]);
		
		await blood.commit();
		
		expect([...committed_MaterialType]).to.eql([blood]);
		expect([...committed_Type        ]).to.eql([blood]);
		expect([...committed_Resource    ]).to.eql([blood]);
		
		let water = MaterialType.new({
			name: "water"
		});
		
		expect([...committed_MaterialType]).to.eql([blood]);
		expect([...committed_Type        ]).to.eql([blood]);
		expect([...committed_Resource    ]).to.eql([blood]);
		
		expect([...gathered_MaterialType]).to.eql([blood, water]);
		expect([...gathered_Type        ]).to.eql([blood, water]);
		expect([...gathered_Resource    ]).to.eql([blood, water]);
		
		expect([...MaterialType.getAll()]).to.eql([blood, water]);
		expect([...Type        .getAll()]).to.eql([blood, water]);
		expect([...Resource    .getAll()]).to.eql([blood, water]);
		
		await water.commit();
		
		expect([...committed_MaterialType]).to.eql([blood, water]);
		expect([...committed_Type        ]).to.eql([blood, water]);
		expect([...committed_Resource    ]).to.eql([blood, water]);
		
		expect([...MaterialType.getAllCommitted()]).to.eql([blood, water]);
		expect([...Type        .getAllCommitted()]).to.eql([blood, water]);
		expect([...Resource    .getAllCommitted()]).to.eql([blood, water]);
				
	});
	
	it("can create new 'MaterialType's and link them", async () => {
		
		let blood = MaterialType.new({
			name: "blood"
		});
		
		expect(blood).to.be.an.instanceof(MaterialType);
		expect(blood).to.have.a.property('id'  ).which.is.null;
		expect(blood).to.have.a.property('href').which.is.null;
		expect(blood).to.have.a.property('class', 'MaterialType');
		expect(blood).to.have.a.property('name', "blood");
		
		await blood.commit();

		expect(blood).to.have.a.property('id'  ).which.is.a('number');
		expect(blood).to.have.a.property('href').which.is.a('string');
		
		let water = MaterialType.new({
			name: "waiter"
		});

		expect(water).to.be.an.instanceof(MaterialType);
		expect(water).to.have.a.property('name', "waiter");

		water.name = "water";

		expect(water).to.have.a.property('name', "water");

		water.rollback();

		expect(water).to.have.a.property('id'  ).which.is.null;
		expect(water).to.have.a.property('href').which.is.null;
		expect(water).to.have.a.property('class', 'MaterialType');
		expect(water).to.have.a.property('name', "waiter");

		water.name = "water";
		
		await water.commit();
		
		expect(water).to.have.a.property('id'  ).which.is.a('number');
		expect(water).to.have.a.property('href').which.is.a('string');
		expect(water).to.have.a.property('name', "water");
		
		const {
			id:   waterId,
			href: waterHref,
			name: waterName
		} = water;
		
		water.rollback();

		expect(water).to.have.a.property('id'  , waterId  );
		expect(water).to.have.a.property('href', waterHref);
		expect(water).to.have.a.property('name', waterName);
		
		let bloodHasWater = ContainsMaterial.new({
			1: blood,
			2: water
		});
		
		expect(bloodHasWater).to.have.property(1, blood);
		expect(bloodHasWater).to.have.property(2, water);
		expect([...blood['-->ContainsMaterial']]).to.include(bloodHasWater);
		expect([...blood.materials             ]).to.include(water        );
		expect([...water['<--ContainsMaterial']]).to.include(bloodHasWater);

		expect(bloodHasWater).to.have.a.property('id'  ).which.is.null;
		expect(bloodHasWater).to.have.a.property('href').which.is.null;
		expect(bloodHasWater).to.have.a.property('class', 'ContainsMaterial');

		await bloodHasWater.commit();

		expect(bloodHasWater).to.have.a.property('id'  ).which.is.a('number');
		expect(bloodHasWater).to.have.a.property('href').which.is.a('string');
		
	});
	
	it("(regression test: HasType[2] set to null?)", async () => {
		
		let lyphType = CylindricalLyph.Type.new();
		lyphType.commit();
		
		let omegaTree = OmegaTree.Type.new();
		
		let lyphTemplate1 = CylindricalLyph.Template.new();
		
		lyphTemplate1.p('type').subscribe((type) => {
			console.log(''+type);
		});
		
		omegaTree.elements.add(lyphTemplate1);
		
		let lyphTemplate2 = CylindricalLyph.Template.new();
		omegaTree.elements.add(lyphTemplate2);
		
		lyphTemplate1.type = lyphType;
		lyphTemplate2.type = lyphType;
		
		await lyphTemplate1.commit();
		await lyphTemplate2.commit();
		await omegaTree.commit();
		
		expect([...omegaTree.elements]).to.eql([lyphTemplate1, lyphTemplate2]);
		
		expect(lyphTemplate1.type).to.equal(lyphType);
		expect(lyphTemplate2.type).to.equal(lyphType);
		
		
		let lyphType2 = CylindricalLyph.Type.new();
		lyphType2.commit();
		
		lyphTemplate1.type = lyphType2;
		
		expect(lyphTemplate1.type).to.equal(lyphType2);
		
		lyphTemplate1.type = undefined;
		
		expect(lyphTemplate1.type).to.equal(null);
		
	});
	
	it("(regression test 2: setting type in initializer fails at commit)", async () => {
		let renalH = CylindricalLyph.Type.new({ name: "Renal hilum" });
		await renalH.commit();
		let t1 = CylindricalLyph.Template.new({ name: "T: Renal hilum", type: renalH });
		await expect(t1.commit()).to.not.be.rejected;
	});
	
	it("(regression test 3: Missing 'treeParent' field in CylindricalLyphTemplate)", async () => {
		let lyphType     = CylindricalLyph.Type.new({});
		let lyphTemplate = CylindricalLyph.Template.new({ type: lyphType });
		
		expect(lyphTemplate.fields).to.have.a.property('treeParent');
		expect(lyphTemplate)       .to.have.a.property('treeParent');
		
		let treeType     = OmegaTree.Type.new();
		let treeTemplate = OmegaTree.Template.new({ type: treeType });
		lyphTemplate.treeParent = treeTemplate;
		
		expect([...treeTemplate.treeChildren]).to.include(lyphTemplate);
		
	});
	
});
