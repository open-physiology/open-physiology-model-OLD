import {xdescribe, describe, it, expect} from './test.helper';
import moduleFactory from '../src/index';

describe("Entity classes", () => {
	
	let module;
	beforeEach(() => { module = moduleFactory() });
	
	it("can list its possible subclasses", () => {
		const {Resource, ExternalResource, Type, Lyph} = module.classes;
		
		const resourceSubclasses = Resource.allSubclasses();
		
		expect([...resourceSubclasses]).to.contain(Resource);
		expect([...resourceSubclasses]).to.contain(ExternalResource);
		expect([...resourceSubclasses]).to.contain(Type);
		expect([...resourceSubclasses]).to.contain(Lyph);
	});
	
});
