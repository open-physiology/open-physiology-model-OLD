/**
	import ajaxBackend from './node_modules/open-physiology-model/dist/ajaxBackend.js';
	let {backend} = ajaxBackend({
		baseURL:     'http://localhost:8888',
		ajax:        $.ajax
	});
	// use backend
*/


import manifestFactory from 'open-physiology-manifest';

const classes = manifestFactory().classes;



/**
 * Create a module backend that synchronizes with a lyph server
 * through its REST interface.
 * @param {Object}   options
 * @param {Function} options.ajax - a function with the same basic interface as `jQuery.ajax`
 * @return {{ backend: Backend }} a backend that can be used by a `Module` from open-physiology-model
 */
export default (options) => {
	const ajax    = (...args) => Promise.resolve(options.ajax(...args)),
	      baseURL = options.baseURL;
	
	/* the interface to hand to the library when instantiating a module */
	const backend = {
		async commit_new(values) {
			let response = await ajax({
				url:         `${baseURL}/${values.class}`,
				method:      'POST',
				contentType: 'application/json',
				data:        JSON.stringify(values)
			});
			if (typeof response === 'string') {
				response = JSON.parse(response);
			}
			return response[0];
		},
		async commit_edit(address, newValues) {
			let response = await ajax({
				url:  `${baseURL}/${address.class}/${address.id}`,
				method: 'POST',
				contentType: 'application/json',
				data:   JSON.stringify(newValues)
			});
			if (typeof response === 'string') {
				response = JSON.parse(response);
			}
			return response[0];
		},
		async commit_delete(address) {
			return await ajax({
				url: `${baseURL}/${address.class}/${address.id}`,
				method: 'DELETE',
				contentType: 'application/json'
			});
		},
        async commit_link(address1, key, address2) {
			let class1 = classes[address1.class].relationships[key].resourceClass.name;
            return await ajax({
                url: `${baseURL}/${class1}/${address1.id}/${key}/${address2.id}`,
                method: 'PUT',
                contentType: 'application/json'
            });
        },
        async commit_unlink(address1, key, address2) {
	        let class1 = classes[address1.class].relationships[key].resourceClass.name;
            return await ajax({
                url: `${baseURL}/${class1}/${address1.id}/${key}/${address2.id}`,
                method: 'DELETE',
                contentType: 'application/json'
            });
        },
		async load(addresses) {
			return JSON.parse(await Promise.all(addresses.map(address => ajax({
				url:    `${baseURL}/${address.class}/${address.id}`,
				method: 'GET',
				contentType: 'application/json'
			}))));
		},
		async loadAll({class: clsName}) {
			return JSON.parse(await ajax({
				url:    `${baseURL}/${clsName}`,
				method: 'GET',
				contentType: 'application/json'
			}));
		}
	};
	
	return {backend};
};
