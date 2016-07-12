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
			this.branch().is.instanceOf(cls);
		}
	});

};
