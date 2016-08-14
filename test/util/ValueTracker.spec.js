import {xdescribe, describe, it, expect, beforeEach} from '../test.helper';

import ValueTracker, {property} from '../../src/util/ValueTracker';

import {Observable} from "rxjs/Observable";

describe("ValueTracker class", () => {
	
	let TestObject;
	let obj;
	let log;
	const record = (observable) => {
		expect(observable).to.be.an.instanceOf(Observable);
		observable.subscribe(::log.push);
	};
	
	beforeEach(() => {
		TestObject = class extends ValueTracker {
			
			@property({ initial: 0 }) x;
			@property({ initial: 1 }) y;
			@property({ initial: 2 }) z;
			
		};
		obj = new TestObject();
		log = [];
	});
	
	it("can build combinations with active and passive properties", () => {
		
		record( obj.p(['x', 'y'], ['z'], (x, y, z) => [x, y, z]) );

		expect(log).to.eql([ [0, 1, 2] ]);
		
		obj.y = 5;
		
		expect(log).to.eql([ [0, 1, 2] ,
		                     [0, 5, 2] ]);
		
		obj.z = 9;
		
		expect(log).to.eql([ [0, 1, 2] ,
		                     [0, 5, 2] ]);
		
		obj.y = 7;
		
		expect(log).to.eql([ [0, 1, 2] ,
		                     [0, 5, 2] ,
		                     [0, 7, 9] ]);
		
	});
	
	
	
});

