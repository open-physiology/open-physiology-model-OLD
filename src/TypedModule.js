import Module                       from './Module';
import {mapOptionalArray} from './util/misc';

import defaults  from 'lodash-bound/defaults';
import mapValues from 'lodash-bound/mapValues';
import omitBy    from 'lodash-bound/omitBy';
import map       from 'lodash-bound/map';
import memoize   from 'lodash/memoize';
import {defineProperty, defineProperties} from 'bound-native-methods';
import {wrapInArray} from "./util/misc";
import {definePropertyByValue} from "./util/misc";

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
			
			const superClasses = wrapInArray(conf.extends    || [this.classes.vertexValue('Template')]);
			const subClasses   = wrapInArray(conf.extendedBy || []);

			/* handling properties */
			conf::defaults({
				properties:        {},
				patternProperties: {}
			});

			/* Template class */
			const NewTemplateClass = this.RESOURCE({
				
				name: conf.name,
				
				extends:  superClasses,
				extendedBy: subClasses,
				
				singular: conf.singular,
				plural: conf.plural,

				properties:        conf.properties,
				patternProperties: conf.patternProperties,
				
				behavior: conf.behavior
				
			});

			/* Type class */
			const NewTypeClass = this.RESOURCE({
				
				name: `${conf.name}Type`,
				
				extends:  superClasses::map(c=>c.Type),
				extendedBy: subClasses::map(c=>c.Type),
				
				singular: `${conf.singular} type`,

				notExported: true
				
			});
			
			NewTemplateClass::definePropertyByValue('Type',     NewTypeClass    );
			NewTypeClass    ::definePropertyByValue('Template', NewTemplateClass);
			
			this.RELATIONSHIP({
				
				name: 'HasType',
				
				1: [NewTemplateClass, '0..*', { anchors: true, key: 'types' }],
				2: [NewTypeClass,     '0..*'                                 ]
				
			});
			
			this.RELATIONSHIP({
				
				name: 'DefinesType',
				
				1: [NewTemplateClass, '0..1', { anchors: true                    }],
				2: [NewTypeClass,     '1..1', { anchors: true, key: 'definition' }]
				
			});
			
			/* register and return */
			return NewTemplateClass;
		});

	}

}
