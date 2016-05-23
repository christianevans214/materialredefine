export default Avatar = (function(React) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

  var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

  function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

  function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

  function getStyles(props, context) {
    var backgroundColor = props.backgroundColor;
    var color = props.color;
    var size = props.size;
    var src = props.src;
    var avatar = context.muiTheme.avatar;


    var styles = {
      root: {
        color: color || avatar.color,
        backgroundColor: backgroundColor || avatar.backgroundColor,
        userSelect: 'none',
        display: 'inline-block',
        textAlign: 'center',
        lineHeight: size + 'px',
        fontSize: size / 2,
        borderRadius: '50%',
        height: size,
        width: size
      },
      icon: {
        color: color || avatar.color,
        width: size * 0.6,
        height: size * 0.6,
        fontSize: size * 0.6,
        margin: size * 0.2
      }
    };

    if (src && avatar.borderColor) {
      Object.assign(styles.root, {
        background: 'url(' + src + ')',
        backgroundSize: size,
        backgroundOrigin: 'border-box',
        border: 'solid 1px ' + avatar.borderColor,
        height: size - 2,
        width: size - 2
      });
    }

    return styles;
  }

  var Avatar = function (_React$Component) {
    _inherits(Avatar, _React$Component);

    function Avatar() {
      _classCallCheck(this, Avatar);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(Avatar).apply(this, arguments));
    }

    _createClass(Avatar, [{
      key: 'render',
      value: function render() {
        var _props = this.props;
        var icon = _props.icon;
        var src = _props.src;
        var style = _props.style;
        var className = _props.className;

        var other = _objectWithoutProperties(_props, ['icon', 'src', 'style', 'className']);

        var prepareStyles = this.context.muiTheme.prepareStyles;

        var styles = getStyles(this.props, this.context);

        if (src) {
          return React.createElement('div', _extends({}, other, {
            style: prepareStyles(Object.assign(styles.root, style)),
            className: className
          }));
        } else {
          return React.createElement(
            'div',
            _extends({}, other, {
              style: prepareStyles(Object.assign(styles.root, style)),
              className: className
            }),
            icon && React.cloneElement(icon, {
              color: styles.icon.color,
              style: Object.assign(styles.icon, icon.props.style)
            }),
            this.props.children
          );
        }
      }
    }]);

    return Avatar;
  }(React.Component);

  Avatar.muiName = 'Avatar';
  Avatar.propTypes = {
    /**
    * The backgroundColor of the avatar. Does not apply to image avatars.
    */
    backgroundColor: React.PropTypes.string,
    /**
    * Can be used, for instance, to render a letter inside the avatar.
    */
    children: React.PropTypes.node,
    /**
    * The css class name of the root `div` or `img` element.
    */
    className: React.PropTypes.string,
    /**
    * The icon or letter's color.
    */
    color: React.PropTypes.string,
    /**
    * This is the SvgIcon or FontIcon to be used inside the avatar.
    */
    icon: React.PropTypes.element,
    /**
    * This is the size of the avatar in pixels.
    */
    size: React.PropTypes.number,
    /**
    * If passed in, this React.component will render an img element. Otherwise, a div will be rendered.
    */
    src: React.PropTypes.string,
    /**
    * Override the inline-styles of the root element.
    */
    style: React.PropTypes.object
  };
  Avatar.defaultProps = {
    size: 40
  };
  Avatar.contextTypes = {
    muiTheme: PropTypes.object.isRequired
  };
  exports.default = Avatar;
  return Avatar;
})(window.React);
