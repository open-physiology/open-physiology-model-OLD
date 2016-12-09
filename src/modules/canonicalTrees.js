import TypedModule from '../TypedModule';

import resources from './resources';
import typed     from './typed';
import groups    from './groups';
import lyphs     from './lyphs';


// TODO: remove this file when we've switched to canonicalTrees module
console.warn('Natallia: Note that the canonicalTrees module is now available. Give me a call on how to switch.');


export default TypedModule.create('canonicalTrees', [
	resources, typed, groups, lyphs
], (M, {
	IsRelatedTo, Template, Resource, Lyph, Node, Has, PullsIntoTypeDefinition
}) => {
	
	
	const CanonicalTree = M.TYPED_RESOURCE({////////////////////////////////////
		
		name: 'CanonicalTree',
		
		extends: Resource,
		
		singular: "canonical tree",
		
	});/////////////////////////////////////////////////////////////////////////
	
	const CanonicalTreeBranch = M.TYPED_RESOURCE({//////////////////////////////
		
		name: 'CanonicalTreeBranch',
		
		extends: Resource,
		
		singular: "canonical tree branch",
		
	});/////////////////////////////////////////////////////////////////////////
	
	const [FlowsTo] = M.RELATIONSHIP([{
		
		name: 'BranchesTo',
		
		extends: PullsIntoTypeDefinition,
		
		singular: "branches to",
		
		1: [CanonicalTree,       '0..*', {                key: 'childBranches' }],
		2: [CanonicalTreeBranch, '1..1', { anchors: true, key: 'parentTree'    }],
		
	}, {
		
		name: 'BranchesTo',
		
		extends: PullsIntoTypeDefinition,
		
		singular: "branches to",
		
		1: [CanonicalTreeBranch, '1..1', { anchors: true, key: 'childTree'    }],
		2: [CanonicalTree,       '0..1', {                key: 'parentBranch' }],
		
	}]);
	
	const IsConveyedBy = M.RELATIONSHIP({
		
		name: 'IsConveyedBy',
		
		extends: IsRelatedTo,
		
		singular: "is conveyed by",
		
		1: [CanonicalTreeBranch, '0..1', { anchors: true, key: 'conveyingLyphType' }],
		2: [Lyph.Type,           '0..*', {                                         }],
		
	});
	
});

