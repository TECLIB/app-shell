import React from 'react'
import renderMergedProps from '../renderMergerProps/renderMergedProps'
import PrivateRoute from '../PrivateRoute'
import { Route } from 'react-router-dom'

const PropsRoute = ({ component, ...rest }) => {
  if (rest.authenticate) {
    return (
      <PrivateRoute {...rest} component={component} redirectTo="/" />
    )
  } else {
    return (
      <Route {...rest} render={routeProps => {
        return renderMergedProps(component, routeProps, rest);
      }} />
    )
  }
}

export default PropsRoute