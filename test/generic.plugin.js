"use strict";

import stringify from 'json-stringify-safe';

export default function propertiesPlugin(chai, utils) {
	const Assertion = chai.Assertion;

	Assertion.addMethod('branch', function () {
		let assertion = new Assertion(this._obj);
		utils.transferFlags(this, assertion, false);
		return assertion;
	});
	
	Assertion.addMethod('instanceOf', function (...classes) {
		for (let cls of classes) {
			this.assert(
				this._obj instanceof cls || cls.hasInstance && cls.hasInstance(this._obj)
				, 'expected #{this} to be an instance of ' + cls.name
				, 'expected #{this} to not be an instance of ' + cls.name
			);
		}
	});
	
	
	// Assertion.addMethod('element', function (value) {
	// 	this.assert(
	// 		[...this._obj].includes(value)
	// 		, `expected #{this} to have a value ${stringify(value)}`
	// 		, `expected #{this} to not have a value ${stringify(value)}`
	// 	);
	// });

};
