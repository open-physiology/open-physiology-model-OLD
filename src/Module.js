import isUndefined from 'lodash/isUndefined';
import isEqual     from 'lodash/isEqual';
import isArray     from 'lodash-bound/isArray';
import isInteger   from 'lodash-bound/isInteger';
import defaults    from 'lodash-bound/defaults';
import assert      from 'power-assert';
import Graph       from 'graph.js/dist/graph.js';

import {humanMsg, mapOptionalArray, parseCardinality, arrayify} from './util/misc';

import Entity from './Entity';
import {Field} from "./Field";


////////////////////////////////////////////////////////////////////////////////
// Module / Resource / Relationship Factory                                   //
////////////////////////////////////////////////////////////////////////////////

// TODO: folding same-name classes
// TODO: folding properties into subclasses
// TODO: folding multiple 1,2 pairs into same-name relationships and subclass relationships

export default class Module {
	
	classes = new Graph; // vertices: name                   -> class
	                     // edges:    [superclass, subclass] -> undefined

	constructor(name, dependencies = []) {
		/* store the module name */
		this.name = name;
		
		/* first, make sure there are no name clashes between independent modules */
		let names = {};
		for (let dep of dependencies) {
			for (let [clsName, cls] of dep.classes) {
				if (names[clsName] && names[clsName].cls !== cls) {
					throw new Error(humanMsg`
						The modules '${dep.name}' and '${names[clsName].dep.name}'
						independently define a class '${clsName}'.
						(Both are being imported by the module '${this.name}'.)
					`);
				}
				names[clsName] = {dep, cls};
			}
		}
		
		/* so there should be no conflicts from this point; merge in the dependencies */
		for (let dependency of dependencies) {
			this.classes.mergeIn(dependency.classes);
		}
	}

	OBJECT(config) {
		return mapOptionalArray(config, (conf) => {
			this.register(conf);
			return conf;
		});
	}

	RESOURCE(config) {
		return mapOptionalArray(config, (conf) => {
			conf.isResource = true;
			this.basicNormalization                  (conf);
			let constructor = Entity.createClass     (conf);
			constructor = this.mergeSameNameResources(constructor);
			this.register                            (constructor);
			this.mergeSuperclassFields               (constructor);
			// jsonSchemaConfig                      (constructor); // TODO
			Field.augmentClass                       (constructor);
			return constructor;
		});
	}

	RELATIONSHIP(config) {
		return mapOptionalArray(config, (conf) => {
			conf.isRelationship = true;
			this.basicNormalization                      (conf);
			let constructor = Entity.createClass         (conf);
			this.normalizeRelationshipSides              (constructor);
			constructor = this.mergeSameNameRelationships(constructor);
			this.register                                (constructor);
			this.mergeSuperclassFields                   (constructor);
			// jsonSchemaConfig                          (constructor); // TODO
			Field.augmentClass                           (constructor);
			return constructor;
		});
	}
	
	////////////////////////////////////////////////////////////////////////////
	
	basicNormalization(config) : void {
		/* normalizing grammar stuff */
		config.plural = config.plural || `${config.singular}s`;
		
		
		if (config.isResource) {
			config::defaults({
				relationships:         {},
				relationshipShortcuts: {}
			});
		}
		
		/* normalizing extends/extendedBy */
		for (let key of ['extends', 'extendedBy']) {
			config::defaults({ [key]: [] });
			config[key] = new Set( arrayify(config[key]) );
		}
		
		/* normalize properties */
		for (let [pKey, kKey] of [
			['properties',        'key'    ],
			['patternProperties', 'pattern']
		]) {
			config::defaults({ [pKey]: {} });
			for (let [k, desc] of Object.entries(config[pKey])) {
				desc[kKey] = k;
			}
		}
		
		/* sanity checks */
		for (let key of ['extends', 'extendedBy']) {
			for (let other of config[key]) {
				assert(this.classes.hasVertex(other.name), humanMsg`
					The '${config.name}' class is being processed
					by module '${this.name}', but it extends a '${other.name}'
					class that has not yet been processed. How can that be?
				`);
				assert(this.classes.vertexValue(other.name) === other, humanMsg`
					The '${config.name}' class is being processed
					by module '${this.name}', but it extends an '${other.name}'
					class that is in conflict with another class known
					by that name.
				`);
			}
		}
	}
	
