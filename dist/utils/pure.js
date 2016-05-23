(function e(t,n,r){f s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = setTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    clearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        setTimeout(drainQueue, 0);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createEagerElementUtil = require('./utils/createEagerElementUtil');

var _createEagerElementUtil2 = _interopRequireDefault(_createEagerElementUtil);

var _isReferentiallyTransparentFunctionComponent = require('./isReferentiallyTransparentFunctionComponent');

var _isReferentiallyTransparentFunctionComponent2 = _interopRequireDefault(_isReferentiallyTransparentFunctionComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createFactory = function createFactory(type) {
  var isReferentiallyTransparent = (0, _isReferentiallyTransparentFunctionComponent2.default)(type);
  return function (p, c) {
    return (0, _createEagerElementUtil2.default)(false, isReferentiallyTransparent, type, p, c);
  };
};

exports.default = createFactory;

},{"./isReferentiallyTransparentFunctionComponent":6,"./utils/createEagerElementUtil":11}],3:[function(require,module,exports){
(function (process){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var createHelper = function createHelper(func, helperName) {
  var setDisplayName = arguments.length <= 2 || arguments[2] === undefined ? true : arguments[2];
  var noArgs = arguments.length <= 3 || arguments[3] === undefined ? false : arguments[3];

  if (process.env.NODE_ENV !== 'production' && setDisplayName) {
    var _ret = function () {
      /* eslint-disable global-require */
      var wrapDisplayName = require('./wrapDisplayName').default;
      /* eslint-enable global-require */

      if (noArgs) {
        return {
          v: function v(BaseComponent) {
            var Component = func(BaseComponent);
            Component.displayName = wrapDisplayName(BaseComponent, helperName);
            return Component;
          }
        };
      }

      return {
        v: function v() {
          for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          if (args.length > func.length) {
            /* eslint-disable */
            console.error(
            /* eslint-enable */
            'Too many arguments passed to ' + helperName + '(). It should called ' + ('like so: ' + helperName + '(...args)(BaseComponent).'));
          }

          return function (BaseComponent) {
            var Component = func.apply(undefined, args)(BaseComponent);
            Component.displayName = wrapDisplayName(BaseComponent, helperName);
            return Component;
          };
        }
      };
    }();

    if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
  }

  return func;
};

exports.default = createHelper;

}).call(this,require('_process'))

},{"./wrapDisplayName":12,"_process":1}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var getDisplayName = function getDisplayName(Component) {
  if (typeof Component === 'string') {
    return Component;
  }

  if (!Component) {
    return undefined;
  }

  return Component.displayName || Component.name || 'Component';
};

exports.default = getDisplayName;

},{}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var isClassComponent = function isClassComponent(Component) {
  return Boolean(Component && Component.prototype && _typeof(Component.prototype.isReactComponent) === 'object');
};

exports.default = isClassComponent;

},{}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isClassComponent = require('./isClassComponent.js');

var _isClassComponent2 = _interopRequireDefault(_isClassComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isReferentiallyTransparentFunctionComponent = function isReferentiallyTransparentFunctionComponent(Component) {
  return Boolean(typeof Component === 'function' && !(0, _isClassComponent2.default)(Component) && !Component.defaultProps && !Component.contextTypes && !Component.propTypes);
};

exports.default = isReferentiallyTransparentFunctionComponent;

},{"./isClassComponent.js":5}],7:[function(require,module,exports){
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @typechecks
 *
 */

/*eslint-disable no-self-compare */

'use strict';

var hasOwnProperty = Object.prototype.hasOwnProperty;

/**
 * inlined Object.is polyfill to avoid requiring consumers ship their own
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
 */
function is(x, y) {
  // SameValue algorithm
  if (x === y) {
    // Steps 1-5, 7-10
    // Steps 6.b-6.e: +0 != -0
    return x !== 0 || 1 / x === 1 / y;
  } else {
    // Step 6.a: NaN == NaN
    return x !== x && y !== y;
  }
}

/**
 * Performs equality by iterating through keys on an object and returning false
 * when any key has values which are not strictly equal between the arguments.
 * Returns true when the values of all keys are strictly equal.
 */
function shallowEqual(objA, objB) {
  if (is(objA, objB)) {
    return true;
  }

  if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
    return false;
  }

  var keysA = Object.keys(objA);
  var keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  // Test for A's keys different from B.
  for (var i = 0; i < keysA.length; i++) {
    if (!hasOwnProperty.call(objB, keysA[i]) || !is(objA[keysA[i]], objB[keysA[i]])) {
      return false;
    }
  }

  return true;
}

module.exports = shallowEqual;
},{}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _shouldUpdate = require('./shouldUpdate');

