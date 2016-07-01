import module from './module';

// import resources from './resources';
import resources from './resources';
const {Resource} = resources;


export default new module()


    .RESOURCE({

        name: 'ValueDistribution',

        extends: Resource,
        abstract: true

    })


    .RESOURCE(({ValueDistribution}) => [{

        name: 'Constant',

        extends: ValueDistribution,

        properties: {
            'value': { required: true }
        }

    }])


    .RESOURCE(({ValueDistribution}) => [{

        name: 'BoundedNormalDistribution',

        extends: ValueDistribution,

        properties: {
            'mean': { type: 'number', required: true },
            'std':  { type: 'number', required: true },
            'min':  { type: 'number', required: true },
            'max':  { type: 'number', required: true }
        }

    }])


    .RESOURCE(({ValueDistribution}) => [{

        name: 'UniformDistribution',

        extends: ValueDistribution,

        properties: {
            'min':  { type: 'number', required: true },
            'max':  { type: 'number', required: true }
        }

    }]);
