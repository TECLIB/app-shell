import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import ImageResponsive from '../../ImageResponsive'

class imgWithPopper extends PureComponent {
  render() {
    return (
      <div>
        <NavLink to={this.props.to} activeClassName="selected">
          <ImageResponsive
            alt={this.props.alt}
            src={this.props.img}
            styleNew={{ width: '20px' }}
            title={this.props.title}
          />
        </NavLink>
      </div>
    )
  }
}

imgWithPopper.defaultProps = {
  alt: '',
  title: '',
}

imgWithPopper.propTypes = {
  to: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  alt: PropTypes.string,
  title: PropTypes.string,
}

export default imgWithPopper
