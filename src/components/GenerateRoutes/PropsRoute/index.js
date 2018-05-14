import React from 'react'
import PropTypes from 'prop-types'
import { Route } from 'react-router-dom'
import renderMergedProps from '../renderMergerProps/renderMergedProps'
import PrivateRoute from '../PrivateRoute'

const PropsRoute = ({ component, ...rest }) => {
  if (rest.authenticate) {
    return <PrivateRoute {...rest} component={component} redirectTo="/" />
  }
  return (
    <Route
      {...rest}
      render={routeProps => renderMergedProps(component, routeProps, rest)}
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
