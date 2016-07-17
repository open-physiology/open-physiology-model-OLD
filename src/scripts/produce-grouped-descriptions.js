import resources      from '../modules/resources';
import typed          from '../modules/typed';
import lyphs          from '../modules/lyphs';
import processes      from '../modules/processes';
import measurables    from '../modules/measurables';
import groups         from '../modules/groups';
import omegaTrees     from '../modules/omegaTrees';
import research       from '../modules/research';
import visualizations from '../modules/visualisations';
import Module from '../Module';

import padEnd   from 'lodash/padEnd';

const M = new Module([
	resources,
	typed,
	lyphs,
	processes,
	measurables,
	groups,
	omegaTrees,
	research,
	visualizations
]);

////////////////////////////////////////////////////////////////////////////////

let output = "";
const o = (...t) => { for (let t1 of t) { output += t1 } };
for (let [,cls] of M.classes) {
	if (cls.isResource) {
		let entries = [];
		entries.largestKeySize = 0;
		
		/* properties */
		for (let [key, desc] of Object.entries(cls.properties)) {
			
			entries.largestKeySize = Math.max(key.length, entries.largestKeySize);
			let entry = { key };
			entries.push(entry);
			
			if (typeof desc.value !== 'undefined') {
				entry.op = '=';
				entry.desc = `${JSON.stringify(desc.value)}`;
			} else {
				entry.op = ':';
				entry.desc = `${JSON.stringify(desc)}`;
			}
		}
		/* relationships */
		for (let [key, desc] of Object.entries(cls.relationships || {})) {
			
			entries.largestKeySize = Math.max(key.length, entries.largestKeySize);
			let entry = { key, op: ':' };
			entries.push(entry);
			
			let cardinality = (desc) => (desc.cardinality.min === desc.cardinality.max
				? `   ${desc.cardinality.min}`
				: `${desc.cardinality.min}..${desc.cardinality.max === Infinity ? '*' : desc.cardinality.max}`);
			let arrow = (desc === desc.relationship[1] ? '-->' : '<--');
			
			entry.desc = `(${cardinality(desc.other)})${arrow}(${cardinality(desc)})  ${desc.class.name}`;
			
			if (desc.options.anchors  ) { entry.desc += ' [anchors]'                   }
			if (desc.options.sustains ) { entry.desc += ' [sustains]'                  }
			if (desc.options.covariant) { entry.desc += ' [covariant]'                 }
			if (desc.options.key      ) { entry.desc += ` [key='${desc.options.key}']` }
			if (desc.properties && Object.keys(desc.properties).length > 0) {
				
				entry.sub = [];
				entry.sub.largestKeySize = 0;
				
				for (let [pKey, pDesc] of Object.entries(desc.properties)) {
					
					entry.sub.largestKeySize = Math.max(pKey.length, entry.sub.largestKeySize);
					let sub = { key: pKey };
					entry.sub.push(sub);
					
					if (typeof pDesc.value !== 'undefined') {
						sub.op = '=';
						sub.desc = `${JSON.stringify(pDesc.value)}`;
					} else {
						sub.op = ':';
						sub.desc = `${JSON.stringify(pDesc)}`;
					}
				}
			}
		}
		
		/* generating the output */
		o('========================================\n');
		o(cls.name);
		if (cls.abstract) { o(' [abstract]') }
		let aClassesIn = [...M.classes.verticesTo(cls.name)].map(pair=>pair[1]);
		if (aClassesIn.length > 0) { o(` [extends ${aClassesIn.map(c=>c.name).join(', ')}]`) }
		o('\n');
		o('----------------------------------------\n');
		for (let entry of entries || []) {
			entry.key = padEnd(entry.key, entries.largestKeySize);
			o(entry.key, ' ', entry.op, '  ', entry.desc, ' ', '\n');
			for (let sub of entry.sub || []) {
				sub.key = padEnd(sub.key, entry.sub.largestKeySize);
				o(padEnd('', entries.largestKeySize+4), sub.key, ' ', sub.op, '  ', sub.desc, '\n');
			}
		}
		o('\n');
		
		
	}
}


import fs from 'fs';
fs.writeFile('grouped-descriptions.txt', output, (err) => {
	if(err) { return console.log(err) }
	console.log("File saved: grouped-descriptions.txt");
});
