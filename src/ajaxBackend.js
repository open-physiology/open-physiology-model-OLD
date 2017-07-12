/**
	import ajaxBackend from './node_modules/open-physiology-model/dist/ajaxBackend.js';
	let {backend} = ajaxBackend({
		baseURL:     'http://localhost:8888',
		ajax:        $.ajax
	});
	// use backend
*/

/* super-simple storage implementation */
export default ({ajax: ajx, baseURL: burl}) => {
	const ajax    = (...args) => Promise.resolve(ajx(...args)),
	      baseURL = burl;
	
	/* the interface to hand to the library when instantiating a module */
	const backend = {
		async commit_new(values) {
			return await ajax({
				url:    `${baseURL}/${values.class}`,
				method: 'POST',
				contentType: 'application/json',
				data:   JSON.stringify(values)
			});
		},
		async commit_edit(address, newValues) {
			return await ajax({
				url:  `${baseURL}/${address.class}/${address.id}`,
				method: 'POST',
				contentType: 'application/json',
				data:   JSON.stringify(newValues)
			});
		},
		async commit_delete(address) {
			return ajax({
				url: `${baseURL}/${address.class}/${address.id}`,
				method: 'DELETE',
				contentType: 'application/json'
			});
		},
        async commit_link(address1, key, address2) {
            return ajax({
                url: `${baseURL}/${address1.class}/${address1.id}/${key}/${address2.id}`,
                method: 'PUT',
                contentType: 'application/json'
            });
        },
        async commit_unlink(address1, key, address2) {
            return ajax({
                url: `${baseURL}/${address1.class}/${address1.id}/${key}/${address2.id}`,
                method: 'DELETE',
                contentType: 'application/json'
            });
        },
		async load(addresses) {
			//TODO: this is a quick implementation for testing,
			//needs rewriting to stack requests for the same entity class
			return await Promise.all(addresses.map(address => ajax({
				url:    `${baseURL}/${address.class}/${address.id}`,
				method: 'GET',
				contentType: 'application/json'
			})));
		},
		async loadAll({class: clsName}) {
			return await ajax({
				url:    `${baseURL}/${clsName}`,
				method: 'GET',
				contentType: 'application/json'
			});
		}
	};
	
	return {backend};
};

// TODO: unit tests
