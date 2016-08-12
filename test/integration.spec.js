import {xdescribe, describe, it, expect} from './test.helper';
import moduleFactory from '../src/index';

import {map} from 'rxjs/operator/map';
import {take} from 'rxjs/operator/take';
import {toPromise} from 'rxjs/operator/toPromise';

import {filter} from '../src/util/bound-hybrid-functions';


describe("integrated workflow", () => {
	
	let module;
	beforeEach(() => { module = moduleFactory() });
	
	it("can track available entities with a stream per class", async () => {

		const {Resource, Template, Material} = module.classes;

		let gathered_Materials  = new Set;
		let gathered_Templates  = new Set;
		let gathered_Resources  = new Set;
		let committed_Materials = new Set;
		let committed_Templates = new Set;
		let committed_Resources = new Set;

		Material.p('all')         .subscribe((all) => { gathered_Materials  = all });
		Template.p('all')         .subscribe((all) => { gathered_Templates  = all });
		Resource.p('all')         .subscribe((all) => { gathered_Resources  = all });
		Material.p('allCommitted').subscribe((all) => { committed_Materials = all });
		Template.p('allCommitted').subscribe((all) => { committed_Templates = all });
		Resource.p('allCommitted').subscribe((all) => { committed_Resources = all });

		expect([...gathered_Materials]).to.eql([]);
		expect([...gathered_Templates]).to.eql([]);
		expect([...gathered_Resources]).to.eql([]);

		let blood = Material.new({
			name: "blood"
		});

		expect([...committed_Materials]).to.eql([]);
		expect([...committed_Templates]).to.eql([]);
		expect([...committed_Resources]).to.eql([]);
		expect([...gathered_Materials ]).to.eql([blood]);
		expect([...gathered_Templates ]).to.eql([blood]);
		expect([...gathered_Resources ]).to.eql([blood]);

		await blood.commit();

		expect([...committed_Materials]).to.eql([blood]);
		expect([...committed_Templates]).to.eql([blood]);
		expect([...committed_Resources]).to.eql([blood]);

		let water = Material.new({
			name: "water"
		});

		expect([...committed_Materials]).to.eql([blood]);
		expect([...committed_Templates]).to.eql([blood]);
		expect([...committed_Resources]).to.eql([blood]);

		expect([...gathered_Materials]).to.eql([blood, water]);
		expect([...gathered_Templates]).to.eql([blood, water]);
		expect([...gathered_Resources]).to.eql([blood, water]);

		expect([...Material.getAll()]).to.eql([blood, water]);
		expect([...Template.getAll()]).to.eql([blood, water]);
		expect([...Resource.getAll()]).to.eql([blood, water]);

		await water.commit();

		expect([...committed_Materials]).to.eql([blood, water]);
		expect([...committed_Templates]).to.eql([blood, water]);
		expect([...committed_Resources]).to.eql([blood, water]);

		expect([...Material.getAllCommitted()]).to.eql([blood, water]);
		expect([...Template.getAllCommitted()]).to.eql([blood, water]);
		expect([...Resource.getAllCommitted()]).to.eql([blood, water]);

	});

	it("can create new Materials and link them", async () => {
		const {Material, HasMaterial} = module.classes;

		let blood = Material.new({
			name: "blood"
		});

		expect(blood).to.be.an.instanceof(Material);
		expect(blood).to.have.a.property('id'  ).which.is.null;
		expect(blood).to.have.a.property('href').which.is.null;
		expect(blood).to.have.a.property('class', 'Material');
		expect(blood).to.have.a.property('name', "blood");

		await blood.commit();

		expect(blood).to.have.a.property('id'  ).which.is.a('number');
		expect(blood).to.have.a.property('href').which.is.a('string');

		let water = Material.new({
			name: "waiter"
		});

		expect(water).to.be.an.instanceof(Material);
		expect(water).to.have.a.property('name', "waiter");

		water.name = "water";

		expect(water).to.have.a.property('name', "water");

		water.rollback();

		expect(water).to.have.a.property('id'  ).which.is.null;
		expect(water).to.have.a.property('href').which.is.null;
		expect(water).to.have.a.property('class', 'Material');
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

		let bloodHasWater = HasMaterial.new({
			1: blood,
			2: water
		});

		expect(bloodHasWater).to.have.property(1, blood);
		expect(bloodHasWater).to.have.property(2, water);
		expect([...blood['-->HasMaterial']]).to.include(bloodHasWater);
		expect([...blood.materials        ]).to.include(water        );
		expect(water['<--HasMaterial']).to.equal(bloodHasWater);

		expect(bloodHasWater).to.have.a.property('id'  ).which.is.null;
		expect(bloodHasWater).to.have.a.property('href').which.is.null;
		expect(bloodHasWater).to.have.a.property('class', 'HasMaterial');

		await bloodHasWater.commit();

		expect(bloodHasWater).to.have.a.property('id'  ).which.is.a('number');
		expect(bloodHasWater).to.have.a.property('href').which.is.a('string');

	});

	it("(regression test: HasType[2] set to null?)", async () => {
		const {OmegaTree, CylindricalLyph, HasMaterial} = module.classes;
		
		let lyph1 = CylindricalLyph.new();
		let lyph2 = CylindricalLyph.new();
		let omegaTree = OmegaTree.new();

		omegaTree.elements.add(lyph1);
		omegaTree.elements.add(lyph2);
		
		await lyph1.commit();
		await lyph2.commit();
		await omegaTree.commit();

		expect([...omegaTree.elements]).to.eql([lyph1, lyph2]);
		
	});

	it("(regression test 2: setting type in initializer fails at commit)", async () => {
		const {CylindricalLyph} = module.classes;
		let t1 = CylindricalLyph.new({ name: "Renal hilum" });
		await expect(t1.commit()).to.not.be.rejected;
	});

	it("(regression test 3: Missing 'treeParent' field in CylindricalLyphTemplate)", async () => {
		const {CylindricalLyph, OmegaTree} = module.classes;
		let lyph = CylindricalLyph.new();

		expect(lyph.fields).to.have.a.property('treeParent');
		expect(lyph)       .to.have.a.property('treeParent');

		let tree = OmegaTree.new();
		lyph.treeParent = tree;

		expect([...tree.treeChildren]).to.include(lyph);

	});

	it("(regression test 4: no property called 'root'", async () => {
		const {OmegaTree} = module.classes;

		let tree = OmegaTree.new({ name: "Tree" });

		expect(()=>tree.p('root')).not.to.throw();
	});

	it("(regression test 5: No property '...' exists.)", async () => {
		const {OmegaTree} = module.classes;
		
		let treeP = OmegaTree.p('all')
			::filter(s => s.size > 0)
			::take(1)
			::map(s => [...s][0])
			::toPromise();
		
		let tree = OmegaTree.new();
		
		let treeFromP = await treeP;
			
		expect(treeFromP).to.be.instanceof(OmegaTree);
		
		expect(() => treeFromP.p('root')).not.to.throw();
	});
	
});
