import basicModule, {MANY} from './module';

import resources from "./resources";
const {Resource, IsRelatedTo} = resources;

import typed from './typed';
const {Typed} = typed;


export {MANY} from './module';


export default class module extends basicModule {
	
	RESOURCE(config) {
		for (let conf of this.normalizeConfig(config)) {

			let baseClass = conf;
			do { baseClass = baseClass.extends } while (baseClass !== Typed && baseClass !== Resource);
			if (baseClass === Resource) { return super.RESOURCE(conf) }

			const SuperClass = conf.extends;
			const typeName       = `${conf.name}Type`,
			      templateName   = `${conf.name}Template`,
			      templateTypeId = `HasType`;
			
			super.RESOURCE({
				
				name: typeName,
				
				extends: SuperClass.Type,
				
				instanceSingular: conf.singular,
				instancePlural:   conf.plural,
				
				singular: `${conf.singular} type`
				
				// TODO: properties, etc.
				//     : - create superset schema (array, no duplicates, at least one element)
				
			});
			super.RESOURCE({
				
				name: templateName,
				
				extends: SuperClass.Template,
				
				instanceSingular: conf.singular,
				instancePlural:   conf.plural,
				
				singular: `${conf.singular} template`
				
				// TODO: properties, etc.
				
			});
			super.RELATIONSHIP(({
				[typeName]:     NewType,
				[templateName]: NewTemplate
			}) => ({
				
				name: 'HasType',

				extends: SuperClass.HasType || IsRelatedTo,
				
				id: templateTypeId,

				singular: 'has type', // TODO: singular property in all relationship classes
				
				1: [NewTemplate, [1, 1   ], { key: 'type' }], // TODO: covariance
				2: [NewType,     [0, MANY],                ]
				
				// TODO: properties, etc.
				
			}));
			super.RESOURCE(({
				[typeName]:       NewType,
				[templateName]:   NewTemplate,
				[templateTypeId]: NewHasType
			}) => {
				return [{
					...conf,
					Type:     NewType,
					Template: NewTemplate,
					HasType:  NewHasType
				}];
			});
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
