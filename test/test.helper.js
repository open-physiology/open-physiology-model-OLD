import { install } from 'source-map-support';
install();

import 'babel-polyfill';
import isPlainObject          from 'lodash-bound/isPlainObject';
import chai                   from 'chai';
import genericPlugin          from './generic.plugin';
import propertiesPlugin       from './properties.plugin';
import resourceCheckingPlugin from './resourceChecking.plugin';
import chaiAsPromised         from 'chai-as-promised';
import chaiThings             from 'chai-things';

/* activating chai plugins */
chai.use(chaiAsPromised); // keep this as the first plugin or it messes up other plugins
chai.use(genericPlugin);
chai.use(propertiesPlugin);
chai.use(resourceCheckingPlugin);
chai.use(chaiThings);

/* direct exports from respective packages */
import mocha from 'mocha';
export const describe   = mocha.describe   || (global || window).describe;
export const it         = mocha.it         || (global || window).it;
export const xdescribe  = mocha.xdescribe  || (global || window).xdescribe;
export const xit        = mocha.xit        || (global || window).xit;
export const beforeEach = mocha.beforeEach || (global || window).beforeEach;
export const afterEach  = mocha.afterEach  || (global || window).afterEach;
export const expect = chai.expect;

/* special function for regression tests */
function regression_(itFn, metaOrDesc, descOrFn, optFn) {
	let issue, date, description, fn;
	if (metaOrDesc::isPlainObject()) {
		[{issue, date}, description, fn   ] =
		[metaOrDesc   , descOrFn   , optFn];
	} else {
		[description, fn      ] =
		[metaOrDesc , descOrFn];
	}
	return itFn(`(regression${
		issue ? `: issue #${issue}` : date ? `: ${date}` : ''
	})${
		description ? ` ${description}` : ''
	}`, fn);
}
export function regression(metaOrDesc, descOrFn, optFn) {
	return regression_(it, metaOrDesc, descOrFn, optFn);
}
regression.skip = function skip(metaOrDesc, descOrFn, optFn) {
	return regression_(::it.skip, metaOrDesc, descOrFn, optFn);
};
regression.only = function only(metaOrDesc, descOrFn, optFn) {
	return regression_(::it.only, metaOrDesc, descOrFn, optFn);
};
