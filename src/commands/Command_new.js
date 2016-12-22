import isFunction   from 'lodash-bound/isFunction';
import {constraint, humanMsg} from '../util/misc';
import Graph from 'graph.js/dist/graph';

export default (cls) => class Command_new extends cls.Command {
	
	static commandType = 'new';
	
	constructor(initialValues = {}, options = {}) {
		super(options);
		this.initialValues = initialValues;
		this.options       = options;
	}
	
	result = null;
	
	localRun() {
		/* sanity checks */
		if (this.result) { return }
		constraint(!cls.abstract, humanMsg`
			Cannot instantiate the abstract
			class ${cls.name}.
		`);
		
		/* construct entity */
		if (cls.behavior['new']::isFunction()) {
			this.result = cls.behavior['new'](this) || null;
		} else {
			this.result = new cls(
				{ ...this.initialValues },
				{ ...this.options, allowInvokingConstructor: true }
			);
		}
		
		/* associate with entity */
		if (!this.result.associatedCommands) { this.result.associatedCommands = new Set }
		this.result.associatedCommands.add(this);
	}
	
	async localCommit() {
		// TODO
	}

	localRollback() {
		// TODO
	}
};
