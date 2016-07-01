////////////////////////////////////////////////////////////////////////////////
// Schema Data Types                                                          //
////////////////////////////////////////////////////////////////////////////////

export const identifierRegex = `^[a-zA-Z_][a-zA-Z0-9_]*$`;

export const qualitySchema = {
	type: 'string'
};

export const identifierSchema = {
	type:    'string',
	pattern: '^[a-zA-Z_][a-zA-Z0-9_]*$'
};

export const uriSchema = {
	type: 'string',
	format: 'uri'
};

export const idSchema = {
	type: 'integer'
};

export const enumSchema = (...candidates) => ({
	type: 'string',
	enum: candidates
});

export const enumArraySchema = (...candidates) => ({
	type       : 'array',
	items      : { ...enumSchema(...candidates) },
	uniqueItems: true,
	maxItems   : candidates.length
});

export const arrayContainsValue = (array, value) => array.includes(value);

export const minusPlusSchema = enumSchema('minus', 'plus');

export const innerOuterSchema = enumSchema('inner', 'outer');

export const lyphDirectionSchema = enumSchema(...minusPlusSchema.enum, ...innerOuterSchema.enum);

export const rationalNumberSchema = {
	type: 'object',
	properties: {
		'n': { type: 'integer', minimum: 0,                required: true }, // numerator
		'd': { type: 'integer', minimum: 1,    default: 1, required: true }, // denominator
		's': { type: 'integer', enum: [-1, 1], default: 1, required: true }  // sign
	}
};

export const angleSchema = {
	type: 'number',
	minimum: 0,   exclusiveMinimum: false,
	maximum: 360, exclusiveMaximum: true
};


////////////////////////////////////////////////////////////////////////////////
// Other useful stuff                                                         //
////////////////////////////////////////////////////////////////////////////////

export function isObject(val) {
	return val !== null && typeof val === 'object';
}
