import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import { Icon } from 'office-ui-fabric-react/lib/Icon'


class IconWithPopper extends PureComponent {
  render() {
    if (this.props.to) {
      return (
        <div>
          <NavLink to={this.props.to} activeClassName="selected">
            <span title={this.props.title}>
              <Icon iconName={this.props.iconName} />
            </span>
          </NavLink>
        </div>
      )
    }
    return (
      <div role="button" tabIndex="0" onClick={this.props.click}>
        <a>
          <span title={this.props.title}>
            <Icon iconName={this.props.iconName} />
          </span>
        </a>
      </div>
    )
  }
}

IconWithPopper.defaultProps = {
  to: null,
  click: () => {},
  title: '',
}

IconWithPopper.propTypes = {
  to: PropTypes.string,
  iconName: PropTypes.string.isRequired,
  click: PropTypes.func,
  title: PropTypes.string,
}

export default IconWithPopper
