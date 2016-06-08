////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// imports                                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/* local stuff */
import {OK}        from '../http-status-codes.es6.js';
import {pluckData} from '../utility.es6.js';


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// the algorithms                                                                                                     //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const $ref = (type) => ({ $ref: `#/definitions/${type}` });

/* the algorithms object */
export const algorithms = {

	lyphTemplatesBetween: {
		summary: `retrieve all lyph templates between given hierarchy bounds`,
		parameters: [{
			name:        'ids',
			in:          'path',
			description: "IDs of the lyph template bounds",
			required:     true,
			type:        'array',
			items:       {type: 'number'}
		}],
		responses: {
			[OK]: {
				description: `an array containing requested lyph templates`,
				schema: { type: 'array', items: $ref('LyphTemplate') }
			}
		},
		async run({resources, db, pathParams}) {

			/* throw a 404 if any of the resources don't exist */
			await db.assertResourcesExist(resources.LyphTemplate, pathParams.ids);

			// TODO: query option for 'inclusive' or 'exclusive' and set sensible default

			/* fetch the results */
			return await db.query(`
				MATCH  p = (lt1:LyphTemplate)
				           -[:LyphTemplateChildLyphTemplate*0..]->
				           (lt2:LyphTemplate)
				WHERE  lt1.id IN [${pathParams.ids.join(',')}] AND
				       lt2.id IN [${pathParams.ids.join(',')}]
				UNWIND nodes(p) AS n WITH n
				RETURN DISTINCT n;
			`).then(pluckData('n'));
		}
	},

	lyphTemplatesByFmaID: {
		summary: `retrieve the lyph templates corresponding to given fma ids`,
		parameters: [{
			name:        'fmaIDs',
			in:          'path',
			description: "FMA IDs of the requested lyph templates",
			required:     true,
			type:        'array',
			items:       {type: 'number'}
		}],
		responses: {
			[OK]: {
				description: `an array containing requested lyph templates in specified order`,
				schema: { type: 'array', items: $ref('LyphTemplate') }
			}
		},
		async run({db, pathParams}) {
			/* fetch the results */
			let results = await db.query(`
				MATCH  (n:LyphTemplate)
				WHERE  n.fmaID IN [${pathParams.fmaIDs.join(',')}]
				RETURN DISTINCT n;
			`).then(pluckData('n'));

			/* return results in proper order */
			return pathParams.fmaIDs.map(fmaID1 => results.find(({fmaID}) => fmaID1 === fmaID));
		}
	},

	lyphTemplatesByOldID: {
		summary: `retrieve the lyph templates corresponding to given ids from the old lyph server`,
		parameters: [{
			name:        'oldIDs',
			in:          'path',
			description: "IDs of the requested lyph templates in the old lyph server",
			required:     true,
			type:        'array',
			items:       {type: 'number'}
		}],
		responses: {
			[OK]: {
				description: `an array containing requested lyph templates in specified order`,
				schema: { type: 'array', items: $ref('LyphTemplate') }
			}
		},
		async run({db, pathParams}) {
			/* fetch the results */
			let results = await db.query(`
				MATCH  (n:LyphTemplate)
				WHERE  n.oldID IN [${pathParams.oldIDs.join(',')}]
				RETURN DISTINCT n;
			`).then(pluckData('n'));

			/* return results in proper order */
			return pathParams.oldIDs.map(oldID1 => results.find(({oldID}) => oldID1 === oldID));
		}
	}

};
