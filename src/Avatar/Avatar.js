// import React, {React.Component, PropTypes} from 'react';

function getStyles(props, context) {
  const {
    backgroundColor,
    color,
    size,
    src,
  } = props;

  const {avatar} = context.muiTheme;

  const styles = {
    root: {
      color: color || avatar.color,
      backgroundColor: backgroundColor || avatar.backgroundColor,
      userSelect: 'none',
      display: 'inline-block',
      textAlign: 'center',
      lineHeight: `${size}px`,
      fontSize: size / 2,
      borderRadius: '50%',
      height: size,
      width: size,
    },
    icon: {
      color: color || avatar.color,
      width: size * 0.6,
      height: size * 0.6,
      fontSize: size * 0.6,
      margin: size * 0.2,
    },
  };

  if (src && avatar.borderColor) {
    Object.assign(styles.root, {
      background: `url(${src})`,
      backgroundSize: size,
      backgroundOrigin: 'border-box',
      border: `solid 1px ${avatar.borderColor}`,
      height: size - 2,
      width: size - 2,
    });
  }

  return styles;
}

class Avatar extends React.Component {
  static muiName = 'Avatar';

  static propTypes = {
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
    style: React.PropTypes.object,
  };

  static defaultProps = {
    size: 40,
  };

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };

  render() {
    const {
      icon,
      src,
      style,
      className,
      ...other,
    } = this.props;

    const {prepareStyles} = this.context.muiTheme;
    const styles = getStyles(this.props, this.context);

    if (src) {
      return (
        <div
          {...other}
          style={prepareStyles(Object.assign(styles.root, style))}
          className={className}
        />
      );
    } else {
      return (
        <div
          {...other}
          style={prepareStyles(Object.assign(styles.root, style))}
          className={className}
        >
          {icon && React.cloneElement(icon, {
            color: styles.icon.color,
            style: Object.assign(styles.icon, icon.props.style),
          })}
          {this.props.children}
        </div>
      );
    }
  }
}

export default Avatar;
