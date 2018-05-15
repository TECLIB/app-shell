import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import { Icon } from 'office-ui-fabric-react/lib/Icon'


class iconWithPopper extends PureComponent {
  render() {
    if (this.props.to) {
      return (
        <div>
          <NavLink to={this.props.to} activeClassName="selected">
            <Icon iconName={this.props.iconName} ariaLabel={this.props.title} />
          </NavLink>
        </div>
      )
    }
    return (
      <div role="button" tabIndex="0" onClick={this.props.click}>
        <a>
          <Icon iconName={this.props.iconName} ariaLabel={this.props.title} />
        </a>
      </div>
    )
  }
}

iconWithPopper.defaultProps = {
  to: null,
  click: () => {},
  title: '',
}

iconWithPopper.propTypes = {
  to: PropTypes.string,
  iconName: PropTypes.string.isRequired,
  click: PropTypes.func,
  title: PropTypes.string,
}

export default iconWithPopper
