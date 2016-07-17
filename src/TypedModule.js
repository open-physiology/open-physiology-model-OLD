import Module                       from './Module';
import {Typed}                      from './modules/typed';
import {humanMsg, mapOptionalArray} from './util/misc';

/**
 * Typed Modules allow to more easily create related
 * Type, Template and HasType classes. For example,
 * to create LyphType and LyphTemplate resources and
 * their HasType relationship from one description.
 **/
export default class TypedModule extends Module {

	TYPED_RESOURCE(config) {
		return mapOptionalArray(config, (conf) => {
			
			const SuperClass = conf.extends || Typed;
			
			// TODO: Handle { Template: {}, Type: {}, typeCheck(type, value) {} }
			//     : for each property
			
			const NewType = this.RESOURCE({
				
				name: `${conf.name}Type`,
				
				extends: SuperClass.Type,
				
				instanceSingular: conf.singular,
				instancePlural:   conf.plural || `${conf.singular}s`,
				
				singular: `${conf.singular} type`
				
			});
			
			const NewTemplate = this.RESOURCE({
				
				name: `${conf.name}Template`,
				
				extends: SuperClass.Template,
				
				instanceSingular: conf.singular,
				instancePlural:   conf.plural || `${conf.singular}s`,
				
				singular: `${conf.singular} template`
				
			});
			
			const NewHasType = this.RELATIONSHIP({
				
				name: 'HasType',
				
				extends: SuperClass.HasType,
				
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
