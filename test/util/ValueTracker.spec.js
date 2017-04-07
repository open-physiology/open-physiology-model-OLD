import {describe, it, expect, beforeEach} from '../test.helper';

import {ValueTracker, property} from 'utilities';

import {Observable} from "rxjs/Observable";

describe("ValueTracker class", () => {
	
	let Vector;
	let log;
	const record = (observable) => {
		expect(observable).to.be.an.instanceOf(Observable);
		observable.subscribe((v) => {
			log.push(v);
		});
	};
	
	beforeEach(() => {
		Vector = class Vector extends ValueTracker {
			
			@property({ initial: 0 }) x;
			@property({ initial: 1 }) y;
			@property({ initial: 2 }) z;
			
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
	
	it("can build loosely linked event chains", async () => {

		class Passenger extends ValueTracker {
			@property({}) carriage;
		}

		let carriage1 = new Vector();
		let carriage2 = new Vector();
		let passenger = new Passenger();

		record( passenger.p('carriage?.x') );

		expect(log).to.eql([ null ]);

		passenger.carriage = carriage1;

		expect(log).to.eql([ null, 0 ]);

		carriage1.x = 22;

		expect(log).to.eql([ null, 0, 22 ]);

		passenger.carriage = carriage2;

		carriage2.x = 42;

		expect(log).to.eql([ null, 0, 22, 0, 42 ]);

		carriage1.x = 999;

		expect(log).to.eql([ null, 0, 22, 0, 42 ]);

		passenger.carriage = carriage1;

		expect(log).to.eql([ null, 0, 22, 0, 42, 999 ]);

		passenger.carriage = null;

		expect(log).to.eql([ null, 0, 22, 0, 42, 999, null ]);

		passenger.carriage = carriage1;

		expect(log).to.eql([ null, 0, 22, 0, 42, 999, null, 999 ]);

	});
	
	// it("can build dynamically linked event chains", async () => {
	//
	// 	class Passenger extends ValueTracker {
	// 		@property({}) carriage;
	// 	}
	//
	// 	let carriage1 = new Vector();
	// 	let carriage2 = new Vector();
	// 	let passenger = new Passenger();
	//
	// 	record( passenger.p('carriage.value~>x') );
	//
	// 	expect(log).to.eql([]);
	//
	// 	passenger.carriage = { value: carriage1 };
	//
	// 	expect(log).to.eql([ 0 ]);
	//
	// 	carriage1.x = 22;
	//
	// 	expect(log).to.eql([ 0, 22 ]);
	//
	// 	passenger.carriage = { value: carriage2 };
	//
	// 	carriage2.x = 42;
	//
	// 	expect(log).to.eql([ 0, 22, 0, 42 ]);
	//
	// 	carriage1.x = 999;
	//
	// 	expect(log).to.eql([ 0, 22, 0, 42 ]);
	//
	// 	passenger.carriage = { value: carriage1 };
	//
	// 	expect(log).to.eql([ 0, 22, 0, 42, 999 ]);
	//
	// 	passenger.carriage = null;
	//
	// 	expect(log).to.eql([ 0, 22, 0, 42, 999 ]);
	//
	// 	passenger.carriage = { value: carriage1 };
	//
	// 	expect(log).to.eql([ 0, 22, 0, 42, 999, 999 ]);
	//
	// });
	//
	// it("can do loose property-chaining", async () => {
	//
	// 	class Passenger extends ValueTracker {
	// 		@property({}) carriage;
	// 	}
	//
	// 	let carriage1 = new Vector();
	// 	let carriage2 = new Vector();
	// 	let passenger = new Passenger();
	//
	// 	record( passenger.p('carriage?.value?~>x') );
	//
	// 	expect(log).to.eql([ undefined ]);
	//
	// 	passenger.carriage = { value: carriage1 };
	//
	// 	expect(log).to.eql([ undefined, 0 ]);
	//
	// 	carriage1.x = 22;
	//
	// 	expect(log).to.eql([ undefined, 0, 22 ]);
	//
	// 	passenger.carriage = { value: carriage2 };
	//
	// 	carriage2.x = 42;
	//
	// 	expect(log).to.eql([ undefined, 0, 22, 0, 42 ]);
	//
	// 	carriage1.x = 999;
	//
	// 	expect(log).to.eql([ undefined, 0, 22, 0, 42 ]);
	//
	// 	passenger.carriage = { value: carriage1 };
	//
	// 	expect(log).to.eql([ undefined, 0, 22, 0, 42, 999 ]);
	//
	// 	passenger.carriage = null;
	//
	// 	expect(log).to.eql([ undefined, 0, 22, 0, 42, 999, null ]);
	//
	// 	passenger.carriage = { value: carriage1 };
	//
	// 	expect(log).to.eql([ undefined, 0, 22, 0, 42, 999, null, 999 ]);
	//
	// });
	
	
	it("can invalidate a property's cache to re-emit the same value again", () => {
		
		let obj = new Vector();
		
		record( obj.p('x') );

		expect(log).to.eql([0]);
		
		obj.p('x').next(1);
		
		expect(log).to.eql([0, 1]);
		
		obj.p('x').next(1);
		
		expect(log).to.eql([0, 1]);
		
		obj.p('x').invalidateCache();
		
		obj.p('x').next(1);
		
		expect(log).to.eql([0, 1, 1]);
		
		obj.p('x').next(1);
		
		expect(log).to.eql([0, 1, 1]);
		
	});
	
	
	// it("tolerates extra whitespace (1)", () => {
	//
	// 	let obj = new Vector();
	//
	// 	record( obj.p('  x  ') );
	//
	// 	expect(log).to.eql([0]);
	//
	// 	obj.p('  x').next(1);
	//
	// 	expect(log).to.eql([0, 1]);
	//
	// 	obj.p('x  ').next(2);
	//
	// 	expect(log).to.eql([0, 1, 2]);
	//
	// 	obj.p(`
	//
	// 		x
	//
	// 	`).next(3);
	//
	// 	expect(log).to.eql([0, 1, 2, 3]);
	//
	// 	obj.p('x\t').next(4);
	//
	// 	expect(log).to.eql([0, 1, 2, 3, 4]);
	//
	// });
	//
	//
	// it("tolerates extra whitespace (2)", () => {
	//
	// 	class Passenger extends ValueTracker {
	// 		@property({}) carriage;
	// 	}
	//
	// 	let carriage1 = new Vector();
	// 	let carriage2 = new Vector();
	// 	let passenger = new Passenger();
	//
	// 	record( passenger.p('carriage  ?  ~>  x') );
	//
	// 	expect(log).to.eql([ undefined ]);
	//
	// 	passenger.carriage = carriage1;
	//
	// 	expect(log).to.eql([ undefined, 0 ]);
	//
	// 	carriage1.x = 22;
	//
	// 	expect(log).to.eql([ undefined, 0, 22 ]);
	//
	// 	passenger.carriage = carriage2;
	//
	// 	carriage2.x = 42;
	//
	// 	expect(log).to.eql([ undefined, 0, 22, 0, 42 ]);
	//
	// 	carriage1.x = 999;
	//
	// 	expect(log).to.eql([ undefined, 0, 22, 0, 42 ]);
	//
	// 	passenger.carriage = carriage1;
	//
	// 	expect(log).to.eql([ undefined, 0, 22, 0, 42, 999 ]);
	//
	// 	passenger.carriage = null;
	//
	// 	expect(log).to.eql([ undefined, 0, 22, 0, 42, 999, null ]);
	//
	// 	passenger.carriage = carriage1;
	//
	// 	expect(log).to.eql([ undefined, 0, 22, 0, 42, 999, null, 999 ]);
	//
	// });
	
	
});

