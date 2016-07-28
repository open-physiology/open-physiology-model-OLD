////////////////////////////////////////////////////////////////////////////////
// Schema Data Types                                                          //
////////////////////////////////////////////////////////////////////////////////

import zip         from 'lodash/zip';
import trim        from 'lodash/trim';
import isString    from 'lodash/isString';
import isArray     from 'lodash/isArray';
import isUndefined from 'lodash/isUndefined';
import isNumber    from 'lodash/isNumber';
import isObject    from 'lodash/isObject';
import isFunction  from 'lodash/isFunction';
import assert     from 'power-assert';

////////////////////////////////////////////////////////////////////////////////

export const arrayContainsValue = (array, value) => array.includes(value);

export const simpleSpaced = (str) => str.replace(/\s+/mg, ' ');

export const humanMsg = (strings, ...values) => {
	let result = strings[0];
	for (let [val, str] of zip(values, strings.slice(1))) {
		result += val + simpleSpaced(str);
	}
	return trim(result);
};

export const inspect = (obj, options = {}) => {
	console.log(util.inspect(obj, Object.assign({
		colors: true,
		depth:  2
	}, options)));
};

export function mapOptionalArray(val, fn) {
	if (isUndefined(val)) { return [] }
	let isArray = Array.isArray(val);
	val = (isArray ? val : [val]).map(fn);
	return isArray ? val : val[0];
}

export function arrayify(val) {
	if (typeof val === 'undefined') { return [] }
	if (isArray(val)) { return val }
	return [val];
}

export function parseCardinality(val) {
	assert(isString(val), `
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
	if (isNumber(val))       { val = {min: val, max: val} }
	else if (!isObject(val)) { val = {}                   }
	if (!isNumber(val.min)) { val.min = -Infinity }
	if (!isNumber(val.max)) { val.max =  Infinity }
	return val;
}

export function setDefault(obj, key, val) {
	if (isUndefined(obj[key])) {
		obj[key] = val;
	}
}

export const sw = (val, {autoInvoke = true} = {}) => (map) => {
	let result = ( (val in map) ? map[val] : map.default );
	if (autoInvoke && isFunction(result)) { result = result() }
	return result;
};
