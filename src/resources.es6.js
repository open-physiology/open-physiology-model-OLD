import {distributionSchema, polaritySchema, uriSchema} from './simple-data-types.es6.js';

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export class Resource {
	
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export class LyphTemplate {
	static singular = "lyph template";
	static plural = "lyph templates";
	static abbreviation = "lyphTmp";
	static schema = {
		properties: {
			name      : { type: 'string', 'x-required': true },
			length    : { ...distributionSchema },
			radius    : { ...distributionSchema }
		}
	}
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export class LayerTemplate {
	static singular = "layer template";
	static plural = "layer templates";
	static abbreviation = "layerTmp";
	static schema = {
		properties: {
			name     : { type: 'string' },
			thickness: {
				type      : 'object',
				properties: {
					min: { type: 'number' },
					max: { type: 'number' }
				},
				required  : ['min', 'max']
			}
		}
	}
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export class Lyph {
	static singular = "lyph";
	static plural = "lyphs";
	static schema = {
		properties: {
			name    : {
				type: 'string', 'x-required': true
			}
			,
			species : {
				type: 'string', 'x-required': true
			}
			,
			closedAt: {
				type       : 'array',
				items      : polaritySchema,
				uniqueItems: true,
				maxItems   : 2
			}
		}
	}
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export class Layer {
	static singular = "layer";
	static plural = "layers";
	static readOnly = true; // layers are added automatically for each lyph based on layer templates
	static schema = {
		properties: {}
	}
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export class Compartment {
	static singular = "compartment";
	static plural = "compartments";
	static schema = {
		properties: {}
	}
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export class Border {
	static singular = "border";
	static plural = "borders";
	static readOnly = true; // four borders are added automatically to all layers and lyphs
	static schema = {
		properties: {}
	}
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export class Correlation {
	static singular = "correlation";
	static plural = "correlations";
	static abbreviation = "corr";
	static schema = {
		properties: {
			comment: { type: 'string' }
		}
	}
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export class Publication {
	static singular = "publication";
	static plural = "publications";
	static abbreviation = "pub";
	static schema = {
		properties: {
			uri  : { ...uriSchema, 'x-required': true },
			title: { type: 'string' }
		}
	}
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export class ClinicalIndex {
	static singular = "clinical index";
	static plural = "clinical indices";
	static abbreviation = "cli";
	static schema = {
		properties: {
			uri  : { ...uriSchema, 'x-required': true },
			title: { type: 'string' }
		}
	}
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export class LocatedMeasure {
	static singular = "located measure";
	static plural = "located measures";
	static abbreviation = "lm";
	static schema = {
		properties: {
			quality: { type: 'string', 'x-required': true }
		}
	}
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export class BagOfPathologies {
	static singular = "bag of pathologies";
	static plural = "bags of pathologies";
	static abbreviation = "bop";
	static schema = {
		properties: {}
	}
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export class Node {
	static singular = "node";
	static plural = "nodes";
	static schema = {
		properties: {}
	}
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export class Process {
	static singular = "process";
	static plural = "processes";
	static abbreviation = "p";
	static schema = {
		properties: {
			// TODO: integrate potential processes here. no need for two types
		}
	}
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export class PotentialProcess {
	static singular = "potential process";
	static plural = "potential processes";
	static abbreviation = "pp";
	static schema = {
		properties: {}
	}
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export class CanonicalTree {
	static singular = "canonical tree";
	static plural = "canonical trees";
	static abbreviation = "ct";
	static schema = {
		properties: {
			name: { type: 'string' }
		}
	}
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export class CanonicalTreeLevel {
	static singular = "canonical tree level";
	static plural = "canonical tree level";
	static abbreviation = "ctl";
	static schema = {
		properties: {
			name           : { type: 'string' },
			branchingFactor: { type: 'number' },
			skipProbability: { type: 'number' }
		}
	}
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
