import React from 'react'
import PropTypes from 'prop-types'
import {
  Route,
} from 'react-router-dom'
import {
  Redirect,
} from 'react-router'
import RenderMergedProps from '../RenderMergedProps'

/**
 * Validate if a user is authenticated
 * @function isAuthenticated
 * @return {boolean}
 */
const isAuthenticated = () => {
  if (localStorage.getItem('sessionToken') && localStorage.getItem('sessionToken') !== undefined) {
    return true
  }
  return false
}

/**
 * Generate private route
 * @function PrivateRoute
 * @param {component} component
 * @param {string} redirectTo
 * @param {*} rest
 * @return {component}
 */
const PrivateRoute = ({ component, redirectTo, ...rest }) => (
  <Route
    {...rest}
    render={routeProps => (isAuthenticated() ? (
      RenderMergedProps(component, routeProps, rest)
    )
      : (
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
