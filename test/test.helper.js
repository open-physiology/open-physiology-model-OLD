import 'babel-polyfill';
import chai                   from 'chai';
import genericPlugin          from './generic.plugin';
import propertiesPlugin       from './properties.plugin';
import resourceCheckingPlugin from './resourceChecking.plugin';
import matchPatternPlugin     from 'chai-match-pattern';

chai.use(genericPlugin);
chai.use(propertiesPlugin);
chai.use(resourceCheckingPlugin);
chai.use(matchPatternPlugin);

export {describe, it, xdescribe, xit} from 'mocha';
export const expect = chai.expect;
export const _      = matchPatternPlugin.getLodashModule();
