import React from 'react'
import renderMergedProps from '../renderMergerProps/renderMergedProps'
import { Route } from 'react-router-dom'
import { Redirect } from 'react-router'

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
      render={(routeProps) =>
        isAuthenticated() ? (
          renderMergedProps(component, routeProps, rest)
        ) :
          (
            <Redirect
              to={{
                pathname: redirectTo,
                state: { from: routeProps.location },
              }}
            />
          )
      }
    />
  )

export default PrivateRoute
