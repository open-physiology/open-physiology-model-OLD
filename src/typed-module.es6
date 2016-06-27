import basicModule, {MANY} from './module';

import resources from "./resources";
const {Resource} = resources;


export {MANY} from './module';


export default class module extends basicModule {
	
	RESOURCE(config) {
		let baseClass = this;
		do { baseClass = baseClass.extends } while (baseClass === classes.Typed || baseClass === Resource);
		if (baseClass === Resource) { return super.RESOURCE(config) }
		
		for (let conf of this.normalizeConfig(config)) {
			const SuperClass = conf.extends || classes.Typed;
			const typeName       = `${conf.name}Type`,
			      templateName   = `${conf.name}Template`,
			      templateTypeId = `${conf.name}TemplateHasType`;
			
			this.RESOURCE({
				
				name: typeName,
				
				extends: SuperClass.Type,
				
				instanceSingular: conf.singular,
				instancePlural:   conf.plural,
				
				singular: `${conf.singular} type`
				
				// TODO: properties, etc.
				//     : - create superset schema (array, no duplicates, at least one element)
				
			}).RESOURCE({
				
				name: templateName,
				
				extends: SuperClass.Template,
				
				instanceSingular: conf.singular,
				instancePlural:   conf.plural,
				
				singular: `${conf.singular} template`
				
				// TODO: properties, etc.
				
			}).RELATIONSHIP(({
				[typeName]:     NewType,
				[templateName]: NewTemplate
			}) => ({
				
				name: 'HasType',
				
				id: templateTypeId,
				
				1: [NewTemplate, [1, 1   ], { key: 'type' }], // TODO: covariance
				2: [NewType,     [0, MANY],                ]
				
				// TODO: properties, etc.
				
			})).RESOURCE(({
				[typeName]:       NewType,
				[templateName]:   NewTemplate,
				[templateTypeId]: NewTemplateType
			}) => ({
				...conf,
				[typeName]:       NewType,
				[templateName]:   NewTemplate,
				[templateTypeId]: NewTemplateType
			}));
		}
		
		return this;
	}

	RELATIONSHIP(config) {
		// TODO: handle covariant (and other type-related annotations?)
		//     : - there is no longer a 'covariant' flag; one is assumed
		//     :   when [1] is a type and [2] is a type or template;
		//     : - it indicates that subtypes of [1] may have this
		//     :   relationship with subtypes of [2]
		return super.RELATIONSHIP(config);
	}
	
}
