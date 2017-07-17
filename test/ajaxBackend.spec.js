import {describe, it, expect} from './test.helper';
import {Module}               from '../src/index';
import manifestFactory        from 'open-physiology-manifest';

import {pick} from 'lodash-bound';

import ajaxBackend from '../src/ajaxBackend';
import najax from 'najax';

const ajax = (...args) => Promise.resolve(najax(...args));


const BASE_URL = 'http://localhost:8888';

describe("ajaxBackend", () => {
    
    let backend, module, classes;
   	beforeEach(() => {
   		let manifest = manifestFactory();
   		({backend} = ajaxBackend({
            baseURL: BASE_URL,
            ajax:    najax
        }));
   		module = new Module({manifest, backend});
   		classes = module.entityClasses;
   	});
   	
    // NOTE: These tests only work if there's a server running on BASE_URL
   	
    it("can commit to the server", async () => {
        
        let blood = module.new({
            class: 'Material',
            name:   "Blood"
        });
        
        await module.commit();
        
        let response = JSON.parse(await ajax({
            url:         `${BASE_URL}/Material/${blood.id}`,
            method:      'GET',
            contentType: 'application/json'
        }));
        
        expect(response).to.have.a.lengthOf(1);
        
        let bloodResponse = response[0];
        
        expect(bloodResponse).to.have.property('id',     blood.id );
        expect(bloodResponse).to.have.property('class', 'Material');
        expect(bloodResponse).to.have.property('name',  "Blood"   );
    });
    
    it("can load from the server", async () => {
        
        const {Material} = classes;
        
        let address = JSON.parse(await ajax({
            url:         `${BASE_URL}/Material`,
            method:      'POST',
            contentType: 'application/json',
            data: {
                name: "Water"
            }
        }))[0]::pick('class', 'id');
        
        let water = await module.get(address);
        
        expect(water).to.be.an.instanceOf(Material);
        expect(water.name).to.equal("Water");
        
    });
    
});
