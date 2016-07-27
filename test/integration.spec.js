import {xdescribe, describe, it, expect} from './test.helper';

import {Resource, IsRelatedTo}   from '../src/modules/resources';
import {Type, Template, HasType} from '../src/modules/typed';
import {Material, MaterialType, MaterialTemplate, ContainsMaterial} from '../src/modules/lyphs';

describe("integrated workflow", () => {
	
	it("guarantees that X.Type === XType", () => {
		expect(Material.Type).to.equal(MaterialType);
	});
	
	it("guarantees that X.Template === XTemplate", () => {
		expect(Material.Template).to.equal(MaterialTemplate);
	});
	
	it("can create new 'Material.Type's and link them", async () => {
		
		let blood = await Material.Type.new({
			name: "blood"
		});
		
		expect(blood).to.be.an.instanceof(Material.Type);
		expect(blood).to.have.a.property('name', "blood");

		let water = await Material.Type.new({
			name: "waiter"
		});

		expect(water).to.be.an.instanceof(Material.Type);

		expect(water).to.have.a.property('name', "waiter");

		water.name = "water";

		expect(water).to.have.a.property('name', "water");

		await water.rollback();

		expect(water).to.have.a.property('name', "waiter");

		water.name = "water";
		await water.commit();
		await water.rollback();

		expect(water).to.have.a.property('name', "water");

		let bloodHasWater = await ContainsMaterial.new({
			1: blood,
			2: water
		});
		
		expect(bloodHasWater).to.have.property(1, blood);
		expect(bloodHasWater).to.have.property(2, water);
		
		expect([...blood['-->ContainsMaterial']]).to.include(bloodHasWater);
		expect([...blood.materials             ]).to.include(water        );
		
	});
	
});
