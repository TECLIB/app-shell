import React from 'react'

/**
 * Create element with all props
 * @function RenderMergedProps
 * @param {component} component
 * @param {*} rest
 * @return {component}
 */
const RenderMergedProps = (component, ...rest) => {
  const finalProps = Object.assign({}, ...rest)
  return React.createElement(component, finalProps)
}

export default RenderMergedProps
