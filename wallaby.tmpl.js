'use strict';

// var wallabyWebpack = require('wallaby-webpack');
//
// var webpackConfig = require('./webpack.config-test.js');
// webpackConfig.module.loaders = webpackConfig.module.loaders.filter(function (l) { return l.use !== 'babel' });
// delete webpackConfig.devtool;
// var wallabyPostprocessor = wallabyWebpack(webpackConfig);

module.exports = function (tests) {
	tests = tests.map(function (pattern) {
		return { pattern: pattern };
	});
	
	console.log(tests);
	
	return function (wallaby) {
		return {
			
			files: [
				{ pattern: 'src/**/*.js',         },
				{ pattern: 'src/**/*.png',        },
				{ pattern: 'test/**/*.plugin.js', },
				{ pattern: 'test/**/*.helper.js', },
			],
			
			tests: tests,
			
			env: { type: 'node' },
			
			testFramework: 'mocha',
			
			maxConsoleMessagesPerTest: 1000,
			
			preprocessors: {
		      'src/**/*.png': function (file) { return '' }
		    },
			
			compilers: {
				'**/*.js': wallaby.compilers.babel()
			},
			
			// postprocessor: wallabyPostprocessor,

			bootstrap: function (wallaby) {
				wallaby.testFramework.timeout(10000);
			},
			
			debug: true
			
		};
	};
};
