import Module from '../Module';

import resources   from './resources';
import measurables from './measurables';


export default Module.create('research', [
	resources, measurables
], (M, {
	Resource, IsRelatedTo, Measurable
}) => {
	
	
	const Correlation = M.RESOURCE({////////////////////////////////////////////
		
		name: 'Correlation',
		
		extends: Resource,
		
		singular: "correlation",
		
		properties: {
			'comment': { type: 'string' }
		}
		
	});/////////////////////////////////////////////////////////////////////////
	
	
	const InvolvesMeasurable = M.RELATIONSHIP({
		
		name: 'InvolvesMeasurable',
		
		extends: IsRelatedTo,
		
		singular: "involves measurable",
		
		1: [Correlation, '0..*', { anchors: true, key: 'measurables' }],
		2: [Measurable,  '0..*',                                      ],
		
	});
	
	
	const ClinicalIndex= M.RESOURCE({///////////////////////////////////////////
		
		name: 'ClinicalIndex',
		
		extends: Resource,
		
		singular: "clinical index",
		plural:   "clinical indices"
		
	});/////////////////////////////////////////////////////////////////////////
	
	
	const EncompassesClinicalIndex = M.RELATIONSHIP({
		
		name: 'EncompassesClinicalIndex',
		
		extends: IsRelatedTo,
		
		singular: "encompasses clinical index",
		
		1: [ClinicalIndex, '0..*', { anchors: true, key: 'children' }],
		2: [ClinicalIndex, '0..1', {                key: 'parent'   }],
		
		noCycles: true,
		
	});
	
	
	const InvolvesClinicalIndex = M.RELATIONSHIP({
		
		name: 'InvolvesClinicalIndex',
		
		extends: IsRelatedTo,
		
		singular: "involves clinical index",
		
		1: [Correlation,   '0..*', { anchors: true, key: 'clinicalIndices' }],
		2: [ClinicalIndex, '0..*',                                          ],
		
	});
	
	
	const Publication = M.RESOURCE({////////////////////////////////////////////
		
		name: 'Publication',
		
		extends: Resource,
		
		singular: "publication"
		
	});/////////////////////////////////////////////////////////////////////////
	
	
	const InvolvesPublication = M.RELATIONSHIP({
		
		name: 'InvolvesPublication',
		
		extends: IsRelatedTo,
		
		singular: "involves publication",
		
		1: [Correlation, '0..1', { anchors: true, key: 'publication' }],
		2: [Publication, '0..*',                                      ],
		
	});
	
	
});

