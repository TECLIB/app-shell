import React from 'react'
import PropTypes from 'prop-types'
import { Route } from 'react-router-dom'
import RenderMergedProps from '../RenderMergedProps'
import PrivateRoute from '../PrivateRoute'

/**
 * Generate route with props
 * @function PropsRoute
 * @param {component} component
 * @param {*} rest
 * @return {component}
 */
const PropsRoute = ({ component, ...rest }) => {
  if (rest.authenticate) {
    return <PrivateRoute {...rest} component={component} redirectTo="/" />
  }
  return (
    <Route
      {...rest}
      render={routeProps => RenderMergedProps(component, routeProps, rest)}
    />
  )
}

PropsRoute.propTypes = {
  component: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
  ]).isRequired,
}

export default PropsRoute
