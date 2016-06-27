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

export const minusPlusSchema = {
	type: 'string',
	enum: ['minus', 'plus']
};

export const innerOuterSchema = {
	type: 'string',
	enum: ['inner', 'outer']
};

export const lyphDirectionSchema = {
	type: minusPlusSchema.type,
	enum: [...minusPlusSchema.enum, ...innerOuterSchema.enum]
};

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
