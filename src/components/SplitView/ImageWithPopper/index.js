import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import { Image } from 'office-ui-fabric-react/lib'

class ImageWithPopper extends PureComponent {
  render() {
    return (
      <div>
        <NavLink to={this.props.to} activeClassName="selected">
          <span title={this.props.title}>
            <Image
              src={this.props.img}
              alt={this.props.alt}
              width={20}
            />
          </span>
        </NavLink>
      </div>
    )
  }
}

ImageWithPopper.defaultProps = {
  alt: '',
  title: '',
}

ImageWithPopper.propTypes = {
  to: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  alt: PropTypes.string,
  title: PropTypes.string,
}

export default ImgWithPopper
