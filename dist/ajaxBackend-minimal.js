(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["OpenPhysiologyModel_ajaxBackend-minimal"] = factory();
	else
		root["OpenPhysiologyModel_ajaxBackend-minimal"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(259);


/***/ },

/***/ 259:
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	/**
		import ajaxBackend from './node_modules/open-physiology-model/dist/ajaxBackend.js';
		let environment = moduleFactory(frontend);
		let {backend, register} = ajaxBackend();
		register({
			environment: environment,
			baseURL:     'http://localhost:8888',
			ajax:        $.ajax
		});
		// use backend
	*/
	
	/* super-simple storage implementation */
	exports.default = function () {
		/* a way for test suites to register the environment to these mock-handlers */
		var environment = void 0,
		    ajax = void 0,
		    baseURL = void 0;
		function register(_ref) {
			var e = _ref.environment;
			var ajx = _ref.ajax;
			var burl = _ref.baseURL;
	
			environment = e;
			ajax = function ajax() {
				return Promise.resolve(ajx.apply(undefined, arguments));
			};
			baseURL = burl;
		}
	
		/* the interface to hand to the library when instantiating a module */
		var backend = {
			commit_new: function commit_new(_ref2) {
				var values = _ref2.values;
	
				return ajax({
					url: baseURL + '/' + values.class,
					method: 'POST',
					data: values
				});
			},
			commit_edit: function commit_edit(_ref3) {
				var entity = _ref3.entity;
				var newValues = _ref3.newValues;
	
				return ajax({
					url: entity.href || baseURL + '/' + entity.constructor.name + '/' + entity.id,
					method: 'POST',
					data: newValues
				});
			},
			commit_delete: function commit_delete(_ref4) {
				var entity = _ref4.entity;
	
				return ajax({
					url: entity.href || baseURL + '/' + entity.constructor.name + '/' + entity.id,
					method: 'DELETE'
				});
			},
			load: function load(addresses) {
				var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
				// TODO
			},
			loadAll: function loadAll(cls) {
				var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
				return ajax({
					url: baseURL + '/' + (cls.isResource ? cls.plural : cls.name),
					method: 'GET'
				});
			}
		};
	
		return { backend: backend, register: register };
	};
	
	// TODO: unit tests

/***/ }

/******/ })
});
;
//# sourceMappingURL=ajaxBackend-minimal.js.map