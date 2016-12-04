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
		const {Material, ContainsMaterial, Type} = module.classes;

		let blood = Material.new({
			name: "blood"
		});

		expect(blood).to.be.an.instanceOf(Material);
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
		let waterType = Type.new({
			definition: water
		});
		
		expect(waterType).to.be.instanceOf(Material.Type);

		expect(water).to.be.an.instanceOf(Material);
		expect(water).to.have.a.property('name', "waiter");
		expect(waterType).to.have.a.property('definition', water);

		water.name = "water";

		expect(water).to.have.a.property('name', "water");

		water.rollback();

		expect(water).to.have.a.property('id'  ).which.is.null;
		expect(water).to.have.a.property('href').which.is.null;
		expect(water).to.have.a.property('class', 'Material');
		expect(water).to.have.a.property('name', "waiter");
		expect(waterType).to.have.a.property('definition').which.is.null;

		water.name = "water";
		waterType.definition = water;

		await water.commit();
		await waterType.commit();

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
			2: waterType
		});

		expect(bloodHasWater).to.have.property(1, blood);
		expect(bloodHasWater).to.have.property(2, waterType);
		expect([...blood    ['-->ContainsMaterial']]).to.include(bloodHasWater);
		expect([...blood    .materials            ] ).to.include(waterType    );
		expect([...waterType['<--ContainsMaterial']]).to.include(bloodHasWater);

		expect(bloodHasWater).to.have.a.property('id'  ).which.is.null;
		expect(bloodHasWater).to.have.a.property('href').which.is.null;
		expect(bloodHasWater).to.have.a.property('class', 'ContainsMaterial');

		await bloodHasWater.commit();
	
		expect(bloodHasWater).to.have.a.property('id'  ).which.is.a('number');
		expect(bloodHasWater).to.have.a.property('href').which.is.a('string');

	});
	
	it("(regression test: HasType[2] set to null?)", async () => {
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

	it("(regression test 2: setting type in initializer fails at commit)", async () => {
		const {Lyph} = module.classes;
		let t1 = Lyph.new({ name: "Renal hilum" });
		await t1.commit();
		// await expect(t1.commit()).to.not.be.rejected;
	});

	it("(regression test 3: Missing 'treeParent' field in Lyph)", async () => {
		const {Lyph, OmegaTree} = module.classes;
		let lyph = Lyph.new();

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
			
		expect(treeFromP).to.be.instanceOf(OmegaTree);
		
		expect(() => treeFromP.p('root')).not.to.throw();
	});
	
	it("(regression test 6: Trying to instantiate abstract class Has.)", async () => {
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
	
	it("(regression test 7: Relationship mismatch)", async () => {
		const {Lyph, Type} = module.classes;
		
		let blood = Lyph.new({ name: "Blood" });
		let bloodType = Type.new({ name: blood.name, definition: blood });
		blood.types.add(bloodType);

		await expect(blood.commit()).to.be.fulfilled;
	});


	it("(regression test 8: Export manually defined plural)", async () => {
		const {Process, Causality} = module.classes;

		let process   = Process.new({ name: "Blood advection" });
		let causality = Causality.new({});

		expect(process.constructor).to.have.a.property('plural', "processes");
		expect(causality.constructor).to.have.a.property('plural', "causalities");
	});

});
