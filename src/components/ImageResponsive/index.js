import React from 'react'
import PropTypes from 'prop-types'
import { updateObject } from '../../shared/updateObject'

const style = {
  width: '100%',
  maxWidth: '100%',
  height: 'auto',
}

const ImageResponsive = ({
  src, alt, styleNew = {}, title,
}) => (
  <img style={updateObject(style, styleNew)} src={src} alt={alt} title={title} />
)

ImageResponsive.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
  styleNew: PropTypes.object,
  title: PropTypes.string,
}

export default ImageResponsive