var _shouldUpdate2 = _interopRequireDefault(_shouldUpdate);

var _shallowEqual = require('./shallowEqual');

var _shallowEqual2 = _interopRequireDefault(_shallowEqual);

var _createHelper = require('./createHelper');

var _createHelper2 = _interopRequireDefault(_createHelper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var pure = (0, _shouldUpdate2.default)(function (props, nextProps) {
  return !(0, _shallowEqual2.default)(props, nextProps);
});

exports.default = (0, _createHelper2.default)(pure, 'pure', true, true);

},{"./createHelper":3,"./shallowEqual":9,"./shouldUpdate":10}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _shallowEqual = require('fbjs/lib/shallowEqual');

var _shallowEqual2 = _interopRequireDefault(_shallowEqual);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _shallowEqual2.default;

},{"fbjs/lib/shallowEqual":7}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _createHelper = require('./createHelper');

var _createHelper2 = _interopRequireDefault(_createHelper);

var _createEagerFactory = require('./createEagerFactory');

var _createEagerFactory2 = _interopRequireDefault(_createEagerFactory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var shouldUpdate = function shouldUpdate(test) {
  return function (BaseComponent) {
    var factory = (0, _createEagerFactory2.default)(BaseComponent);
    return function (_Component) {
      _inherits(_class, _Component);

      function _class() {
        _classCallCheck(this, _class);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(_class).apply(this, arguments));
      }

      _createClass(_class, [{
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate(nextProps) {
          return test(this.props, nextProps);
        }
      }, {
        key: 'render',
        value: function render() {
          return factory(this.props);
        }
      }]);

      return _class;
    }(_react.Component);
  };
};

exports.default = (0, _createHelper2.default)(shouldUpdate, 'shouldUpdate');

},{"./createEagerFactory":2,"./createHelper":3,"react":"react"}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createEagerElementUtil = function createEagerElementUtil(hasKey, isReferentiallyTransparent, type, props, children) {
  if (!hasKey && isReferentiallyTransparent) {
    if (children) {
      return type(_extends({}, props, { children: children }));
    }
    return type(props);
  }

  var Component = type;

  if (children) {
    return _react2.default.createElement(
      Component,
      props,
      children
    );
  }

  return _react2.default.createElement(Component, props);
};

exports.default = createEagerElementUtil;

},{"react":"react"}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getDisplayName = require('./getDisplayName');

var _getDisplayName2 = _interopRequireDefault(_getDisplayName);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var wrapDisplayName = function wrapDisplayName(BaseComponent, hocName) {
  return hocName + '(' + (0, _getDisplayName2.default)(BaseComponent) + ')';
};

