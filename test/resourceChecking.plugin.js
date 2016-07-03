"use strict";

import propertiesPlugin from './properties.plugin';

module.exports = function (chai, utils) {
	chai.use(propertiesPlugin);

	var Assertion = chai.Assertion;

	Assertion.addMethod('resource', function (name) {
		let assertion = new Assertion(this._obj);
		utils.transferFlags(this, assertion, false);
		assertion.contains.properties({
			isResource: true,
			name:       name
		});
	});

	Assertion.addMethod('resources', function (...classes) {
		for (let cls of classes) {
			let assertion = new Assertion(this._obj);
			utils.transferFlags(this, assertion, false);
			assertion.property(cls).that.is.a.resource(cls);
		}
	});

	Assertion.addMethod('relationship', function (name) {
		let assertion = new Assertion(this._obj);
		utils.transferFlags(this, assertion, false);
		assertion.contains.properties({
			isRelationship: true,
			name:           name,
			// [1]:            undefined,
			// [2]:            undefined
		});
	});

	Assertion.addMethod('relationships', function (...classes) {
		for (let cls of classes) {
			let assertion = new Assertion(this._obj);
			utils.transferFlags(this, assertion, false);
			assertion.property(cls).that.is.a.relationship(cls);
		}
	});

	Assertion.addMethod('typedResource', function (name) {
		let assertion = new Assertion(this._obj);
		utils.transferFlags(this, assertion, false);
		assertion.contains.properties({
			isResource: true,
			name:       name,
			Type:       undefined,
			Template:   undefined,
			HasType:    undefined
		});
	});

	Assertion.addMethod('typedResources', function (...classes) {
		for (let cls of classes) {
			let assertion = new Assertion(this._obj);
			utils.transferFlags(this, assertion, false);
			assertion.property(cls).that.is.a.typedResource(cls);
		}
	});

};
