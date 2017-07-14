import {describe, it, expect} from './test.helper';
import {Module}               from '../src/index';
import manifestFactory        from 'open-physiology-manifest';
import {simpleMockHandlers}   from './mock-handlers.helper';


describe("Module instance", () => {
	
	let storage, backend, module, classes;
	beforeEach(() => {
		let manifest = manifestFactory();
		({storage, backend} = simpleMockHandlers());
		module = new Module({manifest, backend});
		classes = module.entityClasses;
	});
	
	
	it("has resource classes from the manifest in it", () => {
		
		expect(classes).to.be.an('Object');
		
		const {Entity, Material, Lyph} = classes;
		
		expect(Material).to.be.subclassOf(Entity);
		expect(Lyph).to.be.subclassOf(Entity, Material);
		
	});
	
	it("can create new resources and track them (uncommitted)", async () => {
		
		const {Entity, Material, Lyph} = classes;
		
		let water = module.new({ class: 'Material', name: "Water" });
		
		expect(water).to.be.instanceOf(Material);
		
		let [waterRetrieved] = await module.get([{ class: 'Material', id: water.id }]);
		
		expect(waterRetrieved).to.equal(water);
		
	});
	
	it("can delete resources (uncommitted)", async () => {
		
		const {Entity, Material, Lyph} = classes;
		
		let water = module.new({ class: 'Material', name: "Water" });
		
		water.delete();
		
		let [waterRetrieved] = await module.get([{ class: 'Material', id: water.id }]);
		
		expect(waterRetrieved).to.be.null;
		
	});
	
	it("can commit, giving resources new ids", async () => {
		
		const {Entity, Material, Lyph} = classes;
		
		let water = module.new({ class: 'Material', name: "Water" });
		
		expect(water.id).to.be.lessThan(0);
		
		await module.commit();
		
		expect(water.id).to.be.greaterThan(0);
		
		let storedJSON = storage.readAll();
		expect(storedJSON).to.eql([{
			class: 'Material',
			id: water.id,
			name: "Water"
		}]);
		
		let [waterRetrieved] = await module.get([{ class: 'Material', id: water.id }]);
		expect(waterRetrieved).to.equal(water);
		
	});
	
	it("can rollback, making resources un-exist", async () => {
		
		const {Entity, Material, Lyph} = classes;
		
		let water = module.new({ class: 'Material', name: "Water" });
		
		expect(water.deleted).to.be.false;
		
		module.rollback();
		
		expect(water.deleted).to.be.true;
		
		let [waterRetrieved] = await module.get([{ class: 'Material', id: water.id }]);
		
		expect(waterRetrieved).to.be.null;
		
	});
	
	it("can commit relationships", async () => {
		
		const {Entity, Material, Lyph, Type} = classes;
		
		let water = module.new({ class: 'Material', name: "Water" });
		
		let waterType = module.new({ class: 'Type', definition: water });
		
		expect(water.id)    .to.be.lessThan(0);
		expect(waterType.id).to.be.lessThan(0);
		expect(water.id).to.not.equal(waterType.id);
		
		await module.commit();
		
		expect(water.id)    .to.be.greaterThan(0);
		expect(waterType.id).to.be.greaterThan(0);
		expect(water.id).to.not.equal(waterType.id);
		
		let storedJSON = storage.readAll();
		
		expect(storedJSON).to.have.lengthOf(2);
		expect(storedJSON.filter(o=>o.id === water.id)[0]).to.eql({
			class: 'Material',
		    id: water.id,
		    name: 'Water',
		    '-->HasType':     [ { class: 'Type', id: waterType.id } ],
		    '-->DefinesType':   { class: 'Type', id: waterType.id }
		});
		expect(storedJSON.filter(o=>o.id === waterType.id)[0]).to.eql({
			class: 'Type',
		    id: waterType.id,
		    '<--HasType':     [ { class: 'Material', id: water.id } ],
		    '<--DefinesType':   { class: 'Material', id: water.id }
		});

		let [waterRetrieved] = await module.get([{ class: 'Material', id: water.id }]);
		expect(waterRetrieved).to.equal(water);
		
		let [waterTypeRetrieved] = await module.get([{ class: 'Type', id: waterType.id }]);
		expect(waterTypeRetrieved).to.equal(waterType);
		
	});
	
	it("can load entities from the backend", async () => {
		
		const {Entity, Material, Lyph, Type} = classes;
		
		storage.create({
			class: 'Material',
		    id: 1,
		    name: 'Water',
		    '-->HasType':     [ { class: 'Type', id: 2 } ],
		    '-->DefinesType':   { class: 'Type', id: 2 }
		});
		storage.create({
			class: 'Type',
		    id: 2,
		    '<--HasType':     [ { class: 'Material', id: 1 } ],
		    '<--DefinesType':   { class: 'Material', id: 1 }
		});
		
		let [waterTypeRetrieved] = await module.getAll({ class: 'Type' });
		expect(waterTypeRetrieved).to.be.instanceof(Type);
		
		let water = waterTypeRetrieved.definition;
		expect(water).to.be.instanceof(Material);
		expect(water.isPlaceholder).to.be.true;
		
		let [waterRetrieved] = await module.get([{ class: water.class, id: water.id }]);
		expect(waterRetrieved).to.equal(water);
		expect(water.isPlaceholder).to.be.false;
		
	});
	
});
