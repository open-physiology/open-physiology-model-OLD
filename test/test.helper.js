import { install } from 'source-map-support';
install();

import 'babel-polyfill';
import 'polyfill-function-prototype-bind';
import isPlainObject          from 'lodash-bound/isPlainObject';
import chai                   from 'chai';
import sinon                  from 'sinon';

export { chai, sinon };

import genericPlugin          from './generic.plugin';
import propertiesPlugin       from './properties.plugin';
import resourceCheckingPlugin from './resourceChecking.plugin';
import chaiAsPromised         from 'chai-as-promised';
import chaiThings             from 'chai-things';
import sinonChai              from 'sinon-chai';


/* activating chai plugins */
chai.use(chaiAsPromised); // keep this as the first plugin or it messes up other plugins
chai.use(genericPlugin);
chai.use(propertiesPlugin);
chai.use(resourceCheckingPlugin);
chai.use(chaiThings);
chai.use(sinonChai);

/* direct exports from respective packages */
import mocha from 'mocha';

const gw = global || window;
export const describe   = mocha.describe   || gw.describe;
export const it         = mocha.it         || gw.it;
export const beforeEach = mocha.beforeEach || gw.beforeEach;
export const afterEach  = mocha.afterEach  || gw.afterEach;
export const expect     = chai.expect;

/* special function for regression tests */
function regression_(metaOrDesc, desc) {
	let issue, date, description, fn;
	if (metaOrDesc::isPlainObject()) {
		[{issue, date}, description] =
		[metaOrDesc   , desc];
	} else {
		[description, fn      ] =
		[metaOrDesc , desc];
	}
	return `(regression${
		issue ? `: issue #${issue}` : date ? `: ${date}` : ''
	})${
		description ? ` ${description}` : ''
	}`;
}
export function regression(metaOrDesc, desc) {
	return regression_(metaOrDesc, desc);
}
// regression.skip = function skip(metaOrDesc, descOrFn, optFn) {
// 	return regression_(::it.skip, metaOrDesc, descOrFn, optFn);
// };
// regression.only = function only(metaOrDesc, descOrFn, optFn) {
// 	return regression_(::it.only, metaOrDesc, descOrFn, optFn);
// };
