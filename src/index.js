import resources      from './modules/resources';
import typed          from './modules/typed';
import lyphs          from './modules/lyphs';
import groups         from './modules/groups';
import measurables    from './modules/measurables';
import omegaTrees     from './modules/omegaTrees';
import processes      from './modules/processes';
import research       from './modules/research';
import visualisations from './modules/visualisations';

import Module from './Module';

export default Module.create('all', [
	resources,
	typed,
	lyphs,
	groups,
	measurables,
	omegaTrees,
	processes,
	research,
	visualisations
]);
