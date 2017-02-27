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
