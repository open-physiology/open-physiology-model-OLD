import 'babel-polyfill';
import chai                   from 'chai';
import propertiesPlugin       from './properties.plugin';
import resourceCheckingPlugin from './resourceChecking.plugin';
chai.use(propertiesPlugin);
chai.use(resourceCheckingPlugin);

export {describe, it} from 'mocha';
export const expect = chai.expect;
