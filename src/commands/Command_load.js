import {constraint, humanMsg} from '../util/misc';


// TODO: we may not need this class


// export default (cls) => class Command_load extends cls.Command {
//
// 	static commandType = 'load';
//
// 	constructor(values = {}, options = {}) {
// 		super({ ...options, committed: true });
// 		this.values  = values;
// 		this.options = options;
// 	}
//
// 	get associatedEntities() {
// 		return new Set(this.result ? [this.result] : []);
// 	}
//
// 	result = null;
//
// 	localRun() {
// 		/* sanity checks */
// 		constraint(!cls.abstract, humanMsg`
// 			Cannot load an instance of the abstract
// 			class ${cls.name}.
// 		`);
// 		constraint(cls.values.id, humanMsg`
// 			Cannot load an instance of the class
// 			${cls.name} without a provided 'id' field.
// 		`);
//
// 		/* construct entity */
// 		this.result = new cls(
// 			{ ...this.values },
// 			{ ...this.options, allowInvokingConstructor: true }
// 		);
//
// 		/* associate with entity */
// 		this.result.associations.add(this);
// 	}
//
// 	async localCommit() {
// 	} // intentionally empty
//
// 	localRollback() {
// 	} // intentionally empty
// };
