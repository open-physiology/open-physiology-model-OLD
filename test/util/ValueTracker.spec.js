import {xdescribe, describe, it, expect, beforeEach} from '../test.helper';

import ValueTracker, {property} from '../../src/util/ValueTracker';

import {Observable} from "rxjs/Observable";

describe("ValueTracker class", () => {
	
	let Vector;
	let log;
	const record = (observable) => {
		expect(observable).to.be.an.instanceOf(Observable);
		observable.subscribe(::log.push);
	};
	
	beforeEach(() => {
		Vector = class extends ValueTracker {
			
			@property({ initial: 0 }) x;
			@property({ initial: 1 }) y;
			@property({ initial: 2 }) z;
			
			// constructor(name) {
			// 	super();
			// 	this.name = name;
			// }
			
		};
		log = [];
	});
	
	it("can build combinations with active and passive properties", () => {
		
		let obj = new Vector();
		
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
	
	it("can build dynamically linked event chains", async () => {
		
		class Passenger extends ValueTracker {
			@property({}) carriage;
		}
		
		let carriage1 = new Vector();
		let carriage2 = new Vector();
		let passenger = new Passenger();
		
		record( passenger.p('carriage.x') );
		
		expect(log).to.eql([]);
		
		passenger.carriage = carriage1;
		
		expect(log).to.eql([ 0 ]);
		
		carriage1.x = 22;
		
		expect(log).to.eql([ 0, 22 ]);
		
		passenger.carriage = carriage2;
		
		carriage2.x = 42;
		
		expect(log).to.eql([ 0, 22, 0, 42 ]);
		
		carriage1.x = 999;
		 
		expect(log).to.eql([ 0, 22, 0, 42 ]);
		
		passenger.carriage = carriage1;
		
		expect(log).to.eql([ 0, 22, 0, 42, 999 ]);
		
		passenger.carriage = null;
		
		expect(log).to.eql([ 0, 22, 0, 42, 999 ]);
		
		passenger.carriage = carriage1;
		
		expect(log).to.eql([ 0, 22, 0, 42, 999, 999 ]);
		
	});
	
	
	
});

