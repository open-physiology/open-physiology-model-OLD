import {describe, it, expect} from './test.helper';
import moduleFactory          from '../src/index';
import {simpleMockHandlers}   from "./mock-handlers.helper";

import entries from 'lodash-bound/entries';


describe("integrated workflow", () => {
	
	let module, backend;
	beforeEach(() => {
		backend = simpleMockHandlers();
		module  = moduleFactory(backend.frontendInterface);
	});
	
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

		water.rollback(); // NOTE: rolls back the creation of `water` too
		
		// TODO: verify that `water` was removed
		
		expect(waterType).to.have.a.property('definition').which.is.null;
		
		let newWater = Material.new({
			name: "water"
		});
		
		waterType.definition = newWater;

		await newWater.commit();
		await waterType.commit();

		expect(newWater).to.have.a.property('id'  ).which.is.a('number');
		expect(newWater).to.have.a.property('href').which.is.a('string');
		expect(newWater).to.have.a.property('name', "water");

		const {
			id:   waterId,
			href: waterHref,
			name: waterName
		} = newWater;

		newWater.rollback();

		expect(newWater).to.have.a.property('id'  , waterId  );
		expect(newWater).to.have.a.property('href', waterHref);
		expect(newWater).to.have.a.property('name', waterName);

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
	
	it("uses the Command design pattern", async () => {
		const {Lyph, Border} = module.classes;
		
		expect(backend.allStoredEntities()::entries()).to.have.length(0);
		
		let lyph = Lyph.new({
			name: "Lyph"
		});
		
		expect(backend.allStoredEntities()::entries()).to.have.length(0);
		
		await lyph.commit();
		
		expect(backend.allStoredEntities()::entries()).to.have.length(5);
		// ⬑ 1 lyph, 2 borders, 2 relationships
		
		// TODO: The commit cycle has a flaw; (INTERDEPENDENT NEW HREFs)
		//       If a lyph is committed, its borders also have to be committed,
		//       but both require a reference to the other while serialized,
		//       which has to be an href, which is right now only assigned
		//       one-by-one on the backend, so there's a kind of deadlock
		//       where neither can be committed because they are incomplete.
		//
		//       We need a batch REST operation which supports temporary hrefs,
		//       which the backend can then replace.
		
	});
	
});