	normalizeRelationshipSides(cls) : void {
		// - 1 is left-hand side, and
		// - 2 is right-hand side of the relationship;
		// these can be given directly, or multiple
		// can be grouped in a 'domains' array;
		// here, we'll normalize them into a 'domains' array
		
		assert(!cls[1] & !cls[2] || !cls.domains, humanMsg`
			A relationship can specify [1] and [2] domains directly,
			or group multiple pairs in a 'domains' object, but not both.
		`);
		
		cls.domains = (cls.domains || (!(cls[1] && cls[2]) ? [] : [{
			[1]: cls[1],
			[2]: cls[2]
		}])).map((domainPair) => {
			let newDomain = {
				[1]: { key: `-->${cls.name}` },
				[2]: { key: `<--${cls.name}` }
			};
			for (let side of [1, 2]) {
				assert(domainPair[side]::isArray(), humanMsg`
					Relationship sides 1, 2 need to be arrays.
				`);
				let thisSide  = newDomain[side  ];
				let otherSide = newDomain[3-side]; // {1↦2, 2↦1}
				Object.assign(thisSide, {
					side:              side,
					other:             otherSide,
					relationshipClass: cls,
					class:             domainPair[side][0],
					cardinality:       parseCardinality(domainPair[side][1]),
					options:           domainPair[side][2] || {},
					properties:        cls.properties
				});
				
				/* put back-reference in classes */
				thisSide.class.relationships[thisSide.key] = thisSide;
				Field.augmentClass(thisSide.class, thisSide.key);
				if ('key' in thisSide.options) {
					thisSide.class.relationshipShortcuts[thisSide.options.key] = thisSide;
					Field.augmentClass(thisSide.class, thisSide.options.key);
				}
				
				// TODO: this 'side' should somehow be mixed from
				//     : all relevant domains; not just be the 'last'
				//     : to be assigned in this domains.map()
				
			}
			return newDomain;
		});
		delete cls[1];
		delete cls[2];
	}
	
	register(cls) : void {
		/* register the class in this module */
		this.classes.ensureVertex(cls.name, cls);
		/* add subclassing edges and cross-register sub/superclasses */
		for (let extendee of cls.extends || []) {
			this.classes.addEdge(extendee.name, cls.name);
			extendee.extendedBy.add(cls);
		}
		for (let extender of cls.extendedBy || []) {
			this.classes.addEdge(cls.name, extender.name);
			extender.extends.add(cls);
		}
	}
	
	_mergeSuperclassField(cls, kind, customMerge) {
		if (isUndefined(cls[kind])) { return }
		for (let [,supercls] of this.classes.verticesTo(cls.name)) {
			for (let [key, superDesc] of Object.entries(supercls[kind])) {
				let subDesc = cls[kind][key];
				if (isUndefined(subDesc)) {
					cls[kind][key] = superDesc;
				} else if (isEqual(subDesc, superDesc)) {
					continue;
				} else {
					Object.assign(subDesc, customMerge(superDesc, subDesc));
				}
			}
		}
	}
	
	mergeSuperclassFields(cls) : void {
		this._mergeSuperclassField(cls, 'properties', (superDesc, subDesc) => {
			assert(isUndefined(subDesc.type) || subDesc.type === superDesc.type);
			// We're assuming that the only kind of non-trivial merging
			// right now is to give a property a specific constant value
			// in the subclass, which has to be checked in the superclass.
			// TODO: use actual json-schema validation to validate value
			let singleSuperDesc;
			if (isUndefined(superDesc.type) && superDesc.oneOf) {
				for (let disjunct of superDesc.oneOf) {
					if (typeof subDesc.value === disjunct.type                    ||
					    subDesc.value::isInteger() && disjunct.type === 'integer' ||
					    isEqual(subDesc.value, disjunct.value)
					) {
						singleSuperDesc = { ...superDesc, ...disjunct };
						delete singleSuperDesc.oneOf;
						delete singleSuperDesc.default;
					}
				}
			} else {
				singleSuperDesc = { ...superDesc };
			}
			assert(singleSuperDesc);
			return singleSuperDesc;
		});
		this._mergeSuperclassField(cls, 'relationships', (superDesc, subDesc) => {
			assert(superDesc.class.hasSubclass(subDesc.class));
			return { ...superDesc };
		});
		this._mergeSuperclassField(cls, 'relationshipShortcuts', (superDesc, subDesc) => {
			assert(superDesc.class.hasSubclass(subDesc.class));
			return { ...superDesc };
		});
	}
	
