"use strict";

import propertiesPlugin from './properties.plugin';
import genericPlugin    from './generic.plugin';


export default function resourceCheckingPlugin(chai/*, utils*/) {
	chai.use(propertiesPlugin);
	chai.use(genericPlugin);

	var Assertion = chai.Assertion;

	Assertion.addMethod('resource', function (name) {
		this.branch().contains.properties({
			isResource: true,
			name:       name
		});
	});

	Assertion.addMethod('resources', function (...classes) {
		for (let cls of classes) {
			this.branch().property(cls).that.is.a.resource(cls);
		}
	});

	Assertion.addMethod('relationship', function (name) {
		this.branch().contains.properties({
			isRelationship: true,
			name          : name,
			1             : undefined,
			2             : undefined
		});
	});

	Assertion.addMethod('relationships', function (...names) {
		for (let name of names) {
			this.branch().contains.property(name).that.is.a.relationship(name);
		}
	});

	Assertion.addMethod('typedResource', function (name) {
		this.branch().contains.property('name', name);
		this.branch().contains.property('Type')    .that.is.a.resource();
		this.branch().contains.property('Template').that.is.a.resource();
		this.branch().contains.property('HasType') .that.is.a.relationship();
	});

	Assertion.addMethod('typedResources', function (...names) {
		for (let name of names) {
			this.branch().contains.property(name).that.is.a.typedResource(name);
		}
	});

};
