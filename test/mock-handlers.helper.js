import isInteger   from 'lodash-bound/isInteger';
import isString    from 'lodash-bound/isString';
import isUndefined from 'lodash-bound/isUndefined';
import isArray     from 'lodash-bound/isArray';
import isObject    from 'lodash-bound/isObject';
import entries     from 'lodash-bound/entries';
import keys        from 'lodash-bound/keys';
import values      from 'lodash-bound/values';
import pickBy      from 'lodash-bound/pickBy';
import parseInt    from 'lodash-bound/parseInt';
import cloneDeep   from 'lodash-bound/cloneDeep';

import assert from 'power-assert';

import _uniqueId from 'lodash/uniqueId';
import {humanMsg} from "../src/util/misc";

/* convenience functions */
function valueOrReference(val) {
	if (val && val.constructor && (val.constructor.isResource || val.constructor.isRelationship)) {
		return {
			href:  val.href,
			class: val.class
		};
	} else {
		return val;
	}
}
function hrefFromAddress(address = {}) {
	if (address::isString()) { return address      }
	if (address::isObject()) { return address.href }
	throw new Error(humanMsg`The given value ${address} is not a recognized identifier.`);
}

/* super-simple storage implementation */
export const simpleMockHandlers = () => {
	/* a way for test suites to register the environment to these mock-handlers */
	let environment;
	function registerEnvironment(e) {
		environment = e;
	}
	
	/* storage of all entities by a simple object, mapped by href */
	const storageByHref = {};
	
	/* the backend object exposes CRUD operations to the simple storage */
	/* and the frontend interface (implementing commit & load) */
	const backend = {
		
		create(values, customHref) {
			const id   = _uniqueId()::parseInt();
			const href = customHref || `mock-backend://${id}`;
			return storageByHref[href] = { ...values, href };
		},
		
		read(address) {
			return storageByHref[hrefFromAddress(address)];
		},
		
		readAll() {
			return storageByHref::values();
		},
		
		update(address, newValues) {
			const object = storageByHref[hrefFromAddress(address)];
			for (let [key, val] of newValues::entries()) {
				// TODO: actually look at manifest to see what to set
				object[key] = valueOrReference(val);
			}
			return object;
		},
		
		delete(idOrHref) {
			delete storageByHref[hrefFromAddress(idOrHref)];
		}
		
	};
	
	/* the interface to hand to the library when instantiating a module */
	const frontend = {
		async commit_new({values}) {
			return backend.create(values)::cloneDeep();
		},
		async commit_edit({entity, newValues}) {
			return backend.update(entity, newValues)::cloneDeep();
		},
		async commit_delete({entity}) {
			return backend.delete(entity)::cloneDeep();
		},
		async load(addresses, options = {}) {
			return addresses.map(addr => backend.read(addr)::cloneDeep());
		},
		async loadAll(cls, options = {}) {
			return backend.readAll().filter(e => cls.hasSubclass(cls.environment.classes[e.class]))::cloneDeep();
		}
	};
	
	return { backend, frontend, registerEnvironment };
};
