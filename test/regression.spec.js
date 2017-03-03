import {describe, expect} from './test.helper';
import moduleFactory from '../src/index';
import {simpleMockHandlers} from "./mock-handlers.helper";

import {map} from 'rxjs/operator/map';
import {take} from 'rxjs/operator/take';
import {toPromise} from 'rxjs/operator/toPromise';
import {filter} from '../src/util/bound-hybrid-functions';
import cloneDeep   from 'lodash-bound/cloneDeep';

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


    it("ReferenceError: RelShortcut$Field is not defined", async () => {

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

    it("Relationship resources in commit_new should have property 'class'", async () => {
        let environment = moduleFactory({
            async loadAll(cls, options = {}) {
                return [{
                    "name": "Kidney",
                    "href": "192.168.99.100://Lyph/17",
                    "id": 17,
                    "cardinalityBase": 1,
                    "class": "Lyph"
                }, {
                    "name": "Renal hilum",
                    "href": "192.168.99.100://Lyph/18",
                    "id": 18,
                    "cardinalityBase": 1,
                    "class": "Lyph"
                }];
            },
            async commit_new({commandType, values}) {
                values.href = `open-physiology.org/${values.class}/${1}`;
                expect(values[1]).to.have.property('class');
                expect(values[2]).to.have.property('class');
                return values;
            },
        });
        const {Lyph, HasLayer} = environment.classes;

        let lyphs = [...await Lyph.getAll()];
        expect(lyphs).to.have.length(2);
        let hasLayer = HasLayer.new({ 1: lyphs[0], 2: lyphs[1]});
        await hasLayer.commit();
    });

    it("toJSON() should not fail on relationships", async () => {
        const {Lyph, HasLayer} = environment.classes;
        let lyph1 = Lyph.new({name: "Kidney"});
        let lyph2 = Lyph.new({name: "Kidney lobus"});
        let hasLayer = HasLayer.new({ 1: lyph1, 2: lyph2});
        expect(::hasLayer.toJSON).not.to.throw;
    });

    it("Resource should be committed together with its relationships", async () => {
        const {Lyph, HasLayer} = environment.classes;

        let heart = Lyph.new({name: "Heart"});
        await heart.commit();

        let body = Lyph.new({ name: "Body", layers: [heart] });
        await body.commit();

        expect(backend.readAll()).to.include.something.with.property('class', 'HasLayer');
    });

    it("Problem with href while committing resources with relationships", async () => {
        let UID = 0;

        let environment = moduleFactory({
            async commit_new({values}) {
                expect(values).not.to.be.null;
                values = values::cloneDeep();
                values.id = ++UID;
                values.href = "open-physiology.org/" + UID;
                let result = backend.create(values, values.href);
                return result;
            },
            async load(addresses, options = {}) {
                return addresses.map(addr => backend.read(addr)::cloneDeep());
            },
            async loadAll(cls, options = {}) {
                return backend.readAll().filter(e => cls.hasSubclass(cls.environment.classes[e.class]))::cloneDeep();
            }
        });

        const {Measurable, Causality, IsCauseOf} = environment.classes;

        let measurable = Measurable.new({ name:  "Concentration of water"});
        let causality = Causality.new({ name:   "Functional dependency", cause:  measurable});

        await measurable.commit();
        await causality.commit();

        let isCauseOf = [...await IsCauseOf.getAll()][0];
        expect(isCauseOf).to.have.property(1).which.is.not.null;
        expect(isCauseOf).to.have.property(2).which.is.not.null;
        expect(isCauseOf[1].href).to.equal(measurable.href);
        expect(isCauseOf[2].href).to.equal(causality.href);
    });

    it("Canonical tree nodes should not duplicate", async() => {
        const model = environment.classes;

        /* canonical trees */
        let initial = {};
        initial.canonicalTree1 = model.CanonicalTree.new({
            name:  "SLN"});
        initial.canonicalTree1_2 = model.CanonicalTree.new({
            name:  "SLN tail 1"});
        initial.canonicalTreeBranch1_2 = model.CanonicalTreeBranch.new({
            name:  "SLN 1st level branch",
            parentTree: initial.canonicalTree1,
            childTree: initial.canonicalTree1_2
        });

        await initial.canonicalTree1.commit();
        await initial.canonicalTreeBranch1_2.commit();

        let nodes    = backend.readAll()::filter(v => v.class === 'CanonicalTree');
        let branches = backend.readAll()::filter(v => v.class === 'CanonicalTreeBranch');
        expect(nodes.length).to.be.equal(2);
        expect(branches.length).to.be.equal(1);

    });

    it("Lyphs with axis extracted as resources", async() => {
        const {Lyph, Border, Resource} = environment.classes;

        let border1 = Border.new({name: "Border 1", nature: "open"});
        let border2 = Border.new({name: "Border 2", nature: "closed"});
        let heart = Lyph.new({name: "Heart", longitudinalBorders: [border1, border2], axis: border1});
        await border1.commit();
        await border2.commit();
        await heart.commit();

        //Note: the error most likely is in toJSON() because without map(x => x.toJSON()) the test passes
        let resources = [...await Resource.getAll()].map(x => x.toJSON());
        let lyphs = resources.filter(x => x.class === "Lyph");
        expect(lyphs).to.have.length(1);
        expect(lyphs[0]).to.have.property('-->HasLongitudinalBorder');
        let borderRels = [...lyphs[0]['-->HasLongitudinalBorder']];
        expect(borderRels).to.have.length(2);
    });

    it("Some related relationship expectations", async () => {
        const {Lyph, Border, Resource} = environment.classes;

        let border1 = Border.new({name: "Border 1", nature: "open"});
        let border2 = Border.new({name: "Border 2", nature: "closed"});
        let heart = Lyph.new({name: "Heart", longitudinalBorders: [border2], axis: border1});
        await heart.commit();

        expect(backend.readAll().filter(x => x.class === 'Lyph')).to.have.length(1);
        expect(backend.readAll().filter(x => x.class === 'HasAxis')).to.have.length(1);
        expect(backend.readAll().filter(x => x.class === 'HasLongitudinalBorder')).to.have.length(1);
        expect(backend.readAll().filter(x => x.class === 'Border')).to.have.length(2);
    });

    it("Constraint violation while reconstructing resources", async () => {
        let environment = moduleFactory({
            async loadAll(cls, options = {}) {
                console.log("Extracting", cls.name);
                //There is no request for relationships, so this return accurately represents the situation at server
                return [{
                   name: 'Blood',
                   href: 'open-physiology.org/Type/2',
                   id: 2,
                   class: 'Type',
                   '<--DefinesType': { href: 'open-physiology.org/DefinesType/3', class: 'DefinesType' }
                }, {
                    name: 'Blood',
                    href: 'open-physiology.org/Material/1',
                    id: 1,
                    class: 'Material',
                    '-->DefinesType': {href: 'open-physiology.org/DefinesType/3', class: 'DefinesType'}
                }];
            }
        });

        const model = environment.classes;

        let resources = [...await model.Resource.getAll()].map(x => x.toJSON());
        expect(resources).to.have.length(2);

        //The following check fails in Rel1Field.js, val is a JSON object, not a model relationship
        //const hasCompatibleType = expectedRelationshipClass.hasInstance(val);
        //constraint(notGiven || hasCompatibleType

    });
});
