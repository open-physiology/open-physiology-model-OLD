import Module, {MANY} from './Module';
import {Typed}        from './modules/typed';

export {MANY};

export default class TypedModule extends Module {

	TYPED_RESOURCE(config) {

		const SuperClass = config.extends || Typed;

		// TODO: Handle { Template: {}, Type: {}, typeCheck(type, value) {} }
		//     : for each property

		const NewType = this.RESOURCE({

			name: `${config.name}Type`,

			extends: SuperClass.Type,

			instanceSingular: config.singular,
			instancePlural:   config.plural || `${config.singular}s`,

			singular: `${config.singular} type`

		});
		const NewTemplate = this.RESOURCE({

			name: `${config.name}Template`,

			extends: SuperClass.Template,

			instanceSingular: config.singular,
			instancePlural:   config.plural || `${config.singular}s`,

			singular: `${config.singular} template`

		});
		const NewHasType = this.RELATIONSHIP({

			name: 'HasType',

			extends: SuperClass.HasType,

			singular: 'has type',

			1: [NewTemplate, [1, 1   ], { anchors: true, key: 'type' }], // TODO: covariance?
			2: [NewType,     [0, MANY],                               ]

		});
		return {
			...config,
			isTypedResource: true,
			Type:            NewType,
			Template:        NewTemplate,
			HasType:         NewHasType
		};
	}

}
