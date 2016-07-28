import {xdescribe, describe, it, expect} from './test.helper';

import {Resource, IsRelatedTo}   from '../src/modules/resources';
import {Type, Template, HasType} from '../src/modules/typed';
import {MaterialType, MaterialTemplate, ContainsMaterial} from '../src/index';

describe("integrated workflow", () => {
	
	it("can create new 'MaterialType's and link them", async () => {
		
		let blood = await MaterialType.new({
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
		
		let water = await MaterialType.new({
			name: "waiter"
		});

		expect(water).to.be.an.instanceof(MaterialType);
		expect(water).to.have.a.property('name', "waiter");
		
		water.name = "water";
		
		expect(water).to.have.a.property('name', "water");
		
		await water.rollback();
		
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
		await water.rollback();
		
		expect(water).to.have.a.property('id'  , waterId);
		expect(water).to.have.a.property('href', waterHref);
		expect(water).to.have.a.property('name', waterName);

		let bloodHasWater = await ContainsMaterial.new({
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
	
});