	mergeSameNameResources(cls) : Class<Entity> {
		if (!this.classes.hasVertex(cls.name)) { return cls }
		// TODO: fold into each other, maybe raise some errors
		return this.classes.vertexValue(cls.name);
	}
	
	mergeSameNameRelationships(cls) : Class<Entity> {
		if (!this.classes.hasVertex(cls.name)) { return cls }
		// TODO: fold into each other, maybe raise some errors
		return this.classes.vertexValue(cls.name);
	}
	
}

////////////////////////////////////////////////////////////
// RESOURCE({
//
//     name: 'ResourceName',
//
//     extends: <superclass>,
//     abstract: <true/false>,
//
//     singular: 'singular name',
//     plural:   'plural names',
//
//     properties: {
//         ...properties
//     },
//     patternProperties: {
//         ...patternProperties
//     },
//     ...options
// })
////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////
// RELATIONSHIP({
//
//     name: 'RelationshipName',
//
//     extends: <superclass>,
//     abstract: <true/false>,
//
//     1: [ ResourceType1, [c1min, c1max], { ...options1to2 } ],
//     2: [ ResourceType2, [c2min, c2max], { ...options2to1 } ],
//
//     properties: {
//         ...properties
//     },
//
//     ...options
// })
//
// This means that RelationshipName is a type of c1-to-c2 relationship
// (c stands for cardinality: many-to-many, one-to-many, etc. both sides
// have a min and max) between ResourceType1 resources and ResourceType2 resources.
// So: "a ResourceType1 resource can be related to 'c1' ResourceType2 resource(s),
//      exposed through through the key 'options1to2.key' in that resource"
// and vice versa, if a key field is present, which is not mandatory.
//
// A couple of possible options:
// - options1to2.sustains:     when the last related ResourceType1 instance is deleted,
//                             the ResourceType2 instance that is being sustained by it is deleted automatically
// - options1to2.anchors:      a ResourceType2 instance cannot be deleted
//                             while there are still ResourceType1 instances related with it
// - options1to2.implicit:     (only when c1min > 0) a new ResourceType2 instance, plus this kind of relationship,
//                             is automatically created for a new ResourceType1 instance;
// - options1to2.getSummary:   a human-readable explanation of the corresponding REST endpoint for HTTP GET
// - options1to2.putSummary:   a human-readable explanation of the corresponding REST endpoint for HTTP PUT
// - options1to2.deleteSummary:a human-readable explanation of the corresponding REST endpoint for HTTP DELETE
// - options.readOnly:         this relationship type is managed programmatically, not to be exposed through the API directly
// - options.noCycles:         no cycles of this relationship type are allowed
// - options.symmetric:        this relationship type is bidirectional, 1->2 always implies 2->1; TODO: implement when needed
// - options.antiReflexive:    a resource may not be related to itself with this type;            TODO: implement when needed
////////////////////////////////////////////////////////////

// TODO: reintroduce json schema processor
//
// function jsonSchemaConfig(config) {
// 	let result = {
// 		...config,
// 		allProperties: { ...config.properties }
// 	};
//
// 	if (isFunction(config.extends)) {
// 		/* merge each property with properties of the same name in the superclass */
// 		for (let key of Object.keys(config.extends.allProperties)) {
// 			// TODO: check for conflicts
// 			// TODO: merge certain sub-items (e.g., enums can be made narrower)
// 			result.allProperties[key] = {
// 				...config.extends.allProperties[key],
// 				...result.allProperties[key]
// 			};
// 		}
// 	}
//
// 	/* folding superclass properties into one object */
// 	Object.assign(result.allProperties, config.extends && config.extends.allProperties);
//
// 	return result;
//
// 	// return {
// 	// 	...config,
// 	// 	schema: {
// 	// 		$schema:             'http://json-schema.org/draft-04/schema#',
// 	// 		type:                'Object',
// 	// 		properties:           { ...(config.properties || {})         },
// 	// 		patternProperties:    { ...(config.patternProperties || {})  },
// 	// 		additionalProperties: ( config.additionalProperties === true )  // default: no additional properties allowed
// 	//
// 	// 		// TODO: have this object conform to json schema syntax
// 	// 		//     : - add 'required' field?
// 	// 		//     : - sanitize config.properties
// 	// 		//     : - add properties '1' and '2' to it (if config.isRelationship)
// 	//
// 	// 		// TODO: fold superclass properties, patternProperties, etc. into this
// 	// 		//     : - fold property flags into each other
// 	// 	}
// 	// };
// }
