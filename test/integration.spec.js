import {xdescribe, describe, it, expect} from './test.helper';

import {Resource, IsRelatedTo}   from '../src/modules/resources';
import {Type, Template, HasType} from '../src/modules/typed';
import {Process} from '../src/modules/processes';
import {MaterialType, MaterialTemplate, ContainsMaterial} from '../src/index';

describe("integrated workflow", () => {
	
	
	
	it("can track available entities with a stream per class", async () => {
		// TODO: These tests have to come first, because otherwise the global
		//     : caches of the classes are already populated.
		//     : We need to make it more modular.
		
		let gathered_MaterialType = new Set;
		let gathered_Type         = new Set;
		let gathered_Resource     = new Set;
		
		MaterialType.p('all').subscribe((all) => { gathered_MaterialType = all });
		Type        .p('all').subscribe((all) => { gathered_Type         = all });
		Resource    .p('all').subscribe((all) => { gathered_Resource     = all });
		
		console.log([...gathered_MaterialType].join(', '))
		
		expect([...gathered_MaterialType]).to.eql([]);
		expect([...gathered_Type        ]).to.eql([]);
		expect([...gathered_Resource    ]).to.eql([]);
		
		let blood = MaterialType.new({
			name: "blood"
		});
		await blood.commit();
		
		expect([...gathered_MaterialType]).to.eql([blood]);
		expect([...gathered_Type        ]).to.eql([blood]);
		expect([...gathered_Resource    ]).to.eql([blood]);
		
		let water = MaterialType.new({
			name: "water"
		});
		await water.commit();
		
		expect([...gathered_MaterialType]).to.eql([blood, water]);
		expect([...gathered_Type        ]).to.eql([blood, water]);
		expect([...gathered_Resource    ]).to.eql([blood, water]);
		
		expect([...MaterialType.getAll()]).to.eql([blood, water]);
		expect([...Type        .getAll()]).to.eql([blood, water]);
		expect([...Resource    .getAll()]).to.eql([blood, water]);
		
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
	
});
