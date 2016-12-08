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
	canonicalTrees,
	research,
	visualisations,
	
	omegaTrees // TODO: <- remove when we've switched to canonical trees
]);
