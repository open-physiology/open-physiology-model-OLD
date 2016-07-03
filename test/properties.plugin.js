"use strict";

module.exports = function (chai, utils) {
	var Assertion = chai.Assertion;

	Assertion.addMethod('properties', function (props) {
		for (let key of Object.keys(props)) {
			let assertion = new Assertion(this._obj);
			utils.transferFlags(this, assertion, false);
			if (typeof props[key] === 'undefined') {
				assertion.property(key);
			} else {
				assertion.property(key, props[key]);
			}
		}
	});

};
