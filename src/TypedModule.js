import Module                       from './Module';
import {mapOptionalArray} from './util/misc';

import defaults  from 'lodash-bound/defaults';
import mapValues from 'lodash-bound/mapValues';
import omitBy    from 'lodash-bound/omitBy';
import map       from 'lodash-bound/map';
import isObject  from 'lodash-bound/isObject';
import {defineProperty, defineProperties} from 'bound-native-methods';
import {wrapInArray} from "./util/misc";

/**
 * Typed Modules allow to more easily create related
 * Type, Template and HasType classes. For example,
 * to create LyphType and LyphTemplate resources and
 * their HasType relationship from one description.
 **/
export default class TypedModule extends Module {

	TYPED_RESOURCE(config) {
		return mapOptionalArray(config, (conf) => {
			
			this.basicNormalization(conf);
			
			const superClasses = wrapInArray(conf.extends || [this.classes.vertexValue('Typed')]);
			const subClasses   = wrapInArray(conf.extendedBy || []);
			
			/* handling properties */
			conf::defaults({
				properties: {},
				patternProperties: {}
			});
			const [
				typeProperties,
				templateProperties,
				typePatternProperties,
				templatePatternProperties
		    ] = [
		    	['properties',        'Type',     'Template'],
			    ['properties',        'Template', 'Type'    ],
			    ['patternProperties', 'Type',     'Template'],
			    ['patternProperties', 'Template', 'Type'    ]
			].map(([key, wanted, unwanted]) => conf[key]
				::omitBy(desc => !desc[wanted] && desc[unwanted])
				::mapValues((desc) => {
				if (desc[wanted]) { return { ...desc[wanted], typeCheck: desc.typeCheck } }
				return { ...desc };
			}));
			
			/* Type resource */
			const NewType = this.RESOURCE({
				
				name: `${conf.name}Type`,
				
				extends:    superClasses::map(sc => sc.Type),
				extendedBy: subClasses  ::map(sc => sc.Type),
				
				instanceSingular: conf.singular,
				instancePlural:   conf.plural || `${conf.singular}s`,
				
				singular: `${conf.singular} type`,
				
				singleton: conf.singleton,
				
				properties:        typeProperties,
				patternProperties: typePatternProperties
				
			});
			
			/* Template resource */
			const NewTemplate = this.RESOURCE({
				
				name: `${conf.name}Template`,
				
				extends:    superClasses::map(sc => sc.Template),
				extendedBy: subClasses  ::map(sc => sc.Template),
				
				instanceSingular: conf.singular,
				instancePlural:   conf.plural || `${conf.singular}s`,
				
				singular: `${conf.singular} template`,
				
				properties:        templateProperties,
				patternProperties: templatePatternProperties
				
			});
			
			
			/* create a universal type, which will serve as default type for all templates */
			if (!NewType.abstract) {
				// TODO: fetch already existing universal type from external source
				// TODO: make universal type immutable / readonly
				const universalType = NewType.new({
					name: `universal ${NewType.singular}`,
					...(conf.createUniversalType || {})
				});
				universalType.isUniversalType = true;
				universalType.commit();
				NewType::defineProperty('getUniversalType', {
					value() { return universalType }
				});
				if (NewType.singleton) {
					NewType::defineProperty('getSingleton', {
						value() { return universalType }
					});
				}
			}
			const hasTypeDomainDefault = NewType.abstract
				? {} : { default: NewType.getUniversalType() };
			
				
			/* HasType relationship */
			const NewHasType = this.RELATIONSHIP({
				
				name: `HasType`,
				
				extends: this.classes.vertexValue('IsRelatedTo'),
				// extends:    superClasses.map(sc => sc.HasType), // can this work?
				// extendedBy: subClasses  .map(sc => sc.HasType),
				
				// TODO: in order to give call this `${conf.name}_HasType`,
				//     : and maintain a proper class hierarchy, we'll need
				//     : to allow someone to set `-->HasType` on an entity,
				//     : and recognize this as also setting `-->${conf.name}_HasType`,
				//     : because of the 1..1 cardinality on the whole domain hierarchy.
				//     : Alternatively, we may want to allow a class to be identified
				//     : by more than just the name. We wouldn't want
				//     : `-->${conf.name}_HasType` to be visible as a settable field.
				
				singular: 'has type',
				
				1: [NewTemplate, '1..1', { anchors: true, key: 'type', ...hasTypeDomainDefault }],
				2: [NewType,     '0..*',                                                        ]
				
			});
			
			const NewIsSubtypeOf = this.RELATIONSHIP({
				
				name: `IsSubtypeOf`,
				
				extends: this.classes.vertexValue('IsRelatedTo'),
				// extends:    superClasses.map(sc => sc.IsSubtypeOf), // can this work?
				// extendedBy: subClasses  .map(sc => sc.IsSubtypeOf), // see TODO above
				
				singular: "is subtype of",
				
				1: [NewType, '0..*', {                key: 'subtypes'   }],
				2: [NewType, '0..*', { anchors: true, key: 'supertypes' }],
				
				noCycles: true
				
			});
			
			/* rebuild the typedResource object */
			const NewTypedResource = {
				...conf,
				module:          this,
				isTypedResource: true,
				Type:            NewType,
				Template:        NewTemplate,
				HasType:         NewHasType,
				IsSubtypeOf:     NewIsSubtypeOf
			};
			if (!NewType.abstract) {
				NewTypedResource::defineProperty('getUniversalType', {
					value() { return NewType.getUniversalType() }
				});
			}
			
			/* get rid of 'createUniversalType', which was to be used once at most */
			delete conf.createUniversalType;
			
			/* register and return */
			return this.register(NewTypedResource);
		});

	}

}
