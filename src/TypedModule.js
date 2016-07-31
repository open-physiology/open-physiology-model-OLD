import Module                       from './Module';
import {Typed}                      from './modules/typed';
import {humanMsg, mapOptionalArray} from './util/misc';

import defaults  from 'lodash-bound/defaults';
import mapValues from 'lodash-bound/mapValues';
import omitBy    from 'lodash-bound/omitBy';
import isArray   from 'lodash-bound/isArray';

/**
 * Typed Modules allow to more easily create related
 * Type, Template and HasType classes. For example,
 * to create LyphType and LyphTemplate resources and
 * their HasType relationship from one description.
 **/
export default class TypedModule extends Module {

	TYPED_RESOURCE(config) {
		return mapOptionalArray(config, (conf) => {
			
			let superClasses = conf.extends || [Typed];
			if (!superClasses::isArray()) { superClasses = [superClasses] }
			
			let subClasses = conf.extendedBy || [];
			if (!subClasses::isArray()) { subClasses = [subClasses] }
			
			config::defaults({
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
			].map(([key, wanted, unwanted]) => config[key]
				::omitBy(desc => !desc[wanted] && desc[unwanted])
				::mapValues((desc) => {
				if (desc[wanted]) { return { ...desc[wanted], typeCheck: desc.typeCheck } }
				return { ...desc };
			}));
			
			const NewType = this.RESOURCE({
				
				name: `${conf.name}Type`,
				
				extends:    superClasses.map(sc => sc.Type),
				extendedBy: subClasses  .map(sc => sc.Type),
				
				instanceSingular: conf.singular,
				instancePlural:   conf.plural || `${conf.singular}s`,
				
				singular: `${conf.singular} type`,
				
				singleton: conf.singleton,
				
				properties:        typeProperties,
				patternProperties: typePatternProperties
				
			});
			
			const NewTemplate = this.RESOURCE({
				
				name: `${conf.name}Template`,
				
				extends:    superClasses.map(sc => sc.Template),
				extendedBy: subClasses  .map(sc => sc.Template),
				
				instanceSingular: conf.singular,
				instancePlural:   conf.plural || `${conf.singular}s`,
				
				singular: `${conf.singular} template`,
				
				properties:        templateProperties,
				patternProperties: templatePatternProperties
				
			});
			
			const NewHasType = this.RELATIONSHIP({
				
				name: 'HasType',
				
				extends:    superClasses.map(sc => sc.HasType),
				extendedBy: subClasses  .map(sc => sc.HasType),
				
				singular: 'has type',
				
				1: [NewTemplate, '1..1', { anchors: true, key: 'type' }],
				2: [NewType,     '0..*',                               ]
				
			});
			
			return {
				...conf,
				isTypedResource: true,
				Type:            NewType,
				Template:        NewTemplate,
				HasType:         NewHasType
			};
		});

	}

}
