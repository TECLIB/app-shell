import React from 'react'
import PropTypes from 'prop-types'
import { Route, Switch } from 'react-router-dom'
import ErrorPage from 'components/ErrorPage'
import PropsRoute from './PropsRoute'

// TODO: Enable PrivateRoute if route if private

/**
 * Generate routes
 * @function GenerateRoutes
 * @param {array} routes
 * @param {string} rootPath
 * @param {boolean} withNotFound
 * @param {object} data
 * @return {component}
 */
const GenerateRoutes = (props) => {
  const r = props.routes.map(({
    exact, path, component, authenticate,
  }) => (
    <PropsRoute
      exact={exact}
      component={component}
      authenticate={authenticate}
      {...props}
      key={path}
      path={
        typeof props.rootPath === 'string'
          ? path === '/'
            ? props.rootPath
            : props.rootPath + path
          : path
      }
    />
  ))

  props.withNotFound
    && r.push(
      <Route
        key={props.routes.length + 1}
        render={() => <ErrorPage />}
      />,
    )

  return (
    <Switch>
      {r}
    </Switch>
  )
}

GenerateRoutes.defaultProps = {
  rootPath: undefined,
  withNotFound: false,
}

GenerateRoutes.propTypes = {
  routes: PropTypes.array.isRequired,
  rootPath: PropTypes.string,
  withNotFound: PropTypes.bool,
}

export default GenerateRoutes
