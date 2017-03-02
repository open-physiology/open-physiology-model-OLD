/**
	import ajaxBackend from './node_modules/open-physiology-model/dist/ajaxBackend.js';
	let environment = moduleFactory(frontend);
	let {backend, register} = ajaxBackend();
	register({
		environment: environment,
		baseURL:     'http://localhost:8888',
		ajax:        $.ajax
	});
	// use backend
*/

/* super-simple storage implementation */
export const ajaxBackend = () => {
	/* a way for test suites to register the environment to these mock-handlers */
	let environment, ajax, baseURL;
	function register({environment: e, ajax: ajx, baseURL: burl}) {
		environment = e;
		ajax        = (...args) => Promise.resolve(ajx(...args));
		baseURL     = burl;
	}
	
	/* the interface to hand to the library when instantiating a module */
	const backend = {
		commit_new({values}) {
			return ajax({
				url:    `${baseURL}/${values.class}`,
				method: 'POST',
				data:   values
			});
		},
		commit_edit({entity, newValues}) {
			return ajax({
				url:    entity.href || `${baseURL}/${entity.constructor.name}/${entity.id}`,
				method: 'POST',
				data:   newValues
			});
		},
		commit_delete({entity}) {
			return ajax({
				url:    entity.href || `${baseURL}/${entity.constructor.name}/${entity.id}`,
				method: 'DELETE'
			});
		},
		load(addresses, options = {}) {
			// TODO
			assert(false, `Sorry, the load method is not yet implemented. Please use loadAll for now.`);
		},
		loadAll(cls, options = {}) {
			return ajax({
				url:    `${baseURL}/${cls.isResource ? cls.plural : cls.name}`,
				method: 'GET'
			});
		}
	};
	
	return { backend, register };
};

// TODO: unit tests
