import isInteger   from 'lodash-bound/isInteger';
import isString    from 'lodash-bound/isString';
import isUndefined from 'lodash-bound/isUndefined';
import entries     from 'lodash-bound/entries';
import values      from 'lodash-bound/values';
import pickBy      from 'lodash-bound/pickBy';

import assert from 'power-assert';

import _uniqueId from 'lodash/uniqueId';
import {humanMsg} from "../src/util/misc";

/* convenience functions */
function valueOrReference(val) {
	if (val && val.constructor && (val.constructor.isResource || val.constructor.isRelationship)) {
		return val.id;
	} else {
		return val;
	}
}
function hrefFromIdOrHref(address = {}) {
	if (address::isString())  { address = { href: address } }
	if (address::isInteger()) { address = { id  : address } }
	if (address.href) {
		return address.href;
	} else if (address.id) {
		return `mock-server://${address.id}`;
	} else {
		throw new Error(humanMsg`The given value ${address} is not a recognized identifier.`);
	}
}

/* super-simple storage implementation */
export const simpleMockHandlers = () => {
	
	/* storage of all entities by a simple object, mapped by href */
	const storageByHref = {};
	
	/* the backend object exposes CRUD operations to the simple storage */
	/* and the frontend interface (implementing commit & load) */
	const backend = {
		
		create(values) {
			const id   = parseInt(_uniqueId());
			const href = hrefFromIdOrHref(id);
			return storageByHref[href] = { ...values, id, href };
		},
		
		read(idOrHref) {
			return storageByHref[hrefFromIdOrHref(idOrHref)];
		},
		
		readAll() {
			return storageByHref::values();
		},
		
		update(idOrHref, newValues) {
			const object = storageByHref[hrefFromIdOrHref(idOrHref)];
			for (let [key, val] of newValues::entries()) {
				object[key] = valueOrReference(val);
			}
		},
		
		delete(idOrHref) {
			delete storageByHref[hrefFromIdOrHref(idOrHref)];
		}
		
	};
	
	/* the interface to hand to the library when instantiating a module */
	const frontend = {
		async commit_new(values) {
			return backend.create(values);
		},
		async commit_edit(href, newValues) {
			return backend.update(href, newValues);
		},
		async commit_delete(href) {
			return backend.delete(href);
		},
		async load(idOrHref, options = {}) {
			return backend.read(idOrHref);
		},
		async loadAll(cls, options = {}) {
			// return backend.readAll()::pickBy(e => e.class === cls.name);
			return backend.readAll().filter(e => cls.hasSubclass(cls.environment.classes[e.class]));
		}
	};
	
	return { backend, frontend };
};
