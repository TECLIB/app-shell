import React from 'react'
import PropTypes from 'prop-types'
import { Route, Switch } from 'react-router-dom'
import PropsRoute from './PropsRoute'
import NotFound from '../../components/NotFound'

const GenerateRoutes = ({
  routes,
  rootPath,
  withNotFound,
  data,
  toast,
  language,
}) => {
  const r = routes.map(({
    exact, path, component, authenticate,
  }, i) =>
    (
      <PropsRoute
        exact={exact}
        component={component}
        toast={toast}
        language={language}
        authenticate={authenticate}
        key={i}
        {...data}
        path={
          typeof rootPath === 'string'
            ? path === '/'
              ? rootPath
              : rootPath + path
            : path
        }
      />
    ))

  withNotFound &&
    r.push(<Route key={routes.length + 1} render={() => <NotFound />} />)

  return <Switch>{r}</Switch>
}

GenerateRoutes.propTypes = {
  routes: PropTypes.array.isRequired,
  rootPath: PropTypes.string,
  withNotFound: PropTypes.bool,
  data: PropTypes.object,
  toast: PropTypes.object,
  language: PropTypes.object,
}

export default GenerateRoutes
