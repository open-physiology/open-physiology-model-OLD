import {describe, it, expect} from './test.helper';
import moduleFactory from '../src/index';
import {simpleMockHandlers}   from "./mock-handlers.helper";

describe("Entity classes", () => {
	
	let module, backend;
	beforeEach(() => {
		backend = simpleMockHandlers();
		module  = moduleFactory(backend.frontendInterface);
	});
	
	it("can list its possible subclasses", () => {
		const {Resource, ExternalResource, Type, Lyph} = module.classes;
		
		const resourceSubclasses = Resource.allSubclasses();
		
		expect([...resourceSubclasses]).to.contain(Resource);
		expect([...resourceSubclasses]).to.contain(ExternalResource);
		expect([...resourceSubclasses]).to.contain(Type);
		expect([...resourceSubclasses]).to.contain(Lyph);
	});
	
});
