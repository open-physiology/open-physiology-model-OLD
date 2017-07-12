import Command_factory        from './Command.js';
import Command_delete_factory from './Command_delete.js';
import Command_edit_factory   from './Command_edit.js';
import Command_load_factory   from './Command_load.js';
import Command_new_factory    from './Command_new.js';
import Command_link_factory   from './Command_link.js';
import Command_unlink_factory from './Command_unlink.js';

/** @ignore */
export default (env) => {
	env.commandClasses = {};
	env.registerCommandClass = (name, CommandClass) => {
		if (!env.commandClasses[name]) {
			env.commandClasses[name] = CommandClass;
		}
		return env.commandClasses[name];
	};

	return {
		Command       : Command_factory       (env),
		Command_delete: Command_delete_factory(env),
		Command_edit  : Command_edit_factory  (env),
		Command_load  : Command_load_factory  (env),
		Command_new   : Command_new_factory   (env),
		Command_link  : Command_link_factory  (env),
		Command_unlink: Command_unlink_factory(env)
	};
};
