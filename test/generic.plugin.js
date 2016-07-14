"use strict";

export default function propertiesPlugin(chai, utils) {
	var Assertion = chai.Assertion;

	Assertion.addMethod('branch', function () {
		let assertion = new Assertion(this._obj);
		utils.transferFlags(this, assertion, false);
		return assertion;
	});

	Assertion.addMethod('instanceof', function (...classes) {
		for (let cls of classes) {
			this.assert(
				this._obj instanceof cls
				, 'expected #{this} to be an instance of ' + cls.name
				, 'expected #{this} to not be an instance of ' + cls.name
			);
		}
	});

};
