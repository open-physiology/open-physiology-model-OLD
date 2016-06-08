export const keySchema = {
	type: 'object',
	properties: {
		href: { type: 'string' }
	},
	required: ['href'],
	'x-skip-db': true
};

export const uriSchema = {
	type: 'string',
	format: 'uri'
};

export const idSchema = {
	type: 'integer'
};

export const sideSchema = {
	type: 'string',
	enum: ['plus', 'minus', 'inner', 'outer']
};

export const polaritySchema = {
	type: 'string',
	enum: ['plus', 'minus']
};

export const distributionSchema = {
	type: 'object',
	properties: {
		type: { type: 'string' }
	},
	required: ['type'],
	additionalProperties: {
		type: 'number'
	}
};
