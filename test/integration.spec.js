import {xdescribe, describe, it, expect} from './test.helper';
import moduleFactory from '../src/index';

import ldFilter from 'lodash-bound/filter';

import {map} from 'rxjs/operator/map';
import {filter as rxFilter} from 'rxjs/operator/filter';
import {take} from 'rxjs/operator/take';
import {toPromise} from 'rxjs/operator/toPromise';
import {Observable} from 'rxjs/Observable';

function filter(pred) {
	if (this instanceof Observable) {
		return this::rxFilter(pred);
	} else {
		return this::ldFilter(pred);
	}
}

describe("integrated workflow", () => {
	
	let module;
	beforeEach(() => { module = moduleFactory() });
	
	it("can track available entities with a stream per class", async () => {

		const {Resource, Type, Material} = module.classes;

		let gathered_MaterialType  = new Set;
		let gathered_Type          = new Set;
		let gathered_Resource      = new Set;
		let committed_MaterialType = new Set;
		let committed_Type         = new Set;
		let committed_Resource     = new Set;

		Material.Type.p('all').subscribe((all) => { gathered_MaterialType = new Set([...all]::filter(t=>!t.isUniversalType)) });
		Type         .p('all').subscribe((all) => { gathered_Type         = new Set([...all]::filter(t=>!t.isUniversalType)) });
		Resource     .p('all').subscribe((all) => { gathered_Resource     = new Set([...all]::filter(t=>!t.isUniversalType)) });
		Material.Type.p('allCommitted').subscribe((all) => { committed_MaterialType = new Set([...all]::filter(t=>!t.isUniversalType)) });
		Type         .p('allCommitted').subscribe((all) => { committed_Type         = new Set([...all]::filter(t=>!t.isUniversalType)) });
		Resource     .p('allCommitted').subscribe((all) => { committed_Resource     = new Set([...all]::filter(t=>!t.isUniversalType)) });

		expect([...gathered_MaterialType]).to.eql([]);
		expect([...gathered_Type        ]).to.eql([]);
		expect([...gathered_Resource    ]).to.eql([]);

		let blood = Material.Type.new({
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

		let water = Material.Type.new({
			name: "water"
		});

		expect([...committed_MaterialType]).to.eql([blood]);
		expect([...committed_Type        ]).to.eql([blood]);
		expect([...committed_Resource    ]).to.eql([blood]);

		expect([...gathered_MaterialType]).to.eql([blood, water]);
		expect([...gathered_Type        ]).to.eql([blood, water]);
		expect([...gathered_Resource    ]).to.eql([blood, water]);

		expect([...Material.Type.getAll()]::filter(t=>!t.isUniversalType)).to.eql([blood, water]);
		expect([...Type         .getAll()]::filter(t=>!t.isUniversalType)).to.eql([blood, water]);
		expect([...Resource     .getAll()]::filter(t=>!t.isUniversalType)).to.eql([blood, water]);

		await water.commit();

		expect([...committed_MaterialType]).to.eql([blood, water]);
		expect([...committed_Type        ]).to.eql([blood, water]);
		expect([...committed_Resource    ]).to.eql([blood, water]);

		expect([...Material.Type.getAllCommitted()]::filter(t=>!t.isUniversalType)).to.eql([blood, water]);
		expect([...Type         .getAllCommitted()]::filter(t=>!t.isUniversalType)).to.eql([blood, water]);
		expect([...Resource     .getAllCommitted()]::filter(t=>!t.isUniversalType)).to.eql([blood, water]);

	});

	it("can create new 'MaterialType's and link them", async () => {
		const {Material, ContainsMaterial} = module.classes;

		let blood = Material.Type.new({
			name: "blood"
		});

		expect(blood).to.be.an.instanceof(Material.Type);
		expect(blood).to.have.a.property('id'  ).which.is.null;
		expect(blood).to.have.a.property('href').which.is.null;
		expect(blood).to.have.a.property('class', 'MaterialType');
		expect(blood).to.have.a.property('name', "blood");

		await blood.commit();

		expect(blood).to.have.a.property('id'  ).which.is.a('number');
		expect(blood).to.have.a.property('href').which.is.a('string');

		let water = Material.Type.new({
			name: "waiter"
		});

		expect(water).to.be.an.instanceof(Material.Type);
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

	it("can give default types to templates", async () => {
		const {Lyph} = module.classes;
		let heart = Lyph.Template.new({ name: 'heart' });

		expect(heart.type).to.be.instanceof(Lyph.Type);
		expect(heart.type).to.equal(Lyph.Type.getUniversalType());

		expect(Lyph.Type.getUniversalType()).to.equal(Lyph.getUniversalType());
	});

	it("(regression test: HasType[2] set to null?)", async () => {
		const {OmegaTree, CylindricalLyph, ContainsMaterial} = module.classes;

		let lyphType = CylindricalLyph.Type.new();
		lyphType.commit();

		let omegaTree = OmegaTree.Type.new();

		let lyphTemplate1 = CylindricalLyph.Template.new();

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
		const {CylindricalLyph} = module.classes;
		let renalH = CylindricalLyph.Type.new({ name: "Renal hilum" });
		await renalH.commit();
		let t1 = CylindricalLyph.Template.new({ name: "T: Renal hilum", type: renalH });
		await expect(t1.commit()).to.not.be.rejected;
	});

	it("(regression test 3: Missing 'treeParent' field in CylindricalLyphTemplate)", async () => {
		const {CylindricalLyph, OmegaTree} = module.classes;
		let lyphType     = CylindricalLyph.Type.new({});
		let lyphTemplate = CylindricalLyph.Template.new({ type: lyphType });

		expect(lyphTemplate.fields).to.have.a.property('treeParent');
		expect(lyphTemplate)       .to.have.a.property('treeParent');

		let treeType     = OmegaTree.Type.new();
		let treeTemplate = OmegaTree.Template.new({ type: treeType });
		lyphTemplate.treeParent = treeTemplate;

		expect([...treeTemplate.treeChildren]).to.include(lyphTemplate);

	});

	it("(regression test 4: no property called 'root'", async () => {
		const {OmegaTree} = module.classes;

		let tree = OmegaTree.Type.new({ name: "Tree" });

		expect(()=>tree.p('root')).not.to.throw();
	});

	it("(regression test 5: No property '...' exists.)", async () => {
		const {OmegaTree} = module.classes;
		
		let treeTypeP = OmegaTree.Type.p('all')
			::filter(s=>s.size > 0)
			::take(1)
			::map(s => [...s][0])
			::toPromise();
		
		let tree = OmegaTree.Template.new();
		
		let treeType = await treeTypeP;
			
		expect(treeType).to.be.instanceof(OmegaTree.Type);
		
		expect(() => treeType.p('root')).not.to.throw();
	});
	
});
