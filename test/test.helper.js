import { install } from 'source-map-support';
install();

import 'babel-polyfill';
import chai                   from 'chai';
import genericPlugin          from './generic.plugin';
import propertiesPlugin       from './properties.plugin';
import resourceCheckingPlugin from './resourceChecking.plugin';
import matchPatternPlugin     from 'chai-match-pattern';
import chaiAsPromised         from 'chai-as-promised';

chai.use(genericPlugin);
chai.use(propertiesPlugin);
chai.use(resourceCheckingPlugin);
chai.use(matchPatternPlugin);
chai.use(chaiAsPromised);

import mocha from 'mocha';
export const describe   = mocha.describe   || (global || window).describe;
export const it         = mocha.it         || (global || window).it;
export const xdescribe  = mocha.xdescribe  || (global || window).xdescribe;
export const xit        = mocha.xit        || (global || window).xit;
export const beforeEach = mocha.beforeEach || (global || window).beforeEach;
export const afterEach  = mocha.afterEach  || (global || window).afterEach;

export const expect = chai.expect;
export const _      = matchPatternPlugin.getLodashModule();
