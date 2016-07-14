module.exports = function (wallaby) {
  return {

    files: [
      { pattern: 'src/**/*.js'         },
      { pattern: 'test/**/*.plugin.js' },
      { pattern: 'test/**/*.helper.js' },
      // { pattern: 'node_modules/graph.js/dist/graph.es6.js', instrument }, // TODO: why does 'instrument: false' not work?
    ],

    tests: [
      'test/**/*.spec.js'
    ],

    compilers: {
      '**/*.js': wallaby.compilers.babel()
    },

    env: { type: 'node' },

    testFramework: 'mocha',

    bootstrap: function () {
      var modulePrototype = require('module').Module.prototype;
      if(!modulePrototype._originalRequire) {
        modulePrototype._originalRequire = modulePrototype.require;
        modulePrototype.require = function (filePath) {
          var exports = modulePrototype._originalRequire.call(this, filePath);
          if (filePath === 'mocha') {
            exports.describe = global.describe;
            exports.it = global.it;
          }
          return exports;
        };
      }
    }

  };
};
