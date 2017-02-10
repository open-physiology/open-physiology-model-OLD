import {regression, describe, expect} from './test.helper';
import moduleFactory from '../src/index';
import {simpleMockHandlers} from "./mock-handlers.helper";

import {map} from 'rxjs/operator/map';
import {take} from 'rxjs/operator/take';
import {toPromise} from 'rxjs/operator/toPromise';
import {filter} from '../src/util/bound-hybrid-functions';


describe("regression tests", () => {

	let environment, backend, frontend;
	beforeEach(() => {
		let registerEnvironment;
		({backend, frontend, registerEnvironment} = simpleMockHandlers());
		environment = moduleFactory(frontend);
		registerEnvironment(environment);
	});
    
	it("HasType[2] set to null?", async () => {
   		const {Group, Lyph, HasMaterial} = environment.classes;
   		
   		let lyph1 = Lyph.new();
   		let lyph2 = Lyph.new();
   		let group = Group.new();
   
   		group.elements.add(lyph1);
   		group.elements.add(lyph2);
   		
   		await lyph1.commit();
   		await lyph2.commit();
   		await group.commit();
   
   		expect([...group.elements]).to.eql([lyph1, lyph2]);
   		
   	});
   
	it("setting type in initializer fails at commit", async () => {
   		const {Lyph} = environment.classes;
   		let t1 = Lyph.new({ name: "Renal hilum" });
   		await t1.commit();
   		// await expect(t1.commit()).to.not.be.rejected;
   	});
   	
	it("trying to instantiate abstract class Has", async () => {
   		const {Lyph, HasPart} = environment.classes;
   		
   		let subLyph = Lyph.new(
   			{ name: 'Sublyph' },
   			{ createAxis: true, createRadialBorders: true }
   		);
   		
   		let layer1 = Lyph.new(
   	        { name: 'Vessel Wall' },
   		    { createRadialBorders: true }
   	    );
   		
   		let layer2 = Lyph.new({
   			name: 'Blood Layer',
   			parts: [ subLyph ]
   		}, { createRadialBorders: true });
   		
   		let bloodVessel = Lyph.new({
   			name: 'Blood Vessel',
   			layers: [ layer1, layer2 ]
   		}, { createAxis: true, createRadialBorders: true });
   		
   		expect(() => { layer1.parts.add(subLyph) }).not.to.throw();
   		
   		expect([...layer1.parts])   .to.include(subLyph);
   		expect([...layer1.children]).to.include(subLyph);
   		expect([...subLyph.parents]).to.include(layer1);
   		expect([...subLyph.parents]).to.include(layer2);
   		expect([...subLyph['<--HasPart']][0]).to.be.instanceOf(HasPart);
   		expect([...subLyph['<--Has']][0]).to.be.instanceOf(HasPart);
   		
   	});
   	
	it("relationship mismatch", async () => {
   		const {Lyph, Type} = environment.classes;
   		
   		let blood = Lyph.new({ name: "Blood" });
   		let bloodType = Type.new({ name: blood.name, definition: blood });
   		blood.types.add(bloodType);
   
   		await expect(blood.commit()).to.be.fulfilled;
   	});
   
   
	it("export manually defined plural", async () => {
   		const {Process, Causality} = environment.classes;
   
   		let process   = Process.new({ name: "Blood advection" });
   		let causality = Causality.new({});
   
   		expect(process.constructor).to.have.a.property('plural', "processes");
   		expect(causality.constructor).to.have.a.property('plural', "causalities");
   	});
	
	it("auto-synchronized border-natures?", async () => {
		
		const {Lyph, Border} = environment.classes;
		
		let lyph = Lyph.new();
		
		await new Promise((resolve) => { setTimeout(resolve, 1000) });
		
		expect(new Set([
			[...lyph.longitudinalBorders][0].nature,
			[...lyph.longitudinalBorders][1].nature
		]).size).to.equal(2);
		
		// To compare, this was the nature of the original bug.
		// The default value of properties was shared among entities:
		let singleArray = [];
		expect(new Set([
			singleArray,
			singleArray
		]).size).to.equal(1);
		
	});
    
    it("commit causality resource", async () => {
        const {Measurable, Causality} = environment.classes;

        let measurable1 = Measurable.new({ name: "Concentration of water" });
        let measurable2 = Measurable.new({ name: "Concentration of ion"   });

        let causality1 = Causality.new({
            name:  "Functional dependency",
            cause:  measurable1,
            effect: measurable2
        });

		await expect(measurable1.commit()).to.be.fulfilled;
		await expect(measurable2.commit()).to.be.fulfilled;
		await expect(causality1 .commit()).to.be.fulfilled;
    });
	
	
	it("\"This graph does not have a vertex ''\" error when retrieving existing lyph with borders", async () => {
		
		let environment = moduleFactory({
			async loadAll(cls, options = {}) {
				let results = [{
					"thickness": {
						"min": 0,
						"max": null
					},
					"length": {
						"min": 0,
						"max": null
					},
					"name": "Renal hilum",
					"href": "192.168.99.100://Lyph/18",
					"id": 18,
					"cardinalityBase": 1,
					"class": "Lyph",
					"<--Coalesces": [
						{
							"href": "192.168.99.100://Coalesces/83",
							"class": "Coalesces"
						}
					],
					"<--IncludesElement": [
						{
							"href": "192.168.99.100://IncludesElement/65",
							"class": "IncludesElement"
						}
					],
					"-->DefinesType": {
						"href": "192.168.99.100://DefinesType/55",
						"class": "DefinesType"
					},
					"<--HasLayer": [
						{
							"href": "192.168.99.100://HasLayer/42",
							"class": "HasLayer"
						}
					],
					"-->HasLongitudinalBorder": [
						{
							"href": "192.168.99.100://HasLongitudinalBorder/26",
							"class": "HasLongitudinalBorder"
						},
						{
							"href": "192.168.99.100://HasLongitudinalBorder/25",
							"class": "HasLongitudinalBorder"
						}
					]
				}];
				return results;
			}
		});
		const model = environment.classes;
		
		let lyphs = [...await model.Lyph.getAll()];
		
		expect(lyphs).to.have.length(1);
	});


	regression("ReferenceError: RelShortcut$Field is not defined", async () => {

		let environment = moduleFactory({
			async loadAll(cls, options = {}) {
				let results = [{
					"thickness": {
						"min": 0,
						"max": null
					},
					"length": {
						"min": 0,
						"max": null
					},
					"name": "Renal hilum",
					"href": "192.168.99.100://Lyph/18",
					"id": 18,
					"cardinalityBase": 1,
					"class": "Lyph"
				}];
				return results;
			}
		});
		const model = environment.classes;

		let lyphs = [...await model.Lyph.getAll()];
		let jsonLyphs = lyphs.map(lyph => lyph.toJSON());

		expect(lyphs).to.have.length(1);
	});


	regression("Delete resource", async () => {

		let environment = moduleFactory({
			async loadAll(cls, options = {}) {
				let results = [{
					"thickness": {
						"min": 0,
						"max": null
					},
					"length": {
						"min": 0,
						"max": null
					},
					"name": "Renal hilum",
					"href": "192.168.99.100://Lyph/18",
					"id": 18,
					"cardinalityBase": 1,
					"class": "Lyph"
				}];
				return results;
			}
		});
		const model = environment.classes;

		let lyphs = [...await model.Lyph.getAll()];
		expect(lyphs).to.have.length(1);

		await lyphs[0].delete();
	});

	regression("Relationship resources in commit_new have property class", async () => {

		let environment = moduleFactory({
			async loadAll(cls, options = {}) {
				let results = [{
						"name": "Kidney",
						"href": "192.168.99.100://Lyph/17",
						"id": 17,
						"cardinalityBase": 1,
						"class": "Lyph"
					},
					{
						"name": "Renal hilum",
						"href": "192.168.99.100://Lyph/18",
						"id": 18,
						"cardinalityBase": 1,
						"class": "Lyph"
				}];
				return results;
			},

			async commit_new({commandType, values}) {
				values.href = "open-physiology.org/" + values.class +"/" + 1;
				expect(values[1]).has.property("class");
				expect(values[2]).has.property("class");
				return values;
			},

		});
		const model = environment.classes;

		let lyphs = [...await model.Lyph.getAll()];
		expect(lyphs).to.have.length(2);

		let layer = model.HasLayer.new({ 1: lyphs[0], 2: lyphs[1]});
		//console.log("Layer", layer.toJSON());
		await layer.commit();

		expect(layer[1]).to.have.property("href");
		expect(layer[1]).to.have.property("class");
		expect(layer[2]).to.have.property("href");
		expect(layer[2]).to.have.property("class");
	});

	regression("toJSON() does not fail on relationships", async () => {

		const model = environment.classes;

		let lyph1 = model.Lyph.new({name: "Kidney"});
		let lyph2 = model.Lyph.new({name: "Kidney lobus"});
		let layer = model.HasLayer.new({ 1: lyph1, 2: lyph2});

		console.log("Layer", layer.toJSON());
	});
	
});
