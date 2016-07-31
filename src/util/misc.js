////////////////////////////////////////////////////////////////////////////////
// Schema Data Types                                                          //
////////////////////////////////////////////////////////////////////////////////

import zip         from 'lodash/zip';
import isUndefined from 'lodash/isUndefined';
import trim        from 'lodash-bound/trim';
import isString    from 'lodash-bound/isString';
import isArray     from 'lodash-bound/isArray';
import isNumber    from 'lodash-bound/isNumber';
import isObject    from 'lodash-bound/isObject';
import isFunction  from 'lodash-bound/isFunction';
import assert      from 'power-assert';

////////////////////////////////////////////////////////////////////////////////

export const arrayContainsValue = (array, value) => array.includes(value);

export const simpleSpaced = (str) => str.replace(/\s+/mg, ' ');

export const humanMsg = (strings, ...values) => {
	let result = strings[0];
	for (let [val, str] of zip(values, strings.slice(1))) {
		result += val + simpleSpaced(str);
	}
	return result::trim();
};

export const inspect = (obj, options = {}) => {
	console.log(util.inspect(obj, Object.assign({
		colors: true,
		depth:  2
	}, options)));
};

export function mapOptionalArray(val, fn) {
	if (isUndefined(val)) { return [] }
	let isArr = val::isArray();
	val = (isArr ? val : [val]).map(fn);
	return isArr ? val : val[0];
}

export function arrayify(val) {
	if (isUndefined(val)) { return [] }
	if (val::isArray()) { return val }
	return [val];
}

export function parseCardinality(val) {
	assert(val::isString(), `
		A cardinality range has to be a string,
		but a value ${JSON.stringify(val)} was given.
	`);
	let match = val.match(/^(\d+)\.\.(\d+|\*)$/);
	assert(match && match.length === 3, `
		A cardinality range has to be in the form "min..max",
		but a value ${JSON.stringify(val)} was given.
	`);
	let [,min, max] = match;
	if (max === '*') { max = Infinity }
	else { max = parseInt(max, 10) }
	min = parseInt(min, 10);
	return {min, max};
}

export function normalizeToRange(val) {
	if (val::isNumber())       { val = {min: val, max: val} }
	else if (!val::isObject()) { val = {}                   }
	if (!val.min::isNumber()) { val.min = -Infinity }
	if (!val.max::isNumber()) { val.max =  Infinity }
	return val;
}

export function setDefault(obj, key, val) {
	if (isUndefined(obj[key])) {
		obj[key] = val;
	}
}

export const sw = (val, {autoInvoke = true} = {}) => (map) => {
	let result = ( (val in map) ? map[val] : map.default );
	if (autoInvoke && result::isFunction()) { result = result() }
	return result;
};
