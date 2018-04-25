import React from 'react'
import { Route, Switch } from 'react-router-dom'
import PrivateRoute from './PrivateRoute'
import PropsRoute from './PropsRoute'
import NotFound from '../../components/NotFound'

const GenerateRoutes = ({ routes, rootPath, withNotFound, data }) => {
  let r = routes.map(({ exact, path, component, authenticate }, i) => {
    if (typeof (data) === 'object') {
      return (
        <PropsRoute
          exact={exact}
          component={component}
          authenticate={authenticate}
          key={i}
          {...data}
          path={
            typeof (rootPath) === "string"
              ? path === '/'
                ? rootPath
                : rootPath + path
              : path
          } />
      )
    }
    else {
      if (authenticate) {
        return (
          <PrivateRoute redirectTo="/" exact={exact}
            component={component}
            key={i}
            path={
              typeof (rootPath) === "string"
                ? path === '/'
                  ? rootPath
                  : rootPath + path
                : path
            } />
        )
      } else {
        return (
          <Route
            exact={exact}
            component={component}
            key={i}
            path={
              typeof (rootPath) === "string"
                ? path === '/'
                  ? rootPath
                  : rootPath + path
                : path
            } />
        )
      }
    }
  });

  withNotFound && r.push(
    <Route key={routes.length + 1} render={() => <NotFound />} />
  )

  return (
    <Switch>
      {r}
    </Switch>
  )
}

export default GenerateRoutes