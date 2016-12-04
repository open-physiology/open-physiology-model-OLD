/**
 * Created by Natallia on 12/4/2016.
 */
import {describe, it, expect} from './test.helper';
import moduleFactory from '../src/index';

describe("regression tests", () => {

    let module;
    beforeEach(() => { module = moduleFactory() });

    it("(regression test 1: commit causality resource)", async () => {
        const {Measurable, Causality} = module.classes;

        let measurable1 =  Measurable.new({ name: "Concentration of water" });
        let measurable2 =  Measurable.new({ name: "Concentration of ion" });

        let causality1 = Causality.new({
            name:   "Functional dependency",
            cause:  measurable1,
            effect: measurable2
        });

        expect(() => { measurable1.commit()}).not.to.throw();
        expect(() => { measurable2.commit()}).not.to.throw();
        expect(() => { causality1.commit()}).not.to.throw();

    });

});
