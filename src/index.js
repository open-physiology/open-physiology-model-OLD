import resources      from './modules/resources';
import typed          from './modules/typed';
import lyphs          from './modules/lyphs';
import groups         from './modules/groups';
import measurables    from './modules/measurables';
import processes      from './modules/processes';
import canonicalTrees from './modules/canonicalTrees';
import research       from './modules/research';
import visualisations from './modules/visualisations';

import omegaTrees     from './modules/omegaTrees';
// TODO: ^ remove when we've switched to canonicalTrees

import Module from './Module';

export default Module.create('all', [
	resources,
	typed,
	lyphs,
	groups,
	measurables,
	processes,
	research,
	visualisations,
	
	omegaTrees, // TODO: <- remove when we've switched to canonical trees
	canonicalTrees,
    
    // FIXME: If omegaTrees is the last module in the list,
    // FIXME: Lyphs won't have a treeParent field. Likely
    // FIXME: because OmegaTreePart has `extendedBy: [Lyph]`,
    // FIXME: and `treeParent` is introduced on IT, rather than
    // FIXME: on Lyph directly.
]);
