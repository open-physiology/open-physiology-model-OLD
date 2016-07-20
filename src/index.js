export * from './modules/resources';
export * from './modules/typed';
export * from './modules/lyphs';
export * from './modules/groups';
export * from './modules/measurables';
export * from './modules/omegaTrees';
export * from './modules/processes';
export * from './modules/research';
export * from './modules/visualisations';

import TypedModule    from './TypedModule';
import resources      from './modules/resources';
import typed          from './modules/typed';
import lyphs          from './modules/lyphs';
import groups         from './modules/groups';
import measurables    from './modules/measurables';
import omegaTrees     from './modules/omegaTrees';
import processes      from './modules/processes';
import research       from './modules/research';
import visualisations from './modules/visualisations';
export default new TypedModule('groups', [
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
