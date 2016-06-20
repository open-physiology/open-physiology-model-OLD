import {RESOURCE} from './util';

import {Resource} from './resources';


///////////////////////////////////////////////////////////
export const ValueDistribution = RESOURCE('ValueDistribution', {

    extends: Resource,
    abstract: true

});
////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////
export const Constant = RESOURCE('Constant', {

    extends: ValueDistribution,

    properties: {
        'value': { required: true }
    }

});
////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////
export const BoundedNormalDistribution = RESOURCE('BoundedNormalDistribution', {

    extends: ValueDistribution,

    properties: {
        'mean': { type: 'number', required: true },
        'std':  { type: 'number', required: true },
        'min':  { type: 'number', required: true },
        'max':  { type: 'number', required: true }
    }

});
////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////
export const UniformDistribution = RESOURCE('UniformDistribution', {

    extends: ValueDistribution,

    properties: {
        'min':  { type: 'number', required: true },
        'max':  { type: 'number', required: true }
    }

});
////////////////////////////////////////////////////////////
