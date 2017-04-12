import {describe, expect} from './test.helper';
import moduleFactory from '../src/index';
import {simpleMockHandlers} from "./mock-handlers.helper";

import ajaxBackend from '../src/ajaxBackend';
import najax from 'najax';

describe("ajaxBackend", () => {

    let environment, backend, frontend;
    beforeEach(() => {
        let registerEnvironment;
        ({backend, frontend, registerEnvironment} = simpleMockHandlers());
        environment = moduleFactory(frontend);
        registerEnvironment(environment);
    });

    //TODO: make a mock server
    it("Test that ajaxBackend loads data from remote server", async () => {
        let {backend} = ajaxBackend({
            baseURL:     'http://open-physiology.org:8880',
            ajax:        najax
        });

        let environment = moduleFactory(backend);
        let model = environment.classes;
        //await expect(model.Resource.getAll()).to.be.fulfilled;
    })

});
