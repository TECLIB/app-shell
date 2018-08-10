import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import { Label } from 'office-ui-fabric-react/lib'

class SpanWithPopper extends PureComponent {
  render() {
    if (this.props.to) {
      return (
        <div>
          <NavLink to={this.props.to} activeClassName="selected">
            <Label style={{ cursor: 'pointer' }}>
              {this.props.description}
            </Label>
          </NavLink>
        </div>
      )
    }
    return (
      <div role="button" tabIndex="0" onClick={this.props.click}>
        <Label style={{ cursor: 'pointer' }}>
          {this.props.description}
        </Label>
      </div>
    )
  }
}

SpanWithPopper.defaultProps = {
  to: null,
  click: () => {},
}

SpanWithPopper.propTypes = {
  description: PropTypes.string.isRequired,
  to: PropTypes.string,
  click: PropTypes.func,
}

export default SpanWithPopper
