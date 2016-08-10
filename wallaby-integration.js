module.exports = function (wallaby) {
	return {
		
		files: [
			{ pattern: 'src/**/*.js' },
			{ pattern: 'test/**/*.plugin.js' },
			{ pattern: 'test/**/*.helper.js' },
		],
		
		tests: [
			'test/integration.spec.js'
		],
		
		compilers: {
			'**/*.js': wallaby.compilers.babel()
		},
		
		env: { type: 'node' },
		
		testFramework: 'mocha',
		
		bootstrap: function () {
			
			wallaby.testFramework.timeout(5000);
			
			var modulePrototype = require('module').Module.prototype;
			if (!modulePrototype._originalRequire) {
				modulePrototype._originalRequire = modulePrototype.require;
				modulePrototype.require = function (filePath) {
					var exports = modulePrototype._originalRequire.call(this, filePath);
					if (filePath === 'mocha') {
						exports.describe = global.describe;
						exports.it = global.it;
						exports.xdescribe = global.xdescribe;
						exports.xit = global.xit;
					}
					return exports;
				};
			}
		}
		
	};
};
