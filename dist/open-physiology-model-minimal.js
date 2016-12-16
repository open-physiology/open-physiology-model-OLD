(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["OpenPhysiologyModel"] = factory();
	else
		root["OpenPhysiologyModel"] = factory();
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
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(199);


/***/ },
/* 1 */,
/* 2 */,
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.xy_add = exports.stopPropagation = exports.withMod = exports.withoutMod = exports.args = exports.sw = exports.humanMsg = exports.simpleSpaced = exports.arrayContainsValue = undefined;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }(); ////////////////////////////////////////////////////////////////////////////////
	// Schema Data Types                                                          //
	////////////////////////////////////////////////////////////////////////////////
	
	exports.mapOptionalArray = mapOptionalArray;
	exports.wrapInArray = wrapInArray;
	exports.parseCardinality = parseCardinality;
	exports.stringifyCardinality = stringifyCardinality;
	exports.normalizeToRange = normalizeToRange;
	exports.setDefault = setDefault;
	exports.definePropertyByValue = definePropertyByValue;
	exports.definePropertiesByValue = definePropertiesByValue;
	exports.callOrReturn = callOrReturn;
	exports.which = which;
	exports.constraint = constraint;
	
	var _isUndefined = __webpack_require__(38);
	
	var _isUndefined2 = _interopRequireDefault(_isUndefined);
	
	var _trim = __webpack_require__(254);
	
	var _trim2 = _interopRequireDefault(_trim);
	
	var _isString = __webpack_require__(249);
	
	var _isString2 = _interopRequireDefault(_isString);
	
	var _isArray = __webpack_require__(141);
	
	var _isArray2 = _interopRequireDefault(_isArray);
	
	var _isNumber = __webpack_require__(247);
	
	var _isNumber2 = _interopRequireDefault(_isNumber);
	
	var _isObject = __webpack_require__(68);
	
	var _isObject2 = _interopRequireDefault(_isObject);
	
	var _isFunction = __webpack_require__(67);
	
	var _isFunction2 = _interopRequireDefault(_isFunction);
	
	var _isSet = __webpack_require__(248);
	
	var _isSet2 = _interopRequireDefault(_isSet);
	
	var _isWeakSet = __webpack_require__(250);
	
	var _isWeakSet2 = _interopRequireDefault(_isWeakSet);
	
	var _entries = __webpack_require__(21);
	
	var _entries2 = _interopRequireDefault(_entries);
	
	var _rearg = __webpack_require__(402);
	
	var _rearg2 = _interopRequireDefault(_rearg);
	
	var _boundNativeMethods = __webpack_require__(10);
	
	var _filter = __webpack_require__(25);
	
	var _zip2 = __webpack_require__(401);
	
	var _zip3 = _interopRequireDefault(_zip2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	////////////////////////////////////////////////////////////////////////////////
	
	var arrayContainsValue = exports.arrayContainsValue = function arrayContainsValue(array, value) {
		return array.includes(value);
	};
	
	var simpleSpaced = exports.simpleSpaced = function simpleSpaced(str) {
		return str.replace(/\s+/mg, ' ');
	};
	
	var humanMsg = exports.humanMsg = function humanMsg(strings) {
		var _context;
	
		for (var _len = arguments.length, vals = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
			vals[_key - 1] = arguments[_key];
		}
	
		var result = strings[0];
		var _iteratorNormalCompletion = true;
		var _didIteratorError = false;
		var _iteratorError = undefined;
	
		try {
			for (var _iterator = (0, _zip3.default)(vals, strings.slice(1))[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
				var _step$value = _slicedToArray(_step.value, 2);
	
				var val = _step$value[0];
				var str = _step$value[1];
	
				result += val + simpleSpaced(str);
			}
		} catch (err) {
			_didIteratorError = true;
			_iteratorError = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion && _iterator.return) {
					_iterator.return();
				}
			} finally {
				if (_didIteratorError) {
					throw _iteratorError;
				}
			}
		}
	
		return (_context = result, _trim2.default).call(_context);
	};
	
	function mapOptionalArray(val, fn) {
		var _context2;
	
		if ((_context2 = val, _isUndefined2.default).call(_context2)) {
			return [];
		}
		var isArr = (_context2 = val, _isArray2.default).call(_context2);
		val = (isArr ? val : [val]).map(fn);
		return isArr ? val : val[0];
	}
	
	function wrapInArray(val) {
		if (_isUndefined2.default.call(val)) {
			return [];
		}
		if (_isArray2.default.call(val) || _isSet2.default.call(val) || _isWeakSet2.default.call(val)) {
			return [].concat(_toConsumableArray(val));
		}
		return [val];
	}
	
	function parseCardinality(val) {
		var match = val.match(/^(\d+)\.\.(\d+|\*)$/);
	
		var _match = _slicedToArray(match, 3);
	
		var min = _match[1];
		var max = _match[2];
	
		if (max === '*') {
			max = Infinity;
		} else {
			max = parseInt(max, 10);
		}
		min = parseInt(min, 10);
		return { min: min, max: max };
	}
	
	function stringifyCardinality(cardinality) {
		var _ref = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
		var abbreviate = _ref.abbreviate;
	
		return cardinality.min === cardinality.max && abbreviate ? '   ' + cardinality.min : cardinality.min + '..' + (cardinality.max === Infinity ? '*' : cardinality.max);
	}
	
	function normalizeToRange(val) {
		var _context3;
	
		// assumes typedDistributionSchema
		// 'UniformDistribution' | 'BoundedNormalDistribution' | 'Number' | 'NumberRange'
		if (val.class === 'Number') {
			val = { min: val.value, max: val.value };
		}
		if (!(_context3 = val.min, _isNumber2.default).call(_context3)) {
			val.min = -Infinity;
		}
		if (!(_context3 = val.max, _isNumber2.default).call(_context3)) {
			val.max = Infinity;
		}
		return { min: val.min, max: val.max };
	}
	
	function setDefault(obj, key, val) {
		var _context4;
	
		if ((_context4 = obj[key], _isUndefined2.default).call(_context4)) {
			obj[key] = val;
		}
	}
	
	var sw = exports.sw = function sw(val) {
		var _ref2 = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
		var _ref2$autoInvoke = _ref2.autoInvoke;
		var autoInvoke = _ref2$autoInvoke === undefined ? true : _ref2$autoInvoke;
		return function (map) {
			var _context5;
	
			var result = val in map ? map[val] : map.default;
			if (autoInvoke && (_context5 = result, _isFunction2.default).call(_context5)) {
				result = result();
			}
			return result;
		};
	};
	
	function definePropertyByValue(key, value) {
		var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
	
		_boundNativeMethods.defineProperty.call(this, key, _extends({}, options, { value: value }));
	}
	
	function definePropertiesByValue(obj) {
		var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
		var _iteratorNormalCompletion2 = true;
		var _didIteratorError2 = false;
		var _iteratorError2 = undefined;
	
		try {
			for (var _iterator2 = _entries2.default.call(obj)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
				var _step2$value = _slicedToArray(_step2.value, 2);
	
				var key = _step2$value[0];
				var value = _step2$value[1];
	
				definePropertyByValue.call(this, key, value, options);
			}
		} catch (err) {
			_didIteratorError2 = true;
			_iteratorError2 = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion2 && _iterator2.return) {
					_iterator2.return();
				}
			} finally {
				if (_didIteratorError2) {
					throw _iteratorError2;
				}
			}
		}
	}
	
	function callOrReturn(context) {
		return _isFunction2.default.call(this) ? this.call(context) : this;
	}
	
	// n - number
	// s - string
	// b - boolean
	// f - function
	// O - any Object
	// a - Array
	// d - Date
	// r - RegExp
	// o - other Object (object which isn't Array, Date or RegExp)
	var args = exports.args = function args() {
		for (var _len2 = arguments.length, pattern = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
			pattern[_key2] = arguments[_key2];
		}
	
		return function (target, key, descriptor) {
			return _extends({}, descriptor, {
				value: _rearg2.default.expand.apply(_rearg2.default, pattern.concat([descriptor.value]))
			});
		};
	};
	
	var withoutMod = exports.withoutMod = function withoutMod() {
		for (var _len3 = arguments.length, modifiers = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
			modifiers[_key3] = arguments[_key3];
		}
	
		return function (event) {
			return modifiers.every(function (m) {
				return !event[m + 'Key'];
			});
		};
	};
	
	var withMod = exports.withMod = function withMod() {
		for (var _len4 = arguments.length, modifiers = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
			modifiers[_key4] = arguments[_key4];
		}
	
		return function (event) {
			return modifiers.every(function (m) {
				return event[m + 'Key'];
			});
		};
	};
	
	var stopPropagation = exports.stopPropagation = function stopPropagation(event) {
		event.preventDefault();
		event.stopPropagation();
	};
	
	function which(keyCode) {
		return _filter.filter.call(this, function (event) {
			return event.which === keyCode;
		});
	}
	
	var xy_add = exports.xy_add = function xy_add(a, b) {
		return {
			x: a.x + b.x,
			y: a.y + b.y
		};
	};
	
	function constraint(constraint, message) {
		if (!constraint) {
			throw new Error('Constraint Failure: ' + (message || '(no message)'));
		}
	}

/***/ },
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is classified as an `Array` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
	 * @example
	 *
	 * _.isArray([1, 2, 3]);
	 * // => true
	 *
	 * _.isArray(document.body.children);
	 * // => false
	 *
	 * _.isArray('abc');
	 * // => false
	 *
	 * _.isArray(_.noop);
	 * // => false
	 */
	var isArray = Array.isArray;
	
	module.exports = isArray;


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var baseHas = __webpack_require__(152),
	    baseKeys = __webpack_require__(290),
	    indexKeys = __webpack_require__(161),
	    isArrayLike = __webpack_require__(22),
	    isIndex = __webpack_require__(53),
	    isPrototype = __webpack_require__(76);
	
	/**
	 * Creates an array of the own enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects. See the
	 * [ES spec](http://ecma-international.org/ecma-262/6.0/#sec-object.keys)
	 * for more details.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.keys(new Foo);
	 * // => ['a', 'b'] (iteration order is not guaranteed)
	 *
	 * _.keys('hi');
	 * // => ['0', '1']
	 */
	function keys(object) {
	  var isProto = isPrototype(object);
	  if (!(isProto || isArrayLike(object))) {
	    return baseKeys(object);
	  }
	  var indexes = indexKeys(object),
	      skipIndexes = !!indexes,
	      result = indexes || [],
	      length = result.length;
	
	  for (var key in object) {
	    if (baseHas(object, key) &&
	        !(skipIndexes && (key == 'length' || isIndex(key, length))) &&
	        !(isProto && key == 'constructor')) {
	      result.push(key);
	    }
	  }
	  return result;
	}
	
	module.exports = keys;


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }
	
	function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }
	
	var _object = __webpack_require__(211);
	
	_defaults(exports, _interopRequireWildcard(_object));
	
	var _symbolJs = __webpack_require__(212);
	
	_defaults(exports, _interopRequireWildcard(_symbolJs));
	
	var _numberJs = __webpack_require__(210);
	
	_defaults(exports, _interopRequireWildcard(_numberJs));
	
	var _mathJs = __webpack_require__(209);
	
	_defaults(exports, _interopRequireWildcard(_mathJs));
	
	var _dateJs = __webpack_require__(207);
	
	_defaults(exports, _interopRequireWildcard(_dateJs));
	
	var _arrayJs = __webpack_require__(206);
	
	_defaults(exports, _interopRequireWildcard(_arrayJs));
	
	var _arrayBufferJs = __webpack_require__(205);
	
	_defaults(exports, _interopRequireWildcard(_arrayBufferJs));
	
	var _jsonJs = __webpack_require__(208);
	
	_defaults(exports, _interopRequireWildcard(_jsonJs));

/***/ },
/* 11 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is the
	 * [language type](http://www.ecma-international.org/ecma-262/6.0/#sec-ecmascript-language-types)
	 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(_.noop);
	 * // => true
	 *
	 * _.isObject(null);
	 * // => false
	 */
	function isObject(value) {
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
	}
	
	module.exports = isObject;


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var isFunction_1 = __webpack_require__(176);
	var Subscription_1 = __webpack_require__(124);
	var Observer_1 = __webpack_require__(404);
	var rxSubscriber_1 = __webpack_require__(126);
	/**
	 * Implements the {@link Observer} interface and extends the
	 * {@link Subscription} class. While the {@link Observer} is the public API for
	 * consuming the values of an {@link Observable}, all Observers get converted to
	 * a Subscriber, in order to provide Subscription-like capabilities such as
	 * `unsubscribe`. Subscriber is a common type in RxJS, and crucial for
	 * implementing operators, but it is rarely used as a public API.
	 *
	 * @class Subscriber<T>
	 */
	var Subscriber = (function (_super) {
	    __extends(Subscriber, _super);
	    /**
	     * @param {Observer|function(value: T): void} [destinationOrNext] A partially
	     * defined Observer or a `next` callback function.
	     * @param {function(e: ?any): void} [error] The `error` callback of an
	     * Observer.
	     * @param {function(): void} [complete] The `complete` callback of an
	     * Observer.
	     */
	    function Subscriber(destinationOrNext, error, complete) {
	        _super.call(this);
	        this.syncErrorValue = null;
	        this.syncErrorThrown = false;
	        this.syncErrorThrowable = false;
	        this.isStopped = false;
	        switch (arguments.length) {
	            case 0:
	                this.destination = Observer_1.empty;
	                break;
	            case 1:
	                if (!destinationOrNext) {
	                    this.destination = Observer_1.empty;
	                    break;
	                }
	                if (typeof destinationOrNext === 'object') {
	                    if (destinationOrNext instanceof Subscriber) {
	                        this.destination = destinationOrNext;
	                        this.destination.add(this);
	                    }
	                    else {
	                        this.syncErrorThrowable = true;
	                        this.destination = new SafeSubscriber(this, destinationOrNext);
	                    }
	                    break;
	                }
	            default:
	                this.syncErrorThrowable = true;
	                this.destination = new SafeSubscriber(this, destinationOrNext, error, complete);
	                break;
	        }
	    }
	    Subscriber.prototype[rxSubscriber_1.$$rxSubscriber] = function () { return this; };
	    /**
	     * A static factory for a Subscriber, given a (potentially partial) definition
	     * of an Observer.
	     * @param {function(x: ?T): void} [next] The `next` callback of an Observer.
	     * @param {function(e: ?any): void} [error] The `error` callback of an
	     * Observer.
	     * @param {function(): void} [complete] The `complete` callback of an
	     * Observer.
	     * @return {Subscriber<T>} A Subscriber wrapping the (partially defined)
	     * Observer represented by the given arguments.
	     */
	    Subscriber.create = function (next, error, complete) {
	        var subscriber = new Subscriber(next, error, complete);
	        subscriber.syncErrorThrowable = false;
	        return subscriber;
	    };
	    /**
	     * The {@link Observer} callback to receive notifications of type `next` from
	     * the Observable, with a value. The Observable may call this method 0 or more
	     * times.
	     * @param {T} [value] The `next` value.
	     * @return {void}
	     */
	    Subscriber.prototype.next = function (value) {
	        if (!this.isStopped) {
	            this._next(value);
	        }
	    };
	    /**
	     * The {@link Observer} callback to receive notifications of type `error` from
	     * the Observable, with an attached {@link Error}. Notifies the Observer that
	     * the Observable has experienced an error condition.
	     * @param {any} [err] The `error` exception.
	     * @return {void}
	     */
	    Subscriber.prototype.error = function (err) {
	        if (!this.isStopped) {
	            this.isStopped = true;
	            this._error(err);
	        }
	    };
	    /**
	     * The {@link Observer} callback to receive a valueless notification of type
	     * `complete` from the Observable. Notifies the Observer that the Observable
	     * has finished sending push-based notifications.
	     * @return {void}
	     */
	    Subscriber.prototype.complete = function () {
	        if (!this.isStopped) {
	            this.isStopped = true;
	            this._complete();
	        }
	    };
	    Subscriber.prototype.unsubscribe = function () {
	        if (this.isUnsubscribed) {
	            return;
	        }
	        this.isStopped = true;
	        _super.prototype.unsubscribe.call(this);
	    };
	    Subscriber.prototype._next = function (value) {
	        this.destination.next(value);
	    };
	    Subscriber.prototype._error = function (err) {
	        this.destination.error(err);
	        this.unsubscribe();
	    };
	    Subscriber.prototype._complete = function () {
	        this.destination.complete();
	        this.unsubscribe();
	    };
	    return Subscriber;
	}(Subscription_1.Subscription));
	exports.Subscriber = Subscriber;
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var SafeSubscriber = (function (_super) {
	    __extends(SafeSubscriber, _super);
	    function SafeSubscriber(_parent, observerOrNext, error, complete) {
	        _super.call(this);
	        this._parent = _parent;
	        var next;
	        var context = this;
	        if (isFunction_1.isFunction(observerOrNext)) {
	            next = observerOrNext;
	        }
	        else if (observerOrNext) {
	            context = observerOrNext;
	            next = observerOrNext.next;
	            error = observerOrNext.error;
	            complete = observerOrNext.complete;
	            if (isFunction_1.isFunction(context.unsubscribe)) {
	                this.add(context.unsubscribe.bind(context));
	            }
	            context.unsubscribe = this.unsubscribe.bind(this);
	        }
	        this._context = context;
	        this._next = next;
	        this._error = error;
	        this._complete = complete;
	    }
	    SafeSubscriber.prototype.next = function (value) {
	        if (!this.isStopped && this._next) {
	            var _parent = this._parent;
	            if (!_parent.syncErrorThrowable) {
	                this.__tryOrUnsub(this._next, value);
	            }
	            else if (this.__tryOrSetError(_parent, this._next, value)) {
	                this.unsubscribe();
	            }
	        }
	    };
	    SafeSubscriber.prototype.error = function (err) {
	        if (!this.isStopped) {
	            var _parent = this._parent;
	            if (this._error) {
	                if (!_parent.syncErrorThrowable) {
	                    this.__tryOrUnsub(this._error, err);
	                    this.unsubscribe();
	                }
	                else {
	                    this.__tryOrSetError(_parent, this._error, err);
	                    this.unsubscribe();
	                }
	            }
	            else if (!_parent.syncErrorThrowable) {
	                this.unsubscribe();
	                throw err;
	            }
	            else {
	                _parent.syncErrorValue = err;
	                _parent.syncErrorThrown = true;
	                this.unsubscribe();
	            }
	        }
	    };
	    SafeSubscriber.prototype.complete = function () {
	        if (!this.isStopped) {
	            var _parent = this._parent;
	            if (this._complete) {
	                if (!_parent.syncErrorThrowable) {
	                    this.__tryOrUnsub(this._complete);
	                    this.unsubscribe();
	                }
	                else {
	                    this.__tryOrSetError(_parent, this._complete);
	                    this.unsubscribe();
	                }
	            }
	            else {
	                this.unsubscribe();
	            }
	        }
	    };
	    SafeSubscriber.prototype.__tryOrUnsub = function (fn, value) {
	        try {
	            fn.call(this._context, value);
	        }
	        catch (err) {
	            this.unsubscribe();
	            throw err;
	        }
	    };
	    SafeSubscriber.prototype.__tryOrSetError = function (parent, fn, value) {
	        try {
	            fn.call(this._context, value);
	        }
	        catch (err) {
	            parent.syncErrorValue = err;
	            parent.syncErrorThrown = true;
	            return true;
	        }
	        return false;
	    };
	    SafeSubscriber.prototype._unsubscribe = function () {
	        var _parent = this._parent;
	        this._context = null;
	        this._parent = null;
	        _parent.unsubscribe();
	    };
	    return SafeSubscriber;
	}(Subscriber));
	//# sourceMappingURL=Subscriber.js.map

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _schemas = __webpack_require__(33);
	
	var _Module = __webpack_require__(46);
	
	var _Module2 = _interopRequireDefault(_Module);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = _Module2.default.create('resources', [], function (M) {
	
		var Resource = M.RESOURCE({ /////////////////////////////////////////////////////////////////
	
			name: 'Resource',
	
			abstract: true,
	
			singular: "resource",
	
			properties: {
				'id': _extends({}, _schemas.idSchema, { readonly: true }),
				'href': _extends({}, _schemas.uriSchema, { readonly: true }),
				'class': _extends({}, _schemas.identifierSchema, { readonly: true }),
				'name': { type: 'string' }
			}
	
		}); //////////////////////////////////////////////////////////////////////////
	
	
		var IsRelatedTo = M.RELATIONSHIP({
	
			name: 'IsRelatedTo',
	
			abstract: true,
	
			singular: "is related to",
	
			1: [Resource, '0..*'],
			2: [Resource, '0..*'],
	
			properties: {
				'id': _extends({}, _schemas.idSchema, { readonly: true }),
				'href': _extends({}, _schemas.uriSchema, { readonly: true }),
				'class': _extends({}, _schemas.identifierSchema, { readonly: true })
			}
	
		});
	
		var ExternalResource = M.RESOURCE({ ///////////////////////////////////////
	
			name: 'ExternalResource',
	
			extends: Resource,
	
			singular: "external resource",
	
			properties: {
				'uri': _extends({}, _schemas.uriSchema, { required: true }),
				'type': { type: 'string' } // "fma" or "cocomac", etc.
			}
	
		}); /////////////////////////////////////////////////////////////////////////
	
	
		var IsExternallyRelatedTo = M.RELATIONSHIP({
	
			name: 'IsExternallyRelatedTo',
	
			extends: IsRelatedTo,
	
			singular: "is externally related to",
	
			1: [ExternalResource, '0..*'],
			2: [ExternalResource, '0..*'],
	
			properties: {
				'type': { type: 'string', required: true }
			}
	
		});
	
		var CorrespondsTo = M.RELATIONSHIP({
	
			name: 'CorrespondsTo',
	
			extends: IsRelatedTo,
	
			singular: "corresponds to",
	
			1: [Resource, '0..*', { anchors: true, key: 'externals' }],
			2: [ExternalResource, '0..*', { key: 'locals' }]
	
		});
	});

/***/ },
/* 14 */,
/* 15 */,
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var freeGlobal = __webpack_require__(158);
	
	/** Detect free variable `self`. */
	var freeSelf = typeof self == 'object' && self && self.Object === Object && self;
	
	/** Used as a reference to the global object. */
	var root = freeGlobal || freeSelf || Function('return this')();
	
	module.exports = root;


/***/ },
/* 17 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */
	function isObjectLike(value) {
	  return !!value && typeof value == 'object';
	}
	
	module.exports = isObjectLike;


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _Module = __webpack_require__(46);
	
	var _Module2 = _interopRequireDefault(_Module);
	
	var _resources = __webpack_require__(13);
	
	var _resources2 = _interopRequireDefault(_resources);
	
	var _misc = __webpack_require__(3);
	
	var _schemas = __webpack_require__(33);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = _Module2.default.create('typed', [_resources2.default], function (M, _ref) {
		var Resource = _ref.Resource;
		var IsRelatedTo = _ref.IsRelatedTo;
	
	
		var Type = M.RESOURCE({ ///////////////////////////////////////////////////
	
			name: 'Type',
	
			extends: Resource,
	
			singular: "type"
	
		}); /////////////////////////////////////////////////////////////////////////
	
	
		var IsSubtypeOf = M.RELATIONSHIP({
	
			name: 'IsSubtypeOf',
	
			extends: IsRelatedTo,
	
			singular: "is subtype of",
	
			1: [Type, '0..*', { key: 'subtypes' }],
			2: [Type, '0..*', { anchors: true, key: 'supertypes' }],
	
			noCycles: true
	
		});
	
		var Template = M.RESOURCE({ ///////////////////////////////////////////////
	
			name: 'Template',
	
			abstract: true,
	
			extends: Resource,
	
			singular: "template",
	
			properties: {
				'cardinalityBase': _extends({}, _schemas.typedDistributionSchema, {
					default: 1
				}),
				'species': {
					type: 'string',
					isRefinement: function isRefinement(a, b) {
						return !a || a === b;
					}
				}
			}
	
		}); /////////////////////////////////////////////////////////////////////////
	
		_misc.definePropertyByValue.call(Template, 'Type', Type);
		_misc.definePropertyByValue.call(Type, 'Template', Template);
	
		var HasCardinalityMultipliedByThatOf = M.RELATIONSHIP({
	
			name: 'HasCardinalityMultipliedByThatOf',
	
			extends: IsRelatedTo,
	
			singular: "has cardinality multiplied by that of",
	
			1: [Template, '0..*', { anchors: true, key: 'cardinalityMultipliers' }],
			2: [Template, '0..*'],
	
			noCycles: true
	
		});
	
		var HasType = M.RELATIONSHIP({
	
			name: 'HasType',
	
			extends: IsRelatedTo,
	
			singular: "has type",
	
			1: [Template, '0..*', { anchors: true, key: 'types' }],
			2: [Type, '0..*']
	
		});
	
		var DefinesType = M.RELATIONSHIP({
	
			name: 'DefinesType',
	
			extends: HasType,
	
			singular: "defines type",
	
			1: [Template, '0..1', { anchors: true, key: 'definedType' }],
			2: [Type, '1..1', { anchors: true, key: 'definition' }]
	
		});
	
		var PullsIntoTypeDefinition = M.RELATIONSHIP({
	
			name: 'PullsIntoTypeDefinition',
	
			abstract: true,
	
			extends: IsRelatedTo,
	
			singular: "pulls into type definition",
			plural: "pull into type definition",
	
			1: [Template, '0..*'],
			2: [Template, '0..*']
	
		});
	
		var Has = M.RELATIONSHIP({
	
			name: 'Has',
	
			abstract: true,
	
			extends: PullsIntoTypeDefinition,
	
			singular: "has",
			plural: "have",
	
			1: [Template, '0..*', { anchors: true, key: 'children' }],
			2: [Template, '0..*', { key: 'parents' }],
	
			noCycles: true
	
		});
	});

/***/ },
/* 19 */
/***/ function(module, exports) {

	"use strict";
	
	exports.__esModule = true;
	
	exports["default"] = function (object, names) {
	  var rename = arguments[2] === undefined ? {} : arguments[2];
	  return names.reduce(function (m, name) {
	    m[rename[name] || name] = function () {
	      for (var _len = arguments.length, s = Array(_len), _key = 0; _key < _len; _key++) {
	        s[_key] = arguments[_key];
	      }
	
	      return this.constructor === Array && object === Math ? object[name].apply(object, this.concat(s)) : object[name].apply(object, [this].concat(s));
	    };
	
	    return m;
	  }, {});
	};
	
	module.exports = exports["default"];

/***/ },
/* 20 */,
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var fn = __webpack_require__(368);
	
	module.exports = function entries() {
	  return fn.apply(undefined, [this].concat(Array.prototype.slice.apply(arguments)));
	};


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	var getLength = __webpack_require__(323),
	    isFunction = __webpack_require__(79),
	    isLength = __webpack_require__(80);
	
	/**
	 * Checks if `value` is array-like. A value is considered array-like if it's
	 * not a function and has a `value.length` that's an integer greater than or
	 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
	 * @example
	 *
	 * _.isArrayLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isArrayLike(document.body.children);
	 * // => true
	 *
	 * _.isArrayLike('abc');
	 * // => true
	 *
	 * _.isArrayLike(_.noop);
	 * // => false
	 */
	function isArrayLike(value) {
	  return value != null && isLength(getLength(value)) && !isFunction(value);
	}
	
	module.exports = isArrayLike;


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var root_1 = __webpack_require__(88);
	var toSubscriber_1 = __webpack_require__(426);
	var symbol_observable_1 = __webpack_require__(178);
	/**
	 * A representation of any set of values over any amount of time. This the most basic building block
	 * of RxJS.
	 *
	 * @class Observable<T>
	 */
	var Observable = (function () {
	    /**
	     * @constructor
	     * @param {Function} subscribe the function that is  called when the Observable is
	     * initially subscribed to. This function is given a Subscriber, to which new values
	     * can be `next`ed, or an `error` method can be called to raise an error, or
	     * `complete` can be called to notify of a successful completion.
	     */
	    function Observable(subscribe) {
	        this._isScalar = false;
	        if (subscribe) {
	            this._subscribe = subscribe;
	        }
	    }
	    /**
	     * Creates a new Observable, with this Observable as the source, and the passed
	     * operator defined as the new observable's operator.
	     * @method lift
	     * @param {Operator} operator the operator defining the operation to take on the observable
	     * @return {Observable} a new observable with the Operator applied
	     */
	    Observable.prototype.lift = function (operator) {
	        var observable = new Observable();
	        observable.source = this;
	        observable.operator = operator;
	        return observable;
	    };
	    /**
	     * Registers handlers for handling emitted values, error and completions from the observable, and
	     *  executes the observable's subscriber function, which will take action to set up the underlying data stream
	     * @method subscribe
	     * @param {PartialObserver|Function} observerOrNext (optional) either an observer defining all functions to be called,
	     *  or the first of three possible handlers, which is the handler for each value emitted from the observable.
	     * @param {Function} error (optional) a handler for a terminal event resulting from an error. If no error handler is provided,
	     *  the error will be thrown as unhandled
	     * @param {Function} complete (optional) a handler for a terminal event resulting from successful completion.
	     * @return {ISubscription} a subscription reference to the registered handlers
	     */
	    Observable.prototype.subscribe = function (observerOrNext, error, complete) {
	        var operator = this.operator;
	        var sink = toSubscriber_1.toSubscriber(observerOrNext, error, complete);
	        if (operator) {
	            operator.call(sink, this);
	        }
	        else {
	            sink.add(this._subscribe(sink));
	        }
	        if (sink.syncErrorThrowable) {
	            sink.syncErrorThrowable = false;
	            if (sink.syncErrorThrown) {
	                throw sink.syncErrorValue;
	            }
	        }
	        return sink;
	    };
	    /**
	     * @method forEach
	     * @param {Function} next a handler for each value emitted by the observable
	     * @param {PromiseConstructor} [PromiseCtor] a constructor function used to instantiate the Promise
	     * @return {Promise} a promise that either resolves on observable completion or
	     *  rejects with the handled error
	     */
	    Observable.prototype.forEach = function (next, PromiseCtor) {
	        var _this = this;
	        if (!PromiseCtor) {
	            if (root_1.root.Rx && root_1.root.Rx.config && root_1.root.Rx.config.Promise) {
	                PromiseCtor = root_1.root.Rx.config.Promise;
	            }
	            else if (root_1.root.Promise) {
	                PromiseCtor = root_1.root.Promise;
	            }
	        }
	        if (!PromiseCtor) {
	            throw new Error('no Promise impl found');
	        }
	        return new PromiseCtor(function (resolve, reject) {
	            var subscription = _this.subscribe(function (value) {
	                if (subscription) {
	                    // if there is a subscription, then we can surmise
	                    // the next handling is asynchronous. Any errors thrown
	                    // need to be rejected explicitly and unsubscribe must be
	                    // called manually
	                    try {
	                        next(value);
	                    }
	                    catch (err) {
	                        reject(err);
	                        subscription.unsubscribe();
	                    }
	                }
	                else {
	                    // if there is NO subscription, then we're getting a nexted
	                    // value synchronously during subscription. We can just call it.
	                    // If it errors, Observable's `subscribe` imple will ensure the
	                    // unsubscription logic is called, then synchronously rethrow the error.
	                    // After that, Promise will trap the error and send it
	                    // down the rejection path.
	                    next(value);
	                }
	            }, reject, resolve);
	        });
	    };
	    Observable.prototype._subscribe = function (subscriber) {
	        return this.source.subscribe(subscriber);
	    };
	    /**
	     * An interop point defined by the es7-observable spec https://github.com/zenparsing/es-observable
	     * @method Symbol.observable
	     * @return {Observable} this instance of the observable
	     */
	    Observable.prototype[symbol_observable_1.default] = function () {
	        return this;
	    };
	    // HACK: Since TypeScript inherits static properties too, we have to
	    // fight against TypeScript here so Subject can have a different static create signature
	    /**
	     * Creates a new cold Observable by calling the Observable constructor
	     * @static true
	     * @owner Observable
	     * @method create
	     * @param {Function} subscribe? the subscriber function to be passed to the Observable constructor
	     * @return {Observable} a new cold observable
	     */
	    Observable.create = function (subscribe) {
	        return new Observable(subscribe);
	    };
	    return Observable;
	}());
	exports.Observable = Observable;
	//# sourceMappingURL=Observable.js.map

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Observable_1 = __webpack_require__(23);
	var do_1 = __webpack_require__(414);
	Observable_1.Observable.prototype.do = do_1._do;
	//# sourceMappingURL=do.js.map

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subscriber_1 = __webpack_require__(12);
	/**
	 * Filter items emitted by the source Observable by only emitting those that
	 * satisfy a specified predicate.
	 *
	 * <span class="informal">Like
	 * [Array.prototype.filter()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter),
	 * it only emits a value from the source if it passes a criterion function.</span>
	 *
	 * <img src="./img/filter.png" width="100%">
	 *
	 * Similar to the well-known `Array.prototype.filter` method, this operator
	 * takes values from the source Observable, passes them through a `predicate`
	 * function and only emits those values that yielded `true`.
	 *
	 * @example <caption>Emit only click events whose target was a DIV element</caption>
	 * var clicks = Rx.Observable.fromEvent(document, 'click');
	 * var clicksOnDivs = clicks.filter(ev => ev.target.tagName === 'DIV');
	 * clicksOnDivs.subscribe(x => console.log(x));
	 *
	 * @see {@link distinct}
	 * @see {@link distinctKey}
	 * @see {@link distinctUntilChanged}
	 * @see {@link distinctUntilKeyChanged}
	 * @see {@link ignoreElements}
	 * @see {@link partition}
	 * @see {@link skip}
	 *
	 * @param {function(value: T, index: number): boolean} predicate A function that
	 * evaluates each value emitted by the source Observable. If it returns `true`,
	 * the value is emitted, if `false` the value is not passed to the output
	 * Observable. The `index` parameter is the number `i` for the i-th source
	 * emission that has happened since the subscription, starting from the number
	 * `0`.
	 * @param {any} [thisArg] An optional argument to determine the value of `this`
	 * in the `predicate` function.
	 * @return {Observable} An Observable of values from the source that were
	 * allowed by the `predicate` function.
	 * @method filter
	 * @owner Observable
	 */
	function filter(predicate, thisArg) {
	    return this.lift(new FilterOperator(predicate, thisArg));
	}
	exports.filter = filter;
	var FilterOperator = (function () {
	    function FilterOperator(predicate, thisArg) {
	        this.predicate = predicate;
	        this.thisArg = thisArg;
	    }
	    FilterOperator.prototype.call = function (subscriber, source) {
	        return source._subscribe(new FilterSubscriber(subscriber, this.predicate, this.thisArg));
	    };
	    return FilterOperator;
	}());
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var FilterSubscriber = (function (_super) {
	    __extends(FilterSubscriber, _super);
	    function FilterSubscriber(destination, predicate, thisArg) {
	        _super.call(this, destination);
	        this.predicate = predicate;
	        this.thisArg = thisArg;
	        this.count = 0;
	        this.predicate = predicate;
	    }
	    // the try catch block below is left specifically for
	    // optimization and perf reasons. a tryCatcher is not necessary here.
	    FilterSubscriber.prototype._next = function (value) {
	        var result;
	        try {
	            result = this.predicate.call(this.thisArg, value, this.count++);
	        }
	        catch (err) {
	            this.destination.error(err);
	            return;
	        }
	        if (result) {
	            this.destination.next(value);
	        }
	    };
	    return FilterSubscriber;
	}(Subscriber_1.Subscriber));
	//# sourceMappingURL=filter.js.map

/***/ },
/* 26 */,
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _Module2 = __webpack_require__(46);
	
	var _Module3 = _interopRequireDefault(_Module2);
	
	var _defaults = __webpack_require__(66);
	
	var _defaults2 = _interopRequireDefault(_defaults);
	
	var _boundNativeMethods = __webpack_require__(10);
	
	var _misc = __webpack_require__(3);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return right[Symbol.hasInstance](left); } else { return _instanceof(left, right); } }
	
	function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	/**
	 * Typed Modules allow to more easily create related
	 * Type, Template and HasType classes. For example,
	 * to create LyphType and LyphTemplate resources and
	 * their HasType relationship from one description.
	 **/
	var TypedModule = function (_Module) {
		_inherits(TypedModule, _Module);
	
		function TypedModule() {
			_classCallCheck(this, TypedModule);
	
			return _possibleConstructorReturn(this, Object.getPrototypeOf(TypedModule).apply(this, arguments));
		}
	
		_createClass(TypedModule, [{
			key: 'TYPED_RESOURCE',
			value: function TYPED_RESOURCE(config) {
				var _this2 = this;
	
				return (0, _misc.mapOptionalArray)(config, function (conf) {
	
					_this2.basicNormalization(conf);
	
					var superClasses = (0, _misc.wrapInArray)(conf.extends || [_this2.classes.vertexValue('Template')]);
					var subClasses = (0, _misc.wrapInArray)(conf.extendedBy || []);
	
					/* handling properties */
					_defaults2.default.call(conf, {
						properties: {},
						patternProperties: {}
					});
	
					/* Template class */
					var newTemplateClass = _this2.RESOURCE({
	
						name: conf.name,
	
						extends: superClasses,
						extendedBy: subClasses,
	
						singular: conf.singular,
						plural: conf.plural,
	
						properties: conf.properties,
						patternProperties: conf.patternProperties,
	
						behavior: conf.behavior
	
					});
	
					// TODO: figure out if we still want to set
					//     : a property `Type` on each template class,
					//     : since a module now only has one Type class.
					var Type = _this2.classes.vertexValue('Type');
					_misc.definePropertyByValue.call(newTemplateClass, 'Type', Type);
	
					/* register and return */
					return newTemplateClass;
				});
			}
		}]);
	
		return TypedModule;
	}(_Module3.default);
	
	exports.default = TypedModule;

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.RelField = exports.Field = undefined;
	
	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _dec, _dec2, _dec3, _dec4, _desc, _value, _class, _descriptor, _descriptor2, _descriptor3, _descriptor4, _dec5, _desc2, _value2, _class3, _descriptor5;
	
	var _templateObject = _taggedTemplateLiteral(['\n\t\t\t\tTried to set the readonly field\n\t\t\t\t\'', '#', '\'.\n\t\t\t'], ['\n\t\t\t\tTried to set the readonly field\n\t\t\t\t\'', '#', '\'.\n\t\t\t']);
	
	var _Subject = __webpack_require__(81);
	
	var _map = __webpack_require__(82);
	
	var _concat = __webpack_require__(408);
	
	__webpack_require__(24);
	
	var _pick = __webpack_require__(252);
	
	var _pick2 = _interopRequireDefault(_pick);
	
	var _isFunction = __webpack_require__(67);
	
	var _isFunction2 = _interopRequireDefault(_isFunction);
	
	var _isUndefined = __webpack_require__(38);
	
	var _isUndefined2 = _interopRequireDefault(_isUndefined);
	
	var _values = __webpack_require__(107);
	
	var _values2 = _interopRequireDefault(_values);
	
	var _boundNativeMethods = __webpack_require__(10);
	
	var _ValueTracker2 = __webpack_require__(135);
	
	var _ValueTracker3 = _interopRequireDefault(_ValueTracker2);
	
	var _misc = __webpack_require__(3);
	
	var _symbols = __webpack_require__(29);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return right[Symbol.hasInstance](left); } else { return _instanceof(left, right); } }
	
	function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }
	
	function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }
	
	function _initDefineProp(target, property, descriptor, context) {
		if (!descriptor) return;
		Object.defineProperty(target, property, {
			enumerable: descriptor.enumerable,
			configurable: descriptor.configurable,
			writable: descriptor.writable,
			value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
		});
	}
	
	function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
		var desc = {};
		Object['ke' + 'ys'](descriptor).forEach(function (key) {
			desc[key] = descriptor[key];
		});
		desc.enumerable = !!desc.enumerable;
		desc.configurable = !!desc.configurable;
	
		if ('value' in desc || desc.initializer) {
			desc.writable = true;
		}
	
		desc = decorators.slice().reverse().reduce(function (desc, decorator) {
			return decorator(target, property, desc) || desc;
		}, desc);
	
		if (context && desc.initializer !== void 0) {
			desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
			desc.initializer = undefined;
		}
	
		if (desc.initializer === void 0) {
			Object['define' + 'Property'](target, property, desc);
			desc = null;
		}
	
		return desc;
	}
	
	function _initializerWarningHelper(descriptor, context) {
		throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
	}
	
	var Field = exports.Field = (_dec = (0, _ValueTracker2.event)(), _dec2 = (0, _ValueTracker2.event)(), _dec3 = (0, _ValueTracker2.property)({ initial: true, readonly: true }), _dec4 = (0, _ValueTracker2.property)(), (_class = function (_ValueTracker) {
		_inherits(Field, _ValueTracker);
	
		_createClass(Field, [{
			key: Symbol.toStringTag,
	
	
			//////////////
			// instance //
			//////////////
	
			//noinspection JSDuplicatedDeclaration // (to suppress Webstorm bug)
			get: function get() {
				return 'Field: ' + this[_symbols.$$owner].constructor.name + '#' + this[_symbols.$$key];
			}
		}], [{
			key: _symbols.$$registerFieldClass,
	
	
			////////////
			// static //
			////////////
	
			value: function value(FieldClass) {
				if (!this[_symbols.$$fieldClasses]) {
					this[_symbols.$$fieldClasses] = new Set();
				}
				this[_symbols.$$fieldClasses].add(FieldClass);
			}
		}, {
			key: 'augmentClass',
			value: function augmentClass(cls, onlyForKey) {
				if (!this[_symbols.$$fieldClasses]) {
					this[_symbols.$$fieldClasses] = new Set();
				}
	
				/* allow each kind of field to perform its initializations */
				var _iteratorNormalCompletion = true;
				var _didIteratorError = false;
				var _iteratorError = undefined;
	
				try {
					for (var _iterator = this[_symbols.$$fieldClasses][Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
						var FieldClass = _step.value;
						var _iteratorNormalCompletion2 = true;
						var _didIteratorError2 = false;
						var _iteratorError2 = undefined;
	
						try {
							for (var _iterator2 = FieldClass[_symbols.$$entriesIn](cls)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
								var _step2$value = _step2.value;
								var key = _step2$value.key;
								var desc = _step2$value.desc;
	
								if (!onlyForKey || onlyForKey === key) {
									FieldClass.initClass({ cls: cls, key: key, desc: desc });
								}
							}
						} catch (err) {
							_didIteratorError2 = true;
							_iteratorError2 = err;
						} finally {
							try {
								if (!_iteratorNormalCompletion2 && _iterator2.return) {
									_iterator2.return();
								}
							} finally {
								if (_didIteratorError2) {
									throw _iteratorError2;
								}
							}
						}
					}
	
					/* only initialize a class once */
				} catch (err) {
					_didIteratorError = true;
					_iteratorError = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion && _iterator.return) {
							_iterator.return();
						}
					} finally {
						if (_didIteratorError) {
							throw _iteratorError;
						}
					}
				}
	
				if (cls[_symbols.$$initialized]) {
					return;
				}
				cls[_symbols.$$initialized] = true;
			}
		}, {
			key: 'initializeEntity',
			value: function initializeEntity(owner, initialValues) {
				if (owner.fields) {
					return;
				}
				_boundNativeMethods.defineProperty.call(owner, 'fields', { value: {} });
	
				/* allow specific field-init code to wait until all fields are initialized */
				var constructingOwner = new _Subject.Subject();
				var waitUntilConstructed = function waitUntilConstructed() {
					return (0, _concat.concat)(constructingOwner, this);
				};
	
				/* initialize all fields */
				var keyDescs = {};
				var _iteratorNormalCompletion3 = true;
				var _didIteratorError3 = false;
				var _iteratorError3 = undefined;
	
				try {
					for (var _iterator3 = this[_symbols.$$fieldClasses][Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
						var FieldClass = _step3.value;
						var _iteratorNormalCompletion6 = true;
						var _didIteratorError6 = false;
						var _iteratorError6 = undefined;
	
						try {
							for (var _iterator6 = FieldClass[_symbols.$$entriesIn](owner.constructor)[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
								var entry = _step6.value;
								var key = entry.key;
	
								keyDescs[key] = _extends({}, entry, {
									waitUntilConstructed: waitUntilConstructed,
									constructingOwner: constructingOwner,
									owner: owner,
									key: key,
									initialValue: initialValues[key],
									FieldClass: FieldClass
								});
							}
						} catch (err) {
							_didIteratorError6 = true;
							_iteratorError6 = err;
						} finally {
							try {
								if (!_iteratorNormalCompletion6 && _iterator6.return) {
									_iterator6.return();
								}
							} finally {
								if (_didIteratorError6) {
									throw _iteratorError6;
								}
							}
						}
					}
	
					/* add related descriptions to each description */
				} catch (err) {
					_didIteratorError3 = true;
					_iteratorError3 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion3 && _iterator3.return) {
							_iterator3.return();
						}
					} finally {
						if (_didIteratorError3) {
							throw _iteratorError3;
						}
					}
				}
	
				var _iteratorNormalCompletion4 = true;
				var _didIteratorError4 = false;
				var _iteratorError4 = undefined;
	
				try {
					for (var _iterator4 = _values2.default.call(keyDescs)[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
						var _entry = _step4.value;
	
						_entry.related = _pick2.default.call(keyDescs, _entry.relatedKeys);
					}
	
					/* create a field for each description */
				} catch (err) {
					_didIteratorError4 = true;
					_iteratorError4 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion4 && _iterator4.return) {
							_iterator4.return();
						}
					} finally {
						if (_didIteratorError4) {
							throw _iteratorError4;
						}
					}
				}
	
				var _iteratorNormalCompletion5 = true;
				var _didIteratorError5 = false;
				var _iteratorError5 = undefined;
	
				try {
					for (var _iterator5 = _values2.default.call(keyDescs)[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
						var _entry2 = _step5.value;
						var _FieldClass = _entry2.FieldClass;
	
						delete _entry2.FieldClass;
						delete _entry2.relatedKeys;
						new _FieldClass(_entry2);
					}
	
					/* notify completion of field initialization */
				} catch (err) {
					_didIteratorError5 = true;
					_iteratorError5 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion5 && _iterator5.return) {
							_iterator5.return();
						}
					} finally {
						if (_didIteratorError5) {
							throw _iteratorError5;
						}
					}
				}
	
				constructingOwner.complete();
			}
		}, {
			key: 'isEqual',
			value: function isEqual(a, b) {
				return a === b;
			}
	
			/////////////////////////
			// events & properties //
			/////////////////////////
	
		}]);
	
		function Field(_ref) {
			var _context;
	
			var owner = _ref.owner;
			var key = _ref.key;
			var desc = _ref.desc;
			var _ref$setValueThroughS = _ref.setValueThroughSignal;
			var setValueThroughSignal = _ref$setValueThroughS === undefined ? true : _ref$setValueThroughS;
	
			_classCallCheck(this, Field);
	
			var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Field).call(this));
	
			_initDefineProp(_this, 'commitEvent', _descriptor, _this);
	
			_initDefineProp(_this, 'rollbackEvent', _descriptor2, _this);
	
			_initDefineProp(_this, 'isPristine', _descriptor3, _this);
	
			_initDefineProp(_this, 'value', _descriptor4, _this);
	
			owner.fields[key] = _this;
			_this[_symbols.$$owner] = owner;
			_this[_symbols.$$key] = key;
			_this[_symbols.$$desc] = desc;
			if (setValueThroughSignal) {
				// allow signal-push to change value
				_this.p('value').subscribe(_this.set.bind(_this));
			}
			(_context = _this.p('value'), _map.map).call(_context, function (v) {
				return _this.constructor.isEqual(v, _this[_symbols.$$pristine]);
			}).subscribe(_this.pSubject('isPristine'));
			return _this;
		}
	
		//noinspection JSDuplicatedDeclaration // (to suppress warning due to Webstorm bug)
	
	
		_createClass(Field, [{
			key: 'get',
			value: function get() {
				return this[_symbols.$$value];
			}
		}, {
			key: 'set',
			value: function set(val) {
				var _ref2 = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
				var _ref2$ignoreReadonly = _ref2.ignoreReadonly;
				var ignoreReadonly = _ref2$ignoreReadonly === undefined ? false : _ref2$ignoreReadonly;
				var _ref2$ignoreValidatio = _ref2.ignoreValidation;
				var ignoreValidation = _ref2$ignoreValidatio === undefined ? false : _ref2$ignoreValidatio;
				var _ref2$updatePristine = _ref2.updatePristine;
				var updatePristine = _ref2$updatePristine === undefined ? false : _ref2$updatePristine;
	
				if (!this.constructor.isEqual(this[_symbols.$$value], val)) {
					(0, _misc.constraint)(ignoreReadonly || !this[_symbols.$$desc].readonly, (0, _misc.humanMsg)(_templateObject, this[_symbols.$$owner].constructor.name, this[_symbols.$$key]));
					if (!ignoreValidation) {
						this.validate(val, ['set']);
					}
					if (updatePristine) {
						this[_symbols.$$pristine] = val;
					}
					this[_symbols.$$value] = val;
					this.pSubject('value').next(val);
				}
			}
		}, {
			key: _symbols.$$initSet,
			value: function value() {
				for (var _len = arguments.length, alternatives = Array(_len), _key = 0; _key < _len; _key++) {
					alternatives[_key] = arguments[_key];
				}
	
				var _iteratorNormalCompletion7 = true;
				var _didIteratorError7 = false;
				var _iteratorError7 = undefined;
	
				try {
	
					for (var _iterator7 = alternatives[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
						var _step7$value = _slicedToArray(_step7.value, 2);
	
						var guard = _step7$value[0];
						var value = _step7$value[1];
	
						if (_isFunction2.default.call(guard) ? guard() : guard) {
							if (_isUndefined2.default.call(value)) {
								return;
							}
							var val = _isFunction2.default.call(value) ? value() : value;
							if (this.constructor.isEqual(this[_symbols.$$value], val)) {
								return;
							}
							this.validate(val, ['initialize', 'set']);
							this.set(val, {
								ignoreReadonly: true,
								ignoreValidation: true,
								updatePristine: true
							});
							return;
						}
					}
				} catch (err) {
					_didIteratorError7 = true;
					_iteratorError7 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion7 && _iterator7.return) {
							_iterator7.return();
						}
					} finally {
						if (_didIteratorError7) {
							throw _iteratorError7;
						}
					}
				}
			}
		}, {
			key: 'isInvalid',
			value: function isInvalid(val) {
				try {
					var valueToValidate = _isUndefined2.default.call(val) ? this[_symbols.$$value] : val;
					this.validate(valueToValidate, ['set', 'commit']);
					return false;
				} catch (err) {
					return err;
				}
			}
		}, {
			key: 'validate',
			value: function validate(val) {
				var stages = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];
			}
		}, {
			key: 'commit',
			value: function () {
				var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
					return regeneratorRuntime.wrap(function _callee$(_context2) {
						while (1) {
							switch (_context2.prev = _context2.next) {
								case 0:
									this.validate(this[_symbols.$$value], ['commit']);
									this[_symbols.$$pristine] = this[_symbols.$$value];
									this.pSubject('isPristine').next(true);
	
								case 3:
								case 'end':
									return _context2.stop();
							}
						}
					}, _callee, this);
				}));
	
				function commit() {
					return _ref3.apply(this, arguments);
				}
	
				return commit;
			}()
		}, {
			key: 'rollback',
			value: function rollback() {
				this.set(this[_symbols.$$pristine]);
				this.pSubject('isPristine').next(true);
			}
		}]);
	
		return Field;
	}(_ValueTracker3.default), (_descriptor = _applyDecoratedDescriptor(_class.prototype, 'commitEvent', [_dec], {
		enumerable: true,
		initializer: null
	}), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, 'rollbackEvent', [_dec2], {
		enumerable: true,
		initializer: null
	}), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, 'isPristine', [_dec3], {
		enumerable: true,
		initializer: null
	}), _descriptor4 = _applyDecoratedDescriptor(_class.prototype, 'value', [_dec4], {
		enumerable: true,
		initializer: null
	})), _class));
	var RelField = exports.RelField = (_dec5 = (0, _ValueTracker2.property)({ readonly: true }), (_class3 = function (_Field) {
		_inherits(RelField, _Field);
	
		//////////////
		// instance //
		//////////////
	
		function RelField(options) {
			_classCallCheck(this, RelField);
	
			var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(RelField).call(this, options));
	
			_initDefineProp(_this2, 'possibleValues', _descriptor5, _this2);
	
			var desc = options.desc;
	
			/* manage the 'possibleValues' property */
	
			desc.codomain.resourceClass.p('all').subscribe(_this2.pSubject('possibleValues'));
			return _this2;
		}
	
		return RelField;
	}(Field), (_descriptor5 = _applyDecoratedDescriptor(_class3.prototype, 'possibleValues', [_dec5], {
		enumerable: true,
		initializer: null
	})), _class3));

/***/ },
/* 29 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var $$registerFieldClass = exports.$$registerFieldClass = Symbol('$$registerFieldClass');
	var $$fieldClasses = exports.$$fieldClasses = Symbol('$$fieldClasses');
	var $$owner = exports.$$owner = Symbol('$$owner');
	var $$key = exports.$$key = Symbol('$$key');
	var $$desc = exports.$$desc = Symbol('$$key');
	var $$value = exports.$$value = Symbol('$$value');
	var $$pristine = exports.$$pristine = Symbol('$$pristine');
	var $$initSet = exports.$$initSet = Symbol('$$initSet');
	var $$entriesIn = exports.$$entriesIn = Symbol('$$entriesIn');
	var $$initialized = exports.$$initialized = Symbol('$$initialized');

/***/ },
/* 30 */,
/* 31 */,
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _TypedModule = __webpack_require__(27);
	
	var _TypedModule2 = _interopRequireDefault(_TypedModule);
	
	var _misc = __webpack_require__(3);
	
	var _schemas = __webpack_require__(33);
	
	var _resources = __webpack_require__(13);
	
	var _resources2 = _interopRequireDefault(_resources);
	
	var _typed = __webpack_require__(18);
	
	var _typed2 = _interopRequireDefault(_typed);
	
	var _union2 = __webpack_require__(397);
	
	var _union3 = _interopRequireDefault(_union2);
	
	var _defaults = __webpack_require__(66);
	
	var _defaults2 = _interopRequireDefault(_defaults);
	
	var _assign = __webpack_require__(239);
	
	var _assign2 = _interopRequireDefault(_assign);
	
	var _max = __webpack_require__(251);
	
	var _max2 = _interopRequireDefault(_max);
	
	var _map = __webpack_require__(144);
	
	var _map2 = _interopRequireDefault(_map);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	exports.default = _TypedModule2.default.create('lyphs', [_resources2.default, _typed2.default], function (M, _ref) {
		var Resource = _ref.Resource;
		var IsRelatedTo = _ref.IsRelatedTo;
		var Template = _ref.Template;
		var PullsIntoTypeDefinition = _ref.PullsIntoTypeDefinition;
		var Has = _ref.Has;
	
	
		var Material = M.TYPED_RESOURCE({ /////////////////////////////////////////
	
			name: 'Material',
	
			extends: Template,
	
			singular: "material"
	
		}); /////////////////////////////////////////////////////////////////////////
	
	
		var ContainsMaterial = M.RELATIONSHIP({
	
			name: 'ContainsMaterial',
	
			extends: IsRelatedTo,
	
			singular: "has material",
	
			1: [Material, '0..*', { anchors: true, key: 'materials' }],
			2: [Material.Type, '0..*'],
	
			noCycles: true
	
		});
	
		var Lyph = M.TYPED_RESOURCE({ /////////////////////////////////////////////
	
			name: 'Lyph',
	
			extends: Material,
	
			singular: "lyph",
	
			properties: {
				'thickness': _extends({}, _schemas.typedDistributionSchema, {
					default: _schemas.universalDistanceRange,
					isRefinement: function isRefinement(a, b) {
						a = (0, _misc.normalizeToRange)(a);
						b = (0, _misc.normalizeToRange)(b);
						return a.min <= b.min && b.max <= a.max;
					}
				}),
				'length': _extends({}, _schemas.typedDistributionSchema, {
					default: _schemas.universalDistanceRange,
					isRefinement: function isRefinement(a, b) {
						a = (0, _misc.normalizeToRange)(a);
						b = (0, _misc.normalizeToRange)(b);
						return a.min <= b.min && b.max <= a.max;
					}
				})
			},
	
			behavior: {
				new: function _new() {
					var _context;
	
					var vals = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
					var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
					if (options.customLyphBehaviorDone) {
						return;
					}
	
					vals = _extends({}, vals);
					(_context = vals, _defaults2.default).call(_context, {
						longitudinalBorders: [],
						radialBorders: [],
						axis: null
					});
					if (options.createAxis) {
						var _context2;
	
						var axis = Border.new();
						(_context2 = vals, _assign2.default).call(_context2, { axis: axis });
					}
					if (vals.axis) {
						vals.longitudinalBorders = (0, _union3.default)([].concat(_toConsumableArray(vals.longitudinalBorders)), [vals.axis]);
					}
					if (options.createRadialBorders) {
						if (options.createRadialBorders === true) {
							options.createRadialBorders = 2;
						}
						var nr = Math.min(options.createRadialBorders, 2);
						for (var i = vals.radialBorders.length; i < nr; ++i) {
							vals.radialBorders.push(Border.new());
						}
					}
					return Lyph.new(vals, _extends({}, options, { customLyphBehaviorDone: true }));
				}
			}
	
		}); /////////////////////////////////////////////////////////////////////////
	
	
		var HasPart = M.RELATIONSHIP({
	
			name: 'HasPart',
	
			extends: Has,
	
			singular: "has part",
	
			1: [Lyph, '0..*', { anchors: true, key: 'parts' }],
			2: [Lyph, '0..*'],
	
			noCycles: true
	
		});
	
		var HasLayer = M.RELATIONSHIP({
	
			name: 'HasLayer',
	
			extends: Has,
	
			singular: "has layer",
	
			1: [Lyph, '0..*', { anchors: true, key: 'layers' }],
			2: [Lyph, '0..*'],
	
			properties: {
				'relativePosition': {
					type: 'number',
					required: true,
					default: function _default() {
						var _context3;
	
						return (_context3 = (_context3 = [].concat(_toConsumableArray(this[1]['-->HasLayer'])), _map2.default).call(_context3, 'relativePosition').concat([0]), _max2.default).call(_context3) + 1;
					}
				}
				// TODO: CONSTRAINT - two layers of the same lyph cannot have the same relativePosition
			},
	
			noCycles: true
	
		});
	
		var HasPatch = M.RELATIONSHIP({
	
			name: 'HasPatch',
	
			extends: HasPart,
	
			singular: "has part",
	
			1: [Lyph, '0..*', { anchors: true, key: 'patches' }],
			2: [Lyph, '0..*'],
	
			properties: {
				'patchMap': { type: 'string' }
			},
	
			noCycles: true
	
		});
	
		var HasSegment = M.RELATIONSHIP({
	
			name: 'HasSegment',
	
			extends: HasPatch,
	
			singular: "has segment",
	
			1: [Lyph, '0..*', { anchors: true, key: 'segments' }],
			2: [Lyph, '0..*'],
	
			properties: {
				'relativePosition': {
					type: 'number',
					required: true,
					default: function _default() {
						var _context4;
	
						return (_context4 = (_context4 = [].concat(_toConsumableArray(this[1]['-->HasSegment'])), _map2.default).call(_context4, 'relativePosition').concat([0]), _max2.default).call(_context4) + 1;
					}
				}
				// TODO: CONSTRAINT - two segments of the same lyph cannot have the same relativePosition
			},
	
			noCycles: true
	
			// Note that two segments can only be formally adjacent if they share
			// a radial border (which must therefore exist; used to be enforced with the Cylindrical)
	
		});
	
		var Border = M.TYPED_RESOURCE({ ///////////////////////////////////////////
	
			name: 'Border',
	
			extends: Template,
	
			singular: "border",
	
			properties: {
				nature: _extends({}, (0, _schemas.enumArraySchema)('open', 'closed'), {
					default: ['open', 'closed'],
					required: true,
					isRefinement: function isRefinement(a, b) {
						a = new Set(a ? (0, _misc.wrapInArray)(a) : []);
						b = new Set(b ? (0, _misc.wrapInArray)(b) : []);
						return !(b.has('open') && !a.has('open')) && !(b.has('closed') && !a.has('closed'));
					}
				})
			}
	
		}); /////////////////////////////////////////////////////////////////////////
	
		var borderRel = function borderRel(name, Superclass, c1, c2, key, singular) {
			var flags = arguments.length <= 6 || arguments[6] === undefined ? {} : arguments[6];
			var options = arguments.length <= 7 || arguments[7] === undefined ? {} : arguments[7];
			return M.RELATIONSHIP(_extends({
	
				name: name,
	
				extends: Superclass,
	
				singular: singular
	
			}, flags, {
	
				1: [Lyph, c1, _extends({}, options, { sustains: true, anchors: true, expand: true, key: key })],
				2: [Border, c2]
	
			}));
		};
	
		//// //// //// //// ////
		// We're using a cylindrical coordinate system:
		// + https://en.wikipedia.org/wiki/Cylindrical_coordinate_system
		// + longitudinal dimension = 'length' dimension
		// +              borders   = inner & outer borders
		// + radial dimension       = 'thickness' dimension
		// +        borders         = minus & plus borders
		//// //// //// //// ////
	
		/* 4 borders maximum; at least two longitudinal borders; optionally one or two radial borders */
		var HasBorder = borderRel('HasBorder', Has, '0..4', '1..1', 'borders', 'has border', { abstract: true });
		var HasLongitudinalBorder = borderRel('HasLongitudinalBorder', HasBorder, '2..2', '0..1', 'longitudinalBorders', 'has longitudinal border', {}, { auto: true, readonly: true });
		var HasRadialBorder = borderRel('HasRadialBorder', HasBorder, '0..2', '0..1', 'radialBorders', 'has radial border');
	
		/* one of the longitudinal borders can be an axis */
		var HasAxis = borderRel('HasAxis', HasLongitudinalBorder, '0..1', '0..1', 'axis', 'has axis');
	
		var CoalescenceScenario = M.TYPED_RESOURCE({ //////////////////////////////
	
			name: 'CoalescenceScenario',
	
			extends: Template,
	
			singular: "coalescence scenario"
	
		}); /////////////////////////////////////////////////////////////////////////
	
	
		var JoinsLyph = M.RELATIONSHIP({
	
			name: 'JoinsLyph',
	
			extends: PullsIntoTypeDefinition,
	
			singular: "joins lyph",
	
			1: [CoalescenceScenario, '2..2', { anchors: true, key: 'lyphs' }],
			2: [Lyph, '0..*']
	
		});
	
		var Coalescence = M.RESOURCE({ ////////////////////////////////////////////
	
			name: 'Coalescence',
	
			extends: Resource,
	
			singular: "coalescence"
	
			// coalescence between two or more lyph templates means
			// that at least one lyph from each participating lyph template
			// shares its outer layer with the other participating lyphs
	
		}); /////////////////////////////////////////////////////////////////////////
	
	
		var Coalesces = M.RELATIONSHIP({
	
			name: 'Coalesces',
	
			extends: IsRelatedTo,
	
			singular: "coalesces",
	
			1: [Coalescence, '2..2', { anchors: true, key: 'lyphs' }],
			2: [Lyph, '0..*', { key: 'coalescences' }]
	
		});
	
		var CoalescesLike = M.RELATIONSHIP({
	
			name: 'CoalescesLike',
	
			extends: IsRelatedTo,
	
			singular: "coalesces through",
	
			1: [Coalescence, '0..*', { anchors: true, key: 'scenarios' }],
			2: [CoalescenceScenario, '0..*']
	
		});
	
		var Node = M.TYPED_RESOURCE({ /////////////////////////////////////////////
	
			name: 'Node',
	
			extends: Template,
	
			singular: "node"
	
		}); /////////////////////////////////////////////////////////////////////////
	
	
		var NodeLocation = M.TYPED_RESOURCE({ /////////////////////////////////////
	
			name: 'NodeLocation',
	
			abstract: true,
	
			extends: Template,
			extendedBy: [Lyph, Border],
	
			singular: "node location"
	
		}); /////////////////////////////////////////////////////////////////////////
	
	
		var ContainsNode = M.RELATIONSHIP({
	
			name: 'ContainsNode',
	
			singular: "contains node",
	
			extends: PullsIntoTypeDefinition,
	
			1: [NodeLocation, '0..*', { anchors: true, key: 'nodes' }],
			2: [Node, '0..*', { anchors: true, key: 'locations' }]
	
		});
	});

/***/ },
/* 33 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	var identifierRegex = exports.identifierRegex = '^[a-zA-Z_][a-zA-Z0-9_]*$';
	
	var qualitySchema = exports.qualitySchema = {
		type: 'string'
	};
	
	var identifierSchema = exports.identifierSchema = {
		type: 'string',
		pattern: '^[a-zA-Z_][a-zA-Z0-9_]*$'
	};
	
	var uriSchema = exports.uriSchema = {
		type: 'string',
		format: 'uri'
	};
	
	var idSchema = exports.idSchema = {
		type: 'integer'
	};
	
	var enumSchema = exports.enumSchema = function enumSchema() {
		for (var _len = arguments.length, candidates = Array(_len), _key = 0; _key < _len; _key++) {
			candidates[_key] = arguments[_key];
		}
	
		return {
			type: 'string',
			enum: candidates
		};
	};
	
	var enumArraySchema = exports.enumArraySchema = function enumArraySchema() {
		return {
			type: 'array',
			items: _extends({}, enumSchema.apply(undefined, arguments)),
			uniqueItems: true,
			maxItems: arguments.length
		};
	};
	
	var minusPlusSchema = exports.minusPlusSchema = enumSchema('minus', 'plus');
	
	var innerOuterSchema = exports.innerOuterSchema = enumSchema('inner', 'outer');
	
	var lyphDirectionSchema = exports.lyphDirectionSchema = enumSchema.apply(undefined, _toConsumableArray(minusPlusSchema.enum).concat(_toConsumableArray(innerOuterSchema.enum)));
	
	var oneOf = exports.oneOf = function oneOf() {
		for (var _len2 = arguments.length, schemas = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
			schemas[_key2] = arguments[_key2];
		}
	
		return { oneOf: schemas };
	};
	
	// export const rationalNumberSchema = oneOf({
	// 	// TODO: specify format (https://github.com/infusion/Fraction.js)
	// 	type: 'object',
	// 	properties: {
	// 		'n': { type: 'integer', minimum: 0,                required: true }, // numerator
	// 		'd': { type: 'integer', minimum: 1,    default: 1, required: true }, // denominator
	// 		's': { type: 'integer', enum: [-1, 1], default: 1, required: true }  // sign
	// 	}
	// }, { type: 'number' }, { type: 'string' });
	
	
	//NK Simplified schema to avoid oneOf
	var rationalNumberSchema = exports.rationalNumberSchema = {
		type: 'object',
		properties: {
			'n': { type: 'integer', minimum: 0, required: true }, // numerator
			'd': { type: 'integer', minimum: 1, default: 1, required: true }, // denominator
			's': { type: 'integer', enum: [-1, 1], default: 1, required: true } // sign
		}
	};
	
	var angleSchema = exports.angleSchema = {
		type: 'number',
		minimum: 0, exclusiveMinimum: false,
		maximum: 360, exclusiveMaximum: true
	};
	
	var typedDistributionSchema = exports.typedDistributionSchema = {
		type: 'object',
		properties: {
			'value': { type: 'number' },
			'min': { type: 'number' },
			'max': { type: 'number' },
			'mean': { type: 'number' },
			'std': { type: 'number' },
			'class': { type: 'string', required: true }
			// 'UniformDistribution' | 'BoundedNormalDistribution' | 'Number' | 'NumberRange'
		}
	};
	
	var rangeSchema = exports.rangeSchema = {
		type: 'object',
		properties: {
			'min': { type: 'number', required: true },
			'max': { type: 'number', required: true }
		}
	};
	
	var universalDistanceRange = exports.universalDistanceRange = {
		'min': 0,
		'max': Infinity
	};
	
	var normalDistributionSchema = exports.normalDistributionSchema = {
		type: 'object',
		properties: {
			'distribution': { value: 'normal' },
			'mean': { type: 'number', required: true },
			'std': { type: 'number', required: true }
		}
	};
	
	var boundedNormalDistributionSchema = exports.boundedNormalDistributionSchema = {
		type: 'object',
		properties: {
			'distribution': { value: 'bounded-normal' },
			'mean': { type: 'number', required: true },
			'std': { type: 'number', required: true },
			'min': { type: 'number', required: true },
			'max': { type: 'number', required: true }
		}
	};
	
	var uniformDistributionSchema = exports.uniformDistributionSchema = {
		type: 'object',
		properties: {
			'distribution': { value: 'uniform' },
			'min': { type: 'number', required: true },
			'max': { type: 'number', required: true }
		}
	};
	
	// export const distributionSchema = {
	// 	oneOf: [
	// 		{ ...normalDistributionSchema        },
	// 		{ ...boundedNormalDistributionSchema },
	// 		{ ...uniformDistributionSchema       }
	// 	]
	// };
	
	var distributionSchemaOr = exports.distributionSchemaOr = function distributionSchemaOr(otherSchema) {
		return {
			oneOf: [boundedNormalDistributionSchema, uniformDistributionSchema, otherSchema]
		};
	};
	
	var dimensionalitySchema = exports.dimensionalitySchema = {
		type: 'object',
		patternProperties: {
			'[a-zA-Z0-9 ]+': { type: 'integer' }
		}
	};

/***/ },
/* 34 */,
/* 35 */,
/* 36 */,
/* 37 */,
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var fn = __webpack_require__(382);
	
	module.exports = function isUndefined() {
	  return fn.apply(undefined, [this].concat(Array.prototype.slice.apply(arguments)));
	};


/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	var apply = __webpack_require__(148);
	
	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeMax = Math.max;
	
	/**
	 * The base implementation of `_.rest` which doesn't validate or coerce arguments.
	 *
	 * @private
	 * @param {Function} func The function to apply a rest parameter to.
	 * @param {number} [start=func.length-1] The start position of the rest parameter.
	 * @returns {Function} Returns the new function.
	 */
	function baseRest(func, start) {
	  start = nativeMax(start === undefined ? (func.length - 1) : start, 0);
	  return function() {
	    var args = arguments,
	        index = -1,
	        length = nativeMax(args.length - start, 0),
	        array = Array(length);
	
	    while (++index < length) {
	      array[index] = args[start + index];
	    }
	    index = -1;
	    var otherArgs = Array(start + 1);
	    while (++index < start) {
	      otherArgs[index] = args[index];
	    }
	    otherArgs[start] = array;
	    return apply(func, this, otherArgs);
	  };
	}
	
	module.exports = baseRest;


/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsNative = __webpack_require__(286),
	    getValue = __webpack_require__(325);
	
	/**
	 * Gets the native function at `key` of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {string} key The key of the method to get.
	 * @returns {*} Returns the function if it's native, else `undefined`.
	 */
	function getNative(object, key) {
	  var value = getValue(object, key);
	  return baseIsNative(value) ? value : undefined;
	}
	
	module.exports = getNative;


/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	var isSymbol = __webpack_require__(57);
	
	/** Used as references for various `Number` constants. */
	var INFINITY = 1 / 0;
	
	/**
	 * Converts `value` to a string key if it's not a string or symbol.
	 *
	 * @private
	 * @param {*} value The value to inspect.
	 * @returns {string|symbol} Returns the key.
	 */
	function toKey(value) {
	  if (typeof value == 'string' || isSymbol(value)) {
	    return value;
	  }
	  var result = (value + '');
	  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
	}
	
	module.exports = toKey;


/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subscriber_1 = __webpack_require__(12);
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var OuterSubscriber = (function (_super) {
	    __extends(OuterSubscriber, _super);
	    function OuterSubscriber() {
	        _super.apply(this, arguments);
	    }
	    OuterSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
	        this.destination.next(innerValue);
	    };
	    OuterSubscriber.prototype.notifyError = function (error, innerSub) {
	        this.destination.error(error);
	    };
	    OuterSubscriber.prototype.notifyComplete = function (innerSub) {
	        this.destination.complete();
	    };
	    return OuterSubscriber;
	}(Subscriber_1.Subscriber));
	exports.OuterSubscriber = OuterSubscriber;
	//# sourceMappingURL=OuterSubscriber.js.map

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var root_1 = __webpack_require__(88);
	var isArray_1 = __webpack_require__(86);
	var isPromise_1 = __webpack_require__(423);
	var Observable_1 = __webpack_require__(23);
	var iterator_1 = __webpack_require__(419);
	var InnerSubscriber_1 = __webpack_require__(403);
	var symbol_observable_1 = __webpack_require__(178);
	function subscribeToResult(outerSubscriber, result, outerValue, outerIndex) {
	    var destination = new InnerSubscriber_1.InnerSubscriber(outerSubscriber, outerValue, outerIndex);
	    if (destination.isUnsubscribed) {
	        return;
	    }
	    if (result instanceof Observable_1.Observable) {
	        if (result._isScalar) {
	            destination.next(result.value);
	            destination.complete();
	            return;
	        }
	        else {
	            return result.subscribe(destination);
	        }
	    }
	    if (isArray_1.isArray(result)) {
	        for (var i = 0, len = result.length; i < len && !destination.isUnsubscribed; i++) {
	            destination.next(result[i]);
	        }
	        if (!destination.isUnsubscribed) {
	            destination.complete();
	        }
	    }
	    else if (isPromise_1.isPromise(result)) {
	        result.then(function (value) {
	            if (!destination.isUnsubscribed) {
	                destination.next(value);
	                destination.complete();
	            }
	        }, function (err) { return destination.error(err); })
	            .then(null, function (err) {
	            // Escaping the Promise trap: globally throw unhandled errors
	            root_1.root.setTimeout(function () { throw err; });
	        });
	        return destination;
	    }
	    else if (typeof result[iterator_1.$$iterator] === 'function') {
	        for (var _i = 0, _a = result; _i < _a.length; _i++) {
	            var item = _a[_i];
	            destination.next(item);
	            if (destination.isUnsubscribed) {
	                break;
	            }
	        }
	        if (!destination.isUnsubscribed) {
	            destination.complete();
	        }
	    }
	    else if (typeof result[symbol_observable_1.default] === 'function') {
	        var obs = result[symbol_observable_1.default]();
	        if (typeof obs.subscribe !== 'function') {
	            destination.error('invalid observable');
	        }
	        else {
	            return obs.subscribe(new InnerSubscriber_1.InnerSubscriber(outerSubscriber, outerValue, outerIndex));
	        }
	    }
	    else {
	        destination.error(new TypeError('unknown type returned'));
	    }
	}
	exports.subscribeToResult = subscribeToResult;
	//# sourceMappingURL=subscribeToResult.js.map

/***/ },
/* 44 */,
/* 45 */,
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = undefined;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _templateObject = _taggedTemplateLiteral(['\n\t\t\t\t\t\t\t', '\n\t\t\t\t\t\t\t(', ')\n\t\t\t\t\t\t\t', '\n\t\t\t\t\t\t'], ['\n\t\t\t\t\t\t\t', '\n\t\t\t\t\t\t\t(', ')\n\t\t\t\t\t\t\t', '\n\t\t\t\t\t\t']),
	    _templateObject2 = _taggedTemplateLiteral(['\n\t\t\t\tA subclass cycle has been introduced while registering\n\t\t\t\tthe ', ' class:\n\t\t\t\t', '.\n\t\t\t'], ['\n\t\t\t\tA subclass cycle has been introduced while registering\n\t\t\t\tthe ', ' class:\n\t\t\t\t', '.\n\t\t\t']),
	    _templateObject3 = _taggedTemplateLiteral(['\n\t\t\t\t\t\t\tCannot merge ', '.', ' = ', '\n\t\t\t\t\t\t\t        with ', '.\n\t\t\t\t\t\t'], ['\n\t\t\t\t\t\t\tCannot merge ', '.', ' = ', '\n\t\t\t\t\t\t\t        with ', '.\n\t\t\t\t\t\t']);
	
	var _isUndefined = __webpack_require__(38);
	
	var _isUndefined2 = _interopRequireDefault(_isUndefined);
	
	var _isInteger = __webpack_require__(246);
	
	var _isInteger2 = _interopRequireDefault(_isInteger);
	
	var _defaults = __webpack_require__(66);
	
	var _defaults2 = _interopRequireDefault(_defaults);
	
	var _assignWith = __webpack_require__(240);
	
	var _assignWith2 = _interopRequireDefault(_assignWith);
	
	var _keys = __webpack_require__(143);
	
	var _keys2 = _interopRequireDefault(_keys);
	
	var _values = __webpack_require__(107);
	
	var _values2 = _interopRequireDefault(_values);
	
	var _entries = __webpack_require__(21);
	
	var _entries2 = _interopRequireDefault(_entries);
	
	var _fromPairs = __webpack_require__(244);
	
	var _fromPairs2 = _interopRequireDefault(_fromPairs);
	
	var _map = __webpack_require__(144);
	
	var _map2 = _interopRequireDefault(_map);
	
	var _at = __webpack_require__(241);
	
	var _at2 = _interopRequireDefault(_at);
	
	var _uniq = __webpack_require__(255);
	
	var _uniq2 = _interopRequireDefault(_uniq);
	
	var _flatten = __webpack_require__(243);
	
	var _flatten2 = _interopRequireDefault(_flatten);
	
	var _isEqual2 = __webpack_require__(376);
	
	var _isEqual3 = _interopRequireDefault(_isEqual2);
	
	var _graph = __webpack_require__(138);
	
	var _graph2 = _interopRequireDefault(_graph);
	
	var _boundNativeMethods = __webpack_require__(10);
	
	var _misc = __webpack_require__(3);
	
	var _Entity = __webpack_require__(191);
	
	var _Entity2 = _interopRequireDefault(_Entity);
	
	var _fields = __webpack_require__(134);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return right[Symbol.hasInstance](left); } else { return _instanceof(left, right); } }
	
	function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var $$processedFor = Symbol('$$processedFor');
	var $$relationshipSpecs = Symbol('$$relationshipSpecs');
	var $$relevantDomains = Symbol('$$relevantDomains');
	var $$processRelationshipDomain = Symbol('$$processRelationshipDomain');
	
	////////////////////////////////////////////////////////////////////////////////
	// Module / Resource / Relationship Factory                                   //
	////////////////////////////////////////////////////////////////////////////////
	
	// TODO: folding same-name classes
	// TODO: folding properties into subclasses
	// TODO: folding multiple 1,2 pairs into same-name relationships and subclass relationships
	
	
	var Module = function () {
		_createClass(Module, null, [{
			key: 'create',
			value: function create(name, dependencies, fn) {
				var _this = this;
	
				var moduleFactory = function moduleFactory() {
					var memory = arguments.length <= 0 || arguments[0] === undefined ? {
						modules: new Map(),
						classes: new _graph2.default()
					} : arguments[0];
	
					if (!memory.modules.has(name)) {
						var module = new _this(name, dependencies.map(function (m) {
							return m(memory);
						}), memory.classes);
						memory.modules.set(name, module);
						if (fn) {
							var _context;
	
							fn(module, (_context = [].concat(_toConsumableArray(module.classes.vertices())), _fromPairs2.default).call(_context));
						}
					}
					return memory.modules.get(name);
				};
				return moduleFactory;
			}
		}]);
	
		// vertices: name                   -> class
		// edges:    [superclass, subclass] -> undefined
	
		function Module(name) {
			var dependencies = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];
			var graph = arguments.length <= 2 || arguments[2] === undefined ? new _graph2.default() : arguments[2];
	
			_classCallCheck(this, Module);
	
			/* set storage graph */
			this.classes = graph;
	
			/* store the module name */
			this.name = name;
		}
	
		_createClass(Module, [{
			key: 'OBJECT',
			value: function OBJECT(config) {
				var _this2 = this;
	
				return (0, _misc.mapOptionalArray)(config, function (conf) {
					conf.module = _this2;
					_this2.basicNormalization(conf);
					_this2.register(conf);
					return conf;
				});
			}
		}, {
			key: 'RESOURCE',
			value: function RESOURCE(config) {
				var _this3 = this;
	
				return (0, _misc.mapOptionalArray)(config, function (conf) {
					conf.isResource = true;
					conf.module = _this3;
					_this3.basicNormalization(conf);
					var constructor = _this3.mergeSameNameResources(_Entity2.default.createClass(conf));
					_this3.register(constructor);
					_this3.mergeSuperclassFields(constructor);
					// jsonSchemaConfig                          (constructor             ); // TODO
					_fields.Field.augmentClass(constructor);
					return constructor;
				});
			}
		}, {
			key: 'RELATIONSHIP',
			value: function RELATIONSHIP(config) {
				var _this4 = this;
	
				return (0, _misc.mapOptionalArray)(config, function (conf) {
					conf.isRelationship = true;
					conf.module = _this4;
					_this4.basicNormalization(conf);
					var constructor = _Entity2.default.createClass(conf);
					_this4.normalizeRelationshipSides(constructor);
					constructor = _this4.mergeSameNameRelationships(constructor);
					_this4.register(constructor);
					_this4.mergeSuperclassFields(constructor);
					// jsonSchemaConfig                          (constructor); // TODO
					_this4.resolveRelationshipDomains(constructor);
					_fields.Field.augmentClass(constructor);
					return constructor;
				});
			}
	
			////////////////////////////////////////////////////////////////////////////
	
		}, {
			key: 'basicNormalization',
			value: function basicNormalization(config) {
				/* normalizing grammar stuff */
				if (config.singular && !config.plural) {
					if (config.isResource) {
						config.plural = config.singular + 's';
					} else {
						var match = config.singular.match(/^(.+)s$/);
						if (match) {
							config.plural = match[1];
						}
					}
				}
	
				_defaults2.default.call(config, {
					behavior: {}
				});
	
				if (config.isResource) {
					_defaults2.default.call(config, {
						relationships: {},
						relationshipShortcuts: {}
					});
				}
	
				/* normalizing extends/extendedBy */
				var _arr = ['extends', 'extendedBy'];
				for (var _i = 0; _i < _arr.length; _i++) {
					var key = _arr[_i];
					_defaults2.default.call(config, _defineProperty({}, key, []));
					config[key] = new Set((0, _misc.wrapInArray)(config[key]));
				}
	
				/* normalize properties */
				var _arr2 = [['properties', 'key'], ['patternProperties', 'pattern']];
				for (var _i2 = 0; _i2 < _arr2.length; _i2++) {
					var _arr2$_i = _slicedToArray(_arr2[_i2], 2);
	
					var pKey = _arr2$_i[0];
					var kKey = _arr2$_i[1];
	
					_defaults2.default.call(config, _defineProperty({}, pKey, {}));
					var _iteratorNormalCompletion = true;
					var _didIteratorError = false;
					var _iteratorError = undefined;
	
					try {
						for (var _iterator = (_context2 = config[pKey], _entries2.default).call(_context2)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
							var _context2;
	
							var _step$value = _slicedToArray(_step.value, 2);
	
							var k = _step$value[0];
							var desc = _step$value[1];
	
							desc[kKey] = k;
						}
					} catch (err) {
						_didIteratorError = true;
						_iteratorError = err;
					} finally {
						try {
							if (!_iteratorNormalCompletion && _iterator.return) {
								_iterator.return();
							}
						} finally {
							if (_didIteratorError) {
								throw _iteratorError;
							}
						}
					}
				}
	
				/* sanity checks */
				var _arr3 = ['extends', 'extendedBy'];
				for (var _i3 = 0; _i3 < _arr3.length; _i3++) {
					var _key = _arr3[_i3];var _iteratorNormalCompletion2 = true;
					var _didIteratorError2 = false;
					var _iteratorError2 = undefined;
	
					try {
						for (var _iterator2 = config[_key][Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
							var other = _step2.value;
						}
					} catch (err) {
						_didIteratorError2 = true;
						_iteratorError2 = err;
					} finally {
						try {
							if (!_iteratorNormalCompletion2 && _iterator2.return) {
								_iterator2.return();
							}
						} finally {
							if (_didIteratorError2) {
								throw _iteratorError2;
							}
						}
					}
				}
			}
		}, {
			key: 'normalizeRelationshipSides',
			value: function normalizeRelationshipSides(cls) {
	
				/* normalize domainPairs array */
				if (!cls.domainPairs) {
					cls.domainPairs = [];
				}
				// - 1 is left-hand side, and
				// - 2 is right-hand side of the relationship;
				// these can be given directly, or multiple
				// can be grouped in a 'domainPairs' array;
				// here, we'll normalize them into a 'domainPairs' array
	
				if (cls[1] && cls[2]) {
					var _cls$domainPairs$push;
	
					cls.domainPairs.push((_cls$domainPairs$push = {}, _defineProperty(_cls$domainPairs$push, 1, cls[1]), _defineProperty(_cls$domainPairs$push, 2, cls[2]), _cls$domainPairs$push));
				}
	
				/* indices for shorthand array notation and side keys */
				var CLASS = 0,
				    CARDINALITY = 1,
				    OPTIONS = 2;
	
				/* normalizing all domainPairs */
				cls.keyInResource = {
					1: '-->' + cls.name,
					2: '<--' + cls.name
				};
				cls.domainPairs = cls.domainPairs.map(function (givenDomainPair) {
					var _pair;
	
					var pair = (_pair = {}, _defineProperty(_pair, 1, {}), _defineProperty(_pair, 2, {}), _pair);
					var _arr4 = [[[1, pair[1]], [2, pair[2]]], [[2, pair[2]], [1, pair[1]]]];
					for (var _i4 = 0; _i4 < _arr4.length; _i4++) {
						var _arr4$_i = _slicedToArray(_arr4[_i4], 2);
	
						var _arr4$_i$ = _slicedToArray(_arr4$_i[0], 2);
	
						var domainKey = _arr4$_i$[0];
						var domain = _arr4$_i$[1];
	
						var _arr4$_i$2 = _slicedToArray(_arr4$_i[1], 2);
	
						var codomainKey = _arr4$_i$2[0];
						var codomain = _arr4$_i$2[1];
	
						var _givenDomainPair$doma = _slicedToArray(givenDomainPair[domainKey], 3);
	
						var resourceClass = _givenDomainPair$doma[0];
						var cardinality = _givenDomainPair$doma[1];
						var _givenDomainPair$doma2 = _givenDomainPair$doma[2];
						var options = _givenDomainPair$doma2 === undefined ? {} : _givenDomainPair$doma2;
	
						_misc.definePropertiesByValue.call(domain, {
							codomain: codomain,
	
							relationshipClass: cls,
							keyInRelationship: domainKey,
	
							resourceClass: resourceClass,
							keyInResource: cls.keyInResource[domainKey],
	
							cardinality: (0, _misc.parseCardinality)(cardinality),
							options: options,
	
							shortcutKey: options.key
						});
						_boundNativeMethods.defineProperty.call(domain, Symbol.toStringTag, {
							get: function get() {
								return (0, _misc.humanMsg)(_templateObject, this.resourceClass.name, this.keyInResource, this.codomain.resourceClass.name);
							}
						});
					}
					return pair;
				});
				delete cls[1];
				delete cls[2];
			}
		}, {
			key: 'resolveRelationshipDomains',
			value: function resolveRelationshipDomains(cls) {
				var _iteratorNormalCompletion3 = true;
				var _didIteratorError3 = false;
				var _iteratorError3 = undefined;
	
				try {
					for (var _iterator3 = cls.domainPairs[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
						var domainPair = _step3.value;
						var _iteratorNormalCompletion4 = true;
						var _didIteratorError4 = false;
						var _iteratorError4 = undefined;
	
						try {
							for (var _iterator4 = _values2.default.call(domainPair)[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
								var domain = _step4.value;
	
								this[$$processRelationshipDomain](domain);
							}
						} catch (err) {
							_didIteratorError4 = true;
							_iteratorError4 = err;
						} finally {
							try {
								if (!_iteratorNormalCompletion4 && _iterator4.return) {
									_iterator4.return();
								}
							} finally {
								if (_didIteratorError4) {
									throw _iteratorError4;
								}
							}
						}
					}
				} catch (err) {
					_didIteratorError3 = true;
					_iteratorError3 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion3 && _iterator3.return) {
							_iterator3.return();
						}
					} finally {
						if (_didIteratorError3) {
							throw _iteratorError3;
						}
					}
				}
			}
		}, {
			key: $$processRelationshipDomain,
			value: function value(referenceDomain) {
				var resourceClass = referenceDomain.resourceClass;
				var relationshipClass = referenceDomain.relationshipClass;
				var keyInRelationship = referenceDomain.keyInRelationship;
				var keyInResource = referenceDomain.keyInResource;
				var shortcutKey = referenceDomain.shortcutKey;
	
				// const relSinks = relationshipClass::(function findSinks() {
				// 	if (this.extendedBy::size() === 0) { return [this] }
				// 	return union(...[...this.extendedBy].map(c => c::findSinks()));
				// })();
				//
				// let hierarchy = new Graph();
				// // ^ In this graph: super --> sub
				//
				// const process = (CurrentRelClass, RelSubclass) => {
				// 	/* find all domains relevant to this resource class + field key combo */
				// 	const relevantDomains = CurrentRelClass[$$relevantDomains] = CurrentRelClass.domainPairs
				// 		::map(keyInRelationship)
				//        ::filter(d => (d.resourceClass).hasSubclass(resourceClass)       ||
				//                      (resourceClass)       .hasSubclass(d.resourceClass) )
				// 		::groupBy('resourceClass.name')
				// 		::_values()
				// 		::map(0); // for now, only using one domain-pair per ResourceClass+RelationshipClass combination
				// 	// TODO: ^ don't use only a[0]; this is just for now, to simplify
				// 	//     :   we still manually have to manually create common superclasses
				// 	//     :   for stuff (examples: MeasurableLocation, NodeLocation)
				//
				// 	/* register domain */
				// 	for (let domain of relevantDomains) {
				// 		hierarchy.addVertex(domain, domain);
				// 	}
				// 	/* register domain ordering by (sub/super) relationship class */
				// 	for (let domain of relevantDomains) {
				// 		if (RelSubclass) {
				// 			for (let subDomain of RelSubclass[$$relevantDomains]) {
				// 				hierarchy.spanEdge(domain, subDomain);
				// 			}
				// 		}
				// 	}
				// 	/* register domain ordering by (sub/super) resource class */
				// 	for (let domain of relevantDomains) {
				// 		for (let otherDomain of relevantDomains::without(domain)) {
				// 			assert(domain.resourceClass !== otherDomain.resourceClass);
				// 			// ^ (because `::groupBy('resourceClass.name')` above)
				// 			if (otherDomain.resourceClass.hasSubclass(domain.resourceClass)) {
				// 				hierarchy.spanEdge(otherDomain, domain);
				// 			}
				// 		}
				// 	}
				// 	/* recurse to relationship superclass */
				// 	for (let RelSuperclass of CurrentRelClass.extends) {
				// 		process(RelSuperclass, CurrentRelClass);
				// 	}
				// };
				// relSinks.forEach(process);
				//
				// hierarchy = hierarchy.transitiveReduction();
	
	
				// TODO: fix bug in the code below (the commented code above already works)
				/* from the graph of relevant domains for this field (domain), craft one specifically for each ResourceClass */
				// let resourceHasField = (resCls) => (!!resCls.properties[referenceDomain.keyInResource]);
				// console.log(this.classes.hasVertex(referenceDomain.resourceClass.name), referenceDomain.resourceClass.name, [...this.classes.vertices()]::map(v=>v[1].name));
				// for (let referenceResource of union(
				// 	[...this.classes.verticesWithPathFrom(referenceDomain.resourceClass.name)]::map(([,r])=>r)::filter(resourceHasField),
				// 	[...this.classes.verticesWithPathTo  (referenceDomain.resourceClass.name)]::map(([,r])=>r)::filter(resourceHasField),
				// 	[referenceDomain.resourceClass]
				// )) {
				// 	let candidateDomains = [...hierarchy.sinks()]::map(([,d])=>d)::(function pinpoint() {
				// 		let result = new Set();
				// 		for (let domain of this) {
				// 			const relationshipFits = (referenceDomain.relationshipClass.hasSubclass(domain.relationshipClass));
				// 			const resourceFits     = (referenceResource                .hasSubclass(domain.resourceClass    ));
				// 			if (relationshipFits && resourceFits) {
				// 				result.add(domain);
				// 			} else {
				// 				for (let superDomain of [...hierarchy.verticesTo(domain)]::map(([,d])=>d)) {
				// 					[superDomain]::pinpoint().forEach(::result.add);
				// 				}
				// 			}
				// 		}
				// 		return result;
				// 	})();
				// }
	
				/* put back-reference in classes */
	
				resourceClass.relationships[keyInResource] = referenceDomain;
				_fields.Field.augmentClass(resourceClass, keyInResource);
				if (shortcutKey) {
					resourceClass.relationshipShortcuts[shortcutKey] = referenceDomain;
					_fields.Field.augmentClass(resourceClass, shortcutKey);
				}
			}
		}, {
			key: 'register',
			value: function register(cls) {
				/* register the class in this module */
				this.classes.ensureVertex(cls.name, cls);
				if (!cls.notExported) {
					this.classes[cls.name] = cls;
				}
	
				/* add subclassing edges and cross-register sub/superclasses */
				var _iteratorNormalCompletion5 = true;
				var _didIteratorError5 = false;
				var _iteratorError5 = undefined;
	
				try {
					for (var _iterator5 = (cls.extends || [])[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
						var extendee = _step5.value;
	
						this.classes.addEdge(extendee.name, cls.name);
						extendee.extendedBy.add(cls);
					}
				} catch (err) {
					_didIteratorError5 = true;
					_iteratorError5 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion5 && _iterator5.return) {
							_iterator5.return();
						}
					} finally {
						if (_didIteratorError5) {
							throw _iteratorError5;
						}
					}
				}
	
				var _iteratorNormalCompletion6 = true;
				var _didIteratorError6 = false;
				var _iteratorError6 = undefined;
	
				try {
					for (var _iterator6 = (cls.extendedBy || [])[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
						var extender = _step6.value;
	
						this.classes.addEdge(cls.name, extender.name);
						extender.extends.add(cls);
					}
	
					/* check for cycles */
				} catch (err) {
					_didIteratorError6 = true;
					_iteratorError6 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion6 && _iterator6.return) {
							_iterator6.return();
						}
					} finally {
						if (_didIteratorError6) {
							throw _iteratorError6;
						}
					}
				}
	
				var cycle = this.classes.cycle();
				if (cycle) {
					throw new Error((0, _misc.humanMsg)(_templateObject2, cls.name, [].concat(_toConsumableArray(cycle), [cycle[0]]).join(' --> ')));
				}
	
				return cls;
			}
		}, {
			key: 'mergeSuperclassFields',
			value: function mergeSuperclassFields(cls) {
				var mergeFieldKind = function mergeFieldKind(cls, newCls, kind, customMerge) {
					var _context3;
	
					if ((_context3 = cls[kind], _isUndefined2.default).call(_context3)) {
						return;
					}
	
					if (!cls[$$processedFor]) {
						cls[$$processedFor] = {};
					}
					if (!cls[$$processedFor][kind]) {
						cls[$$processedFor][kind] = new WeakSet();
					}
					if (cls[$$processedFor][kind].has(newCls)) {
						return;
					}
					cls[$$processedFor][kind].add(newCls);
	
					function mergeBetween(superCls, subCls) {
						var _iteratorNormalCompletion7 = true;
						var _didIteratorError7 = false;
						var _iteratorError7 = undefined;
	
						try {
							for (var _iterator7 = (_context4 = superCls[kind], _keys2.default).call(_context4)[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
								var _context4;
	
								var key = _step7.value;
	
								var superDesc = superCls[kind][key];
								var subDesc = subCls[kind][key];
								if (_isUndefined2.default.call(subDesc)) {
									subCls[kind][key] = superDesc;
									_fields.Field.augmentClass(subCls, key);
								} else if ((0, _isEqual3.default)(subDesc, superDesc)) {
									continue;
								} else {
									subCls[kind][key] = customMerge(superDesc, subDesc);
								}
							}
						} catch (err) {
							_didIteratorError7 = true;
							_iteratorError7 = err;
						} finally {
							try {
								if (!_iteratorNormalCompletion7 && _iterator7.return) {
									_iterator7.return();
								}
							} finally {
								if (_didIteratorError7) {
									throw _iteratorError7;
								}
							}
						}
					}
	
					var _iteratorNormalCompletion8 = true;
					var _didIteratorError8 = false;
					var _iteratorError8 = undefined;
	
					try {
						for (var _iterator8 = cls.extends[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
							var superCls = _step8.value;
	
							mergeFieldKind(superCls, newCls, kind, customMerge);
							mergeBetween(superCls, cls);
						}
					} catch (err) {
						_didIteratorError8 = true;
						_iteratorError8 = err;
					} finally {
						try {
							if (!_iteratorNormalCompletion8 && _iterator8.return) {
								_iterator8.return();
							}
						} finally {
							if (_didIteratorError8) {
								throw _iteratorError8;
							}
						}
					}
	
					var _iteratorNormalCompletion9 = true;
					var _didIteratorError9 = false;
					var _iteratorError9 = undefined;
	
					try {
						for (var _iterator9 = cls.extendedBy[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
							var subCls = _step9.value;
	
							mergeBetween(cls, subCls);
							mergeFieldKind(subCls, newCls, kind, customMerge);
						}
					} catch (err) {
						_didIteratorError9 = true;
						_iteratorError9 = err;
					} finally {
						try {
							if (!_iteratorNormalCompletion9 && _iterator9.return) {
								_iterator9.return();
							}
						} finally {
							if (_didIteratorError9) {
								throw _iteratorError9;
							}
						}
					}
				};
	
				mergeFieldKind(cls, cls, 'properties', function (superDesc, subDesc) {
					var _context5;
	
					// We're assuming that the only kind of non-trivial merging
					// right now is to give a property a specific constant value
					// in the subclass, which has to be checked in the superclass.
					// TODO: use actual json-schema validation to validate value
					var singleSuperDesc = void 0;
					if ((_context5 = superDesc.type, _isUndefined2.default).call(_context5) && superDesc.oneOf) {
						var _iteratorNormalCompletion10 = true;
						var _didIteratorError10 = false;
						var _iteratorError10 = undefined;
	
						try {
							for (var _iterator10 = superDesc.oneOf[Symbol.iterator](), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
								var _context6;
	
								var disjunct = _step10.value;
	
								if (_typeof(subDesc.value) === disjunct.type || (_context6 = subDesc.value, _isInteger2.default).call(_context6) && disjunct.type === 'integer' || (0, _isEqual3.default)(subDesc.value, disjunct.value)) {
									singleSuperDesc = _extends({}, superDesc, disjunct);
									delete singleSuperDesc.oneOf;
									delete singleSuperDesc.default;
								}
							}
						} catch (err) {
							_didIteratorError10 = true;
							_iteratorError10 = err;
						} finally {
							try {
								if (!_iteratorNormalCompletion10 && _iterator10.return) {
									_iterator10.return();
								}
							} finally {
								if (_didIteratorError10) {
									throw _iteratorError10;
								}
							}
						}
					} else {
						singleSuperDesc = _extends({}, superDesc);
					}
					return singleSuperDesc;
				});
	
				mergeFieldKind(cls, cls, 'relationships', function (superDesc, subDesc) {
					return subDesc;
				});
	
				mergeFieldKind(cls, cls, 'relationshipShortcuts', function (superDesc, subDesc) {
					return subDesc;
				});
	
				// TODO: for sides of a relationship (after splitting / merging all relevant domainPairs)
			}
		}, {
			key: 'mergeSameNameResources',
			value: function mergeSameNameResources(NewClass) {
				var OldClass = this.classes.vertexValue(NewClass.name);
				if (!OldClass) {
					return NewClass;
				}
				return _assignWith2.default.call(OldClass, NewClass, function (vOld, vNew, key) {
					var _context7;
	
					switch (key) {
						case 'module':
							return vOld;
						case 'extends':
						case 'extendedBy':
							return new Set([].concat(_toConsumableArray(vOld), _toConsumableArray(vNew)));
						case 'properties':
						case 'patternProperties':
							return (_context7 = {}, _assignWith2.default).call(_context7, vOld, vNew, function (pOld, pNew, pKey) {
								return _isUndefined2.default.call(pOld) ? pNew : pOld;
							});
						default:
							{
								if (!_isUndefined2.default.call(vOld) && !_isUndefined2.default.call(vNew) && !(0, _isEqual3.default)(vOld, vNew)) {
									throw new Error((0, _misc.humanMsg)(_templateObject3, OldClass.name, key, JSON.stringify(vOld), JSON.stringify(vNew)));
								}
								return _isUndefined2.default.call(vOld) ? vNew : vOld;
							}
					}
				});
			}
		}, {
			key: 'mergeSameNameRelationships',
			value: function mergeSameNameRelationships(NewClass) {
				var OldClass = this.classes.vertexValue(NewClass.name);
				if (!OldClass) {
					return NewClass;
				}
	
				var chooseOne = function chooseOne(o, n, sep, key) {
					return _isUndefined2.default.call(o) ? n : o;
				};
	
				return _assignWith2.default.call(OldClass, NewClass, function (vOld, vNew, key) {
					var _context8;
	
					switch (key) {
						case 'module':
							return vOld;
						case 'extends':
						case 'extendedBy':
							return new Set([].concat(_toConsumableArray(vOld), _toConsumableArray(vNew)));
						case 'domainPairs':
							return [].concat(_toConsumableArray(vOld), _toConsumableArray(vNew));
						case 'properties':
						case 'patternProperties':
						case 'behavior':
							return (_context8 = {}, _assignWith2.default).call(_context8, vOld, vNew, function (pOld, pNew, pKey) {
								return chooseOne(pOld, pNew, '#', pKey);
							});
						default:
							return chooseOne(vOld, vNew, '.', key);
					}
				});
			}
		}]);
	
		return Module;
	}();
	
	////////////////////////////////////////////////////////////
	// RESOURCE({
	//
	//     name: 'ResourceName',
	//
	//     extends: <superclass>,
	//     abstract: <true/false>,
	//
	//     singular: 'singular name',
	//     plural:   'plural names',
	//
	//     properties: {
	//         ...properties
	//     },
	//     patternProperties: {
	//         ...patternProperties
	//     },
	//     ...options
	// })
	////////////////////////////////////////////////////////////
	
	////////////////////////////////////////////////////////////
	// RELATIONSHIP({
	//
	//     name: 'RelationshipName',
	//
	//     extends: <superclass>,
	//     abstract: <true/false>,
	//
	//     1: [ ResourceType1, [c1min, c1max], { ...options1to2 } ],
	//     2: [ ResourceType2, [c2min, c2max], { ...options2to1 } ],
	//
	//     properties: {
	//         ...properties
	//     },
	//
	//     ...options
	// })
	//
	// This means that RelationshipName is a type of c1-to-c2 relationship
	// (c stands for cardinality: many-to-many, one-to-many, etc. both sides
	// have a min and max) between ResourceType1 resources and ResourceType2 resources.
	// So: "a ResourceType1 resource can be related to 'c1' ResourceType2 resource(s),
	//      exposed through through the key 'options1to2.key' in that resource"
	// and vice versa, if a key field is present, which is not mandatory.
	//
	// A couple of possible options:
	// - options1to2.sustains:     when the last related ResourceType1 instance is deleted,
	//                             the ResourceType2 instance that is being sustained by it is deleted automatically
	// - options1to2.anchors:      a ResourceType2 instance cannot be deleted
	//                             while there are still ResourceType1 instances related with it
	// - options1to2.implicit:     (only when c1min > 0) a new ResourceType2 instance, plus this kind of relationship,
	//                             is automatically created for a new ResourceType1 instance;
	// - options1to2.getSummary:   a human-readable explanation of the corresponding REST endpoint for HTTP GET
	// - options1to2.putSummary:   a human-readable explanation of the corresponding REST endpoint for HTTP PUT
	// - options1to2.deleteSummary:a human-readable explanation of the corresponding REST endpoint for HTTP DELETE
	// - options.readOnly:         this relationship type is managed programmatically, not to be exposed through the API directly
	// - options.noCycles:         no cycles of this relationship type are allowed
	// - options.symmetric:        this relationship type is bidirectional, 1->2 always implies 2->1; TODO: implement when needed
	// - options.antiReflexive:    a resource may not be related to itself with this type;            TODO: implement when needed
	////////////////////////////////////////////////////////////
	
	
	// TODO: reintroduce json schema processor
	//
	// function jsonSchemaConfig(config) {
	// 	let result = {
	// 		...config,
	// 		allProperties: { ...config.properties }
	// 	};
	//
	// 	if (isFunction(config.extends)) {
	// 		/* merge each property with properties of the same name in the superclass */
	// 		for (let key of Object.keys(config.extends.allProperties)) {
	// 			// TODO: check for conflicts
	// 			// TODO: merge certain sub-items (e.g., enums can be made narrower)
	// 			result.allProperties[key] = {
	// 				...config.extends.allProperties[key],
	// 				...result.allProperties[key]
	// 			};
	// 		}
	// 	}
	//
	// 	/* folding superclass properties into one object */
	// 	Object.assign(result.allProperties, config.extends && config.extends.allProperties);
	//
	// 	return result;
	//
	// 	// return {
	// 	// 	...config,
	// 	// 	schema: {
	// 	// 		$schema:             'http://json-schema.org/draft-04/schema#',
	// 	// 		type:                'Object',
	// 	// 		properties:           { ...(config.properties || {})         },
	// 	// 		patternProperties:    { ...(config.patternProperties || {})  },
	// 	// 		additionalProperties: ( config.additionalProperties === true )  // default: no additional properties allowed
	// 	//
	// 	// 		// TODO: have this object conform to json schema syntax
	// 	// 		//     : - add 'required' field?
	// 	// 		//     : - sanitize config.properties
	// 	// 		//     : - add properties '1' and '2' to it (if config.isRelationship)
	// 	//
	// 	// 		// TODO: fold superclass properties, patternProperties, etc. into this
	// 	// 		//     : - fold property flags into each other
	// 	// 	}
	// 	// };
	// }
	
	
	exports.default = Module;

/***/ },
/* 47 */,
/* 48 */,
/* 49 */,
/* 50 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `_.map` for arrays without support for iteratee
	 * shorthands.
	 *
	 * @private
	 * @param {Array} [array] The array to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns the new mapped array.
	 */
	function arrayMap(array, iteratee) {
	  var index = -1,
	      length = array ? array.length : 0,
	      result = Array(length);
	
	  while (++index < length) {
	    result[index] = iteratee(array[index], index, array);
	  }
	  return result;
	}
	
	module.exports = arrayMap;


/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	var assignValue = __webpack_require__(71);
	
	/**
	 * Copies properties of `source` to `object`.
	 *
	 * @private
	 * @param {Object} source The object to copy properties from.
	 * @param {Array} props The property identifiers to copy.
	 * @param {Object} [object={}] The object to copy properties to.
	 * @param {Function} [customizer] The function to customize copied values.
	 * @returns {Object} Returns `object`.
	 */
	function copyObject(source, props, object, customizer) {
	  object || (object = {});
	
	  var index = -1,
	      length = props.length;
	
	  while (++index < length) {
	    var key = props[index];
	
	    var newValue = customizer
	      ? customizer(object[key], source[key], key, object, source)
	      : undefined;
	
	    assignValue(object, key, newValue === undefined ? source[key] : newValue);
	  }
	  return object;
	}
	
	module.exports = copyObject;


/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	var DataView = __webpack_require__(256),
	    Map = __webpack_require__(108),
	    Promise = __webpack_require__(258),
	    Set = __webpack_require__(145),
	    WeakMap = __webpack_require__(260),
	    baseGetTag = __webpack_require__(279),
	    toSource = __webpack_require__(165);
	
	/** `Object#toString` result references. */
	var mapTag = '[object Map]',
	    objectTag = '[object Object]',
	    promiseTag = '[object Promise]',
	    setTag = '[object Set]',
	    weakMapTag = '[object WeakMap]';
	
	var dataViewTag = '[object DataView]';
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;
	
	/** Used to detect maps, sets, and weakmaps. */
	var dataViewCtorString = toSource(DataView),
	    mapCtorString = toSource(Map),
	    promiseCtorString = toSource(Promise),
	    setCtorString = toSource(Set),
	    weakMapCtorString = toSource(WeakMap);
	
	/**
	 * Gets the `toStringTag` of `value`.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the `toStringTag`.
	 */
	var getTag = baseGetTag;
	
	// Fallback for data views, maps, sets, and weak maps in IE 11,
	// for data views in Edge, and promises in Node.js.
	if ((DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag) ||
	    (Map && getTag(new Map) != mapTag) ||
	    (Promise && getTag(Promise.resolve()) != promiseTag) ||
	    (Set && getTag(new Set) != setTag) ||
	    (WeakMap && getTag(new WeakMap) != weakMapTag)) {
	  getTag = function(value) {
	    var result = objectToString.call(value),
	        Ctor = result == objectTag ? value.constructor : undefined,
	        ctorString = Ctor ? toSource(Ctor) : undefined;
	
	    if (ctorString) {
	      switch (ctorString) {
	        case dataViewCtorString: return dataViewTag;
	        case mapCtorString: return mapTag;
	        case promiseCtorString: return promiseTag;
	        case setCtorString: return setTag;
	        case weakMapCtorString: return weakMapTag;
	      }
	    }
	    return result;
	  };
	}
	
	module.exports = getTag;


/***/ },
/* 53 */
/***/ function(module, exports) {

	/** Used as references for various `Number` constants. */
	var MAX_SAFE_INTEGER = 9007199254740991;
	
	/** Used to detect unsigned integer values. */
	var reIsUint = /^(?:0|[1-9]\d*)$/;
	
	/**
	 * Checks if `value` is a valid array-like index.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
	 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
	 */
	function isIndex(value, length) {
	  length = length == null ? MAX_SAFE_INTEGER : length;
	  return !!length &&
	    (typeof value == 'number' || reIsUint.test(value)) &&
	    (value > -1 && value % 1 == 0 && value < length);
	}
	
	module.exports = isIndex;


/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	var isArray = __webpack_require__(8),
	    isSymbol = __webpack_require__(57);
	
	/** Used to match property names within property paths. */
	var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
	    reIsPlainProp = /^\w*$/;
	
	/**
	 * Checks if `value` is a property name and not a property path.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @param {Object} [object] The object to query keys on.
	 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
	 */
	function isKey(value, object) {
	  if (isArray(value)) {
	    return false;
	  }
	  var type = typeof value;
	  if (type == 'number' || type == 'symbol' || type == 'boolean' ||
	      value == null || isSymbol(value)) {
	    return true;
	  }
	  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) ||
	    (object != null && value in Object(object));
	}
	
	module.exports = isKey;


/***/ },
/* 55 */
/***/ function(module, exports) {

	/**
	 * Performs a
	 * [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
	 * comparison between two values to determine if they are equivalent.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	 * @example
	 *
	 * var object = { 'a': 1 };
	 * var other = { 'a': 1 };
	 *
	 * _.eq(object, object);
	 * // => true
	 *
	 * _.eq(object, other);
	 * // => false
	 *
	 * _.eq('a', 'a');
	 * // => true
	 *
	 * _.eq('a', Object('a'));
	 * // => false
	 *
	 * _.eq(NaN, NaN);
	 * // => true
	 */
	function eq(value, other) {
	  return value === other || (value !== value && other !== other);
	}
	
	module.exports = eq;


/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	var isArray = __webpack_require__(8),
	    isObjectLike = __webpack_require__(17);
	
	/** `Object#toString` result references. */
	var stringTag = '[object String]';
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;
	
	/**
	 * Checks if `value` is classified as a `String` primitive or object.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a string, else `false`.
	 * @example
	 *
	 * _.isString('abc');
	 * // => true
	 *
	 * _.isString(1);
	 * // => false
	 */
	function isString(value) {
	  return typeof value == 'string' ||
	    (!isArray(value) && isObjectLike(value) && objectToString.call(value) == stringTag);
	}
	
	module.exports = isString;


/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	var isObjectLike = __webpack_require__(17);
	
	/** `Object#toString` result references. */
	var symbolTag = '[object Symbol]';
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;
	
	/**
	 * Checks if `value` is classified as a `Symbol` primitive or object.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
	 * @example
	 *
	 * _.isSymbol(Symbol.iterator);
	 * // => true
	 *
	 * _.isSymbol('abc');
	 * // => false
	 */
	function isSymbol(value) {
	  return typeof value == 'symbol' ||
	    (isObjectLike(value) && objectToString.call(value) == symbolTag);
	}
	
	module.exports = isSymbol;


/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Observable_1 = __webpack_require__(23);
	var ScalarObservable_1 = __webpack_require__(171);
	var EmptyObservable_1 = __webpack_require__(125);
	var isScheduler_1 = __webpack_require__(87);
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @extends {Ignored}
	 * @hide true
	 */
	var ArrayObservable = (function (_super) {
	    __extends(ArrayObservable, _super);
	    function ArrayObservable(array, scheduler) {
	        _super.call(this);
	        this.array = array;
	        this.scheduler = scheduler;
	        if (!scheduler && array.length === 1) {
	            this._isScalar = true;
	            this.value = array[0];
	        }
	    }
	    ArrayObservable.create = function (array, scheduler) {
	        return new ArrayObservable(array, scheduler);
	    };
	    /**
	     * Creates an Observable that emits some values you specify as arguments,
	     * immediately one after the other, and then emits a complete notification.
	     *
	     * <span class="informal">Emits the arguments you provide, then completes.
	     * </span>
	     *
	     * <img src="./img/of.png" width="100%">
	     *
	     * This static operator is useful for creating a simple Observable that only
	     * emits the arguments given, and the complete notification thereafter. It can
	     * be used for composing with other Observables, such as with {@link concat}.
	     * By default, it uses a `null` Scheduler, which means the `next`
	     * notifications are sent synchronously, although with a different Scheduler
	     * it is possible to determine when those notifications will be delivered.
	     *
	     * @example <caption>Emit 10, 20, 30, then 'a', 'b', 'c', then start ticking every second.</caption>
	     * var numbers = Rx.Observable.of(10, 20, 30);
	     * var letters = Rx.Observable.of('a', 'b', 'c');
	     * var interval = Rx.Observable.interval(1000);
	     * var result = numbers.concat(letters).concat(interval);
	     * result.subscribe(x => console.log(x));
	     *
	     * @see {@link create}
	     * @see {@link empty}
	     * @see {@link never}
	     * @see {@link throw}
	     *
	     * @param {...T} values Arguments that represent `next` values to be emitted.
	     * @param {Scheduler} [scheduler] A {@link Scheduler} to use for scheduling
	     * the emissions of the `next` notifications.
	     * @return {Observable<T>} An Observable that emits each given input value.
	     * @static true
	     * @name of
	     * @owner Observable
	     */
	    ArrayObservable.of = function () {
	        var array = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            array[_i - 0] = arguments[_i];
	        }
	        var scheduler = array[array.length - 1];
	        if (isScheduler_1.isScheduler(scheduler)) {
	            array.pop();
	        }
	        else {
	            scheduler = null;
	        }
	        var len = array.length;
	        if (len > 1) {
	            return new ArrayObservable(array, scheduler);
	        }
	        else if (len === 1) {
	            return new ScalarObservable_1.ScalarObservable(array[0], scheduler);
	        }
	        else {
	            return new EmptyObservable_1.EmptyObservable(scheduler);
	        }
	    };
	    ArrayObservable.dispatch = function (state) {
	        var array = state.array, index = state.index, count = state.count, subscriber = state.subscriber;
	        if (index >= count) {
	            subscriber.complete();
	            return;
	        }
	        subscriber.next(array[index]);
	        if (subscriber.isUnsubscribed) {
	            return;
	        }
	        state.index = index + 1;
	        this.schedule(state);
	    };
	    ArrayObservable.prototype._subscribe = function (subscriber) {
	        var index = 0;
	        var array = this.array;
	        var count = array.length;
	        var scheduler = this.scheduler;
	        if (scheduler) {
	            return scheduler.schedule(ArrayObservable.dispatch, 0, {
	                array: array, index: index, count: count, subscriber: subscriber
	            });
	        }
	        else {
	            for (var i = 0; i < count && !subscriber.isUnsubscribed; i++) {
	                subscriber.next(array[i]);
	            }
	            subscriber.complete();
	        }
	    };
	    return ArrayObservable;
	}(Observable_1.Observable));
	exports.ArrayObservable = ArrayObservable;
	//# sourceMappingURL=ArrayObservable.js.map

/***/ },
/* 59 */,
/* 60 */,
/* 61 */,
/* 62 */,
/* 63 */,
/* 64 */,
/* 65 */,
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var fn = __webpack_require__(367);
	
	module.exports = function defaults() {
	  return fn.apply(undefined, [this].concat(Array.prototype.slice.apply(arguments)));
	};


/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var fn = __webpack_require__(79);
	
	module.exports = function isFunction() {
	  return fn.apply(undefined, [this].concat(Array.prototype.slice.apply(arguments)));
	};


/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var fn = __webpack_require__(11);
	
	module.exports = function isObject() {
	  return fn.apply(undefined, [this].concat(Array.prototype.slice.apply(arguments)));
	};


/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	var listCacheClear = __webpack_require__(340),
	    listCacheDelete = __webpack_require__(341),
	    listCacheGet = __webpack_require__(342),
	    listCacheHas = __webpack_require__(343),
	    listCacheSet = __webpack_require__(344);
	
	/**
	 * Creates an list cache object.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function ListCache(entries) {
	  var index = -1,
	      length = entries ? entries.length : 0;
	
	  this.clear();
	  while (++index < length) {
	    var entry = entries[index];
	    this.set(entry[0], entry[1]);
	  }
	}
	
	// Add methods to `ListCache`.
	ListCache.prototype.clear = listCacheClear;
	ListCache.prototype['delete'] = listCacheDelete;
	ListCache.prototype.get = listCacheGet;
	ListCache.prototype.has = listCacheHas;
	ListCache.prototype.set = listCacheSet;
	
	module.exports = ListCache;


/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	var root = __webpack_require__(16);
	
	/** Built-in value references. */
	var Symbol = root.Symbol;
	
	module.exports = Symbol;


/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	var eq = __webpack_require__(55);
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/**
	 * Assigns `value` to `key` of `object` if the existing value is not equivalent
	 * using [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
	 * for equality comparisons.
	 *
	 * @private
	 * @param {Object} object The object to modify.
	 * @param {string} key The key of the property to assign.
	 * @param {*} value The value to assign.
	 */
	function assignValue(object, key, value) {
	  var objValue = object[key];
	  if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) ||
	      (value === undefined && !(key in object))) {
	    object[key] = value;
	  }
	}
	
	module.exports = assignValue;


/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	var eq = __webpack_require__(55);
	
	/**
	 * Gets the index at which the `key` is found in `array` of key-value pairs.
	 *
	 * @private
	 * @param {Array} array The array to search.
	 * @param {*} key The key to search for.
	 * @returns {number} Returns the index of the matched value, else `-1`.
	 */
	function assocIndexOf(array, key) {
	  var length = array.length;
	  while (length--) {
	    if (eq(array[length][0], key)) {
	      return length;
	    }
	  }
	  return -1;
	}
	
	module.exports = assocIndexOf;


/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	var arrayPush = __webpack_require__(149),
	    isFlattenable = __webpack_require__(335);
	
	/**
	 * The base implementation of `_.flatten` with support for restricting flattening.
	 *
	 * @private
	 * @param {Array} array The array to flatten.
	 * @param {number} depth The maximum recursion depth.
	 * @param {boolean} [predicate=isFlattenable] The function invoked per iteration.
	 * @param {boolean} [isStrict] Restrict to values that pass `predicate` checks.
	 * @param {Array} [result=[]] The initial result value.
	 * @returns {Array} Returns the new flattened array.
	 */
	function baseFlatten(array, depth, predicate, isStrict, result) {
	  var index = -1,
	      length = array.length;
	
	  predicate || (predicate = isFlattenable);
	  result || (result = []);
	
	  while (++index < length) {
	    var value = array[index];
	    if (depth > 0 && predicate(value)) {
	      if (depth > 1) {
	        // Recursively flatten arrays (susceptible to call stack limits).
	        baseFlatten(value, depth - 1, predicate, isStrict, result);
	      } else {
	        arrayPush(result, value);
	      }
	    } else if (!isStrict) {
	      result[result.length] = value;
	    }
	  }
	  return result;
	}
	
	module.exports = baseFlatten;


/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	var baseFindIndex = __webpack_require__(275),
	    baseIsNaN = __webpack_require__(285);
	
	/**
	 * The base implementation of `_.indexOf` without `fromIndex` bounds checks.
	 *
	 * @private
	 * @param {Array} array The array to search.
	 * @param {*} value The value to search for.
	 * @param {number} fromIndex The index to search from.
	 * @returns {number} Returns the index of the matched value, else `-1`.
	 */
	function baseIndexOf(array, value, fromIndex) {
	  if (value !== value) {
	    return baseFindIndex(array, baseIsNaN, fromIndex);
	  }
	  var index = fromIndex - 1,
	      length = array.length;
	
	  while (++index < length) {
	    if (array[index] === value) {
	      return index;
	    }
	  }
	  return -1;
	}
	
	module.exports = baseIndexOf;


/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	var isKeyable = __webpack_require__(337);
	
	/**
	 * Gets the data for `map`.
	 *
	 * @private
	 * @param {Object} map The map to query.
	 * @param {string} key The reference key.
	 * @returns {*} Returns the map data.
	 */
	function getMapData(map, key) {
	  var data = map.__data__;
	  return isKeyable(key)
	    ? data[typeof key == 'string' ? 'string' : 'hash']
	    : data.map;
	}
	
	module.exports = getMapData;


/***/ },
/* 76 */
/***/ function(module, exports) {

	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/**
	 * Checks if `value` is likely a prototype object.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
	 */
	function isPrototype(value) {
	  var Ctor = value && value.constructor,
	      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;
	
	  return value === proto;
	}
	
	module.exports = isPrototype;


/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(40);
	
	/* Built-in method references that are verified to be native. */
	var nativeCreate = getNative(Object, 'create');
	
	module.exports = nativeCreate;


/***/ },
/* 78 */
/***/ function(module, exports) {

	/**
	 * Converts `set` to an array of its values.
	 *
	 * @private
	 * @param {Object} set The set to convert.
	 * @returns {Array} Returns the values.
	 */
	function setToArray(set) {
	  var index = -1,
	      result = Array(set.size);
	
	  set.forEach(function(value) {
	    result[++index] = value;
	  });
	  return result;
	}
	
	module.exports = setToArray;


/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(11);
	
	/** `Object#toString` result references. */
	var funcTag = '[object Function]',
	    genTag = '[object GeneratorFunction]';
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;
	
	/**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
	 * @example
	 *
	 * _.isFunction(_);
	 * // => true
	 *
	 * _.isFunction(/abc/);
	 * // => false
	 */
	function isFunction(value) {
	  // The use of `Object#toString` avoids issues with the `typeof` operator
	  // in Safari 8 which returns 'object' for typed array and weak map constructors,
	  // and PhantomJS 1.9 which returns 'function' for `NodeList` instances.
	  var tag = isObject(value) ? objectToString.call(value) : '';
	  return tag == funcTag || tag == genTag;
	}
	
	module.exports = isFunction;


/***/ },
/* 80 */
/***/ function(module, exports) {

	/** Used as references for various `Number` constants. */
	var MAX_SAFE_INTEGER = 9007199254740991;
	
	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This function is loosely based on
	 * [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length,
	 *  else `false`.
	 * @example
	 *
	 * _.isLength(3);
	 * // => true
	 *
	 * _.isLength(Number.MIN_VALUE);
	 * // => false
	 *
	 * _.isLength(Infinity);
	 * // => false
	 *
	 * _.isLength('3');
	 * // => false
	 */
	function isLength(value) {
	  return typeof value == 'number' &&
	    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}
	
	module.exports = isLength;


/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Observable_1 = __webpack_require__(23);
	var Subscriber_1 = __webpack_require__(12);
	var Subscription_1 = __webpack_require__(124);
	var ObjectUnsubscribedError_1 = __webpack_require__(175);
	var SubjectSubscription_1 = __webpack_require__(405);
	var rxSubscriber_1 = __webpack_require__(126);
	/**
	 * @class SubjectSubscriber<T>
	 */
	var SubjectSubscriber = (function (_super) {
	    __extends(SubjectSubscriber, _super);
	    function SubjectSubscriber(destination) {
	        _super.call(this, destination);
	        this.destination = destination;
	    }
	    return SubjectSubscriber;
	}(Subscriber_1.Subscriber));
	exports.SubjectSubscriber = SubjectSubscriber;
	/**
	 * @class Subject<T>
	 */
	var Subject = (function (_super) {
	    __extends(Subject, _super);
	    function Subject() {
	        _super.call(this);
	        this.observers = [];
	        this.isUnsubscribed = false;
	        this.isStopped = false;
	        this.hasError = false;
	        this.thrownError = null;
	    }
	    Subject.prototype[rxSubscriber_1.$$rxSubscriber] = function () {
	        return new SubjectSubscriber(this);
	    };
	    Subject.prototype.lift = function (operator) {
	        var subject = new AnonymousSubject(this, this);
	        subject.operator = operator;
	        return subject;
	    };
	    Subject.prototype.next = function (value) {
	        if (this.isUnsubscribed) {
	            throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();
	        }
	        if (!this.isStopped) {
	            var observers = this.observers;
	            var len = observers.length;
	            var copy = observers.slice();
	            for (var i = 0; i < len; i++) {
	                copy[i].next(value);
	            }
	        }
	    };
	    Subject.prototype.error = function (err) {
	        if (this.isUnsubscribed) {
	            throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();
	        }
	        this.hasError = true;
	        this.thrownError = err;
	        this.isStopped = true;
	        var observers = this.observers;
	        var len = observers.length;
	        var copy = observers.slice();
	        for (var i = 0; i < len; i++) {
	            copy[i].error(err);
	        }
	        this.observers.length = 0;
	    };
	    Subject.prototype.complete = function () {
	        if (this.isUnsubscribed) {
	            throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();
	        }
	        this.isStopped = true;
	        var observers = this.observers;
	        var len = observers.length;
	        var copy = observers.slice();
	        for (var i = 0; i < len; i++) {
	            copy[i].complete();
	        }
	        this.observers.length = 0;
	    };
	    Subject.prototype.unsubscribe = function () {
	        this.isStopped = true;
	        this.isUnsubscribed = true;
	        this.observers = null;
	    };
	    Subject.prototype._subscribe = function (subscriber) {
	        if (this.isUnsubscribed) {
	            throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();
	        }
	        else if (this.hasError) {
	            subscriber.error(this.thrownError);
	            return Subscription_1.Subscription.EMPTY;
	        }
	        else if (this.isStopped) {
	            subscriber.complete();
	            return Subscription_1.Subscription.EMPTY;
	        }
	        else {
	            this.observers.push(subscriber);
	            return new SubjectSubscription_1.SubjectSubscription(this, subscriber);
	        }
	    };
	    Subject.prototype.asObservable = function () {
	        var observable = new Observable_1.Observable();
	        observable.source = this;
	        return observable;
	    };
	    Subject.create = function (destination, source) {
	        return new AnonymousSubject(destination, source);
	    };
	    return Subject;
	}(Observable_1.Observable));
	exports.Subject = Subject;
	/**
	 * @class AnonymousSubject<T>
	 */
	var AnonymousSubject = (function (_super) {
	    __extends(AnonymousSubject, _super);
	    function AnonymousSubject(destination, source) {
	        _super.call(this);
	        this.destination = destination;
	        this.source = source;
	    }
	    AnonymousSubject.prototype.next = function (value) {
	        var destination = this.destination;
	        if (destination && destination.next) {
	            destination.next(value);
	        }
	    };
	    AnonymousSubject.prototype.error = function (err) {
	        var destination = this.destination;
	        if (destination && destination.error) {
	            this.destination.error(err);
	        }
	    };
	    AnonymousSubject.prototype.complete = function () {
	        var destination = this.destination;
	        if (destination && destination.complete) {
	            this.destination.complete();
	        }
	    };
	    AnonymousSubject.prototype._subscribe = function (subscriber) {
	        var source = this.source;
	        if (source) {
	            return this.source.subscribe(subscriber);
	        }
	        else {
	            return Subscription_1.Subscription.EMPTY;
	        }
	    };
	    return AnonymousSubject;
	}(Subject));
	exports.AnonymousSubject = AnonymousSubject;
	//# sourceMappingURL=Subject.js.map

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subscriber_1 = __webpack_require__(12);
	/**
	 * Applies a given `project` function to each value emitted by the source
	 * Observable, and emits the resulting values as an Observable.
	 *
	 * <span class="informal">Like [Array.prototype.map()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map),
	 * it passes each source value through a transformation function to get
	 * corresponding output values.</span>
	 *
	 * <img src="./img/map.png" width="100%">
	 *
	 * Similar to the well known `Array.prototype.map` function, this operator
	 * applies a projection to each value and emits that projection in the output
	 * Observable.
	 *
	 * @example <caption>Map every every click to the clientX position of that click</caption>
	 * var clicks = Rx.Observable.fromEvent(document, 'click');
	 * var positions = clicks.map(ev => ev.clientX);
	 * positions.subscribe(x => console.log(x));
	 *
	 * @see {@link mapTo}
	 * @see {@link pluck}
	 *
	 * @param {function(value: T, index: number): R} project The function to apply
	 * to each `value` emitted by the source Observable. The `index` parameter is
	 * the number `i` for the i-th emission that has happened since the
	 * subscription, starting from the number `0`.
	 * @param {any} [thisArg] An optional argument to define what `this` is in the
	 * `project` function.
	 * @return {Observable<R>} An Observable that emits the values from the source
	 * Observable transformed by the given `project` function.
	 * @method map
	 * @owner Observable
	 */
	function map(project, thisArg) {
	    if (typeof project !== 'function') {
	        throw new TypeError('argument is not a function. Are you looking for `mapTo()`?');
	    }
	    return this.lift(new MapOperator(project, thisArg));
	}
	exports.map = map;
	var MapOperator = (function () {
	    function MapOperator(project, thisArg) {
	        this.project = project;
	        this.thisArg = thisArg;
	    }
	    MapOperator.prototype.call = function (subscriber, source) {
	        return source._subscribe(new MapSubscriber(subscriber, this.project, this.thisArg));
	    };
	    return MapOperator;
	}());
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var MapSubscriber = (function (_super) {
	    __extends(MapSubscriber, _super);
	    function MapSubscriber(destination, project, thisArg) {
	        _super.call(this, destination);
	        this.project = project;
	        this.count = 0;
	        this.thisArg = thisArg || this;
	    }
	    // NOTE: This looks unoptimized, but it's actually purposefully NOT
	    // using try/catch optimizations.
	    MapSubscriber.prototype._next = function (value) {
	        var result;
	        try {
	            result = this.project.call(this.thisArg, value, this.count++);
	        }
	        catch (err) {
	            this.destination.error(err);
	            return;
	        }
	        this.destination.next(result);
	    };
	    return MapSubscriber;
	}(Subscriber_1.Subscriber));
	//# sourceMappingURL=map.js.map

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subscriber_1 = __webpack_require__(12);
	/**
	 * Groups pairs of consecutive emissions together and emits them as an array of
	 * two values.
	 *
	 * <span class="informal">Puts the current value and previous value together as
	 * an array, and emits that.</span>
	 *
	 * <img src="./img/pairwise.png" width="100%">
	 *
	 * The Nth emission from the source Observable will cause the output Observable
	 * to emit an array [(N-1)th, Nth] of the previous and the current value, as a
	 * pair. For this reason, `pairwise` emits on the second and subsequent
	 * emissions from the source Observable, but not on the first emission, because
	 * there is no previous value in that case.
	 *
	 * @example <caption>On every click (starting from the second), emit the relative distance to the previous click</caption>
	 * var clicks = Rx.Observable.fromEvent(document, 'click');
	 * var pairs = clicks.pairwise();
	 * var distance = pairs.map(pair => {
	 *   var x0 = pair[0].clientX;
	 *   var y0 = pair[0].clientY;
	 *   var x1 = pair[1].clientX;
	 *   var y1 = pair[1].clientY;
	 *   return Math.sqrt(Math.pow(x0 - x1, 2) + Math.pow(y0 - y1, 2));
	 * });
	 * distance.subscribe(x => console.log(x));
	 *
	 * @see {@link buffer}
	 * @see {@link bufferCount}
	 *
	 * @return {Observable<Array<T>>} An Observable of pairs (as arrays) of
	 * consecutive values from the source Observable.
	 * @method pairwise
	 * @owner Observable
	 */
	function pairwise() {
	    return this.lift(new PairwiseOperator());
	}
	exports.pairwise = pairwise;
	var PairwiseOperator = (function () {
	    function PairwiseOperator() {
	    }
	    PairwiseOperator.prototype.call = function (subscriber, source) {
	        return source._subscribe(new PairwiseSubscriber(subscriber));
	    };
	    return PairwiseOperator;
	}());
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var PairwiseSubscriber = (function (_super) {
	    __extends(PairwiseSubscriber, _super);
	    function PairwiseSubscriber(destination) {
	        _super.call(this, destination);
	        this.hasPrev = false;
	    }
	    PairwiseSubscriber.prototype._next = function (value) {
	        if (this.hasPrev) {
	            this.destination.next([this.prev, value]);
	        }
	        else {
	            this.hasPrev = true;
	        }
	        this.prev = value;
	    };
	    return PairwiseSubscriber;
	}(Subscriber_1.Subscriber));
	//# sourceMappingURL=pairwise.js.map

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var ArrayObservable_1 = __webpack_require__(58);
	var ScalarObservable_1 = __webpack_require__(171);
	var EmptyObservable_1 = __webpack_require__(125);
	var concat_1 = __webpack_require__(173);
	var isScheduler_1 = __webpack_require__(87);
	/**
	 * Returns an Observable that emits the items in a specified Iterable before it begins to emit items emitted by the
	 * source Observable.
	 *
	 * <img src="./img/startWith.png" width="100%">
	 *
	 * @param {Values} an Iterable that contains the items you want the modified Observable to emit first.
	 * @return {Observable} an Observable that emits the items in the specified Iterable and then emits the items
	 * emitted by the source Observable.
	 * @method startWith
	 * @owner Observable
	 */
	function startWith() {
	    var array = [];
	    for (var _i = 0; _i < arguments.length; _i++) {
	        array[_i - 0] = arguments[_i];
	    }
	    var scheduler = array[array.length - 1];
	    if (isScheduler_1.isScheduler(scheduler)) {
	        array.pop();
	    }
	    else {
	        scheduler = null;
	    }
	    var len = array.length;
	    if (len === 1) {
	        return concat_1.concatStatic(new ScalarObservable_1.ScalarObservable(array[0], scheduler), this);
	    }
	    else if (len > 1) {
	        return concat_1.concatStatic(new ArrayObservable_1.ArrayObservable(array, scheduler), this);
	    }
	    else {
	        return concat_1.concatStatic(new EmptyObservable_1.EmptyObservable(scheduler), this);
	    }
	}
	exports.startWith = startWith;
	//# sourceMappingURL=startWith.js.map

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var OuterSubscriber_1 = __webpack_require__(42);
	var subscribeToResult_1 = __webpack_require__(43);
	/**
	 * Projects each source value to an Observable which is merged in the output
	 * Observable, emitting values only from the most recently projected Observable.
	 *
	 * <span class="informal">Maps each value to an Observable, then flattens all of
	 * these inner Observables using {@link switch}.</span>
	 *
	 * <img src="./img/switchMap.png" width="100%">
	 *
	 * Returns an Observable that emits items based on applying a function that you
	 * supply to each item emitted by the source Observable, where that function
	 * returns an (so-called "inner") Observable. Each time it observes one of these
	 * inner Observables, the output Observable begins emitting the items emitted by
	 * that inner Observable. When a new inner Observable is emitted, `switchMap`
	 * stops emitting items from the earlier-emitted inner Observable and begins
	 * emitting items from the new one. It continues to behave like this for
	 * subsequent inner Observables.
	 *
	 * @example <caption>Rerun an interval Observable on every click event</caption>
	 * var clicks = Rx.Observable.fromEvent(document, 'click');
	 * var result = clicks.switchMap((ev) => Rx.Observable.interval(1000));
	 * result.subscribe(x => console.log(x));
	 *
	 * @see {@link concatMap}
	 * @see {@link exhaustMap}
	 * @see {@link mergeMap}
	 * @see {@link switch}
	 * @see {@link switchMapTo}
	 *
	 * @param {function(value: T, ?index: number): Observable} project A function
	 * that, when applied to an item emitted by the source Observable, returns an
	 * Observable.
	 * @param {function(outerValue: T, innerValue: I, outerIndex: number, innerIndex: number): any} [resultSelector]
	 * A function to produce the value on the output Observable based on the values
	 * and the indices of the source (outer) emission and the inner Observable
	 * emission. The arguments passed to this function are:
	 * - `outerValue`: the value that came from the source
	 * - `innerValue`: the value that came from the projected Observable
	 * - `outerIndex`: the "index" of the value that came from the source
	 * - `innerIndex`: the "index" of the value from the projected Observable
	 * @return {Observable} An Observable that emits the result of applying the
	 * projection function (and the optional `resultSelector`) to each item emitted
	 * by the source Observable and taking only the values from the most recently
	 * projected inner Observable.
	 * @method switchMap
	 * @owner Observable
	 */
	function switchMap(project, resultSelector) {
	    return this.lift(new SwitchMapOperator(project, resultSelector));
	}
	exports.switchMap = switchMap;
	var SwitchMapOperator = (function () {
	    function SwitchMapOperator(project, resultSelector) {
	        this.project = project;
	        this.resultSelector = resultSelector;
	    }
	    SwitchMapOperator.prototype.call = function (subscriber, source) {
	        return source._subscribe(new SwitchMapSubscriber(subscriber, this.project, this.resultSelector));
	    };
	    return SwitchMapOperator;
	}());
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var SwitchMapSubscriber = (function (_super) {
	    __extends(SwitchMapSubscriber, _super);
	    function SwitchMapSubscriber(destination, project, resultSelector) {
	        _super.call(this, destination);
	        this.project = project;
	        this.resultSelector = resultSelector;
	        this.index = 0;
	    }
	    SwitchMapSubscriber.prototype._next = function (value) {
	        var result;
	        var index = this.index++;
	        try {
	            result = this.project(value, index);
	        }
	        catch (error) {
	            this.destination.error(error);
	            return;
	        }
	        this._innerSub(result, value, index);
	    };
	    SwitchMapSubscriber.prototype._innerSub = function (result, value, index) {
	        var innerSubscription = this.innerSubscription;
	        if (innerSubscription) {
	            innerSubscription.unsubscribe();
	        }
	        this.add(this.innerSubscription = subscribeToResult_1.subscribeToResult(this, result, value, index));
	    };
	    SwitchMapSubscriber.prototype._complete = function () {
	        var innerSubscription = this.innerSubscription;
	        if (!innerSubscription || innerSubscription.isUnsubscribed) {
	            _super.prototype._complete.call(this);
	        }
	    };
	    SwitchMapSubscriber.prototype._unsubscribe = function () {
	        this.innerSubscription = null;
	    };
	    SwitchMapSubscriber.prototype.notifyComplete = function (innerSub) {
	        this.remove(innerSub);
	        this.innerSubscription = null;
	        if (this.isStopped) {
	            _super.prototype._complete.call(this);
	        }
	    };
	    SwitchMapSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
	        if (this.resultSelector) {
	            this._tryNotifyNext(outerValue, innerValue, outerIndex, innerIndex);
	        }
	        else {
	            this.destination.next(innerValue);
	        }
	    };
	    SwitchMapSubscriber.prototype._tryNotifyNext = function (outerValue, innerValue, outerIndex, innerIndex) {
	        var result;
	        try {
	            result = this.resultSelector(outerValue, innerValue, outerIndex, innerIndex);
	        }
	        catch (err) {
	            this.destination.error(err);
	            return;
	        }
	        this.destination.next(result);
	    };
	    return SwitchMapSubscriber;
	}(OuterSubscriber_1.OuterSubscriber));
	//# sourceMappingURL=switchMap.js.map

/***/ },
/* 86 */
/***/ function(module, exports) {

	"use strict";
	exports.isArray = Array.isArray || (function (x) { return x && typeof x.length === 'number'; });
	//# sourceMappingURL=isArray.js.map

/***/ },
/* 87 */
/***/ function(module, exports) {

	"use strict";
	function isScheduler(value) {
	    return value && typeof value.schedule === 'function';
	}
	exports.isScheduler = isScheduler;
	//# sourceMappingURL=isScheduler.js.map

/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module, global) {"use strict";
	var objectTypes = {
	    'boolean': false,
	    'function': true,
	    'object': true,
	    'number': false,
	    'string': false,
	    'undefined': false
	};
	exports.root = (objectTypes[typeof self] && self) || (objectTypes[typeof window] && window);
	/* tslint:disable:no-unused-variable */
	var freeExports = objectTypes[typeof exports] && exports && !exports.nodeType && exports;
	var freeModule = objectTypes[typeof module] && module && !module.nodeType && module;
	var freeGlobal = objectTypes[typeof global] && global;
	if (freeGlobal && (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal)) {
	    exports.root = freeGlobal;
	}
	//# sourceMappingURL=root.js.map
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(128)(module), (function() { return this; }())))

/***/ },
/* 89 */,
/* 90 */,
/* 91 */,
/* 92 */,
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _TypedModule = __webpack_require__(27);
	
	var _TypedModule2 = _interopRequireDefault(_TypedModule);
	
	var _resources = __webpack_require__(13);
	
	var _resources2 = _interopRequireDefault(_resources);
	
	var _typed = __webpack_require__(18);
	
	var _typed2 = _interopRequireDefault(_typed);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = _TypedModule2.default.create('groups', [_resources2.default, _typed2.default], function (M, _ref) {
		var IsRelatedTo = _ref.IsRelatedTo;
		var Template = _ref.Template;
		var PullsIntoTypeDefinition = _ref.PullsIntoTypeDefinition;
	
	
		var Group = M.TYPED_RESOURCE({ /////////////////////////////////////////
	
			name: 'Group',
	
			extends: Template,
	
			singular: "group"
	
		}); /////////////////////////////////////////////////////////////////////////////
	
	
		var IncludesElement = M.RELATIONSHIP({
	
			name: 'IncludesElement',
	
			extends: PullsIntoTypeDefinition,
	
			singular: "includes element",
	
			1: [Group, '0..*', { anchors: true, key: 'elements' }],
			2: [Template, '0..*']
	
		});
	});

/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _TypedModule = __webpack_require__(27);
	
	var _TypedModule2 = _interopRequireDefault(_TypedModule);
	
	var _resources = __webpack_require__(13);
	
	var _resources2 = _interopRequireDefault(_resources);
	
	var _typed = __webpack_require__(18);
	
	var _typed2 = _interopRequireDefault(_typed);
	
	var _lyphs = __webpack_require__(32);
	
	var _lyphs2 = _interopRequireDefault(_lyphs);
	
	var _processes = __webpack_require__(95);
	
	var _processes2 = _interopRequireDefault(_processes);
	
	var _schemas = __webpack_require__(33);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = _TypedModule2.default.create('measurables', [_resources2.default, _typed2.default, _lyphs2.default, _processes2.default], function (M, _ref) {
		var Resource = _ref.Resource;
		var IsRelatedTo = _ref.IsRelatedTo;
		var Template = _ref.Template;
		var Lyph = _ref.Lyph;
		var Material = _ref.Material;
		var Border = _ref.Border;
		var Node = _ref.Node;
		var Process = _ref.Process;
		var Has = _ref.Has;
		var PullsIntoTypeDefinition = _ref.PullsIntoTypeDefinition;
	
	
		var Measurable = M.TYPED_RESOURCE({ ///////////////////////////////////////
	
			name: 'Measurable',
	
			extends: Template,
	
			singular: "measurable",
	
			properties: {
				'quality': {
					type: 'string',
					isRefinement: function isRefinement(a, b) {
						return !a || a === b;
					}
				}
			}
	
		}); /////////////////////////////////////////////////////////////////////////
	
	
		var MeasuresMaterial = M.RELATIONSHIP({
	
			name: 'MeasuresMaterial',
	
			extends: PullsIntoTypeDefinition,
	
			singular: "measures material",
	
			1: [Measurable, '0..*', { anchors: true, key: 'materials' }],
			2: [Material.Type, '0..*'],
	
			properties: {
				'dimensionality': _extends({}, _schemas.dimensionalitySchema)
			}
	
		});
	
		var MeasurableLocation = M.TYPED_RESOURCE({ ///////////////////////////////
	
			name: 'MeasurableLocation',
	
			abstract: true,
	
			extends: Template,
	
			extendedBy: [Lyph, Border, Node, Process],
	
			singular: "measurable location"
	
		}); /////////////////////////////////////////////////////////////////////////
	
	
		var HasMeasurable = M.RELATIONSHIP({
	
			name: 'HasMeasurable',
	
			extends: Has,
	
			singular: "has measurable",
	
			1: [MeasurableLocation, '0..*', { anchors: true, sustains: true, key: 'measurables' }],
			2: [Measurable, '0..*', { key: 'locations' }]
	
		});
	
		var Causality = M.TYPED_RESOURCE({ ////////////////////////////////////////
	
			name: 'Causality',
	
			extends: Template,
	
			singular: "causality",
			plural: "causalities"
	
		}); /////////////////////////////////////////////////////////////////////////
	
	
		var _M$RELATIONSHIP = M.RELATIONSHIP([{
	
			name: 'Causes',
	
			extends: PullsIntoTypeDefinition,
	
			singular: "causes",
	
			1: [Measurable, '0..*', { key: 'effects' }],
			2: [Causality, '1..1', { anchors: true, key: 'cause' }]
	
		}, {
	
			name: 'Causes',
	
			extends: PullsIntoTypeDefinition,
	
			1: [Causality, '1..1', { anchors: true, key: 'effect' }],
			2: [Measurable, '0..*', { key: 'causes' }]
	
		}]);
	
		var _M$RELATIONSHIP2 = _slicedToArray(_M$RELATIONSHIP, 1);
	
		var Causes = _M$RELATIONSHIP2[0];
	});

/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _TypedModule = __webpack_require__(27);
	
	var _TypedModule2 = _interopRequireDefault(_TypedModule);
	
	var _misc = __webpack_require__(3);
	
	var _schemas = __webpack_require__(33);
	
	var _resources = __webpack_require__(13);
	
	var _resources2 = _interopRequireDefault(_resources);
	
	var _typed = __webpack_require__(18);
	
	var _typed2 = _interopRequireDefault(_typed);
	
	var _lyphs = __webpack_require__(32);
	
	var _lyphs2 = _interopRequireDefault(_lyphs);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = _TypedModule2.default.create('processes', [_resources2.default, _typed2.default, _lyphs2.default], function (M, _ref) {
		var IsRelatedTo = _ref.IsRelatedTo;
		var Template = _ref.Template;
		var Material = _ref.Material;
		var Lyph = _ref.Lyph;
		var Node = _ref.Node;
		var Has = _ref.Has;
		var PullsIntoTypeDefinition = _ref.PullsIntoTypeDefinition;
	
	
		var Process = M.TYPED_RESOURCE({ //////////////////////////////////////////
	
			name: 'Process',
	
			extends: Template,
	
			singular: "process",
			plural: "processes",
	
			properties: {
				'transportPhenomenon': _extends({}, (0, _schemas.enumArraySchema)('advection', 'diffusion'), {
					default: ['advection', 'diffusion'],
					required: true,
					isRefinement: function isRefinement(a, b) {
						a = new Set(a ? (0, _misc.wrapInArray)(a) : []);
						b = new Set(b ? (0, _misc.wrapInArray)(b) : []);
						return !(b.has('advection') && !a.has('advection')) && !(b.has('diffusion') && !a.has('diffusion'));
					}
				})
			}
	
		}); /////////////////////////////////////////////////////////////////////////
	
	
		var _M$RELATIONSHIP = M.RELATIONSHIP([{
	
			name: 'FlowsTo',
	
			extends: PullsIntoTypeDefinition,
	
			singular: "flows to",
	
			1: [Node, '0..*', { key: 'outgoingProcesses' }],
			2: [Process, '0..1', { anchors: true, key: 'source' }]
	
		}, {
	
			name: 'FlowsTo',
	
			extends: PullsIntoTypeDefinition,
	
			singular: "flows to",
	
			1: [Process, '0..1', { anchors: true, key: 'target' }],
			2: [Node, '0..*', { key: 'incomingProcesses' }]
	
		}]);
	
		var _M$RELATIONSHIP2 = _slicedToArray(_M$RELATIONSHIP, 1);
	
		var FlowsTo = _M$RELATIONSHIP2[0]
	
		var ConveysProcess = M.RELATIONSHIP({
	
			name: 'ConveysProcess',
	
			extends: Has,
	
			singular: "conveys process",
	
			1: [Lyph, '0..*', { anchors: true, key: 'processes' }],
			2: [Process, '0..*', { key: 'conveyingLyph' }]
	
		});
	
		var TransportsMaterial = M.RELATIONSHIP({
	
			name: 'TransportsMaterial',
	
			extends: Has,
	
			singular: "transports material",
	
			1: [Process, '0..*', { anchors: true, key: 'materials' }],
			2: [Material.Type, '0..*']
	
		});
	
		var HasSegment = M.RELATIONSHIP({
	
			name: 'HasSegment',
	
			extends: Has,
	
			singular: "has segment",
	
			1: [Process, '0..*', { anchors: true, key: 'segments' }],
			2: [Process, '0..*']
	
		});
	
		var _M$RELATIONSHIP5 = M.RELATIONSHIP([Process, Node].map(function (Class) {
			return {
	
				name: 'HasChannel',
	
				extends: Has,
	
				singular: "has channel",
	
				1: [Class, '0..*', { anchors: true, key: 'channels' }],
				2: [Class, '0..*']
	
			};
		}));
	
		var _M$RELATIONSHIP6 = _slicedToArray(_M$RELATIONSHIP5, 1);
	
		var HasChannel = _M$RELATIONSHIP6[0];
	});

/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _templateObject = _taggedTemplateLiteral(["\n\t\t\t\tThe ", " event does not exist.\n\t\t\t"], ["\n\t\t\t\tThe ", " event does not exist.\n\t\t\t"]),
	    _templateObject2 = _taggedTemplateLiteral(["\n\t\t\t\tThe ", " property does not exist.\n\t\t\t"], ["\n\t\t\t\tThe ", " property does not exist.\n\t\t\t"]);
	
	exports.setEquals = setEquals;
	exports.copySetContent = copySetContent;
	
	var _Subject2 = __webpack_require__(81);
	
	var _BehaviorSubject = __webpack_require__(123);
	
	var _misc = __webpack_require__(3);
	
	function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }
	
	function _extendableBuiltin(cls) {
		function ExtendableBuiltin() {
			var instance = Reflect.construct(cls, Array.from(arguments));
			Object.setPrototypeOf(instance, Object.getPrototypeOf(this));
			return instance;
		}
	
		ExtendableBuiltin.prototype = Object.create(cls.prototype, {
			constructor: {
				value: cls,
				enumerable: false,
				writable: true,
				configurable: true
			}
		});
	
		if (Object.setPrototypeOf) {
			Object.setPrototypeOf(ExtendableBuiltin, cls);
		} else {
			ExtendableBuiltin.__proto__ = cls;
		}
	
		return ExtendableBuiltin;
	}
	
	function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return right[Symbol.hasInstance](left); } else { return _instanceof(left, right); } }
	
	function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var $$set = Symbol('$$set');
	var $$addSubject = Symbol('$$addSubject');
	var $$deleteSubject = Symbol('$$deleteSubject');
	var $$valueObservable = Symbol('$$valueObservable');
	var $$disableNextReplay = Symbol('$$disableNextReplay');
	
	var AddReplaySubject = function (_Subject) {
		_inherits(AddReplaySubject, _Subject);
	
		function AddReplaySubject(initialSet) {
			_classCallCheck(this, AddReplaySubject);
	
			var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(AddReplaySubject).call(this));
	
			_this._setReference = initialSet;
			return _this;
		}
	
		_createClass(AddReplaySubject, [{
			key: "normalSubscribe",
			value: function normalSubscribe() {
				this[$$disableNextReplay] = true;
				return this.subscribe.apply(this, arguments);
			}
			// noinspection JSDuplicatedDeclaration
	
		}, {
			key: "_subscribe",
			value: function _subscribe(subscriber) {
				var subscription = _get(Object.getPrototypeOf(AddReplaySubject.prototype), "_subscribe", this).call(this, subscriber);
				if (subscription && !subscription.isUnsubscribed && !this[$$disableNextReplay]) {
					this._setReference.forEach(subscriber.next.bind(subscriber));
				}
				this[$$disableNextReplay] = false;
				return subscription;
			}
		}]);
	
		return AddReplaySubject;
	}(_Subject2.Subject);
	
	var ObservableSet = function (_extendableBuiltin2) {
		_inherits(ObservableSet, _extendableBuiltin2);
	
		function ObservableSet() {
			var initialContent = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
	
			_classCallCheck(this, ObservableSet);
	
			var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(ObservableSet).call(this));
	
			_this2[$$addSubject] = new AddReplaySubject(_this2);
			_this2[$$addSubject].normalSubscribe(_this2.add.bind(_this2));
	
			_this2[$$deleteSubject] = new _Subject2.Subject();
			_this2[$$deleteSubject].subscribe(_this2.delete.bind(_this2));
	
			initialContent.forEach(_this2.add.bind(_this2));
	
			var valueSubject = new _BehaviorSubject.BehaviorSubject(new Set(_this2));
			_this2[$$addSubject].normalSubscribe(function () {
				valueSubject.next(new Set(_this2));
			});
			_this2[$$deleteSubject].subscribe(function () {
				valueSubject.next(new Set(_this2));
			});
			_this2[$$valueObservable] = valueSubject.asObservable();
			return _this2;
		}
	
		_createClass(ObservableSet, [{
			key: "e",
			value: function e(op) {
				switch (op) {
					case 'add':
						{
							return this[$$addSubject];
						}
					case 'delete':
						{
							return this[$$deleteSubject];
						}
					default:
						(0, _misc.constraint)(false, (0, _misc.humanMsg)(_templateObject, op));
				}
			}
		}, {
			key: "p",
			value: function p(name) {
				switch (name) {
					case 'value':
						{
							return this[$$valueObservable];
						}
					default:
						(0, _misc.constraint)(false, (0, _misc.humanMsg)(_templateObject2, name));
				}
			}
		}, {
			key: "add",
			value: function add(obj) {
				if (!this.has(obj)) {
					_get(Object.getPrototypeOf(ObservableSet.prototype), "add", this).call(this, obj);
					this.e('add').next(obj);
				}
				return this;
			}
		}, {
			key: "delete",
			value: function _delete(obj) {
				if (this.has(obj)) {
					_get(Object.getPrototypeOf(ObservableSet.prototype), "delete", this).call(this, obj);
					this.e('delete').next(obj);
					return true;
				}
				return false;
			}
		}, {
			key: "clear",
			value: function clear() {
				var _iteratorNormalCompletion = true;
				var _didIteratorError = false;
				var _iteratorError = undefined;
	
				try {
					for (var _iterator = this[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
						var value = _step.value;
						this.delete(value);
					}
				} catch (err) {
					_didIteratorError = true;
					_iteratorError = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion && _iterator.return) {
							_iterator.return();
						}
					} finally {
						if (_didIteratorError) {
							throw _iteratorError;
						}
					}
				}
	
				return this;
			}
		}]);
	
		return ObservableSet;
	}(_extendableBuiltin(Set));
	
	exports.default = ObservableSet;
	function setEquals(setA, setB) {
		setA = new Set(setA);
		setB = new Set(setB);
		if (setA.size !== setB.size) return false;
		var _iteratorNormalCompletion2 = true;
		var _didIteratorError2 = false;
		var _iteratorError2 = undefined;
	
		try {
			for (var _iterator2 = setA[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
				var a = _step2.value;
				if (!setB.has(a)) return false;
			}
		} catch (err) {
			_didIteratorError2 = true;
			_iteratorError2 = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion2 && _iterator2.return) {
					_iterator2.return();
				}
			} finally {
				if (_didIteratorError2) {
					throw _iteratorError2;
				}
			}
		}
	
		return true;
	}
	
	function copySetContent(reference, newContent) {
		newContent = new Set(newContent);
		var _iteratorNormalCompletion3 = true;
		var _didIteratorError3 = false;
		var _iteratorError3 = undefined;
	
		try {
			for (var _iterator3 = reference[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
				var e = _step3.value;
	
				if (!newContent.has(e)) {
					reference.delete(e);
				}
			}
		} catch (err) {
			_didIteratorError3 = true;
			_iteratorError3 = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion3 && _iterator3.return) {
					_iterator3.return();
				}
			} finally {
				if (_didIteratorError3) {
					throw _iteratorError3;
				}
			}
		}
	
		var _iteratorNormalCompletion4 = true;
		var _didIteratorError4 = false;
		var _iteratorError4 = undefined;
	
		try {
			for (var _iterator4 = newContent[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
				var _e = _step4.value;
	
				if (!reference.has(_e)) {
					reference.add(_e);
				}
			}
		} catch (err) {
			_didIteratorError4 = true;
			_iteratorError4 = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion4 && _iterator4.return) {
					_iterator4.return();
				}
			} finally {
				if (_didIteratorError4) {
					throw _iteratorError4;
				}
			}
		}
	}

/***/ },
/* 97 */,
/* 98 */,
/* 99 */,
/* 100 */,
/* 101 */,
/* 102 */,
/* 103 */,
/* 104 */,
/* 105 */,
/* 106 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var fn = __webpack_require__(392);
	
	module.exports = function size() {
	  return fn.apply(undefined, [this].concat(Array.prototype.slice.apply(arguments)));
	};


/***/ },
/* 107 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var fn = __webpack_require__(170);
	
	module.exports = function values() {
	  return fn.apply(undefined, [this].concat(Array.prototype.slice.apply(arguments)));
	};


/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(40),
	    root = __webpack_require__(16);
	
	/* Built-in method references that are verified to be native. */
	var Map = getNative(root, 'Map');
	
	module.exports = Map;


/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

	var mapCacheClear = __webpack_require__(345),
	    mapCacheDelete = __webpack_require__(346),
	    mapCacheGet = __webpack_require__(347),
	    mapCacheHas = __webpack_require__(348),
	    mapCacheSet = __webpack_require__(349);
	
	/**
	 * Creates a map cache object to store key-value pairs.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function MapCache(entries) {
	  var index = -1,
	      length = entries ? entries.length : 0;
	
	  this.clear();
	  while (++index < length) {
	    var entry = entries[index];
	    this.set(entry[0], entry[1]);
	  }
	}
	
	// Add methods to `MapCache`.
	MapCache.prototype.clear = mapCacheClear;
	MapCache.prototype['delete'] = mapCacheDelete;
	MapCache.prototype.get = mapCacheGet;
	MapCache.prototype.has = mapCacheHas;
	MapCache.prototype.set = mapCacheSet;
	
	module.exports = MapCache;


/***/ },
/* 110 */
/***/ function(module, exports, __webpack_require__) {

	var ListCache = __webpack_require__(69),
	    stackClear = __webpack_require__(354),
	    stackDelete = __webpack_require__(355),
	    stackGet = __webpack_require__(356),
	    stackHas = __webpack_require__(357),
	    stackSet = __webpack_require__(358);
	
	/**
	 * Creates a stack cache object to store key-value pairs.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function Stack(entries) {
	  this.__data__ = new ListCache(entries);
	}
	
	// Add methods to `Stack`.
	Stack.prototype.clear = stackClear;
	Stack.prototype['delete'] = stackDelete;
	Stack.prototype.get = stackGet;
	Stack.prototype.has = stackHas;
	Stack.prototype.set = stackSet;
	
	module.exports = Stack;


/***/ },
/* 111 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsEqualDeep = __webpack_require__(283),
	    isObject = __webpack_require__(11),
	    isObjectLike = __webpack_require__(17);
	
	/**
	 * The base implementation of `_.isEqual` which supports partial comparisons
	 * and tracks traversed objects.
	 *
	 * @private
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @param {Function} [customizer] The function to customize comparisons.
	 * @param {boolean} [bitmask] The bitmask of comparison flags.
	 *  The bitmask may be composed of the following flags:
	 *     1 - Unordered comparison
	 *     2 - Partial comparison
	 * @param {Object} [stack] Tracks traversed `value` and `other` objects.
	 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	 */
	function baseIsEqual(value, other, customizer, bitmask, stack) {
	  if (value === other) {
	    return true;
	  }
	  if (value == null || other == null || (!isObject(value) && !isObjectLike(other))) {
	    return value !== value && other !== other;
	  }
	  return baseIsEqualDeep(value, other, baseIsEqual, customizer, bitmask, stack);
	}
	
	module.exports = baseIsEqual;


/***/ },
/* 112 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.property` without support for deep paths.
	 *
	 * @private
	 * @param {string} key The key of the property to get.
	 * @returns {Function} Returns the new accessor function.
	 */
	function baseProperty(key) {
	  return function(object) {
	    return object == null ? undefined : object[key];
	  };
	}
	
	module.exports = baseProperty;


/***/ },
/* 113 */
/***/ function(module, exports, __webpack_require__) {

	var isArray = __webpack_require__(8),
	    stringToPath = __webpack_require__(361);
	
	/**
	 * Casts `value` to a path array if it's not one.
	 *
	 * @private
	 * @param {*} value The value to inspect.
	 * @returns {Array} Returns the cast property path array.
	 */
	function castPath(value) {
	  return isArray(value) ? value : stringToPath(value);
	}
	
	module.exports = castPath;


/***/ },
/* 114 */
/***/ function(module, exports, __webpack_require__) {

	var Uint8Array = __webpack_require__(147);
	
	/**
	 * Creates a clone of `arrayBuffer`.
	 *
	 * @private
	 * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
	 * @returns {ArrayBuffer} Returns the cloned array buffer.
	 */
	function cloneArrayBuffer(arrayBuffer) {
	  var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
	  new Uint8Array(result).set(new Uint8Array(arrayBuffer));
	  return result;
	}
	
	module.exports = cloneArrayBuffer;


/***/ },
/* 115 */
/***/ function(module, exports, __webpack_require__) {

	var baseRest = __webpack_require__(39),
	    isIterateeCall = __webpack_require__(336);
	
	/**
	 * Creates a function like `_.assign`.
	 *
	 * @private
	 * @param {Function} assigner The function to assign values.
	 * @returns {Function} Returns the new assigner function.
	 */
	function createAssigner(assigner) {
	  return baseRest(function(object, sources) {
	    var index = -1,
	        length = sources.length,
	        customizer = length > 1 ? sources[length - 1] : undefined,
	        guard = length > 2 ? sources[2] : undefined;
	
	    customizer = (assigner.length > 3 && typeof customizer == 'function')
	      ? (length--, customizer)
	      : undefined;
	
	    if (guard && isIterateeCall(sources[0], sources[1], guard)) {
	      customizer = length < 3 ? undefined : customizer;
	      length = 1;
	    }
	    object = Object(object);
	    while (++index < length) {
	      var source = sources[index];
	      if (source) {
	        assigner(object, source, index, customizer);
	      }
	    }
	    return object;
	  });
	}
	
	module.exports = createAssigner;


/***/ },
/* 116 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is a host object in IE < 9.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
	 */
	function isHostObject(value) {
	  // Many host objects are `Object` objects that can coerce to strings
	  // despite having improperly defined `toString` methods.
	  var result = false;
	  if (value != null && typeof value.toString != 'function') {
	    try {
	      result = !!(value + '');
	    } catch (e) {}
	  }
	  return result;
	}
	
	module.exports = isHostObject;


/***/ },
/* 117 */
/***/ function(module, exports) {

	/**
	 * Converts `map` to its key-value pairs.
	 *
	 * @private
	 * @param {Object} map The map to convert.
	 * @returns {Array} Returns the key-value pairs.
	 */
	function mapToArray(map) {
	  var index = -1,
	      result = Array(map.size);
	
	  map.forEach(function(value, key) {
	    result[++index] = [key, value];
	  });
	  return result;
	}
	
	module.exports = mapToArray;


/***/ },
/* 118 */
/***/ function(module, exports) {

	/**
	 * Creates a function that invokes `func` with its first argument transformed.
	 *
	 * @private
	 * @param {Function} func The function to wrap.
	 * @param {Function} transform The argument transform.
	 * @returns {Function} Returns the new function.
	 */
	function overArg(func, transform) {
	  return function(arg) {
	    return func(transform(arg));
	  };
	}
	
	module.exports = overArg;


/***/ },
/* 119 */
/***/ function(module, exports, __webpack_require__) {

	var baseGet = __webpack_require__(151);
	
	/**
	 * Gets the value at `path` of `object`. If the resolved value is
	 * `undefined`, the `defaultValue` is returned in its place.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.7.0
	 * @category Object
	 * @param {Object} object The object to query.
	 * @param {Array|string} path The path of the property to get.
	 * @param {*} [defaultValue] The value returned for `undefined` resolved values.
	 * @returns {*} Returns the resolved value.
	 * @example
	 *
	 * var object = { 'a': [{ 'b': { 'c': 3 } }] };
	 *
	 * _.get(object, 'a[0].b.c');
	 * // => 3
	 *
	 * _.get(object, ['a', '0', 'b', 'c']);
	 * // => 3
	 *
	 * _.get(object, 'a.b.c', 'default');
	 * // => 'default'
	 */
	function get(object, path, defaultValue) {
	  var result = object == null ? undefined : baseGet(object, path);
	  return result === undefined ? defaultValue : result;
	}
	
	module.exports = get;


/***/ },
/* 120 */
/***/ function(module, exports, __webpack_require__) {

	var isArrayLikeObject = __webpack_require__(121);
	
	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]';
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;
	
	/** Built-in value references. */
	var propertyIsEnumerable = objectProto.propertyIsEnumerable;
	
	/**
	 * Checks if `value` is likely an `arguments` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
	 *  else `false`.
	 * @example
	 *
	 * _.isArguments(function() { return arguments; }());
	 * // => true
	 *
	 * _.isArguments([1, 2, 3]);
	 * // => false
	 */
	function isArguments(value) {
	  // Safari 8.1 incorrectly makes `arguments.callee` enumerable in strict mode.
	  return isArrayLikeObject(value) && hasOwnProperty.call(value, 'callee') &&
	    (!propertyIsEnumerable.call(value, 'callee') || objectToString.call(value) == argsTag);
	}
	
	module.exports = isArguments;


/***/ },
/* 121 */
/***/ function(module, exports, __webpack_require__) {

	var isArrayLike = __webpack_require__(22),
	    isObjectLike = __webpack_require__(17);
	
	/**
	 * This method is like `_.isArrayLike` except that it also checks if `value`
	 * is an object.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an array-like object,
	 *  else `false`.
	 * @example
	 *
	 * _.isArrayLikeObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isArrayLikeObject(document.body.children);
	 * // => true
	 *
	 * _.isArrayLikeObject('abc');
	 * // => false
	 *
	 * _.isArrayLikeObject(_.noop);
	 * // => false
	 */
	function isArrayLikeObject(value) {
	  return isObjectLike(value) && isArrayLike(value);
	}
	
	module.exports = isArrayLikeObject;


/***/ },
/* 122 */
/***/ function(module, exports, __webpack_require__) {

	var baseToString = __webpack_require__(154);
	
	/**
	 * Converts `value` to a string. An empty string is returned for `null`
	 * and `undefined` values. The sign of `-0` is preserved.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to process.
	 * @returns {string} Returns the string.
	 * @example
	 *
	 * _.toString(null);
	 * // => ''
	 *
	 * _.toString(-0);
	 * // => '-0'
	 *
	 * _.toString([1, 2, 3]);
	 * // => '1,2,3'
	 */
	function toString(value) {
	  return value == null ? '' : baseToString(value);
	}
	
	module.exports = toString;


/***/ },
/* 123 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subject_1 = __webpack_require__(81);
	var throwError_1 = __webpack_require__(425);
	var ObjectUnsubscribedError_1 = __webpack_require__(175);
	/**
	 * @class BehaviorSubject<T>
	 */
	var BehaviorSubject = (function (_super) {
	    __extends(BehaviorSubject, _super);
	    function BehaviorSubject(_value) {
	        _super.call(this);
	        this._value = _value;
	    }
	    BehaviorSubject.prototype.getValue = function () {
	        if (this.hasError) {
	            throwError_1.throwError(this.thrownError);
	        }
	        else if (this.isUnsubscribed) {
	            throwError_1.throwError(new ObjectUnsubscribedError_1.ObjectUnsubscribedError());
	        }
	        else {
	            return this._value;
	        }
	    };
	    Object.defineProperty(BehaviorSubject.prototype, "value", {
	        get: function () {
	            return this.getValue();
	        },
	        enumerable: true,
	        configurable: true
	    });
	    BehaviorSubject.prototype._subscribe = function (subscriber) {
	        var subscription = _super.prototype._subscribe.call(this, subscriber);
	        if (subscription && !subscription.isUnsubscribed) {
	            subscriber.next(this._value);
	        }
	        return subscription;
	    };
	    BehaviorSubject.prototype.next = function (value) {
	        _super.prototype.next.call(this, this._value = value);
	    };
	    return BehaviorSubject;
	}(Subject_1.Subject));
	exports.BehaviorSubject = BehaviorSubject;
	//# sourceMappingURL=BehaviorSubject.js.map

/***/ },
/* 124 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var isArray_1 = __webpack_require__(86);
	var isObject_1 = __webpack_require__(422);
	var isFunction_1 = __webpack_require__(176);
	var tryCatch_1 = __webpack_require__(177);
	var errorObject_1 = __webpack_require__(127);
	var UnsubscriptionError_1 = __webpack_require__(421);
	/**
	 * Represents a disposable resource, such as the execution of an Observable. A
	 * Subscription has one important method, `unsubscribe`, that takes no argument
	 * and just disposes the resource held by the subscription.
	 *
	 * Additionally, subscriptions may be grouped together through the `add()`
	 * method, which will attach a child Subscription to the current Subscription.
	 * When a Subscription is unsubscribed, all its children (and its grandchildren)
	 * will be unsubscribed as well.
	 *
	 * @class Subscription
	 */
	var Subscription = (function () {
	    /**
	     * @param {function(): void} [unsubscribe] A function describing how to
	     * perform the disposal of resources when the `unsubscribe` method is called.
	     */
	    function Subscription(unsubscribe) {
	        /**
	         * A flag to indicate whether this Subscription has already been unsubscribed.
	         * @type {boolean}
	         */
	        this.isUnsubscribed = false;
	        if (unsubscribe) {
	            this._unsubscribe = unsubscribe;
	        }
	    }
	    /**
	     * Disposes the resources held by the subscription. May, for instance, cancel
	     * an ongoing Observable execution or cancel any other type of work that
	     * started when the Subscription was created.
	     * @return {void}
	     */
	    Subscription.prototype.unsubscribe = function () {
	        var hasErrors = false;
	        var errors;
	        if (this.isUnsubscribed) {
	            return;
	        }
	        this.isUnsubscribed = true;
	        var _a = this, _unsubscribe = _a._unsubscribe, _subscriptions = _a._subscriptions;
	        this._subscriptions = null;
	        if (isFunction_1.isFunction(_unsubscribe)) {
	            var trial = tryCatch_1.tryCatch(_unsubscribe).call(this);
	            if (trial === errorObject_1.errorObject) {
	                hasErrors = true;
	                (errors = errors || []).push(errorObject_1.errorObject.e);
	            }
	        }
	        if (isArray_1.isArray(_subscriptions)) {
	            var index = -1;
	            var len = _subscriptions.length;
	            while (++index < len) {
	                var sub = _subscriptions[index];
	                if (isObject_1.isObject(sub)) {
	                    var trial = tryCatch_1.tryCatch(sub.unsubscribe).call(sub);
	                    if (trial === errorObject_1.errorObject) {
	                        hasErrors = true;
	                        errors = errors || [];
	                        var err = errorObject_1.errorObject.e;
	                        if (err instanceof UnsubscriptionError_1.UnsubscriptionError) {
	                            errors = errors.concat(err.errors);
	                        }
	                        else {
	                            errors.push(err);
	                        }
	                    }
	                }
	            }
	        }
	        if (hasErrors) {
	            throw new UnsubscriptionError_1.UnsubscriptionError(errors);
	        }
	    };
	    /**
	     * Adds a tear down to be called during the unsubscribe() of this
	     * Subscription.
	     *
	     * If the tear down being added is a subscription that is already
	     * unsubscribed, is the same reference `add` is being called on, or is
	     * `Subscription.EMPTY`, it will not be added.
	     *
	     * If this subscription is already in an `isUnsubscribed` state, the passed
	     * tear down logic will be executed immediately.
	     *
	     * @param {TeardownLogic} teardown The additional logic to execute on
	     * teardown.
	     * @return {Subscription} Returns the Subscription used or created to be
	     * added to the inner subscriptions list. This Subscription can be used with
	     * `remove()` to remove the passed teardown logic from the inner subscriptions
	     * list.
	     */
	    Subscription.prototype.add = function (teardown) {
	        if (!teardown || (teardown === this) || (teardown === Subscription.EMPTY)) {
	            return;
	        }
	        var sub = teardown;
	        switch (typeof teardown) {
	            case 'function':
	                sub = new Subscription(teardown);
	            case 'object':
	                if (sub.isUnsubscribed || typeof sub.unsubscribe !== 'function') {
	                    break;
	                }
	                else if (this.isUnsubscribed) {
	                    sub.unsubscribe();
	                }
	                else {
	                    (this._subscriptions || (this._subscriptions = [])).push(sub);
	                }
	                break;
	            default:
	                throw new Error('Unrecognized teardown ' + teardown + ' added to Subscription.');
	        }
	        return sub;
	    };
	    /**
	     * Removes a Subscription from the internal list of subscriptions that will
	     * unsubscribe during the unsubscribe process of this Subscription.
	     * @param {Subscription} subscription The subscription to remove.
	     * @return {void}
	     */
	    Subscription.prototype.remove = function (subscription) {
	        // HACK: This might be redundant because of the logic in `add()`
	        if (subscription == null || (subscription === this) || (subscription === Subscription.EMPTY)) {
	            return;
	        }
	        var subscriptions = this._subscriptions;
	        if (subscriptions) {
	            var subscriptionIndex = subscriptions.indexOf(subscription);
	            if (subscriptionIndex !== -1) {
	                subscriptions.splice(subscriptionIndex, 1);
	            }
	        }
	    };
	    Subscription.EMPTY = (function (empty) {
	        empty.isUnsubscribed = true;
	        return empty;
	    }(new Subscription()));
	    return Subscription;
	}());
	exports.Subscription = Subscription;
	//# sourceMappingURL=Subscription.js.map

/***/ },
/* 125 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Observable_1 = __webpack_require__(23);
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @extends {Ignored}
	 * @hide true
	 */
	var EmptyObservable = (function (_super) {
	    __extends(EmptyObservable, _super);
	    function EmptyObservable(scheduler) {
	        _super.call(this);
	        this.scheduler = scheduler;
	    }
	    /**
	     * Creates an Observable that emits no items to the Observer and immediately
	     * emits a complete notification.
	     *
	     * <span class="informal">Just emits 'complete', and nothing else.
	     * </span>
	     *
	     * <img src="./img/empty.png" width="100%">
	     *
	     * This static operator is useful for creating a simple Observable that only
	     * emits the complete notification. It can be used for composing with other
	     * Observables, such as in a {@link mergeMap}.
	     *
	     * @example <caption>Emit the number 7, then complete.</caption>
	     * var result = Rx.Observable.empty().startWith(7);
	     * result.subscribe(x => console.log(x));
	     *
	     * @example <caption>Map and flatten only odd numbers to the sequence 'a', 'b', 'c'</caption>
	     * var interval = Rx.Observable.interval(1000);
	     * var result = interval.mergeMap(x =>
	     *   x % 2 === 1 ? Rx.Observable.of('a', 'b', 'c') : Rx.Observable.empty()
	     * );
	     * result.subscribe(x => console.log(x));
	     *
	     * @see {@link create}
	     * @see {@link never}
	     * @see {@link of}
	     * @see {@link throw}
	     *
	     * @param {Scheduler} [scheduler] A {@link Scheduler} to use for scheduling
	     * the emission of the complete notification.
	     * @return {Observable} An "empty" Observable: emits only the complete
	     * notification.
	     * @static true
	     * @name empty
	     * @owner Observable
	     */
	    EmptyObservable.create = function (scheduler) {
	        return new EmptyObservable(scheduler);
	    };
	    EmptyObservable.dispatch = function (arg) {
	        var subscriber = arg.subscriber;
	        subscriber.complete();
	    };
	    EmptyObservable.prototype._subscribe = function (subscriber) {
	        var scheduler = this.scheduler;
	        if (scheduler) {
	            return scheduler.schedule(EmptyObservable.dispatch, 0, { subscriber: subscriber });
	        }
	        else {
	            subscriber.complete();
	        }
	    };
	    return EmptyObservable;
	}(Observable_1.Observable));
	exports.EmptyObservable = EmptyObservable;
	//# sourceMappingURL=EmptyObservable.js.map

/***/ },
/* 126 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var root_1 = __webpack_require__(88);
	var Symbol = root_1.root.Symbol;
	exports.$$rxSubscriber = (typeof Symbol === 'function' && typeof Symbol.for === 'function') ?
	    Symbol.for('rxSubscriber') : '@@rxSubscriber';
	//# sourceMappingURL=rxSubscriber.js.map

/***/ },
/* 127 */
/***/ function(module, exports) {

	"use strict";
	// typeof any so that it we don't have to cast when comparing a result to the error object
	exports.errorObject = { e: {} };
	//# sourceMappingURL=errorObject.js.map

/***/ },
/* 128 */
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },
/* 129 */,
/* 130 */,
/* 131 */,
/* 132 */,
/* 133 */,
/* 134 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Field = undefined;
	
	var _Field = __webpack_require__(28);
	
	Object.defineProperty(exports, 'Field', {
	  enumerable: true,
	  get: function get() {
	    return _Field.Field;
	  }
	});
	
	__webpack_require__(193);
	
	__webpack_require__(198);
	
	__webpack_require__(195);
	
	__webpack_require__(197);
	
	__webpack_require__(194);
	
	__webpack_require__(196);

/***/ },
/* 135 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.flag = exports.event = exports.property = exports.default = undefined;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _dec, _desc, _value, _class;
	
	var _includes = __webpack_require__(245);
	
	var _includes2 = _interopRequireDefault(_includes);
	
	var _isArray = __webpack_require__(141);
	
	var _isArray2 = _interopRequireDefault(_isArray);
	
	var _set = __webpack_require__(253);
	
	var _set2 = _interopRequireDefault(_set);
	
	var _entries = __webpack_require__(21);
	
	var _entries2 = _interopRequireDefault(_entries);
	
	var _isFunction = __webpack_require__(67);
	
	var _isFunction2 = _interopRequireDefault(_isFunction);
	
	var _isBoolean2 = __webpack_require__(374);
	
	var _isBoolean3 = _interopRequireDefault(_isBoolean2);
	
	var _misc = __webpack_require__(3);
	
	var _Subject = __webpack_require__(81);
	
	var _BehaviorSubject = __webpack_require__(123);
	
	var _of = __webpack_require__(411);
	
	var _never = __webpack_require__(410);
	
	var _combineLatest = __webpack_require__(172);
	
	var _distinctUntilChanged = __webpack_require__(413);
	
	var _filter = __webpack_require__(25);
	
	var _takeUntil = __webpack_require__(174);
	
	var _skip = __webpack_require__(416);
	
	var _map = __webpack_require__(82);
	
	var _withLatestFrom = __webpack_require__(418);
	
	var _switchMap = __webpack_require__(85);
	
	__webpack_require__(24);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return right[Symbol.hasInstance](left); } else { return _instanceof(left, right); } }
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	function _objectDestructuringEmpty(obj) { if (obj == null) throw new TypeError("Cannot destructure undefined"); }
	
	function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
		var desc = {};
		Object['ke' + 'ys'](descriptor).forEach(function (key) {
			desc[key] = descriptor[key];
		});
		desc.enumerable = !!desc.enumerable;
		desc.configurable = !!desc.configurable;
	
		if ('value' in desc || desc.initializer) {
			desc.writable = true;
		}
	
		desc = decorators.slice().reverse().reduce(function (desc, decorator) {
			return decorator(target, property, desc) || desc;
		}, desc);
	
		if (context && desc.initializer !== void 0) {
			desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
			desc.initializer = undefined;
		}
	
		if (desc.initializer === void 0) {
			Object['define' + 'Property'](target, property, desc);
			desc = null;
		}
	
		return desc;
	}
	
	var $$events = Symbol('$$events');
	var $$properties = Symbol('$$properties');
	var $$settableProperties = Symbol('$$settableProperties');
	var $$initialize = Symbol('$$initialize');
	var $$takeUntil = Symbol('$$takeUntil');
	var $$filterBy = Symbol('$$filterBy');
	var $$currentValues = Symbol('$$currentValues');
	
	/**
	 * Use this as a subclass (or just mix it in) to provide support for
	 * events and observable properties through Kefir.js.
	 *
	 * @export
	 * @class ValueTracker
	 */
	var ValueTracker = (_dec = (0, _misc.args)('s?a?a?f?'), (_class = function () {
		_createClass(ValueTracker, [{
			key: $$initialize,
			value: function value() {
				if (this[$$events]) {
					return;
				}
				this[$$events] = {};
				this[$$properties] = {};
				this[$$settableProperties] = {};
				this[$$currentValues] = {};
	
				/* add the events and properties added with ES7 annotations */
				var _iteratorNormalCompletion = true;
				var _didIteratorError = false;
				var _iteratorError = undefined;
	
				try {
					for (var _iterator = (_context = this.constructor[$$events] || {}, _entries2.default).call(_context)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
						var _context;
	
						var _step$value = _slicedToArray(_step.value, 2);
	
						var key = _step$value[0];
						var options = _step$value[1];
	
						this.newEvent(key, options);
					}
				} catch (err) {
					_didIteratorError = true;
					_iteratorError = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion && _iterator.return) {
							_iterator.return();
						}
					} finally {
						if (_didIteratorError) {
							throw _iteratorError;
						}
					}
				}
	
				var _iteratorNormalCompletion2 = true;
				var _didIteratorError2 = false;
				var _iteratorError2 = undefined;
	
				try {
					for (var _iterator2 = (_context2 = this.constructor[$$properties] || {}, _entries2.default).call(_context2)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
						var _context2;
	
						var _step2$value = _slicedToArray(_step2.value, 2);
	
						var key = _step2$value[0];
						var options = _step2$value[1];
	
						this.newProperty(key, options);
					}
				} catch (err) {
					_didIteratorError2 = true;
					_iteratorError2 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion2 && _iterator2.return) {
							_iterator2.return();
						}
					} finally {
						if (_didIteratorError2) {
							throw _iteratorError2;
						}
					}
				}
			}
		}]);
	
		function ValueTracker() {
			_classCallCheck(this, ValueTracker);
	
			this[$$takeUntil] = (0, _never.never)();
			this[$$filterBy] = function () {
				return true;
			};
		}
	
		_createClass(ValueTracker, [{
			key: 'setValueTrackerOptions',
			value: function setValueTrackerOptions(_ref) {
				var _ref$takeUntil = _ref.takeUntil;
				var takeUntil = _ref$takeUntil === undefined ? (0, _never.never)() : _ref$takeUntil;
				var _ref$filterBy = _ref.filterBy;
				var filterBy = _ref$filterBy === undefined ? function () {
					return true;
				} : _ref$filterBy;
	
				this[$$takeUntil] = takeUntil;
				this[$$filterBy] = filterBy;
				this[$$initialize]();
			}
	
			/**
	   * Declares a new event stream for this object.
	   *
	   * @public
	   * @method
	   * @param  {String} name - the name of the event, used to trigger or subscribe to it
	   * @return {Subject} - the created event stream
	   */
	
		}, {
			key: 'newEvent',
			value: function newEvent(name) {
				var _context3;
	
				var _ref2 = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
				_objectDestructuringEmpty(_ref2);
	
				this[$$initialize]();
	
				/* is the event name already taken? */
	
	
				this[$$events][name] = (_context3 = (_context3 = new _Subject.Subject(), _takeUntil.takeUntil).call(_context3, this[$$takeUntil]),
				// ::filter              (this[$$filterBy] )
				_filter.filter).call(_context3, this[$$filterBy]);
	
				return this[$$events][name];
			}
	
			/**
	   * This method defines a new property on this object.
	   *
	   * @public
	   * @method
	   * @param  {String}                   name            - the name of the new property
	   * @param  {Boolean}                 [readonly=false] - whether the value can be manually set
	   * @param  {function(*,*):Boolean}   [isEqual]        - a predicate function by which to test for duplicate values
	   * @param  {function(*):Boolean}     [isValid]        - a predicate function to validate a given value
	   * @param  {function(*):*}           [transform]      - a function to transform any input value
	   * @param  {*}                       [initial]        - the initial value of this property
	   *
	   * @return {BehaviorSubject} - the property associated with the given name
	   */
	
		}, {
			key: 'newProperty',
			value: function newProperty(name) {
				var _context4,
				    _this = this;
	
				var _ref3 = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
				var _ref3$readonly = _ref3.readonly;
				var readonly = _ref3$readonly === undefined ? false : _ref3$readonly;
				var _ref3$isEqual = _ref3.isEqual;
				var isEqual = _ref3$isEqual === undefined ? function (a, b) {
					return a === b;
				} : _ref3$isEqual;
				var _ref3$isValid = _ref3.isValid;
				var isValid = _ref3$isValid === undefined ? function () {
					return true;
				} : _ref3$isValid;
				var _ref3$transform = _ref3.transform;
				var transform = _ref3$transform === undefined ? function (v) {
					return v;
				} : _ref3$transform;
				var initial = _ref3.initial;
	
				this[$$initialize]();
	
				/* is the property name already taken? */
	
	
				/* if isValid is an array, check for inclusion */
				if ((_context4 = isValid, _isArray2.default).call(_context4)) {
					var _context5;
	
					isValid = (_context5 = isValid, _includes2.default).bind(_context5);
				}
	
				/* if initial is a function, call it to get the initial value */
				if ((_context4 = initial, _isFunction2.default).call(_context4)) {
					initial = initial.call(this);
				}
	
				/* define the bus which manages the property */
				var subject = this[$$settableProperties][name] = (_context4 = (_context4 = (_context4 = new _BehaviorSubject.BehaviorSubject(initial), _filter.filter).call(_context4, isValid.bind(this)), _map.map).call(_context4, transform.bind(this))
				// ::takeUntil           (this[$$takeUntil])
				, _distinctUntilChanged.distinctUntilChanged).call(_context4, isEqual.bind(this));
				this[$$properties][name] = readonly ? subject.asObservable() : subject;
	
				/* keep track of current value */
				this[$$properties][name].subscribe(function (v) {
					_this[$$currentValues][name] = v;
				});
	
				/* create event version of the property */
				this[$$events][name] = (_context4 = subject.asObservable(), _skip.skip).call(_context4, 1); // skip 'current value' on subscribe
	
				/* return property */
				return this[$$settableProperties][name];
			}
	
			/**
	   * Retrieve an event stream by name. If the name of a property is given, a stream
	   * based on changes to that property is returned.
	   *
	   * @public
	   * @method
	   * @param  {String}  name - the name of the event stream to retrieve
	   * @return {Observable} - the event stream associated with the given name
	   */
	
		}, {
			key: 'e',
			value: function e(name) {
				this[$$initialize]();
				return this[$$events][name] || (0, _never.never)();
			}
	
			/**
	   * Retrieve a property (or multiple properties combined) by name.
	   *
	   * @public
	   * @method
	   * @param  {String?}   name                - the name of the property to retrieve (choose name or deps)
	   * @param  {Array?}    deps                - a list of active dependencies for a derived property
	   * @param  {Array?}    optionalPassiveDeps - an optional list of passive dependencies for a derived property
	   * @param  {Function?} optionalTransformer - an optional function to map the dependencies to a new value for the derived property
	   * @return {BehaviorSubject | Observable} - the property associated with the given name or an observable of combined properties
	   */
	
		}, {
			key: 'p',
			value: function p(name, deps) {
				var _this2 = this;
	
				var optionalPassiveDeps = arguments.length <= 2 || arguments[2] === undefined ? [] : arguments[2];
				var optionalTransformer = arguments.length <= 3 || arguments[3] === undefined ? function () {
					for (var _len = arguments.length, a = Array(_len), _key = 0; _key < _len; _key++) {
						a[_key] = arguments[_key];
					}
	
					return a;
				} : arguments[3];
	
				this[$$initialize]();
				if (deps) {
					var _context6, _ref4;
	
					return (_ref4 = (_context6 = _combineLatest.combineLatest.apply(undefined, _toConsumableArray(deps.map(this.p.bind(this)))), _withLatestFrom.withLatestFrom)).call.apply(_ref4, [_context6].concat(_toConsumableArray(optionalPassiveDeps.map(this.p.bind(this))), [function (active) {
						for (var _len2 = arguments.length, passive = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
							passive[_key2 - 1] = arguments[_key2];
						}
	
						return optionalTransformer.apply(undefined, _toConsumableArray(active).concat(passive));
					}]));
				} else if (name) {
					var _ret = function () {
						var head = name,
						    sep = void 0,
						    tail = void 0;
						var match = name.match(/^(.+?)(\??\.)(.+)$/);
						// console.log('(p-regex)', name, match); // TODO: remove
						if (match) {
							var _ret2 = function () {
								var _context7;
	
								var _match = _slicedToArray(match, 4);
	
								head = _match[1];
								sep = _match[2];
								tail = _match[3];
	
								var loose = sep === '?.';
								return {
									v: {
										v: (_context7 = _this2.p(head), _switchMap.switchMap).call(_context7, function (obj) {
											if (!obj) {
												if (loose) {
													return (0, _of.of)(null);
												} else {
													return (0, _never.never)();
												}
											}
											// TODO: allow simple property chaining (even if not observables)
											return obj.p(tail);
										})
									}
								};
							}();
	
							if ((typeof _ret2 === 'undefined' ? 'undefined' : _typeof(_ret2)) === "object") return _ret2.v;
						} else {
							return {
								v: _this2[$$properties][name]
							};
						}
	
						// const [head, ...tail] = name.split('.');
						// if (tail.length > 0) {
						// 	return this.p(head)::switchMap((obj) => {
						// 		if (!obj) { return never() }
						// 		assert(obj.p::isFunction(), humanMsg`
						// 			The '${head}' property did not return
						// 			a ValueTracker-based object,
						// 			so it cannot be chained.
						// 		`);
						// 		return obj.p(tail.join('.'));
						// 	});
						// } else {
						// 	assert(this[$$properties][head], humanMsg`No property '${name}' exists.`);
						// 	return this[$$properties][head];
						// }
					}();
	
					if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
				}
			}
	
			/**
	   * Retrieve multiple properties by name in an object, possibly transformed.
	   *
	   * @public
	   * @method
	   * @param  {Object}    activeDeps          - a list of active dependencies for a derived property
	   * @param  {Object?}   optionalPassiveDeps - an optional list of passive dependencies for a derived property
	   * @param  {Function?} optionalTransformer - an optional function to map the dependencies to a new value for the derived property
	   * @return {Observable} - an observable of combined properties
	   */
	
		}, {
			key: 'pObj',
			value: function pObj(activeDeps) {
				var optionalPassiveDeps = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];
				var optionalTransformer = arguments.length <= 2 || arguments[2] === undefined ? function (obj) {
					return obj;
				} : arguments[2];
	
				this[$$initialize]();
				var bothList = activeDeps.concat(optionalPassiveDeps);
				return this.p(activeDeps, optionalPassiveDeps, function () {
					for (var _len3 = arguments.length, vals = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
						vals[_key3] = arguments[_key3];
					}
	
					return optionalTransformer(Object.assign.apply(Object, [{}].concat(_toConsumableArray(vals.map(function (v, i) {
						return _defineProperty({}, bothList[i], v);
					})))));
				});
			}
	
			/**
	   * Retrieve a property by name. This returns as a Subject
	   * regardless of 'readonly' option, only to be used by
	   * the 'owner' of the property.
	   *
	   * @public
	   * @method
	   * @param  {String} name     - the name of the property to retrieve
	   * @return {BehaviorSubject} - the property associated with the given name
	   */
	
		}, {
			key: 'pSubject',
			value: function pSubject(name) {
				this[$$initialize]();
				return this[$$settableProperties][name];
			}
		}]);
	
		return ValueTracker;
	}(), (_applyDecoratedDescriptor(_class.prototype, 'p', [_dec], Object.getOwnPropertyDescriptor(_class.prototype, 'p'), _class.prototype)), _class));
	exports.default = ValueTracker;
	;
	
	var property = exports.property = function property() {
		var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
		return function (target, key) {
			_set2.default.call(target, ['constructor', $$properties, key], options);
			return _extends({
				get: function get() {
					return this[$$currentValues][key];
				}
			}, !options.readonly && {
				set: function set(value) {
					this.p(key).next(value);
				}
			});
		};
	};
	
	var event = exports.event = function event() {
		var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
		return function (target, key) {
			var match = key.match(/^(\w+)Event$/);
	
			var name = match[1];
			_set2.default.call(target, ['constructor', $$events, name], options);
			return {
				get: function get() {
					return this.e(name);
				}
			};
		};
	};
	
	var flag = exports.flag = function flag(initial) {
		return property({ isValid: _isBoolean3.default, initial: initial });
	};

/***/ },
/* 136 */,
/* 137 */,
/* 138 */
/***/ function(module, exports, __webpack_require__) {

	(function webpackUniversalModuleDefinition(root, factory) {
		if(true)
			module.exports = factory();
		else if(typeof define === 'function' && define.amd)
			define([], factory);
		else if(typeof exports === 'object')
			exports["Graph"] = factory();
		else
			root["Graph"] = factory();
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
	
		module.exports = __webpack_require__(49);
	
	
	/***/ },
	
	/***/ 49:
	/***/ function(module, exports) {
	
		'use strict';
		
		//  ////////////////////////////////////////////////////////////////////////////////////////////////
		//  // Symbols for private members /////////////////////////////////////////////////////////////////
		//  ////////////////////////////////////////////////////////////////////////////////////////////////
		
		Object.defineProperty(exports, "__esModule", {
			value: true
		});
		var _bind = Function.prototype.bind;
		
		var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; })();
		
		var _get = function get(_x9, _x10, _x11) { var _again = true; _function: while (_again) { var object = _x9, property = _x10, receiver = _x11; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x9 = parent; _x10 = property; _x11 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
		
		var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
		
		function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }
		
		function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
		
		function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
		
		var _vertices = Symbol("vertices");
		var _edges = Symbol("edges");
		var _reverseEdges = Symbol("reverse edges");
		var _sources = Symbol("sources");
		var _sinks = Symbol("sinks");
		var _edgeCount = Symbol("edge count");
		
		var _listeners = Symbol("listeners");
		var _trigger = Symbol("trigger");
		
		var _verticesFrom = Symbol("vertices from");
		var _verticesTo = Symbol("vertices to");
		var _verticesWithPathTo = Symbol("vertices with path to");
		var _verticesWithPathFrom = Symbol("vertices with path from");
		var _paths = Symbol("paths");
		
		var _expectVertices = Symbol("expect vertices");
		var _expectVerticesAbsent = Symbol("expect vertex absent");
		var _expectEdges = Symbol("expect edge");
		var _expectEdgesAbsent = Symbol("expect edge absent");
		var _expectNoConnectedEdges = Symbol("expect no connected edges");
		
		//  ////////////////////////////////////////////////////////////////////////////////////////////////
		//  // Graph class /////////////////////////////////////////////////////////////////////////////////
		//  ////////////////////////////////////////////////////////////////////////////////////////////////
		
		/**
		 * @class Graph
		 * @classdesc The main class of this library, to be used for representing a mathematical (di)graph.
		 *
		 * @description Constructor arguments can be used to supply initial vertices and edges.
		 * @param ...parts {Array.<Array>}
		 *        a short notation for vertices and edges to initially add to the graph;
		 *        A vertex should be an array of the form `[key, value]`.
		 *        An edge should be an array of the form `[[from, to], value]`.
		 *        Later values of vertices or edges in this list will overwrite earlier
		 *        values, but vertices need not precede their edges. Vertices that are
		 *        connected but store no value need not be listed at all.
		 * @example
		 * var map = new Graph(
		 *     ['Amsterdam',             { population: 825000 }], // vertex
		 *     ['Leiden',                { population: 122000 }], // vertex
		 *     [['Amsterdam', 'Leiden'], { distance:   "40km" }]  // edge
		 * );
		 */
		
		var Graph = (function () {
			function Graph() {
				_classCallCheck(this, Graph);
		
				/* storage */
				this[_vertices] = new Map(); // Map.< string, * >
				this[_edges] = new Map(); // Map.< string, Map.<string, *> >
		
				/* bookkeeping */
				this[_reverseEdges] = new Map(); // Map.< string, Set.<*> >
				this[_sources] = new Set(); // Set.< string >
				this[_sinks] = new Set(); // Set.< string >
				this[_edgeCount] = 0;
		
				/* listeners */
				this[_listeners] = new Map();
		
				/* add vertices and values from constructor arguments */
				var _iteratorNormalCompletion = true;
				var _didIteratorError = false;
				var _iteratorError = undefined;
		
				try {
					for (var _len = arguments.length, parts = Array(_len), _key = 0; _key < _len; _key++) {
						parts[_key] = arguments[_key];
					}
		
					for (var _iterator = parts[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
						var _step$value = _slicedToArray(_step.value, 2);
		
						var key = _step$value[0];
						var value = _step$value[1];
		
						if (Array.isArray(key)) {
							/////////////// an edge
		
							var _key2 = _slicedToArray(key, 2);
		
							var from = _key2[0];
							var to = _key2[1];
		
							this.createEdge(from, to, value);
						} else {
							//////////////////////////////// a vertex
							this.addVertex(key, value);
						}
					}
				} catch (err) {
					_didIteratorError = true;
					_iteratorError = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion && _iterator["return"]) {
							_iterator["return"]();
						}
					} finally {
						if (_didIteratorError) {
							throw _iteratorError;
						}
					}
				}
			}
		
			//  ////////////////////////////////////////////////////////////////////////////////////////////////
			//  // Errors //////////////////////////////////////////////////////////////////////////////////////
			//  ////////////////////////////////////////////////////////////////////////////////////////////////
		
			/**
		  * @class
		  * @classdesc This type of error is thrown when specific vertices are expected not to exist, but do.
		  * @extends Error
		  */
		
			/////////////////////////////////////
			////////// Event Handling //////////
			/////////////////////////////////////
		
			/**
		  * Register an event handler.
		  * @param event   {string}   the event to listen for
		  * @param handler {Function} the function to call for each such event fired, receiving its corresponding value
		  */
		
			_createClass(Graph, [{
				key: "on",
				value: function on(event, handler) {
					if (!this[_listeners].has(event)) {
						this[_listeners].set(event, new Set());
					}
					this[_listeners].get(event).add(handler);
				}
		
				/**
		   * Deregister a previously registered event handler.
		   * @param event   {string}   the event used to originally register a handler
		   * @param handler {Function} the handler originally registered
		   */
			}, {
				key: "off",
				value: function off(event, handler) {
					if (this[_listeners].has(event)) {
						this[_listeners].get(event)["delete"](handler);
					}
				}
			}, {
				key: _trigger,
				value: function value(event, _value) {
					var _iteratorNormalCompletion2 = true;
					var _didIteratorError2 = false;
					var _iteratorError2 = undefined;
		
					try {
						for (var _iterator2 = (this[_listeners].get(event) || [])[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
							var handler = _step2.value;
		
							handler(_value);
						}
					} catch (err) {
						_didIteratorError2 = true;
						_iteratorError2 = err;
					} finally {
						try {
							if (!_iteratorNormalCompletion2 && _iterator2["return"]) {
								_iterator2["return"]();
							}
						} finally {
							if (_didIteratorError2) {
								throw _iteratorError2;
							}
						}
					}
				}
		
				/**
		   * An event that is triggered just after a vertex is added to this graph.
		   * Handlers receive the new vertex `[key, value]` as an argument.
		   * @event vertex-added
		   * @memberof Graph
		   * @instance
		   * @see {@link Graph#on}
		   * @see {@link Graph#off}
		   */
				/**
		   * An event that is triggered just after a vertex is removed from this graph.
		   * Handlers receive the vertex key as an argument.
		   * @event vertex-removed
		   * @memberof Graph
		   * @instance
		   * @see {@link Graph#on}
		   * @see {@link Graph#off}
		   */
				/**
		   * An event that is triggered after a vertex in this graph is modified.
		   * It is also triggered after any {@link #Graph#event_vertex-added|"vertex-added"} event.
		   * Handlers receive the vertex `[key, value]` as an argument.
		   * @event vertex-modified
		   * @memberof Graph
		   * @instance
		   * @see {@link Graph#on}
		   * @see {@link Graph#off}
		   */
				/**
		   * An event that is triggered just after an edge is added to this graph.
		   * Handlers receive the new edge `[[from, to], value]` as an argument.
		   * @event edge-added
		   * @memberof Graph
		   * @instance
		   * @see {@link Graph#on}
		   * @see {@link Graph#off}
		   */
				/**
		   * An event that is triggered just after an edge is removed from this graph.
		   * Handlers receive the edge key `[from, to]` as an argument.
		   * @event edge-removed
		   * @memberof Graph
		   * @instance
		   * @see {@link Graph#on}
		   * @see {@link Graph#off}
		   */
				/**
		   * An event that is triggered after an edge in this graph is modified.
		   * It is also triggered after any {@link #Graph#event_edge-added|"edge-added"} event.
		   * Handlers receive the edge `[[from, to], value]` as an argument.
		   * @event edge-modified
		   * @memberof Graph
		   * @instance
		   * @see {@link Graph#on}
		   * @see {@link Graph#off}
		   */
		
				//////////////////////////////
				////////// Vertices //////////
				//////////////////////////////
		
				////////// creating them //////////
		
				/**
		   * Add a new vertex to this graph.
		   * @throws {Graph.VertexExistsError} if a vertex with this key already exists
		   * @param  key    {string} the key with which to refer to this new vertex
		   * @param [value] {*}      the value to store in this new vertex
		   */
			}, {
				key: "addNewVertex",
				value: function addNewVertex(key, value) {
					this[_expectVerticesAbsent](key);
					this[_vertices].set(key, value);
					this[_edges].set(key, new Map());
					this[_reverseEdges].set(key, new Set());
					this[_sources].add(key);
					this[_sinks].add(key);
					this[_trigger]('vertex-added', [key, value]);
					this[_trigger]('vertex-modified', [key, value]);
				}
		
				/**
		   * Set the value of an existing vertex in this graph.
		   * @throws {Graph.VertexNotExistsError} if a vertex with this key does not exist
		   * @param  key    {string} the key belonging to the vertex
		   * @param [value] {*}      the value to store in this vertex
		   */
			}, {
				key: "setVertex",
				value: function setVertex(key, value) {
					this[_expectVertices](key);
					this[_vertices].set(key, value);
					this[_trigger]('vertex-modified', [key, value]);
				}
		
				/**
		   * Make sure a vertex with a specific key exists in this graph. If it already exists,
		   * do nothing. If it does not yet exist, add a new vertex with the given value.
		   * @param  key    {string} the key for the vertex
		   * @param [value] {*}      the value to store if a new vertex is added
		   */
			}, {
				key: "ensureVertex",
				value: function ensureVertex(key, value) {
					if (!this.hasVertex(key)) {
						this.addNewVertex(key, value);
					}
				}
		
				/**
		   * Add a new vertex to this graph. If a vertex with this key already exists,
		   * the value of that vertex is overwritten.
		   * @param  key    {string} the key with which to refer to this new vertex
		   * @param [value] {*}      the value to store in this new vertex
		   */
			}, {
				key: "addVertex",
				value: function addVertex(key, value) {
					if (this.hasVertex(key)) {
						this.setVertex(key, value);
					} else {
						this.addNewVertex(key, value);
					}
				}
		
				////////// removing them //////////
		
				/**
		   * Remove an existing vertex from this graph.
		   * @throws {Graph.VertexNotExistsError} if a vertex with this key does not exist
		   * @throws {Graph.HasConnectedEdgesError} if there are still edges connected to this vertex
		   * @param key {string} the key of the vertex to remove
		   */
			}, {
				key: "removeExistingVertex",
				value: function removeExistingVertex(key) {
					this[_expectVertices](key);
					this[_expectNoConnectedEdges](key);
					this[_vertices]["delete"](key);
					this[_sources]["delete"](key);
					this[_sinks]["delete"](key);
					this[_trigger]('vertex-removed', key);
				}
		
				/**
		   * Remove an existing vertex from this graph, as well as all edges connected to it.
		   * @throws {Graph.VertexNotExistsError} if a vertex with this key does not exist
		   * @param key {string} the key of the vertex to remove
		   */
			}, {
				key: "destroyExistingVertex",
				value: function destroyExistingVertex(key) {
					this[_expectVertices](key);
					var _iteratorNormalCompletion3 = true;
					var _didIteratorError3 = false;
					var _iteratorError3 = undefined;
		
					try {
						for (var _iterator3 = this.verticesFrom(key)[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
							var _step3$value = _slicedToArray(_step3.value, 1);
		
							var to = _step3$value[0];
							this.removeEdge(key, to);
						}
					} catch (err) {
						_didIteratorError3 = true;
						_iteratorError3 = err;
					} finally {
						try {
							if (!_iteratorNormalCompletion3 && _iterator3["return"]) {
								_iterator3["return"]();
							}
						} finally {
							if (_didIteratorError3) {
								throw _iteratorError3;
							}
						}
					}
		
					var _iteratorNormalCompletion4 = true;
					var _didIteratorError4 = false;
					var _iteratorError4 = undefined;
		
					try {
						for (var _iterator4 = this.verticesTo(key)[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
							var _step4$value = _slicedToArray(_step4.value, 1);
		
							var from = _step4$value[0];
							this.removeEdge(from, key);
						}
					} catch (err) {
						_didIteratorError4 = true;
						_iteratorError4 = err;
					} finally {
						try {
							if (!_iteratorNormalCompletion4 && _iterator4["return"]) {
								_iterator4["return"]();
							}
						} finally {
							if (_didIteratorError4) {
								throw _iteratorError4;
							}
						}
					}
		
					this.removeExistingVertex(key);
				}
		
				/**
		   * Remove an existing vertex from this graph.
		   * If a vertex with this key does not exist, nothing happens.
		   * @throws {Graph.HasConnectedEdgesError} if there are still edges connected to this vertex
		   * @param key {string} the key of the vertex to remove
		   */
			}, {
				key: "removeVertex",
				value: function removeVertex(key) {
					if (this.hasVertex(key)) {
						this.removeExistingVertex(key);
					}
				}
		
				/**
		   * Remove a vertex from this graph, as well as all edges connected to it.
		   * If a vertex with this key does not exist, nothing happens.
		   * @param key {string} the key of the vertex to remove
		   */
			}, {
				key: "destroyVertex",
				value: function destroyVertex(key) {
					if (this.hasVertex(key)) {
						this.destroyExistingVertex(key);
					}
				}
		
				////////// querying them //////////
		
				/**
		   * @returns {number} the number of vertices in the whole graph
		   */
			}, {
				key: "vertexCount",
				value: function vertexCount() {
					return this[_vertices].size;
				}
		
				/**
		   * Ask whether a vertex with a given key exists.
		   * @param key {string} the key to query
		   * @returns {boolean} whether there is a vertex with the given key
		   */
			}, {
				key: "hasVertex",
				value: function hasVertex(key) {
					return this[_vertices].has(key);
				}
		
				/**
		   * Get the value associated with the vertex of a given key.
		   * @param key {string} the key to query
		   * @returns {*} the value associated with the vertex of the given key.
		   * Note that a return value of `undefined` can mean
		   *
		   * 1. that there is no such vertex, or
		   * 2. that the stored value is actually `undefined`.
		   *
		   * Use {@link Graph#hasVertex} to distinguish these cases.
		   */
			}, {
				key: "vertexValue",
				value: function vertexValue(key) {
					return this[_vertices].get(key);
				}
		
				///////////////////////////
				////////// Edges //////////
				///////////////////////////
		
				////////// adding them //////////
		
				/**
		   * Add a new edge to this graph.
		   * @throws {Graph.EdgeExistsError} if an edge between `from` and `to` already exists
		   * @throws {Graph.VertexNotExistsError} if the `from` and/or `to` vertices do not yet exist in the graph
		   * @param  from   {string} the key for the originating vertex
		   * @param  to     {string} the key for the terminating vertex
		   * @param [value] {*}      the value to store in this new edge
		   */
			}, {
				key: "addNewEdge",
				value: function addNewEdge(from, to, value) {
					this[_expectEdgesAbsent]([from, to]);
					this[_expectVertices](from, to);
					this[_edges].get(from).set(to, value);
					this[_reverseEdges].get(to).add(from);
					this[_edgeCount] += 1;
					this[_sources]["delete"](to);
					this[_sinks]["delete"](from);
					this[_trigger]('edge-added', [[from, to], value]);
					this[_trigger]('edge-modified', [[from, to], value]);
				}
		
				/**
		   * Add a new edge to this graph. If the `from` and/or `to` vertices do not yet exist
		   * in the graph, they are implicitly added with an `undefined` value.
		   * @throws {Graph.EdgeExistsError} if an edge between `from` and `to` already exists
		   * @param  from   {string} the key for the originating vertex
		   * @param  to     {string} the key for the terminating vertex
		   * @param [value] {*}      the value to store in this new edge
		   */
			}, {
				key: "createNewEdge",
				value: function createNewEdge(from, to, value) {
					this[_expectEdgesAbsent]([from, to]);
					this.ensureVertex(from);
					this.ensureVertex(to);
					this.addNewEdge(from, to, value);
				}
		
				/**
		   * Set the value of an existing edge in this graph.
		   * @throws {Graph.EdgeNotExistsError} if an edge between `from` and `to` does not yet exist
		   * @param  from   {string} the key for the originating vertex
		   * @param  to     {string} the key for the terminating vertex
		   * @param [value] {*}      the value to store in this edge
		   */
			}, {
				key: "setEdge",
				value: function setEdge(from, to, value) {
					this[_expectEdges]([from, to]);
					this[_edges].get(from).set(to, value);
					this[_trigger]('edge-modified', [[from, to], value]);
				}
		
				/**
		   * Make sure an edge between the `from` and `to` vertices in this graph.
		   * If one already exists, nothing is done.
		   * If one does not yet exist, a new edge is added with the given value.
		   * @throws {Graph.VertexNotExistsError} if the `from` and/or `to` vertices do not yet exist in the graph
		   * @param  from   {string} the key for the originating vertex
		   * @param  to     {string} the key for the terminating vertex
		   * @param [value] {*}      the value to store if a new edge is added
		   */
			}, {
				key: "spanEdge",
				value: function spanEdge(from, to, value) {
					this[_expectVertices](from, to);
					if (!this.hasEdge(from, to)) {
						this.addNewEdge(from, to, value);
					}
				}
		
				/**
		   * Add a new edge to this graph. If an edge between `from` and `to` already exists,
		   * the value of that edge is overwritten.
		   * @throws {Graph.VertexNotExistsError} if the `from` and/or `to` vertices do not yet exist in the graph
		   * @param  from   {string} the key for the originating vertex
		   * @param  to     {string} the key for the terminating vertex
		   * @param [value] {*}      the value to store in this new edge
		   */
			}, {
				key: "addEdge",
				value: function addEdge(from, to, value) {
					if (this.hasEdge(from, to)) {
						this.setEdge(from, to, value);
					} else {
						this.addNewEdge(from, to, value);
					}
				}
		
				/**
		   * Make sure an edge between the `from` and `to` vertices exists in this graph.
		   * If it already exists, nothing is done.
		   * If it does not yet exist, a new edge is added with the given value.
		   * If the `from` and/or `to` vertices do not yet exist
		   * in the graph, they are implicitly added with an `undefined` value.
		   * @param  from   {string} the key for the originating vertex
		   * @param  to     {string} the key for the terminating vertex
		   * @param [value] {*}      the value to store if a new edge is added
		   */
			}, {
				key: "ensureEdge",
				value: function ensureEdge(from, to, value) {
					if (!this.hasEdge(from, to)) {
						this.createNewEdge(from, to, value);
					}
				}
		
				/**
		   * Add a new edge to this graph. If an edge between the `from` and `to`
		   * vertices already exists, the value of that edge is overwritten.
		   * If the `from` and/or `to` vertices do not yet exist
		   * in the graph, they are implicitly added with an `undefined` value.
		   * @param  from   {string} the key for the originating vertex
		   * @param  to     {string} the key for the terminating vertex
		   * @param [value] {*}      the value to store if a new edge is added
		   */
			}, {
				key: "createEdge",
				value: function createEdge(from, to, value) {
					if (this.hasEdge(from, to)) {
						this.setEdge(from, to, value);
					} else {
						this.createNewEdge(from, to, value);
					}
				}
		
				////////// removing them //////////
		
				/**
		   * Remove an existing edge from this graph.
		   * @throws {Graph.EdgeNotExistsError} if an edge between the `from` and `to` vertices doesn't exist
		   * @param from {string} the key for the originating vertex
		   * @param to   {string} the key for the terminating vertex
		   */
			}, {
				key: "removeExistingEdge",
				value: function removeExistingEdge(from, to) {
					this[_expectEdges]([from, to]);
					this[_edges].get(from)["delete"](to);
					this[_reverseEdges].get(to)["delete"](from);
					this[_edgeCount] -= 1;
					if (this.inDegree(to) === 0) {
						this[_sources].add(to);
					}
					if (this.outDegree(from) === 0) {
						this[_sinks].add(from);
					}
					this[_trigger]('edge-removed', [from, to]);
				}
		
				/**
		   * Remove an edge from this graph.
		   * If an edge between the `from` and `to` vertices doesn't exist, nothing happens.
		   * @param from {string} the key for the originating vertex
		   * @param to   {string} the key for the terminating vertex
		   */
			}, {
				key: "removeEdge",
				value: function removeEdge(from, to) {
					if (this.hasEdge(from, to)) {
						this.removeExistingEdge(from, to);
					}
				}
		
				////////// querying them //////////
		
				/**
		   * @returns {number} the number of edges in the whole graph
		   */
			}, {
				key: "edgeCount",
				value: function edgeCount() {
					return this[_edgeCount];
				}
		
				/**
		   * Ask whether an edge between given `from` and `to` vertices exist.
		   * @param from {string} the key for the originating vertex
		   * @param to   {string} the key for the terminating vertex
		   * @returns {boolean} whether there is an edge between the given `from` and `to` vertices
		   */
			}, {
				key: "hasEdge",
				value: function hasEdge(from, to) {
					return this.hasVertex(from) && this.hasVertex(to) && this[_edges].has(from) && this[_edges].get(from).has(to);
				}
		
				/**
		   * Get the value associated with the edge between given `from` and `to` vertices.
		   * @param from {string} the key for the originating vertex
		   * @param to   {string} the key for the terminating vertex
		   * @returns {*} the value associated with the edge between the given `from` and `to` vertices
		   * Note that a return value of `undefined` can mean
		   *
		   * 1. that there is no such edge, or
		   * 2. that the stored value is actually `undefined`.
		   *
		   * Use {@link Graph#hasEdge} to distinguish these cases.
		   */
			}, {
				key: "edgeValue",
				value: function edgeValue(from, to) {
					return this.hasEdge(from, to) ? this[_edges].get(from).get(to) : undefined;
				}
		
				///////////////////////////////////////////////
				//////////// ES6 Iterable interfaces //////////
				///////////////////////////////////////////////
		
				/**
		   * Iterate over all vertices of the graph, in no particular order.
		   * @returns { Iterator.<string, *> } an object conforming to the {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterator_protocol|ES6 iterator protocol}
		   * @example
		   * for (var it = graph.vertices(), kv; !(kv = it.next()).done;) {
		   *     var key   = kv.value[0],
		   *         value = kv.value[1];
		   *     // iterates over all vertices of the graph
		   * }
		   * @example
		   * // in ECMAScript 6, you can use a for..of loop
		   * for (let [key, value] of graph.vertices()) {
		   *     // iterates over all vertices of the graph
		   * }
		   * @see {@link Graph#@@iterator}
		   */
			}, {
				key: "vertices",
				value: regeneratorRuntime.mark(function vertices() {
					var done, _iteratorNormalCompletion5, _didIteratorError5, _iteratorError5, _iterator5, _step5, _step5$value, key, value;
		
					return regeneratorRuntime.wrap(function vertices$(context$2$0) {
						while (1) switch (context$2$0.prev = context$2$0.next) {
							case 0:
								done = new Set();
								_iteratorNormalCompletion5 = true;
								_didIteratorError5 = false;
								_iteratorError5 = undefined;
								context$2$0.prev = 4;
								_iterator5 = this[_vertices][Symbol.iterator]();
		
							case 6:
								if (_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done) {
									context$2$0.next = 17;
									break;
								}
		
								_step5$value = _slicedToArray(_step5.value, 2);
								key = _step5$value[0];
								value = _step5$value[1];
		
								if (!(this.hasVertex(key) && !done.has(key))) {
									context$2$0.next = 14;
									break;
								}
		
								done.add(key);
								context$2$0.next = 14;
								return [key, value];
		
							case 14:
								_iteratorNormalCompletion5 = true;
								context$2$0.next = 6;
								break;
		
							case 17:
								context$2$0.next = 23;
								break;
		
							case 19:
								context$2$0.prev = 19;
								context$2$0.t0 = context$2$0["catch"](4);
								_didIteratorError5 = true;
								_iteratorError5 = context$2$0.t0;
		
							case 23:
								context$2$0.prev = 23;
								context$2$0.prev = 24;
		
								if (!_iteratorNormalCompletion5 && _iterator5["return"]) {
									_iterator5["return"]();
								}
		
							case 26:
								context$2$0.prev = 26;
		
								if (!_didIteratorError5) {
									context$2$0.next = 29;
									break;
								}
		
								throw _iteratorError5;
		
							case 29:
								return context$2$0.finish(26);
		
							case 30:
								return context$2$0.finish(23);
		
							case 31:
							case "end":
								return context$2$0.stop();
						}
					}, vertices, this, [[4, 19, 23, 31], [24,, 26, 30]]);
				})
		
				/**
		   * A {@link Graph} object is itself {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterable_protocol|iterable},
		   * and serves as a short notation in ECMAScript 6 to iterate over all vertices in the graph, in no particular order.
		   * @method Graph#@@iterator
		   * @returns { Iterator.<string, *> } an object conforming to the {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterator_protocol|ES6 iterator protocol}
		   * @example
		   * for (let [key, value] of graph) {
		   *     // iterates over all vertices of the graph
		   * }
		   * @see {@link Graph#vertices}
		   */
			}, {
				key: Symbol.iterator,
				value: function value() {
					return this.vertices();
				}
		
				/**
		   * Iterate over all edges of the graph, in no particular order.
		   * @returns { Iterator.<string, string, *> } an object conforming to the {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterator_protocol|ES6 iterator protocol}
		   * @example
		   * for (var it = graph.edges(), kv; !(kv = it.next()).done;) {
		   *     var from  = kv.value[0],
		   *         to    = kv.value[1],
		   *         value = kv.value[2];
		   *     // iterates over all edges of the graph
		   * }
		   * @example
		   * // in ECMAScript 6, you can use a for..of loop
		   * for (let [from, to, value] of graph.edges()) {
		   *     // iterates over all vertices of the graph
		   * }
		   */
			}, {
				key: "edges",
				value: regeneratorRuntime.mark(function edges() {
					var done, _iteratorNormalCompletion6, _didIteratorError6, _iteratorError6, _iterator6, _step6, from, _iteratorNormalCompletion7, _didIteratorError7, _iteratorError7, _iterator7, _step7, to;
		
					return regeneratorRuntime.wrap(function edges$(context$2$0) {
						while (1) switch (context$2$0.prev = context$2$0.next) {
							case 0:
								done = new Map();
								_iteratorNormalCompletion6 = true;
								_didIteratorError6 = false;
								_iteratorError6 = undefined;
								context$2$0.prev = 4;
								_iterator6 = this[_edges].keys()[Symbol.iterator]();
		
							case 6:
								if (_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done) {
									context$2$0.next = 40;
									break;
								}
		
								from = _step6.value;
		
								done.set(from, new Set());
								_iteratorNormalCompletion7 = true;
								_didIteratorError7 = false;
								_iteratorError7 = undefined;
								context$2$0.prev = 12;
								_iterator7 = this[_edges].get(from).keys()[Symbol.iterator]();
		
							case 14:
								if (_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done) {
									context$2$0.next = 23;
									break;
								}
		
								to = _step7.value;
		
								if (!(this.hasEdge(from, to) && !done.get(from).has(to))) {
									context$2$0.next = 20;
									break;
								}
		
								done.get(from).add(to);
								context$2$0.next = 20;
								return [from, to, this[_edges].get(from).get(to)];
		
							case 20:
								_iteratorNormalCompletion7 = true;
								context$2$0.next = 14;
								break;
		
							case 23:
								context$2$0.next = 29;
								break;
		
							case 25:
								context$2$0.prev = 25;
								context$2$0.t0 = context$2$0["catch"](12);
								_didIteratorError7 = true;
								_iteratorError7 = context$2$0.t0;
		
							case 29:
								context$2$0.prev = 29;
								context$2$0.prev = 30;
		
								if (!_iteratorNormalCompletion7 && _iterator7["return"]) {
									_iterator7["return"]();
								}
		
							case 32:
								context$2$0.prev = 32;
		
								if (!_didIteratorError7) {
									context$2$0.next = 35;
									break;
								}
		
								throw _iteratorError7;
		
							case 35:
								return context$2$0.finish(32);
		
							case 36:
								return context$2$0.finish(29);
		
							case 37:
								_iteratorNormalCompletion6 = true;
								context$2$0.next = 6;
								break;
		
							case 40:
								context$2$0.next = 46;
								break;
		
							case 42:
								context$2$0.prev = 42;
								context$2$0.t1 = context$2$0["catch"](4);
								_didIteratorError6 = true;
								_iteratorError6 = context$2$0.t1;
		
							case 46:
								context$2$0.prev = 46;
								context$2$0.prev = 47;
		
								if (!_iteratorNormalCompletion6 && _iterator6["return"]) {
									_iterator6["return"]();
								}
		
							case 49:
								context$2$0.prev = 49;
		
								if (!_didIteratorError6) {
									context$2$0.next = 52;
									break;
								}
		
								throw _iteratorError6;
		
							case 52:
								return context$2$0.finish(49);
		
							case 53:
								return context$2$0.finish(46);
		
							case 54:
							case "end":
								return context$2$0.stop();
						}
					}, edges, this, [[4, 42, 46, 54], [12, 25, 29, 37], [30,, 32, 36], [47,, 49, 53]]);
				})
		
				/**
		   * Iterate over the outgoing edges of a given vertex in the graph, in no particular order.
		   * @throws {Graph.VertexNotExistsError} if a vertex with the given `from` key does not exist
		   * @param from {string} the key of the vertex to take the outgoing edges from
		   * @returns { Iterator.<string, *, *> } an object conforming to the {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterator_protocol|ES6 iterator protocol}
		   * @example
		   * for (var it = graph.verticesFrom(from), kv; !(kv = it.next()).done;) {
		   *     var to          = kv.value[0],
		   *         vertexValue = kv.value[1],
		   *         edgeValue   = kv.value[2];
		   *     // iterates over all outgoing vertices of the `from` vertex
		   * }
		   * @example
		   * // in ECMAScript 6, you can use a for..of loop
		   * for (let [to, vertexValue, edgeValue] of graph.verticesFrom(from)) {
		   *     // iterates over all outgoing edges of the `from` vertex
		   * }
		   */
			}, {
				key: "verticesFrom",
				value: function verticesFrom(from) {
					this[_expectVertices](from);
					return this[_verticesFrom](from);
				}
			}, {
				key: _verticesFrom,
				value: regeneratorRuntime.mark(function value(from) {
					var done, _iteratorNormalCompletion8, _didIteratorError8, _iteratorError8, _iterator8, _step8, to;
		
					return regeneratorRuntime.wrap(function value$(context$2$0) {
						while (1) switch (context$2$0.prev = context$2$0.next) {
							case 0:
								done = new Set();
								_iteratorNormalCompletion8 = true;
								_didIteratorError8 = false;
								_iteratorError8 = undefined;
								context$2$0.prev = 4;
								_iterator8 = this[_edges].get(from).keys()[Symbol.iterator]();
		
							case 6:
								if (_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done) {
									context$2$0.next = 15;
									break;
								}
		
								to = _step8.value;
		
								if (!(this.hasEdge(from, to) && !done.has(to))) {
									context$2$0.next = 12;
									break;
								}
		
								done.add(to);
								context$2$0.next = 12;
								return [to, this[_vertices].get(to), this[_edges].get(from).get(to)];
		
							case 12:
								_iteratorNormalCompletion8 = true;
								context$2$0.next = 6;
								break;
		
							case 15:
								context$2$0.next = 21;
								break;
		
							case 17:
								context$2$0.prev = 17;
								context$2$0.t0 = context$2$0["catch"](4);
								_didIteratorError8 = true;
								_iteratorError8 = context$2$0.t0;
		
							case 21:
								context$2$0.prev = 21;
								context$2$0.prev = 22;
		
								if (!_iteratorNormalCompletion8 && _iterator8["return"]) {
									_iterator8["return"]();
								}
		
							case 24:
								context$2$0.prev = 24;
		
								if (!_didIteratorError8) {
									context$2$0.next = 27;
									break;
								}
		
								throw _iteratorError8;
		
							case 27:
								return context$2$0.finish(24);
		
							case 28:
								return context$2$0.finish(21);
		
							case 29:
							case "end":
								return context$2$0.stop();
						}
					}, value, this, [[4, 17, 21, 29], [22,, 24, 28]]);
				})
		
				/**
		   * Iterate over the incoming edges of a given vertex in the graph, in no particular order.
		   * @throws {Graph.VertexNotExistsError} if a vertex with the given `to` key does not exist
		   * @param to {string} the key of the vertex to take the incoming edges from
		   * @returns { Iterator.<string, *, *> } an object conforming to the {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterator_protocol|ES6 iterator protocol}
		   * @example
		   * for (var it = graph.verticesTo(to), kv; !(kv = it.next()).done;) {
		   *     var from        = kv.value[0],
		   *         vertexValue = kv.value[1],
		   *         edgeValue   = kv.value[2];
		   *     // iterates over all outgoing vertices of the `from` vertex
		   * }
		   * @example
		   * // in ECMAScript 6, you can use a for..of loop
		   * for (let [from, vertexValue, edgeValue] of graph.verticesTo(to)) {
		   *     // iterates over all incoming edges of the `to` vertex
		   * }
		   */
			}, {
				key: "verticesTo",
				value: function verticesTo(to) {
					this[_expectVertices](to);
					return this[_verticesTo](to);
				}
			}, {
				key: _verticesTo,
				value: regeneratorRuntime.mark(function value(to) {
					var done, _iteratorNormalCompletion9, _didIteratorError9, _iteratorError9, _iterator9, _step9, from;
		
					return regeneratorRuntime.wrap(function value$(context$2$0) {
						while (1) switch (context$2$0.prev = context$2$0.next) {
							case 0:
								done = new Set();
								_iteratorNormalCompletion9 = true;
								_didIteratorError9 = false;
								_iteratorError9 = undefined;
								context$2$0.prev = 4;
								_iterator9 = this[_reverseEdges].get(to)[Symbol.iterator]();
		
							case 6:
								if (_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done) {
									context$2$0.next = 15;
									break;
								}
		
								from = _step9.value;
		
								if (!(this.hasEdge(from, to) && !done.has(from))) {
									context$2$0.next = 12;
									break;
								}
		
								done.add(from);
								context$2$0.next = 12;
								return [from, this[_vertices].get(from), this[_edges].get(from).get(to)];
		
							case 12:
								_iteratorNormalCompletion9 = true;
								context$2$0.next = 6;
								break;
		
							case 15:
								context$2$0.next = 21;
								break;
		
							case 17:
								context$2$0.prev = 17;
								context$2$0.t0 = context$2$0["catch"](4);
								_didIteratorError9 = true;
								_iteratorError9 = context$2$0.t0;
		
							case 21:
								context$2$0.prev = 21;
								context$2$0.prev = 22;
		
								if (!_iteratorNormalCompletion9 && _iterator9["return"]) {
									_iterator9["return"]();
								}
		
							case 24:
								context$2$0.prev = 24;
		
								if (!_didIteratorError9) {
									context$2$0.next = 27;
									break;
								}
		
								throw _iteratorError9;
		
							case 27:
								return context$2$0.finish(24);
		
							case 28:
								return context$2$0.finish(21);
		
							case 29:
							case "end":
								return context$2$0.stop();
						}
					}, value, this, [[4, 17, 21, 29], [22,, 24, 28]]);
				})
		
				/**
		   * Iterate over all vertices reachable from a given vertex in the graph, in no particular order.
		   * @throws {Graph.VertexNotExistsError} if a vertex with the given `from` key does not exist
		   * @param from {string} the key of the vertex to take the reachable vertices from
		   * @returns { Iterator.<string, *> } an object conforming to the {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterator_protocol|ES6 iterator protocol}
		   * @example
		   * for (var it = graph.verticesWithPathFrom(from), kv; !(kv = it.next()).done;) {
		   *     var key   = kv.value[0],
		   *         value = kv.value[1];
		   *     // iterates over all vertices reachable from `from`
		   * }
		   * @example
		   * // in ECMAScript 6, you can use a for..of loop
		   * for (let [key, value] of graph.verticesWithPathFrom(from)) {
		   *     // iterates over all vertices reachable from `from`
		   * }
		   */
			}, {
				key: "verticesWithPathFrom",
				value: function verticesWithPathFrom(from) {
					this[_expectVertices](from);
					return this[_verticesWithPathFrom](from, new Set());
				}
			}, {
				key: _verticesWithPathFrom,
				value: regeneratorRuntime.mark(function value(from, done) {
					var _iteratorNormalCompletion10, _didIteratorError10, _iteratorError10, _iterator10, _step10, to;
		
					return regeneratorRuntime.wrap(function value$(context$2$0) {
						while (1) switch (context$2$0.prev = context$2$0.next) {
							case 0:
								_iteratorNormalCompletion10 = true;
								_didIteratorError10 = false;
								_iteratorError10 = undefined;
								context$2$0.prev = 3;
								_iterator10 = this[_edges].get(from).keys()[Symbol.iterator]();
		
							case 5:
								if (_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done) {
									context$2$0.next = 15;
									break;
								}
		
								to = _step10.value;
		
								if (!(this.hasEdge(from, to) && !done.has(to))) {
									context$2$0.next = 12;
									break;
								}
		
								done.add(to);
								context$2$0.next = 11;
								return [to, this[_vertices].get(to)];
		
							case 11:
								return context$2$0.delegateYield(this[_verticesWithPathFrom](to, done), "t0", 12);
		
							case 12:
								_iteratorNormalCompletion10 = true;
								context$2$0.next = 5;
								break;
		
							case 15:
								context$2$0.next = 21;
								break;
		
							case 17:
								context$2$0.prev = 17;
								context$2$0.t1 = context$2$0["catch"](3);
								_didIteratorError10 = true;
								_iteratorError10 = context$2$0.t1;
		
							case 21:
								context$2$0.prev = 21;
								context$2$0.prev = 22;
		
								if (!_iteratorNormalCompletion10 && _iterator10["return"]) {
									_iterator10["return"]();
								}
		
							case 24:
								context$2$0.prev = 24;
		
								if (!_didIteratorError10) {
									context$2$0.next = 27;
									break;
								}
		
								throw _iteratorError10;
		
							case 27:
								return context$2$0.finish(24);
		
							case 28:
								return context$2$0.finish(21);
		
							case 29:
							case "end":
								return context$2$0.stop();
						}
					}, value, this, [[3, 17, 21, 29], [22,, 24, 28]]);
				})
		
				/**
		   * Iterate over all vertices from which a given vertex in the graph can be reached, in no particular order.
		   * @throws {Graph.VertexNotExistsError} if a vertex with the given `to` key does not exist
		   * @param to {string} the key of the vertex to take the reachable vertices from
		   * @returns { Iterator.<string, *> } an object conforming to the {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterator_protocol|ES6 iterator protocol}
		   * @example
		   * for (var it = graph.verticesWithPathTo(to), kv; !(kv = it.next()).done;) {
		   *     var key   = kv.value[0],
		   *         value = kv.value[1];
		   *     // iterates over all vertices from which `to` can be reached
		   * }
		   * @example
		   * // in ECMAScript 6, you can use a for..of loop
		   * for (let [key, value] of graph.verticesWithPathTo(to)) {
		   *     // iterates over all vertices from which `to` can be reached
		   * }
		   */
			}, {
				key: "verticesWithPathTo",
				value: function verticesWithPathTo(to) {
					this[_expectVertices](to);
					return this[_verticesWithPathTo](to, new Set());
				}
			}, {
				key: _verticesWithPathTo,
				value: regeneratorRuntime.mark(function value(to, done) {
					var _iteratorNormalCompletion11, _didIteratorError11, _iteratorError11, _iterator11, _step11, from;
		
					return regeneratorRuntime.wrap(function value$(context$2$0) {
						while (1) switch (context$2$0.prev = context$2$0.next) {
							case 0:
								_iteratorNormalCompletion11 = true;
								_didIteratorError11 = false;
								_iteratorError11 = undefined;
								context$2$0.prev = 3;
								_iterator11 = this[_reverseEdges].get(to)[Symbol.iterator]();
		
							case 5:
								if (_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done) {
									context$2$0.next = 15;
									break;
								}
		
								from = _step11.value;
		
								if (!(this.hasEdge(from, to) && !done.has(from))) {
									context$2$0.next = 12;
									break;
								}
		
								done.add(from);
								context$2$0.next = 11;
								return [from, this[_vertices].get(from)];
		
							case 11:
								return context$2$0.delegateYield(this[_verticesWithPathTo](from, done), "t0", 12);
		
							case 12:
								_iteratorNormalCompletion11 = true;
								context$2$0.next = 5;
								break;
		
							case 15:
								context$2$0.next = 21;
								break;
		
							case 17:
								context$2$0.prev = 17;
								context$2$0.t1 = context$2$0["catch"](3);
								_didIteratorError11 = true;
								_iteratorError11 = context$2$0.t1;
		
							case 21:
								context$2$0.prev = 21;
								context$2$0.prev = 22;
		
								if (!_iteratorNormalCompletion11 && _iterator11["return"]) {
									_iterator11["return"]();
								}
		
							case 24:
								context$2$0.prev = 24;
		
								if (!_didIteratorError11) {
									context$2$0.next = 27;
									break;
								}
		
								throw _iteratorError11;
		
							case 27:
								return context$2$0.finish(24);
		
							case 28:
								return context$2$0.finish(21);
		
							case 29:
							case "end":
								return context$2$0.stop();
						}
					}, value, this, [[3, 17, 21, 29], [22,, 24, 28]]);
				})
		
				/**
		   * Iterate over all vertices that have no incoming edges, in no particular order.
		   * @returns { Iterator.<string, *> } an object conforming to the {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterator_protocol|ES6 iterator protocol}
		   * @example
		   * for (var it = graph.sources(), kv; !(kv = it.next()).done;) {
		   *     var key   = kv.value[0],
		   *         value = kv.value[1];
		   *     // iterates over all vertices with no incoming edges
		   * }
		   * @example
		   * // in ECMAScript 6, you can use a for..of loop
		   * for (let [key, value] of graph.sources()) {
		   *     // iterates over all vertices with no incoming edges
		   * }
		   */
			}, {
				key: "sources",
				value: regeneratorRuntime.mark(function sources() {
					var done, _iteratorNormalCompletion12, _didIteratorError12, _iteratorError12, _iterator12, _step12, key;
		
					return regeneratorRuntime.wrap(function sources$(context$2$0) {
						while (1) switch (context$2$0.prev = context$2$0.next) {
							case 0:
								done = new Set();
								_iteratorNormalCompletion12 = true;
								_didIteratorError12 = false;
								_iteratorError12 = undefined;
								context$2$0.prev = 4;
								_iterator12 = this[_sources][Symbol.iterator]();
		
							case 6:
								if (_iteratorNormalCompletion12 = (_step12 = _iterator12.next()).done) {
									context$2$0.next = 15;
									break;
								}
		
								key = _step12.value;
		
								if (!(this.hasVertex(key) && !done.has(key))) {
									context$2$0.next = 12;
									break;
								}
		
								done.add(key);
								context$2$0.next = 12;
								return [key, this.vertexValue(key)];
		
							case 12:
								_iteratorNormalCompletion12 = true;
								context$2$0.next = 6;
								break;
		
							case 15:
								context$2$0.next = 21;
								break;
		
							case 17:
								context$2$0.prev = 17;
								context$2$0.t0 = context$2$0["catch"](4);
								_didIteratorError12 = true;
								_iteratorError12 = context$2$0.t0;
		
							case 21:
								context$2$0.prev = 21;
								context$2$0.prev = 22;
		
								if (!_iteratorNormalCompletion12 && _iterator12["return"]) {
									_iterator12["return"]();
								}
		
							case 24:
								context$2$0.prev = 24;
		
								if (!_didIteratorError12) {
									context$2$0.next = 27;
									break;
								}
		
								throw _iteratorError12;
		
							case 27:
								return context$2$0.finish(24);
		
							case 28:
								return context$2$0.finish(21);
		
							case 29:
							case "end":
								return context$2$0.stop();
						}
					}, sources, this, [[4, 17, 21, 29], [22,, 24, 28]]);
				})
		
				/**
		   * Iterate over all vertices that have no outgoing edges, in no particular order.
		   * @returns { Iterator.<string, *> } an object conforming to the {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterator_protocol|ES6 iterator protocol}
		   * @example
		   * for (var it = graph.sinks(), kv; !(kv = it.next()).done;) {
		   *     var key   = kv.value[0],
		   *         value = kv.value[1];
		   *     // iterates over all vertices with no outgoing edges
		   * }
		   * @example
		   * // in ECMAScript 6, you can use a for..of loop
		   * for (let [key, value] of graph.sinks()) {
		   *     // iterates over all vertices with no outgoing edges
		   * }
		   */
			}, {
				key: "sinks",
				value: regeneratorRuntime.mark(function sinks() {
					var done, _iteratorNormalCompletion13, _didIteratorError13, _iteratorError13, _iterator13, _step13, key;
		
					return regeneratorRuntime.wrap(function sinks$(context$2$0) {
						while (1) switch (context$2$0.prev = context$2$0.next) {
							case 0:
								done = new Set();
								_iteratorNormalCompletion13 = true;
								_didIteratorError13 = false;
								_iteratorError13 = undefined;
								context$2$0.prev = 4;
								_iterator13 = this[_sinks][Symbol.iterator]();
		
							case 6:
								if (_iteratorNormalCompletion13 = (_step13 = _iterator13.next()).done) {
									context$2$0.next = 15;
									break;
								}
		
								key = _step13.value;
		
								if (!(this.hasVertex(key) && !done.has(key))) {
									context$2$0.next = 12;
									break;
								}
		
								done.add(key);
								context$2$0.next = 12;
								return [key, this.vertexValue(key)];
		
							case 12:
								_iteratorNormalCompletion13 = true;
								context$2$0.next = 6;
								break;
		
							case 15:
								context$2$0.next = 21;
								break;
		
							case 17:
								context$2$0.prev = 17;
								context$2$0.t0 = context$2$0["catch"](4);
								_didIteratorError13 = true;
								_iteratorError13 = context$2$0.t0;
		
							case 21:
								context$2$0.prev = 21;
								context$2$0.prev = 22;
		
								if (!_iteratorNormalCompletion13 && _iterator13["return"]) {
									_iterator13["return"]();
								}
		
							case 24:
								context$2$0.prev = 24;
		
								if (!_didIteratorError13) {
									context$2$0.next = 27;
									break;
								}
		
								throw _iteratorError13;
		
							case 27:
								return context$2$0.finish(24);
		
							case 28:
								return context$2$0.finish(21);
		
							case 29:
							case "end":
								return context$2$0.stop();
						}
					}, sinks, this, [[4, 17, 21, 29], [22,, 24, 28]]);
				})
		
				/**
		   * Iterate over all vertices of the graph in topological order.
		   * @returns { Iterator.<string, *> } an object conforming to the {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterator_protocol|ES6 iterator protocol}
		   * @example
		   * for (var it = graph.vertices_topologically(), kv; !(kv = it.next()).done;) {
		   *     var key   = kv.value[0],
		   *         value = kv.value[1];
		   *     // iterates over all vertices of the graph in topological order
		   * }
		   * @example
		   * // in ECMAScript 6, you can use a for..of loop
		   * for (let [key, value] of graph.vertices_topologically()) {
		   *     // iterates over all vertices of the graph in topological order
		   * }
		   */
			}, {
				key: "vertices_topologically",
				value: regeneratorRuntime.mark(function vertices_topologically() {
					var marked2$0, visited, handled, _this, visit, _iteratorNormalCompletion15, _didIteratorError15, _iteratorError15, _iterator15, _step15, _step15$value, a;
		
					return regeneratorRuntime.wrap(function vertices_topologically$(context$2$0) {
						while (1) switch (context$2$0.prev = context$2$0.next) {
							case 0:
								visit = function visit(a) {
									var i, cycle, _iteratorNormalCompletion14, _didIteratorError14, _iteratorError14, _iterator14, _step14, _step14$value, b;
		
									return regeneratorRuntime.wrap(function visit$(context$3$0) {
										while (1) switch (context$3$0.prev = context$3$0.next) {
											case 0:
												visited.push(a);
												i = visited.indexOf(a);
		
												if (!(i !== visited.length - 1)) {
													context$3$0.next = 5;
													break;
												}
		
												cycle = visited.slice(i + 1).reverse();
												throw new Graph.CycleError(cycle);
		
											case 5:
												if (handled.has(a)) {
													context$3$0.next = 36;
													break;
												}
		
												_iteratorNormalCompletion14 = true;
												_didIteratorError14 = false;
												_iteratorError14 = undefined;
												context$3$0.prev = 9;
												_iterator14 = _this.verticesTo(a)[Symbol.iterator]();
		
											case 11:
												if (_iteratorNormalCompletion14 = (_step14 = _iterator14.next()).done) {
													context$3$0.next = 18;
													break;
												}
		
												_step14$value = _slicedToArray(_step14.value, 1);
												b = _step14$value[0];
												return context$3$0.delegateYield(visit(b), "t0", 15);
		
											case 15:
												_iteratorNormalCompletion14 = true;
												context$3$0.next = 11;
												break;
		
											case 18:
												context$3$0.next = 24;
												break;
		
											case 20:
												context$3$0.prev = 20;
												context$3$0.t1 = context$3$0["catch"](9);
												_didIteratorError14 = true;
												_iteratorError14 = context$3$0.t1;
		
											case 24:
												context$3$0.prev = 24;
												context$3$0.prev = 25;
		
												if (!_iteratorNormalCompletion14 && _iterator14["return"]) {
													_iterator14["return"]();
												}
		
											case 27:
												context$3$0.prev = 27;
		
												if (!_didIteratorError14) {
													context$3$0.next = 30;
													break;
												}
		
												throw _iteratorError14;
		
											case 30:
												return context$3$0.finish(27);
		
											case 31:
												return context$3$0.finish(24);
		
											case 32:
												if (!_this.hasVertex(a)) {
													context$3$0.next = 35;
													break;
												}
		
												context$3$0.next = 35;
												return [a, _this[_vertices].get(a)];
		
											case 35:
												handled.add(a);
		
											case 36:
												visited.pop();
		
											case 37:
											case "end":
												return context$3$0.stop();
										}
									}, marked2$0[0], this, [[9, 20, 24, 32], [25,, 27, 31]]);
								};
		
								marked2$0 = [visit].map(regeneratorRuntime.mark);
								visited = [];
								handled = new Set();
								_this = this;
								_iteratorNormalCompletion15 = true;
								_didIteratorError15 = false;
								_iteratorError15 = undefined;
								context$2$0.prev = 8;
								_iterator15 = this.vertices()[Symbol.iterator]();
		
							case 10:
								if (_iteratorNormalCompletion15 = (_step15 = _iterator15.next()).done) {
									context$2$0.next = 18;
									break;
								}
		
								_step15$value = _slicedToArray(_step15.value, 1);
								a = _step15$value[0];
		
								if (handled.has(a)) {
									context$2$0.next = 15;
									break;
								}
		
								return context$2$0.delegateYield(visit(a), "t0", 15);
		
							case 15:
								_iteratorNormalCompletion15 = true;
								context$2$0.next = 10;
								break;
		
							case 18:
								context$2$0.next = 24;
								break;
		
							case 20:
								context$2$0.prev = 20;
								context$2$0.t1 = context$2$0["catch"](8);
								_didIteratorError15 = true;
								_iteratorError15 = context$2$0.t1;
		
							case 24:
								context$2$0.prev = 24;
								context$2$0.prev = 25;
		
								if (!_iteratorNormalCompletion15 && _iterator15["return"]) {
									_iterator15["return"]();
								}
		
							case 27:
								context$2$0.prev = 27;
		
								if (!_didIteratorError15) {
									context$2$0.next = 30;
									break;
								}
		
								throw _iteratorError15;
		
							case 30:
								return context$2$0.finish(27);
		
							case 31:
								return context$2$0.finish(24);
		
							case 32:
							case "end":
								return context$2$0.stop();
						}
					}, vertices_topologically, this, [[8, 20, 24, 32], [25,, 27, 31]]);
				})
		
				//////////////////////////////
				////////// Clearing //////////
				//////////////////////////////
		
				/**
		   * Remove all edges from the graph, but leave the vertices intact.
		   */
			}, {
				key: "clearEdges",
				value: function clearEdges() {
					var _iteratorNormalCompletion16 = true;
					var _didIteratorError16 = false;
					var _iteratorError16 = undefined;
		
					try {
						for (var _iterator16 = this.edges()[Symbol.iterator](), _step16; !(_iteratorNormalCompletion16 = (_step16 = _iterator16.next()).done); _iteratorNormalCompletion16 = true) {
							var _step16$value = _slicedToArray(_step16.value, 2);
		
							var from = _step16$value[0];
							var to = _step16$value[1];
							this.removeEdge(from, to);
						}
					} catch (err) {
						_didIteratorError16 = true;
						_iteratorError16 = err;
					} finally {
						try {
							if (!_iteratorNormalCompletion16 && _iterator16["return"]) {
								_iterator16["return"]();
							}
						} finally {
							if (_didIteratorError16) {
								throw _iteratorError16;
							}
						}
					}
				}
		
				/**
		   * Remove all edges and vertices from the graph, putting it back in its initial state.
		   */
			}, {
				key: "clear",
				value: function clear() {
					var _iteratorNormalCompletion17 = true;
					var _didIteratorError17 = false;
					var _iteratorError17 = undefined;
		
					try {
						for (var _iterator17 = this.vertices()[Symbol.iterator](), _step17; !(_iteratorNormalCompletion17 = (_step17 = _iterator17.next()).done); _iteratorNormalCompletion17 = true) {
							var _step17$value = _slicedToArray(_step17.value, 1);
		
							var v = _step17$value[0];
							this.destroyVertex(v);
						}
					} catch (err) {
						_didIteratorError17 = true;
						_iteratorError17 = err;
					} finally {
						try {
							if (!_iteratorNormalCompletion17 && _iterator17["return"]) {
								_iterator17["return"]();
							}
						} finally {
							if (_didIteratorError17) {
								throw _iteratorError17;
							}
						}
					}
				}
		
				////////////////////////////////////////
				////////// (Advanced) Queries //////////
				////////////////////////////////////////
		
				/**
		   * Ask whether `this` graph and a given `other` graph are equal.
		   * Two graphs are equal if they have the same vertices and the same edges.
		   * @param other {Graph} the other graph to compare to `this` one
		   * @param [eqV] {function(*, *, string): boolean}
		   *     a custom equality function for values stored in vertices;
		   *     defaults to `===` comparison; The first two arguments are the
		   *     values to compare. The third is the corresponding `key`.
		   * @param [eqE] {function(*, *, string, string): boolean}
		   *     a custom equality function for values stored in edges;
		   *     defaults to the function given for `trV`; The first two arguments
		   *     are the values to compare. The third and fourth are the `from`
		   *     and `to` keys respectively.
		   * @returns {boolean} `true` if the two graphs are equal; `false` otherwise
		   */
			}, {
				key: "equals",
				value: function equals(other) {
					var eqV = arguments.length <= 1 || arguments[1] === undefined ? function (x, y) {
						return x === y;
					} : arguments[1];
					var eqE = arguments.length <= 2 || arguments[2] === undefined ? eqV : arguments[2];
					return (function () {
						if (!(other instanceof Graph)) {
							return false;
						}
						if (this.vertexCount() !== other.vertexCount()) {
							return false;
						}
						if (this.edgeCount() !== other.edgeCount()) {
							return false;
						}
						var _iteratorNormalCompletion18 = true;
						var _didIteratorError18 = false;
						var _iteratorError18 = undefined;
		
						try {
							for (var _iterator18 = this.vertices()[Symbol.iterator](), _step18; !(_iteratorNormalCompletion18 = (_step18 = _iterator18.next()).done); _iteratorNormalCompletion18 = true) {
								var _step18$value = _slicedToArray(_step18.value, 2);
		
								var key = _step18$value[0];
								var value = _step18$value[1];
		
								if (!other.hasVertex(key)) {
									return false;
								}
								if (!eqV(value, other.vertexValue(key), key)) {
									return false;
								}
							}
						} catch (err) {
							_didIteratorError18 = true;
							_iteratorError18 = err;
						} finally {
							try {
								if (!_iteratorNormalCompletion18 && _iterator18["return"]) {
									_iterator18["return"]();
								}
							} finally {
								if (_didIteratorError18) {
									throw _iteratorError18;
								}
							}
						}
		
						var _iteratorNormalCompletion19 = true;
						var _didIteratorError19 = false;
						var _iteratorError19 = undefined;
		
						try {
							for (var _iterator19 = this.edges()[Symbol.iterator](), _step19; !(_iteratorNormalCompletion19 = (_step19 = _iterator19.next()).done); _iteratorNormalCompletion19 = true) {
								var _step19$value = _slicedToArray(_step19.value, 3);
		
								var from = _step19$value[0];
								var to = _step19$value[1];
								var value = _step19$value[2];
		
								if (!other.hasEdge(from, to)) {
									return false;
								}
								if (!eqE(value, other.edgeValue(from, to), from, to)) {
									return false;
								}
							}
						} catch (err) {
							_didIteratorError19 = true;
							_iteratorError19 = err;
						} finally {
							try {
								if (!_iteratorNormalCompletion19 && _iterator19["return"]) {
									_iterator19["return"]();
								}
							} finally {
								if (_didIteratorError19) {
									throw _iteratorError19;
								}
							}
						}
		
						return true;
					}).apply(this, arguments);
				}
		
				/**
		   * Iterate over all simple directed cycles in this graph, in no particular order.
		   * If you mutate the graph in between iterations, behavior of the iterator
		   * becomes unspecified. (So, don't.)
		   * @returns { Iterator.< Array.<string> > }
		   *          an object conforming to the {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterator_protocol|ES6 iterator protocol}.
		   *          Each iterated value is an array containing the vertex keys describing the cycle.
		   *          These arrays will contain each vertex key only once — even the first/last one.
		   * @example
		   * for (var it = graph.cycles(), kv; !(kv = it.next()).done;) {
		   *     var cycle = kv.value;
		   *     // iterates over all cycles of the graph
		   * }
		   * @example
		   * // in ECMAScript 6, you can use a for..of loop
		   * for (let cycle of graph.cycles()) {
		   *     // iterates over all cycles of the graph
		   * }
		   */
			}, {
				key: "cycles",
				value: regeneratorRuntime.mark(function cycles() {
					var marked2$0, pointStack, markedStack, mark, _this, backtrack, _iteratorNormalCompletion20, _didIteratorError20, _iteratorError20, _iterator20, _step20, _step20$value, a;
		
					return regeneratorRuntime.wrap(function cycles$(context$2$0) {
						while (1) switch (context$2$0.prev = context$2$0.next) {
							case 0:
								backtrack = function backtrack(v) {
									var out = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
		
									var _arr, _i, _arr$_i, w, o, u;
		
									return regeneratorRuntime.wrap(function backtrack$(context$3$0) {
										while (1) switch (context$3$0.prev = context$3$0.next) {
											case 0:
												pointStack.push(v);
												mark.add(v);
												markedStack.push(v);
												_arr = [].concat(_toConsumableArray(_this.verticesFrom(v)));
												_i = 0;
		
											case 5:
												if (!(_i < _arr.length)) {
													context$3$0.next = 23;
													break;
												}
		
												_arr$_i = _slicedToArray(_arr[_i], 1);
												w = _arr$_i[0];
		
												if (!(w < pointStack[0])) {
													context$3$0.next = 10;
													break;
												}
		
												return context$3$0.abrupt("continue", 20);
		
											case 10:
												if (!(w === pointStack[0])) {
													context$3$0.next = 16;
													break;
												}
		
												context$3$0.next = 13;
												return [].concat(pointStack);
		
											case 13:
												out.found = true;
												context$3$0.next = 20;
												break;
		
											case 16:
												if (mark.has(w)) {
													context$3$0.next = 20;
													break;
												}
		
												o = {};
												return context$3$0.delegateYield(backtrack(w, o), "t0", 19);
		
											case 19:
												out.found = out.found || o.found;
		
											case 20:
												_i++;
												context$3$0.next = 5;
												break;
		
											case 23:
												if (out.found) {
													u = undefined;
		
													do {
														u = markedStack.pop();
														mark["delete"](u);
													} while (u !== v);
												}
												pointStack.pop();
		
											case 25:
											case "end":
												return context$3$0.stop();
										}
									}, marked2$0[0], this);
								};
		
								marked2$0 = [backtrack].map(regeneratorRuntime.mark);
								pointStack = [];
								markedStack = undefined, mark = undefined;
								_this = this;
								_iteratorNormalCompletion20 = true;
								_didIteratorError20 = false;
								_iteratorError20 = undefined;
								context$2$0.prev = 8;
								_iterator20 = this.vertices()[Symbol.iterator]();
		
							case 10:
								if (_iteratorNormalCompletion20 = (_step20 = _iterator20.next()).done) {
									context$2$0.next = 19;
									break;
								}
		
								_step20$value = _slicedToArray(_step20.value, 1);
								a = _step20$value[0];
		
								markedStack = [];
								mark = new Set();
								return context$2$0.delegateYield(backtrack(a), "t0", 16);
		
							case 16:
								_iteratorNormalCompletion20 = true;
								context$2$0.next = 10;
								break;
		
							case 19:
								context$2$0.next = 25;
								break;
		
							case 21:
								context$2$0.prev = 21;
								context$2$0.t1 = context$2$0["catch"](8);
								_didIteratorError20 = true;
								_iteratorError20 = context$2$0.t1;
		
							case 25:
								context$2$0.prev = 25;
								context$2$0.prev = 26;
		
								if (!_iteratorNormalCompletion20 && _iterator20["return"]) {
									_iterator20["return"]();
								}
		
							case 28:
								context$2$0.prev = 28;
		
								if (!_didIteratorError20) {
									context$2$0.next = 31;
									break;
								}
		
								throw _iteratorError20;
		
							case 31:
								return context$2$0.finish(28);
		
							case 32:
								return context$2$0.finish(25);
		
							case 33:
							case "end":
								return context$2$0.stop();
						}
					}, cycles, this, [[8, 21, 25, 33], [26,, 28, 32]]);
				})
		
				/**
		   * Find any directed cycle in this graph.
		   * @returns {?Array} an array containing the vertex keys describing the cycle; `null`, if there is no cycle;
		   *                   The array will contain each vertex key only once — even the first/last one.
		   */
			}, {
				key: "cycle",
				value: function cycle() {
					var result = this.cycles().next();
					return result.done ? null : result.value;
				}
		
				/**
		   * Test whether this graph contains a directed cycle.
		   * @returns {boolean} whether this graph contains any directed cycle
		   */
			}, {
				key: "hasCycle",
				value: function hasCycle() {
					return !this.cycles().next().done;
				}
		
				/**
		   * Iterate over all paths between two given keys in this graph, in no particular order.
		   * If you mutate the graph in between iterations, behavior of the iterator
		   * becomes unspecified. (So, don't.)
		   * @param from {string} the key for the originating vertex
		   * @param to   {string} the key for the terminating vertex
		   * @throws {Graph.VertexNotExistsError} if the `from` and/or `to` vertices do not yet exist in the graph
		   * @returns { Iterator.< Array.<string> > }
		   *          an object conforming to the {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterator_protocol|ES6 iterator protocol}.
		   *          Each iterated value is an array containing the vertex-keys describing the path.
		   * @example
		   * for (var it = graph.paths(), kv; !(kv = it.next()).done;) {
		   *     var path = kv.value;
		   *     // iterates over all paths between `from` and `to` in the graph
		   * }
		   * @example
		   * // in ECMAScript 6, you can use a for..of loop
		   * for (let path of graph.paths()) {
		   *     // iterates over all paths between `from` and `to` in the graph
		   * }
		   */
			}, {
				key: "paths",
				value: function paths(from, to) {
					this[_expectVertices](from, to);
					return this[_paths](from, to);
				}
			}, {
				key: _paths,
				value: regeneratorRuntime.mark(function value(from, to) {
					var marked2$0, stack, _this, pathsFromPrefix;
		
					return regeneratorRuntime.wrap(function value$(context$2$0) {
						while (1) switch (context$2$0.prev = context$2$0.next) {
							case 0:
								pathsFromPrefix = function pathsFromPrefix(current) {
									var _iteratorNormalCompletion21, _didIteratorError21, _iteratorError21, _iterator21, _step21, _step21$value, next;
		
									return regeneratorRuntime.wrap(function pathsFromPrefix$(context$3$0) {
										while (1) switch (context$3$0.prev = context$3$0.next) {
											case 0:
												stack.push(current);
												_iteratorNormalCompletion21 = true;
												_didIteratorError21 = false;
												_iteratorError21 = undefined;
												context$3$0.prev = 4;
												_iterator21 = _this.verticesFrom(current)[Symbol.iterator]();
		
											case 6:
												if (_iteratorNormalCompletion21 = (_step21 = _iterator21.next()).done) {
													context$3$0.next = 19;
													break;
												}
		
												_step21$value = _slicedToArray(_step21.value, 1);
												next = _step21$value[0];
		
												if (!(next === to)) {
													context$3$0.next = 14;
													break;
												}
		
												context$3$0.next = 12;
												return [].concat(stack, [to]);
		
											case 12:
												context$3$0.next = 16;
												break;
		
											case 14:
												if (!(stack.indexOf(next) === -1)) {
													context$3$0.next = 16;
													break;
												}
		
												return context$3$0.delegateYield(pathsFromPrefix(next), "t0", 16);
		
											case 16:
												_iteratorNormalCompletion21 = true;
												context$3$0.next = 6;
												break;
		
											case 19:
												context$3$0.next = 25;
												break;
		
											case 21:
												context$3$0.prev = 21;
												context$3$0.t1 = context$3$0["catch"](4);
												_didIteratorError21 = true;
												_iteratorError21 = context$3$0.t1;
		
											case 25:
												context$3$0.prev = 25;
												context$3$0.prev = 26;
		
												if (!_iteratorNormalCompletion21 && _iterator21["return"]) {
													_iterator21["return"]();
												}
		
											case 28:
												context$3$0.prev = 28;
		
												if (!_didIteratorError21) {
													context$3$0.next = 31;
													break;
												}
		
												throw _iteratorError21;
		
											case 31:
												return context$3$0.finish(28);
		
											case 32:
												return context$3$0.finish(25);
		
											case 33:
												stack.pop();
		
											case 34:
											case "end":
												return context$3$0.stop();
										}
									}, marked2$0[0], this, [[4, 21, 25, 33], [26,, 28, 32]]);
								};
		
								marked2$0 = [pathsFromPrefix].map(regeneratorRuntime.mark);
								stack = [];
								_this = this;
								return context$2$0.delegateYield(pathsFromPrefix(from), "t0", 5);
		
							case 5:
							case "end":
								return context$2$0.stop();
						}
					}, value, this);
				})
		
				/**
		   * Find any path between a given pair of keys.
		   * @param from {string} the originating vertex
		   * @param to   {string} the terminating vertex
		   * @throws {Graph.VertexNotExistsError} if the `from` and/or `to` vertices do not yet exist in the graph
		   * @returns {?Array} an array with the keys of the path found between the two vertices,
		   *                   including those two vertices themselves; `null` if no such path exists
		   */
			}, {
				key: "path",
				value: function path(from, to) {
					var result = this.paths(from, to).next();
					return result.done ? null : result.value;
				}
		
				/**
		   * Test whether there is a directed path between a given pair of keys.
		   * @param from {string} the originating vertex
		   * @param to   {string} the terminating vertex
		   * @throws {Graph.VertexNotExistsError} if the `from` and/or `to` vertices do not yet exist in the graph
		   * @returns {boolean} whether such a path exists
		   */
			}, {
				key: "hasPath",
				value: function hasPath(from, to) {
					return !this.paths(from, to).next().done;
				}
		
				/**
		   * Get the number of edges going out of a given vertex.
		   * @throws {Graph.VertexNotExistsError} if a vertex with this key does not exist
		   * @param key {string} the key of the vertex to query
		   * @returns {number} the number of edges going out of the `key` vertex
		   */
			}, {
				key: "outDegree",
				value: function outDegree(key) {
					this[_expectVertices](key);
					return this[_edges].get(key).size;
				}
		
				/**
		   * Get the number of edges coming into a given vertex.
		   * @throws {Graph.VertexNotExistsError} if a vertex with this key does not exist
		   * @param key {string} the key of the vertex to query
		   * @returns {number} the number of edges coming into the `key` vertex
		   */
			}, {
				key: "inDegree",
				value: function inDegree(key) {
					this[_expectVertices](key);
					return this[_reverseEdges].get(key).size;
				}
		
				/**
		   * Get the number of edges connected to a given vertex.
		   * @throws {Graph.VertexNotExistsError} if a vertex with this key does not exist
		   * @param key {string} the key of the vertex to query
		   * @returns {number} the number of edges connected to the `key` vertex
		   */
			}, {
				key: "degree",
				value: function degree(key) {
					return this.outDegree(key) + this.inDegree(key);
				}
		
				///////////////////////////////////////
				////////// Cloning and stuff //////////
				///////////////////////////////////////
		
				/**
		   * Merge another graph into this graph.
		   * @param other {Graph} the other graph to merge into this one
		   * @param [mV] {function(*, *, string): *}
		   *     a custom merge function for values stored in vertices;
		   *     defaults to whichever of the two values is not `undefined`,
		   *     giving preference to that of the other graph; The first and
		   *     second arguments are the vertex values of `this` graph and the
		   *     `other` graph respectively. The third is the corresponding `key`.
		   * @param [mE] {function(*, *, string, string): *}
		   *     a custom merge function for values stored in edges;
		   *     defaults to whichever of the two values is not `undefined`,
		   *     giving preference to that of the other graph; The first and
		   *     second arguments are the edge values of `this` graph and the
		   *     `other` graph respectively. The third and fourth are the
		   *     corresponding `from` and `to` keys.
		   */
			}, {
				key: "mergeIn",
				value: function mergeIn(other, mV, mE) {
					if (!mV) {
						mV = function (v1, v2) {
							return typeof v2 === 'undefined' ? v1 : v2;
						};
					}
					if (!mE) {
						mE = mV;
					}
					var _iteratorNormalCompletion22 = true;
					var _didIteratorError22 = false;
					var _iteratorError22 = undefined;
		
					try {
						for (var _iterator22 = other.vertices()[Symbol.iterator](), _step22; !(_iteratorNormalCompletion22 = (_step22 = _iterator22.next()).done); _iteratorNormalCompletion22 = true) {
							var _step22$value = _slicedToArray(_step22.value, 1);
		
							var key = _step22$value[0];
		
							this.addVertex(key, mV(this.vertexValue(key), other.vertexValue(key), key));
						}
					} catch (err) {
						_didIteratorError22 = true;
						_iteratorError22 = err;
					} finally {
						try {
							if (!_iteratorNormalCompletion22 && _iterator22["return"]) {
								_iterator22["return"]();
							}
						} finally {
							if (_didIteratorError22) {
								throw _iteratorError22;
							}
						}
					}
		
					var _iteratorNormalCompletion23 = true;
					var _didIteratorError23 = false;
					var _iteratorError23 = undefined;
		
					try {
						for (var _iterator23 = other.edges()[Symbol.iterator](), _step23; !(_iteratorNormalCompletion23 = (_step23 = _iterator23.next()).done); _iteratorNormalCompletion23 = true) {
							var _step23$value = _slicedToArray(_step23.value, 2);
		
							var from = _step23$value[0];
							var to = _step23$value[1];
		
							this.addEdge(from, to, mE(this.edgeValue(from, to), other.edgeValue(from, to), from, to));
						}
					} catch (err) {
						_didIteratorError23 = true;
						_iteratorError23 = err;
					} finally {
						try {
							if (!_iteratorNormalCompletion23 && _iterator23["return"]) {
								_iterator23["return"]();
							}
						} finally {
							if (_didIteratorError23) {
								throw _iteratorError23;
							}
						}
					}
				}
		
				/**
		   * Create a clone of this graph.
		   * @param [trV] {function(*, string): *}
		   *     a custom transformation function for values stored in vertices;
		   *     defaults to the identity function; The first argument is the
		   *     value to clone. The second is the corresponding `key`.
		   * @param [trE] {function(*, string, string): *}
		   *     a custom transformation function for values stored in edges;
		   *     defaults to the function given for `trV`; The first argument
		   *     is the value to clone. The second and third are the `from`
		   *     and `to` keys respectively.
		   * @returns {Graph} a clone of this graph
		   */
			}, {
				key: "clone",
				value: function clone() {
					var trV = arguments.length <= 0 || arguments[0] === undefined ? function (v) {
						return v;
					} : arguments[0];
					var trE = arguments.length <= 1 || arguments[1] === undefined ? trV : arguments[1];
					return (function () {
						var result = new Graph();
						result.mergeIn(this, function (v1, v2, key) {
							return trV(v2, key);
						}, function (v1, v2, from, to) {
							return trE(v2, from, to);
						});
						return result;
					}).apply(this, arguments);
				}
		
				/**
		   * Create a clone of this graph, but without any transitive edges.
		   * @param [trV] {function(*, string): *}
		   *     a custom transformation function for values stored in vertices;
		   *     defaults to the identity function; The first argument is the
		   *     value to clone. The second is the corresponding `key`.
		   * @param [trE] {function(*, string, string): *}
		   *     a custom transformation function for values stored in edges;
		   *     defaults to the function given for `trV`; The first argument
		   *     is the value to clone. The second and third are the `from`
		   *     and `to` keys respectively.
		   * @returns {Graph} a clone of this graph with all transitive edges removed
		   */
			}, {
				key: "transitiveReduction",
				value: function transitiveReduction(trV, trE) {
					// argument defaults are handled in `clone`
					var result = this.clone(trV, trE);
					var _iteratorNormalCompletion24 = true;
					var _didIteratorError24 = false;
					var _iteratorError24 = undefined;
		
					try {
						for (var _iterator24 = this.vertices()[Symbol.iterator](), _step24; !(_iteratorNormalCompletion24 = (_step24 = _iterator24.next()).done); _iteratorNormalCompletion24 = true) {
							var _step24$value = _slicedToArray(_step24.value, 1);
		
							var x = _step24$value[0];
							var _iteratorNormalCompletion25 = true;
							var _didIteratorError25 = false;
							var _iteratorError25 = undefined;
		
							try {
								for (var _iterator25 = this.vertices()[Symbol.iterator](), _step25; !(_iteratorNormalCompletion25 = (_step25 = _iterator25.next()).done); _iteratorNormalCompletion25 = true) {
									var _step25$value = _slicedToArray(_step25.value, 1);
		
									var y = _step25$value[0];
		
									if (result.hasEdge(x, y)) {
										var _iteratorNormalCompletion26 = true;
										var _didIteratorError26 = false;
										var _iteratorError26 = undefined;
		
										try {
											for (var _iterator26 = this.vertices()[Symbol.iterator](), _step26; !(_iteratorNormalCompletion26 = (_step26 = _iterator26.next()).done); _iteratorNormalCompletion26 = true) {
												var _step26$value = _slicedToArray(_step26.value, 1);
		
												var z = _step26$value[0];
		
												if (result.hasPath(y, z)) result.removeEdge(x, z);
											}
										} catch (err) {
											_didIteratorError26 = true;
											_iteratorError26 = err;
										} finally {
											try {
												if (!_iteratorNormalCompletion26 && _iterator26["return"]) {
													_iterator26["return"]();
												}
											} finally {
												if (_didIteratorError26) {
													throw _iteratorError26;
												}
											}
										}
									}
								}
							} catch (err) {
								_didIteratorError25 = true;
								_iteratorError25 = err;
							} finally {
								try {
									if (!_iteratorNormalCompletion25 && _iterator25["return"]) {
										_iterator25["return"]();
									}
								} finally {
									if (_didIteratorError25) {
										throw _iteratorError25;
									}
								}
							}
						}
					} catch (err) {
						_didIteratorError24 = true;
						_iteratorError24 = err;
					} finally {
						try {
							if (!_iteratorNormalCompletion24 && _iterator24["return"]) {
								_iterator24["return"]();
							}
						} finally {
							if (_didIteratorError24) {
								throw _iteratorError24;
							}
						}
					}
		
					return result;
				}
		
				/**
		   * This method replaces stretches of non-branching directed pathway into single edges.
		   * More specifically, it identifies all 'nexus' vertices in the graph and preserves them.
		   * It then removes all other vertices and all edges from the graph, then inserts edges
		   * between nexuses that summarize the connectivity that was there before.
		   *
		   * A nexus is any vertex that is *not* characterized by '1 edge in, 1 edge out'.
		   * A custom `isNexus` function may be provided to manually select additional vertices
		   * that should be preserved as nexus.
		   * @param [isNexus] {function(string, *): boolean}
		   *                  a predicate for identifying additional vertices that should be treated as nexus;
		   *                  It receives a `key` and `value` associated to a vertex and should return
		   *                  true if and only if that vertex should be a nexus.
		   * @throws {Graph.BranchlessCycleError} if the graph contains a cycle with no branches or nexuses
		   */
			}, {
				key: "contractPaths",
				value: function contractPaths() {
					var _this2 = this;
		
					var isNexus = arguments.length <= 0 || arguments[0] === undefined ? function () {
						return false;
					} : arguments[0];
		
					/* what makes a a vertex a nexus (start/end-point) */
					var nexuses = new Set([].concat(_toConsumableArray(this.vertices())).filter(function (_ref) {
						var _ref2 = _slicedToArray(_ref, 2);
		
						var key = _ref2[0];
						var val = _ref2[1];
						return _this2.outDegree(key) !== 1 || _this2.inDegree(key) !== 1 || isNexus(key, val);
					}).map(function (_ref3) {
						var _ref32 = _slicedToArray(_ref3, 1);
		
						var key = _ref32[0];
						return key;
					}));
		
					/* error if there is a branch-less cycle */
					{
						var _iteratorNormalCompletion29;
		
						var _didIteratorError29;
		
						var _iteratorError29;
		
						var _iterator29, _step29;
		
						(function () {
							var unhandledVertices = new Set([].concat(_toConsumableArray(_this2.vertices())).map(function (_ref4) {
								var _ref42 = _slicedToArray(_ref4, 1);
		
								var key = _ref42[0];
								return key;
							}));
							var checkForBlCycle = function checkForBlCycle(key) {
								if (!unhandledVertices.has(key)) {
									return;
								}
								unhandledVertices["delete"](key);
								var _iteratorNormalCompletion27 = true;
								var _didIteratorError27 = false;
								var _iteratorError27 = undefined;
		
								try {
									for (var _iterator27 = _this2.verticesFrom(key)[Symbol.iterator](), _step27; !(_iteratorNormalCompletion27 = (_step27 = _iterator27.next()).done); _iteratorNormalCompletion27 = true) {
										var _step27$value = _slicedToArray(_step27.value, 1);
		
										var next = _step27$value[0];
										checkForBlCycle(next);
									}
								} catch (err) {
									_didIteratorError27 = true;
									_iteratorError27 = err;
								} finally {
									try {
										if (!_iteratorNormalCompletion27 && _iterator27["return"]) {
											_iterator27["return"]();
										}
									} finally {
										if (_didIteratorError27) {
											throw _iteratorError27;
										}
									}
								}
		
								var _iteratorNormalCompletion28 = true;
								var _didIteratorError28 = false;
								var _iteratorError28 = undefined;
		
								try {
									for (var _iterator28 = _this2.verticesTo(key)[Symbol.iterator](), _step28; !(_iteratorNormalCompletion28 = (_step28 = _iterator28.next()).done); _iteratorNormalCompletion28 = true) {
										var _step28$value = _slicedToArray(_step28.value, 1);
		
										var next = _step28$value[0];
										checkForBlCycle(next);
									}
								} catch (err) {
									_didIteratorError28 = true;
									_iteratorError28 = err;
								} finally {
									try {
										if (!_iteratorNormalCompletion28 && _iterator28["return"]) {
											_iterator28["return"]();
										}
									} finally {
										if (_didIteratorError28) {
											throw _iteratorError28;
										}
									}
								}
							};
							_iteratorNormalCompletion29 = true;
							_didIteratorError29 = false;
							_iteratorError29 = undefined;
		
							try {
								for (_iterator29 = nexuses[Symbol.iterator](); !(_iteratorNormalCompletion29 = (_step29 = _iterator29.next()).done); _iteratorNormalCompletion29 = true) {
									var key = _step29.value;
									checkForBlCycle(key);
								}
							} catch (err) {
								_didIteratorError29 = true;
								_iteratorError29 = err;
							} finally {
								try {
									if (!_iteratorNormalCompletion29 && _iterator29["return"]) {
										_iterator29["return"]();
									}
								} finally {
									if (_didIteratorError29) {
										throw _iteratorError29;
									}
								}
							}
		
							if (unhandledVertices.size > 0) {
								var startingKey = unhandledVertices.values().next().value,
								    cycle = [],
								    current = startingKey;
								do {
									cycle.push(current);
									current = _this2.verticesFrom(current).next().value[0];
								} while (current !== startingKey);
								throw new Graph.BranchlessCycleError(cycle);
							}
						})();
					}
		
					/* bookkeeping */
					var contractionsToAdd = new Map();
		
					/* register the path starting with the given edge */
					var startPath = function startPath(start, next, backwards) {
						/* functions to help branch on `backwards` */
						var fromTo = function fromTo() {
							var strt = arguments.length <= 0 || arguments[0] === undefined ? start : arguments[0];
							var nxt = arguments.length <= 1 || arguments[1] === undefined ? next : arguments[1];
							return backwards ? [nxt, strt] : [strt, nxt];
						};
						var verticesNext = function verticesNext(v) {
							return backwards ? _this2.verticesTo(v) : _this2.verticesFrom(v);
						};
		
						/* bookkeeping */
						var verticesToRemove = new Set();
						var edgesToRemove = new Set();
						var path = new Graph();
		
						/* process the start of the path */
						path.addVertex(start, _this2.vertexValue(start));
						path.addVertex(next, _this2.vertexValue(next));
						path.addNewEdge.apply(path, _toConsumableArray(fromTo()).concat([_this2.edgeValue.apply(_this2, _toConsumableArray(fromTo()))]));
						edgesToRemove.add(fromTo());
		
						/* process as [current, next] moves across the path */
						var current = undefined;
						while (!nexuses.has(next)) {
							var _ref5 = [next, verticesNext(next).next().value[0]];
							current = _ref5[0];
							next = _ref5[1];
		
							path.addVertex(next, _this2.vertexValue(next));
							path.addNewEdge.apply(path, _toConsumableArray(fromTo(current, next)).concat([_this2.edgeValue.apply(_this2, _toConsumableArray(fromTo(current, next)))]));
							verticesToRemove.add(current);
							edgesToRemove.add(fromTo(current, next));
						}
		
						/* register new path contraction */
						if (!contractionsToAdd.get(fromTo()[0])) {
							contractionsToAdd.set(fromTo()[0], new Map());
						}
						if (!contractionsToAdd.get(fromTo()[0]).get(fromTo()[1])) {
							contractionsToAdd.get(fromTo()[0]).set(fromTo()[1], new Graph());
						}
						contractionsToAdd.get(fromTo()[0]).get(fromTo()[1]).mergeIn(path);
		
						/* remove old edges and vertices */
						var _iteratorNormalCompletion30 = true;
						var _didIteratorError30 = false;
						var _iteratorError30 = undefined;
		
						try {
							for (var _iterator30 = edgesToRemove[Symbol.iterator](), _step30; !(_iteratorNormalCompletion30 = (_step30 = _iterator30.next()).done); _iteratorNormalCompletion30 = true) {
								var key = _step30.value;
								_this2.removeExistingEdge.apply(_this2, _toConsumableArray(key));
							}
						} catch (err) {
							_didIteratorError30 = true;
							_iteratorError30 = err;
						} finally {
							try {
								if (!_iteratorNormalCompletion30 && _iterator30["return"]) {
									_iterator30["return"]();
								}
							} finally {
								if (_didIteratorError30) {
									throw _iteratorError30;
								}
							}
						}
		
						var _iteratorNormalCompletion31 = true;
						var _didIteratorError31 = false;
						var _iteratorError31 = undefined;
		
						try {
							for (var _iterator31 = verticesToRemove[Symbol.iterator](), _step31; !(_iteratorNormalCompletion31 = (_step31 = _iterator31.next()).done); _iteratorNormalCompletion31 = true) {
								var key = _step31.value;
								_this2.destroyExistingVertex(key);
							}
						} catch (err) {
							_didIteratorError31 = true;
							_iteratorError31 = err;
						} finally {
							try {
								if (!_iteratorNormalCompletion31 && _iterator31["return"]) {
									_iterator31["return"]();
								}
							} finally {
								if (_didIteratorError31) {
									throw _iteratorError31;
								}
							}
						}
					};
		
					/* process paths starting at all nexus points */
					var _iteratorNormalCompletion32 = true;
					var _didIteratorError32 = false;
					var _iteratorError32 = undefined;
		
					try {
						for (var _iterator32 = nexuses[Symbol.iterator](), _step32; !(_iteratorNormalCompletion32 = (_step32 = _iterator32.next()).done); _iteratorNormalCompletion32 = true) {
							var first = _step32.value;
							var _iteratorNormalCompletion34 = true;
							var _didIteratorError34 = false;
							var _iteratorError34 = undefined;
		
							try {
								for (var _iterator34 = this.verticesFrom(first)[Symbol.iterator](), _step34; !(_iteratorNormalCompletion34 = (_step34 = _iterator34.next()).done); _iteratorNormalCompletion34 = true) {
									var _step34$value = _slicedToArray(_step34.value, 1);
		
									var next = _step34$value[0];
									startPath(first, next, false);
								}
							} catch (err) {
								_didIteratorError34 = true;
								_iteratorError34 = err;
							} finally {
								try {
									if (!_iteratorNormalCompletion34 && _iterator34["return"]) {
										_iterator34["return"]();
									}
								} finally {
									if (_didIteratorError34) {
										throw _iteratorError34;
									}
								}
							}
		
							var _iteratorNormalCompletion35 = true;
							var _didIteratorError35 = false;
							var _iteratorError35 = undefined;
		
							try {
								for (var _iterator35 = this.verticesTo(first)[Symbol.iterator](), _step35; !(_iteratorNormalCompletion35 = (_step35 = _iterator35.next()).done); _iteratorNormalCompletion35 = true) {
									var _step35$value = _slicedToArray(_step35.value, 1);
		
									var next = _step35$value[0];
									startPath(first, next, true);
								}
							} catch (err) {
								_didIteratorError35 = true;
								_iteratorError35 = err;
							} finally {
								try {
									if (!_iteratorNormalCompletion35 && _iterator35["return"]) {
										_iterator35["return"]();
									}
								} finally {
									if (_didIteratorError35) {
										throw _iteratorError35;
									}
								}
							}
						}
		
						/* add the replacement edges */
					} catch (err) {
						_didIteratorError32 = true;
						_iteratorError32 = err;
					} finally {
						try {
							if (!_iteratorNormalCompletion32 && _iterator32["return"]) {
								_iterator32["return"]();
							}
						} finally {
							if (_didIteratorError32) {
								throw _iteratorError32;
							}
						}
					}
		
					var _iteratorNormalCompletion33 = true;
					var _didIteratorError33 = false;
					var _iteratorError33 = undefined;
		
					try {
						for (var _iterator33 = contractionsToAdd[Symbol.iterator](), _step33; !(_iteratorNormalCompletion33 = (_step33 = _iterator33.next()).done); _iteratorNormalCompletion33 = true) {
							var _step33$value = _slicedToArray(_step33.value, 2);
		
							var from = _step33$value[0];
							var toVal = _step33$value[1];
							var _iteratorNormalCompletion36 = true;
							var _didIteratorError36 = false;
							var _iteratorError36 = undefined;
		
							try {
								for (var _iterator36 = toVal[Symbol.iterator](), _step36; !(_iteratorNormalCompletion36 = (_step36 = _iterator36.next()).done); _iteratorNormalCompletion36 = true) {
									var _step36$value = _slicedToArray(_step36.value, 2);
		
									var to = _step36$value[0];
									var rememberedPath = _step36$value[1];
		
									this.addNewEdge(from, to, rememberedPath);
								}
							} catch (err) {
								_didIteratorError36 = true;
								_iteratorError36 = err;
							} finally {
								try {
									if (!_iteratorNormalCompletion36 && _iterator36["return"]) {
										_iterator36["return"]();
									}
								} finally {
									if (_didIteratorError36) {
										throw _iteratorError36;
									}
								}
							}
						}
					} catch (err) {
						_didIteratorError33 = true;
						_iteratorError33 = err;
					} finally {
						try {
							if (!_iteratorNormalCompletion33 && _iterator33["return"]) {
								_iterator33["return"]();
							}
						} finally {
							if (_didIteratorError33) {
								throw _iteratorError33;
							}
						}
					}
				}
		
				////////////////////////////////
				////////// Assertions //////////
				////////////////////////////////
		
			}, {
				key: _expectVertices,
				value: function value() {
					var _this3 = this;
		
					for (var _len2 = arguments.length, keys = Array(_len2), _key3 = 0; _key3 < _len2; _key3++) {
						keys[_key3] = arguments[_key3];
					}
		
					var missingVertices = keys.filter(function (k) {
						return !_this3.hasVertex(k);
					});
					if (missingVertices.length) {
						throw new (_bind.apply(Graph.VertexNotExistsError, [null].concat(_toConsumableArray(missingVertices))))();
					}
				}
			}, {
				key: _expectVerticesAbsent,
				value: function value() {
					var _this4 = this;
		
					for (var _len3 = arguments.length, keys = Array(_len3), _key4 = 0; _key4 < _len3; _key4++) {
						keys[_key4] = arguments[_key4];
					}
		
					var presentVertices = keys.filter(function (k) {
						return _this4.hasVertex(k);
					});
					if (presentVertices.length) {
						throw new (_bind.apply(Graph.VertexExistsError, [null].concat(_toConsumableArray(presentVertices.map(function (k) {
							return [k, _this4.vertexValue(k)];
						})))))();
					}
				}
			}, {
				key: _expectEdges,
				value: function value() {
					var _this5 = this;
		
					for (var _len4 = arguments.length, keys = Array(_len4), _key5 = 0; _key5 < _len4; _key5++) {
						keys[_key5] = arguments[_key5];
					}
		
					var absentEdges = keys.filter(function (k) {
						return !_this5.hasEdge.apply(_this5, _toConsumableArray(k));
					});
					if (absentEdges.length) {
						throw new (_bind.apply(Graph.EdgeNotExistsError, [null].concat(_toConsumableArray(absentEdges))))();
					}
				}
			}, {
				key: _expectEdgesAbsent,
				value: function value() {
					var _this6 = this;
		
					for (var _len5 = arguments.length, keys = Array(_len5), _key6 = 0; _key6 < _len5; _key6++) {
						keys[_key6] = arguments[_key6];
					}
		
					var presentEdges = keys.filter(function (k) {
						return _this6.hasEdge.apply(_this6, _toConsumableArray(k));
					});
					if (presentEdges.length) {
						throw new (_bind.apply(Graph.EdgeExistsError, [null].concat(_toConsumableArray(presentEdges.map(function (k) {
							return [k, _this6.edgeValue.apply(_this6, _toConsumableArray(k))];
						})))))();
					}
				}
			}, {
				key: _expectNoConnectedEdges,
				value: function value(key) {
					var edges = [];
					var _iteratorNormalCompletion37 = true;
					var _didIteratorError37 = false;
					var _iteratorError37 = undefined;
		
					try {
						for (var _iterator37 = this.verticesFrom(key)[Symbol.iterator](), _step37; !(_iteratorNormalCompletion37 = (_step37 = _iterator37.next()).done); _iteratorNormalCompletion37 = true) {
							var _step37$value = _slicedToArray(_step37.value, 1);
		
							var to = _step37$value[0];
							edges.push([[key, to], this.edgeValue(key, to)]);
						}
					} catch (err) {
						_didIteratorError37 = true;
						_iteratorError37 = err;
					} finally {
						try {
							if (!_iteratorNormalCompletion37 && _iterator37["return"]) {
								_iterator37["return"]();
							}
						} finally {
							if (_didIteratorError37) {
								throw _iteratorError37;
							}
						}
					}
		
					var _iteratorNormalCompletion38 = true;
					var _didIteratorError38 = false;
					var _iteratorError38 = undefined;
		
					try {
						for (var _iterator38 = this.verticesTo(key)[Symbol.iterator](), _step38; !(_iteratorNormalCompletion38 = (_step38 = _iterator38.next()).done); _iteratorNormalCompletion38 = true) {
							var _step38$value = _slicedToArray(_step38.value, 1);
		
							var from = _step38$value[0];
							edges.push([[from, key], this.edgeValue(from, key)]);
						}
					} catch (err) {
						_didIteratorError38 = true;
						_iteratorError38 = err;
					} finally {
						try {
							if (!_iteratorNormalCompletion38 && _iterator38["return"]) {
								_iterator38["return"]();
							}
						} finally {
							if (_didIteratorError38) {
								throw _iteratorError38;
							}
						}
					}
		
					if (edges.length) {
						throw new (_bind.apply(Graph.HasConnectedEdgesError, [null].concat([key], edges)))();
					}
				}
			}]);
		
			return Graph;
		})();
		
		exports["default"] = Graph;
		Graph.VertexExistsError = (function (_Error) {
			_inherits(VertexExistsError, _Error);
		
			function VertexExistsError() {
				_classCallCheck(this, VertexExistsError);
		
				_get(Object.getPrototypeOf(VertexExistsError.prototype), "constructor", this).call(this);
				/**
		   * the set of relevant vertices as `[key, value]` shaped arrays
		   * @public
		   * @constant vertices
		   * @memberof Graph.VertexExistsError
		   * @instance
		   * @type {Set.<Array>}
		   */
		
				for (var _len6 = arguments.length, vertices = Array(_len6), _key7 = 0; _key7 < _len6; _key7++) {
					vertices[_key7] = arguments[_key7];
				}
		
				this.vertices = new Set(vertices);
				this.message = "This graph has " + (this.vertices.size === 1 ? "a vertex" : "vertices") + " '" + [].concat(_toConsumableArray(this.vertices)).map(function (_ref6) {
					var _ref62 = _slicedToArray(_ref6, 1);
		
					var key = _ref62[0];
					return key;
				}).join("', '") + "'";
			}
		
			return VertexExistsError;
		})(Error);
		
		/**
		 * @class
		 * @classdesc This type of error is thrown when specific vertices are expected to exist, but don't.
		 * @extends Error
		 */
		Graph.VertexNotExistsError = (function (_Error2) {
			_inherits(VertexNotExistsError, _Error2);
		
			function VertexNotExistsError() {
				_classCallCheck(this, VertexNotExistsError);
		
				_get(Object.getPrototypeOf(VertexNotExistsError.prototype), "constructor", this).call(this);
				/**
		   * the set of relevant vertex keys
		   * @public
		   * @constant vertices
		   * @memberof Graph.VertexNotExistsError
		   * @instance
		   * @type {Set.<string>}
		   */
		
				for (var _len7 = arguments.length, keys = Array(_len7), _key8 = 0; _key8 < _len7; _key8++) {
					keys[_key8] = arguments[_key8];
				}
		
				this.vertices = new Set(keys);
				this.message = "This graph does not have " + (this.vertices.size === 1 ? "a vertex" : "vertices") + " '" + [].concat(_toConsumableArray(this.vertices)).join("', '") + "'";
			}
		
			return VertexNotExistsError;
		})(Error);
		
		/**
		 * @class
		 * @classdesc This type of error is thrown when specific edges are expected not to exist, but do.
		 * @extends Error
		 */
		Graph.EdgeExistsError = (function (_Error3) {
			_inherits(EdgeExistsError, _Error3);
		
			function EdgeExistsError() {
				_classCallCheck(this, EdgeExistsError);
		
				_get(Object.getPrototypeOf(EdgeExistsError.prototype), "constructor", this).call(this);
				/**
		   * the set of relevant edges as `[[from, to], value]` shaped arrays
		   * @public
		   * @constant edges
		   * @memberof Graph.EdgeExistsError
		   * @instance
		   * @type {Set.<Array>}
		   */
		
				for (var _len8 = arguments.length, edges = Array(_len8), _key9 = 0; _key9 < _len8; _key9++) {
					edges[_key9] = arguments[_key9];
				}
		
				this.edges = new Set(edges);
				this.message = "This graph has " + (this.edges.size === 1 ? "an edge" : "edges") + " " + [].concat(_toConsumableArray(this.edges)).map(function (_ref7) {
					var _ref72 = _slicedToArray(_ref7, 1);
		
					var _ref72$0 = _slicedToArray(_ref72[0], 2);
		
					var from = _ref72$0[0];
					var to = _ref72$0[1];
					return "['" + from + "', '" + to + "']";
				}).join(", ");
			}
		
			return EdgeExistsError;
		})(Error);
		
		/**
		 * @class
		 * @classdesc This type of error is thrown when specific edges are expected to exist, but don't.
		 * @extends Error
		 */
		Graph.EdgeNotExistsError = (function (_Error4) {
			_inherits(EdgeNotExistsError, _Error4);
		
			function EdgeNotExistsError() {
				_classCallCheck(this, EdgeNotExistsError);
		
				_get(Object.getPrototypeOf(EdgeNotExistsError.prototype), "constructor", this).call(this);
				/**
		   * the set of relevant edge keys as `[from, to]` shaped arrays
		   * @public
		   * @constant edges
		   * @memberof Graph.EdgeNotExistsError
		   * @instance
		   * @type {Set.<Array.<string>>}
		   */
		
				for (var _len9 = arguments.length, edges = Array(_len9), _key10 = 0; _key10 < _len9; _key10++) {
					edges[_key10] = arguments[_key10];
				}
		
				this.edges = new Set(edges);
				this.message = "This graph does not have " + (this.edges.size === 1 ? "an edge" : "edges") + " " + [].concat(_toConsumableArray(this.edges)).map(function (_ref8) {
					var _ref82 = _slicedToArray(_ref8, 2);
		
					var from = _ref82[0];
					var to = _ref82[1];
					return "['" + from + "', '" + to + "']";
				}).join(", ");
			}
		
			return EdgeNotExistsError;
		})(Error);
		
		/**
		 * @class
		 * @classdesc This type of error is thrown when a vertex is expected not to have any connected edges, but does.
		 * @extends Graph.EdgeExistsError
		 */
		Graph.HasConnectedEdgesError = (function (_Graph$EdgeExistsError) {
			_inherits(HasConnectedEdgesError, _Graph$EdgeExistsError);
		
			function HasConnectedEdgesError(key) {
				_classCallCheck(this, HasConnectedEdgesError);
		
				for (var _len10 = arguments.length, edges = Array(_len10 > 1 ? _len10 - 1 : 0), _key11 = 1; _key11 < _len10; _key11++) {
					edges[_key11 - 1] = arguments[_key11];
				}
		
				_get(Object.getPrototypeOf(HasConnectedEdgesError.prototype), "constructor", this).apply(this, edges);
				/**
		   * the key of the vertex that has connected edges
		   * @public
		   * @constant vertex
		   * @memberof Graph.HasConnectedEdgesError
		   * @instance
		   * @type {string}
		   */
				this.vertex = key;
				this.message = "The '" + key + "' vertex has connected " + (this.edges.size === 1 ? "an edge" : "edges") + " " + [].concat(_toConsumableArray(this.edges)).map(function (_ref9) {
					var _ref92 = _slicedToArray(_ref9, 1);
		
					var _ref92$0 = _slicedToArray(_ref92[0], 2);
		
					var from = _ref92$0[0];
					var to = _ref92$0[1];
					return "['" + from + "', '" + to + "']";
				}).join(", ");
			}
		
			return HasConnectedEdgesError;
		})(Graph.EdgeExistsError);
		
		/**
		 * @class
		 * @classdesc This type of error is thrown when a graph is expected not to have a directed cycle, but does.
		 * @extends Error
		 */
		Graph.CycleError = (function (_Error5) {
			_inherits(CycleError, _Error5);
		
			function CycleError(cycle) {
				_classCallCheck(this, CycleError);
		
				_get(Object.getPrototypeOf(CycleError.prototype), "constructor", this).call(this);
				/**
		   * the vertices involved in the cycle, in order but with an unspecified starting point
		   * @public
		   * @constant cycle
		   * @memberof Graph.CycleError
		   * @instance
		   * @type {Array.<string>}
		   */
				this.cycle = cycle;
				this.message = "This graph contains a cycle: " + cycle;
			}
		
			return CycleError;
		})(Error);
		
		/**
		 * @class
		 * @classdesc This type of error is thrown when a graph is expected not to have a branch-less directed cycle, but does.
		 * @extends Graph.CycleError
		 */
		Graph.BranchlessCycleError = (function (_Graph$CycleError) {
			_inherits(BranchlessCycleError, _Graph$CycleError);
		
			function BranchlessCycleError(cycle) {
				_classCallCheck(this, BranchlessCycleError);
		
				_get(Object.getPrototypeOf(BranchlessCycleError.prototype), "constructor", this).call(this, cycle);
				this.message = "This graph contains a branch-less cycle: " + cycle;
			}
		
			return BranchlessCycleError;
		})(Graph.CycleError);
		module.exports = exports["default"];
		// stack
	
		// This algorithm is based on the following article:
		// Enumeration of the elementary circuits of a directed graph
		// R. Tarjan, SIAM Journal on Computing, 2 (1973), pp. 211-216
		// http://dx.doi.org/10.1137/0202017
		// -----
		// TODO: implement the improved version as defined by Johnson:
		// Finding all the elementary circuits of a directed graph.
		// D. B. Johnson, SIAM Journal on Computing 4, no. 1, 77-84, 1975.
		// http://dx.doi.org/10.1137/0204007
	
		/* bookkeeping */
	
		/* the main recursive backtracking algorithm */
		// if a simple cycle continuing the partial path on the pointStack has been found
	
		/* start backtracking from each vertex in the graph */
	
	/***/ }
	
	/******/ })
	});
	;
	//# sourceMappingURL=graph.js.map

/***/ },
/* 139 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var fn = __webpack_require__(119);
	
	module.exports = function get() {
	  return fn.apply(undefined, [this].concat(Array.prototype.slice.apply(arguments)));
	};


/***/ },
/* 140 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var fn = __webpack_require__(372);
	
	module.exports = function inRange() {
	  return fn.apply(undefined, [this].concat(Array.prototype.slice.apply(arguments)));
	};


/***/ },
/* 141 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var fn = __webpack_require__(8);
	
	module.exports = function isArray() {
	  return fn.apply(undefined, [this].concat(Array.prototype.slice.apply(arguments)));
	};


/***/ },
/* 142 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var fn = __webpack_require__(378);
	
	module.exports = function isNull() {
	  return fn.apply(undefined, [this].concat(Array.prototype.slice.apply(arguments)));
	};


/***/ },
/* 143 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var fn = __webpack_require__(9);
	
	module.exports = function keys() {
	  return fn.apply(undefined, [this].concat(Array.prototype.slice.apply(arguments)));
	};


/***/ },
/* 144 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var fn = __webpack_require__(385);
	
	module.exports = function map() {
	  return fn.apply(undefined, [this].concat(Array.prototype.slice.apply(arguments)));
	};


/***/ },
/* 145 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(40),
	    root = __webpack_require__(16);
	
	/* Built-in method references that are verified to be native. */
	var Set = getNative(root, 'Set');
	
	module.exports = Set;


/***/ },
/* 146 */
/***/ function(module, exports, __webpack_require__) {

	var MapCache = __webpack_require__(109),
	    setCacheAdd = __webpack_require__(351),
	    setCacheHas = __webpack_require__(352);
	
	/**
	 *
	 * Creates an array cache object to store unique values.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [values] The values to cache.
	 */
	function SetCache(values) {
	  var index = -1,
	      length = values ? values.length : 0;
	
	  this.__data__ = new MapCache;
	  while (++index < length) {
	    this.add(values[index]);
	  }
	}
	
	// Add methods to `SetCache`.
	SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
	SetCache.prototype.has = setCacheHas;
	
	module.exports = SetCache;


/***/ },
/* 147 */
/***/ function(module, exports, __webpack_require__) {

	var root = __webpack_require__(16);
	
	/** Built-in value references. */
	var Uint8Array = root.Uint8Array;
	
	module.exports = Uint8Array;


/***/ },
/* 148 */
/***/ function(module, exports) {

	/**
	 * A faster alternative to `Function#apply`, this function invokes `func`
	 * with the `this` binding of `thisArg` and the arguments of `args`.
	 *
	 * @private
	 * @param {Function} func The function to invoke.
	 * @param {*} thisArg The `this` binding of `func`.
	 * @param {Array} args The arguments to invoke `func` with.
	 * @returns {*} Returns the result of `func`.
	 */
	function apply(func, thisArg, args) {
	  switch (args.length) {
	    case 0: return func.call(thisArg);
	    case 1: return func.call(thisArg, args[0]);
	    case 2: return func.call(thisArg, args[0], args[1]);
	    case 3: return func.call(thisArg, args[0], args[1], args[2]);
	  }
	  return func.apply(thisArg, args);
	}
	
	module.exports = apply;


/***/ },
/* 149 */
/***/ function(module, exports) {

	/**
	 * Appends the elements of `values` to `array`.
	 *
	 * @private
	 * @param {Array} array The array to modify.
	 * @param {Array} values The values to append.
	 * @returns {Array} Returns `array`.
	 */
	function arrayPush(array, values) {
	  var index = -1,
	      length = values.length,
	      offset = array.length;
	
	  while (++index < length) {
	    array[offset + index] = values[index];
	  }
	  return array;
	}
	
	module.exports = arrayPush;


/***/ },
/* 150 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `_.reduce` for arrays without support for
	 * iteratee shorthands.
	 *
	 * @private
	 * @param {Array} [array] The array to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @param {*} [accumulator] The initial value.
	 * @param {boolean} [initAccum] Specify using the first element of `array` as
	 *  the initial value.
	 * @returns {*} Returns the accumulated value.
	 */
	function arrayReduce(array, iteratee, accumulator, initAccum) {
	  var index = -1,
	      length = array ? array.length : 0;
	
	  if (initAccum && length) {
	    accumulator = array[++index];
	  }
	  while (++index < length) {
	    accumulator = iteratee(accumulator, array[index], index, array);
	  }
	  return accumulator;
	}
	
	module.exports = arrayReduce;


/***/ },
/* 151 */
/***/ function(module, exports, __webpack_require__) {

	var castPath = __webpack_require__(113),
	    isKey = __webpack_require__(54),
	    toKey = __webpack_require__(41);
	
	/**
	 * The base implementation of `_.get` without support for default values.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array|string} path The path of the property to get.
	 * @returns {*} Returns the resolved value.
	 */
	function baseGet(object, path) {
	  path = isKey(path, object) ? [path] : castPath(path);
	
	  var index = 0,
	      length = path.length;
	
	  while (object != null && index < length) {
	    object = object[toKey(path[index++])];
	  }
	  return (index && index == length) ? object : undefined;
	}
	
	module.exports = baseGet;


/***/ },
/* 152 */
/***/ function(module, exports, __webpack_require__) {

	var getPrototype = __webpack_require__(159);
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/**
	 * The base implementation of `_.has` without support for deep paths.
	 *
	 * @private
	 * @param {Object} [object] The object to query.
	 * @param {Array|string} key The key to check.
	 * @returns {boolean} Returns `true` if `key` exists, else `false`.
	 */
	function baseHas(object, key) {
	  // Avoid a bug in IE 10-11 where objects with a [[Prototype]] of `null`,
	  // that are composed entirely of index properties, return `false` for
	  // `hasOwnProperty` checks of them.
	  return object != null &&
	    (hasOwnProperty.call(object, key) ||
	      (typeof object == 'object' && key in object && getPrototype(object) === null));
	}
	
	module.exports = baseHas;


/***/ },
/* 153 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.times` without support for iteratee shorthands
	 * or max array length checks.
	 *
	 * @private
	 * @param {number} n The number of times to invoke `iteratee`.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns the array of results.
	 */
	function baseTimes(n, iteratee) {
	  var index = -1,
	      result = Array(n);
	
	  while (++index < n) {
	    result[index] = iteratee(index);
	  }
	  return result;
	}
	
	module.exports = baseTimes;


/***/ },
/* 154 */
/***/ function(module, exports, __webpack_require__) {

	var Symbol = __webpack_require__(70),
	    isSymbol = __webpack_require__(57);
	
	/** Used as references for various `Number` constants. */
	var INFINITY = 1 / 0;
	
	/** Used to convert symbols to primitives and strings. */
	var symbolProto = Symbol ? Symbol.prototype : undefined,
	    symbolToString = symbolProto ? symbolProto.toString : undefined;
	
	/**
	 * The base implementation of `_.toString` which doesn't convert nullish
	 * values to empty strings.
	 *
	 * @private
	 * @param {*} value The value to process.
	 * @returns {string} Returns the string.
	 */
	function baseToString(value) {
	  // Exit early for strings to avoid a performance hit in some environments.
	  if (typeof value == 'string') {
	    return value;
	  }
	  if (isSymbol(value)) {
	    return symbolToString ? symbolToString.call(value) : '';
	  }
	  var result = (value + '');
	  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
	}
	
	module.exports = baseToString;


/***/ },
/* 155 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.unary` without support for storing metadata.
	 *
	 * @private
	 * @param {Function} func The function to cap arguments for.
	 * @returns {Function} Returns the new capped function.
	 */
	function baseUnary(func) {
	  return function(value) {
	    return func(value);
	  };
	}
	
	module.exports = baseUnary;


/***/ },
/* 156 */
/***/ function(module, exports, __webpack_require__) {

	var SetCache = __webpack_require__(146),
	    arrayIncludes = __webpack_require__(265),
	    arrayIncludesWith = __webpack_require__(266),
	    cacheHas = __webpack_require__(302),
	    createSet = __webpack_require__(318),
	    setToArray = __webpack_require__(78);
	
	/** Used as the size to enable large array optimizations. */
	var LARGE_ARRAY_SIZE = 200;
	
	/**
	 * The base implementation of `_.uniqBy` without support for iteratee shorthands.
	 *
	 * @private
	 * @param {Array} array The array to inspect.
	 * @param {Function} [iteratee] The iteratee invoked per element.
	 * @param {Function} [comparator] The comparator invoked per element.
	 * @returns {Array} Returns the new duplicate free array.
	 */
	function baseUniq(array, iteratee, comparator) {
	  var index = -1,
	      includes = arrayIncludes,
	      length = array.length,
	      isCommon = true,
	      result = [],
	      seen = result;
	
	  if (comparator) {
	    isCommon = false;
	    includes = arrayIncludesWith;
	  }
	  else if (length >= LARGE_ARRAY_SIZE) {
	    var set = iteratee ? null : createSet(array);
	    if (set) {
	      return setToArray(set);
	    }
	    isCommon = false;
	    includes = cacheHas;
	    seen = new SetCache;
	  }
	  else {
	    seen = iteratee ? [] : result;
	  }
	  outer:
	  while (++index < length) {
	    var value = array[index],
	        computed = iteratee ? iteratee(value) : value;
	
	    value = (comparator || value !== 0) ? value : 0;
	    if (isCommon && computed === computed) {
	      var seenIndex = seen.length;
	      while (seenIndex--) {
	        if (seen[seenIndex] === computed) {
	          continue outer;
	        }
	      }
	      if (iteratee) {
	        seen.push(computed);
	      }
	      result.push(value);
	    }
	    else if (!includes(seen, computed, comparator)) {
	      if (seen !== result) {
	        seen.push(computed);
	      }
	      result.push(value);
	    }
	  }
	  return result;
	}
	
	module.exports = baseUniq;


/***/ },
/* 157 */
/***/ function(module, exports, __webpack_require__) {

	var SetCache = __webpack_require__(146),
	    arraySome = __webpack_require__(267);
	
	/** Used to compose bitmasks for comparison styles. */
	var UNORDERED_COMPARE_FLAG = 1,
	    PARTIAL_COMPARE_FLAG = 2;
	
	/**
	 * A specialized version of `baseIsEqualDeep` for arrays with support for
	 * partial deep comparisons.
	 *
	 * @private
	 * @param {Array} array The array to compare.
	 * @param {Array} other The other array to compare.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Function} customizer The function to customize comparisons.
	 * @param {number} bitmask The bitmask of comparison flags. See `baseIsEqual`
	 *  for more details.
	 * @param {Object} stack Tracks traversed `array` and `other` objects.
	 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
	 */
	function equalArrays(array, other, equalFunc, customizer, bitmask, stack) {
	  var isPartial = bitmask & PARTIAL_COMPARE_FLAG,
	      arrLength = array.length,
	      othLength = other.length;
	
	  if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
	    return false;
	  }
	  // Assume cyclic values are equal.
	  var stacked = stack.get(array);
	  if (stacked && stack.get(other)) {
	    return stacked == other;
	  }
	  var index = -1,
	      result = true,
	      seen = (bitmask & UNORDERED_COMPARE_FLAG) ? new SetCache : undefined;
	
	  stack.set(array, other);
	  stack.set(other, array);
	
	  // Ignore non-index properties.
	  while (++index < arrLength) {
	    var arrValue = array[index],
	        othValue = other[index];
	
	    if (customizer) {
	      var compared = isPartial
	        ? customizer(othValue, arrValue, index, other, array, stack)
	        : customizer(arrValue, othValue, index, array, other, stack);
	    }
	    if (compared !== undefined) {
	      if (compared) {
	        continue;
	      }
	      result = false;
	      break;
	    }
	    // Recursively compare arrays (susceptible to call stack limits).
	    if (seen) {
	      if (!arraySome(other, function(othValue, othIndex) {
	            if (!seen.has(othIndex) &&
	                (arrValue === othValue || equalFunc(arrValue, othValue, customizer, bitmask, stack))) {
	              return seen.add(othIndex);
	            }
	          })) {
	        result = false;
	        break;
	      }
	    } else if (!(
	          arrValue === othValue ||
	            equalFunc(arrValue, othValue, customizer, bitmask, stack)
	        )) {
	      result = false;
	      break;
	    }
	  }
	  stack['delete'](array);
	  stack['delete'](other);
	  return result;
	}
	
	module.exports = equalArrays;


/***/ },
/* 158 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {/** Detect free variable `global` from Node.js. */
	var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;
	
	module.exports = freeGlobal;
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 159 */
/***/ function(module, exports, __webpack_require__) {

	var overArg = __webpack_require__(118);
	
	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeGetPrototype = Object.getPrototypeOf;
	
	/**
	 * Gets the `[[Prototype]]` of `value`.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {null|Object} Returns the `[[Prototype]]`.
	 */
	var getPrototype = overArg(nativeGetPrototype, Object);
	
	module.exports = getPrototype;


/***/ },
/* 160 */
/***/ function(module, exports, __webpack_require__) {

	var overArg = __webpack_require__(118),
	    stubArray = __webpack_require__(393);
	
	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeGetSymbols = Object.getOwnPropertySymbols;
	
	/**
	 * Creates an array of the own enumerable symbol properties of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of symbols.
	 */
	var getSymbols = nativeGetSymbols ? overArg(nativeGetSymbols, Object) : stubArray;
	
	module.exports = getSymbols;


/***/ },
/* 161 */
/***/ function(module, exports, __webpack_require__) {

	var baseTimes = __webpack_require__(153),
	    isArguments = __webpack_require__(120),
	    isArray = __webpack_require__(8),
	    isLength = __webpack_require__(80),
	    isString = __webpack_require__(56);
	
	/**
	 * Creates an array of index keys for `object` values of arrays,
	 * `arguments` objects, and strings, otherwise `null` is returned.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array|null} Returns index keys, else `null`.
	 */
	function indexKeys(object) {
	  var length = object ? object.length : undefined;
	  if (isLength(length) &&
	      (isArray(object) || isString(object) || isArguments(object))) {
	    return baseTimes(length, String);
	  }
	  return null;
	}
	
	module.exports = indexKeys;


/***/ },
/* 162 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(11);
	
	/**
	 * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` if suitable for strict
	 *  equality comparisons, else `false`.
	 */
	function isStrictComparable(value) {
	  return value === value && !isObject(value);
	}
	
	module.exports = isStrictComparable;


/***/ },
/* 163 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `matchesProperty` for source values suitable
	 * for strict equality comparisons, i.e. `===`.
	 *
	 * @private
	 * @param {string} key The key of the property to get.
	 * @param {*} srcValue The value to match.
	 * @returns {Function} Returns the new spec function.
	 */
	function matchesStrictComparable(key, srcValue) {
	  return function(object) {
	    if (object == null) {
	      return false;
	    }
	    return object[key] === srcValue &&
	      (srcValue !== undefined || (key in Object(object)));
	  };
	}
	
	module.exports = matchesStrictComparable;


/***/ },
/* 164 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {var freeGlobal = __webpack_require__(158);
	
	/** Detect free variable `exports`. */
	var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;
	
	/** Detect free variable `module`. */
	var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;
	
	/** Detect the popular CommonJS extension `module.exports`. */
	var moduleExports = freeModule && freeModule.exports === freeExports;
	
	/** Detect free variable `process` from Node.js. */
	var freeProcess = moduleExports && freeGlobal.process;
	
	/** Used to access faster Node.js helpers. */
	var nodeUtil = (function() {
	  try {
	    return freeProcess && freeProcess.binding('util');
	  } catch (e) {}
	}());
	
	module.exports = nodeUtil;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(128)(module)))

/***/ },
/* 165 */
/***/ function(module, exports) {

	/** Used to resolve the decompiled source of functions. */
	var funcToString = Function.prototype.toString;
	
	/**
	 * Converts `func` to its source code.
	 *
	 * @private
	 * @param {Function} func The function to process.
	 * @returns {string} Returns the source code.
	 */
	function toSource(func) {
	  if (func != null) {
	    try {
	      return funcToString.call(func);
	    } catch (e) {}
	    try {
	      return (func + '');
	    } catch (e) {}
	  }
	  return '';
	}
	
	module.exports = toSource;


/***/ },
/* 166 */
/***/ function(module, exports) {

	/**
	 * This method returns the first argument it receives.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Util
	 * @param {*} value Any value.
	 * @returns {*} Returns `value`.
	 * @example
	 *
	 * var object = { 'a': 1 };
	 *
	 * console.log(_.identity(object) === object);
	 * // => true
	 */
	function identity(value) {
	  return value;
	}
	
	module.exports = identity;


/***/ },
/* 167 */
/***/ function(module, exports, __webpack_require__) {

	var toNumber = __webpack_require__(169);
	
	/** Used as references for various `Number` constants. */
	var INFINITY = 1 / 0,
	    MAX_INTEGER = 1.7976931348623157e+308;
	
	/**
	 * Converts `value` to a finite number.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.12.0
	 * @category Lang
	 * @param {*} value The value to convert.
	 * @returns {number} Returns the converted number.
	 * @example
	 *
	 * _.toFinite(3.2);
	 * // => 3.2
	 *
	 * _.toFinite(Number.MIN_VALUE);
	 * // => 5e-324
	 *
	 * _.toFinite(Infinity);
	 * // => 1.7976931348623157e+308
	 *
	 * _.toFinite('3.2');
	 * // => 3.2
	 */
	function toFinite(value) {
	  if (!value) {
	    return value === 0 ? value : 0;
	  }
	  value = toNumber(value);
	  if (value === INFINITY || value === -INFINITY) {
	    var sign = (value < 0 ? -1 : 1);
	    return sign * MAX_INTEGER;
	  }
	  return value === value ? value : 0;
	}
	
	module.exports = toFinite;


/***/ },
/* 168 */
/***/ function(module, exports, __webpack_require__) {

	var toFinite = __webpack_require__(167);
	
	/**
	 * Converts `value` to an integer.
	 *
	 * **Note:** This method is loosely based on
	 * [`ToInteger`](http://www.ecma-international.org/ecma-262/6.0/#sec-tointeger).
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to convert.
	 * @returns {number} Returns the converted integer.
	 * @example
	 *
	 * _.toInteger(3.2);
	 * // => 3
	 *
	 * _.toInteger(Number.MIN_VALUE);
	 * // => 0
	 *
	 * _.toInteger(Infinity);
	 * // => 1.7976931348623157e+308
	 *
	 * _.toInteger('3.2');
	 * // => 3
	 */
	function toInteger(value) {
	  var result = toFinite(value),
	      remainder = result % 1;
	
	  return result === result ? (remainder ? result - remainder : result) : 0;
	}
	
	module.exports = toInteger;


/***/ },
/* 169 */
/***/ function(module, exports, __webpack_require__) {

	var isFunction = __webpack_require__(79),
	    isObject = __webpack_require__(11),
	    isSymbol = __webpack_require__(57);
	
	/** Used as references for various `Number` constants. */
	var NAN = 0 / 0;
	
	/** Used to match leading and trailing whitespace. */
	var reTrim = /^\s+|\s+$/g;
	
	/** Used to detect bad signed hexadecimal string values. */
	var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
	
	/** Used to detect binary string values. */
	var reIsBinary = /^0b[01]+$/i;
	
	/** Used to detect octal string values. */
	var reIsOctal = /^0o[0-7]+$/i;
	
	/** Built-in method references without a dependency on `root`. */
	var freeParseInt = parseInt;
	
	/**
	 * Converts `value` to a number.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to process.
	 * @returns {number} Returns the number.
	 * @example
	 *
	 * _.toNumber(3.2);
	 * // => 3.2
	 *
	 * _.toNumber(Number.MIN_VALUE);
	 * // => 5e-324
	 *
	 * _.toNumber(Infinity);
	 * // => Infinity
	 *
	 * _.toNumber('3.2');
	 * // => 3.2
	 */
	function toNumber(value) {
	  if (typeof value == 'number') {
	    return value;
	  }
	  if (isSymbol(value)) {
	    return NAN;
	  }
	  if (isObject(value)) {
	    var other = isFunction(value.valueOf) ? value.valueOf() : value;
	    value = isObject(other) ? (other + '') : other;
	  }
	  if (typeof value != 'string') {
	    return value === 0 ? value : +value;
	  }
	  value = value.replace(reTrim, '');
	  var isBinary = reIsBinary.test(value);
	  return (isBinary || reIsOctal.test(value))
	    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
	    : (reIsBadHex.test(value) ? NAN : +value);
	}
	
	module.exports = toNumber;


/***/ },
/* 170 */
/***/ function(module, exports, __webpack_require__) {

	var baseValues = __webpack_require__(301),
	    keys = __webpack_require__(9);
	
	/**
	 * Creates an array of the own enumerable string keyed property values of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property values.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.values(new Foo);
	 * // => [1, 2] (iteration order is not guaranteed)
	 *
	 * _.values('hi');
	 * // => ['h', 'i']
	 */
	function values(object) {
	  return object ? baseValues(object, keys(object)) : [];
	}
	
	module.exports = values;


/***/ },
/* 171 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Observable_1 = __webpack_require__(23);
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @extends {Ignored}
	 * @hide true
	 */
	var ScalarObservable = (function (_super) {
	    __extends(ScalarObservable, _super);
	    function ScalarObservable(value, scheduler) {
	        _super.call(this);
	        this.value = value;
	        this.scheduler = scheduler;
	        this._isScalar = true;
	        if (scheduler) {
	            this._isScalar = false;
	        }
	    }
	    ScalarObservable.create = function (value, scheduler) {
	        return new ScalarObservable(value, scheduler);
	    };
	    ScalarObservable.dispatch = function (state) {
	        var done = state.done, value = state.value, subscriber = state.subscriber;
	        if (done) {
	            subscriber.complete();
	            return;
	        }
	        subscriber.next(value);
	        if (subscriber.isUnsubscribed) {
	            return;
	        }
	        state.done = true;
	        this.schedule(state);
	    };
	    ScalarObservable.prototype._subscribe = function (subscriber) {
	        var value = this.value;
	        var scheduler = this.scheduler;
	        if (scheduler) {
	            return scheduler.schedule(ScalarObservable.dispatch, 0, {
	                done: false, value: value, subscriber: subscriber
	            });
	        }
	        else {
	            subscriber.next(value);
	            if (!subscriber.isUnsubscribed) {
	                subscriber.complete();
	            }
	        }
	    };
	    return ScalarObservable;
	}(Observable_1.Observable));
	exports.ScalarObservable = ScalarObservable;
	//# sourceMappingURL=ScalarObservable.js.map

/***/ },
/* 172 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var isScheduler_1 = __webpack_require__(87);
	var isArray_1 = __webpack_require__(86);
	var ArrayObservable_1 = __webpack_require__(58);
	var combineLatest_1 = __webpack_require__(412);
	/* tslint:enable:max-line-length */
	/**
	 * Combines multiple Observables to create an Observable whose values are
	 * calculated from the latest values of each of its input Observables.
	 *
	 * <span class="informal">Whenever any input Observable emits a value, it
	 * computes a formula using the latest values from all the inputs, then emits
	 * the output of that formula.</span>
	 *
	 * <img src="./img/combineLatest.png" width="100%">
	 *
	 * `combineLatest` combines the values from all the Observables passed as
	 * arguments. This is done by subscribing to each Observable, in order, and
	 * collecting an array of each of the most recent values any time any of the
	 * input Observables emits, then either taking that array and passing it as
	 * arguments to an optional `project` function and emitting the return value of
	 * that, or just emitting the array of recent values directly if there is no
	 * `project` function.
	 *
	 * @example <caption>Dynamically calculate the Body-Mass Index from an Observable of weight and one for height</caption>
	 * var weight = Rx.Observable.of(70, 72, 76, 79, 75);
	 * var height = Rx.Observable.of(1.76, 1.77, 1.78);
	 * var bmi = Rx.Observable.combineLatest(weight, height, (w, h) => w / (h * h));
	 * bmi.subscribe(x => console.log('BMI is ' + x));
	 *
	 * @see {@link combineAll}
	 * @see {@link merge}
	 * @see {@link withLatestFrom}
	 *
	 * @param {Observable} observable1 An input Observable to combine with the
	 * source Observable.
	 * @param {Observable} observable2 An input Observable to combine with the
	 * source Observable. More than one input Observables may be given as argument.
	 * @param {function} [project] An optional function to project the values from
	 * the combined latest values into a new value on the output Observable.
	 * @param {Scheduler} [scheduler=null] The Scheduler to use for subscribing to
	 * each input Observable.
	 * @return {Observable} An Observable of projected values from the most recent
	 * values from each input Observable, or an array of the most recent values from
	 * each input Observable.
	 * @static true
	 * @name combineLatest
	 * @owner Observable
	 */
	function combineLatest() {
	    var observables = [];
	    for (var _i = 0; _i < arguments.length; _i++) {
	        observables[_i - 0] = arguments[_i];
	    }
	    var project = null;
	    var scheduler = null;
	    if (isScheduler_1.isScheduler(observables[observables.length - 1])) {
	        scheduler = observables.pop();
	    }
	    if (typeof observables[observables.length - 1] === 'function') {
	        project = observables.pop();
	    }
	    // if the first and only other argument besides the resultSelector is an array
	    // assume it's been called with `combineLatest([obs1, obs2, obs3], project)`
	    if (observables.length === 1 && isArray_1.isArray(observables[0])) {
	        observables = observables[0];
	    }
	    return new ArrayObservable_1.ArrayObservable(observables, scheduler).lift(new combineLatest_1.CombineLatestOperator(project));
	}
	exports.combineLatest = combineLatest;
	//# sourceMappingURL=combineLatest.js.map

/***/ },
/* 173 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var isScheduler_1 = __webpack_require__(87);
	var ArrayObservable_1 = __webpack_require__(58);
	var mergeAll_1 = __webpack_require__(415);
	/**
	 * Creates an output Observable which sequentially emits all values from every
	 * given input Observable after the current Observable.
	 *
	 * <span class="informal">Concatenates multiple Observables together by
	 * sequentially emitting their values, one Observable after the other.</span>
	 *
	 * <img src="./img/concat.png" width="100%">
	 *
	 * Joins this Observable with multiple other Observables by subscribing to them
	 * one at a time, starting with the source, and merging their results into the
	 * output Observable. Will wait for each Observable to complete before moving
	 * on to the next.
	 *
	 * @example <caption>Concatenate a timer counting from 0 to 3 with a synchronous sequence from 1 to 10</caption>
	 * var timer = Rx.Observable.interval(1000).take(4);
	 * var sequence = Rx.Observable.range(1, 10);
	 * var result = timer.concat(sequence);
	 * result.subscribe(x => console.log(x));
	 *
	 * @example <caption>Concatenate 3 Observables</caption>
	 * var timer1 = Rx.Observable.interval(1000).take(10);
	 * var timer2 = Rx.Observable.interval(2000).take(6);
	 * var timer3 = Rx.Observable.interval(500).take(10);
	 * var result = timer1.concat(timer2, timer3);
	 * result.subscribe(x => console.log(x));
	 *
	 * @see {@link concatAll}
	 * @see {@link concatMap}
	 * @see {@link concatMapTo}
	 *
	 * @param {Observable} other An input Observable to concatenate after the source
	 * Observable. More than one input Observables may be given as argument.
	 * @param {Scheduler} [scheduler=null] An optional Scheduler to schedule each
	 * Observable subscription on.
	 * @return {Observable} All values of each passed Observable merged into a
	 * single Observable, in order, in serial fashion.
	 * @method concat
	 * @owner Observable
	 */
	function concat() {
	    var observables = [];
	    for (var _i = 0; _i < arguments.length; _i++) {
	        observables[_i - 0] = arguments[_i];
	    }
	    return concatStatic.apply(void 0, [this].concat(observables));
	}
	exports.concat = concat;
	/* tslint:enable:max-line-length */
	/**
	 * Creates an output Observable which sequentially emits all values from every
	 * given input Observable after the current Observable.
	 *
	 * <span class="informal">Concatenates multiple Observables together by
	 * sequentially emitting their values, one Observable after the other.</span>
	 *
	 * <img src="./img/concat.png" width="100%">
	 *
	 * Joins multiple Observables together by subscribing to them one at a time and
	 * merging their results into the output Observable. Will wait for each
	 * Observable to complete before moving on to the next.
	 *
	 * @example <caption>Concatenate a timer counting from 0 to 3 with a synchronous sequence from 1 to 10</caption>
	 * var timer = Rx.Observable.interval(1000).take(4);
	 * var sequence = Rx.Observable.range(1, 10);
	 * var result = Rx.Observable.concat(timer, sequence);
	 * result.subscribe(x => console.log(x));
	 *
	 * @example <caption>Concatenate 3 Observables</caption>
	 * var timer1 = Rx.Observable.interval(1000).take(10);
	 * var timer2 = Rx.Observable.interval(2000).take(6);
	 * var timer3 = Rx.Observable.interval(500).take(10);
	 * var result = Rx.Observable.concat(timer1, timer2, timer3);
	 * result.subscribe(x => console.log(x));
	 *
	 * @see {@link concatAll}
	 * @see {@link concatMap}
	 * @see {@link concatMapTo}
	 *
	 * @param {Observable} input1 An input Observable to concatenate with others.
	 * @param {Observable} input2 An input Observable to concatenate with others.
	 * More than one input Observables may be given as argument.
	 * @param {Scheduler} [scheduler=null] An optional Scheduler to schedule each
	 * Observable subscription on.
	 * @return {Observable} All values of each passed Observable merged into a
	 * single Observable, in order, in serial fashion.
	 * @static true
	 * @name concat
	 * @owner Observable
	 */
	function concatStatic() {
	    var observables = [];
	    for (var _i = 0; _i < arguments.length; _i++) {
	        observables[_i - 0] = arguments[_i];
	    }
	    var scheduler = null;
	    var args = observables;
	    if (isScheduler_1.isScheduler(args[observables.length - 1])) {
	        scheduler = args.pop();
	    }
	    return new ArrayObservable_1.ArrayObservable(observables, scheduler).lift(new mergeAll_1.MergeAllOperator(1));
	}
	exports.concatStatic = concatStatic;
	//# sourceMappingURL=concat.js.map

/***/ },
/* 174 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var OuterSubscriber_1 = __webpack_require__(42);
	var subscribeToResult_1 = __webpack_require__(43);
	/**
	 * Emits the values emitted by the source Observable until a `notifier`
	 * Observable emits a value.
	 *
	 * <span class="informal">Lets values pass until a second Observable,
	 * `notifier`, emits something. Then, it completes.</span>
	 *
	 * <img src="./img/takeUntil.png" width="100%">
	 *
	 * `takeUntil` subscribes and begins mirroring the source Observable. It also
	 * monitors a second Observable, `notifier` that you provide. If the `notifier`
	 * emits a value or a complete notification, the output Observable stops
	 * mirroring the source Observable and completes.
	 *
	 * @example <caption>Tick every second until the first click happens</caption>
	 * var interval = Rx.Observable.interval(1000);
	 * var clicks = Rx.Observable.fromEvent(document, 'click');
	 * var result = interval.takeUntil(clicks);
	 * result.subscribe(x => console.log(x));
	 *
	 * @see {@link take}
	 * @see {@link takeLast}
	 * @see {@link takeWhile}
	 * @see {@link skip}
	 *
	 * @param {Observable} notifier The Observable whose first emitted value will
	 * cause the output Observable of `takeUntil` to stop emitting values from the
	 * source Observable.
	 * @return {Observable<T>} An Observable that emits the values from the source
	 * Observable until such time as `notifier` emits its first value.
	 * @method takeUntil
	 * @owner Observable
	 */
	function takeUntil(notifier) {
	    return this.lift(new TakeUntilOperator(notifier));
	}
	exports.takeUntil = takeUntil;
	var TakeUntilOperator = (function () {
	    function TakeUntilOperator(notifier) {
	        this.notifier = notifier;
	    }
	    TakeUntilOperator.prototype.call = function (subscriber, source) {
	        return source._subscribe(new TakeUntilSubscriber(subscriber, this.notifier));
	    };
	    return TakeUntilOperator;
	}());
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var TakeUntilSubscriber = (function (_super) {
	    __extends(TakeUntilSubscriber, _super);
	    function TakeUntilSubscriber(destination, notifier) {
	        _super.call(this, destination);
	        this.notifier = notifier;
	        this.add(subscribeToResult_1.subscribeToResult(this, notifier));
	    }
	    TakeUntilSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
	        this.complete();
	    };
	    TakeUntilSubscriber.prototype.notifyComplete = function () {
	        // noop
	    };
	    return TakeUntilSubscriber;
	}(OuterSubscriber_1.OuterSubscriber));
	//# sourceMappingURL=takeUntil.js.map

/***/ },
/* 175 */
/***/ function(module, exports) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	/**
	 * An error thrown when an action is invalid because the object has been
	 * unsubscribed.
	 *
	 * @see {@link Subject}
	 * @see {@link BehaviorSubject}
	 *
	 * @class ObjectUnsubscribedError
	 */
	var ObjectUnsubscribedError = (function (_super) {
	    __extends(ObjectUnsubscribedError, _super);
	    function ObjectUnsubscribedError() {
	        var err = _super.call(this, 'object unsubscribed');
	        this.name = err.name = 'ObjectUnsubscribedError';
	        this.stack = err.stack;
	        this.message = err.message;
	    }
	    return ObjectUnsubscribedError;
	}(Error));
	exports.ObjectUnsubscribedError = ObjectUnsubscribedError;
	//# sourceMappingURL=ObjectUnsubscribedError.js.map

/***/ },
/* 176 */
/***/ function(module, exports) {

	"use strict";
	function isFunction(x) {
	    return typeof x === 'function';
	}
	exports.isFunction = isFunction;
	//# sourceMappingURL=isFunction.js.map

/***/ },
/* 177 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var errorObject_1 = __webpack_require__(127);
	var tryCatchTarget;
	function tryCatcher() {
	    try {
	        return tryCatchTarget.apply(this, arguments);
	    }
	    catch (e) {
	        errorObject_1.errorObject.e = e;
	        return errorObject_1.errorObject;
	    }
	}
	function tryCatch(fn) {
	    tryCatchTarget = fn;
	    return tryCatcher;
	}
	exports.tryCatch = tryCatch;
	;
	//# sourceMappingURL=tryCatch.js.map

/***/ },
/* 178 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(427);


/***/ },
/* 179 */,
/* 180 */,
/* 181 */,
/* 182 */,
/* 183 */,
/* 184 */,
/* 185 */,
/* 186 */,
/* 187 */,
/* 188 */,
/* 189 */,
/* 190 */,
/* 191 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = undefined;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _desc, _value, _class, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _class2, _temp, _initialiseProps, _assign$call;
	
	var _templateObject = _taggedTemplateLiteral(['\n\t\t\t\t\t\t\tThe ', ' property does not exist on ', '.\n\t\t\t\t\t\t'], ['\n\t\t\t\t\t\t\tThe ', ' property does not exist on ', '.\n\t\t\t\t\t\t']),
	    _templateObject2 = _taggedTemplateLiteral(['\n\t\t\tThe entity at \'', '\'\n\t\t\tis not of class \'', '\'\n\t\t\tbut of class \'', '\'.\n\t\t'], ['\n\t\t\tThe entity at \'', '\'\n\t\t\tis not of class \'', '\'\n\t\t\tbut of class \'', '\'.\n\t\t']),
	    _templateObject3 = _taggedTemplateLiteral(['\n\t\t\tThe \'', '\' class is not a singleton class.\n\t\t'], ['\n\t\t\tThe \'', '\' class is not a singleton class.\n\t\t']),
	    _templateObject4 = _taggedTemplateLiteral(['\n\t\t\tDo not use \'new ', '(...args)\'.\n\t\t\tInstead, use \'', '.new(...args)\'.\n\t\t'], ['\n\t\t\tDo not use \'new ', '(...args)\'.\n\t\t\tInstead, use \'', '.new(...args)\'.\n\t\t']),
	    _templateObject5 = _taggedTemplateLiteral(['\n\t\t\t\tCannot instantiate the abstract\n\t\t\t\tclass ', '.\n\t\t\t'], ['\n\t\t\t\tCannot instantiate the abstract\n\t\t\t\tclass ', '.\n\t\t\t']);
	
	var _isObject = __webpack_require__(68);
	
	var _isObject2 = _interopRequireDefault(_isObject);
	
	var _defaults = __webpack_require__(66);
	
	var _defaults2 = _interopRequireDefault(_defaults);
	
	var _size = __webpack_require__(106);
	
	var _size2 = _interopRequireDefault(_size);
	
	var _keys = __webpack_require__(143);
	
	var _keys2 = _interopRequireDefault(_keys);
	
	var _values = __webpack_require__(107);
	
	var _values2 = _interopRequireDefault(_values);
	
	var _isFunction = __webpack_require__(67);
	
	var _isFunction2 = _interopRequireDefault(_isFunction);
	
	var _uniqueId2 = __webpack_require__(399);
	
	var _uniqueId3 = _interopRequireDefault(_uniqueId2);
	
	var _ObservableSet = __webpack_require__(96);
	
	var _ObservableSet2 = _interopRequireDefault(_ObservableSet);
	
	var _misc = __webpack_require__(3);
	
	var _fields = __webpack_require__(134);
	
	var _ValueTracker2 = __webpack_require__(135);
	
	var _ValueTracker3 = _interopRequireDefault(_ValueTracker2);
	
	var _Change = __webpack_require__(192);
	
	var _BehaviorSubject = __webpack_require__(123);
	
	var _filter = __webpack_require__(25);
	
	var _combineLatest = __webpack_require__(172);
	
	__webpack_require__(24);
	
	var _boundNativeMethods = __webpack_require__(10);
	
	var _babelHelpers = __webpack_require__(204);
	
	var _babelHelpers2 = _interopRequireDefault(_babelHelpers);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return right[Symbol.hasInstance](left); } else { return _instanceof(left, right); } }
	
	function _initDefineProp(target, property, descriptor, context) {
		if (!descriptor) return;
		Object.defineProperty(target, property, {
			enumerable: descriptor.enumerable,
			configurable: descriptor.configurable,
			writable: descriptor.writable,
			value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
		});
	}
	
	function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
		var desc = {};
		Object['ke' + 'ys'](descriptor).forEach(function (key) {
			desc[key] = descriptor[key];
		});
		desc.enumerable = !!desc.enumerable;
		desc.configurable = !!desc.configurable;
	
		if ('value' in desc || desc.initializer) {
			desc.writable = true;
		}
	
		desc = decorators.slice().reverse().reduce(function (desc, decorator) {
			return decorator(target, property, desc) || desc;
		}, desc);
	
		if (context && desc.initializer !== void 0) {
			desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
			desc.initializer = undefined;
		}
	
		if (desc.initializer === void 0) {
			Object['define' + 'Property'](target, property, desc);
			desc = null;
		}
	
		return desc;
	}
	
	function _initializerWarningHelper(descriptor, context) {
		throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
	}
	
	var $$committedEntitiesByHref = Symbol('$$committedEntitiesByHref');
	var $$committedEntities = Symbol('$$committedEntities');
	var $$entities = Symbol('$$allEntities');
	var $$singletonObject = Symbol('$$singletonObject');
	var $$newEntitySubject = Symbol('$$newEntitySubject');
	var $$deleted = Symbol('$$deleted');
	var $$entitiesSubject = Symbol('$$allSubject');
	var $$committedEntitiesSubject = Symbol('$$allCommittedSubject');
	var $$set = Symbol('$$set');
	var $$PreferredClass = Symbol('$$PreferredClass');
	
	////////////////////////////////////////////////////////////////////////////////
	
	var Entity = (_dec = (0, _ValueTracker2.event)(), _dec2 = (0, _ValueTracker2.event)(), _dec3 = (0, _ValueTracker2.event)(), _dec4 = (0, _ValueTracker2.property)({ initial: false, readonly: true }), _dec5 = (0, _ValueTracker2.property)({ initial: true, readonly: true }), _dec6 = (0, _ValueTracker2.property)({ initial: false, readonly: true }), (_class = (_temp = _class2 = function (_ValueTracker) {
		_inherits(Entity, _ValueTracker);
	
		_createClass(Entity, [{
			key: Symbol.toStringTag,
	
	
			///////////////////////////////
			////////// INSTANCES //////////
			///////////////////////////////
	
			//noinspection JSDuplicatedDeclaration // hiding warning due to Webstorm bug
			get: function get() {
				return this.constructor.name;
			}
		}], [{
			key: 'createClass',
	
	
			////////////////////////////////////////////////////////////
			////////// STATIC (building Entity-based classes) //////////
			////////////////////////////////////////////////////////////
	
			value: function createClass(config) {
				var _defineProperties$cal;
	
				/* create the class with the right name, constructor and static content */
				var name = config.name;
	
				var rest = _objectWithoutProperties(config, ['name']);
	
				/* create the new class */
				// using Function constructor to give the class a dynamic name
				// http://stackoverflow.com/a/9947842/681588
				// (and using babel-technique to build it, rather than using class
				// expression, so that it can be extended by babel-compiled code)
	
	
				var EntitySubclass = new Function('Entity', '\n\t\t\t\'use strict\';\n\t\t\t' + _babelHelpers2.default + ';\n\t\t\treturn function (_Entity) {\n\t\t\t\t_inherits(' + name + ', _Entity);\n\t\t\t\tfunction ' + name + '() {\n\t\t\t\t\t_classCallCheck(this, ' + name + ');\n\t\t\t\t\treturn _possibleConstructorReturn(this, Object.getPrototypeOf(' + name + ').apply(this, arguments));\n\t\t\t\t}\n\t\t\t\treturn ' + name + ';\n\t\t\t}(Entity);\n\t\t')(Entity);
				// const EntitySubclass = class extends Entity {};
	
				/* populate it with the necessary data and behavior */
				_boundNativeMethods.assign.call(EntitySubclass, rest);
				_boundNativeMethods.defineProperties.call(EntitySubclass, (_defineProperties$cal = {
					name: { value: name }
				}, _defineProperty(_defineProperties$cal, Symbol.hasInstance, {
					value: function value(instance) {
						return this.hasInstance(instance);
					}
				}), _defineProperty(_defineProperties$cal, 'hasInstance', {
					value: function value(instance) {
						if (!instance) {
							return false;
						}
						return this.hasSubclass(instance.constructor);
					}
				}), _defineProperty(_defineProperties$cal, 'hasSubclass', {
					value: function value(otherClass) {
						// For both sides of this, there are two possibilities:
						// 1) the class is derived by this library
						// 2) the class is an extension of such
						// We need to check both possibilities.
						// We assume there is no subclass cycle.
						var isExtension = function isExtension(c) {
							return c && c.__proto__ !== Entity;
						};
						if (isExtension(this)) {
							// 'this' is an extension
							while (isExtension(otherClass) && otherClass !== this) {
								otherClass = otherClass.__proto__;
							}
							return otherClass === this;
						} else {
							while (isExtension(otherClass)) {
								// 'otherClass' is an extension
								otherClass = otherClass.__proto__;
							}
							if (!otherClass) {
								return false;
							}
							// both 'this' and 'otherClass' are library-derived
							if (otherClass === this) {
								return true;
							}
							var _iteratorNormalCompletion = true;
							var _didIteratorError = false;
							var _iteratorError = undefined;
	
							try {
								for (var _iterator = this.extendedBy[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
									var SubClass = _step.value;
	
									if (SubClass.hasSubclass(otherClass)) {
										return true;
									}
								}
							} catch (err) {
								_didIteratorError = true;
								_iteratorError = err;
							} finally {
								try {
									if (!_iteratorNormalCompletion && _iterator.return) {
										_iterator.return();
									}
								} finally {
									if (_didIteratorError) {
										throw _iteratorError;
									}
								}
							}
	
							return false;
						}
					}
				}), _defineProperty(_defineProperties$cal, 'p', {
					value: function value(name) {
						switch (name) {
							case 'all':
								return this[$$entitiesSubject];
							case 'allCommitted':
								return this[$$committedEntitiesSubject];
							default:
								(0, _misc.constraint)(false, (0, _misc.humanMsg)(_templateObject, name, this.name));
						}
					}
				}), _defineProperty(_defineProperties$cal, 'supersede', {
					value: function value(factory) {
						return EntitySubclass[$$PreferredClass] = factory(EntitySubclass[$$PreferredClass] || EntitySubclass);
					}
				}), _defineProperties$cal));
	
				/* maintaining <Class>.p('all') and <Class>.p('allCommitted') */
				var _arr = [[$$entities, $$entitiesSubject], [$$committedEntities, $$committedEntitiesSubject]];
				for (var _i = 0; _i < _arr.length; _i++) {
					var _context;
	
					var _arr$_i = _slicedToArray(_arr[_i], 2);
	
					var _$$set = _arr$_i[0];
					var $$subject = _arr$_i[1];
	
					var localSet = new _ObservableSet2.default();
					(_context = Entity[_$$set].e('add'), _filter.filter).call(_context, EntitySubclass.hasInstance.bind(EntitySubclass)).subscribe(localSet.e('add'));
					(_context = Entity[_$$set].e('delete'), _filter.filter).call(_context, EntitySubclass.hasInstance.bind(EntitySubclass)).subscribe(localSet.e('delete'));
					_boundNativeMethods.defineProperty.call(EntitySubclass, $$subject, { value: localSet.p('value') });
				}
	
				return EntitySubclass;
			}
	
			/////////////////////////////////////////////////////////////////////
			////////// STATIC (creating / caching / finding instances) //////////
			/////////////////////////////////////////////////////////////////////
	
	
		}, {
			key: 'new',
			value: function _new() {
				var vals = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
				var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
				return new this.Change_new(this, vals, options).run();
			}
		}, {
			key: 'get',
			value: function get(href) {
				var _context2;
	
				var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
				if ((_context2 = href, _isObject2.default).call(_context2)) {
					href = { href: href };
				}
				var entity = void 0;
				if (href in Entity[$$committedEntitiesByHref]) {
					entity = Entity[$$committedEntitiesByHref][href];
				} else {
					// We're assuming that this is solely a synchronous method call,
					// so we can't query the server here.
					return null;
				}
				(0, _misc.constraint)(this.hasInstance(entity), (0, _misc.humanMsg)(_templateObject2, JSON.stringify(href), this.name, entity.constructor.name));
				return entity;
			}
		}, {
			key: 'getAll',
			value: function getAll() {
				return new Set([].concat(_toConsumableArray(this[$$entities])).filter(this.hasInstance.bind(this)));
			}
		}, {
			key: 'getAllCommitted',
			value: function getAllCommitted() {
				return new Set([].concat(_toConsumableArray(this[$$committedEntities])).filter(this.hasInstance.bind(this)));
			}
		}, {
			key: 'newOrSingleton',
			value: function newOrSingleton() {
				return this.singleton ? this.getSingleton() : this.new();
			}
		}, {
			key: 'getSingleton',
			value: function getSingleton() {
				(0, _misc.constraint)(this.singleton, (0, _misc.humanMsg)(_templateObject3, this.name));
				if (!this[$$singletonObject]) {
					this[$$singletonObject] = this.new({
						name: this.singular
					});
					this[$$singletonObject].commit();
					// TODO: make sure that the singleton object is always loaded,
					//     : so this can be done synchronously
				}
				return this[$$singletonObject];
			}
		}, {
			key: 'load',
			value: function () {
				var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(href) {
					var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
					return regeneratorRuntime.wrap(function _callee$(_context3) {
						while (1) {
							switch (_context3.prev = _context3.next) {
								case 0:
								case 'end':
									return _context3.stop();
							}
						}
					}, _callee, this);
				}));
	
				function load(_x4, _x5) {
					return _ref.apply(this, arguments);
				}
	
				return load;
			}()
		}]);
	
		function Entity() {
			var _context4;
	
			var initialValues = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
			var _ref2 = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
			var _ref2$allowInvokingCo = _ref2.allowInvokingConstructor;
			var allowInvokingConstructor = _ref2$allowInvokingCo === undefined ? false : _ref2$allowInvokingCo;
	
			_classCallCheck(this, Entity);
	
			var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Entity).call(this));
	
			/* initialize value tracking */
	
	
			_initialiseProps.call(_this);
	
			_get(Object.getPrototypeOf(Entity.prototype), 'setValueTrackerOptions', _this).call(_this, {
				takeUntil: (_context4 = (0, _combineLatest.combineLatest)(_this.p('isDeleted'), _this.p('isPristine'), _this.p('isNew'), function (isDeleted, isPristine, isNew) {
					return isDeleted && (isPristine || isNew);
				}), _filter.filter).call(_context4, function (isGone) {
					return isGone;
				}),
				filterAllBy: function filterAllBy() {
					return _this.isDeleted.getValue();
				}
			});
	
			/* make sure this constructor was invoked under proper conditions */
			(0, _misc.constraint)(allowInvokingConstructor, (0, _misc.humanMsg)(_templateObject4, _this.constructor.name, _this.constructor.name));
	
	
			/* Treating singleton classes specially? Or do we double-check singleton-ness here? */
			if (_this.constructor.singleton) {}
			// TODO
	
	
			/* set defaults for the core initial field values */
			_defaults2.default.call(initialValues, {
				id: null,
				href: null,
				class: _this.constructor.name
			});
	
			/* initialize all fields in this entity */
			_fields.Field.initializeEntity(_this, initialValues);
	
			/* entity is pristine if all its fields are pristine */
			_combineLatest.combineLatest.apply(undefined, _toConsumableArray((_context4 = _this.fields, _values2.default).call(_context4).map(function (f) {
				return f.p('isPristine');
			})).concat([function () {
				for (var _len = arguments.length, fieldPristines = Array(_len), _key = 0; _key < _len; _key++) {
					fieldPristines[_key] = arguments[_key];
				}
	
				return fieldPristines.every(function (v) {
					return !!v;
				});
			}])).subscribe(_this.pSubject('isPristine'));
	
			/* register this entity */
			Entity[$$entities].add(_this);
	
			// TODO: CHECK CROSS-PROPERTY CONSTRAINTS?
	
			return _this;
		}
	
		_createClass(Entity, [{
			key: 'delete',
			value: function _delete() {
				// TODO: this is the synchronous delete operation;
				//     : a `.commit()` call is required before it
				//     : is actually deleted from asynchronous storage.
				//     : That means we need to be able to rollback a deletion.
				//     : We need to create a partially ordered
				//     : log of performed actions (since last commit),
				//     : that also allows undo. This will replace storing 'pristine' ops.
				//     : (This is the Command design pattern.)
	
				if (this.isDeleted) {
					return;
				}
				this.pSubject('isDeleted').next(true);
				this.pSubject('isPristine').next(false);
				Entity[$$entities].delete(this);
			}
		}, {
			key: 'undelete',
			value: function undelete() {
				if (!this.isDeleted) {
					return;
				}
				this.pSubject('isDeleted').next(false);
				this.pSubject('isPristine').next(false);
				Entity[$$entities].add(this);
			}
	
			//noinspection JSDuplicatedDeclaration // temporary, to suppress warning due to Webstorm bug; TODO: report bug
	
		}, {
			key: 'get',
			value: function get(key) {
				return this.fields[key].get();
			}
		}, {
			key: 'set',
			value: function set(key, val, options) {
				return this.fields[key].set(val, options);
			}
		}, {
			key: 'commit',
			value: function () {
				var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
					var _context5,
					    _this2 = this;
	
					for (var _len2 = arguments.length, keysToCommit = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
						keysToCommit[_key2] = arguments[_key2];
					}
	
					var _context6, newId, newHref, opts;
	
					return regeneratorRuntime.wrap(function _callee2$(_context7) {
						while (1) {
							switch (_context7.prev = _context7.next) {
								case 0:
									if (this.isDeleted) {}
									// TODO
	
	
									/* commit each field individually */ // TODO: commit all in a single transaction?
									if ((_context5 = keysToCommit, _size2.default).call(_context5) === 0) {
										keysToCommit = (_context6 = this.fields, _keys2.default).call(_context6);
									}
									_context7.next = 4;
									return Promise.all(keysToCommit.map(function (key) {
										return _this2.fields[key].commit();
									}));
	
								case 4:
	
									/* setting up as a committed entity */
									// TODO: remove when the server actually does this
									if (this.get('id') === null) {
										/* id and href are set here until actual server communication is set up */
										newId = parseInt((0, _uniqueId3.default)());
										newHref = 'cache://' + newId;
										opts = { ignoreReadonly: true, updatePristine: true };
	
										this.set('id', newId, opts);
										this.set('href', newHref, opts);
	
										/* after it's first committed, it's no longer new */
										this.pSubject('isNew').next(false);
	
										/* maintain caches */
										Entity[$$committedEntitiesByHref][newHref] = this;
										Entity[$$committedEntities].add(this);
									}
	
									/* directly after a commit, it's pristine */
									this.pSubject('isPristine').next(true);
	
								case 6:
								case 'end':
									return _context7.stop();
							}
						}
					}, _callee2, this);
				}));
	
				function commit(_x9) {
					return _ref3.apply(this, arguments);
				}
	
				return commit;
			}()
		}, {
			key: 'rollback',
			value: function rollback() {
				var _context8,
				    _this3 = this;
	
				for (var _len3 = arguments.length, keysToRollback = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
					keysToRollback[_key3] = arguments[_key3];
				}
	
				if ((_context8 = keysToRollback, _size2.default).call(_context8) === 0) {
					var _context9;
	
					keysToRollback = (_context9 = this.fields, _keys2.default).call(_context9);
				}
				keysToRollback.map(function (key) {
					_this3.fields[key].rollback();
				});
				this.e('rollback').next(this);
			}
		}, {
			key: 'p',
			value: function p(key, t) {
				// Provide easier access to field property observables
				return this.fields && this.fields[key] ? this.fields[key].p('value', t) : _get(Object.getPrototypeOf(Entity.prototype), 'p', this).call(this, key, t);
			}
		}]);
	
		return Entity;
	}(_ValueTracker3.default), _class2.Change_new = function (_tracker$Change) {
		_inherits(_class3, _tracker$Change);
	
		function _class3(context) {
			var initialValues = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
			var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
	
			_classCallCheck(this, _class3);
	
			var _this4 = _possibleConstructorReturn(this, Object.getPrototypeOf(_class3).call(this, options));
	
			_this4.context = context;
			_this4.initialValues = initialValues;
			_this4.options = options;
			return _this4;
		}
	
		_createClass(_class3, [{
			key: 'run',
			value: function run() {
				var _context10;
	
				if ((_context10 = this.context.behavior.new, _isFunction2.default).call(_context10)) {
					var customResult = this.context.behavior.new(_extends({}, this.initialValues), _extends({}, this.options));
					if (customResult) {
						return customResult;
					}
				}
				(0, _misc.constraint)(!this.context.abstract, (0, _misc.humanMsg)(_templateObject5, this.context.name));
				return new (this.context[$$PreferredClass] || this.context)(_extends({}, this.initialValues), _extends({}, this.options, { allowInvokingConstructor: true, new: true }));
			}
		}, {
			key: 'commit',
			value: function () {
				var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
					return regeneratorRuntime.wrap(function _callee3$(_context11) {
						while (1) {
							switch (_context11.prev = _context11.next) {
								case 0:
								case 'end':
									return _context11.stop();
							}
						}
					}, _callee3, this);
				}));
	
				function commit() {
					return _ref4.apply(this, arguments);
				}
	
				return commit;
			}()
		}, {
			key: 'rollback',
			value: function rollback() {
				// TODO
			}
		}]);
	
		return _class3;
	}(_Change.tracker.Change), _initialiseProps = function _initialiseProps() {
		_initDefineProp(this, 'deleteEvent', _descriptor, this);
	
		_initDefineProp(this, 'commitEvent', _descriptor2, this);
	
		_initDefineProp(this, 'rollbackEvent', _descriptor3, this);
	
		_initDefineProp(this, 'isDeleted', _descriptor4, this);
	
		_initDefineProp(this, 'isPristine', _descriptor5, this);
	
		_initDefineProp(this, 'isNew', _descriptor6, this);
	}, _temp), (_descriptor = _applyDecoratedDescriptor(_class.prototype, 'deleteEvent', [_dec], {
		enumerable: true,
		initializer: null
	}), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, 'commitEvent', [_dec2], {
		enumerable: true,
		initializer: null
	}), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, 'rollbackEvent', [_dec3], {
		enumerable: true,
		initializer: null
	}), _descriptor4 = _applyDecoratedDescriptor(_class.prototype, 'isDeleted', [_dec4], {
		enumerable: true,
		initializer: null
	}), _descriptor5 = _applyDecoratedDescriptor(_class.prototype, 'isPristine', [_dec5], {
		enumerable: true,
		initializer: null
	}), _descriptor6 = _applyDecoratedDescriptor(_class.prototype, 'isNew', [_dec6], {
		enumerable: true,
		initializer: null
	})), _class));
	exports.default = Entity;
	
	
	_boundNativeMethods.assign.call(Entity, (_assign$call = {}, _defineProperty(_assign$call, $$entities, new _ObservableSet2.default()), _defineProperty(_assign$call, $$entitiesSubject, new _BehaviorSubject.BehaviorSubject(new Set())), _defineProperty(_assign$call, $$committedEntities, new _ObservableSet2.default()), _defineProperty(_assign$call, $$committedEntitiesSubject, new _BehaviorSubject.BehaviorSubject(new Set())), _defineProperty(_assign$call, $$committedEntitiesByHref, {}), _assign$call));

/***/ },
/* 192 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.tracker = undefined;
	
	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _graph = __webpack_require__(138);
	
	var _graph2 = _interopRequireDefault(_graph);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return right[Symbol.hasInstance](left); } else { return _instanceof(left, right); } }
	
	function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }
	
	function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var $$changes = Symbol('$$changes');
	
	var $$class = Symbol('$$class');
	var $$props = Symbol('$$props');
	var $$revDeps = Symbol('$$revDeps');
	var $$causes = Symbol('$$causes');
	var $$Change = Symbol('$$Change');
	
	var $$commitUpToHere = Symbol('$$commitUpToHere');
	var $$commitForcedFromHere = Symbol('$$commitForcedFromHere');
	
	var ChangeT = function ChangeT(tracker) {
		return function () {
			function Change() {
				var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
				var _ref$changeDependenci = _ref.changeDependencies;
				var changeDependencies = _ref$changeDependenci === undefined ? [] : _ref$changeDependenci;
				var _ref$changeCauses = _ref.changeCauses;
				var changeCauses = _ref$changeCauses === undefined ? [] : _ref$changeCauses;
	
				_classCallCheck(this, Change);
	
				var g = tracker[$$changes];
				g.addVertex(this, this);
				var _iteratorNormalCompletion = true;
				var _didIteratorError = false;
				var _iteratorError = undefined;
	
				try {
					for (var _iterator = changeDependencies[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
						var dep = _step.value;
						g.addEdge(this, dep, {});
					}
				} catch (err) {
					_didIteratorError = true;
					_iteratorError = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion && _iterator.return) {
							_iterator.return();
						}
					} finally {
						if (_didIteratorError) {
							throw _iteratorError;
						}
					}
				}
	
				var _iteratorNormalCompletion2 = true;
				var _didIteratorError2 = false;
				var _iteratorError2 = undefined;
	
				try {
					for (var _iterator2 = changeCauses[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
						var _dep = _step2.value;
						g.addEdge(this, _dep, { forced: true });
					}
				} catch (err) {
					_didIteratorError2 = true;
					_iteratorError2 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion2 && _iterator2.return) {
							_iterator2.return();
						}
					} finally {
						if (_didIteratorError2) {
							throw _iteratorError2;
						}
					}
				}
			}
	
			_createClass(Change, [{
				key: 'run',
				value: function run() {}
			}, {
				key: 'commit',
				value: function () {
					var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
						return regeneratorRuntime.wrap(function _callee$(_context) {
							while (1) {
								switch (_context.prev = _context.next) {
									case 0:
										this.committed = true;
	
									case 1:
									case 'end':
										return _context.stop();
								}
							}
						}, _callee, this);
					}));
	
					function commit() {
						return _ref2.apply(this, arguments);
					}
	
					return commit;
				}()
			}, {
				key: 'rollback',
				value: function rollback() {}
			}, {
				key: 'commit',
				value: function () {
					var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
						return regeneratorRuntime.wrap(function _callee2$(_context2) {
							while (1) {
								switch (_context2.prev = _context2.next) {
									case 0:
										if (this.committed) {
											_context2.next = 5;
											break;
										}
	
										_context2.next = 3;
										return this[$$commitUpToHere]();
	
									case 3:
										_context2.next = 5;
										return this.commit();
	
									case 5:
										_context2.next = 7;
										return this[$$commitForcedFromHere]();
	
									case 7:
									case 'end':
										return _context2.stop();
								}
							}
						}, _callee2, this);
					}));
	
					function commitUpToHere() {
						return _ref3.apply(this, arguments);
					}
	
					return commitUpToHere;
				}()
			}, {
				key: $$commitUpToHere,
				value: function () {
					var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
						var _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, _step3$value, dep;
	
						return regeneratorRuntime.wrap(function _callee3$(_context3) {
							while (1) {
								switch (_context3.prev = _context3.next) {
									case 0:
										_iteratorNormalCompletion3 = true;
										_didIteratorError3 = false;
										_iteratorError3 = undefined;
										_context3.prev = 3;
										_iterator3 = tracker[$$changes].verticesTo(this)[Symbol.iterator]();
	
									case 5:
										if (_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done) {
											_context3.next = 16;
											break;
										}
	
										_step3$value = _slicedToArray(_step3.value, 1);
										dep = _step3$value[0];
	
										if (dep.committed) {
											_context3.next = 13;
											break;
										}
	
										_context3.next = 11;
										return dep[$$commitUpToHere]();
	
									case 11:
										_context3.next = 13;
										return dep.commit();
	
									case 13:
										_iteratorNormalCompletion3 = true;
										_context3.next = 5;
										break;
	
									case 16:
										_context3.next = 22;
										break;
	
									case 18:
										_context3.prev = 18;
										_context3.t0 = _context3['catch'](3);
										_didIteratorError3 = true;
										_iteratorError3 = _context3.t0;
	
									case 22:
										_context3.prev = 22;
										_context3.prev = 23;
	
										if (!_iteratorNormalCompletion3 && _iterator3.return) {
											_iterator3.return();
										}
	
									case 25:
										_context3.prev = 25;
	
										if (!_didIteratorError3) {
											_context3.next = 28;
											break;
										}
	
										throw _iteratorError3;
	
									case 28:
										return _context3.finish(25);
	
									case 29:
										return _context3.finish(22);
	
									case 30:
									case 'end':
										return _context3.stop();
								}
							}
						}, _callee3, this, [[3, 18, 22, 30], [23,, 25, 29]]);
					}));
	
					function value() {
						return _ref4.apply(this, arguments);
					}
	
					return value;
				}()
			}, {
				key: $$commitForcedFromHere,
				value: function () {
					var _ref5 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4() {
						var _iteratorNormalCompletion4, _didIteratorError4, _iteratorError4, _iterator4, _step4, _step4$value, rdep, forced;
	
						return regeneratorRuntime.wrap(function _callee4$(_context4) {
							while (1) {
								switch (_context4.prev = _context4.next) {
									case 0:
										_iteratorNormalCompletion4 = true;
										_didIteratorError4 = false;
										_iteratorError4 = undefined;
										_context4.prev = 3;
										_iterator4 = tracker[$$changes].verticesFrom(this)[Symbol.iterator]();
	
									case 5:
										if (_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done) {
											_context4.next = 18;
											break;
										}
	
										_step4$value = _slicedToArray(_step4.value, 3);
										rdep = _step4$value[0];
										forced = _step4$value[2].forced;
	
										if (!forced) {
											_context4.next = 15;
											break;
										}
	
										if (rdep.committed) {
											_context4.next = 13;
											break;
										}
	
										_context4.next = 13;
										return rdep.commit();
	
									case 13:
										_context4.next = 15;
										return rdep[$$commitForcedFromHere]();
	
									case 15:
										_iteratorNormalCompletion4 = true;
										_context4.next = 5;
										break;
	
									case 18:
										_context4.next = 24;
										break;
	
									case 20:
										_context4.prev = 20;
										_context4.t0 = _context4['catch'](3);
										_didIteratorError4 = true;
										_iteratorError4 = _context4.t0;
	
									case 24:
										_context4.prev = 24;
										_context4.prev = 25;
	
										if (!_iteratorNormalCompletion4 && _iterator4.return) {
											_iterator4.return();
										}
	
									case 27:
										_context4.prev = 27;
	
										if (!_didIteratorError4) {
											_context4.next = 30;
											break;
										}
	
										throw _iteratorError4;
	
									case 30:
										return _context4.finish(27);
	
									case 31:
										return _context4.finish(24);
	
									case 32:
									case 'end':
										return _context4.stop();
								}
							}
						}, _callee4, this, [[3, 20, 24, 32], [25,, 27, 31]]);
					}));
	
					function value() {
						return _ref5.apply(this, arguments);
					}
	
					return value;
				}()
			}, {
				key: 'rollback',
				value: function rollbackToHere() {}
			}]);
	
			return Change;
		}();
	};
	
	var ChangeTracker = function () {
		_createClass(ChangeTracker, [{
			key: 'Change',
			get: function get() {
				if (!this[$$Change]) {
					this[$$Change] = ChangeT(this);
				}
				return this[$$Change];
			}
		}]);
	
		function ChangeTracker() {
			_classCallCheck(this, ChangeTracker);
	
			this[$$changes] = new _graph2.default();
		}
	
		return ChangeTracker;
	}();
	
	var tracker = exports.tracker = new ChangeTracker();
	
	// export class CreateEntity extends Change {
	//
	// 	constructor(cls, props = {}, options = {}) {
	// 		super(options);
	// 		this[$$class] = cls;
	// 		this[$$props] = props;
	// 	}
	//
	// 	run() {
	//
	// 	}
	//
	// 	commit() {
	//
	// 	}
	//
	// 	rollback() {
	//
	// 	}
	//
	// }
	//
	// export class DeleteEntity extends Change {}
	//
	// export class SetPropertyField extends Change {}
	//
	// export class SetSideField extends Change {}
	//
	// export class SetRel1Field extends Change {}
	//
	// export class SetRel1ShortcutField extends Change {}
	//
	// export class SetRel$Field extends Change {}
	//
	// export class SetRel$ShortcutField extends Change {}

/***/ },
/* 193 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _templateObject = _taggedTemplateLiteral(['\n\t\t\tYou tried to manually assign a value ', '\n\t\t\tto ', '#', ',\n\t\t\tbut it already has a fixed value of ', '.\n\t\t'], ['\n\t\t\tYou tried to manually assign a value ', '\n\t\t\tto ', '#', ',\n\t\t\tbut it already has a fixed value of ', '.\n\t\t']),
	    _templateObject2 = _taggedTemplateLiteral(['\n\t\t\t    No value given for required field\n\t\t\t    \'', '#', '\'.\n\t\t\t'], ['\n\t\t\t    No value given for required field\n\t\t\t    \'', '#', '\'.\n\t\t\t']);
	
	var _isUndefined = __webpack_require__(38);
	
	var _isUndefined2 = _interopRequireDefault(_isUndefined);
	
	var _entries = __webpack_require__(21);
	
	var _entries2 = _interopRequireDefault(_entries);
	
	var _cloneDeep = __webpack_require__(242);
	
	var _cloneDeep2 = _interopRequireDefault(_cloneDeep);
	
	var _boundNativeMethods = __webpack_require__(10);
	
	var _misc = __webpack_require__(3);
	
	var _Field2 = __webpack_require__(28);
	
	var _symbols = __webpack_require__(29);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return right[Symbol.hasInstance](left); } else { return _instanceof(left, right); } }
	
	function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }
	
	function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	_Field2.Field[_symbols.$$registerFieldClass](function (_Field) {
		_inherits(PropertyField, _Field);
	
		_createClass(PropertyField, null, [{
			key: 'initClass',
	
	
			//////////////////
			// Change class //
			//////////////////
	
	
			// this[$$owner] instanceof RelatedTo | Resource
			// this[$$key]   instanceof "name" | "class" | "href" | ...
			// this[$$value] instanceof any
	
			////////////
			// static //
			////////////
	
			value: function initClass(_ref) {
				var _context;
	
				var cls = _ref.cls;
				var key = _ref.key;
				var readonly = _ref.desc.readonly;
	
				if (cls.prototype.hasOwnProperty(key)) {
					return;
				}
				(_context = cls.prototype, _boundNativeMethods.defineProperty).call(_context, key, _extends({
					get: function get() {
						return this.fields[key].get();
					}
				}, readonly ? undefined : {
					set: function set(val) {
						this.fields[key].set(val);
					}
				}, {
					enumerable: true,
					configurable: false
				}));
			}
		}, {
			key: _symbols.$$entriesIn,
			value: function value(cls) {
				var _context2;
	
				return (_context2 = cls.properties, _entries2.default).call(_context2).map(function (_ref2) {
					var _ref3 = _slicedToArray(_ref2, 2);
	
					var key = _ref3[0];
					var desc = _ref3[1];
					return {
						key: key,
						desc: desc,
						relatedKeys: []
					};
				});
			}
	
			//////////////
			// instance //
			//////////////
	
		}]);
	
		function PropertyField(options) {
			var _context3;
	
			_classCallCheck(this, PropertyField);
	
			var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(PropertyField).call(this, options));
	
			var owner = options.owner;
			var key = options.key;
			var desc = options.desc;
			var initialValue = options.initialValue;
	
			/* sanity checks */
	
			(0, _misc.constraint)((_context3 = desc.value, _isUndefined2.default).call(_context3) || _isUndefined2.default.call(initialValue), (0, _misc.humanMsg)(_templateObject, JSON.stringify(initialValue), owner.constructor.name, key, JSON.stringify(desc.value)));
	
			/* set the initial value */
			_this[_symbols.$$initSet]([!_isUndefined2.default.call(initialValue), (_context3 = _misc.callOrReturn.call(initialValue, owner), _cloneDeep2.default).call(_context3)], ['default' in desc, (_context3 = (_context3 = desc.default, _misc.callOrReturn).call(_context3, owner), _cloneDeep2.default).call(_context3)], ['value' in desc, (_context3 = (_context3 = desc.value, _misc.callOrReturn).call(_context3, owner), _cloneDeep2.default).call(_context3)], [!desc.required]);
			return _this;
		}
	
		_createClass(PropertyField, [{
			key: 'validate',
			value: function validate(val) {
				var stages = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];
	
	
				if (stages.includes('commit')) {
					(0, _misc.constraint)(!this[_symbols.$$desc].required || !_isUndefined2.default.call(val), (0, _misc.humanMsg)(_templateObject2, this[_symbols.$$owner].constructor.name, this[_symbols.$$key]));
				}
	
				// TODO: CHECK CONSTRAINT: given property value conforms to JSON schema
				// TODO: CHECK ADDITIONAL (PROPERTY-SPECIFIC) CONSTRAINTS: e.g., if this
				//     : is a template, does it conform to its corresponding type?
			}
		}]);
	
		return PropertyField;
	}(_Field2.Field));

/***/ },
/* 194 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _templateObject = _taggedTemplateLiteral(['\n\t\t\tThe value ', ' given for ', '#', '\n\t\t\tis not an iterable collection (like array or set).\n\t\t'], ['\n\t\t\tThe value ', ' given for ', '#', '\n\t\t\tis not an iterable collection (like array or set).\n\t\t']),
	    _templateObject2 = _taggedTemplateLiteral(['\n\t\t\t\tThe number of values in field ', '#', '\n\t\t\t\tis not within the expected range [', ', ', '].\n\t\t\t'], ['\n\t\t\t\tThe number of values in field ', '#', '\n\t\t\t\tis not within the expected range [', ', ', '].\n\t\t\t']),
	    _templateObject3 = _taggedTemplateLiteral(['\n\t\t\t\tInvalid value ', ' given as element for\n\t\t\t\t', '#', '.\n\t\t\t'], ['\n\t\t\t\tInvalid value ', ' given as element for\n\t\t\t\t', '#', '.\n\t\t\t']);
	
	var _map = __webpack_require__(82);
	
	var _filter = __webpack_require__(25);
	
	var _switchMap = __webpack_require__(85);
	
	var _startWith = __webpack_require__(84);
	
	var _pairwise = __webpack_require__(83);
	
	__webpack_require__(24);
	
	var _inRange = __webpack_require__(140);
	
	var _inRange2 = _interopRequireDefault(_inRange);
	
	var _get = __webpack_require__(139);
	
	var _get2 = _interopRequireDefault(_get);
	
	var _size = __webpack_require__(106);
	
	var _size2 = _interopRequireDefault(_size);
	
	var _entries = __webpack_require__(21);
	
	var _entries2 = _interopRequireDefault(_entries);
	
	var _boundNativeMethods = __webpack_require__(10);
	
	var _ObservableSet = __webpack_require__(96);
	
	var _ObservableSet2 = _interopRequireDefault(_ObservableSet);
	
	var _misc = __webpack_require__(3);
	
	var _Field = __webpack_require__(28);
	
	var _symbols = __webpack_require__(29);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }
	
	function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return right[Symbol.hasInstance](left); } else { return _instanceof(left, right); } }
	
	function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	_Field.Field[_symbols.$$registerFieldClass](function (_RelField) {
		_inherits(Rel$Field, _RelField);
	
		_createClass(Rel$Field, null, [{
			key: 'initClass',
	
	
			// this[$$owner] instanceof Resource
			// this[$$key]   instanceof "-->ContainsMaterial" | "-->HasPart" | "<--FlowsTo" | ...
			// this[$$value] instanceof Set<IsRelatedTo>
	
			////////////
			// static //
			////////////
	
			value: function initClass(_ref) {
				var _context;
	
				var cls = _ref.cls;
				var key = _ref.key;
				var readonly = _ref.desc.readonly;
	
				if (cls.prototype.hasOwnProperty(key)) {
					return;
				}
				(_context = cls.prototype, _boundNativeMethods.defineProperty).call(_context, key, _extends({
					get: function get() {
						return this.fields[key].get();
					}
				}, readonly ? undefined : {
					set: function set(val) {
						this.fields[key].set(val);
					}
				}, {
					enumerable: true,
					configurable: false
				}));
			}
		}, {
			key: _symbols.$$entriesIn,
			value: function value(cls) {
				var _context2;
	
				if (!cls.isResource) {
					return [];
				}
				return (_context2 = cls.relationships, _entries2.default).call(_context2).filter(function (_ref2) {
					var _ref3 = _slicedToArray(_ref2, 2);
	
					var rel = _ref3[1];
					return rel.cardinality.max > 1;
				}).map(function (_ref4) {
					var _ref5 = _slicedToArray(_ref4, 2);
	
					var key = _ref5[0];
					var desc = _ref5[1];
					return {
						key: key,
						desc: desc,
						relatedKeys: desc.shortcutKey ? [desc.shortcutKey] : []
					};
				});
			}
		}]);
	
		//////////////
		// instance //
		//////////////
	
		function Rel$Field(options) {
			var _context4;
	
			_classCallCheck(this, Rel$Field);
	
			var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Rel$Field).call(this, _extends({}, options, { setValueThroughSignal: false })));
	
			var owner = options.owner;
			var desc = options.desc;
			var initialValue = options.initialValue;
			var waitUntilConstructed = options.waitUntilConstructed;
			var constructingOwner = options.constructingOwner;
			var related = options.related;
	
	
			_boundNativeMethods.defineProperty.call(_this, _symbols.$$pristine, { value: new Set() });
			_boundNativeMethods.defineProperty.call(_this, _symbols.$$value, { value: new _ObservableSet2.default() });
	
			/* mirror stuff that happens in sub-fields */
	
			constructingOwner.subscribe({ complete: function complete() {
					var _iteratorNormalCompletion = true;
					var _didIteratorError = false;
					var _iteratorError = undefined;
	
					try {
						for (var _iterator = desc.relationshipClass.extendedBy[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
							var subCls = _step.value;
	
							var subFieldKey = subCls.keyInResource[desc.keyInRelationship];
							var subField = owner.fields[subFieldKey];
							if (!subField) {
								continue;
							}
							if (_instanceof(subField, Rel$Field)) {
								subField.get().e('add').subscribe(_this.get().e('add'));
								subField.get().e('delete').subscribe(_this.get().e('delete'));
							} else {
								var _context3;
	
								// Rel1Field
								(_context3 = (_context3 = subField.p('value'), _startWith.startWith).call(_context3, null), _pairwise.pairwise).call(_context3).subscribe(function (_ref6) {
									var _ref7 = _slicedToArray(_ref6, 2);
	
									var prev = _ref7[0];
									var curr = _ref7[1];
	
									if (prev) {
										_this.get().delete(prev);
									}
									if (curr) {
										_this.get().add(curr);
									}
								});
							}
						}
					} catch (err) {
						_didIteratorError = true;
						_iteratorError = err;
					} finally {
						try {
							if (!_iteratorNormalCompletion && _iterator.return) {
								_iterator.return();
							}
						} finally {
							if (_didIteratorError) {
								throw _iteratorError;
							}
						}
					}
				} });
	
			/* update relationships that are added or deleted here */
			(_context4 = _this[_symbols.$$value].e('add'), waitUntilConstructed).call(_context4).subscribe(function (rel) {
				rel.fields[desc.keyInRelationship].set(_this[_symbols.$$owner]);
			});
			(_context4 = _this[_symbols.$$value].e('delete'), waitUntilConstructed).call(_context4).subscribe(function (rel) {
				rel.delete();
			});
	
			/* decouple a relationship when it decouples from this resource */
			(_context4 = (_context4 = _this[_symbols.$$value].e('add'), waitUntilConstructed).call(_context4), _switchMap.switchMap).call(_context4, function (newRel) {
				var _context5;
	
				return (_context5 = (_context5 = newRel.fields[desc.keyInRelationship].p('value'), _filter.filter).call(_context5, function (res) {
					return res !== owner;
				}), _map.map).call(_context5, function () {
					return newRel;
				});
			}).subscribe(_this.get().e('delete'));
	
			/* handle initial values */
			if (initialValue && initialValue[Symbol.iterator]) {
				var _iteratorNormalCompletion2 = true;
				var _didIteratorError2 = false;
				var _iteratorError2 = undefined;
	
				try {
					for (var _iterator2 = initialValue[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
						var rel = _step2.value;
	
						if (!rel.fields[desc.keyInRelationship].get()) {
							rel.fields[desc.keyInRelationship].set(_this);
						}
	
	
						_this[_symbols.$$pristine].add(rel);
						_this[_symbols.$$value].add(rel);
					}
				} catch (err) {
					_didIteratorError2 = true;
					_iteratorError2 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion2 && _iterator2.return) {
							_iterator2.return();
						}
					} finally {
						if (_didIteratorError2) {
							throw _iteratorError2;
						}
					}
				}
			} else if (_get2.default.call(related, [desc.shortcutKey, 'initialValue'])) {
				// OK, a shortcut was given
			} else if (desc.cardinality.min === 0) {}
			// OK, this field is optional
	
	
			/* fill up missing required values with 'auto'matic ones */
			if (desc.options.auto) {
				var shortcutInitial = _get2.default.call(related, [desc.shortcutKey, 'initialValue']);
				for (var i = (_context6 = _this[_symbols.$$value], _size2.default).call(_context6) + _size2.default.call(shortcutInitial); i < desc.cardinality.min; ++i) {
					var _context6, _desc$relationshipCla;
	
					var _rel = desc.relationshipClass.new((_desc$relationshipCla = {}, _defineProperty(_desc$relationshipCla, desc.keyInRelationship, _this[_symbols.$$owner]), _defineProperty(_desc$relationshipCla, desc.codomain.keyInRelationship, desc.codomain.resourceClass.newOrSingleton()), _desc$relationshipCla));
					_this[_symbols.$$pristine].add(_rel);
					_this[_symbols.$$value].add(_rel);
				}
			}
	
			/* emit 'value' signals (but note that setValueThroughSignal = false) */
			(_context4 = _this[_symbols.$$value].p('value'), waitUntilConstructed).call(_context4).subscribe(_this.p('value'));
			return _this;
		}
	
		_createClass(Rel$Field, [{
			key: 'set',
			value: function set(newValue) {
				var _ref8 = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
				var _ref8$ignoreReadonly = _ref8.ignoreReadonly;
				var ignoreReadonly = _ref8$ignoreReadonly === undefined ? false : _ref8$ignoreReadonly;
				var _ref8$ignoreValidatio = _ref8.ignoreValidation;
				var ignoreValidation = _ref8$ignoreValidatio === undefined ? false : _ref8$ignoreValidatio;
				var _ref8$updatePristine = _ref8.updatePristine;
				var updatePristine = _ref8$updatePristine === undefined ? false : _ref8$updatePristine;
	
				(0, _misc.constraint)(ignoreReadonly || !this[_symbols.$$desc].readonly);
				if (!ignoreValidation) {
					this.validate(newValue, ['set']);
				}
				if (updatePristine) {
					(0, _ObservableSet.copySetContent)(this[_symbols.$$pristine], newValue);
				}
				(0, _ObservableSet.copySetContent)(this[_symbols.$$value], newValue);
			}
		}, {
			key: 'validate',
			value: function validate(val) {
				var stages = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];
	
				(0, _misc.constraint)(val[Symbol.iterator], (0, _misc.humanMsg)(_templateObject, val, this[_symbols.$$owner].constructor.name, this[_symbols.$$key]));
				if (stages.includes('commit')) {
					var _context7;
	
					var _$$desc$cardinality = this[_symbols.$$desc].cardinality;
					var min = _$$desc$cardinality.min;
					var max = _$$desc$cardinality.max;
	
					(0, _misc.constraint)((_context7 = _size2.default.call(val), _inRange2.default).call(_context7, min, max + 1), (0, _misc.humanMsg)(_templateObject2, this[_symbols.$$owner].constructor.name, this[_symbols.$$key], min, max));
				}
				val.forEach(this.validateElement.bind(this));
			}
		}, {
			key: 'validateElement',
			value: function validateElement(element) {
				/* the value must be of the proper domain */
				if (!this[_symbols.$$desc].relationshipClass.hasInstance(element)) {
					throw new Error((0, _misc.humanMsg)(_templateObject3, element, this[_symbols.$$owner].constructor.name, this[_symbols.$$key]));
				}
			}
		}, {
			key: 'commit',
			value: function () {
				var _ref9 = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
					return regeneratorRuntime.wrap(function _callee$(_context8) {
						while (1) {
							switch (_context8.prev = _context8.next) {
								case 0:
									this.validate(this[_symbols.$$value], ['commit']);
									(0, _ObservableSet.copySetContent)(this[_symbols.$$pristine], this[_symbols.$$value]);
									this.e('commit').next(this[_symbols.$$value]);
	
								case 3:
								case 'end':
									return _context8.stop();
							}
						}
					}, _callee, this);
				}));
	
				function commit() {
					return _ref9.apply(this, arguments);
				}
	
				return commit;
			}()
		}, {
			key: 'rollback',
			value: function rollback() {
				(0, _ObservableSet.copySetContent)(this[_symbols.$$value], this[_symbols.$$pristine]);
				this.e('rollback').next(this[_symbols.$$value]);
			}
		}]);
	
		return Rel$Field;
	}(_Field.RelField));

/***/ },
/* 195 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _templateObject = _taggedTemplateLiteral(['\n\t\t\tYou cannot set the fields \'', '\' and \'', '\'\n\t\t\tat the same time for a ', '.\n\t\t'], ['\n\t\t\tYou cannot set the fields \'', '\' and \'', '\'\n\t\t\tat the same time for a ', '.\n\t\t']),
	    _templateObject2 = _taggedTemplateLiteral(['\n\t\t\t\tNo value given for required field\n\t\t\t\t', '#', '.\n\t\t\t'], ['\n\t\t\t\tNo value given for required field\n\t\t\t\t', '#', '.\n\t\t\t']),
	    _templateObject3 = _taggedTemplateLiteral(['\n\t\t\tInvalid value \'', '\' given for field ', '#', '.\n\t\t'], ['\n\t\t\tInvalid value \'', '\' given for field ', '#', '.\n\t\t']);
	
	var _map = __webpack_require__(82);
	
	var _filter = __webpack_require__(25);
	
	var _pairwise = __webpack_require__(83);
	
	var _switchMap = __webpack_require__(85);
	
	var _startWith = __webpack_require__(84);
	
	__webpack_require__(24);
	
	var _get = __webpack_require__(139);
	
	var _get2 = _interopRequireDefault(_get);
	
	var _isUndefined = __webpack_require__(38);
	
	var _isUndefined2 = _interopRequireDefault(_isUndefined);
	
	var _isNull = __webpack_require__(142);
	
	var _isNull2 = _interopRequireDefault(_isNull);
	
	var _entries = __webpack_require__(21);
	
	var _entries2 = _interopRequireDefault(_entries);
	
	var _isObject2 = __webpack_require__(11);
	
	var _isObject3 = _interopRequireDefault(_isObject2);
	
	var _boundNativeMethods = __webpack_require__(10);
	
	var _misc = __webpack_require__(3);
	
	var _Field = __webpack_require__(28);
	
	var _symbols = __webpack_require__(29);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return right[Symbol.hasInstance](left); } else { return _instanceof(left, right); } }
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }
	
	function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	_Field.Field[_symbols.$$registerFieldClass](function (_RelField) {
		_inherits(Rel1Field, _RelField);
	
		_createClass(Rel1Field, null, [{
			key: 'initClass',
	
	
			// this[$$owner] instanceof Resource
			// this[$$key]   instanceof "-->HasInnerBorder" | "<--HasPlusBorder" | ...
			// this[$$value] instanceof IsRelatedTo
	
			////////////
			// static //
			////////////
	
			value: function initClass(_ref) {
				var _context;
	
				var cls = _ref.cls;
				var key = _ref.key;
				var readonly = _ref.desc.readonly;
	
				if (cls.prototype.hasOwnProperty(key)) {
					return;
				}
				(_context = cls.prototype, _boundNativeMethods.defineProperty).call(_context, key, _extends({
					get: function get() {
						return this.fields[key].get();
					}
				}, readonly ? undefined : {
					set: function set(val) {
						this.fields[key].set(val);
					}
				}, {
					enumerable: true,
					configurable: false
				}));
			}
		}, {
			key: _symbols.$$entriesIn,
			value: function value(cls) {
				var _context2;
	
				if (!cls.isResource) {
					return [];
				}
				return (_context2 = cls.relationships, _entries2.default).call(_context2).filter(function (_ref2) {
					var _ref3 = _slicedToArray(_ref2, 2);
	
					var desc = _ref3[1];
					return desc.cardinality.max === 1;
				}).map(function (_ref4) {
					var _ref5 = _slicedToArray(_ref4, 2);
	
					var key = _ref5[0];
					var desc = _ref5[1];
					return {
						key: key,
						desc: desc,
						relatedKeys: desc.shortcutKey ? [desc.shortcutKey] : []
					};
				});
			}
	
			//////////////
			// instance //
			//////////////
	
		}]);
	
		function Rel1Field(options) {
			var _context4;
	
			_classCallCheck(this, Rel1Field);
	
			var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Rel1Field).call(this, options));
	
			var owner = options.owner;
			var key = options.key;
			var desc = options.desc;
			var initialValue = options.initialValue;
			var waitUntilConstructed = options.waitUntilConstructed;
			var constructingOwner = options.constructingOwner;
			var related = options.related;
	
			/* you cannot give a value as an actual relation and as a shortcut at the same time */
	
			var givenShortcutInitialValue = _get2.default.call(related, [desc.shortcutKey, 'initialValue']);
			(0, _misc.constraint)(!initialValue || !givenShortcutInitialValue, (0, _misc.humanMsg)(_templateObject, key, desc.shortcutKey, _this.constructor.singular));
	
			/* set the initial value */
			_this[_symbols.$$initSet]([initialValue, initialValue], [givenShortcutInitialValue], [desc.options.auto, function () {
				var _desc$relationshipCla;
	
				return desc.relationshipClass.new((_desc$relationshipCla = {}, _defineProperty(_desc$relationshipCla, desc.keyInRelationship, _this[_symbols.$$owner]), _defineProperty(_desc$relationshipCla, desc.codomain.keyInRelationship, desc.codomain.resourceClass.newOrSingleton()), _desc$relationshipCla));
			}], [desc.options.default, function () {
				var _context3, _desc$relationshipCla2;
	
				return desc.relationshipClass.new((_desc$relationshipCla2 = {}, _defineProperty(_desc$relationshipCla2, desc.keyInRelationship, _this[_symbols.$$owner]), _defineProperty(_desc$relationshipCla2, desc.codomain.keyInRelationship, (_context3 = desc.options.default, _misc.callOrReturn).call(_context3)), _desc$relationshipCla2));
			}], [desc.cardinality.min === 0, null]);
	
			/* pull in values set in sub-fields */
			constructingOwner.subscribe({ complete: function complete() {
					var _iteratorNormalCompletion = true;
					var _didIteratorError = false;
					var _iteratorError = undefined;
	
					try {
						for (var _iterator = desc.relationshipClass.extendedBy[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
							var subCls = _step.value;
	
							var subFieldKey = subCls.keyInResource[desc.keyInRelationship];
							var subField = owner.fields[subFieldKey];
							if (!subField) {
								continue;
							}
							subField.p('value').subscribe(_this.p('value'));
						}
					} catch (err) {
						_didIteratorError = true;
						_iteratorError = err;
					} finally {
						try {
							if (!_iteratorNormalCompletion && _iterator.return) {
								_iterator.return();
							}
						} finally {
							if (_didIteratorError) {
								throw _iteratorError;
							}
						}
					}
				} });
	
			/* keep the relationship up to date with changes here */
			(_context4 = (_context4 = (_context4 = _this.p('value'), waitUntilConstructed).call(_context4), _startWith.startWith).call(_context4, null), _pairwise.pairwise).call(_context4).subscribe(function (_ref6) {
				var _ref7 = _slicedToArray(_ref6, 2);
	
				var prev = _ref7[0];
				var curr = _ref7[1];
	
				if (prev) {
					prev.fields[desc.keyInRelationship].set(null);
				}
				if (curr) {
					curr.fields[desc.keyInRelationship].set(_this[_symbols.$$owner]);
				}
			});
	
			/* set the value of this field to null when the relationship replaces this resource */
			(_context4 = (_context4 = (_context4 = (_context4 = (_context4 = _this.p('value'), waitUntilConstructed).call(_context4), _filter.filter).call(_context4, _isObject3.default), _switchMap.switchMap).call(_context4, function (newRel) {
				return newRel.fields[desc.keyInRelationship].p('value');
			}), _filter.filter).call(_context4, function (res) {
				return res !== owner;
			}), _map.map).call(_context4, function () {
				return null;
			}).subscribe(_this.p('value'));
			return _this;
		}
	
		_createClass(Rel1Field, [{
			key: 'validate',
			value: function validate(val) {
				var stages = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];
	
	
				var notGiven = _isNull2.default.call(val) || _isUndefined2.default.call(val);
	
				if (stages.includes('commit')) {
					/* if there's a minimum cardinality, a value must have been given */
					(0, _misc.constraint)(!notGiven || this[_symbols.$$desc].cardinality.min === 0, (0, _misc.humanMsg)(_templateObject2, this[_symbols.$$owner].constructor.name, this[_symbols.$$key]));
				}
	
				/* the value must be of the proper domain */
				var expectedRelationshipClass = this[_symbols.$$desc].relationshipClass;
				var hasCompatibleType = expectedRelationshipClass.hasInstance(val);
				(0, _misc.constraint)(notGiven || hasCompatibleType, (0, _misc.humanMsg)(_templateObject3, val, this[_symbols.$$owner].constructor.name, this[_symbols.$$key]));
	
				// TODO: these should not be assertions, but proper constraint-checks,
				//     : recording errors, possibly allowing them temporarily, etc.
			}
		}]);
	
		return Rel1Field;
	}(_Field.RelField));

/***/ },
/* 196 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _templateObject = _taggedTemplateLiteral(['\n\t\t\tYou\'re trying to set a readonly field ', '#', '.\n\t\t'], ['\n\t\t\tYou\'re trying to set a readonly field ', '#', '.\n\t\t']),
	    _templateObject2 = _taggedTemplateLiteral(['\n\t\t\tThe value ', ' given for ', '#', '\n\t\t\tis not an iterable collection (like array or set).\n\t\t'], ['\n\t\t\tThe value ', ' given for ', '#', '\n\t\t\tis not an iterable collection (like array or set).\n\t\t']),
	    _templateObject3 = _taggedTemplateLiteral(['\n\t\t\t\tThe number of values in field ', '#', '\n\t\t\t\tis not within the expected range [', ', ', '].\n\t\t\t'], ['\n\t\t\t\tThe number of values in field ', '#', '\n\t\t\t\tis not within the expected range [', ', ', '].\n\t\t\t']),
	    _templateObject4 = _taggedTemplateLiteral(['\n\t\t\t\tInvalid value ', ' given as element for\n\t\t\t\t', '#', '.\n\t\t\t'], ['\n\t\t\t\tInvalid value ', ' given as element for\n\t\t\t\t', '#', '.\n\t\t\t']);
	
	var _filter = __webpack_require__(25);
	
	var _pairwise = __webpack_require__(83);
	
	var _takeUntil = __webpack_require__(174);
	
	var _take = __webpack_require__(417);
	
	var _startWith = __webpack_require__(84);
	
	__webpack_require__(24);
	
	var _inRange = __webpack_require__(140);
	
	var _inRange2 = _interopRequireDefault(_inRange);
	
	var _size = __webpack_require__(106);
	
	var _size2 = _interopRequireDefault(_size);
	
	var _entries = __webpack_require__(21);
	
	var _entries2 = _interopRequireDefault(_entries);
	
	var _boundNativeMethods = __webpack_require__(10);
	
	var _ObservableSet = __webpack_require__(96);
	
	var _ObservableSet2 = _interopRequireDefault(_ObservableSet);
	
	var _misc = __webpack_require__(3);
	
	var _Field = __webpack_require__(28);
	
	var _symbols = __webpack_require__(29);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return right[Symbol.hasInstance](left); } else { return _instanceof(left, right); } }
	
	function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }
	
	function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	_Field.Field[_symbols.$$registerFieldClass](function (_RelField) {
		_inherits(RelShortcut$Field, _RelField);
	
		_createClass(RelShortcut$Field, null, [{
			key: 'initClass',
	
	
			// this[$$owner] instanceof Resource
			// this[$$key]   instanceof "materials" | "parts" | "incomingProcesses" | ...
			// this[$$value] instanceof Set<Resource>
	
			////////////
			// static //
			////////////
	
			value: function initClass(_ref) {
				var _context;
	
				var key = _ref.key;
				var cls = _ref.cls;
				var readonly = _ref.desc.readonly;
	
				if (cls.prototype.hasOwnProperty(key)) {
					return;
				}
				(_context = cls.prototype, _boundNativeMethods.defineProperty).call(_context, key, _extends({
					get: function get() {
						return this.fields[key].get();
					}
				}, readonly ? undefined : {
					set: function set(val) {
						this.fields[key].set(val);
					}
				}, {
					enumerable: true,
					configurable: false
				}));
			}
		}, {
			key: _symbols.$$entriesIn,
			value: function value(cls) {
				var _context2;
	
				if (!cls.isResource) {
					return [];
				}
				return (_context2 = cls.relationshipShortcuts, _entries2.default).call(_context2).filter(function (_ref2) {
					var _ref3 = _slicedToArray(_ref2, 2);
	
					var rel = _ref3[1];
					return rel.cardinality.max > 1;
				}).map(function (_ref4) {
					var _ref5 = _slicedToArray(_ref4, 2);
	
					var key = _ref5[0];
					var desc = _ref5[1];
					return {
						key: key,
						desc: desc,
						relatedKeys: desc.keyInResource ? [desc.keyInResource] : []
					};
				});
			}
		}]);
	
		//////////////
		// instance //
		//////////////
	
		function RelShortcut$Field(options) {
			var _context3;
	
			_classCallCheck(this, RelShortcut$Field);
	
			var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(RelShortcut$Field).call(this, _extends({}, options, { setValueThroughSignal: false })));
	
			var owner = options.owner;
			var desc = options.desc;
			var initialValue = options.initialValue;
			var waitUntilConstructed = options.waitUntilConstructed;
			var related = options.related;
	
	
			_boundNativeMethods.defineProperty.call(_this, _symbols.$$pristine, { value: new Set() });
			_boundNativeMethods.defineProperty.call(_this, _symbols.$$value, { value: new _ObservableSet2.default() });
	
			/* syncing with relationship field */
			var correspondingRelField = owner.fields[desc.keyInResource][_symbols.$$value];
			(_context3 = correspondingRelField.e('add'), waitUntilConstructed).call(_context3).subscribe(function (newRel) {
				var _context4;
	
				var newRelDisconnected = (_context4 = (_context4 = newRel.fields[desc.keyInRelationship].p('value'), _filter.filter).call(_context4, function (v) {
					return v !== owner;
				}), _take.take).call(_context4, 1);
				(_context4 = (_context4 = (_context4 = newRel.fields[desc.codomain.keyInRelationship].p('value'), _takeUntil.takeUntil).call(_context4, newRelDisconnected), _startWith.startWith).call(_context4, null), _pairwise.pairwise).call(_context4).subscribe(function (_ref6) {
					var _ref7 = _slicedToArray(_ref6, 2);
	
					var prev = _ref7[0];
					var curr = _ref7[1];
	
					if (prev) {
						_this[_symbols.$$value].delete(prev);
					}
					if (curr) {
						_this[_symbols.$$value].add(curr);
					}
				});
				newRelDisconnected.subscribe(function () {
					_this[_symbols.$$value].delete(newRel.fields[desc.codomain.keyInRelationship][_symbols.$$value]);
				});
			});
	
			/* syncing with relationship field */
			(_context3 = _this[_symbols.$$value].e('add'), waitUntilConstructed).call(_context3).subscribe(function (newRes) {
				var rel = [].concat(_toConsumableArray(correspondingRelField)).find(function (rel) {
					return rel.fields[desc.keyInRelationship].get() === owner && rel.fields[desc.codomain.keyInRelationship].get() === newRes;
				});
				if (!rel) {
					var _desc$relationshipCla;
	
					correspondingRelField.add(desc.relationshipClass.new((_desc$relationshipCla = {}, _defineProperty(_desc$relationshipCla, desc.keyInRelationship, owner), _defineProperty(_desc$relationshipCla, desc.codomain.keyInRelationship, newRes), _desc$relationshipCla)));
				}
			});
	
			/* handle initial values */
			if (initialValue !== undefined) {
				var _iteratorNormalCompletion = true;
				var _didIteratorError = false;
				var _iteratorError = undefined;
	
				try {
					for (var _iterator = initialValue[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
						var res = _step.value;
	
						// TODO: - rel may be a reference to an existing resource;
						//     :   then go get it
						//     : - It may also be a description of a new resource;
						//     :   then create it
						_this[_symbols.$$pristine].add(res);
						_this[_symbols.$$value].add(res);
					}
				} catch (err) {
					_didIteratorError = true;
					_iteratorError = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion && _iterator.return) {
							_iterator.return();
						}
					} finally {
						if (_didIteratorError) {
							throw _iteratorError;
						}
					}
				}
			}
	
			/* emit 'value' signals (but note that setValueThroughSignal = false) */
			(_context3 = _this[_symbols.$$value].p('value'), waitUntilConstructed).call(_context3).subscribe(_this.p('value'));
	
			return _this;
		}
	
		_createClass(RelShortcut$Field, [{
			key: 'set',
			value: function set(newValue) {
				var _ref8 = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
				var _ref8$ignoreReadonly = _ref8.ignoreReadonly;
				var ignoreReadonly = _ref8$ignoreReadonly === undefined ? false : _ref8$ignoreReadonly;
				var _ref8$ignoreValidatio = _ref8.ignoreValidation;
				var ignoreValidation = _ref8$ignoreValidatio === undefined ? false : _ref8$ignoreValidatio;
				var _ref8$updatePristine = _ref8.updatePristine;
				var updatePristine = _ref8$updatePristine === undefined ? false : _ref8$updatePristine;
	
				(0, _misc.constraint)(ignoreReadonly || !this[_symbols.$$desc].readonly, (0, _misc.humanMsg)(_templateObject, this[_symbols.$$owner].constructor.name, this[_symbols.$$key]));
				if (!ignoreValidation) {
					this.validate(newValue, ['set']);
				}
				if (updatePristine) {
					(0, _ObservableSet.copySetContent)(this[_symbols.$$pristine], newValue);
				}
				(0, _ObservableSet.copySetContent)(this[_symbols.$$value], newValue);
			}
		}, {
			key: 'validate',
			value: function validate(val) {
				var stages = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];
	
				(0, _misc.constraint)(val[Symbol.iterator], (0, _misc.humanMsg)(_templateObject2, val, this[_symbols.$$owner].constructor.name, this[_symbols.$$key]));
				if (stages.includes('commit')) {
					var _context5;
	
					var _$$desc$cardinality = this[_symbols.$$desc].cardinality;
					var min = _$$desc$cardinality.min;
					var max = _$$desc$cardinality.max;
	
					(0, _misc.constraint)((_context5 = _size2.default.call(val), _inRange2.default).call(_context5, min, max + 1), (0, _misc.humanMsg)(_templateObject3, this[_symbols.$$owner].constructor.name, this[_symbols.$$key], min, max));
				}
				val.forEach(this.validateElement.bind(this));
			}
		}, {
			key: 'validateElement',
			value: function validateElement(element) {
				/* the value must be of the proper domain */
				if (!this[_symbols.$$desc].codomain.resourceClass.hasInstance(element)) {
					throw new Error((0, _misc.humanMsg)(_templateObject4, element, this[_symbols.$$owner].constructor.name, this[_symbols.$$key]));
				}
			}
		}, {
			key: 'commit',
			value: function () {
				var _ref9 = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
					return regeneratorRuntime.wrap(function _callee$(_context6) {
						while (1) {
							switch (_context6.prev = _context6.next) {
								case 0:
									this.validate(this[_symbols.$$value], ['commit']);
									(0, _ObservableSet.copySetContent)(this[_symbols.$$pristine], this[_symbols.$$value]);
									this.e('commit').next(this[_symbols.$$value]);
	
								case 3:
								case 'end':
									return _context6.stop();
							}
						}
					}, _callee, this);
				}));
	
				function commit() {
					return _ref9.apply(this, arguments);
				}
	
				return commit;
			}()
		}, {
			key: 'rollback',
			value: function rollback() {
				(0, _ObservableSet.copySetContent)(this[_symbols.$$value], this[_symbols.$$pristine]);
				this.e('rollback').next(this[_symbols.$$value]);
			}
		}]);
	
		return RelShortcut$Field;
	}(_Field.RelField));

/***/ },
/* 197 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _templateObject = _taggedTemplateLiteral(['\n\t\t\t\tNo value given for required field ', '#', '.\n\t\t\t'], ['\n\t\t\t\tNo value given for required field ', '#', '.\n\t\t\t']),
	    _templateObject2 = _taggedTemplateLiteral(['\n\t\t\tInvalid value \'', '\' given for field ', '#', '.\n\t\t'], ['\n\t\t\tInvalid value \'', '\' given for field ', '#', '.\n\t\t']);
	
	var _filter = __webpack_require__(25);
	
	var _switchMap = __webpack_require__(85);
	
	var _defer = __webpack_require__(409);
	
	__webpack_require__(24);
	
	var _entries = __webpack_require__(21);
	
	var _entries2 = _interopRequireDefault(_entries);
	
	var _isObject = __webpack_require__(68);
	
	var _isObject2 = _interopRequireDefault(_isObject);
	
	var _boundNativeMethods = __webpack_require__(10);
	
	var _misc = __webpack_require__(3);
	
	var _Field = __webpack_require__(28);
	
	var _symbols = __webpack_require__(29);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return right[Symbol.hasInstance](left); } else { return _instanceof(left, right); } }
	
	function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	_Field.Field[_symbols.$$registerFieldClass](function (_RelField) {
		_inherits(RelShortcut1Field, _RelField);
	
		_createClass(RelShortcut1Field, null, [{
			key: 'initClass',
	
	
			// this[$$owner] instanceof Resource
			// this[$$key]   instanceof "innerBorder" | "plusBorder" | ...
			// this[$$value] instanceof Resource
	
			////////////
			// static //
			////////////
	
			value: function initClass(_ref) {
				var _context;
	
				var key = _ref.key;
				var cls = _ref.cls;
				var readonly = _ref.desc.readonly;
	
				if (cls.prototype.hasOwnProperty(key)) {
					return;
				}
				(_context = cls.prototype, _boundNativeMethods.defineProperty).call(_context, key, _extends({
					get: function get() {
						return this.fields[key].get();
					}
				}, readonly ? {} : {
					set: function set(val) {
						this.fields[key].set(val);
					}
				}, {
					enumerable: true,
					configurable: false
				}));
			}
		}, {
			key: _symbols.$$entriesIn,
			value: function value(cls) {
				var _context2;
	
				if (!cls.isResource) {
					return [];
				}
				return (_context2 = cls.relationshipShortcuts, _entries2.default).call(_context2).filter(function (_ref2) {
					var _ref3 = _slicedToArray(_ref2, 2);
	
					var rel = _ref3[1];
					return rel.cardinality.max === 1;
				}).map(function (_ref4) {
					var _ref5 = _slicedToArray(_ref4, 2);
	
					var key = _ref5[0];
					var desc = _ref5[1];
					return {
						key: key,
						desc: desc,
						relatedKeys: desc.keyInResource ? [desc.keyInResource] : []
					};
				});
			}
	
			//////////////
			// instance //
			//////////////
	
		}]);
	
		function RelShortcut1Field(options) {
			var _context3;
	
			_classCallCheck(this, RelShortcut1Field);
	
			var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(RelShortcut1Field).call(this, options));
	
			var owner = options.owner;
			var key = options.key;
			var desc = options.desc;
			var initialValue = options.initialValue;
			var waitUntilConstructed = options.waitUntilConstructed;
			var related = options.related;
	
			/* set the initial value */
			// shortcuts are only initialized with explicit initial values;
			// all the fallback options are left to the actual relationship field,
			// so that the two don't compete. Therefore, this constructor is very
			// forgiving. The constraint checks are done on the other constructor.
	
			_this[_symbols.$$initSet]([initialValue, initialValue], [true]);
	
			var correspondingRelValue = (_context3 = (0, _defer.defer)(function () {
				return owner.fields[desc.keyInResource].p('value');
			}), waitUntilConstructed).call(_context3);
	
			/* keep this value up to date with new sides of new relationships */
			(_context3 = _filter.filter.call(correspondingRelValue, function (v) {
				return v;
			}), _switchMap.switchMap).call(_context3, function (rel) {
				return rel.fields[desc.codomain.keyInRelationship].p('value');
			}).subscribe(_this.p('value'));
	
			/* keep the relationship up to date */
			(_context3 = _this.p('value'), waitUntilConstructed).call(_context3).subscribe(function (scValue) {
				var relValue = owner.fields[desc.keyInResource].get();
				if (relValue) {
					relValue.fields[desc.codomain.keyInRelationship].set(scValue || null);
				} else if (scValue && !desc.relationshipClass.abstract) {
					var _desc$relationshipCla;
	
					// TODO: Is the abstractness test above really the best way?
					owner.fields[desc.keyInResource].set(desc.relationshipClass.new((_desc$relationshipCla = {}, _defineProperty(_desc$relationshipCla, desc.keyInRelationship, owner), _defineProperty(_desc$relationshipCla, desc.codomain.keyInRelationship, scValue), _desc$relationshipCla)));
				}
			});
			return _this;
		}
	
		_createClass(RelShortcut1Field, [{
			key: 'validate',
			value: function validate(val) {
				var stages = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];
	
	
				if (stages.includes('commit')) {
					/* if there's a minimum cardinality, a value must have been given */
					(0, _misc.constraint)(_isObject2.default.call(val) || this[_symbols.$$desc].cardinality.min === 0, (0, _misc.humanMsg)(_templateObject, this[_symbols.$$owner].constructor.name, this[_symbols.$$key]));
				}
	
				/* a given value must always be of the proper domain */
				(0, _misc.constraint)(!_isObject2.default.call(val) || this[_symbols.$$desc].codomain.resourceClass.hasInstance(val), (0, _misc.humanMsg)(_templateObject2, val, this[_symbols.$$owner].constructor.name, this[_symbols.$$key]));
	
				// TODO: these should not be assertions, but proper constraint-checks,
				//     : recording errors, possibly allowing them temporarily, etc.
			}
		}]);
	
		return RelShortcut1Field;
	}(_Field.RelField));

/***/ },
/* 198 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _templateObject = _taggedTemplateLiteral(['\n\t\t\t    No resource specified for side ', ' of\n\t\t\t\tthis \'', '\'.\n\t\t\t'], ['\n\t\t\t    No resource specified for side ', ' of\n\t\t\t\tthis \'', '\'.\n\t\t\t']),
	    _templateObject2 = _taggedTemplateLiteral(['\n\t\t\tInvalid value \'', '\' given for ', '#', '.\n\t\t'], ['\n\t\t\tInvalid value \'', '\' given for ', '#', '.\n\t\t']);
	
	var _filter = __webpack_require__(25);
	
	var _pairwise = __webpack_require__(83);
	
	var _startWith = __webpack_require__(84);
	
	__webpack_require__(24);
	
	var _isUndefined = __webpack_require__(38);
	
	var _isUndefined2 = _interopRequireDefault(_isUndefined);
	
	var _isNull = __webpack_require__(142);
	
	var _isNull2 = _interopRequireDefault(_isNull);
	
	var _isObject = __webpack_require__(68);
	
	var _isObject2 = _interopRequireDefault(_isObject);
	
	var _boundNativeMethods = __webpack_require__(10);
	
	var _misc = __webpack_require__(3);
	
	var _Field2 = __webpack_require__(28);
	
	var _symbols = __webpack_require__(29);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return right[Symbol.hasInstance](left); } else { return _instanceof(left, right); } }
	
	function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }
	
	function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	_Field2.Field[_symbols.$$registerFieldClass](function (_Field) {
		_inherits(SideField, _Field);
	
		_createClass(SideField, null, [{
			key: 'initClass',
	
	
			// this[$$owner] instanceof RelatedTo
			// this[$$key]   instanceof 1 | 2
			// this[$$value] instanceof Resource
	
			////////////
			// static //
			////////////
	
			value: function initClass(_ref) {
				var _context;
	
				var cls = _ref.cls;
				var key = _ref.key;
				var readonly = _ref.desc.readonly;
	
				if (cls.prototype.hasOwnProperty(key)) {
					return;
				}
				(_context = cls.prototype, _boundNativeMethods.defineProperty).call(_context, key, _extends({
					get: function get() {
						return this.fields[key].get();
					}
				}, readonly ? undefined : {
					set: function set(val) {
						this.fields[key].set(val);
					}
				}, {
					enumerable: true,
					configurable: false
				}));
			}
		}, {
			key: _symbols.$$entriesIn,
			value: function value(cls) {
				if (!cls.isRelationship) {
					return [];
				}
				return [{ key: 1, cls: cls, desc: cls.domainPairs[0][1], relatedKeys: [2] }, { key: 2, cls: cls, desc: cls.domainPairs[0][2], relatedKeys: [1] }];
				// TODO: unify multiple overlapping domainPairs when needed
			}
	
			//////////////
			// instance //
			//////////////
	
		}]);
	
		function SideField(options) {
			var _context2;
	
			_classCallCheck(this, SideField);
	
			var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(SideField).call(this, options));
	
			var owner = options.owner;
			var desc = options.desc;
			var key = options.key;
			var initialValue = options.initialValue;
			var waitUntilConstructed = options.waitUntilConstructed;
	
			/* set the initial value */
	
			_this[_symbols.$$initSet]([_isObject2.default.call(initialValue) || _isNull2.default.call(initialValue), initialValue], [desc.resourceClass.singleton, (_context2 = desc.resourceClass).getSingleton.bind(_context2)], [desc.options.auto, (_context2 = desc.resourceClass).new.bind(_context2)]);
	
			/* if one side becomes null, then so does the other, */
			/* releasing the relationship                        */
			(_context2 = (_context2 = _this.p('value'), waitUntilConstructed).call(_context2), _filter.filter).call(_context2, function (v) {
				return v === null;
			}).subscribe(owner.fields[desc.codomain.keyInRelationship]);
	
			/* when a side changes, let the relevant resources know */
			(_context2 = (_context2 = (_context2 = _this.p('value'), _startWith.startWith).call(_context2, null), waitUntilConstructed).call(_context2), _pairwise.pairwise).call(_context2).subscribe(function (_ref2) {
				var _ref3 = _slicedToArray(_ref2, 2);
	
				var prev = _ref3[0];
				var curr = _ref3[1];
	
				if (desc.cardinality.max === 1) {
					if (prev) {
						prev.fields[desc.keyInResource].set(null);
					}
					if (curr) {
						curr.fields[desc.keyInResource].set(_this[_symbols.$$owner]);
					}
				} else {
					if (prev) {
						prev.fields[desc.keyInResource].get().delete(_this[_symbols.$$owner]);
					}
					if (curr) {
						curr.fields[desc.keyInResource].get().add(_this[_symbols.$$owner]);
					}
				}
			});
	
			return _this;
		}
	
		_createClass(SideField, [{
			key: 'validate',
			value: function validate(val) {
				var stages = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];
	
	
				var notGiven = _isNull2.default.call(val) || _isUndefined2.default.call(val);
	
				if (stages.includes('commit')) {
					/* if there's a minimum cardinality, a value must have been given */
					(0, _misc.constraint)(!notGiven, (0, _misc.humanMsg)(_templateObject, this[_symbols.$$key], this[_symbols.$$owner].constructor.name));
				}
	
				/* the value must be of the proper domain */
				(0, _misc.constraint)(notGiven || this[_symbols.$$desc].resourceClass.hasInstance(val), (0, _misc.humanMsg)(_templateObject2, val, this[_symbols.$$owner].constructor.name, this[_symbols.$$key]));
	
				// TODO: these should not be assertions, but proper constraint-checks,
				//     : recording errors, possibly allowing them temporarily, etc.
			}
		}]);
	
		return SideField;
	}(_Field2.Field));

/***/ },
/* 199 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _resources = __webpack_require__(13);
	
	var _resources2 = _interopRequireDefault(_resources);
	
	var _typed = __webpack_require__(18);
	
	var _typed2 = _interopRequireDefault(_typed);
	
	var _lyphs = __webpack_require__(32);
	
	var _lyphs2 = _interopRequireDefault(_lyphs);
	
	var _groups = __webpack_require__(93);
	
	var _groups2 = _interopRequireDefault(_groups);
	
	var _measurables = __webpack_require__(94);
	
	var _measurables2 = _interopRequireDefault(_measurables);
	
	var _processes = __webpack_require__(95);
	
	var _processes2 = _interopRequireDefault(_processes);
	
	var _canonicalTrees = __webpack_require__(200);
	
	var _canonicalTrees2 = _interopRequireDefault(_canonicalTrees);
	
	var _research = __webpack_require__(202);
	
	var _research2 = _interopRequireDefault(_research);
	
	var _visualisations = __webpack_require__(203);
	
	var _visualisations2 = _interopRequireDefault(_visualisations);
	
	var _omegaTrees = __webpack_require__(201);
	
	var _omegaTrees2 = _interopRequireDefault(_omegaTrees);
	
	var _Module = __webpack_require__(46);
	
	var _Module2 = _interopRequireDefault(_Module);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = _Module2.default.create('all', [_resources2.default, _typed2.default, _lyphs2.default, _groups2.default, _measurables2.default, _processes2.default, _research2.default, _visualisations2.default, _omegaTrees2.default, // TODO: <- remove when we've switched to canonical trees
	_canonicalTrees2.default]);
	// TODO: ^ remove when we've switched to canonicalTrees

/***/ },
/* 200 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
	
	var _TypedModule = __webpack_require__(27);
	
	var _TypedModule2 = _interopRequireDefault(_TypedModule);
	
	var _resources = __webpack_require__(13);
	
	var _resources2 = _interopRequireDefault(_resources);
	
	var _typed = __webpack_require__(18);
	
	var _typed2 = _interopRequireDefault(_typed);
	
	var _groups = __webpack_require__(93);
	
	var _groups2 = _interopRequireDefault(_groups);
	
	var _lyphs = __webpack_require__(32);
	
	var _lyphs2 = _interopRequireDefault(_lyphs);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// TODO: remove this file when we've switched to canonicalTrees module
	console.warn('Natallia: Note that the canonicalTrees module is now available. Give me a call on how to switch.');
	
	exports.default = _TypedModule2.default.create('canonicalTrees', [_resources2.default, _typed2.default, _groups2.default, _lyphs2.default], function (M, _ref) {
		var IsRelatedTo = _ref.IsRelatedTo;
		var Template = _ref.Template;
		var Resource = _ref.Resource;
		var Lyph = _ref.Lyph;
		var Node = _ref.Node;
		var Has = _ref.Has;
		var PullsIntoTypeDefinition = _ref.PullsIntoTypeDefinition;
	
	
		var CanonicalTree = M.TYPED_RESOURCE({ ////////////////////////////////////
	
			name: 'CanonicalTree',
	
			extends: Resource,
	
			singular: "canonical tree"
	
		}); /////////////////////////////////////////////////////////////////////////
	
		var CanonicalTreeBranch = M.TYPED_RESOURCE({ //////////////////////////////
	
			name: 'CanonicalTreeBranch',
	
			extends: Resource,
	
			singular: "canonical tree branch",
					
			plural: "canonical tree branches",
	
		}); /////////////////////////////////////////////////////////////////////////
	
		var _M$RELATIONSHIP = M.RELATIONSHIP([{
	
			name: 'BranchesTo',
	
			extends: PullsIntoTypeDefinition,
	
			singular: "branches to",
	
			1: [CanonicalTree, '0..*', { key: 'childBranches' }],
			2: [CanonicalTreeBranch, '1..1', { anchors: true, key: 'parentTree' }]
	
		}, {
	
			name: 'BranchesTo',
	
			extends: PullsIntoTypeDefinition,
	
			singular: "branches to",
	
			1: [CanonicalTreeBranch, '1..1', { anchors: true, key: 'childTree' }],
			2: [CanonicalTree, '0..1', { key: 'parentBranch' }]
	
		}]);
	
		var _M$RELATIONSHIP2 = _slicedToArray(_M$RELATIONSHIP, 1);
	
		var FlowsTo = _M$RELATIONSHIP2[0];
	
	
		var IsConveyedBy = M.RELATIONSHIP({
	
			name: 'IsConveyedBy',
	
			extends: IsRelatedTo,
	
			singular: "is conveyed by",
	
			1: [CanonicalTreeBranch, '0..1', { anchors: true, key: 'conveyingLyphType' }],
			2: [Lyph.Type, '0..*', {}]
	
		});
	});

/***/ },
/* 201 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _TypedModule = __webpack_require__(27);
	
	var _TypedModule2 = _interopRequireDefault(_TypedModule);
	
	var _resources = __webpack_require__(13);
	
	var _resources2 = _interopRequireDefault(_resources);
	
	var _typed = __webpack_require__(18);
	
	var _typed2 = _interopRequireDefault(_typed);
	
	var _groups = __webpack_require__(93);
	
	var _groups2 = _interopRequireDefault(_groups);
	
	var _lyphs = __webpack_require__(32);
	
	var _lyphs2 = _interopRequireDefault(_lyphs);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = _TypedModule2.default.create('omegaTrees', [_resources2.default, _typed2.default, _groups2.default, _lyphs2.default], function (M, _ref) {
		var IsRelatedTo = _ref.IsRelatedTo;
		var Template = _ref.Template;
		var Group = _ref.Group;
		var Lyph = _ref.Lyph;
		var Node = _ref.Node;
		var Has = _ref.Has;
		var PullsIntoTypeDefinition = _ref.PullsIntoTypeDefinition;
	
	
		var OmegaTree = M.TYPED_RESOURCE({ ////////////////////////////////////////
	
			name: 'OmegaTree',
	
			extends: Group,
	
			singular: "omega tree"
	
		}); /////////////////////////////////////////////////////////////////////////
	
	
		var HasAsRoot = M.RELATIONSHIP({
	
			name: 'HasAsRoot',
	
			extends: PullsIntoTypeDefinition,
	
			singular: "has as root",
	
			1: [OmegaTree, '0..*', { anchors: true, key: 'root' }],
			2: [Node, '0..*']
	
		});
	
		var OmegaTreePart = M.TYPED_RESOURCE({ ////////////////////////////////////
	
			name: 'OmegaTreePart',
	
			abstract: true,
	
			extends: Template,
			extendedBy: [Lyph, OmegaTree],
	
			singular: "omega tree part"
	
		}); /////////////////////////////////////////////////////////////////////////
	
	
		var HasTreeChildren = M.RELATIONSHIP({
	
			name: 'HasTreeChildren',
	
			extends: PullsIntoTypeDefinition,
	
			singular: "has tree-children",
	
			1: [OmegaTreePart, '0..*', { key: 'treeChildren' }],
			2: [OmegaTreePart, '0..1', { key: 'treeParent' }],
	
			noCycles: true
	
		});
	
		var HasTreePart = M.RELATIONSHIP({
	
			name: 'HasTreePart',
	
			extends: PullsIntoTypeDefinition,
	
			singular: "has tree-part",
	
			1: [OmegaTree, '0..*', { anchors: true, key: 'parts' }],
			2: [OmegaTreePart, '0..*']
	
		});
	});

/***/ },
/* 202 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _Module = __webpack_require__(46);
	
	var _Module2 = _interopRequireDefault(_Module);
	
	var _resources = __webpack_require__(13);
	
	var _resources2 = _interopRequireDefault(_resources);
	
	var _measurables = __webpack_require__(94);
	
	var _measurables2 = _interopRequireDefault(_measurables);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = _Module2.default.create('research', [_resources2.default, _measurables2.default], function (M, _ref) {
		var Resource = _ref.Resource;
		var IsRelatedTo = _ref.IsRelatedTo;
		var Measurable = _ref.Measurable;
	
	
		var Correlation = M.RESOURCE({ ////////////////////////////////////////////
	
			name: 'Correlation',
	
			extends: Resource,
	
			singular: "correlation",
	
			properties: {
				'comment': { type: 'string' }
			}
	
		}); /////////////////////////////////////////////////////////////////////////
	
	
		var InvolvesMeasurable = M.RELATIONSHIP({
	
			name: 'InvolvesMeasurable',
	
			extends: IsRelatedTo,
	
			singular: "involves measurable",
	
			1: [Correlation, '0..*', { anchors: true, key: 'measurables' }],
			2: [Measurable, '0..*']
	
		});
	
		var ClinicalIndex = M.RESOURCE({ ///////////////////////////////////////////
	
			name: 'ClinicalIndex',
	
			extends: Resource,
	
			singular: "clinical index",
			plural: "clinical indices"
	
		}); /////////////////////////////////////////////////////////////////////////
	
	
		var EncompassesClinicalIndex = M.RELATIONSHIP({
	
			name: 'EncompassesClinicalIndex',
	
			extends: IsRelatedTo,
	
			singular: "encompasses clinical index",
	
			1: [ClinicalIndex, '0..*', { anchors: true, key: 'children' }],
			2: [ClinicalIndex, '0..1', { key: 'parent' }],
	
			noCycles: true
	
		});
	
		var InvolvesClinicalIndex = M.RELATIONSHIP({
	
			name: 'InvolvesClinicalIndex',
	
			extends: IsRelatedTo,
	
			singular: "involves clinical index",
	
			1: [Correlation, '0..*', { anchors: true, key: 'clinicalIndices' }],
			2: [ClinicalIndex, '0..*']
	
		});
	
		var Publication = M.RESOURCE({ ////////////////////////////////////////////
	
			name: 'Publication',
	
			extends: Resource,
	
			singular: "publication"
	
		}); /////////////////////////////////////////////////////////////////////////
	
	
		var InvolvesPublication = M.RELATIONSHIP({
	
			name: 'InvolvesPublication',
	
			extends: IsRelatedTo,
	
			singular: "involves publication",
	
			1: [Correlation, '0..1', { anchors: true, key: 'publication' }],
			2: [Publication, '0..*', { anchors: true, key: 'correlations' }]
	
		});
	});

/***/ },
/* 203 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _TypedModule = __webpack_require__(27);
	
	var _TypedModule2 = _interopRequireDefault(_TypedModule);
	
	var _schemas = __webpack_require__(33);
	
	var _resources = __webpack_require__(13);
	
	var _resources2 = _interopRequireDefault(_resources);
	
	var _lyphs = __webpack_require__(32);
	
	var _lyphs2 = _interopRequireDefault(_lyphs);
	
	var _typed = __webpack_require__(18);
	
	var _typed2 = _interopRequireDefault(_typed);
	
	var _processes = __webpack_require__(95);
	
	var _processes2 = _interopRequireDefault(_processes);
	
	var _measurables = __webpack_require__(94);
	
	var _measurables2 = _interopRequireDefault(_measurables);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	exports.default = _TypedModule2.default.create('visualisations', [_resources2.default, _lyphs2.default, _typed2.default, _processes2.default, _measurables2.default], function (M, _ref) {
		var Resource = _ref.Resource;
		var IsRelatedTo = _ref.IsRelatedTo;
		var Material = _ref.Material;
		var Lyph = _ref.Lyph;
		var Border = _ref.Border;
		var Coalescence = _ref.Coalescence;
		var Node = _ref.Node;
		var Template = _ref.Template;
		var Process = _ref.Process;
		var Measurable = _ref.Measurable;
		var Causality = _ref.Causality;
	
	
		var Theme = M.RESOURCE({ //////////////////////////////////////////////////
	
			name: 'Theme',
	
			extends: Resource,
	
			singular: "theme"
	
		}); /////////////////////////////////////////////////////////////////////////
	
	
		var PrescribesStyleFor = M.RELATIONSHIP({
	
			name: 'PrescribesStyleFor',
	
			extends: IsRelatedTo,
	
			singular: "prescribes style for",
	
			1: [Theme, '0..*', { key: 'resources' }],
			2: [Resource, '0..*', { key: 'themes' }],
	
			patternProperties: _defineProperty({}, _schemas.identifierRegex, { type: 'string', minLength: 1 })
	
		});
	
		////////////////////////////
		//// Artefact Hierarchy ////
		////////////////////////////
	
		var Artefact = M.RESOURCE({ ///////////////////////////////////////////////
	
			name: 'Artefact',
	
			extends: Resource,
			abstract: true,
	
			singular: "artefact"
	
		}); /////////////////////////////////////////////////////////////////////////
	
		var Dim2Artefact = M.RESOURCE({ ///////////////////////////////////////////
	
			name: 'Dim2Artefact',
	
			extends: Artefact,
			abstract: true,
	
			singular: "2-dimensional artefact"
	
		}); /////////////////////////////////////////////////////////////////////////
	
		var Dim1Artefact = M.RESOURCE({ ///////////////////////////////////////////
	
			name: 'Dim1Artefact',
	
			extends: Dim2Artefact,
			abstract: true,
	
			singular: "1-dimensional artefact"
	
		}); /////////////////////////////////////////////////////////////////////////
	
		var Dim0Artefact = M.RESOURCE({ ///////////////////////////////////////////
	
			name: 'Dim0Artefact',
	
			extends: Dim1Artefact,
			abstract: true,
	
			singular: "0-dimensional artefact"
	
		}); /////////////////////////////////////////////////////////////////////////
	
	
		//////////////////////////////////////
		//// Artefact Container Hierarchy ////
		//////////////////////////////////////
	
		var ArtefactContainer = M.RESOURCE({ //////////////////////////////////////
	
			name: 'ArtefactContainer',
	
			abstract: true,
	
			extends: Artefact,
	
			singular: "artefact container"
	
		}); /////////////////////////////////////////////////////////////////////////
	
		var Dim2Container = M.RESOURCE({ //////////////////////////////////////////
	
			name: 'Dim2Container',
	
			extends: [ArtefactContainer, Dim2Artefact],
			abstract: true,
	
			singular: "2-dimensional container"
	
		}); /////////////////////////////////////////////////////////////////////////
	
		var Dim1Container = M.RESOURCE({ //////////////////////////////////////////
	
			name: 'Dim1Container',
	
			extends: [ArtefactContainer, Dim1Artefact],
			abstract: true,
	
			singular: "1-dimensional container"
	
		}); /////////////////////////////////////////////////////////////////////////
	
		var Dim0Container = M.RESOURCE({ //////////////////////////////////////////
	
			name: 'Dim0Container',
	
			extends: [ArtefactContainer, Dim0Artefact],
			abstract: true,
	
			singular: "0-dimensional container"
	
		}); /////////////////////////////////////////////////////////////////////////
	
	
		/////////////////////////////////////////////////////
		//// Artefact Containment Relationship Hierarchy ////
		/////////////////////////////////////////////////////
	
		var ContainsArtefact = M.RELATIONSHIP({
	
			name: 'ContainsArtefact',
	
			abstract: true,
	
			extends: IsRelatedTo,
	
			singular: "contains artefact",
	
			1: [ArtefactContainer, '0..*', { anchors: true, key: 'children' }],
			2: [Artefact, '0..1', { key: 'parent' }]
	
		});
	
		/* in 2-dimensional containers */
		var ContainsArtefact_22 = M.RELATIONSHIP({
	
			name: 'ContainsArtefact_22',
	
			extends: ContainsArtefact,
	
			1: [Dim2Container, '0..*', { anchors: true, key: 'children' }],
			2: [Dim2Artefact, '0..1', { key: 'parent' }],
	
			properties: {
				'x': _extends({}, _schemas.rationalNumberSchema, { required: true }),
				'y': _extends({}, _schemas.rationalNumberSchema, { required: true }),
				'rotation': _extends({}, _schemas.angleSchema, { default: 0, required: true }),
				'width': _extends({}, _schemas.rationalNumberSchema, { required: true }),
				'height': _extends({}, _schemas.rationalNumberSchema, { required: true })
			}
	
		});
		var ContainsArtefact_21 = M.RELATIONSHIP({
	
			name: 'ContainsArtefact_21',
	
			extends: ContainsArtefact_22,
	
			1: [Dim2Container, '0..*', { anchors: true, key: 'children' }],
			2: [Dim1Artefact, '0..1', { key: 'parent' }],
	
			properties: { 'height': { value: 0 } }
	
		});
		var ContainsArtefact_20 = M.RELATIONSHIP({
	
			name: 'ContainsArtefact_20',
	
			extends: ContainsArtefact_21,
	
			1: [Dim2Container, '0..*', { anchors: true, key: 'children' }],
			2: [Dim0Artefact, '0..1', { key: 'parent' }],
	
			properties: { 'width': { value: 0 } }
	
		});
	
		/* in 1-dimensional containers */
		var ContainsArtefact_11 = M.RELATIONSHIP({
	
			name: 'ContainsArtefact_11',
	
			extends: ContainsArtefact,
	
			1: [Dim1Container, '0..*', { anchors: true, key: 'children' }],
			2: [Dim1Artefact, '0..1', { key: 'parent' }],
	
			properties: {
				'x': _extends({}, _schemas.rationalNumberSchema, { required: true }),
				'width': _extends({}, _schemas.rationalNumberSchema, { required: true })
			}
	
		});
		var ContainsArtefact_10 = M.RELATIONSHIP({
	
			name: 'ContainsArtefact_10',
	
			extends: ContainsArtefact_11,
	
			1: [Dim1Container, '0..*', { anchors: true, key: 'children' }],
			2: [Dim0Artefact, '0..1', { key: 'parent' }],
	
			properties: { 'width': { value: 0 } }
	
		});
	
		/* containment in 0-dimensional containers */
		var ContainsArtefact_00 = M.RELATIONSHIP({
	
			name: 'ContainsArtefact_00',
	
			extends: ContainsArtefact,
	
			1: [Dim0Container, '0..*', { anchors: true, key: 'children' }],
			2: [Dim0Artefact, '0..1', { key: 'parent' }]
	
		});
	
		////////////////////////////
		//// Specific Artefacts ////
		////////////////////////////
	
		var LyphCanvas = M.RESOURCE({ /////////////////////////////////////////////
	
			name: 'LyphCanvas',
	
			extends: Dim2Container,
	
			singular: "lyph canvas",
			plural: "lyph canvases"
	
		}); /////////////////////////////////////////////////////////////////////////
	
		var MaterialGlyph = M.RESOURCE({ //////////////////////////////////////////
	
			name: 'MaterialGlyph',
	
			extends: Dim0Artefact,
	
			singular: "material glyph"
	
		}); /////////////////////////////////////////////////////////////////////////
	
		var LyphRectangle = M.RESOURCE({ //////////////////////////////////////////
	
			name: 'LyphRectangle',
	
			extends: Dim2Container,
	
			singular: "lyph rectangle"
	
		}); /////////////////////////////////////////////////////////////////////////
	
		var LyphArtefact = M.RESOURCE({ ///////////////////////////////////////////
	
			name: 'LyphArtefact',
	
			extends: Dim2Container,
			extendedBy: [LyphCanvas, LyphRectangle],
	
			singular: "lyph artefact"
	
		}); /////////////////////////////////////////////////////////////////////////
	
		var BorderLine = M.RESOURCE({ /////////////////////////////////////////////
	
			name: 'BorderLine',
	
			extends: Dim1Container,
	
			singular: "border line"
	
		}); /////////////////////////////////////////////////////////////////////////
	
		var CoalescenceRectangle = M.RESOURCE({ ///////////////////////////////////
	
			name: 'CoalescenceRectangle',
	
			extends: Dim2Container,
	
			singular: "coalescence rectangle"
	
		}); /////////////////////////////////////////////////////////////////////////
	
		var NodeGlyph = M.RESOURCE({ //////////////////////////////////////////////
	
			name: 'NodeGlyph',
	
			extends: Dim0Container,
	
			singular: "node glyph"
	
		}); /////////////////////////////////////////////////////////////////////////
	
		var ProcessEdge = M.RESOURCE({ ////////////////////////////////////////////
	
			name: 'ProcessEdge',
	
			extends: Dim1Container,
	
			singular: "process edge"
	
		}); /////////////////////////////////////////////////////////////////////////
	
		var MeasurableGlyph = M.RESOURCE({ ////////////////////////////////////////
	
			name: 'MeasurableGlyph',
	
			extends: Dim0Artefact,
	
			singular: "measurable glyph"
	
		}); /////////////////////////////////////////////////////////////////////////
	
		var CausalityArrow = M.RESOURCE({ /////////////////////////////////////////
	
			name: 'CausalityArrow',
	
			extends: Dim1Artefact,
	
			singular: "causality arrow"
	
		}); /////////////////////////////////////////////////////////////////////////
	
	
		////////////////////////////////////////
		//// Model - Artefact Relationships ////
		////////////////////////////////////////
	
		var _M$RELATIONSHIP = M.RELATIONSHIP([[Artefact, Template], [MaterialGlyph, Material], [LyphArtefact, Lyph], [LyphCanvas, Lyph], // TODO: Tests fail if these two
		[LyphRectangle, Lyph], //     : lines are left out.
		[BorderLine, Border], [NodeGlyph, Node], [ProcessEdge, Process], [MeasurableGlyph, Measurable], [CausalityArrow, Causality], [CoalescenceRectangle, Coalescence]].map(function (_ref2) {
			var _ref3 = _slicedToArray(_ref2, 2);
	
			var ArtefactClass = _ref3[0];
			var ModelClass = _ref3[1];
			return {
	
				name: 'PresentsModel',
	
				extends: IsRelatedTo,
	
				singular: "presents model",
	
				1: [ArtefactClass, '1..1', { anchors: true, key: 'model' }],
				2: [ModelClass, '0..*']
	
			};
		}));
	
		var _M$RELATIONSHIP2 = _slicedToArray(_M$RELATIONSHIP, 1);
	
		var PresentsModel = _M$RELATIONSHIP2[0];
	});

/***/ },
/* 204 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = "\n\tfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\t\n\tfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\t\n\tfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n";

/***/ },
/* 205 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _functionGenerator = __webpack_require__(19);
	
	var _functionGenerator2 = _interopRequireDefault(_functionGenerator);
	
	exports['default'] = (0, _functionGenerator2['default'])(ArrayBuffer, ['isView', 'transfer']);
	module.exports = exports['default'];

/***/ },
/* 206 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _functionGenerator = __webpack_require__(19);
	
	var _functionGenerator2 = _interopRequireDefault(_functionGenerator);
	
	exports['default'] = (0, _functionGenerator2['default'])(Array, ['isArray', 'observe']);
	module.exports = exports['default'];

/***/ },
/* 207 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _functionGenerator = __webpack_require__(19);
	
	var _functionGenerator2 = _interopRequireDefault(_functionGenerator);
	
	exports['default'] = (0, _functionGenerator2['default'])(Date, ['parse'], {
	  parse: 'toUnixOffset'
	});
	module.exports = exports['default'];

/***/ },
/* 208 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _functionGenerator = __webpack_require__(19);
	
	var _functionGenerator2 = _interopRequireDefault(_functionGenerator);
	
	exports['default'] = (0, _functionGenerator2['default'])(JSON, ['parse', 'stringify'], {
	  parse: 'toObject',
	  stringify: 'toJSON'
	});
	module.exports = exports['default'];

/***/ },
/* 209 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _functionGenerator = __webpack_require__(19);
	
	var _functionGenerator2 = _interopRequireDefault(_functionGenerator);
	
	exports['default'] = (0, _functionGenerator2['default'])(Math, ['abs', 'acos', 'acosh', 'asin', 'asinh', 'atan', 'atan2', 'atanh', 'cbrt', 'ceil', 'clz32', 'cos', 'cosh', 'exp', 'expm1', 'floor', 'fround', 'hypot', 'imul', 'log', 'log10', 'log1p', 'log2', 'max', 'min', 'round', 'sign', 'sin', 'sinh', 'sqrt', 'tan', 'tanh', 'trunc']);
	module.exports = exports['default'];

/***/ },
/* 210 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _functionGenerator = __webpack_require__(19);
	
	var _functionGenerator2 = _interopRequireDefault(_functionGenerator);
	
	exports['default'] = (0, _functionGenerator2['default'])(Number, ['isFinite', 'isInteger', 'isNaN', 'isSafeInteger', 'parseFloat', 'parseInt'], {
	  parseFloat: 'toFloat',
	  parseInt: 'toInt'
	});
	module.exports = exports['default'];

/***/ },
/* 211 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _functionGenerator = __webpack_require__(19);
	
	var _functionGenerator2 = _interopRequireDefault(_functionGenerator);
	
	exports['default'] = (0, _functionGenerator2['default'])(Object, ['assign', 'create', 'defineProperties', 'defineProperty', 'freeze', 'getOwnPropertyDescriptor', 'getOwnPropertyNames', 'getOwnPropertySymbols', 'getPrototypeOf', 'is', 'isExtensible', 'isFrozen', 'isSealed', 'keys', 'observe', 'preventExtensions', 'seal', 'setPrototypeOf'], {
	  getPrototypeOf: 'getPrototype',
	  setPrototypeOf: 'setPrototype'
	});
	module.exports = exports['default'];

/***/ },
/* 212 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _functionGenerator = __webpack_require__(19);
	
	var _functionGenerator2 = _interopRequireDefault(_functionGenerator);
	
	exports['default'] = (0, _functionGenerator2['default'])(Symbol, ['for', 'keyFor'], {
	  'for': 'toSymbol',
	  keyFor: 'key'
	});
	module.exports = exports['default'];

/***/ },
/* 213 */,
/* 214 */,
/* 215 */,
/* 216 */,
/* 217 */,
/* 218 */,
/* 219 */,
/* 220 */,
/* 221 */,
/* 222 */,
/* 223 */,
/* 224 */,
/* 225 */,
/* 226 */,
/* 227 */,
/* 228 */,
/* 229 */,
/* 230 */,
/* 231 */,
/* 232 */,
/* 233 */,
/* 234 */,
/* 235 */,
/* 236 */,
/* 237 */,
/* 238 */,
/* 239 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var fn = __webpack_require__(362);
	
	module.exports = function assign() {
	  return fn.apply(undefined, [this].concat(Array.prototype.slice.apply(arguments)));
	};


/***/ },
/* 240 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var fn = __webpack_require__(364);
	
	module.exports = function assignWith() {
	  return fn.apply(undefined, [this].concat(Array.prototype.slice.apply(arguments)));
	};


/***/ },
/* 241 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var fn = __webpack_require__(365);
	
	module.exports = function at() {
	  return fn.apply(undefined, [this].concat(Array.prototype.slice.apply(arguments)));
	};


/***/ },
/* 242 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var fn = __webpack_require__(366);
	
	module.exports = function cloneDeep() {
	  return fn.apply(undefined, [this].concat(Array.prototype.slice.apply(arguments)));
	};


/***/ },
/* 243 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var fn = __webpack_require__(369);
	
	module.exports = function flatten() {
	  return fn.apply(undefined, [this].concat(Array.prototype.slice.apply(arguments)));
	};


/***/ },
/* 244 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var fn = __webpack_require__(370);
	
	module.exports = function fromPairs() {
	  return fn.apply(undefined, [this].concat(Array.prototype.slice.apply(arguments)));
	};


/***/ },
/* 245 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var fn = __webpack_require__(373);
	
	module.exports = function includes() {
	  return fn.apply(undefined, [this].concat(Array.prototype.slice.apply(arguments)));
	};


/***/ },
/* 246 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var fn = __webpack_require__(377);
	
	module.exports = function isInteger() {
	  return fn.apply(undefined, [this].concat(Array.prototype.slice.apply(arguments)));
	};


/***/ },
/* 247 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var fn = __webpack_require__(379);
	
	module.exports = function isNumber() {
	  return fn.apply(undefined, [this].concat(Array.prototype.slice.apply(arguments)));
	};


/***/ },
/* 248 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var fn = __webpack_require__(380);
	
	module.exports = function isSet() {
	  return fn.apply(undefined, [this].concat(Array.prototype.slice.apply(arguments)));
	};


/***/ },
/* 249 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var fn = __webpack_require__(56);
	
	module.exports = function isString() {
	  return fn.apply(undefined, [this].concat(Array.prototype.slice.apply(arguments)));
	};


/***/ },
/* 250 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var fn = __webpack_require__(383);
	
	module.exports = function isWeakSet() {
	  return fn.apply(undefined, [this].concat(Array.prototype.slice.apply(arguments)));
	};


/***/ },
/* 251 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var fn = __webpack_require__(386);
	
	module.exports = function max() {
	  return fn.apply(undefined, [this].concat(Array.prototype.slice.apply(arguments)));
	};


/***/ },
/* 252 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var fn = __webpack_require__(389);
	
	module.exports = function pick() {
	  return fn.apply(undefined, [this].concat(Array.prototype.slice.apply(arguments)));
	};


/***/ },
/* 253 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var fn = __webpack_require__(391);
	
	module.exports = function set() {
	  return fn.apply(undefined, [this].concat(Array.prototype.slice.apply(arguments)));
	};


/***/ },
/* 254 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var fn = __webpack_require__(396);
	
	module.exports = function trim() {
	  return fn.apply(undefined, [this].concat(Array.prototype.slice.apply(arguments)));
	};


/***/ },
/* 255 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var fn = __webpack_require__(398);
	
	module.exports = function uniq() {
	  return fn.apply(undefined, [this].concat(Array.prototype.slice.apply(arguments)));
	};


/***/ },
/* 256 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(40),
	    root = __webpack_require__(16);
	
	/* Built-in method references that are verified to be native. */
	var DataView = getNative(root, 'DataView');
	
	module.exports = DataView;


/***/ },
/* 257 */
/***/ function(module, exports, __webpack_require__) {

	var hashClear = __webpack_require__(327),
	    hashDelete = __webpack_require__(328),
	    hashGet = __webpack_require__(329),
	    hashHas = __webpack_require__(330),
	    hashSet = __webpack_require__(331);
	
	/**
	 * Creates a hash object.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function Hash(entries) {
	  var index = -1,
	      length = entries ? entries.length : 0;
	
	  this.clear();
	  while (++index < length) {
	    var entry = entries[index];
	    this.set(entry[0], entry[1]);
	  }
	}
	
	// Add methods to `Hash`.
	Hash.prototype.clear = hashClear;
	Hash.prototype['delete'] = hashDelete;
	Hash.prototype.get = hashGet;
	Hash.prototype.has = hashHas;
	Hash.prototype.set = hashSet;
	
	module.exports = Hash;


/***/ },
/* 258 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(40),
	    root = __webpack_require__(16);
	
	/* Built-in method references that are verified to be native. */
	var Promise = getNative(root, 'Promise');
	
	module.exports = Promise;


/***/ },
/* 259 */
/***/ function(module, exports, __webpack_require__) {

	var root = __webpack_require__(16);
	
	/** Built-in value references. */
	var Reflect = root.Reflect;
	
	module.exports = Reflect;


/***/ },
/* 260 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(40),
	    root = __webpack_require__(16);
	
	/* Built-in method references that are verified to be native. */
	var WeakMap = getNative(root, 'WeakMap');
	
	module.exports = WeakMap;


/***/ },
/* 261 */
/***/ function(module, exports) {

	/**
	 * Adds the key-value `pair` to `map`.
	 *
	 * @private
	 * @param {Object} map The map to modify.
	 * @param {Array} pair The key-value pair to add.
	 * @returns {Object} Returns `map`.
	 */
	function addMapEntry(map, pair) {
	  // Don't return `map.set` because it's not chainable in IE 11.
	  map.set(pair[0], pair[1]);
	  return map;
	}
	
	module.exports = addMapEntry;


/***/ },
/* 262 */
/***/ function(module, exports) {

	/**
	 * Adds `value` to `set`.
	 *
	 * @private
	 * @param {Object} set The set to modify.
	 * @param {*} value The value to add.
	 * @returns {Object} Returns `set`.
	 */
	function addSetEntry(set, value) {
	  // Don't return `set.add` because it's not chainable in IE 11.
	  set.add(value);
	  return set;
	}
	
	module.exports = addSetEntry;


/***/ },
/* 263 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `_.forEach` for arrays without support for
	 * iteratee shorthands.
	 *
	 * @private
	 * @param {Array} [array] The array to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns `array`.
	 */
	function arrayEach(array, iteratee) {
	  var index = -1,
	      length = array ? array.length : 0;
	
	  while (++index < length) {
	    if (iteratee(array[index], index, array) === false) {
	      break;
	    }
	  }
	  return array;
	}
	
	module.exports = arrayEach;


/***/ },
/* 264 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `_.filter` for arrays without support for
	 * iteratee shorthands.
	 *
	 * @private
	 * @param {Array} [array] The array to iterate over.
	 * @param {Function} predicate The function invoked per iteration.
	 * @returns {Array} Returns the new filtered array.
	 */
	function arrayFilter(array, predicate) {
	  var index = -1,
	      length = array ? array.length : 0,
	      resIndex = 0,
	      result = [];
	
	  while (++index < length) {
	    var value = array[index];
	    if (predicate(value, index, array)) {
	      result[resIndex++] = value;
	    }
	  }
	  return result;
	}
	
	module.exports = arrayFilter;


/***/ },
/* 265 */
/***/ function(module, exports, __webpack_require__) {

	var baseIndexOf = __webpack_require__(74);
	
	/**
	 * A specialized version of `_.includes` for arrays without support for
	 * specifying an index to search from.
	 *
	 * @private
	 * @param {Array} [array] The array to search.
	 * @param {*} target The value to search for.
	 * @returns {boolean} Returns `true` if `target` is found, else `false`.
	 */
	function arrayIncludes(array, value) {
	  var length = array ? array.length : 0;
	  return !!length && baseIndexOf(array, value, 0) > -1;
	}
	
	module.exports = arrayIncludes;


/***/ },
/* 266 */
/***/ function(module, exports) {

	/**
	 * This function is like `arrayIncludes` except that it accepts a comparator.
	 *
	 * @private
	 * @param {Array} [array] The array to search.
	 * @param {*} target The value to search for.
	 * @param {Function} comparator The comparator invoked per element.
	 * @returns {boolean} Returns `true` if `target` is found, else `false`.
	 */
	function arrayIncludesWith(array, value, comparator) {
	  var index = -1,
	      length = array ? array.length : 0;
	
	  while (++index < length) {
	    if (comparator(value, array[index])) {
	      return true;
	    }
	  }
	  return false;
	}
	
	module.exports = arrayIncludesWith;


/***/ },
/* 267 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `_.some` for arrays without support for iteratee
	 * shorthands.
	 *
	 * @private
	 * @param {Array} [array] The array to iterate over.
	 * @param {Function} predicate The function invoked per iteration.
	 * @returns {boolean} Returns `true` if any element passes the predicate check,
	 *  else `false`.
	 */
	function arraySome(array, predicate) {
	  var index = -1,
	      length = array ? array.length : 0;
	
	  while (++index < length) {
	    if (predicate(array[index], index, array)) {
	      return true;
	    }
	  }
	  return false;
	}
	
	module.exports = arraySome;


/***/ },
/* 268 */
/***/ function(module, exports, __webpack_require__) {

	var eq = __webpack_require__(55);
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/**
	 * Used by `_.defaults` to customize its `_.assignIn` use.
	 *
	 * @private
	 * @param {*} objValue The destination value.
	 * @param {*} srcValue The source value.
	 * @param {string} key The key of the property to assign.
	 * @param {Object} object The parent object of `objValue`.
	 * @returns {*} Returns the value to assign.
	 */
	function assignInDefaults(objValue, srcValue, key, object) {
	  if (objValue === undefined ||
	      (eq(objValue, objectProto[key]) && !hasOwnProperty.call(object, key))) {
	    return srcValue;
	  }
	  return objValue;
	}
	
	module.exports = assignInDefaults;


/***/ },
/* 269 */
/***/ function(module, exports, __webpack_require__) {

	var copyObject = __webpack_require__(51),
	    keys = __webpack_require__(9);
	
	/**
	 * The base implementation of `_.assign` without support for multiple sources
	 * or `customizer` functions.
	 *
	 * @private
	 * @param {Object} object The destination object.
	 * @param {Object} source The source object.
	 * @returns {Object} Returns `object`.
	 */
	function baseAssign(object, source) {
	  return object && copyObject(source, keys(source), object);
	}
	
	module.exports = baseAssign;


/***/ },
/* 270 */
/***/ function(module, exports, __webpack_require__) {

	var get = __webpack_require__(119);
	
	/**
	 * The base implementation of `_.at` without support for individual paths.
	 *
	 * @private
	 * @param {Object} object The object to iterate over.
	 * @param {string[]} paths The property paths of elements to pick.
	 * @returns {Array} Returns the picked elements.
	 */
	function baseAt(object, paths) {
	  var index = -1,
	      isNil = object == null,
	      length = paths.length,
	      result = Array(length);
	
	  while (++index < length) {
	    result[index] = isNil ? undefined : get(object, paths[index]);
	  }
	  return result;
	}
	
	module.exports = baseAt;


/***/ },
/* 271 */
/***/ function(module, exports, __webpack_require__) {

	var Stack = __webpack_require__(110),
	    arrayEach = __webpack_require__(263),
	    assignValue = __webpack_require__(71),
	    baseAssign = __webpack_require__(269),
	    cloneBuffer = __webpack_require__(306),
	    copyArray = __webpack_require__(313),
	    copySymbols = __webpack_require__(314),
	    getAllKeys = __webpack_require__(322),
	    getTag = __webpack_require__(52),
	    initCloneArray = __webpack_require__(332),
	    initCloneByTag = __webpack_require__(333),
	    initCloneObject = __webpack_require__(334),
	    isArray = __webpack_require__(8),
	    isBuffer = __webpack_require__(375),
	    isHostObject = __webpack_require__(116),
	    isObject = __webpack_require__(11),
	    keys = __webpack_require__(9);
	
	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]',
	    arrayTag = '[object Array]',
	    boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    errorTag = '[object Error]',
	    funcTag = '[object Function]',
	    genTag = '[object GeneratorFunction]',
	    mapTag = '[object Map]',
	    numberTag = '[object Number]',
	    objectTag = '[object Object]',
	    regexpTag = '[object RegExp]',
	    setTag = '[object Set]',
	    stringTag = '[object String]',
	    symbolTag = '[object Symbol]',
	    weakMapTag = '[object WeakMap]';
	
	var arrayBufferTag = '[object ArrayBuffer]',
	    dataViewTag = '[object DataView]',
	    float32Tag = '[object Float32Array]',
	    float64Tag = '[object Float64Array]',
	    int8Tag = '[object Int8Array]',
	    int16Tag = '[object Int16Array]',
	    int32Tag = '[object Int32Array]',
	    uint8Tag = '[object Uint8Array]',
	    uint8ClampedTag = '[object Uint8ClampedArray]',
	    uint16Tag = '[object Uint16Array]',
	    uint32Tag = '[object Uint32Array]';
	
	/** Used to identify `toStringTag` values supported by `_.clone`. */
	var cloneableTags = {};
	cloneableTags[argsTag] = cloneableTags[arrayTag] =
	cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] =
	cloneableTags[boolTag] = cloneableTags[dateTag] =
	cloneableTags[float32Tag] = cloneableTags[float64Tag] =
	cloneableTags[int8Tag] = cloneableTags[int16Tag] =
	cloneableTags[int32Tag] = cloneableTags[mapTag] =
	cloneableTags[numberTag] = cloneableTags[objectTag] =
	cloneableTags[regexpTag] = cloneableTags[setTag] =
	cloneableTags[stringTag] = cloneableTags[symbolTag] =
	cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] =
	cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
	cloneableTags[errorTag] = cloneableTags[funcTag] =
	cloneableTags[weakMapTag] = false;
	
	/**
	 * The base implementation of `_.clone` and `_.cloneDeep` which tracks
	 * traversed objects.
	 *
	 * @private
	 * @param {*} value The value to clone.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @param {boolean} [isFull] Specify a clone including symbols.
	 * @param {Function} [customizer] The function to customize cloning.
	 * @param {string} [key] The key of `value`.
	 * @param {Object} [object] The parent object of `value`.
	 * @param {Object} [stack] Tracks traversed objects and their clone counterparts.
	 * @returns {*} Returns the cloned value.
	 */
	function baseClone(value, isDeep, isFull, customizer, key, object, stack) {
	  var result;
	  if (customizer) {
	    result = object ? customizer(value, key, object, stack) : customizer(value);
	  }
	  if (result !== undefined) {
	    return result;
	  }
	  if (!isObject(value)) {
	    return value;
	  }
	  var isArr = isArray(value);
	  if (isArr) {
	    result = initCloneArray(value);
	    if (!isDeep) {
	      return copyArray(value, result);
	    }
	  } else {
	    var tag = getTag(value),
	        isFunc = tag == funcTag || tag == genTag;
	
	    if (isBuffer(value)) {
	      return cloneBuffer(value, isDeep);
	    }
	    if (tag == objectTag || tag == argsTag || (isFunc && !object)) {
	      if (isHostObject(value)) {
	        return object ? value : {};
	      }
	      result = initCloneObject(isFunc ? {} : value);
	      if (!isDeep) {
	        return copySymbols(value, baseAssign(result, value));
	      }
	    } else {
	      if (!cloneableTags[tag]) {
	        return object ? value : {};
	      }
	      result = initCloneByTag(value, tag, baseClone, isDeep);
	    }
	  }
	  // Check for circular references and return its corresponding clone.
	  stack || (stack = new Stack);
	  var stacked = stack.get(value);
	  if (stacked) {
	    return stacked;
	  }
	  stack.set(value, result);
	
	  if (!isArr) {
	    var props = isFull ? getAllKeys(value) : keys(value);
	  }
	  arrayEach(props || value, function(subValue, key) {
	    if (props) {
	      key = subValue;
	      subValue = value[key];
	    }
	    // Recursively populate clone (susceptible to call stack limits).
	    assignValue(result, key, baseClone(subValue, isDeep, isFull, customizer, key, value, stack));
	  });
	  return result;
	}
	
	module.exports = baseClone;


/***/ },
/* 272 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(11);
	
	/** Built-in value references. */
	var objectCreate = Object.create;
	
	/**
	 * The base implementation of `_.create` without support for assigning
	 * properties to the created object.
	 *
	 * @private
	 * @param {Object} prototype The object to inherit from.
	 * @returns {Object} Returns the new object.
	 */
	function baseCreate(proto) {
	  return isObject(proto) ? objectCreate(proto) : {};
	}
	
	module.exports = baseCreate;


/***/ },
/* 273 */
/***/ function(module, exports, __webpack_require__) {

	var baseForOwn = __webpack_require__(277),
	    createBaseEach = __webpack_require__(316);
	
	/**
	 * The base implementation of `_.forEach` without support for iteratee shorthands.
	 *
	 * @private
	 * @param {Array|Object} collection The collection to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array|Object} Returns `collection`.
	 */
	var baseEach = createBaseEach(baseForOwn);
	
	module.exports = baseEach;


/***/ },
/* 274 */
/***/ function(module, exports, __webpack_require__) {

	var isSymbol = __webpack_require__(57);
	
	/**
	 * The base implementation of methods like `_.max` and `_.min` which accepts a
	 * `comparator` to determine the extremum value.
	 *
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} iteratee The iteratee invoked per iteration.
	 * @param {Function} comparator The comparator used to compare values.
	 * @returns {*} Returns the extremum value.
	 */
	function baseExtremum(array, iteratee, comparator) {
	  var index = -1,
	      length = array.length;
	
	  while (++index < length) {
	    var value = array[index],
	        current = iteratee(value);
	
	    if (current != null && (computed === undefined
	          ? (current === current && !isSymbol(current))
	          : comparator(current, computed)
	        )) {
	      var computed = current,
	          result = value;
	    }
	  }
	  return result;
	}
	
	module.exports = baseExtremum;


/***/ },
/* 275 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.findIndex` and `_.findLastIndex` without
	 * support for iteratee shorthands.
	 *
	 * @private
	 * @param {Array} array The array to search.
	 * @param {Function} predicate The function invoked per iteration.
	 * @param {number} fromIndex The index to search from.
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {number} Returns the index of the matched value, else `-1`.
	 */
	function baseFindIndex(array, predicate, fromIndex, fromRight) {
	  var length = array.length,
	      index = fromIndex + (fromRight ? 1 : -1);
	
	  while ((fromRight ? index-- : ++index < length)) {
	    if (predicate(array[index], index, array)) {
	      return index;
	    }
	  }
	  return -1;
	}
	
	module.exports = baseFindIndex;


/***/ },
/* 276 */
/***/ function(module, exports, __webpack_require__) {

	var createBaseFor = __webpack_require__(317);
	
	/**
	 * The base implementation of `baseForOwn` which iterates over `object`
	 * properties returned by `keysFunc` and invokes `iteratee` for each property.
	 * Iteratee functions may exit iteration early by explicitly returning `false`.
	 *
	 * @private
	 * @param {Object} object The object to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @param {Function} keysFunc The function to get the keys of `object`.
	 * @returns {Object} Returns `object`.
	 */
	var baseFor = createBaseFor();
	
	module.exports = baseFor;


/***/ },
/* 277 */
/***/ function(module, exports, __webpack_require__) {

	var baseFor = __webpack_require__(276),
	    keys = __webpack_require__(9);
	
	/**
	 * The base implementation of `_.forOwn` without support for iteratee shorthands.
	 *
	 * @private
	 * @param {Object} object The object to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Object} Returns `object`.
	 */
	function baseForOwn(object, iteratee) {
	  return object && baseFor(object, iteratee, keys);
	}
	
	module.exports = baseForOwn;


/***/ },
/* 278 */
/***/ function(module, exports, __webpack_require__) {

	var arrayPush = __webpack_require__(149),
	    isArray = __webpack_require__(8);
	
	/**
	 * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
	 * `keysFunc` and `symbolsFunc` to get the enumerable property names and
	 * symbols of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Function} keysFunc The function to get the keys of `object`.
	 * @param {Function} symbolsFunc The function to get the symbols of `object`.
	 * @returns {Array} Returns the array of property names and symbols.
	 */
	function baseGetAllKeys(object, keysFunc, symbolsFunc) {
	  var result = keysFunc(object);
	  return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
	}
	
	module.exports = baseGetAllKeys;


/***/ },
/* 279 */
/***/ function(module, exports) {

	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;
	
	/**
	 * The base implementation of `getTag`.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the `toStringTag`.
	 */
	function baseGetTag(value) {
	  return objectToString.call(value);
	}
	
	module.exports = baseGetTag;


/***/ },
/* 280 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.gt` which doesn't coerce arguments.
	 *
	 * @private
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @returns {boolean} Returns `true` if `value` is greater than `other`,
	 *  else `false`.
	 */
	function baseGt(value, other) {
	  return value > other;
	}
	
	module.exports = baseGt;


/***/ },
/* 281 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.hasIn` without support for deep paths.
	 *
	 * @private
	 * @param {Object} [object] The object to query.
	 * @param {Array|string} key The key to check.
	 * @returns {boolean} Returns `true` if `key` exists, else `false`.
	 */
	function baseHasIn(object, key) {
	  return object != null && key in Object(object);
	}
	
	module.exports = baseHasIn;


/***/ },
/* 282 */
/***/ function(module, exports) {

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeMax = Math.max,
	    nativeMin = Math.min;
	
	/**
	 * The base implementation of `_.inRange` which doesn't coerce arguments.
	 *
	 * @private
	 * @param {number} number The number to check.
	 * @param {number} start The start of the range.
	 * @param {number} end The end of the range.
	 * @returns {boolean} Returns `true` if `number` is in the range, else `false`.
	 */
	function baseInRange(number, start, end) {
	  return number >= nativeMin(start, end) && number < nativeMax(start, end);
	}
	
	module.exports = baseInRange;


/***/ },
/* 283 */
/***/ function(module, exports, __webpack_require__) {

	var Stack = __webpack_require__(110),
	    equalArrays = __webpack_require__(157),
	    equalByTag = __webpack_require__(320),
	    equalObjects = __webpack_require__(321),
	    getTag = __webpack_require__(52),
	    isArray = __webpack_require__(8),
	    isHostObject = __webpack_require__(116),
	    isTypedArray = __webpack_require__(381);
	
	/** Used to compose bitmasks for comparison styles. */
	var PARTIAL_COMPARE_FLAG = 2;
	
	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]',
	    arrayTag = '[object Array]',
	    objectTag = '[object Object]';
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/**
	 * A specialized version of `baseIsEqual` for arrays and objects which performs
	 * deep comparisons and tracks traversed objects enabling objects with circular
	 * references to be compared.
	 *
	 * @private
	 * @param {Object} object The object to compare.
	 * @param {Object} other The other object to compare.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Function} [customizer] The function to customize comparisons.
	 * @param {number} [bitmask] The bitmask of comparison flags. See `baseIsEqual`
	 *  for more details.
	 * @param {Object} [stack] Tracks traversed `object` and `other` objects.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function baseIsEqualDeep(object, other, equalFunc, customizer, bitmask, stack) {
	  var objIsArr = isArray(object),
	      othIsArr = isArray(other),
	      objTag = arrayTag,
	      othTag = arrayTag;
	
	  if (!objIsArr) {
	    objTag = getTag(object);
	    objTag = objTag == argsTag ? objectTag : objTag;
	  }
	  if (!othIsArr) {
	    othTag = getTag(other);
	    othTag = othTag == argsTag ? objectTag : othTag;
	  }
	  var objIsObj = objTag == objectTag && !isHostObject(object),
	      othIsObj = othTag == objectTag && !isHostObject(other),
	      isSameTag = objTag == othTag;
	
	  if (isSameTag && !objIsObj) {
	    stack || (stack = new Stack);
	    return (objIsArr || isTypedArray(object))
	      ? equalArrays(object, other, equalFunc, customizer, bitmask, stack)
	      : equalByTag(object, other, objTag, equalFunc, customizer, bitmask, stack);
	  }
	  if (!(bitmask & PARTIAL_COMPARE_FLAG)) {
	    var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
	        othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');
	
	    if (objIsWrapped || othIsWrapped) {
	      var objUnwrapped = objIsWrapped ? object.value() : object,
	          othUnwrapped = othIsWrapped ? other.value() : other;
	
	      stack || (stack = new Stack);
	      return equalFunc(objUnwrapped, othUnwrapped, customizer, bitmask, stack);
	    }
	  }
	  if (!isSameTag) {
	    return false;
	  }
	  stack || (stack = new Stack);
	  return equalObjects(object, other, equalFunc, customizer, bitmask, stack);
	}
	
	module.exports = baseIsEqualDeep;


/***/ },
/* 284 */
/***/ function(module, exports, __webpack_require__) {

	var Stack = __webpack_require__(110),
	    baseIsEqual = __webpack_require__(111);
	
	/** Used to compose bitmasks for comparison styles. */
	var UNORDERED_COMPARE_FLAG = 1,
	    PARTIAL_COMPARE_FLAG = 2;
	
	/**
	 * The base implementation of `_.isMatch` without support for iteratee shorthands.
	 *
	 * @private
	 * @param {Object} object The object to inspect.
	 * @param {Object} source The object of property values to match.
	 * @param {Array} matchData The property names, values, and compare flags to match.
	 * @param {Function} [customizer] The function to customize comparisons.
	 * @returns {boolean} Returns `true` if `object` is a match, else `false`.
	 */
	function baseIsMatch(object, source, matchData, customizer) {
	  var index = matchData.length,
	      length = index,
	      noCustomizer = !customizer;
	
	  if (object == null) {
	    return !length;
	  }
	  object = Object(object);
	  while (index--) {
	    var data = matchData[index];
	    if ((noCustomizer && data[2])
	          ? data[1] !== object[data[0]]
	          : !(data[0] in object)
	        ) {
	      return false;
	    }
	  }
	  while (++index < length) {
	    data = matchData[index];
	    var key = data[0],
	        objValue = object[key],
	        srcValue = data[1];
	
	    if (noCustomizer && data[2]) {
	      if (objValue === undefined && !(key in object)) {
	        return false;
	      }
	    } else {
	      var stack = new Stack;
	      if (customizer) {
	        var result = customizer(objValue, srcValue, key, object, source, stack);
	      }
	      if (!(result === undefined
	            ? baseIsEqual(srcValue, objValue, customizer, UNORDERED_COMPARE_FLAG | PARTIAL_COMPARE_FLAG, stack)
	            : result
	          )) {
	        return false;
	      }
	    }
	  }
	  return true;
	}
	
	module.exports = baseIsMatch;


/***/ },
/* 285 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.isNaN` without support for number objects.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is `NaN`, else `false`.
	 */
	function baseIsNaN(value) {
	  return value !== value;
	}
	
	module.exports = baseIsNaN;


/***/ },
/* 286 */
/***/ function(module, exports, __webpack_require__) {

	var isFunction = __webpack_require__(79),
	    isHostObject = __webpack_require__(116),
	    isMasked = __webpack_require__(338),
	    isObject = __webpack_require__(11),
	    toSource = __webpack_require__(165);
	
	/**
	 * Used to match `RegExp`
	 * [syntax characters](http://ecma-international.org/ecma-262/6.0/#sec-patterns).
	 */
	var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
	
	/** Used to detect host constructors (Safari). */
	var reIsHostCtor = /^\[object .+?Constructor\]$/;
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/** Used to resolve the decompiled source of functions. */
	var funcToString = Function.prototype.toString;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/** Used to detect if a method is native. */
	var reIsNative = RegExp('^' +
	  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
	  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
	);
	
	/**
	 * The base implementation of `_.isNative` without bad shim checks.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a native function,
	 *  else `false`.
	 */
	function baseIsNative(value) {
	  if (!isObject(value) || isMasked(value)) {
	    return false;
	  }
	  var pattern = (isFunction(value) || isHostObject(value)) ? reIsNative : reIsHostCtor;
	  return pattern.test(toSource(value));
	}
	
	module.exports = baseIsNative;


/***/ },
/* 287 */
/***/ function(module, exports, __webpack_require__) {

	var getTag = __webpack_require__(52),
	    isObjectLike = __webpack_require__(17);
	
	/** `Object#toString` result references. */
	var setTag = '[object Set]';
	
	/**
	 * The base implementation of `_.isSet` without Node.js optimizations.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a set, else `false`.
	 */
	function baseIsSet(value) {
	  return isObjectLike(value) && getTag(value) == setTag;
	}
	
	module.exports = baseIsSet;


/***/ },
/* 288 */
/***/ function(module, exports, __webpack_require__) {

	var isLength = __webpack_require__(80),
	    isObjectLike = __webpack_require__(17);
	
	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]',
	    arrayTag = '[object Array]',
	    boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    errorTag = '[object Error]',
	    funcTag = '[object Function]',
	    mapTag = '[object Map]',
	    numberTag = '[object Number]',
	    objectTag = '[object Object]',
	    regexpTag = '[object RegExp]',
	    setTag = '[object Set]',
	    stringTag = '[object String]',
	    weakMapTag = '[object WeakMap]';
	
	var arrayBufferTag = '[object ArrayBuffer]',
	    dataViewTag = '[object DataView]',
	    float32Tag = '[object Float32Array]',
	    float64Tag = '[object Float64Array]',
	    int8Tag = '[object Int8Array]',
	    int16Tag = '[object Int16Array]',
	    int32Tag = '[object Int32Array]',
	    uint8Tag = '[object Uint8Array]',
	    uint8ClampedTag = '[object Uint8ClampedArray]',
	    uint16Tag = '[object Uint16Array]',
	    uint32Tag = '[object Uint32Array]';
	
	/** Used to identify `toStringTag` values of typed arrays. */
	var typedArrayTags = {};
	typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
	typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
	typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
	typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
	typedArrayTags[uint32Tag] = true;
	typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
	typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
	typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
	typedArrayTags[errorTag] = typedArrayTags[funcTag] =
	typedArrayTags[mapTag] = typedArrayTags[numberTag] =
	typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
	typedArrayTags[setTag] = typedArrayTags[stringTag] =
	typedArrayTags[weakMapTag] = false;
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;
	
	/**
	 * The base implementation of `_.isTypedArray` without Node.js optimizations.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
	 */
	function baseIsTypedArray(value) {
	  return isObjectLike(value) &&
	    isLength(value.length) && !!typedArrayTags[objectToString.call(value)];
	}
	
	module.exports = baseIsTypedArray;


/***/ },
/* 289 */
/***/ function(module, exports, __webpack_require__) {

	var baseMatches = __webpack_require__(293),
	    baseMatchesProperty = __webpack_require__(294),
	    identity = __webpack_require__(166),
	    isArray = __webpack_require__(8),
	    property = __webpack_require__(390);
	
	/**
	 * The base implementation of `_.iteratee`.
	 *
	 * @private
	 * @param {*} [value=_.identity] The value to convert to an iteratee.
	 * @returns {Function} Returns the iteratee.
	 */
	function baseIteratee(value) {
	  // Don't store the `typeof` result in a variable to avoid a JIT bug in Safari 9.
	  // See https://bugs.webkit.org/show_bug.cgi?id=156034 for more details.
	  if (typeof value == 'function') {
	    return value;
	  }
	  if (value == null) {
	    return identity;
	  }
	  if (typeof value == 'object') {
	    return isArray(value)
	      ? baseMatchesProperty(value[0], value[1])
	      : baseMatches(value);
	  }
	  return property(value);
	}
	
	module.exports = baseIteratee;


/***/ },
/* 290 */
/***/ function(module, exports, __webpack_require__) {

	var overArg = __webpack_require__(118);
	
	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeKeys = Object.keys;
	
	/**
	 * The base implementation of `_.keys` which doesn't skip the constructor
	 * property of prototypes or treat sparse arrays as dense.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	var baseKeys = overArg(nativeKeys, Object);
	
	module.exports = baseKeys;


/***/ },
/* 291 */
/***/ function(module, exports, __webpack_require__) {

	var Reflect = __webpack_require__(259),
	    iteratorToArray = __webpack_require__(339);
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/** Built-in value references. */
	var enumerate = Reflect ? Reflect.enumerate : undefined,
	    propertyIsEnumerable = objectProto.propertyIsEnumerable;
	
	/**
	 * The base implementation of `_.keysIn` which doesn't skip the constructor
	 * property of prototypes or treat sparse arrays as dense.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function baseKeysIn(object) {
	  object = object == null ? object : Object(object);
	
	  var result = [];
	  for (var key in object) {
	    result.push(key);
	  }
	  return result;
	}
	
	// Fallback for IE < 9 with es6-shim.
	if (enumerate && !propertyIsEnumerable.call({ 'valueOf': 1 }, 'valueOf')) {
	  baseKeysIn = function(object) {
	    return iteratorToArray(enumerate(object));
	  };
	}
	
	module.exports = baseKeysIn;


/***/ },
/* 292 */
/***/ function(module, exports, __webpack_require__) {

	var baseEach = __webpack_require__(273),
	    isArrayLike = __webpack_require__(22);
	
	/**
	 * The base implementation of `_.map` without support for iteratee shorthands.
	 *
	 * @private
	 * @param {Array|Object} collection The collection to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns the new mapped array.
	 */
	function baseMap(collection, iteratee) {
	  var index = -1,
	      result = isArrayLike(collection) ? Array(collection.length) : [];
	
	  baseEach(collection, function(value, key, collection) {
	    result[++index] = iteratee(value, key, collection);
	  });
	  return result;
	}
	
	module.exports = baseMap;


/***/ },
/* 293 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsMatch = __webpack_require__(284),
	    getMatchData = __webpack_require__(324),
	    matchesStrictComparable = __webpack_require__(163);
	
	/**
	 * The base implementation of `_.matches` which doesn't clone `source`.
	 *
	 * @private
	 * @param {Object} source The object of property values to match.
	 * @returns {Function} Returns the new spec function.
	 */
	function baseMatches(source) {
	  var matchData = getMatchData(source);
	  if (matchData.length == 1 && matchData[0][2]) {
	    return matchesStrictComparable(matchData[0][0], matchData[0][1]);
	  }
	  return function(object) {
	    return object === source || baseIsMatch(object, source, matchData);
	  };
	}
	
	module.exports = baseMatches;


/***/ },
/* 294 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsEqual = __webpack_require__(111),
	    get = __webpack_require__(119),
	    hasIn = __webpack_require__(371),
	    isKey = __webpack_require__(54),
	    isStrictComparable = __webpack_require__(162),
	    matchesStrictComparable = __webpack_require__(163),
	    toKey = __webpack_require__(41);
	
	/** Used to compose bitmasks for comparison styles. */
	var UNORDERED_COMPARE_FLAG = 1,
	    PARTIAL_COMPARE_FLAG = 2;
	
	/**
	 * The base implementation of `_.matchesProperty` which doesn't clone `srcValue`.
	 *
	 * @private
	 * @param {string} path The path of the property to get.
	 * @param {*} srcValue The value to match.
	 * @returns {Function} Returns the new spec function.
	 */
	function baseMatchesProperty(path, srcValue) {
	  if (isKey(path) && isStrictComparable(srcValue)) {
	    return matchesStrictComparable(toKey(path), srcValue);
	  }
	  return function(object) {
	    var objValue = get(object, path);
	    return (objValue === undefined && objValue === srcValue)
	      ? hasIn(object, path)
	      : baseIsEqual(srcValue, objValue, undefined, UNORDERED_COMPARE_FLAG | PARTIAL_COMPARE_FLAG);
	  };
	}
	
	module.exports = baseMatchesProperty;


/***/ },
/* 295 */
/***/ function(module, exports, __webpack_require__) {

	var basePickBy = __webpack_require__(296);
	
	/**
	 * The base implementation of `_.pick` without support for individual
	 * property identifiers.
	 *
	 * @private
	 * @param {Object} object The source object.
	 * @param {string[]} props The property identifiers to pick.
	 * @returns {Object} Returns the new object.
	 */
	function basePick(object, props) {
	  object = Object(object);
	  return basePickBy(object, props, function(value, key) {
	    return key in object;
	  });
	}
	
	module.exports = basePick;


/***/ },
/* 296 */
/***/ function(module, exports) {

	/**
	 * The base implementation of  `_.pickBy` without support for iteratee shorthands.
	 *
	 * @private
	 * @param {Object} object The source object.
	 * @param {string[]} props The property identifiers to pick from.
	 * @param {Function} predicate The function invoked per property.
	 * @returns {Object} Returns the new object.
	 */
	function basePickBy(object, props, predicate) {
	  var index = -1,
	      length = props.length,
	      result = {};
	
	  while (++index < length) {
	    var key = props[index],
	        value = object[key];
	
	    if (predicate(value, key)) {
	      result[key] = value;
	    }
	  }
	  return result;
	}
	
	module.exports = basePickBy;


/***/ },
/* 297 */
/***/ function(module, exports, __webpack_require__) {

	var baseGet = __webpack_require__(151);
	
	/**
	 * A specialized version of `baseProperty` which supports deep paths.
	 *
	 * @private
	 * @param {Array|string} path The path of the property to get.
	 * @returns {Function} Returns the new accessor function.
	 */
	function basePropertyDeep(path) {
	  return function(object) {
	    return baseGet(object, path);
	  };
	}
	
	module.exports = basePropertyDeep;


/***/ },
/* 298 */
/***/ function(module, exports, __webpack_require__) {

	var assignValue = __webpack_require__(71),
	    castPath = __webpack_require__(113),
	    isIndex = __webpack_require__(53),
	    isKey = __webpack_require__(54),
	    isObject = __webpack_require__(11),
	    toKey = __webpack_require__(41);
	
	/**
	 * The base implementation of `_.set`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array|string} path The path of the property to set.
	 * @param {*} value The value to set.
	 * @param {Function} [customizer] The function to customize path creation.
	 * @returns {Object} Returns `object`.
	 */
	function baseSet(object, path, value, customizer) {
	  path = isKey(path, object) ? [path] : castPath(path);
	
	  var index = -1,
	      length = path.length,
	      lastIndex = length - 1,
	      nested = object;
	
	  while (nested != null && ++index < length) {
	    var key = toKey(path[index]);
	    if (isObject(nested)) {
	      var newValue = value;
	      if (index != lastIndex) {
	        var objValue = nested[key];
	        newValue = customizer ? customizer(objValue, key, nested) : undefined;
	        if (newValue === undefined) {
	          newValue = objValue == null
	            ? (isIndex(path[index + 1]) ? [] : {})
	            : objValue;
	        }
	      }
	      assignValue(nested, key, newValue);
	    }
	    nested = nested[key];
	  }
	  return object;
	}
	
	module.exports = baseSet;


/***/ },
/* 299 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.slice` without an iteratee call guard.
	 *
	 * @private
	 * @param {Array} array The array to slice.
	 * @param {number} [start=0] The start position.
	 * @param {number} [end=array.length] The end position.
	 * @returns {Array} Returns the slice of `array`.
	 */
	function baseSlice(array, start, end) {
	  var index = -1,
	      length = array.length;
	
	  if (start < 0) {
	    start = -start > length ? 0 : (length + start);
	  }
	  end = end > length ? length : end;
	  if (end < 0) {
	    end += length;
	  }
	  length = start > end ? 0 : ((end - start) >>> 0);
	  start >>>= 0;
	
	  var result = Array(length);
	  while (++index < length) {
	    result[index] = array[index + start];
	  }
	  return result;
	}
	
	module.exports = baseSlice;


/***/ },
/* 300 */
/***/ function(module, exports, __webpack_require__) {

	var arrayMap = __webpack_require__(50);
	
	/**
	 * The base implementation of `_.toPairs` and `_.toPairsIn` which creates an array
	 * of key-value pairs for `object` corresponding to the property names of `props`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array} props The property names to get values for.
	 * @returns {Object} Returns the key-value pairs.
	 */
	function baseToPairs(object, props) {
	  return arrayMap(props, function(key) {
	    return [key, object[key]];
	  });
	}
	
	module.exports = baseToPairs;


/***/ },
/* 301 */
/***/ function(module, exports, __webpack_require__) {

	var arrayMap = __webpack_require__(50);
	
	/**
	 * The base implementation of `_.values` and `_.valuesIn` which creates an
	 * array of `object` property values corresponding to the property names
	 * of `props`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array} props The property names to get values for.
	 * @returns {Object} Returns the array of property values.
	 */
	function baseValues(object, props) {
	  return arrayMap(props, function(key) {
	    return object[key];
	  });
	}
	
	module.exports = baseValues;


/***/ },
/* 302 */
/***/ function(module, exports) {

	/**
	 * Checks if a cache value for `key` exists.
	 *
	 * @private
	 * @param {Object} cache The cache to query.
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function cacheHas(cache, key) {
	  return cache.has(key);
	}
	
	module.exports = cacheHas;


/***/ },
/* 303 */
/***/ function(module, exports, __webpack_require__) {

	var baseSlice = __webpack_require__(299);
	
	/**
	 * Casts `array` to a slice if it's needed.
	 *
	 * @private
	 * @param {Array} array The array to inspect.
	 * @param {number} start The start position.
	 * @param {number} [end=array.length] The end position.
	 * @returns {Array} Returns the cast slice.
	 */
	function castSlice(array, start, end) {
	  var length = array.length;
	  end = end === undefined ? length : end;
	  return (!start && end >= length) ? array : baseSlice(array, start, end);
	}
	
	module.exports = castSlice;


/***/ },
/* 304 */
/***/ function(module, exports, __webpack_require__) {

	var baseIndexOf = __webpack_require__(74);
	
	/**
	 * Used by `_.trim` and `_.trimEnd` to get the index of the last string symbol
	 * that is not found in the character symbols.
	 *
	 * @private
	 * @param {Array} strSymbols The string symbols to inspect.
	 * @param {Array} chrSymbols The character symbols to find.
	 * @returns {number} Returns the index of the last unmatched string symbol.
	 */
	function charsEndIndex(strSymbols, chrSymbols) {
	  var index = strSymbols.length;
	
	  while (index-- && baseIndexOf(chrSymbols, strSymbols[index], 0) > -1) {}
	  return index;
	}
	
	module.exports = charsEndIndex;


/***/ },
/* 305 */
/***/ function(module, exports, __webpack_require__) {

	var baseIndexOf = __webpack_require__(74);
	
	/**
	 * Used by `_.trim` and `_.trimStart` to get the index of the first string symbol
	 * that is not found in the character symbols.
	 *
	 * @private
	 * @param {Array} strSymbols The string symbols to inspect.
	 * @param {Array} chrSymbols The character symbols to find.
	 * @returns {number} Returns the index of the first unmatched string symbol.
	 */
	function charsStartIndex(strSymbols, chrSymbols) {
	  var index = -1,
	      length = strSymbols.length;
	
	  while (++index < length && baseIndexOf(chrSymbols, strSymbols[index], 0) > -1) {}
	  return index;
	}
	
	module.exports = charsStartIndex;


/***/ },
/* 306 */
/***/ function(module, exports) {

	/**
	 * Creates a clone of  `buffer`.
	 *
	 * @private
	 * @param {Buffer} buffer The buffer to clone.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @returns {Buffer} Returns the cloned buffer.
	 */
	function cloneBuffer(buffer, isDeep) {
	  if (isDeep) {
	    return buffer.slice();
	  }
	  var result = new buffer.constructor(buffer.length);
	  buffer.copy(result);
	  return result;
	}
	
	module.exports = cloneBuffer;


/***/ },
/* 307 */
/***/ function(module, exports, __webpack_require__) {

	var cloneArrayBuffer = __webpack_require__(114);
	
	/**
	 * Creates a clone of `dataView`.
	 *
	 * @private
	 * @param {Object} dataView The data view to clone.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @returns {Object} Returns the cloned data view.
	 */
	function cloneDataView(dataView, isDeep) {
	  var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
	  return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
	}
	
	module.exports = cloneDataView;


/***/ },
/* 308 */
/***/ function(module, exports, __webpack_require__) {

	var addMapEntry = __webpack_require__(261),
	    arrayReduce = __webpack_require__(150),
	    mapToArray = __webpack_require__(117);
	
	/**
	 * Creates a clone of `map`.
	 *
	 * @private
	 * @param {Object} map The map to clone.
	 * @param {Function} cloneFunc The function to clone values.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @returns {Object} Returns the cloned map.
	 */
	function cloneMap(map, isDeep, cloneFunc) {
	  var array = isDeep ? cloneFunc(mapToArray(map), true) : mapToArray(map);
	  return arrayReduce(array, addMapEntry, new map.constructor);
	}
	
	module.exports = cloneMap;


/***/ },
/* 309 */
/***/ function(module, exports) {

	/** Used to match `RegExp` flags from their coerced string values. */
	var reFlags = /\w*$/;
	
	/**
	 * Creates a clone of `regexp`.
	 *
	 * @private
	 * @param {Object} regexp The regexp to clone.
	 * @returns {Object} Returns the cloned regexp.
	 */
	function cloneRegExp(regexp) {
	  var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
	  result.lastIndex = regexp.lastIndex;
	  return result;
	}
	
	module.exports = cloneRegExp;


/***/ },
/* 310 */
/***/ function(module, exports, __webpack_require__) {

	var addSetEntry = __webpack_require__(262),
	    arrayReduce = __webpack_require__(150),
	    setToArray = __webpack_require__(78);
	
	/**
	 * Creates a clone of `set`.
	 *
	 * @private
	 * @param {Object} set The set to clone.
	 * @param {Function} cloneFunc The function to clone values.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @returns {Object} Returns the cloned set.
	 */
	function cloneSet(set, isDeep, cloneFunc) {
	  var array = isDeep ? cloneFunc(setToArray(set), true) : setToArray(set);
	  return arrayReduce(array, addSetEntry, new set.constructor);
	}
	
	module.exports = cloneSet;


/***/ },
/* 311 */
/***/ function(module, exports, __webpack_require__) {

	var Symbol = __webpack_require__(70);
	
	/** Used to convert symbols to primitives and strings. */
	var symbolProto = Symbol ? Symbol.prototype : undefined,
	    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;
	
	/**
	 * Creates a clone of the `symbol` object.
	 *
	 * @private
	 * @param {Object} symbol The symbol object to clone.
	 * @returns {Object} Returns the cloned symbol object.
	 */
	function cloneSymbol(symbol) {
	  return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};
	}
	
	module.exports = cloneSymbol;


/***/ },
/* 312 */
/***/ function(module, exports, __webpack_require__) {

	var cloneArrayBuffer = __webpack_require__(114);
	
	/**
	 * Creates a clone of `typedArray`.
	 *
	 * @private
	 * @param {Object} typedArray The typed array to clone.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @returns {Object} Returns the cloned typed array.
	 */
	function cloneTypedArray(typedArray, isDeep) {
	  var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
	  return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
	}
	
	module.exports = cloneTypedArray;


/***/ },
/* 313 */
/***/ function(module, exports) {

	/**
	 * Copies the values of `source` to `array`.
	 *
	 * @private
	 * @param {Array} source The array to copy values from.
	 * @param {Array} [array=[]] The array to copy values to.
	 * @returns {Array} Returns `array`.
	 */
	function copyArray(source, array) {
	  var index = -1,
	      length = source.length;
	
	  array || (array = Array(length));
	  while (++index < length) {
	    array[index] = source[index];
	  }
	  return array;
	}
	
	module.exports = copyArray;


/***/ },
/* 314 */
/***/ function(module, exports, __webpack_require__) {

	var copyObject = __webpack_require__(51),
	    getSymbols = __webpack_require__(160);
	
	/**
	 * Copies own symbol properties of `source` to `object`.
	 *
	 * @private
	 * @param {Object} source The object to copy symbols from.
	 * @param {Object} [object={}] The object to copy symbols to.
	 * @returns {Object} Returns `object`.
	 */
	function copySymbols(source, object) {
	  return copyObject(source, getSymbols(source), object);
	}
	
	module.exports = copySymbols;


/***/ },
/* 315 */
/***/ function(module, exports, __webpack_require__) {

	var root = __webpack_require__(16);
	
	/** Used to detect overreaching core-js shims. */
	var coreJsData = root['__core-js_shared__'];
	
	module.exports = coreJsData;


/***/ },
/* 316 */
/***/ function(module, exports, __webpack_require__) {

	var isArrayLike = __webpack_require__(22);
	
	/**
	 * Creates a `baseEach` or `baseEachRight` function.
	 *
	 * @private
	 * @param {Function} eachFunc The function to iterate over a collection.
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {Function} Returns the new base function.
	 */
	function createBaseEach(eachFunc, fromRight) {
	  return function(collection, iteratee) {
	    if (collection == null) {
	      return collection;
	    }
	    if (!isArrayLike(collection)) {
	      return eachFunc(collection, iteratee);
	    }
	    var length = collection.length,
	        index = fromRight ? length : -1,
	        iterable = Object(collection);
	
	    while ((fromRight ? index-- : ++index < length)) {
	      if (iteratee(iterable[index], index, iterable) === false) {
	        break;
	      }
	    }
	    return collection;
	  };
	}
	
	module.exports = createBaseEach;


/***/ },
/* 317 */
/***/ function(module, exports) {

	/**
	 * Creates a base function for methods like `_.forIn` and `_.forOwn`.
	 *
	 * @private
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {Function} Returns the new base function.
	 */
	function createBaseFor(fromRight) {
	  return function(object, iteratee, keysFunc) {
	    var index = -1,
	        iterable = Object(object),
	        props = keysFunc(object),
	        length = props.length;
	
	    while (length--) {
	      var key = props[fromRight ? length : ++index];
	      if (iteratee(iterable[key], key, iterable) === false) {
	        break;
	      }
	    }
	    return object;
	  };
	}
	
	module.exports = createBaseFor;


/***/ },
/* 318 */
/***/ function(module, exports, __webpack_require__) {

	var Set = __webpack_require__(145),
	    noop = __webpack_require__(388),
	    setToArray = __webpack_require__(78);
	
	/** Used as references for various `Number` constants. */
	var INFINITY = 1 / 0;
	
	/**
	 * Creates a set object of `values`.
	 *
	 * @private
	 * @param {Array} values The values to add to the set.
	 * @returns {Object} Returns the new set.
	 */
	var createSet = !(Set && (1 / setToArray(new Set([,-0]))[1]) == INFINITY) ? noop : function(values) {
	  return new Set(values);
	};
	
	module.exports = createSet;


/***/ },
/* 319 */
/***/ function(module, exports, __webpack_require__) {

	var baseToPairs = __webpack_require__(300),
	    getTag = __webpack_require__(52),
	    mapToArray = __webpack_require__(117),
	    setToPairs = __webpack_require__(353);
	
	/** `Object#toString` result references. */
	var mapTag = '[object Map]',
	    setTag = '[object Set]';
	
	/**
	 * Creates a `_.toPairs` or `_.toPairsIn` function.
	 *
	 * @private
	 * @param {Function} keysFunc The function to get the keys of a given object.
	 * @returns {Function} Returns the new pairs function.
	 */
	function createToPairs(keysFunc) {
	  return function(object) {
	    var tag = getTag(object);
	    if (tag == mapTag) {
	      return mapToArray(object);
	    }
	    if (tag == setTag) {
	      return setToPairs(object);
	    }
	    return baseToPairs(object, keysFunc(object));
	  };
	}
	
	module.exports = createToPairs;


/***/ },
/* 320 */
/***/ function(module, exports, __webpack_require__) {

	var Symbol = __webpack_require__(70),
	    Uint8Array = __webpack_require__(147),
	    eq = __webpack_require__(55),
	    equalArrays = __webpack_require__(157),
	    mapToArray = __webpack_require__(117),
	    setToArray = __webpack_require__(78);
	
	/** Used to compose bitmasks for comparison styles. */
	var UNORDERED_COMPARE_FLAG = 1,
	    PARTIAL_COMPARE_FLAG = 2;
	
	/** `Object#toString` result references. */
	var boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    errorTag = '[object Error]',
	    mapTag = '[object Map]',
	    numberTag = '[object Number]',
	    regexpTag = '[object RegExp]',
	    setTag = '[object Set]',
	    stringTag = '[object String]',
	    symbolTag = '[object Symbol]';
	
	var arrayBufferTag = '[object ArrayBuffer]',
	    dataViewTag = '[object DataView]';
	
	/** Used to convert symbols to primitives and strings. */
	var symbolProto = Symbol ? Symbol.prototype : undefined,
	    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;
	
	/**
	 * A specialized version of `baseIsEqualDeep` for comparing objects of
	 * the same `toStringTag`.
	 *
	 * **Note:** This function only supports comparing values with tags of
	 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
	 *
	 * @private
	 * @param {Object} object The object to compare.
	 * @param {Object} other The other object to compare.
	 * @param {string} tag The `toStringTag` of the objects to compare.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Function} customizer The function to customize comparisons.
	 * @param {number} bitmask The bitmask of comparison flags. See `baseIsEqual`
	 *  for more details.
	 * @param {Object} stack Tracks traversed `object` and `other` objects.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function equalByTag(object, other, tag, equalFunc, customizer, bitmask, stack) {
	  switch (tag) {
	    case dataViewTag:
	      if ((object.byteLength != other.byteLength) ||
	          (object.byteOffset != other.byteOffset)) {
	        return false;
	      }
	      object = object.buffer;
	      other = other.buffer;
	
	    case arrayBufferTag:
	      if ((object.byteLength != other.byteLength) ||
	          !equalFunc(new Uint8Array(object), new Uint8Array(other))) {
	        return false;
	      }
	      return true;
	
	    case boolTag:
	    case dateTag:
	    case numberTag:
	      // Coerce booleans to `1` or `0` and dates to milliseconds.
	      // Invalid dates are coerced to `NaN`.
	      return eq(+object, +other);
	
	    case errorTag:
	      return object.name == other.name && object.message == other.message;
	
	    case regexpTag:
	    case stringTag:
	      // Coerce regexes to strings and treat strings, primitives and objects,
	      // as equal. See http://www.ecma-international.org/ecma-262/6.0/#sec-regexp.prototype.tostring
	      // for more details.
	      return object == (other + '');
	
	    case mapTag:
	      var convert = mapToArray;
	
	    case setTag:
	      var isPartial = bitmask & PARTIAL_COMPARE_FLAG;
	      convert || (convert = setToArray);
	
	      if (object.size != other.size && !isPartial) {
	        return false;
	      }
	      // Assume cyclic values are equal.
	      var stacked = stack.get(object);
	      if (stacked) {
	        return stacked == other;
	      }
	      bitmask |= UNORDERED_COMPARE_FLAG;
	
	      // Recursively compare objects (susceptible to call stack limits).
	      stack.set(object, other);
	      var result = equalArrays(convert(object), convert(other), equalFunc, customizer, bitmask, stack);
	      stack['delete'](object);
	      return result;
	
	    case symbolTag:
	      if (symbolValueOf) {
	        return symbolValueOf.call(object) == symbolValueOf.call(other);
	      }
	  }
	  return false;
	}
	
	module.exports = equalByTag;


/***/ },
/* 321 */
/***/ function(module, exports, __webpack_require__) {

	var baseHas = __webpack_require__(152),
	    keys = __webpack_require__(9);
	
	/** Used to compose bitmasks for comparison styles. */
	var PARTIAL_COMPARE_FLAG = 2;
	
	/**
	 * A specialized version of `baseIsEqualDeep` for objects with support for
	 * partial deep comparisons.
	 *
	 * @private
	 * @param {Object} object The object to compare.
	 * @param {Object} other The other object to compare.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Function} customizer The function to customize comparisons.
	 * @param {number} bitmask The bitmask of comparison flags. See `baseIsEqual`
	 *  for more details.
	 * @param {Object} stack Tracks traversed `object` and `other` objects.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function equalObjects(object, other, equalFunc, customizer, bitmask, stack) {
	  var isPartial = bitmask & PARTIAL_COMPARE_FLAG,
	      objProps = keys(object),
	      objLength = objProps.length,
	      othProps = keys(other),
	      othLength = othProps.length;
	
	  if (objLength != othLength && !isPartial) {
	    return false;
	  }
	  var index = objLength;
	  while (index--) {
	    var key = objProps[index];
	    if (!(isPartial ? key in other : baseHas(other, key))) {
	      return false;
	    }
	  }
	  // Assume cyclic values are equal.
	  var stacked = stack.get(object);
	  if (stacked && stack.get(other)) {
	    return stacked == other;
	  }
	  var result = true;
	  stack.set(object, other);
	  stack.set(other, object);
	
	  var skipCtor = isPartial;
	  while (++index < objLength) {
	    key = objProps[index];
	    var objValue = object[key],
	        othValue = other[key];
	
	    if (customizer) {
	      var compared = isPartial
	        ? customizer(othValue, objValue, key, other, object, stack)
	        : customizer(objValue, othValue, key, object, other, stack);
	    }
	    // Recursively compare objects (susceptible to call stack limits).
	    if (!(compared === undefined
	          ? (objValue === othValue || equalFunc(objValue, othValue, customizer, bitmask, stack))
	          : compared
	        )) {
	      result = false;
	      break;
	    }
	    skipCtor || (skipCtor = key == 'constructor');
	  }
	  if (result && !skipCtor) {
	    var objCtor = object.constructor,
	        othCtor = other.constructor;
	
	    // Non `Object` object instances with different constructors are not equal.
	    if (objCtor != othCtor &&
	        ('constructor' in object && 'constructor' in other) &&
	        !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
	          typeof othCtor == 'function' && othCtor instanceof othCtor)) {
	      result = false;
	    }
	  }
	  stack['delete'](object);
	  stack['delete'](other);
	  return result;
	}
	
	module.exports = equalObjects;


/***/ },
/* 322 */
/***/ function(module, exports, __webpack_require__) {

	var baseGetAllKeys = __webpack_require__(278),
	    getSymbols = __webpack_require__(160),
	    keys = __webpack_require__(9);
	
	/**
	 * Creates an array of own enumerable property names and symbols of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names and symbols.
	 */
	function getAllKeys(object) {
	  return baseGetAllKeys(object, keys, getSymbols);
	}
	
	module.exports = getAllKeys;


/***/ },
/* 323 */
/***/ function(module, exports, __webpack_require__) {

	var baseProperty = __webpack_require__(112);
	
	/**
	 * Gets the "length" property value of `object`.
	 *
	 * **Note:** This function is used to avoid a
	 * [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792) that affects
	 * Safari on at least iOS 8.1-8.3 ARM64.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {*} Returns the "length" value.
	 */
	var getLength = baseProperty('length');
	
	module.exports = getLength;


/***/ },
/* 324 */
/***/ function(module, exports, __webpack_require__) {

	var isStrictComparable = __webpack_require__(162),
	    keys = __webpack_require__(9);
	
	/**
	 * Gets the property names, values, and compare flags of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the match data of `object`.
	 */
	function getMatchData(object) {
	  var result = keys(object),
	      length = result.length;
	
	  while (length--) {
	    var key = result[length],
	        value = object[key];
	
	    result[length] = [key, value, isStrictComparable(value)];
	  }
	  return result;
	}
	
	module.exports = getMatchData;


/***/ },
/* 325 */
/***/ function(module, exports) {

	/**
	 * Gets the value at `key` of `object`.
	 *
	 * @private
	 * @param {Object} [object] The object to query.
	 * @param {string} key The key of the property to get.
	 * @returns {*} Returns the property value.
	 */
	function getValue(object, key) {
	  return object == null ? undefined : object[key];
	}
	
	module.exports = getValue;


/***/ },
/* 326 */
/***/ function(module, exports, __webpack_require__) {

	var castPath = __webpack_require__(113),
	    isArguments = __webpack_require__(120),
	    isArray = __webpack_require__(8),
	    isIndex = __webpack_require__(53),
	    isKey = __webpack_require__(54),
	    isLength = __webpack_require__(80),
	    isString = __webpack_require__(56),
	    toKey = __webpack_require__(41);
	
	/**
	 * Checks if `path` exists on `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array|string} path The path to check.
	 * @param {Function} hasFunc The function to check properties.
	 * @returns {boolean} Returns `true` if `path` exists, else `false`.
	 */
	function hasPath(object, path, hasFunc) {
	  path = isKey(path, object) ? [path] : castPath(path);
	
	  var result,
	      index = -1,
	      length = path.length;
	
	  while (++index < length) {
	    var key = toKey(path[index]);
	    if (!(result = object != null && hasFunc(object, key))) {
	      break;
	    }
	    object = object[key];
	  }
	  if (result) {
	    return result;
	  }
	  var length = object ? object.length : 0;
	  return !!length && isLength(length) && isIndex(key, length) &&
	    (isArray(object) || isString(object) || isArguments(object));
	}
	
	module.exports = hasPath;


/***/ },
/* 327 */
/***/ function(module, exports, __webpack_require__) {

	var nativeCreate = __webpack_require__(77);
	
	/**
	 * Removes all key-value entries from the hash.
	 *
	 * @private
	 * @name clear
	 * @memberOf Hash
	 */
	function hashClear() {
	  this.__data__ = nativeCreate ? nativeCreate(null) : {};
	}
	
	module.exports = hashClear;


/***/ },
/* 328 */
/***/ function(module, exports) {

	/**
	 * Removes `key` and its value from the hash.
	 *
	 * @private
	 * @name delete
	 * @memberOf Hash
	 * @param {Object} hash The hash to modify.
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function hashDelete(key) {
	  return this.has(key) && delete this.__data__[key];
	}
	
	module.exports = hashDelete;


/***/ },
/* 329 */
/***/ function(module, exports, __webpack_require__) {

	var nativeCreate = __webpack_require__(77);
	
	/** Used to stand-in for `undefined` hash values. */
	var HASH_UNDEFINED = '__lodash_hash_undefined__';
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/**
	 * Gets the hash value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf Hash
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function hashGet(key) {
	  var data = this.__data__;
	  if (nativeCreate) {
	    var result = data[key];
	    return result === HASH_UNDEFINED ? undefined : result;
	  }
	  return hasOwnProperty.call(data, key) ? data[key] : undefined;
	}
	
	module.exports = hashGet;


/***/ },
/* 330 */
/***/ function(module, exports, __webpack_require__) {

	var nativeCreate = __webpack_require__(77);
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/**
	 * Checks if a hash value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf Hash
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function hashHas(key) {
	  var data = this.__data__;
	  return nativeCreate ? data[key] !== undefined : hasOwnProperty.call(data, key);
	}
	
	module.exports = hashHas;


/***/ },
/* 331 */
/***/ function(module, exports, __webpack_require__) {

	var nativeCreate = __webpack_require__(77);
	
	/** Used to stand-in for `undefined` hash values. */
	var HASH_UNDEFINED = '__lodash_hash_undefined__';
	
	/**
	 * Sets the hash `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf Hash
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the hash instance.
	 */
	function hashSet(key, value) {
	  var data = this.__data__;
	  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
	  return this;
	}
	
	module.exports = hashSet;


/***/ },
/* 332 */
/***/ function(module, exports) {

	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/**
	 * Initializes an array clone.
	 *
	 * @private
	 * @param {Array} array The array to clone.
	 * @returns {Array} Returns the initialized clone.
	 */
	function initCloneArray(array) {
	  var length = array.length,
	      result = array.constructor(length);
	
	  // Add properties assigned by `RegExp#exec`.
	  if (length && typeof array[0] == 'string' && hasOwnProperty.call(array, 'index')) {
	    result.index = array.index;
	    result.input = array.input;
	  }
	  return result;
	}
	
	module.exports = initCloneArray;


/***/ },
/* 333 */
/***/ function(module, exports, __webpack_require__) {

	var cloneArrayBuffer = __webpack_require__(114),
	    cloneDataView = __webpack_require__(307),
	    cloneMap = __webpack_require__(308),
	    cloneRegExp = __webpack_require__(309),
	    cloneSet = __webpack_require__(310),
	    cloneSymbol = __webpack_require__(311),
	    cloneTypedArray = __webpack_require__(312);
	
	/** `Object#toString` result references. */
	var boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    mapTag = '[object Map]',
	    numberTag = '[object Number]',
	    regexpTag = '[object RegExp]',
	    setTag = '[object Set]',
	    stringTag = '[object String]',
	    symbolTag = '[object Symbol]';
	
	var arrayBufferTag = '[object ArrayBuffer]',
	    dataViewTag = '[object DataView]',
	    float32Tag = '[object Float32Array]',
	    float64Tag = '[object Float64Array]',
	    int8Tag = '[object Int8Array]',
	    int16Tag = '[object Int16Array]',
	    int32Tag = '[object Int32Array]',
	    uint8Tag = '[object Uint8Array]',
	    uint8ClampedTag = '[object Uint8ClampedArray]',
	    uint16Tag = '[object Uint16Array]',
	    uint32Tag = '[object Uint32Array]';
	
	/**
	 * Initializes an object clone based on its `toStringTag`.
	 *
	 * **Note:** This function only supports cloning values with tags of
	 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
	 *
	 * @private
	 * @param {Object} object The object to clone.
	 * @param {string} tag The `toStringTag` of the object to clone.
	 * @param {Function} cloneFunc The function to clone values.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @returns {Object} Returns the initialized clone.
	 */
	function initCloneByTag(object, tag, cloneFunc, isDeep) {
	  var Ctor = object.constructor;
	  switch (tag) {
	    case arrayBufferTag:
	      return cloneArrayBuffer(object);
	
	    case boolTag:
	    case dateTag:
	      return new Ctor(+object);
	
	    case dataViewTag:
	      return cloneDataView(object, isDeep);
	
	    case float32Tag: case float64Tag:
	    case int8Tag: case int16Tag: case int32Tag:
	    case uint8Tag: case uint8ClampedTag: case uint16Tag: case uint32Tag:
	      return cloneTypedArray(object, isDeep);
	
	    case mapTag:
	      return cloneMap(object, isDeep, cloneFunc);
	
	    case numberTag:
	    case stringTag:
	      return new Ctor(object);
	
	    case regexpTag:
	      return cloneRegExp(object);
	
	    case setTag:
	      return cloneSet(object, isDeep, cloneFunc);
	
	    case symbolTag:
	      return cloneSymbol(object);
	  }
	}
	
	module.exports = initCloneByTag;


/***/ },
/* 334 */
/***/ function(module, exports, __webpack_require__) {

	var baseCreate = __webpack_require__(272),
	    getPrototype = __webpack_require__(159),
	    isPrototype = __webpack_require__(76);
	
	/**
	 * Initializes an object clone.
	 *
	 * @private
	 * @param {Object} object The object to clone.
	 * @returns {Object} Returns the initialized clone.
	 */
	function initCloneObject(object) {
	  return (typeof object.constructor == 'function' && !isPrototype(object))
	    ? baseCreate(getPrototype(object))
	    : {};
	}
	
	module.exports = initCloneObject;


/***/ },
/* 335 */
/***/ function(module, exports, __webpack_require__) {

	var Symbol = __webpack_require__(70),
	    isArguments = __webpack_require__(120),
	    isArray = __webpack_require__(8);
	
	/** Built-in value references. */
	var spreadableSymbol = Symbol ? Symbol.isConcatSpreadable : undefined;
	
	/**
	 * Checks if `value` is a flattenable `arguments` object or array.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is flattenable, else `false`.
	 */
	function isFlattenable(value) {
	  return isArray(value) || isArguments(value) ||
	    !!(spreadableSymbol && value && value[spreadableSymbol]);
	}
	
	module.exports = isFlattenable;


/***/ },
/* 336 */
/***/ function(module, exports, __webpack_require__) {

	var eq = __webpack_require__(55),
	    isArrayLike = __webpack_require__(22),
	    isIndex = __webpack_require__(53),
	    isObject = __webpack_require__(11);
	
	/**
	 * Checks if the given arguments are from an iteratee call.
	 *
	 * @private
	 * @param {*} value The potential iteratee value argument.
	 * @param {*} index The potential iteratee index or key argument.
	 * @param {*} object The potential iteratee object argument.
	 * @returns {boolean} Returns `true` if the arguments are from an iteratee call,
	 *  else `false`.
	 */
	function isIterateeCall(value, index, object) {
	  if (!isObject(object)) {
	    return false;
	  }
	  var type = typeof index;
	  if (type == 'number'
	        ? (isArrayLike(object) && isIndex(index, object.length))
	        : (type == 'string' && index in object)
	      ) {
	    return eq(object[index], value);
	  }
	  return false;
	}
	
	module.exports = isIterateeCall;


/***/ },
/* 337 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is suitable for use as unique object key.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
	 */
	function isKeyable(value) {
	  var type = typeof value;
	  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
	    ? (value !== '__proto__')
	    : (value === null);
	}
	
	module.exports = isKeyable;


/***/ },
/* 338 */
/***/ function(module, exports, __webpack_require__) {

	var coreJsData = __webpack_require__(315);
	
	/** Used to detect methods masquerading as native. */
	var maskSrcKey = (function() {
	  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
	  return uid ? ('Symbol(src)_1.' + uid) : '';
	}());
	
	/**
	 * Checks if `func` has its source masked.
	 *
	 * @private
	 * @param {Function} func The function to check.
	 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
	 */
	function isMasked(func) {
	  return !!maskSrcKey && (maskSrcKey in func);
	}
	
	module.exports = isMasked;


/***/ },
/* 339 */
/***/ function(module, exports) {

	/**
	 * Converts `iterator` to an array.
	 *
	 * @private
	 * @param {Object} iterator The iterator to convert.
	 * @returns {Array} Returns the converted array.
	 */
	function iteratorToArray(iterator) {
	  var data,
	      result = [];
	
	  while (!(data = iterator.next()).done) {
	    result.push(data.value);
	  }
	  return result;
	}
	
	module.exports = iteratorToArray;


/***/ },
/* 340 */
/***/ function(module, exports) {

	/**
	 * Removes all key-value entries from the list cache.
	 *
	 * @private
	 * @name clear
	 * @memberOf ListCache
	 */
	function listCacheClear() {
	  this.__data__ = [];
	}
	
	module.exports = listCacheClear;


/***/ },
/* 341 */
/***/ function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(72);
	
	/** Used for built-in method references. */
	var arrayProto = Array.prototype;
	
	/** Built-in value references. */
	var splice = arrayProto.splice;
	
	/**
	 * Removes `key` and its value from the list cache.
	 *
	 * @private
	 * @name delete
	 * @memberOf ListCache
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function listCacheDelete(key) {
	  var data = this.__data__,
	      index = assocIndexOf(data, key);
	
	  if (index < 0) {
	    return false;
	  }
	  var lastIndex = data.length - 1;
	  if (index == lastIndex) {
	    data.pop();
	  } else {
	    splice.call(data, index, 1);
	  }
	  return true;
	}
	
	module.exports = listCacheDelete;


/***/ },
/* 342 */
/***/ function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(72);
	
	/**
	 * Gets the list cache value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf ListCache
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function listCacheGet(key) {
	  var data = this.__data__,
	      index = assocIndexOf(data, key);
	
	  return index < 0 ? undefined : data[index][1];
	}
	
	module.exports = listCacheGet;


/***/ },
/* 343 */
/***/ function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(72);
	
	/**
	 * Checks if a list cache value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf ListCache
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function listCacheHas(key) {
	  return assocIndexOf(this.__data__, key) > -1;
	}
	
	module.exports = listCacheHas;


/***/ },
/* 344 */
/***/ function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(72);
	
	/**
	 * Sets the list cache `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf ListCache
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the list cache instance.
	 */
	function listCacheSet(key, value) {
	  var data = this.__data__,
	      index = assocIndexOf(data, key);
	
	  if (index < 0) {
	    data.push([key, value]);
	  } else {
	    data[index][1] = value;
	  }
	  return this;
	}
	
	module.exports = listCacheSet;


/***/ },
/* 345 */
/***/ function(module, exports, __webpack_require__) {

	var Hash = __webpack_require__(257),
	    ListCache = __webpack_require__(69),
	    Map = __webpack_require__(108);
	
	/**
	 * Removes all key-value entries from the map.
	 *
	 * @private
	 * @name clear
	 * @memberOf MapCache
	 */
	function mapCacheClear() {
	  this.__data__ = {
	    'hash': new Hash,
	    'map': new (Map || ListCache),
	    'string': new Hash
	  };
	}
	
	module.exports = mapCacheClear;


/***/ },
/* 346 */
/***/ function(module, exports, __webpack_require__) {

	var getMapData = __webpack_require__(75);
	
	/**
	 * Removes `key` and its value from the map.
	 *
	 * @private
	 * @name delete
	 * @memberOf MapCache
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function mapCacheDelete(key) {
	  return getMapData(this, key)['delete'](key);
	}
	
	module.exports = mapCacheDelete;


/***/ },
/* 347 */
/***/ function(module, exports, __webpack_require__) {

	var getMapData = __webpack_require__(75);
	
	/**
	 * Gets the map value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf MapCache
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function mapCacheGet(key) {
	  return getMapData(this, key).get(key);
	}
	
	module.exports = mapCacheGet;


/***/ },
/* 348 */
/***/ function(module, exports, __webpack_require__) {

	var getMapData = __webpack_require__(75);
	
	/**
	 * Checks if a map value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf MapCache
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function mapCacheHas(key) {
	  return getMapData(this, key).has(key);
	}
	
	module.exports = mapCacheHas;


/***/ },
/* 349 */
/***/ function(module, exports, __webpack_require__) {

	var getMapData = __webpack_require__(75);
	
	/**
	 * Sets the map `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf MapCache
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the map cache instance.
	 */
	function mapCacheSet(key, value) {
	  getMapData(this, key).set(key, value);
	  return this;
	}
	
	module.exports = mapCacheSet;


/***/ },
/* 350 */
/***/ function(module, exports) {

	/** Used to compose unicode character classes. */
	var rsAstralRange = '\\ud800-\\udfff',
	    rsComboMarksRange = '\\u0300-\\u036f\\ufe20-\\ufe23',
	    rsComboSymbolsRange = '\\u20d0-\\u20f0',
	    rsVarRange = '\\ufe0e\\ufe0f';
	
	/** Used to compose unicode capture groups. */
	var rsZWJ = '\\u200d';
	
	/** Used to detect strings with [zero-width joiners or code points from the astral planes](http://eev.ee/blog/2015/09/12/dark-corners-of-unicode/). */
	var reHasComplexSymbol = RegExp('[' + rsZWJ + rsAstralRange  + rsComboMarksRange + rsComboSymbolsRange + rsVarRange + ']');
	
	module.exports = reHasComplexSymbol;


/***/ },
/* 351 */
/***/ function(module, exports) {

	/** Used to stand-in for `undefined` hash values. */
	var HASH_UNDEFINED = '__lodash_hash_undefined__';
	
	/**
	 * Adds `value` to the array cache.
	 *
	 * @private
	 * @name add
	 * @memberOf SetCache
	 * @alias push
	 * @param {*} value The value to cache.
	 * @returns {Object} Returns the cache instance.
	 */
	function setCacheAdd(value) {
	  this.__data__.set(value, HASH_UNDEFINED);
	  return this;
	}
	
	module.exports = setCacheAdd;


/***/ },
/* 352 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is in the array cache.
	 *
	 * @private
	 * @name has
	 * @memberOf SetCache
	 * @param {*} value The value to search for.
	 * @returns {number} Returns `true` if `value` is found, else `false`.
	 */
	function setCacheHas(value) {
	  return this.__data__.has(value);
	}
	
	module.exports = setCacheHas;


/***/ },
/* 353 */
/***/ function(module, exports) {

	/**
	 * Converts `set` to its value-value pairs.
	 *
	 * @private
	 * @param {Object} set The set to convert.
	 * @returns {Array} Returns the value-value pairs.
	 */
	function setToPairs(set) {
	  var index = -1,
	      result = Array(set.size);
	
	  set.forEach(function(value) {
	    result[++index] = [value, value];
	  });
	  return result;
	}
	
	module.exports = setToPairs;


/***/ },
/* 354 */
/***/ function(module, exports, __webpack_require__) {

	var ListCache = __webpack_require__(69);
	
	/**
	 * Removes all key-value entries from the stack.
	 *
	 * @private
	 * @name clear
	 * @memberOf Stack
	 */
	function stackClear() {
	  this.__data__ = new ListCache;
	}
	
	module.exports = stackClear;


/***/ },
/* 355 */
/***/ function(module, exports) {

	/**
	 * Removes `key` and its value from the stack.
	 *
	 * @private
	 * @name delete
	 * @memberOf Stack
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function stackDelete(key) {
	  return this.__data__['delete'](key);
	}
	
	module.exports = stackDelete;


/***/ },
/* 356 */
/***/ function(module, exports) {

	/**
	 * Gets the stack value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf Stack
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function stackGet(key) {
	  return this.__data__.get(key);
	}
	
	module.exports = stackGet;


/***/ },
/* 357 */
/***/ function(module, exports) {

	/**
	 * Checks if a stack value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf Stack
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function stackHas(key) {
	  return this.__data__.has(key);
	}
	
	module.exports = stackHas;


/***/ },
/* 358 */
/***/ function(module, exports, __webpack_require__) {

	var ListCache = __webpack_require__(69),
	    Map = __webpack_require__(108),
	    MapCache = __webpack_require__(109);
	
	/** Used as the size to enable large array optimizations. */
	var LARGE_ARRAY_SIZE = 200;
	
	/**
	 * Sets the stack `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf Stack
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the stack cache instance.
	 */
	function stackSet(key, value) {
	  var cache = this.__data__;
	  if (cache instanceof ListCache) {
	    var pairs = cache.__data__;
	    if (!Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
	      pairs.push([key, value]);
	      return this;
	    }
	    cache = this.__data__ = new MapCache(pairs);
	  }
	  cache.set(key, value);
	  return this;
	}
	
	module.exports = stackSet;


/***/ },
/* 359 */
/***/ function(module, exports, __webpack_require__) {

	var reHasComplexSymbol = __webpack_require__(350);
	
	/** Used to compose unicode character classes. */
	var rsAstralRange = '\\ud800-\\udfff',
	    rsComboMarksRange = '\\u0300-\\u036f\\ufe20-\\ufe23',
	    rsComboSymbolsRange = '\\u20d0-\\u20f0',
	    rsVarRange = '\\ufe0e\\ufe0f';
	
	/** Used to compose unicode capture groups. */
	var rsAstral = '[' + rsAstralRange + ']',
	    rsCombo = '[' + rsComboMarksRange + rsComboSymbolsRange + ']',
	    rsFitz = '\\ud83c[\\udffb-\\udfff]',
	    rsModifier = '(?:' + rsCombo + '|' + rsFitz + ')',
	    rsNonAstral = '[^' + rsAstralRange + ']',
	    rsRegional = '(?:\\ud83c[\\udde6-\\uddff]){2}',
	    rsSurrPair = '[\\ud800-\\udbff][\\udc00-\\udfff]',
	    rsZWJ = '\\u200d';
	
	/** Used to compose unicode regexes. */
	var reOptMod = rsModifier + '?',
	    rsOptVar = '[' + rsVarRange + ']?',
	    rsOptJoin = '(?:' + rsZWJ + '(?:' + [rsNonAstral, rsRegional, rsSurrPair].join('|') + ')' + rsOptVar + reOptMod + ')*',
	    rsSeq = rsOptVar + reOptMod + rsOptJoin,
	    rsSymbol = '(?:' + [rsNonAstral + rsCombo + '?', rsCombo, rsRegional, rsSurrPair, rsAstral].join('|') + ')';
	
	/** Used to match [string symbols](https://mathiasbynens.be/notes/javascript-unicode). */
	var reComplexSymbol = RegExp(rsFitz + '(?=' + rsFitz + ')|' + rsSymbol + rsSeq, 'g');
	
	/**
	 * Gets the number of symbols in `string`.
	 *
	 * @private
	 * @param {string} string The string to inspect.
	 * @returns {number} Returns the string size.
	 */
	function stringSize(string) {
	  if (!(string && reHasComplexSymbol.test(string))) {
	    return string.length;
	  }
	  var result = reComplexSymbol.lastIndex = 0;
	  while (reComplexSymbol.test(string)) {
	    result++;
	  }
	  return result;
	}
	
	module.exports = stringSize;


/***/ },
/* 360 */
/***/ function(module, exports) {

	/** Used to compose unicode character classes. */
	var rsAstralRange = '\\ud800-\\udfff',
	    rsComboMarksRange = '\\u0300-\\u036f\\ufe20-\\ufe23',
	    rsComboSymbolsRange = '\\u20d0-\\u20f0',
	    rsVarRange = '\\ufe0e\\ufe0f';
	
	/** Used to compose unicode capture groups. */
	var rsAstral = '[' + rsAstralRange + ']',
	    rsCombo = '[' + rsComboMarksRange + rsComboSymbolsRange + ']',
	    rsFitz = '\\ud83c[\\udffb-\\udfff]',
	    rsModifier = '(?:' + rsCombo + '|' + rsFitz + ')',
	    rsNonAstral = '[^' + rsAstralRange + ']',
	    rsRegional = '(?:\\ud83c[\\udde6-\\uddff]){2}',
	    rsSurrPair = '[\\ud800-\\udbff][\\udc00-\\udfff]',
	    rsZWJ = '\\u200d';
	
	/** Used to compose unicode regexes. */
	var reOptMod = rsModifier + '?',
	    rsOptVar = '[' + rsVarRange + ']?',
	    rsOptJoin = '(?:' + rsZWJ + '(?:' + [rsNonAstral, rsRegional, rsSurrPair].join('|') + ')' + rsOptVar + reOptMod + ')*',
	    rsSeq = rsOptVar + reOptMod + rsOptJoin,
	    rsSymbol = '(?:' + [rsNonAstral + rsCombo + '?', rsCombo, rsRegional, rsSurrPair, rsAstral].join('|') + ')';
	
	/** Used to match [string symbols](https://mathiasbynens.be/notes/javascript-unicode). */
	var reComplexSymbol = RegExp(rsFitz + '(?=' + rsFitz + ')|' + rsSymbol + rsSeq, 'g');
	
	/**
	 * Converts `string` to an array.
	 *
	 * @private
	 * @param {string} string The string to convert.
	 * @returns {Array} Returns the converted array.
	 */
	function stringToArray(string) {
	  return string.match(reComplexSymbol);
	}
	
	module.exports = stringToArray;


/***/ },
/* 361 */
/***/ function(module, exports, __webpack_require__) {

	var memoize = __webpack_require__(387),
	    toString = __webpack_require__(122);
	
	/** Used to match property names within property paths. */
	var reLeadingDot = /^\./,
	    rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
	
	/** Used to match backslashes in property paths. */
	var reEscapeChar = /\\(\\)?/g;
	
	/**
	 * Converts `string` to a property path array.
	 *
	 * @private
	 * @param {string} string The string to convert.
	 * @returns {Array} Returns the property path array.
	 */
	var stringToPath = memoize(function(string) {
	  string = toString(string);
	
	  var result = [];
	  if (reLeadingDot.test(string)) {
	    result.push('');
	  }
	  string.replace(rePropName, function(match, number, quote, string) {
	    result.push(quote ? string.replace(reEscapeChar, '$1') : (number || match));
	  });
	  return result;
	});
	
	module.exports = stringToPath;


/***/ },
/* 362 */
/***/ function(module, exports, __webpack_require__) {

	var assignValue = __webpack_require__(71),
	    copyObject = __webpack_require__(51),
	    createAssigner = __webpack_require__(115),
	    isArrayLike = __webpack_require__(22),
	    isPrototype = __webpack_require__(76),
	    keys = __webpack_require__(9);
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/** Built-in value references. */
	var propertyIsEnumerable = objectProto.propertyIsEnumerable;
	
	/** Detect if properties shadowing those on `Object.prototype` are non-enumerable. */
	var nonEnumShadows = !propertyIsEnumerable.call({ 'valueOf': 1 }, 'valueOf');
	
	/**
	 * Assigns own enumerable string keyed properties of source objects to the
	 * destination object. Source objects are applied from left to right.
	 * Subsequent sources overwrite property assignments of previous sources.
	 *
	 * **Note:** This method mutates `object` and is loosely based on
	 * [`Object.assign`](https://mdn.io/Object/assign).
	 *
	 * @static
	 * @memberOf _
	 * @since 0.10.0
	 * @category Object
	 * @param {Object} object The destination object.
	 * @param {...Object} [sources] The source objects.
	 * @returns {Object} Returns `object`.
	 * @see _.assignIn
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 * }
	 *
	 * function Bar() {
	 *   this.c = 3;
	 * }
	 *
	 * Foo.prototype.b = 2;
	 * Bar.prototype.d = 4;
	 *
	 * _.assign({ 'a': 0 }, new Foo, new Bar);
	 * // => { 'a': 1, 'c': 3 }
	 */
	var assign = createAssigner(function(object, source) {
	  if (nonEnumShadows || isPrototype(source) || isArrayLike(source)) {
	    copyObject(source, keys(source), object);
	    return;
	  }
	  for (var key in source) {
	    if (hasOwnProperty.call(source, key)) {
	      assignValue(object, key, source[key]);
	    }
	  }
	});
	
	module.exports = assign;


/***/ },
/* 363 */
/***/ function(module, exports, __webpack_require__) {

	var copyObject = __webpack_require__(51),
	    createAssigner = __webpack_require__(115),
	    keysIn = __webpack_require__(384);
	
	/**
	 * This method is like `_.assignIn` except that it accepts `customizer`
	 * which is invoked to produce the assigned values. If `customizer` returns
	 * `undefined`, assignment is handled by the method instead. The `customizer`
	 * is invoked with five arguments: (objValue, srcValue, key, object, source).
	 *
	 * **Note:** This method mutates `object`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @alias extendWith
	 * @category Object
	 * @param {Object} object The destination object.
	 * @param {...Object} sources The source objects.
	 * @param {Function} [customizer] The function to customize assigned values.
	 * @returns {Object} Returns `object`.
	 * @see _.assignWith
	 * @example
	 *
	 * function customizer(objValue, srcValue) {
	 *   return _.isUndefined(objValue) ? srcValue : objValue;
	 * }
	 *
	 * var defaults = _.partialRight(_.assignInWith, customizer);
	 *
	 * defaults({ 'a': 1 }, { 'b': 2 }, { 'a': 3 });
	 * // => { 'a': 1, 'b': 2 }
	 */
	var assignInWith = createAssigner(function(object, source, srcIndex, customizer) {
	  copyObject(source, keysIn(source), object, customizer);
	});
	
	module.exports = assignInWith;


/***/ },
/* 364 */
/***/ function(module, exports, __webpack_require__) {

	var copyObject = __webpack_require__(51),
	    createAssigner = __webpack_require__(115),
	    keys = __webpack_require__(9);
	
	/**
	 * This method is like `_.assign` except that it accepts `customizer`
	 * which is invoked to produce the assigned values. If `customizer` returns
	 * `undefined`, assignment is handled by the method instead. The `customizer`
	 * is invoked with five arguments: (objValue, srcValue, key, object, source).
	 *
	 * **Note:** This method mutates `object`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Object
	 * @param {Object} object The destination object.
	 * @param {...Object} sources The source objects.
	 * @param {Function} [customizer] The function to customize assigned values.
	 * @returns {Object} Returns `object`.
	 * @see _.assignInWith
	 * @example
	 *
	 * function customizer(objValue, srcValue) {
	 *   return _.isUndefined(objValue) ? srcValue : objValue;
	 * }
	 *
	 * var defaults = _.partialRight(_.assignWith, customizer);
	 *
	 * defaults({ 'a': 1 }, { 'b': 2 }, { 'a': 3 });
	 * // => { 'a': 1, 'b': 2 }
	 */
	var assignWith = createAssigner(function(object, source, srcIndex, customizer) {
	  copyObject(source, keys(source), object, customizer);
	});
	
	module.exports = assignWith;


/***/ },
/* 365 */
/***/ function(module, exports, __webpack_require__) {

	var baseAt = __webpack_require__(270),
	    baseFlatten = __webpack_require__(73),
	    baseRest = __webpack_require__(39);
	
	/**
	 * Creates an array of values corresponding to `paths` of `object`.
	 *
	 * @static
	 * @memberOf _
	 * @since 1.0.0
	 * @category Object
	 * @param {Object} object The object to iterate over.
	 * @param {...(string|string[])} [paths] The property paths of elements to pick.
	 * @returns {Array} Returns the picked values.
	 * @example
	 *
	 * var object = { 'a': [{ 'b': { 'c': 3 } }, 4] };
	 *
	 * _.at(object, ['a[0].b.c', 'a[1]']);
	 * // => [3, 4]
	 */
	var at = baseRest(function(object, paths) {
	  return baseAt(object, baseFlatten(paths, 1));
	});
	
	module.exports = at;


/***/ },
/* 366 */
/***/ function(module, exports, __webpack_require__) {

	var baseClone = __webpack_require__(271);
	
	/**
	 * This method is like `_.clone` except that it recursively clones `value`.
	 *
	 * @static
	 * @memberOf _
	 * @since 1.0.0
	 * @category Lang
	 * @param {*} value The value to recursively clone.
	 * @returns {*} Returns the deep cloned value.
	 * @see _.clone
	 * @example
	 *
	 * var objects = [{ 'a': 1 }, { 'b': 2 }];
	 *
	 * var deep = _.cloneDeep(objects);
	 * console.log(deep[0] === objects[0]);
	 * // => false
	 */
	function cloneDeep(value) {
	  return baseClone(value, true, true);
	}
	
	module.exports = cloneDeep;


/***/ },
/* 367 */
/***/ function(module, exports, __webpack_require__) {

	var apply = __webpack_require__(148),
	    assignInDefaults = __webpack_require__(268),
	    assignInWith = __webpack_require__(363),
	    baseRest = __webpack_require__(39);
	
	/**
	 * Assigns own and inherited enumerable string keyed properties of source
	 * objects to the destination object for all destination properties that
	 * resolve to `undefined`. Source objects are applied from left to right.
	 * Once a property is set, additional values of the same property are ignored.
	 *
	 * **Note:** This method mutates `object`.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The destination object.
	 * @param {...Object} [sources] The source objects.
	 * @returns {Object} Returns `object`.
	 * @see _.defaultsDeep
	 * @example
	 *
	 * _.defaults({ 'a': 1 }, { 'b': 2 }, { 'a': 3 });
	 * // => { 'a': 1, 'b': 2 }
	 */
	var defaults = baseRest(function(args) {
	  args.push(undefined, assignInDefaults);
	  return apply(assignInWith, undefined, args);
	});
	
	module.exports = defaults;


/***/ },
/* 368 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(395);


/***/ },
/* 369 */
/***/ function(module, exports, __webpack_require__) {

	var baseFlatten = __webpack_require__(73);
	
	/**
	 * Flattens `array` a single level deep.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Array
	 * @param {Array} array The array to flatten.
	 * @returns {Array} Returns the new flattened array.
	 * @example
	 *
	 * _.flatten([1, [2, [3, [4]], 5]]);
	 * // => [1, 2, [3, [4]], 5]
	 */
	function flatten(array) {
	  var length = array ? array.length : 0;
	  return length ? baseFlatten(array, 1) : [];
	}
	
	module.exports = flatten;


/***/ },
/* 370 */
/***/ function(module, exports) {

	/**
	 * The inverse of `_.toPairs`; this method returns an object composed
	 * from key-value `pairs`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Array
	 * @param {Array} pairs The key-value pairs.
	 * @returns {Object} Returns the new object.
	 * @example
	 *
	 * _.fromPairs([['a', 1], ['b', 2]]);
	 * // => { 'a': 1, 'b': 2 }
	 */
	function fromPairs(pairs) {
	  var index = -1,
	      length = pairs ? pairs.length : 0,
	      result = {};
	
	  while (++index < length) {
	    var pair = pairs[index];
	    result[pair[0]] = pair[1];
	  }
	  return result;
	}
	
	module.exports = fromPairs;


/***/ },
/* 371 */
/***/ function(module, exports, __webpack_require__) {

	var baseHasIn = __webpack_require__(281),
	    hasPath = __webpack_require__(326);
	
	/**
	 * Checks if `path` is a direct or inherited property of `object`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Object
	 * @param {Object} object The object to query.
	 * @param {Array|string} path The path to check.
	 * @returns {boolean} Returns `true` if `path` exists, else `false`.
	 * @example
	 *
	 * var object = _.create({ 'a': _.create({ 'b': 2 }) });
	 *
	 * _.hasIn(object, 'a');
	 * // => true
	 *
	 * _.hasIn(object, 'a.b');
	 * // => true
	 *
	 * _.hasIn(object, ['a', 'b']);
	 * // => true
	 *
	 * _.hasIn(object, 'b');
	 * // => false
	 */
	function hasIn(object, path) {
	  return object != null && hasPath(object, path, baseHasIn);
	}
	
	module.exports = hasIn;


/***/ },
/* 372 */
/***/ function(module, exports, __webpack_require__) {

	var baseInRange = __webpack_require__(282),
	    toFinite = __webpack_require__(167),
	    toNumber = __webpack_require__(169);
	
	/**
	 * Checks if `n` is between `start` and up to, but not including, `end`. If
	 * `end` is not specified, it's set to `start` with `start` then set to `0`.
	 * If `start` is greater than `end` the params are swapped to support
	 * negative ranges.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.3.0
	 * @category Number
	 * @param {number} number The number to check.
	 * @param {number} [start=0] The start of the range.
	 * @param {number} end The end of the range.
	 * @returns {boolean} Returns `true` if `number` is in the range, else `false`.
	 * @see _.range, _.rangeRight
	 * @example
	 *
	 * _.inRange(3, 2, 4);
	 * // => true
	 *
	 * _.inRange(4, 8);
	 * // => true
	 *
	 * _.inRange(4, 2);
	 * // => false
	 *
	 * _.inRange(2, 2);
	 * // => false
	 *
	 * _.inRange(1.2, 2);
	 * // => true
	 *
	 * _.inRange(5.2, 4);
	 * // => false
	 *
	 * _.inRange(-3, -2, -6);
	 * // => true
	 */
	function inRange(number, start, end) {
	  start = toFinite(start);
	  if (end === undefined) {
	    end = start;
	    start = 0;
	  } else {
	    end = toFinite(end);
	  }
	  number = toNumber(number);
	  return baseInRange(number, start, end);
	}
	
	module.exports = inRange;


/***/ },
/* 373 */
/***/ function(module, exports, __webpack_require__) {

	var baseIndexOf = __webpack_require__(74),
	    isArrayLike = __webpack_require__(22),
	    isString = __webpack_require__(56),
	    toInteger = __webpack_require__(168),
	    values = __webpack_require__(170);
	
	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeMax = Math.max;
	
	/**
	 * Checks if `value` is in `collection`. If `collection` is a string, it's
	 * checked for a substring of `value`, otherwise
	 * [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
	 * is used for equality comparisons. If `fromIndex` is negative, it's used as
	 * the offset from the end of `collection`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Collection
	 * @param {Array|Object|string} collection The collection to search.
	 * @param {*} value The value to search for.
	 * @param {number} [fromIndex=0] The index to search from.
	 * @param- {Object} [guard] Enables use as an iteratee for methods like `_.reduce`.
	 * @returns {boolean} Returns `true` if `value` is found, else `false`.
	 * @example
	 *
	 * _.includes([1, 2, 3], 1);
	 * // => true
	 *
	 * _.includes([1, 2, 3], 1, 2);
	 * // => false
	 *
	 * _.includes({ 'a': 1, 'b': 2 }, 1);
	 * // => true
	 *
	 * _.includes('abcd', 'bc');
	 * // => true
	 */
	function includes(collection, value, fromIndex, guard) {
	  collection = isArrayLike(collection) ? collection : values(collection);
	  fromIndex = (fromIndex && !guard) ? toInteger(fromIndex) : 0;
	
	  var length = collection.length;
	  if (fromIndex < 0) {
	    fromIndex = nativeMax(length + fromIndex, 0);
	  }
	  return isString(collection)
	    ? (fromIndex <= length && collection.indexOf(value, fromIndex) > -1)
	    : (!!length && baseIndexOf(collection, value, fromIndex) > -1);
	}
	
	module.exports = includes;


/***/ },
/* 374 */
/***/ function(module, exports, __webpack_require__) {

	var isObjectLike = __webpack_require__(17);
	
	/** `Object#toString` result references. */
	var boolTag = '[object Boolean]';
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;
	
	/**
	 * Checks if `value` is classified as a boolean primitive or object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a boolean, else `false`.
	 * @example
	 *
	 * _.isBoolean(false);
	 * // => true
	 *
	 * _.isBoolean(null);
	 * // => false
	 */
	function isBoolean(value) {
	  return value === true || value === false ||
	    (isObjectLike(value) && objectToString.call(value) == boolTag);
	}
	
	module.exports = isBoolean;


/***/ },
/* 375 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {var root = __webpack_require__(16),
	    stubFalse = __webpack_require__(394);
	
	/** Detect free variable `exports`. */
	var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;
	
	/** Detect free variable `module`. */
	var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;
	
	/** Detect the popular CommonJS extension `module.exports`. */
	var moduleExports = freeModule && freeModule.exports === freeExports;
	
	/** Built-in value references. */
	var Buffer = moduleExports ? root.Buffer : undefined;
	
	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined;
	
	/**
	 * Checks if `value` is a buffer.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.3.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
	 * @example
	 *
	 * _.isBuffer(new Buffer(2));
	 * // => true
	 *
	 * _.isBuffer(new Uint8Array(2));
	 * // => false
	 */
	var isBuffer = nativeIsBuffer || stubFalse;
	
	module.exports = isBuffer;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(128)(module)))

/***/ },
/* 376 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsEqual = __webpack_require__(111);
	
	/**
	 * Performs a deep comparison between two values to determine if they are
	 * equivalent.
	 *
	 * **Note:** This method supports comparing arrays, array buffers, booleans,
	 * date objects, error objects, maps, numbers, `Object` objects, regexes,
	 * sets, strings, symbols, and typed arrays. `Object` objects are compared
	 * by their own, not inherited, enumerable properties. Functions and DOM
	 * nodes are **not** supported.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @returns {boolean} Returns `true` if the values are equivalent,
	 *  else `false`.
	 * @example
	 *
	 * var object = { 'a': 1 };
	 * var other = { 'a': 1 };
	 *
	 * _.isEqual(object, other);
	 * // => true
	 *
	 * object === other;
	 * // => false
	 */
	function isEqual(value, other) {
	  return baseIsEqual(value, other);
	}
	
	module.exports = isEqual;


/***/ },
/* 377 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(168);
	
	/**
	 * Checks if `value` is an integer.
	 *
	 * **Note:** This method is based on
	 * [`Number.isInteger`](https://mdn.io/Number/isInteger).
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an integer, else `false`.
	 * @example
	 *
	 * _.isInteger(3);
	 * // => true
	 *
	 * _.isInteger(Number.MIN_VALUE);
	 * // => false
	 *
	 * _.isInteger(Infinity);
	 * // => false
	 *
	 * _.isInteger('3');
	 * // => false
	 */
	function isInteger(value) {
	  return typeof value == 'number' && value == toInteger(value);
	}
	
	module.exports = isInteger;


/***/ },
/* 378 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is `null`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is `null`, else `false`.
	 * @example
	 *
	 * _.isNull(null);
	 * // => true
	 *
	 * _.isNull(void 0);
	 * // => false
	 */
	function isNull(value) {
	  return value === null;
	}
	
	module.exports = isNull;


/***/ },
/* 379 */
/***/ function(module, exports, __webpack_require__) {

	var isObjectLike = __webpack_require__(17);
	
	/** `Object#toString` result references. */
	var numberTag = '[object Number]';
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;
	
	/**
	 * Checks if `value` is classified as a `Number` primitive or object.
	 *
	 * **Note:** To exclude `Infinity`, `-Infinity`, and `NaN`, which are
	 * classified as numbers, use the `_.isFinite` method.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a number, else `false`.
	 * @example
	 *
	 * _.isNumber(3);
	 * // => true
	 *
	 * _.isNumber(Number.MIN_VALUE);
	 * // => true
	 *
	 * _.isNumber(Infinity);
	 * // => true
	 *
	 * _.isNumber('3');
	 * // => false
	 */
	function isNumber(value) {
	  return typeof value == 'number' ||
	    (isObjectLike(value) && objectToString.call(value) == numberTag);
	}
	
	module.exports = isNumber;


/***/ },
/* 380 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsSet = __webpack_require__(287),
	    baseUnary = __webpack_require__(155),
	    nodeUtil = __webpack_require__(164);
	
	/* Node.js helper references. */
	var nodeIsSet = nodeUtil && nodeUtil.isSet;
	
	/**
	 * Checks if `value` is classified as a `Set` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.3.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a set, else `false`.
	 * @example
	 *
	 * _.isSet(new Set);
	 * // => true
	 *
	 * _.isSet(new WeakSet);
	 * // => false
	 */
	var isSet = nodeIsSet ? baseUnary(nodeIsSet) : baseIsSet;
	
	module.exports = isSet;


/***/ },
/* 381 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsTypedArray = __webpack_require__(288),
	    baseUnary = __webpack_require__(155),
	    nodeUtil = __webpack_require__(164);
	
	/* Node.js helper references. */
	var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;
	
	/**
	 * Checks if `value` is classified as a typed array.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
	 * @example
	 *
	 * _.isTypedArray(new Uint8Array);
	 * // => true
	 *
	 * _.isTypedArray([]);
	 * // => false
	 */
	var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;
	
	module.exports = isTypedArray;


/***/ },
/* 382 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is `undefined`.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is `undefined`, else `false`.
	 * @example
	 *
	 * _.isUndefined(void 0);
	 * // => true
	 *
	 * _.isUndefined(null);
	 * // => false
	 */
	function isUndefined(value) {
	  return value === undefined;
	}
	
	module.exports = isUndefined;


/***/ },
/* 383 */
/***/ function(module, exports, __webpack_require__) {

	var isObjectLike = __webpack_require__(17);
	
	/** `Object#toString` result references. */
	var weakSetTag = '[object WeakSet]';
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;
	
	/**
	 * Checks if `value` is classified as a `WeakSet` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.3.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a weak set, else `false`.
	 * @example
	 *
	 * _.isWeakSet(new WeakSet);
	 * // => true
	 *
	 * _.isWeakSet(new Set);
	 * // => false
	 */
	function isWeakSet(value) {
	  return isObjectLike(value) && objectToString.call(value) == weakSetTag;
	}
	
	module.exports = isWeakSet;


/***/ },
/* 384 */
/***/ function(module, exports, __webpack_require__) {

	var baseKeysIn = __webpack_require__(291),
	    indexKeys = __webpack_require__(161),
	    isIndex = __webpack_require__(53),
	    isPrototype = __webpack_require__(76);
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/**
	 * Creates an array of the own and inherited enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.0.0
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.keysIn(new Foo);
	 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
	 */
	function keysIn(object) {
	  var index = -1,
	      isProto = isPrototype(object),
	      props = baseKeysIn(object),
	      propsLength = props.length,
	      indexes = indexKeys(object),
	      skipIndexes = !!indexes,
	      result = indexes || [],
	      length = result.length;
	
	  while (++index < propsLength) {
	    var key = props[index];
	    if (!(skipIndexes && (key == 'length' || isIndex(key, length))) &&
	        !(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
	      result.push(key);
	    }
	  }
	  return result;
	}
	
	module.exports = keysIn;


/***/ },
/* 385 */
/***/ function(module, exports, __webpack_require__) {

	var arrayMap = __webpack_require__(50),
	    baseIteratee = __webpack_require__(289),
	    baseMap = __webpack_require__(292),
	    isArray = __webpack_require__(8);
	
	/**
	 * Creates an array of values by running each element in `collection` thru
	 * `iteratee`. The iteratee is invoked with three arguments:
	 * (value, index|key, collection).
	 *
	 * Many lodash methods are guarded to work as iteratees for methods like
	 * `_.every`, `_.filter`, `_.map`, `_.mapValues`, `_.reject`, and `_.some`.
	 *
	 * The guarded methods are:
	 * `ary`, `chunk`, `curry`, `curryRight`, `drop`, `dropRight`, `every`,
	 * `fill`, `invert`, `parseInt`, `random`, `range`, `rangeRight`, `repeat`,
	 * `sampleSize`, `slice`, `some`, `sortBy`, `split`, `take`, `takeRight`,
	 * `template`, `trim`, `trimEnd`, `trimStart`, and `words`
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Collection
	 * @param {Array|Object} collection The collection to iterate over.
	 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
	 * @returns {Array} Returns the new mapped array.
	 * @example
	 *
	 * function square(n) {
	 *   return n * n;
	 * }
	 *
	 * _.map([4, 8], square);
	 * // => [16, 64]
	 *
	 * _.map({ 'a': 4, 'b': 8 }, square);
	 * // => [16, 64] (iteration order is not guaranteed)
	 *
	 * var users = [
	 *   { 'user': 'barney' },
	 *   { 'user': 'fred' }
	 * ];
	 *
	 * // The `_.property` iteratee shorthand.
	 * _.map(users, 'user');
	 * // => ['barney', 'fred']
	 */
	function map(collection, iteratee) {
	  var func = isArray(collection) ? arrayMap : baseMap;
	  return func(collection, baseIteratee(iteratee, 3));
	}
	
	module.exports = map;


/***/ },
/* 386 */
/***/ function(module, exports, __webpack_require__) {

	var baseExtremum = __webpack_require__(274),
	    baseGt = __webpack_require__(280),
	    identity = __webpack_require__(166);
	
	/**
	 * Computes the maximum value of `array`. If `array` is empty or falsey,
	 * `undefined` is returned.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Math
	 * @param {Array} array The array to iterate over.
	 * @returns {*} Returns the maximum value.
	 * @example
	 *
	 * _.max([4, 2, 8, 6]);
	 * // => 8
	 *
	 * _.max([]);
	 * // => undefined
	 */
	function max(array) {
	  return (array && array.length)
	    ? baseExtremum(array, identity, baseGt)
	    : undefined;
	}
	
	module.exports = max;


/***/ },
/* 387 */
/***/ function(module, exports, __webpack_require__) {

	var MapCache = __webpack_require__(109);
	
	/** Used as the `TypeError` message for "Functions" methods. */
	var FUNC_ERROR_TEXT = 'Expected a function';
	
	/**
	 * Creates a function that memoizes the result of `func`. If `resolver` is
	 * provided, it determines the cache key for storing the result based on the
	 * arguments provided to the memoized function. By default, the first argument
	 * provided to the memoized function is used as the map cache key. The `func`
	 * is invoked with the `this` binding of the memoized function.
	 *
	 * **Note:** The cache is exposed as the `cache` property on the memoized
	 * function. Its creation may be customized by replacing the `_.memoize.Cache`
	 * constructor with one whose instances implement the
	 * [`Map`](http://ecma-international.org/ecma-262/6.0/#sec-properties-of-the-map-prototype-object)
	 * method interface of `delete`, `get`, `has`, and `set`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Function
	 * @param {Function} func The function to have its output memoized.
	 * @param {Function} [resolver] The function to resolve the cache key.
	 * @returns {Function} Returns the new memoized function.
	 * @example
	 *
	 * var object = { 'a': 1, 'b': 2 };
	 * var other = { 'c': 3, 'd': 4 };
	 *
	 * var values = _.memoize(_.values);
	 * values(object);
	 * // => [1, 2]
	 *
	 * values(other);
	 * // => [3, 4]
	 *
	 * object.a = 2;
	 * values(object);
	 * // => [1, 2]
	 *
	 * // Modify the result cache.
	 * values.cache.set(object, ['a', 'b']);
	 * values(object);
	 * // => ['a', 'b']
	 *
	 * // Replace `_.memoize.Cache`.
	 * _.memoize.Cache = WeakMap;
	 */
	function memoize(func, resolver) {
	  if (typeof func != 'function' || (resolver && typeof resolver != 'function')) {
	    throw new TypeError(FUNC_ERROR_TEXT);
	  }
	  var memoized = function() {
	    var args = arguments,
	        key = resolver ? resolver.apply(this, args) : args[0],
	        cache = memoized.cache;
	
	    if (cache.has(key)) {
	      return cache.get(key);
	    }
	    var result = func.apply(this, args);
	    memoized.cache = cache.set(key, result);
	    return result;
	  };
	  memoized.cache = new (memoize.Cache || MapCache);
	  return memoized;
	}
	
	// Assign cache to `_.memoize`.
	memoize.Cache = MapCache;
	
	module.exports = memoize;


/***/ },
/* 388 */
/***/ function(module, exports) {

	/**
	 * This method returns `undefined`.
	 *
	 * @static
	 * @memberOf _
	 * @since 2.3.0
	 * @category Util
	 * @example
	 *
	 * _.times(2, _.noop);
	 * // => [undefined, undefined]
	 */
	function noop() {
	  // No operation performed.
	}
	
	module.exports = noop;


/***/ },
/* 389 */
/***/ function(module, exports, __webpack_require__) {

	var arrayMap = __webpack_require__(50),
	    baseFlatten = __webpack_require__(73),
	    basePick = __webpack_require__(295),
	    baseRest = __webpack_require__(39),
	    toKey = __webpack_require__(41);
	
	/**
	 * Creates an object composed of the picked `object` properties.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The source object.
	 * @param {...(string|string[])} [props] The property identifiers to pick.
	 * @returns {Object} Returns the new object.
	 * @example
	 *
	 * var object = { 'a': 1, 'b': '2', 'c': 3 };
	 *
	 * _.pick(object, ['a', 'c']);
	 * // => { 'a': 1, 'c': 3 }
	 */
	var pick = baseRest(function(object, props) {
	  return object == null ? {} : basePick(object, arrayMap(baseFlatten(props, 1), toKey));
	});
	
	module.exports = pick;


/***/ },
/* 390 */
/***/ function(module, exports, __webpack_require__) {

	var baseProperty = __webpack_require__(112),
	    basePropertyDeep = __webpack_require__(297),
	    isKey = __webpack_require__(54),
	    toKey = __webpack_require__(41);
	
	/**
	 * Creates a function that returns the value at `path` of a given object.
	 *
	 * @static
	 * @memberOf _
	 * @since 2.4.0
	 * @category Util
	 * @param {Array|string} path The path of the property to get.
	 * @returns {Function} Returns the new accessor function.
	 * @example
	 *
	 * var objects = [
	 *   { 'a': { 'b': 2 } },
	 *   { 'a': { 'b': 1 } }
	 * ];
	 *
	 * _.map(objects, _.property('a.b'));
	 * // => [2, 1]
	 *
	 * _.map(_.sortBy(objects, _.property(['a', 'b'])), 'a.b');
	 * // => [1, 2]
	 */
	function property(path) {
	  return isKey(path) ? baseProperty(toKey(path)) : basePropertyDeep(path);
	}
	
	module.exports = property;


/***/ },
/* 391 */
/***/ function(module, exports, __webpack_require__) {

	var baseSet = __webpack_require__(298);
	
	/**
	 * Sets the value at `path` of `object`. If a portion of `path` doesn't exist,
	 * it's created. Arrays are created for missing index properties while objects
	 * are created for all other missing properties. Use `_.setWith` to customize
	 * `path` creation.
	 *
	 * **Note:** This method mutates `object`.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.7.0
	 * @category Object
	 * @param {Object} object The object to modify.
	 * @param {Array|string} path The path of the property to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns `object`.
	 * @example
	 *
	 * var object = { 'a': [{ 'b': { 'c': 3 } }] };
	 *
	 * _.set(object, 'a[0].b.c', 4);
	 * console.log(object.a[0].b.c);
	 * // => 4
	 *
	 * _.set(object, ['x', '0', 'y', 'z'], 5);
	 * console.log(object.x[0].y.z);
	 * // => 5
	 */
	function set(object, path, value) {
	  return object == null ? object : baseSet(object, path, value);
	}
	
	module.exports = set;


/***/ },
/* 392 */
/***/ function(module, exports, __webpack_require__) {

	var getTag = __webpack_require__(52),
	    isArrayLike = __webpack_require__(22),
	    isObjectLike = __webpack_require__(17),
	    isString = __webpack_require__(56),
	    keys = __webpack_require__(9),
	    stringSize = __webpack_require__(359);
	
	/** `Object#toString` result references. */
	var mapTag = '[object Map]',
	    setTag = '[object Set]';
	
	/**
	 * Gets the size of `collection` by returning its length for array-like
	 * values or the number of own enumerable string keyed properties for objects.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Collection
	 * @param {Array|Object} collection The collection to inspect.
	 * @returns {number} Returns the collection size.
	 * @example
	 *
	 * _.size([1, 2, 3]);
	 * // => 3
	 *
	 * _.size({ 'a': 1, 'b': 2 });
	 * // => 2
	 *
	 * _.size('pebbles');
	 * // => 7
	 */
	function size(collection) {
	  if (collection == null) {
	    return 0;
	  }
	  if (isArrayLike(collection)) {
	    var result = collection.length;
	    return (result && isString(collection)) ? stringSize(collection) : result;
	  }
	  if (isObjectLike(collection)) {
	    var tag = getTag(collection);
	    if (tag == mapTag || tag == setTag) {
	      return collection.size;
	    }
	  }
	  return keys(collection).length;
	}
	
	module.exports = size;


/***/ },
/* 393 */
/***/ function(module, exports) {

	/**
	 * This method returns a new empty array.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.13.0
	 * @category Util
	 * @returns {Array} Returns the new empty array.
	 * @example
	 *
	 * var arrays = _.times(2, _.stubArray);
	 *
	 * console.log(arrays);
	 * // => [[], []]
	 *
	 * console.log(arrays[0] === arrays[1]);
	 * // => false
	 */
	function stubArray() {
	  return [];
	}
	
	module.exports = stubArray;


/***/ },
/* 394 */
/***/ function(module, exports) {

	/**
	 * This method returns `false`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.13.0
	 * @category Util
	 * @returns {boolean} Returns `false`.
	 * @example
	 *
	 * _.times(2, _.stubFalse);
	 * // => [false, false]
	 */
	function stubFalse() {
	  return false;
	}
	
	module.exports = stubFalse;


/***/ },
/* 395 */
/***/ function(module, exports, __webpack_require__) {

	var createToPairs = __webpack_require__(319),
	    keys = __webpack_require__(9);
	
	/**
	 * Creates an array of own enumerable string keyed-value pairs for `object`
	 * which can be consumed by `_.fromPairs`. If `object` is a map or set, its
	 * entries are returned.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @alias entries
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the key-value pairs.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.toPairs(new Foo);
	 * // => [['a', 1], ['b', 2]] (iteration order is not guaranteed)
	 */
	var toPairs = createToPairs(keys);
	
	module.exports = toPairs;


/***/ },
/* 396 */
/***/ function(module, exports, __webpack_require__) {

	var baseToString = __webpack_require__(154),
	    castSlice = __webpack_require__(303),
	    charsEndIndex = __webpack_require__(304),
	    charsStartIndex = __webpack_require__(305),
	    stringToArray = __webpack_require__(360),
	    toString = __webpack_require__(122);
	
	/** Used to match leading and trailing whitespace. */
	var reTrim = /^\s+|\s+$/g;
	
	/**
	 * Removes leading and trailing whitespace or specified characters from `string`.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.0.0
	 * @category String
	 * @param {string} [string=''] The string to trim.
	 * @param {string} [chars=whitespace] The characters to trim.
	 * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
	 * @returns {string} Returns the trimmed string.
	 * @example
	 *
	 * _.trim('  abc  ');
	 * // => 'abc'
	 *
	 * _.trim('-_-abc-_-', '_-');
	 * // => 'abc'
	 *
	 * _.map(['  foo  ', '  bar  '], _.trim);
	 * // => ['foo', 'bar']
	 */
	function trim(string, chars, guard) {
	  string = toString(string);
	  if (string && (guard || chars === undefined)) {
	    return string.replace(reTrim, '');
	  }
	  if (!string || !(chars = baseToString(chars))) {
	    return string;
	  }
	  var strSymbols = stringToArray(string),
	      chrSymbols = stringToArray(chars),
	      start = charsStartIndex(strSymbols, chrSymbols),
	      end = charsEndIndex(strSymbols, chrSymbols) + 1;
	
	  return castSlice(strSymbols, start, end).join('');
	}
	
	module.exports = trim;


/***/ },
/* 397 */
/***/ function(module, exports, __webpack_require__) {

	var baseFlatten = __webpack_require__(73),
	    baseRest = __webpack_require__(39),
	    baseUniq = __webpack_require__(156),
	    isArrayLikeObject = __webpack_require__(121);
	
	/**
	 * Creates an array of unique values, in order, from all given arrays using
	 * [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
	 * for equality comparisons.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Array
	 * @param {...Array} [arrays] The arrays to inspect.
	 * @returns {Array} Returns the new array of combined values.
	 * @example
	 *
	 * _.union([2], [1, 2]);
	 * // => [2, 1]
	 */
	var union = baseRest(function(arrays) {
	  return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true));
	});
	
	module.exports = union;


/***/ },
/* 398 */
/***/ function(module, exports, __webpack_require__) {

	var baseUniq = __webpack_require__(156);
	
	/**
	 * Creates a duplicate-free version of an array, using
	 * [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
	 * for equality comparisons, in which only the first occurrence of each
	 * element is kept.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Array
	 * @param {Array} array The array to inspect.
	 * @returns {Array} Returns the new duplicate free array.
	 * @example
	 *
	 * _.uniq([2, 1, 2]);
	 * // => [2, 1]
	 */
	function uniq(array) {
	  return (array && array.length)
	    ? baseUniq(array)
	    : [];
	}
	
	module.exports = uniq;


/***/ },
/* 399 */
/***/ function(module, exports, __webpack_require__) {

	var toString = __webpack_require__(122);
	
	/** Used to generate unique IDs. */
	var idCounter = 0;
	
	/**
	 * Generates a unique ID. If `prefix` is given, the ID is appended to it.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Util
	 * @param {string} [prefix=''] The value to prefix the ID with.
	 * @returns {string} Returns the unique ID.
	 * @example
	 *
	 * _.uniqueId('contact_');
	 * // => 'contact_104'
	 *
	 * _.uniqueId();
	 * // => '105'
	 */
	function uniqueId(prefix) {
	  var id = ++idCounter;
	  return toString(prefix) + id;
	}
	
	module.exports = uniqueId;


/***/ },
/* 400 */
/***/ function(module, exports, __webpack_require__) {

	var arrayFilter = __webpack_require__(264),
	    arrayMap = __webpack_require__(50),
	    baseProperty = __webpack_require__(112),
	    baseTimes = __webpack_require__(153),
	    isArrayLikeObject = __webpack_require__(121);
	
	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeMax = Math.max;
	
	/**
	 * This method is like `_.zip` except that it accepts an array of grouped
	 * elements and creates an array regrouping the elements to their pre-zip
	 * configuration.
	 *
	 * @static
	 * @memberOf _
	 * @since 1.2.0
	 * @category Array
	 * @param {Array} array The array of grouped elements to process.
	 * @returns {Array} Returns the new array of regrouped elements.
	 * @example
	 *
	 * var zipped = _.zip(['a', 'b'], [1, 2], [true, false]);
	 * // => [['a', 1, true], ['b', 2, false]]
	 *
	 * _.unzip(zipped);
	 * // => [['a', 'b'], [1, 2], [true, false]]
	 */
	function unzip(array) {
	  if (!(array && array.length)) {
	    return [];
	  }
	  var length = 0;
	  array = arrayFilter(array, function(group) {
	    if (isArrayLikeObject(group)) {
	      length = nativeMax(group.length, length);
	      return true;
	    }
	  });
	  return baseTimes(length, function(index) {
	    return arrayMap(array, baseProperty(index));
	  });
	}
	
	module.exports = unzip;


/***/ },
/* 401 */
/***/ function(module, exports, __webpack_require__) {

	var baseRest = __webpack_require__(39),
	    unzip = __webpack_require__(400);
	
	/**
	 * Creates an array of grouped elements, the first of which contains the
	 * first elements of the given arrays, the second of which contains the
	 * second elements of the given arrays, and so on.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Array
	 * @param {...Array} [arrays] The arrays to process.
	 * @returns {Array} Returns the new array of grouped elements.
	 * @example
	 *
	 * _.zip(['a', 'b'], [1, 2], [true, false]);
	 * // => [['a', 1, true], ['b', 2, false]]
	 */
	var zip = baseRest(unzip);
	
	module.exports = zip;


/***/ },
/* 402 */
/***/ function(module, exports) {

	/**
	 * @author Roman Ditchuk
	 * @email me@ototak.net
	 * @license MIT
	 */
	
	(function() {
	    var rearg = {
	        is: function(val, sym) {
	            switch(sym) {
	                case 'n':
	                    return typeof val == 'number';
	                case 's':
	                    return typeof val == 'string';
	                case 'b':
	                    return typeof val == 'boolean';
	                case 'f':
	                    return typeof val == 'function';
	                case 'O':
	                    return typeof val == 'object';
	                case 'a':
	                    return val instanceof Array;
	                case 'd':
	                    return val instanceof Date;
	                case 'r':
	                    return val instanceof RegExp;
	                case 'o':
	                    return typeof val == 'object'  &&  !(val instanceof Array)  &&  !(val instanceof Date)  &&  !(val instanceof RegExp);
	            }
	        },
	        reorder: function(pattern, func) {
	            this.reorderCheckPattern(pattern);
	            var self = this;
	            return function() {
	                return func.apply(this, self.reorderList(pattern, arguments));
	            }
	        },
	        reorderCheckPattern: function(pattern) {
	            var usedAnyObject = pattern.indexOf('O') != -1;
	            var objectTypes = 'adro';
	            var allowedSyms = 'nsbfOadro';
	            var used = '';
	            for(var i = pattern.length-1; i >= 0; i--) {
	                if(allowedSyms.indexOf(pattern[i]) == -1) {
	                    throw new Error('Unexpected symbol "'+pattern[i]+'" in reorder pattern');
	                }
	                if(used.indexOf(pattern[i]) != -1) {
	                    throw new Error('Type symbol "'+pattern[i]+'" occurs more than once in reorder pattern');
	                }
	                if(usedAnyObject  &&  objectTypes.indexOf(pattern[i]) != -1) {
	                    throw new Error('You cann\'t use type symbol "'+pattern[i]+'" with type symbol "O" (any Object) in reorder pattern. Try to use "o" (other Object).');
	                }
	                used += pattern[i];
	            }
	        },
	        reorderList: function(pattern, list) {
	            var args = Array(pattern.length);
	            for(var i = list.length-1; i >= 0; i--) {
	                var j = pattern.length-1;
	                for(; j >= 0; j--) {
	                    if(this.is(list[i], pattern[j])) {
	                        break;
	                    }
	                }
	                if(j != -1) {
	                    args[j] = list[i];
	                }
	            }
	            return args;
	        },
	        expand: function(pattern, func) {
	            this.expandCheckPattern(pattern);
	            var self = this;
	            return function() {
	                return func.apply(this, self.expandList(pattern, arguments));
	            }
	        },
	        expandCheckPattern: function(pattern) {
	            var wasOptional = false;
	            var last = {};
	            var allowedSyms = 'nsbfOadro';
	            var objectTypes = 'adro';
	            for(var i = 0; i < pattern.length; i++) {
	                if(allowedSyms.indexOf(pattern[i]) == -1) {
	                    throw new Error('Unexpected symbol "'+pattern[i]+'" in expand pattern');
	                }
	                if(pattern[i+1] == '?') {
	                    wasOptional = true;
	                    last[pattern[i]] = true;
	                    i++;
	                } else {
	                    if(wasOptional  &&  (last[pattern[i]]  ||  (last['O']  &&  objectTypes.indexOf(pattern[i]) != -1)  ||  (pattern[i] == 'O' && (last.a || last.d || last.r || last.o)))) {
	                        throw new Error('You cann\'t use required argument after optional arguments sequence which include the same or similar type in expand pattern');
	                    }
	                    wasOptional = false;
	                    last = {};
	                }
	            }
	        },
	        expandList: function(pattern, list) {
	            var args = [];
	            var j = 0;
	            for(var i = 0; i < pattern.length; i++) {
	                if(this.is(list[j], pattern[i])) {
	                    args.push(list[j++]);
	                    if(pattern[i+1] == '?') {
	                        i++;
	                    }
	                    continue;
	                }
	                if(pattern[i+1] == '?') {
	                    args.push(undefined);
	                    i++;
	                    continue;
	                }
	                throw new Error('Passed arguments list doesn\'t match expected pattern');
	            }
	            if(j < list.length-1) {
	                args.push.apply(args, Array.prototype.slice.call(list, j));
	            }
	            return args;
	        }
	    };
	
	    // define for browsers
	    if(typeof window != 'undefined') {
	        window.rearg = rearg;
	    }
	
	    // define for CommonJS
	    if(typeof module != 'undefined'  &&  module.exports) {
	        module.exports = rearg;
	    }
	})();

/***/ },
/* 403 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subscriber_1 = __webpack_require__(12);
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var InnerSubscriber = (function (_super) {
	    __extends(InnerSubscriber, _super);
	    function InnerSubscriber(parent, outerValue, outerIndex) {
	        _super.call(this);
	        this.parent = parent;
	        this.outerValue = outerValue;
	        this.outerIndex = outerIndex;
	        this.index = 0;
	    }
	    InnerSubscriber.prototype._next = function (value) {
	        this.parent.notifyNext(this.outerValue, value, this.outerIndex, this.index++, this);
	    };
	    InnerSubscriber.prototype._error = function (error) {
	        this.parent.notifyError(error, this);
	        this.unsubscribe();
	    };
	    InnerSubscriber.prototype._complete = function () {
	        this.parent.notifyComplete(this);
	        this.unsubscribe();
	    };
	    return InnerSubscriber;
	}(Subscriber_1.Subscriber));
	exports.InnerSubscriber = InnerSubscriber;
	//# sourceMappingURL=InnerSubscriber.js.map

/***/ },
/* 404 */
/***/ function(module, exports) {

	"use strict";
	exports.empty = {
	    isUnsubscribed: true,
	    next: function (value) { },
	    error: function (err) { throw err; },
	    complete: function () { }
	};
	//# sourceMappingURL=Observer.js.map

/***/ },
/* 405 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subscription_1 = __webpack_require__(124);
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var SubjectSubscription = (function (_super) {
	    __extends(SubjectSubscription, _super);
	    function SubjectSubscription(subject, subscriber) {
	        _super.call(this);
	        this.subject = subject;
	        this.subscriber = subscriber;
	        this.isUnsubscribed = false;
	    }
	    SubjectSubscription.prototype.unsubscribe = function () {
	        if (this.isUnsubscribed) {
	            return;
	        }
	        this.isUnsubscribed = true;
	        var subject = this.subject;
	        var observers = subject.observers;
	        this.subject = null;
	        if (!observers || observers.length === 0 || subject.isStopped || subject.isUnsubscribed) {
	            return;
	        }
	        var subscriberIndex = observers.indexOf(this.subscriber);
	        if (subscriberIndex !== -1) {
	            observers.splice(subscriberIndex, 1);
	        }
	    };
	    return SubjectSubscription;
	}(Subscription_1.Subscription));
	exports.SubjectSubscription = SubjectSubscription;
	//# sourceMappingURL=SubjectSubscription.js.map

/***/ },
/* 406 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Observable_1 = __webpack_require__(23);
	var subscribeToResult_1 = __webpack_require__(43);
	var OuterSubscriber_1 = __webpack_require__(42);
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @extends {Ignored}
	 * @hide true
	 */
	var DeferObservable = (function (_super) {
	    __extends(DeferObservable, _super);
	    function DeferObservable(observableFactory) {
	        _super.call(this);
	        this.observableFactory = observableFactory;
	    }
	    /**
	     * Creates an Observable that, on subscribe, calls an Observable factory to
	     * make an Observable for each new Observer.
	     *
	     * <span class="informal">Creates the Observable lazily, that is, only when it
	     * is subscribed.
	     * </span>
	     *
	     * <img src="./img/defer.png" width="100%">
	     *
	     * `defer` allows you to create the Observable only when the Observer
	     * subscribes, and create a fresh Observable for each Observer. It waits until
	     * an Observer subscribes to it, and then it generates an Observable,
	     * typically with an Observable factory function. It does this afresh for each
	     * subscriber, so although each subscriber may think it is subscribing to the
	     * same Observable, in fact each subscriber gets its own individual
	     * Observable.
	     *
	     * @example <caption>Subscribe to either an Observable of clicks or an Observable of interval, at random</caption>
	     * var clicksOrInterval = Rx.Observable.defer(function () {
	     *   if (Math.random() > 0.5) {
	     *     return Rx.Observable.fromEvent(document, 'click');
	     *   } else {
	     *     return Rx.Observable.interval(1000);
	     *   }
	     * });
	     * clicksOrInterval.subscribe(x => console.log(x));
	     *
	     * @see {@link create}
	     *
	     * @param {function(): Observable|Promise} observableFactory The Observable
	     * factory function to invoke for each Observer that subscribes to the output
	     * Observable. May also return a Promise, which will be converted on the fly
	     * to an Observable.
	     * @return {Observable} An Observable whose Observers' subscriptions trigger
	     * an invocation of the given Observable factory function.
	     * @static true
	     * @name defer
	     * @owner Observable
	     */
	    DeferObservable.create = function (observableFactory) {
	        return new DeferObservable(observableFactory);
	    };
	    DeferObservable.prototype._subscribe = function (subscriber) {
	        return new DeferSubscriber(subscriber, this.observableFactory);
	    };
	    return DeferObservable;
	}(Observable_1.Observable));
	exports.DeferObservable = DeferObservable;
	var DeferSubscriber = (function (_super) {
	    __extends(DeferSubscriber, _super);
	    function DeferSubscriber(destination, factory) {
	        _super.call(this, destination);
	        this.factory = factory;
	        this.tryDefer();
	    }
	    DeferSubscriber.prototype.tryDefer = function () {
	        try {
	            this._callFactory();
	        }
	        catch (err) {
	            this._error(err);
	        }
	    };
	    DeferSubscriber.prototype._callFactory = function () {
	        var result = this.factory();
	        if (result) {
	            this.add(subscribeToResult_1.subscribeToResult(this, result));
	        }
	    };
	    return DeferSubscriber;
	}(OuterSubscriber_1.OuterSubscriber));
	//# sourceMappingURL=DeferObservable.js.map

/***/ },
/* 407 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Observable_1 = __webpack_require__(23);
	var noop_1 = __webpack_require__(424);
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @extends {Ignored}
	 * @hide true
	 */
	var NeverObservable = (function (_super) {
	    __extends(NeverObservable, _super);
	    function NeverObservable() {
	        _super.call(this);
	    }
	    /**
	     * Creates an Observable that emits no items to the Observer.
	     *
	     * <span class="informal">An Observable that never emits anything.</span>
	     *
	     * <img src="./img/never.png" width="100%">
	     *
	     * This static operator is useful for creating a simple Observable that emits
	     * neither values nor errors nor the completion notification. It can be used
	     * for testing purposes or for composing with other Observables. Please not
	     * that by never emitting a complete notification, this Observable keeps the
	     * subscription from being disposed automatically. Subscriptions need to be
	     * manually disposed.
	     *
	     * @example <caption>Emit the number 7, then never emit anything else (not even complete).</caption>
	     * function info() {
	     *   console.log('Will not be called');
	     * }
	     * var result = Rx.Observable.never().startWith(7);
	     * result.subscribe(x => console.log(x), info, info);
	     *
	     * @see {@link create}
	     * @see {@link empty}
	     * @see {@link of}
	     * @see {@link throw}
	     *
	     * @return {Observable} A "never" Observable: never emits anything.
	     * @static true
	     * @name never
	     * @owner Observable
	     */
	    NeverObservable.create = function () {
	        return new NeverObservable();
	    };
	    NeverObservable.prototype._subscribe = function (subscriber) {
	        noop_1.noop();
	    };
	    return NeverObservable;
	}(Observable_1.Observable));
	exports.NeverObservable = NeverObservable;
	//# sourceMappingURL=NeverObservable.js.map

/***/ },
/* 408 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var concat_1 = __webpack_require__(173);
	exports.concat = concat_1.concatStatic;
	//# sourceMappingURL=concat.js.map

/***/ },
/* 409 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var DeferObservable_1 = __webpack_require__(406);
	exports.defer = DeferObservable_1.DeferObservable.create;
	//# sourceMappingURL=defer.js.map

/***/ },
/* 410 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var NeverObservable_1 = __webpack_require__(407);
	exports.never = NeverObservable_1.NeverObservable.create;
	//# sourceMappingURL=never.js.map

/***/ },
/* 411 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var ArrayObservable_1 = __webpack_require__(58);
	exports.of = ArrayObservable_1.ArrayObservable.of;
	//# sourceMappingURL=of.js.map

/***/ },
/* 412 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var ArrayObservable_1 = __webpack_require__(58);
	var isArray_1 = __webpack_require__(86);
	var OuterSubscriber_1 = __webpack_require__(42);
	var subscribeToResult_1 = __webpack_require__(43);
	var none = {};
	/**
	 * Combines multiple Observables to create an Observable whose values are
	 * calculated from the latest values of each of its input Observables.
	 *
	 * <span class="informal">Whenever any input Observable emits a value, it
	 * computes a formula using the latest values from all the inputs, then emits
	 * the output of that formula.</span>
	 *
	 * <img src="./img/combineLatest.png" width="100%">
	 *
	 * `combineLatest` combines the values from this Observable with values from
	 * Observables passed as arguments. This is done by subscribing to each
	 * Observable, in order, and collecting an array of each of the most recent
	 * values any time any of the input Observables emits, then either taking that
	 * array and passing it as arguments to an optional `project` function and
	 * emitting the return value of that, or just emitting the array of recent
	 * values directly if there is no `project` function.
	 *
	 * @example <caption>Dynamically calculate the Body-Mass Index from an Observable of weight and one for height</caption>
	 * var weight = Rx.Observable.of(70, 72, 76, 79, 75);
	 * var height = Rx.Observable.of(1.76, 1.77, 1.78);
	 * var bmi = weight.combineLatest(height, (w, h) => w / (h * h));
	 * bmi.subscribe(x => console.log('BMI is ' + x));
	 *
	 * @see {@link combineAll}
	 * @see {@link merge}
	 * @see {@link withLatestFrom}
	 *
	 * @param {Observable} other An input Observable to combine with the source
	 * Observable. More than one input Observables may be given as argument.
	 * @param {function} [project] An optional function to project the values from
	 * the combined latest values into a new value on the output Observable.
	 * @return {Observable} An Observable of projected values from the most recent
	 * values from each input Observable, or an array of the most recent values from
	 * each input Observable.
	 * @method combineLatest
	 * @owner Observable
	 */
	function combineLatest() {
	    var observables = [];
	    for (var _i = 0; _i < arguments.length; _i++) {
	        observables[_i - 0] = arguments[_i];
	    }
	    var project = null;
	    if (typeof observables[observables.length - 1] === 'function') {
	        project = observables.pop();
	    }
	    // if the first and only other argument besides the resultSelector is an array
	    // assume it's been called with `combineLatest([obs1, obs2, obs3], project)`
	    if (observables.length === 1 && isArray_1.isArray(observables[0])) {
	        observables = observables[0];
	    }
	    observables.unshift(this);
	    return new ArrayObservable_1.ArrayObservable(observables).lift(new CombineLatestOperator(project));
	}
	exports.combineLatest = combineLatest;
	/* tslint:enable:max-line-length */
	var CombineLatestOperator = (function () {
	    function CombineLatestOperator(project) {
	        this.project = project;
	    }
	    CombineLatestOperator.prototype.call = function (subscriber, source) {
	        return source._subscribe(new CombineLatestSubscriber(subscriber, this.project));
	    };
	    return CombineLatestOperator;
	}());
	exports.CombineLatestOperator = CombineLatestOperator;
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var CombineLatestSubscriber = (function (_super) {
	    __extends(CombineLatestSubscriber, _super);
	    function CombineLatestSubscriber(destination, project) {
	        _super.call(this, destination);
	        this.project = project;
	        this.active = 0;
	        this.values = [];
	        this.observables = [];
	    }
	    CombineLatestSubscriber.prototype._next = function (observable) {
	        this.values.push(none);
	        this.observables.push(observable);
	    };
	    CombineLatestSubscriber.prototype._complete = function () {
	        var observables = this.observables;
	        var len = observables.length;
	        if (len === 0) {
	            this.destination.complete();
	        }
	        else {
	            this.active = len;
	            this.toRespond = len;
	            for (var i = 0; i < len; i++) {
	                var observable = observables[i];
	                this.add(subscribeToResult_1.subscribeToResult(this, observable, observable, i));
	            }
	        }
	    };
	    CombineLatestSubscriber.prototype.notifyComplete = function (unused) {
	        if ((this.active -= 1) === 0) {
	            this.destination.complete();
	        }
	    };
	    CombineLatestSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
	        var values = this.values;
	        var oldVal = values[outerIndex];
	        var toRespond = !this.toRespond
	            ? 0
	            : oldVal === none ? --this.toRespond : this.toRespond;
	        values[outerIndex] = innerValue;
	        if (toRespond === 0) {
	            if (this.project) {
	                this._tryProject(values);
	            }
	            else {
	                this.destination.next(values);
	            }
	        }
	    };
	    CombineLatestSubscriber.prototype._tryProject = function (values) {
	        var result;
	        try {
	            result = this.project.apply(this, values);
	        }
	        catch (err) {
	            this.destination.error(err);
	            return;
	        }
	        this.destination.next(result);
	    };
	    return CombineLatestSubscriber;
	}(OuterSubscriber_1.OuterSubscriber));
	exports.CombineLatestSubscriber = CombineLatestSubscriber;
	//# sourceMappingURL=combineLatest.js.map

/***/ },
/* 413 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subscriber_1 = __webpack_require__(12);
	var tryCatch_1 = __webpack_require__(177);
	var errorObject_1 = __webpack_require__(127);
	/**
	 * Returns an Observable that emits all items emitted by the source Observable that are distinct by comparison from the previous item.
	 * If a comparator function is provided, then it will be called for each item to test for whether or not that value should be emitted.
	 * If a comparator function is not provided, an equality check is used by default.
	 * @param {function} [compare] optional comparison function called to test if an item is distinct from the previous item in the source.
	 * @return {Observable} an Observable that emits items from the source Observable with distinct values.
	 * @method distinctUntilChanged
	 * @owner Observable
	 */
	function distinctUntilChanged(compare, keySelector) {
	    return this.lift(new DistinctUntilChangedOperator(compare, keySelector));
	}
	exports.distinctUntilChanged = distinctUntilChanged;
	var DistinctUntilChangedOperator = (function () {
	    function DistinctUntilChangedOperator(compare, keySelector) {
	        this.compare = compare;
	        this.keySelector = keySelector;
	    }
	    DistinctUntilChangedOperator.prototype.call = function (subscriber, source) {
	        return source._subscribe(new DistinctUntilChangedSubscriber(subscriber, this.compare, this.keySelector));
	    };
	    return DistinctUntilChangedOperator;
	}());
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var DistinctUntilChangedSubscriber = (function (_super) {
	    __extends(DistinctUntilChangedSubscriber, _super);
	    function DistinctUntilChangedSubscriber(destination, compare, keySelector) {
	        _super.call(this, destination);
	        this.keySelector = keySelector;
	        this.hasKey = false;
	        if (typeof compare === 'function') {
	            this.compare = compare;
	        }
	    }
	    DistinctUntilChangedSubscriber.prototype.compare = function (x, y) {
	        return x === y;
	    };
	    DistinctUntilChangedSubscriber.prototype._next = function (value) {
	        var keySelector = this.keySelector;
	        var key = value;
	        if (keySelector) {
	            key = tryCatch_1.tryCatch(this.keySelector)(value);
	            if (key === errorObject_1.errorObject) {
	                return this.destination.error(errorObject_1.errorObject.e);
	            }
	        }
	        var result = false;
	        if (this.hasKey) {
	            result = tryCatch_1.tryCatch(this.compare)(this.key, key);
	            if (result === errorObject_1.errorObject) {
	                return this.destination.error(errorObject_1.errorObject.e);
	            }
	        }
	        else {
	            this.hasKey = true;
	        }
	        if (Boolean(result) === false) {
	            this.key = key;
	            this.destination.next(value);
	        }
	    };
	    return DistinctUntilChangedSubscriber;
	}(Subscriber_1.Subscriber));
	//# sourceMappingURL=distinctUntilChanged.js.map

/***/ },
/* 414 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subscriber_1 = __webpack_require__(12);
	/**
	 * Perform a side effect for every emission on the source Observable, but return
	 * an Observable that is identical to the source.
	 *
	 * <span class="informal">Intercepts each emission on the source and runs a
	 * function, but returns an output which is identical to the source.</span>
	 *
	 * <img src="./img/do.png" width="100%">
	 *
	 * Returns a mirrored Observable of the source Observable, but modified so that
	 * the provided Observer is called to perform a side effect for every value,
	 * error, and completion emitted by the source. Any errors that are thrown in
	 * the aforementioned Observer or handlers are safely sent down the error path
	 * of the output Observable.
	 *
	 * This operator is useful for debugging your Observables for the correct values
	 * or performing other side effects.
	 *
	 * Note: this is different to a `subscribe` on the Observable. If the Observable
	 * returned by `do` is not subscribed, the side effects specified by the
	 * Observer will never happen. `do` therefore simply spies on existing
	 * execution, it does not trigger an execution to happen like `subscribe` does.
	 *
	 * @example <caption>Map every every click to the clientX position of that click, while also logging the click event</caption>
	 * var clicks = Rx.Observable.fromEvent(document, 'click');
	 * var positions = clicks
	 *   .do(ev => console.log(ev))
	 *   .map(ev => ev.clientX);
	 * positions.subscribe(x => console.log(x));
	 *
	 * @see {@link map}
	 * @see {@link subscribe}
	 *
	 * @param {Observer|function} [nextOrObserver] A normal Observer object or a
	 * callback for `next`.
	 * @param {function} [error] Callback for errors in the source.
	 * @param {function} [complete] Callback for the completion of the source.
	 * @return {Observable} An Observable identical to the source, but runs the
	 * specified Observer or callback(s) for each item.
	 * @method do
	 * @name do
	 * @owner Observable
	 */
	function _do(nextOrObserver, error, complete) {
	    return this.lift(new DoOperator(nextOrObserver, error, complete));
	}
	exports._do = _do;
	var DoOperator = (function () {
	    function DoOperator(nextOrObserver, error, complete) {
	        this.nextOrObserver = nextOrObserver;
	        this.error = error;
	        this.complete = complete;
	    }
	    DoOperator.prototype.call = function (subscriber, source) {
	        return source._subscribe(new DoSubscriber(subscriber, this.nextOrObserver, this.error, this.complete));
	    };
	    return DoOperator;
	}());
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var DoSubscriber = (function (_super) {
	    __extends(DoSubscriber, _super);
	    function DoSubscriber(destination, nextOrObserver, error, complete) {
	        _super.call(this, destination);
	        var safeSubscriber = new Subscriber_1.Subscriber(nextOrObserver, error, complete);
	        safeSubscriber.syncErrorThrowable = true;
	        this.add(safeSubscriber);
	        this.safeSubscriber = safeSubscriber;
	    }
	    DoSubscriber.prototype._next = function (value) {
	        var safeSubscriber = this.safeSubscriber;
	        safeSubscriber.next(value);
	        if (safeSubscriber.syncErrorThrown) {
	            this.destination.error(safeSubscriber.syncErrorValue);
	        }
	        else {
	            this.destination.next(value);
	        }
	    };
	    DoSubscriber.prototype._error = function (err) {
	        var safeSubscriber = this.safeSubscriber;
	        safeSubscriber.error(err);
	        if (safeSubscriber.syncErrorThrown) {
	            this.destination.error(safeSubscriber.syncErrorValue);
	        }
	        else {
	            this.destination.error(err);
	        }
	    };
	    DoSubscriber.prototype._complete = function () {
	        var safeSubscriber = this.safeSubscriber;
	        safeSubscriber.complete();
	        if (safeSubscriber.syncErrorThrown) {
	            this.destination.error(safeSubscriber.syncErrorValue);
	        }
	        else {
	            this.destination.complete();
	        }
	    };
	    return DoSubscriber;
	}(Subscriber_1.Subscriber));
	//# sourceMappingURL=do.js.map

/***/ },
/* 415 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var OuterSubscriber_1 = __webpack_require__(42);
	var subscribeToResult_1 = __webpack_require__(43);
	/**
	 * Converts a higher-order Observable into a first-order Observable which
	 * concurrently delivers all values that are emitted on the inner Observables.
	 *
	 * <span class="informal">Flattens an Observable-of-Observables.</span>
	 *
	 * <img src="./img/mergeAll.png" width="100%">
	 *
	 * `mergeAll` subscribes to an Observable that emits Observables, also known as
	 * a higher-order Observable. Each time it observes one of these emitted inner
	 * Observables, it subscribes to that and delivers all the values from the
	 * inner Observable on the output Observable. The output Observable only
	 * completes once all inner Observables have completed. Any error delivered by
	 * a inner Observable will be immediately emitted on the output Observable.
	 *
	 * @example <caption>Spawn a new interval Observable for each click event, and blend their outputs as one Observable</caption>
	 * var clicks = Rx.Observable.fromEvent(document, 'click');
	 * var higherOrder = clicks.map((ev) => Rx.Observable.interval(1000));
	 * var firstOrder = higherOrder.mergeAll();
	 * firstOrder.subscribe(x => console.log(x));
	 *
	 * @example <caption>Count from 0 to 9 every second for each click, but only allow 2 concurrent timers</caption>
	 * var clicks = Rx.Observable.fromEvent(document, 'click');
	 * var higherOrder = clicks.map((ev) => Rx.Observable.interval(1000).take(10));
	 * var firstOrder = higherOrder.mergeAll(2);
	 * firstOrder.subscribe(x => console.log(x));
	 *
	 * @see {@link combineAll}
	 * @see {@link concatAll}
	 * @see {@link exhaust}
	 * @see {@link merge}
	 * @see {@link mergeMap}
	 * @see {@link mergeMapTo}
	 * @see {@link mergeScan}
	 * @see {@link switch}
	 * @see {@link zipAll}
	 *
	 * @param {number} [concurrent=Number.POSITIVE_INFINITY] Maximum number of inner
	 * Observables being subscribed to concurrently.
	 * @return {Observable} An Observable that emits values coming from all the
	 * inner Observables emitted by the source Observable.
	 * @method mergeAll
	 * @owner Observable
	 */
	function mergeAll(concurrent) {
	    if (concurrent === void 0) { concurrent = Number.POSITIVE_INFINITY; }
	    return this.lift(new MergeAllOperator(concurrent));
	}
	exports.mergeAll = mergeAll;
	var MergeAllOperator = (function () {
	    function MergeAllOperator(concurrent) {
	        this.concurrent = concurrent;
	    }
	    MergeAllOperator.prototype.call = function (observer, source) {
	        return source._subscribe(new MergeAllSubscriber(observer, this.concurrent));
	    };
	    return MergeAllOperator;
	}());
	exports.MergeAllOperator = MergeAllOperator;
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var MergeAllSubscriber = (function (_super) {
	    __extends(MergeAllSubscriber, _super);
	    function MergeAllSubscriber(destination, concurrent) {
	        _super.call(this, destination);
	        this.concurrent = concurrent;
	        this.hasCompleted = false;
	        this.buffer = [];
	        this.active = 0;
	    }
	    MergeAllSubscriber.prototype._next = function (observable) {
	        if (this.active < this.concurrent) {
	            this.active++;
	            this.add(subscribeToResult_1.subscribeToResult(this, observable));
	        }
	        else {
	            this.buffer.push(observable);
	        }
	    };
	    MergeAllSubscriber.prototype._complete = function () {
	        this.hasCompleted = true;
	        if (this.active === 0 && this.buffer.length === 0) {
	            this.destination.complete();
	        }
	    };
	    MergeAllSubscriber.prototype.notifyComplete = function (innerSub) {
	        var buffer = this.buffer;
	        this.remove(innerSub);
	        this.active--;
	        if (buffer.length > 0) {
	            this._next(buffer.shift());
	        }
	        else if (this.active === 0 && this.hasCompleted) {
	            this.destination.complete();
	        }
	    };
	    return MergeAllSubscriber;
	}(OuterSubscriber_1.OuterSubscriber));
	exports.MergeAllSubscriber = MergeAllSubscriber;
	//# sourceMappingURL=mergeAll.js.map

/***/ },
/* 416 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subscriber_1 = __webpack_require__(12);
	/**
	 * Returns an Observable that skips `n` items emitted by an Observable.
	 *
	 * <img src="./img/skip.png" width="100%">
	 *
	 * @param {Number} the `n` of times, items emitted by source Observable should be skipped.
	 * @return {Observable} an Observable that skips values emitted by the source Observable.
	 *
	 * @method skip
	 * @owner Observable
	 */
	function skip(total) {
	    return this.lift(new SkipOperator(total));
	}
	exports.skip = skip;
	var SkipOperator = (function () {
	    function SkipOperator(total) {
	        this.total = total;
	    }
	    SkipOperator.prototype.call = function (subscriber, source) {
	        return source._subscribe(new SkipSubscriber(subscriber, this.total));
	    };
	    return SkipOperator;
	}());
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var SkipSubscriber = (function (_super) {
	    __extends(SkipSubscriber, _super);
	    function SkipSubscriber(destination, total) {
	        _super.call(this, destination);
	        this.total = total;
	        this.count = 0;
	    }
	    SkipSubscriber.prototype._next = function (x) {
	        if (++this.count > this.total) {
	            this.destination.next(x);
	        }
	    };
	    return SkipSubscriber;
	}(Subscriber_1.Subscriber));
	//# sourceMappingURL=skip.js.map

/***/ },
/* 417 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subscriber_1 = __webpack_require__(12);
	var ArgumentOutOfRangeError_1 = __webpack_require__(420);
	var EmptyObservable_1 = __webpack_require__(125);
	/**
	 * Emits only the first `count` values emitted by the source Observable.
	 *
	 * <span class="informal">Takes the first `count` values from the source, then
	 * completes.</span>
	 *
	 * <img src="./img/take.png" width="100%">
	 *
	 * `take` returns an Observable that emits only the first `count` values emitted
	 * by the source Observable. If the source emits fewer than `count` values then
	 * all of its values are emitted. After that, it completes, regardless if the
	 * source completes.
	 *
	 * @example <caption>Take the first 5 seconds of an infinite 1-second interval Observable</caption>
	 * var interval = Rx.Observable.interval(1000);
	 * var five = interval.take(5);
	 * five.subscribe(x => console.log(x));
	 *
	 * @see {@link takeLast}
	 * @see {@link takeUntil}
	 * @see {@link takeWhile}
	 * @see {@link skip}
	 *
	 * @throws {ArgumentOutOfRangeError} When using `take(i)`, it delivers an
	 * ArgumentOutOrRangeError to the Observer's `error` callback if `i < 0`.
	 *
	 * @param {number} count The maximum number of `next` values to emit.
	 * @return {Observable<T>} An Observable that emits only the first `count`
	 * values emitted by the source Observable, or all of the values from the source
	 * if the source emits fewer than `count` values.
	 * @method take
	 * @owner Observable
	 */
	function take(count) {
	    if (count === 0) {
	        return new EmptyObservable_1.EmptyObservable();
	    }
	    else {
	        return this.lift(new TakeOperator(count));
	    }
	}
	exports.take = take;
	var TakeOperator = (function () {
	    function TakeOperator(total) {
	        this.total = total;
	        if (this.total < 0) {
	            throw new ArgumentOutOfRangeError_1.ArgumentOutOfRangeError;
	        }
	    }
	    TakeOperator.prototype.call = function (subscriber, source) {
	        return source._subscribe(new TakeSubscriber(subscriber, this.total));
	    };
	    return TakeOperator;
	}());
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var TakeSubscriber = (function (_super) {
	    __extends(TakeSubscriber, _super);
	    function TakeSubscriber(destination, total) {
	        _super.call(this, destination);
	        this.total = total;
	        this.count = 0;
	    }
	    TakeSubscriber.prototype._next = function (value) {
	        var total = this.total;
	        if (++this.count <= total) {
	            this.destination.next(value);
	            if (this.count === total) {
	                this.destination.complete();
	                this.unsubscribe();
	            }
	        }
	    };
	    return TakeSubscriber;
	}(Subscriber_1.Subscriber));
	//# sourceMappingURL=take.js.map

/***/ },
/* 418 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var OuterSubscriber_1 = __webpack_require__(42);
	var subscribeToResult_1 = __webpack_require__(43);
	/**
	 * Combines the source Observable with other Observables to create an Observable
	 * whose values are calculated from the latest values of each, only when the
	 * source emits.
	 *
	 * <span class="informal">Whenever the source Observable emits a value, it
	 * computes a formula using that value plus the latest values from other input
	 * Observables, then emits the output of that formula.</span>
	 *
	 * <img src="./img/withLatestFrom.png" width="100%">
	 *
	 * `withLatestFrom` combines each value from the source Observable (the
	 * instance) with the latest values from the other input Observables only when
	 * the source emits a value, optionally using a `project` function to determine
	 * the value to be emitted on the output Observable. All input Observables must
	 * emit at least one value before the output Observable will emit a value.
	 *
	 * @example <caption>On every click event, emit an array with the latest timer event plus the click event</caption>
	 * var clicks = Rx.Observable.fromEvent(document, 'click');
	 * var timer = Rx.Observable.interval(1000);
	 * var result = clicks.withLatestFrom(timer);
	 * result.subscribe(x => console.log(x));
	 *
	 * @see {@link combineLatest}
	 *
	 * @param {Observable} other An input Observable to combine with the source
	 * Observable. More than one input Observables may be given as argument.
	 * @param {Function} [project] Projection function for combining values
	 * together. Receives all values in order of the Observables passed, where the
	 * first parameter is a value from the source Observable. (e.g.
	 * `a.withLatestFrom(b, c, (a1, b1, c1) => a1 + b1 + c1)`). If this is not
	 * passed, arrays will be emitted on the output Observable.
	 * @return {Observable} An Observable of projected values from the most recent
	 * values from each input Observable, or an array of the most recent values from
	 * each input Observable.
	 * @method withLatestFrom
	 * @owner Observable
	 */
	function withLatestFrom() {
	    var args = [];
	    for (var _i = 0; _i < arguments.length; _i++) {
	        args[_i - 0] = arguments[_i];
	    }
	    var project;
	    if (typeof args[args.length - 1] === 'function') {
	        project = args.pop();
	    }
	    var observables = args;
	    return this.lift(new WithLatestFromOperator(observables, project));
	}
	exports.withLatestFrom = withLatestFrom;
	/* tslint:enable:max-line-length */
	var WithLatestFromOperator = (function () {
	    function WithLatestFromOperator(observables, project) {
	        this.observables = observables;
	        this.project = project;
	    }
	    WithLatestFromOperator.prototype.call = function (subscriber, source) {
	        return source._subscribe(new WithLatestFromSubscriber(subscriber, this.observables, this.project));
	    };
	    return WithLatestFromOperator;
	}());
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var WithLatestFromSubscriber = (function (_super) {
	    __extends(WithLatestFromSubscriber, _super);
	    function WithLatestFromSubscriber(destination, observables, project) {
	        _super.call(this, destination);
	        this.observables = observables;
	        this.project = project;
	        this.toRespond = [];
	        var len = observables.length;
	        this.values = new Array(len);
	        for (var i = 0; i < len; i++) {
	            this.toRespond.push(i);
	        }
	        for (var i = 0; i < len; i++) {
	            var observable = observables[i];
	            this.add(subscribeToResult_1.subscribeToResult(this, observable, observable, i));
	        }
	    }
	    WithLatestFromSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
	        this.values[outerIndex] = innerValue;
	        var toRespond = this.toRespond;
	        if (toRespond.length > 0) {
	            var found = toRespond.indexOf(outerIndex);
	            if (found !== -1) {
	                toRespond.splice(found, 1);
	            }
	        }
	    };
	    WithLatestFromSubscriber.prototype.notifyComplete = function () {
	        // noop
	    };
	    WithLatestFromSubscriber.prototype._next = function (value) {
	        if (this.toRespond.length === 0) {
	            var args = [value].concat(this.values);
	            if (this.project) {
	                this._tryProject(args);
	            }
	            else {
	                this.destination.next(args);
	            }
	        }
	    };
	    WithLatestFromSubscriber.prototype._tryProject = function (args) {
	        var result;
	        try {
	            result = this.project.apply(this, args);
	        }
	        catch (err) {
	            this.destination.error(err);
	            return;
	        }
	        this.destination.next(result);
	    };
	    return WithLatestFromSubscriber;
	}(OuterSubscriber_1.OuterSubscriber));
	//# sourceMappingURL=withLatestFrom.js.map

/***/ },
/* 419 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var root_1 = __webpack_require__(88);
	var Symbol = root_1.root.Symbol;
	if (typeof Symbol === 'function') {
	    if (Symbol.iterator) {
	        exports.$$iterator = Symbol.iterator;
	    }
	    else if (typeof Symbol.for === 'function') {
	        exports.$$iterator = Symbol.for('iterator');
	    }
	}
	else {
	    if (root_1.root.Set && typeof new root_1.root.Set()['@@iterator'] === 'function') {
	        // Bug for mozilla version
	        exports.$$iterator = '@@iterator';
	    }
	    else if (root_1.root.Map) {
	        // es6-shim specific logic
	        var keys = Object.getOwnPropertyNames(root_1.root.Map.prototype);
	        for (var i = 0; i < keys.length; ++i) {
	            var key = keys[i];
	            if (key !== 'entries' && key !== 'size' && root_1.root.Map.prototype[key] === root_1.root.Map.prototype['entries']) {
	                exports.$$iterator = key;
	                break;
	            }
	        }
	    }
	    else {
	        exports.$$iterator = '@@iterator';
	    }
	}
	//# sourceMappingURL=iterator.js.map

/***/ },
/* 420 */
/***/ function(module, exports) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	/**
	 * An error thrown when an element was queried at a certain index of an
	 * Observable, but no such index or position exists in that sequence.
	 *
	 * @see {@link elementAt}
	 * @see {@link take}
	 * @see {@link takeLast}
	 *
	 * @class ArgumentOutOfRangeError
	 */
	var ArgumentOutOfRangeError = (function (_super) {
	    __extends(ArgumentOutOfRangeError, _super);
	    function ArgumentOutOfRangeError() {
	        var err = _super.call(this, 'argument out of range');
	        this.name = err.name = 'ArgumentOutOfRangeError';
	        this.stack = err.stack;
	        this.message = err.message;
	    }
	    return ArgumentOutOfRangeError;
	}(Error));
	exports.ArgumentOutOfRangeError = ArgumentOutOfRangeError;
	//# sourceMappingURL=ArgumentOutOfRangeError.js.map

/***/ },
/* 421 */
/***/ function(module, exports) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	/**
	 * An error thrown when one or more errors have occurred during the
	 * `unsubscribe` of a {@link Subscription}.
	 */
	var UnsubscriptionError = (function (_super) {
	    __extends(UnsubscriptionError, _super);
	    function UnsubscriptionError(errors) {
	        _super.call(this);
	        this.errors = errors;
	        var err = Error.call(this, errors ?
	            errors.length + " errors occurred during unsubscription:\n  " + errors.map(function (err, i) { return ((i + 1) + ") " + err.toString()); }).join('\n  ') : '');
	        this.name = err.name = 'UnsubscriptionError';
	        this.stack = err.stack;
	        this.message = err.message;
	    }
	    return UnsubscriptionError;
	}(Error));
	exports.UnsubscriptionError = UnsubscriptionError;
	//# sourceMappingURL=UnsubscriptionError.js.map

/***/ },
/* 422 */
/***/ function(module, exports) {

	"use strict";
	function isObject(x) {
	    return x != null && typeof x === 'object';
	}
	exports.isObject = isObject;
	//# sourceMappingURL=isObject.js.map

/***/ },
/* 423 */
/***/ function(module, exports) {

	"use strict";
	function isPromise(value) {
	    return value && typeof value.subscribe !== 'function' && typeof value.then === 'function';
	}
	exports.isPromise = isPromise;
	//# sourceMappingURL=isPromise.js.map

/***/ },
/* 424 */
/***/ function(module, exports) {

	"use strict";
	/* tslint:disable:no-empty */
	function noop() { }
	exports.noop = noop;
	//# sourceMappingURL=noop.js.map

/***/ },
/* 425 */
/***/ function(module, exports) {

	"use strict";
	function throwError(e) { throw e; }
	exports.throwError = throwError;
	//# sourceMappingURL=throwError.js.map

/***/ },
/* 426 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Subscriber_1 = __webpack_require__(12);
	var rxSubscriber_1 = __webpack_require__(126);
	function toSubscriber(nextOrObserver, error, complete) {
	    if (nextOrObserver) {
	        if (nextOrObserver instanceof Subscriber_1.Subscriber) {
	            return nextOrObserver;
	        }
	        if (nextOrObserver[rxSubscriber_1.$$rxSubscriber]) {
	            return nextOrObserver[rxSubscriber_1.$$rxSubscriber]();
	        }
	    }
	    if (!nextOrObserver && !error && !complete) {
	        return new Subscriber_1.Subscriber();
	    }
	    return new Subscriber_1.Subscriber(nextOrObserver, error, complete);
	}
	exports.toSubscriber = toSubscriber;
	//# sourceMappingURL=toSubscriber.js.map

/***/ },
/* 427 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _ponyfill = __webpack_require__(428);
	
	var _ponyfill2 = _interopRequireDefault(_ponyfill);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var root = undefined; /* global window */
	
	if (typeof global !== 'undefined') {
		root = global;
	} else if (typeof window !== 'undefined') {
		root = window;
	}
	
	var result = (0, _ponyfill2.default)(root);
	exports.default = result;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 428 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = symbolObservablePonyfill;
	function symbolObservablePonyfill(root) {
		var result;
		var _Symbol = root.Symbol;
	
		if (typeof _Symbol === 'function') {
			if (_Symbol.observable) {
				result = _Symbol.observable;
			} else {
				result = _Symbol('observable');
				_Symbol.observable = result;
			}
		} else {
			result = '@@observable';
		}
	
		return result;
	};

/***/ }
/******/ ])
});
;
//# sourceMappingURL=open-physiology-model-minimal.js.map
