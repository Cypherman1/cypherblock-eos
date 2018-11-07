'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends =
  Object.assign ||
  function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };

var _createClass = (function() {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ('value' in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function(Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();

var _eases = require('eases');

var _eases2 = _interopRequireDefault(_eases);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}

function _objectWithoutProperties(obj, keys) {
  var target = {};
  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }
  return target;
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function');
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return call && (typeof call === 'object' || typeof call === 'function') ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== 'function' && superClass !== null) {
    throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {value: subClass, enumerable: false, writable: true, configurable: true}
  });
  if (superClass)
    Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : (subClass.__proto__ = superClass);
} /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 From
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 https://github.com/javierbyte/react-number-easing
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 Refactored to use React class.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               */

var NumberEasing = (function(_React$Component) {
  _inherits(NumberEasing, _React$Component);

  function NumberEasing(props) {
    _classCallCheck(this, NumberEasing);

    var _this = _possibleConstructorReturn(
      this,
      (NumberEasing.__proto__ || Object.getPrototypeOf(NumberEasing)).call(this, props)
    );

    _initialiseProps.call(_this);

    var _this$props = _this.props;

    var value = _this$props.value;

    var precision = _this$props.precision;

    var trail = _this$props.trail;

    _this.timeout = null;
    _this.startAnimationTime = null;
    _this.state = {
      displayValue: value,
      // eslint-disable-next-line no-restricted-globals
      previousValue:
        trail && !isNaN(parseFloat(value)) ? parseFloat(value).toFixed(precision > -1 ? precision : 0) : value
    };
    return _this;
  }

  _createClass(NumberEasing, [
    {
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps(nextProps) {
        var _this2 = this;

        var value = this.props.value;

        if (parseFloat(nextProps.value) === value) {
          return;
        }

        this.setState({
          previousValue: this.state.displayValue
        });

        if (!window.isNaN(parseInt(this.props.delayValue, 10))) {
          this.delayTimeout = setTimeout(function() {
            _this2.startAnimationTime = new Date().getTime();
            _this2.updateNumber();
          }, this.props.delayValue);
        } else {
          this.startAnimationTime = new Date().getTime();
          this.updateNumber();
        }
      }
    },
    {
      key: 'shouldComponentUpdate',
      value: function shouldComponentUpdate(nextProps, nextState) {
        return nextState.displayValue !== this.state.displayValue;
      }
    },
    {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        clearTimeout(this.timeout);
        clearTimeout(this.delayTimeout);
      }
    },
    {
      key: 'render',
      value: function render() {
        var _props = this.props;

        var className = _props.className;

        var delayValue = _props.delayValue;

        var ease = _props.ease;

        var precision = _props.precision;

        var speed = _props.speed;

        var trail = _props.trail;

        var useLocaleString = _props.useLocaleString;

        var value = _props.value;

        var other = _objectWithoutProperties(_props, [
          'className',
          'delayValue',
          'ease',
          'precision',
          'speed',
          'trail',
          'useLocaleString',
          'value'
        ]);

        var displayValue = this.state.displayValue;

        var classes = 'react-number-easing';
        if (className) {
          classes += ' ' + className;
        }

        return _react2.default.createElement(
          'span',
          _extends({}, other, {className: classes}),
          useLocaleString
            ? parseFloat(displayValue).toLocaleString(undefined, {maximumFractionDigits: 4})
            : trail
              ? parseFloat(displayValue).toFixed(precision > -1 ? precision : 0)
              : displayValue
        );
      }
    }
  ]);

  return NumberEasing;
})(_react2.default.Component);

var _initialiseProps = function _initialiseProps() {
  var _this3 = this;

  this.updateNumber = function() {
    var _props2 = _this3.props;

    var value = _props2.value;

    var precision = _props2.precision;

    var now = new Date().getTime();
    var elapsedTime = Math.min(_this3.props.speed, now - _this3.startAnimationTime);
    var progress = _eases2.default[_this3.props.ease](elapsedTime / _this3.props.speed);

    var currentDisplayValue =
      Math.round(
        ((value - _this3.state.previousValue) * progress + _this3.state.previousValue) * Math.pow(10, precision)
      ) / Math.pow(10, precision);

    _this3.setState({
      displayValue: currentDisplayValue
    });

    if (elapsedTime < _this3.props.speed) {
      _this3.timeout = setTimeout(_this3.updateNumber, 16);
    } else {
      _this3.setState({
        previousValue: value
      });
    }
  };
};

NumberEasing.propTypes = {
  delayValue: _propTypes2.default.number,
  ease: _propTypes2.default.oneOf(Object.keys(_eases2.default)),
  precision: _propTypes2.default.number,
  speed: _propTypes2.default.number,
  trail: _propTypes2.default.bool,
  useLocaleString: _propTypes2.default.bool,
  value: _propTypes2.default.any.isRequired
};

NumberEasing.defaultProps = {
  delayValue: 50,
  ease: 'quintInOut',
  precision: 2,
  speed: 500,
  trail: false,
  useLocaleString: false
};

exports.default = NumberEasing;