exports.default = wrapDisplayName;

},{"./getDisplayName":4}]},{},[8])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvcHJvY2Vzcy9icm93c2VyLmpzIiwic3JjL3BhY2thZ2VzL3JlY29tcG9zZS9jcmVhdGVFYWdlckZhY3RvcnkuanMiLCJzcmMvcGFja2FnZXMvcmVjb21wb3NlL2NyZWF0ZUhlbHBlci5qcyIsInNyYy9wYWNrYWdlcy9yZWNvbXBvc2UvZ2V0RGlzcGxheU5hbWUuanMiLCJzcmMvcGFja2FnZXMvcmVjb21wb3NlL2lzQ2xhc3NDb21wb25lbnQuanMiLCJzcmMvcGFja2FnZXMvcmVjb21wb3NlL2lzUmVmZXJlbnRpYWxseVRyYW5zcGFyZW50RnVuY3Rpb25Db21wb25lbnQuanMiLCJzcmMvcGFja2FnZXMvcmVjb21wb3NlL25vZGVfbW9kdWxlcy9mYmpzL2xpYi9zaGFsbG93RXF1YWwuanMiLCJzcmMvcGFja2FnZXMvcmVjb21wb3NlL3B1cmUuanMiLCJzcmMvcGFja2FnZXMvcmVjb21wb3NlL3NoYWxsb3dFcXVhbC5qcyIsInNyYy9wYWNrYWdlcy9yZWNvbXBvc2Uvc2hvdWxkVXBkYXRlLmpzIiwic3JjL3BhY2thZ2VzL3JlY29tcG9zZS91dGlscy9jcmVhdGVFYWdlckVsZW1lbnRVdGlsLmpzIiwic3JjL3BhY2thZ2VzL3JlY29tcG9zZS93cmFwRGlzcGxheU5hbWUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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LElBQU0seUJBQXlCLFNBQXpCLHNCQUF5QixDQUM3QixNQUQ2QixFQUU3QiwwQkFGNkIsRUFHN0IsSUFINkIsRUFJN0IsS0FKNkIsRUFLN0IsUUFMNkIsRUFNMUI7QUFDSCxNQUFJLENBQUMsTUFBRCxJQUFXLDBCQUFmLEVBQTJDO0FBQ3pDLFFBQUksUUFBSixFQUFjO0FBQ1osYUFBTyxrQkFBVSxLQUFWLElBQWlCLGtCQUFqQixJQUFQO0FBQ0Q7QUFDRCxXQUFPLEtBQUssS0FBTCxDQUFQO0FBQ0Q7O0FBRUQsTUFBTSxZQUFZLElBQWxCOztBQUVBLE1BQUksUUFBSixFQUFjO0FBQ1osV0FBTztBQUFDLGVBQUQ7TUFBZSxLQUFmO01BQXVCO0FBQXZCLEtBQVA7QUFDRDs7QUFFRCxTQUFPLDhCQUFDLFNBQUQsRUFBZSxLQUFmLENBQVA7QUFDRCxDQXJCRDs7a0JBdUJlLHNCOzs7Ozs7Ozs7QUN6QmY7Ozs7OztBQUVBLElBQU0sa0JBQWtCLFNBQWxCLGVBQWtCLENBQUMsYUFBRCxFQUFnQixPQUFoQjtBQUFBLFNBQ25CLE9BRG1CLFNBQ1IsOEJBQWUsYUFBZixDQURRO0FBQUEsQ0FBeEI7O2tCQUdlLGUiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLy8gc2hpbSBmb3IgdXNpbmcgcHJvY2VzcyBpbiBicm93c2VyXG5cbnZhciBwcm9jZXNzID0gbW9kdWxlLmV4cG9ydHMgPSB7fTtcbnZhciBxdWV1ZSA9IFtdO1xudmFyIGRyYWluaW5nID0gZmFsc2U7XG52YXIgY3VycmVudFF1ZXVlO1xudmFyIHF1ZXVlSW5kZXggPSAtMTtcblxuZnVuY3Rpb24gY2xlYW5VcE5leHRUaWNrKCkge1xuICAgIGlmICghZHJhaW5pbmcgfHwgIWN1cnJlbnRRdWV1ZSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgaWYgKGN1cnJlbnRRdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgcXVldWUgPSBjdXJyZW50UXVldWUuY29uY2F0KHF1ZXVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgfVxuICAgIGlmIChxdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgZHJhaW5RdWV1ZSgpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZHJhaW5RdWV1ZSgpIHtcbiAgICBpZiAoZHJhaW5pbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgdGltZW91dCA9IHNldFRpbWVvdXQoY2xlYW5VcE5leHRUaWNrKTtcbiAgICBkcmFpbmluZyA9IHRydWU7XG5cbiAgICB2YXIgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIHdoaWxlKGxlbikge1xuICAgICAgICBjdXJyZW50UXVldWUgPSBxdWV1ZTtcbiAgICAgICAgcXVldWUgPSBbXTtcbiAgICAgICAgd2hpbGUgKCsrcXVldWVJbmRleCA8IGxlbikge1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRRdWV1ZSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRRdWV1ZVtxdWV1ZUluZGV4XS5ydW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgICAgIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB9XG4gICAgY3VycmVudFF1ZXVlID0gbnVsbDtcbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbn1cblxucHJvY2Vzcy5uZXh0VGljayA9IGZ1bmN0aW9uIChmdW4pIHtcbiAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoIC0gMSk7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBxdWV1ZS5wdXNoKG5ldyBJdGVtKGZ1biwgYXJncykpO1xuICAgIGlmIChxdWV1ZS5sZW5ndGggPT09IDEgJiYgIWRyYWluaW5nKSB7XG4gICAgICAgIHNldFRpbWVvdXQoZHJhaW5RdWV1ZSwgMCk7XG4gICAgfVxufTtcblxuLy8gdjggbGlrZXMgcHJlZGljdGlibGUgb2JqZWN0c1xuZnVuY3Rpb24gSXRlbShmdW4sIGFycmF5KSB7XG4gICAgdGhpcy5mdW4gPSBmdW47XG4gICAgdGhpcy5hcnJheSA9IGFycmF5O1xufVxuSXRlbS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZnVuLmFwcGx5KG51bGwsIHRoaXMuYXJyYXkpO1xufTtcbnByb2Nlc3MudGl0bGUgPSAnYnJvd3Nlcic7XG5wcm9jZXNzLmJyb3dzZXIgPSB0cnVlO1xucHJvY2Vzcy5lbnYgPSB7fTtcbnByb2Nlc3MuYXJndiA9IFtdO1xucHJvY2Vzcy52ZXJzaW9uID0gJyc7IC8vIGVtcHR5IHN0cmluZyB0byBhdm9pZCByZWdleHAgaXNzdWVzXG5wcm9jZXNzLnZlcnNpb25zID0ge307XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG5wcm9jZXNzLm9uID0gbm9vcDtcbnByb2Nlc3MuYWRkTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5vbmNlID0gbm9vcDtcbnByb2Nlc3Mub2ZmID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBub29wO1xucHJvY2Vzcy5lbWl0ID0gbm9vcDtcblxucHJvY2Vzcy5iaW5kaW5nID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuYmluZGluZyBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xuXG5wcm9jZXNzLmN3ZCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuICcvJyB9O1xucHJvY2Vzcy5jaGRpciA9IGZ1bmN0aW9uIChkaXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuY2hkaXIgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcbnByb2Nlc3MudW1hc2sgPSBmdW5jdGlvbigpIHsgcmV0dXJuIDA7IH07XG4iLCJpbXBvcnQgY3JlYXRlRWFnZXJFbGVtZW50VXRpbCBmcm9tICcuL3V0aWxzL2NyZWF0ZUVhZ2VyRWxlbWVudFV0aWwnXG5pbXBvcnQgaXNSZWZlcmVudGlhbGx5VHJhbnNwYXJlbnRGdW5jdGlvbkNvbXBvbmVudFxuICBmcm9tICcuL2lzUmVmZXJlbnRpYWxseVRyYW5zcGFyZW50RnVuY3Rpb25Db21wb25lbnQnXG5cbmNvbnN0IGNyZWF0ZUZhY3RvcnkgPSB0eXBlID0+IHtcbiAgY29uc3QgaXNSZWZlcmVudGlhbGx5VHJhbnNwYXJlbnQgPVxuICAgIGlzUmVmZXJlbnRpYWxseVRyYW5zcGFyZW50RnVuY3Rpb25Db21wb25lbnQodHlwZSlcbiAgcmV0dXJuIChwLCBjKSA9PlxuICAgIGNyZWF0ZUVhZ2VyRWxlbWVudFV0aWwoZmFsc2UsIGlzUmVmZXJlbnRpYWxseVRyYW5zcGFyZW50LCB0eXBlLCBwLCBjKVxufVxuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVGYWN0b3J5XG4iLCJjb25zdCBjcmVhdGVIZWxwZXIgPSAoXG4gIGZ1bmMsXG4gIGhlbHBlck5hbWUsXG4gIHNldERpc3BsYXlOYW1lID0gdHJ1ZSxcbiAgbm9BcmdzID0gZmFsc2VcbikgPT4ge1xuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyAmJiBzZXREaXNwbGF5TmFtZSkge1xuICAgIC8qIGVzbGludC1kaXNhYmxlIGdsb2JhbC1yZXF1aXJlICovXG4gICAgY29uc3Qgd3JhcERpc3BsYXlOYW1lID0gcmVxdWlyZSgnLi93cmFwRGlzcGxheU5hbWUnKS5kZWZhdWx0XG4gICAgLyogZXNsaW50LWVuYWJsZSBnbG9iYWwtcmVxdWlyZSAqL1xuXG4gICAgaWYgKG5vQXJncykge1xuICAgICAgcmV0dXJuIEJhc2VDb21wb25lbnQgPT4ge1xuICAgICAgICBjb25zdCBDb21wb25lbnQgPSBmdW5jKEJhc2VDb21wb25lbnQpXG4gICAgICAgIENvbXBvbmVudC5kaXNwbGF5TmFtZSA9IHdyYXBEaXNwbGF5TmFtZShCYXNlQ29tcG9uZW50LCBoZWxwZXJOYW1lKVxuICAgICAgICByZXR1cm4gQ29tcG9uZW50XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuICguLi5hcmdzKSA9PiB7XG4gICAgICBpZiAoYXJncy5sZW5ndGggPiBmdW5jLmxlbmd0aCkge1xuICAgICAgICAvKiBlc2xpbnQtZGlzYWJsZSAqL1xuICAgICAgICBjb25zb2xlLmVycm9yKFxuICAgICAgICAvKiBlc2xpbnQtZW5hYmxlICovXG4gICAgICAgICAgYFRvbyBtYW55IGFyZ3VtZW50cyBwYXNzZWQgdG8gJHtoZWxwZXJOYW1lfSgpLiBJdCBzaG91bGQgY2FsbGVkIGAgK1xuICAgICAgICAgIGBsaWtlIHNvOiAke2hlbHBlck5hbWV9KC4uLmFyZ3MpKEJhc2VDb21wb25lbnQpLmBcbiAgICAgICAgKVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gQmFzZUNvbXBvbmVudCA9PiB7XG4gICAgICAgIGNvbnN0IENvbXBvbmVudCA9IGZ1bmMoLi4uYXJncykoQmFzZUNvbXBvbmVudClcbiAgICAgICAgQ29tcG9uZW50LmRpc3BsYXlOYW1lID0gd3JhcERpc3BsYXlOYW1lKEJhc2VDb21wb25lbnQsIGhlbHBlck5hbWUpXG4gICAgICAgIHJldHVybiBDb21wb25lbnRcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gZnVuY1xufVxuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVIZWxwZXJcbiIsImNvbnN0IGdldERpc3BsYXlOYW1lID0gQ29tcG9uZW50ID0+IHtcbiAgaWYgKHR5cGVvZiBDb21wb25lbnQgPT09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIENvbXBvbmVudFxuICB9XG5cbiAgaWYgKCFDb21wb25lbnQpIHtcbiAgICByZXR1cm4gdW5kZWZpbmVkXG4gIH1cblxuICByZXR1cm4gQ29tcG9uZW50LmRpc3BsYXlOYW1lIHx8IENvbXBvbmVudC5uYW1lIHx8ICdDb21wb25lbnQnXG59XG5cbmV4cG9ydCBkZWZhdWx0IGdldERpc3BsYXlOYW1lXG4iLCJjb25zdCBpc0NsYXNzQ29tcG9uZW50ID0gQ29tcG9uZW50ID0+IEJvb2xlYW4oXG4gIENvbXBvbmVudCAmJlxuICBDb21wb25lbnQucHJvdG90eXBlICYmXG4gIHR5cGVvZiBDb21wb25lbnQucHJvdG90eXBlLmlzUmVhY3RDb21wb25lbnQgPT09ICdvYmplY3QnXG4pXG5cbmV4cG9ydCBkZWZhdWx0IGlzQ2xhc3NDb21wb25lbnRcbiIsImltcG9ydCBpc0NsYXNzQ29tcG9uZW50IGZyb20gJy4vaXNDbGFzc0NvbXBvbmVudC5qcydcblxuY29uc3QgaXNSZWZlcmVudGlhbGx5VHJhbnNwYXJlbnRGdW5jdGlvbkNvbXBvbmVudCA9IENvbXBvbmVudCA9PiBCb29sZWFuKFxuICB0eXBlb2YgQ29tcG9uZW50ID09PSAnZnVuY3Rpb24nICYmXG4gICFpc0NsYXNzQ29tcG9uZW50KENvbXBvbmVudCkgJiZcbiAgIUNvbXBvbmVudC5kZWZhdWx0UHJvcHMgJiZcbiAgIUNvbXBvbmVudC5jb250ZXh0VHlwZXMgJiZcbiAgIUNvbXBvbmVudC5wcm9wVHlwZXNcbilcblxuZXhwb3J0IGRlZmF1bHQgaXNSZWZlcmVudGlhbGx5VHJhbnNwYXJlbnRGdW5jdGlvbkNvbXBvbmVudFxuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEB0eXBlY2hlY2tzXG4gKiBcbiAqL1xuXG4vKmVzbGludC1kaXNhYmxlIG5vLXNlbGYtY29tcGFyZSAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG5cbi8qKlxuICogaW5saW5lZCBPYmplY3QuaXMgcG9seWZpbGwgdG8gYXZvaWQgcmVxdWlyaW5nIGNvbnN1bWVycyBzaGlwIHRoZWlyIG93blxuICogaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvT2JqZWN0L2lzXG4gKi9cbmZ1bmN0aW9uIGlzKHgsIHkpIHtcbiAgLy8gU2FtZVZhbHVlIGFsZ29yaXRobVxuICBpZiAoeCA9PT0geSkge1xuICAgIC8vIFN0ZXBzIDEtNSwgNy0xMFxuICAgIC8vIFN0ZXBzIDYuYi02LmU6ICswICE9IC0wXG4gICAgcmV0dXJuIHggIT09IDAgfHwgMSAvIHggPT09IDEgLyB5O1xuICB9IGVsc2Uge1xuICAgIC8vIFN0ZXAgNi5hOiBOYU4gPT0gTmFOXG4gICAgcmV0dXJuIHggIT09IHggJiYgeSAhPT0geTtcbiAgfVxufVxuXG4vKipcbiAqIFBlcmZvcm1zIGVxdWFsaXR5IGJ5IGl0ZXJhdGluZyB0aHJvdWdoIGtleXMgb24gYW4gb2JqZWN0IGFuZCByZXR1cm5pbmcgZmFsc2VcbiAqIHdoZW4gYW55IGtleSBoYXMgdmFsdWVzIHdoaWNoIGFyZSBub3Qgc3RyaWN0bHkgZXF1YWwgYmV0d2VlbiB0aGUgYXJndW1lbnRzLlxuICogUmV0dXJucyB0cnVlIHdoZW4gdGhlIHZhbHVlcyBvZiBhbGwga2V5cyBhcmUgc3RyaWN0bHkgZXF1YWwuXG4gKi9cbmZ1bmN0aW9uIHNoYWxsb3dFcXVhbChvYmpBLCBvYmpCKSB7XG4gIGlmIChpcyhvYmpBLCBvYmpCKSkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgaWYgKHR5cGVvZiBvYmpBICE9PSAnb2JqZWN0JyB8fCBvYmpBID09PSBudWxsIHx8IHR5cGVvZiBvYmpCICE9PSAnb2JqZWN0JyB8fCBvYmpCID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgdmFyIGtleXNBID0gT2JqZWN0LmtleXMob2JqQSk7XG4gIHZhciBrZXlzQiA9IE9iamVjdC5rZXlzKG9iakIpO1xuXG4gIGlmIChrZXlzQS5sZW5ndGggIT09IGtleXNCLmxlbmd0aCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIC8vIFRlc3QgZm9yIEEncyBrZXlzIGRpZmZlcmVudCBmcm9tIEIuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwga2V5c0EubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoIWhhc093blByb3BlcnR5LmNhbGwob2JqQiwga2V5c0FbaV0pIHx8ICFpcyhvYmpBW2tleXNBW2ldXSwgb2JqQltrZXlzQVtpXV0pKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2hhbGxvd0VxdWFsOyIsImltcG9ydCBzaG91bGRVcGRhdGUgZnJvbSAnLi9zaG91bGRVcGRhdGUnXG5pbXBvcnQgc2hhbGxvd0VxdWFsIGZyb20gJy4vc2hhbGxvd0VxdWFsJ1xuaW1wb3J0IGNyZWF0ZUhlbHBlciBmcm9tICcuL2NyZWF0ZUhlbHBlcidcblxuY29uc3QgcHVyZSA9IHNob3VsZFVwZGF0ZSgocHJvcHMsIG5leHRQcm9wcykgPT4gIXNoYWxsb3dFcXVhbChwcm9wcywgbmV4dFByb3BzKSlcblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlSGVscGVyKHB1cmUsICdwdXJlJywgdHJ1ZSwgdHJ1ZSlcbiIsImltcG9ydCBzaGFsbG93RXF1YWwgZnJvbSAnZmJqcy9saWIvc2hhbGxvd0VxdWFsJ1xuZXhwb3J0IGRlZmF1bHQgc2hhbGxvd0VxdWFsXG4iLCJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICdyZWFjdCdcbmltcG9ydCBjcmVhdGVIZWxwZXIgZnJvbSAnLi9jcmVhdGVIZWxwZXInXG5pbXBvcnQgY3JlYXRlRWFnZXJGYWN0b3J5IGZyb20gJy4vY3JlYXRlRWFnZXJGYWN0b3J5J1xuXG5jb25zdCBzaG91bGRVcGRhdGUgPSB0ZXN0ID0+IEJhc2VDb21wb25lbnQgPT4ge1xuICBjb25zdCBmYWN0b3J5ID0gY3JlYXRlRWFnZXJGYWN0b3J5KEJhc2VDb21wb25lbnQpXG4gIHJldHVybiBjbGFzcyBleHRlbmRzIENvbXBvbmVudCB7XG4gICAgc2hvdWxkQ29tcG9uZW50VXBkYXRlKG5leHRQcm9wcykge1xuICAgICAgcmV0dXJuIHRlc3QodGhpcy5wcm9wcywgbmV4dFByb3BzKVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgIHJldHVybiBmYWN0b3J5KHRoaXMucHJvcHMpXG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUhlbHBlcihzaG91bGRVcGRhdGUsICdzaG91bGRVcGRhdGUnKVxuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuXG5jb25zdCBjcmVhdGVFYWdlckVsZW1lbnRVdGlsID0gKFxuICBoYXNLZXksXG4gIGlzUmVmZXJlbnRpYWxseVRyYW5zcGFyZW50LFxuICB0eXBlLFxuICBwcm9wcyxcbiAgY2hpbGRyZW5cbikgPT4ge1xuICBpZiAoIWhhc0tleSAmJiBpc1JlZmVyZW50aWFsbHlUcmFuc3BhcmVudCkge1xuICAgIGlmIChjaGlsZHJlbikge1xuICAgICAgcmV0dXJuIHR5cGUoeyAuLi5wcm9wcywgY2hpbGRyZW4gfSlcbiAgICB9XG4gICAgcmV0dXJuIHR5cGUocHJvcHMpXG4gIH1cblxuICBjb25zdCBDb21wb25lbnQgPSB0eXBlXG5cbiAgaWYgKGNoaWxkcmVuKSB7XG4gICAgcmV0dXJuIDxDb21wb25lbnQgey4uLnByb3BzfT57Y2hpbGRyZW59PC9Db21wb25lbnQ+XG4gIH1cblxuICByZXR1cm4gPENvbXBvbmVudCB7Li4ucHJvcHN9IC8+XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUVhZ2VyRWxlbWVudFV0aWxcbiIsImltcG9ydCBnZXREaXNwbGF5TmFtZSBmcm9tICcuL2dldERpc3BsYXlOYW1lJ1xuXG5jb25zdCB3cmFwRGlzcGxheU5hbWUgPSAoQmFzZUNvbXBvbmVudCwgaG9jTmFtZSkgPT5cbiAgYCR7aG9jTmFtZX0oJHtnZXREaXNwbGF5TmFtZShCYXNlQ29tcG9uZW50KX0pYFxuXG5leHBvcnQgZGVmYXVsdCB3cmFwRGlzcGxheU5hbWVcbiJdfQ==
