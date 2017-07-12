/**
	import ajaxBackend from './node_modules/open-physiology-model/dist/ajaxBackend.js';
	let {backend} = ajaxBackend({
		baseURL:     'http://localhost:8888',
		ajax:        $.ajax
	});
	// use backend
*/


// TODO: FIX TO NEW CODE


import {camelCase} from 'lodash-bound';

/* super-simple storage implementation */
export default ({ajax: ajx, baseURL: burl}) => {
	const ajax    = (...args) => Promise.resolve(ajx(...args)),
	      baseURL = burl;
	
	/* the interface to hand to the library when instantiating a module */
	const backend = {
		commit_new({values}) {
			let cls = model[values.class];
			let classPath = cls.isResource ? cls.plural::camelCase() : cls.name;
			return ajax({
				url:    `${baseURL}/${classPath}`,
				method: 'POST',
				contentType: 'application/json',
				data:   JSON.stringify(values)
			});
		},
		commit_edit({entity, newValues}) {
			let cls = entity.constructor; // TODO: FIX
			let classPath = cls.isResource ? cls.plural::camelCase() : cls.name;
			return ajax({
				url:  `${baseURL}/${classPath}/${entity.id}`,
				method: 'POST',
				contentType: 'application/json',
				data:   JSON.stringify(newValues)
			});
		},
		commit_delete({entity}) {
			let cls = entity.constructor; // TODO: FIX
			let classPath = cls.isResource ? cls.plural::camelCase() : cls.name;
			return ajax({
				url: `${baseURL}/${classPath}/${entity.id}`,
				method: 'DELETE',
				contentType: 'application/json'
			});
		},
		load(addresses, options = {}) {
			//TODO: this is a quick implementation for testing, needs rewriting to stack requests for the same entity class
			let responses = [];
			Promise.all(Object.values(addresses).map(address => {
				let cls = address.class;
				let classPath = cls.isResource ? cls.plural::camelCase() : cls.name;
				ajax({
					url:    `${baseURL}/${classPath}/${address.id}`,
					method: 'GET',
					contentType: 'application/json'
				}).then((res) => {
					responses.push(res);
				});
			}));
			return responses;
		},
		loadAll(cls, options = {}) {
			return ajax({
				url:    `${baseURL}/${cls.isResource ? cls.plural::camelCase() : cls.name}`,
				method: 'GET',
				contentType: 'application/json'
			});
		}
	};
	
	return {backend};
};

// TODO: unit tests
