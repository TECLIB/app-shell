import React from 'react'
import PropTypes from 'prop-types'
import { Route } from 'react-router-dom'
import { Redirect } from 'react-router'
import renderMergedProps from '../renderMergerProps/renderMergedProps'

const isAuthenticated = () => {
  if (localStorage.getItem('sessionToken') && localStorage.getItem('sessionToken') !== undefined) {
    return true
  }
  return false
}

const PrivateRoute = ({ component, redirectTo, ...rest }) =>
  (
    <Route
      {...rest}
      render={routeProps =>
        (isAuthenticated() ? (
          renderMergedProps(component, routeProps, rest)
        ) :
          (
            <Redirect
              to={{
                pathname: redirectTo,
                state: { from: routeProps.location },
              }}
            />
          ))
      }
    />
  )

PrivateRoute.defaultProps = {
  redirectTo: '/',
}

PrivateRoute.propTypes = {
  component: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
  ]).isRequired,
  redirectTo: PropTypes.string,
}

export default PrivateRoute
