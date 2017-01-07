import isInteger   from 'lodash-bound/isInteger';
import isString    from 'lodash-bound/isString';
import isUndefined from 'lodash-bound/isUndefined';
import entries     from 'lodash-bound/entries';

import assert from 'power-assert';

import _uniqueId from 'lodash/uniqueId';

/* convenience functions */
function valueOrReference(val) {
	if (val && val.constructor && (val.constructor.isResource || val.constructor.isRelationship)) {
		return val.id;
	} else {
		return val;
	}
}
function hrefFromIdOrHref(idOrHref) {
	if (idOrHref::isString()) {
		return idOrHref;
	} else if (idOrHref::isInteger()) {
		return `mock-server://${idOrHref}`;
	}
}

/* super-simple storage implementation */
export const simpleMockHandlers = () => {
	
	/* storage of all entities by a simple object, mapped by href */
	const storageByHref = {};
	
	/* the backend object exposes CRUD operations to the simple storage */
	/* and the frontend interface (implementing commit & load) */
	const backend = {
		
		create(entity) {
			const id     = parseInt(_uniqueId());
			const href   = hrefFromIdOrHref(id);
			const object = { id, href };
			for (let [key, field] of entity.fields::entries()) {
				if (key === 'id' || key === 'href') { continue }
				if (field.value::isUndefined())     { continue }
				object[key] = valueOrReference(field.value);
			}
			storageByHref[object.href] = object;
			return { id, href };
		},
		
		read(idOrHref) {
			return storageByHref[hrefFromIdOrHref(idOrHref)];
		},
		
		update(idOrHref, newValues) {
			const object = storageByHref[hrefFromIdOrHref(idOrHref)];
			for (let [key, val] of newValues::entries()) {
				object[key] = valueOrReference(val);
			}
		},
		
		delete(idOrHref) {
			delete storageByHref[hrefFromIdOrHref(idOrHref)];
		},
		
		allStoredEntities() {
			return storageByHref;
		},
		
		/* the interface to hand to the library when instantiating a module */
		frontendInterface: {
			async commit(command) {
				switch (command.commandType) {
					case 'new':    return backend.create(command.result);
					case 'edit':   return backend.update(command.entity.href, command.newValues);
					case 'delete': return backend.delete(command.entity.href);
				}
			},
			async load(idOrHref) {
				return backend.read(idOrHref);
			}
		}
		
	};
	return backend;
};
