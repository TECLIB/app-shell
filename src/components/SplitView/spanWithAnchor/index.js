import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'

class spanWithPopper extends PureComponent {
  render() {
    if (this.props.to) {
      return (
        <div>
          <NavLink to={this.props.to} activeClassName="selected">
            { this.props.description }
          </NavLink>
        </div>
      )
    }
    return (
      <div role="button" tabIndex="0" onClick={this.props.click}>
        {this.props.description}
      </div>
    )
  }
}

spanWithPopper.defaultProps = {
  to: null,
  click: () => {},
}

spanWithPopper.propTypes = {
  description: PropTypes.string.isRequired,
  to: PropTypes.string,
  click: PropTypes.func,
}

export default spanWithPopper
