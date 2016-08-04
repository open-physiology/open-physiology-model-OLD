import M from '../index';

import padEnd  from 'lodash-bound/padEnd';
import entries from 'lodash-bound/entries';
import size    from 'lodash-bound/size';

////////////////////////////////////////////////////////////////////////////////

let output = "";
const o = (...t) => {
	for (let t1 of t) {
		output += t1;
	}
};
for (let [,cls] of M.classes) {
	if (cls.isResource) {
		let entries = [];
		entries.largestKeySize = 0;
		
		/* properties */
		for (let [key, desc] of cls.properties::entries()) {
			
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
		for (let [key, desc] of (cls.relationships || {})::entries()) {
			
			entries.largestKeySize = Math.max(key.length, entries.largestKeySize);
			let entry = { key, op: ':' };
			entries.push(entry);
			
			let cardinality = (desc) => stringifyCardinality(desc.cardinality, {abbreviate: true});
			let arrow = (desc === desc.relationshipClass[1] ? '-->' : '<--');
			
			entry.desc = `(${cardinality(desc.codomain)})${arrow}(${cardinality(desc)})  ${desc.codomain.resourceClass.name}`;
			
			if (desc.options.anchors  ) { entry.desc += ' [anchors]'                   }
			if (desc.options.sustains ) { entry.desc += ' [sustains]'                  }
			if (desc.options.covariant) { entry.desc += ' [covariant]'                 }
			if (desc.shortcutKey      ) { entry.desc += ` [key='${desc.shortcutKey}']` }
			if (desc.properties && desc.properties::size() > 0) {
				entry.sub = [];
				entry.sub.largestKeySize = 0;
				
				for (let [pKey, pDesc] of desc.properties::entries()) {
					
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
			entry.key = entry.key::padEnd(entries.largestKeySize);
			o(entry.key, ' ', entry.op, '  ', entry.desc, ' ', '\n');
			for (let sub of entry.sub || []) {
				sub.key = sub.key::padEnd(entry.sub.largestKeySize);
				o(''::padEnd(entries.largestKeySize+4), sub.key, ' ', sub.op, '  ', sub.desc, '\n');
			}
		}
		o('\n');
		
		
	}
}


import fs from 'fs';
import {stringifyCardinality} from "../util/misc";
fs.writeFile('grouped-descriptions.txt', output, (err) => {
	if(err) { return console.log(err) }
	console.log("File saved: grouped-descriptions.txt");
});
