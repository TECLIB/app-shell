import React from 'react'
import PropTypes from 'prop-types'
import { Route, Switch } from 'react-router-dom'
import PropsRoute from './PropsRoute'
import NotFound from '../../components/NotFound'

const GenerateRoutes = (props) => {
  const r = props.routes.map(({
    exact, path, component, authenticate,
  }) =>
    (
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

  props.withNotFound &&
    r.push(<Route key={props.routes.length + 1} render={() => <NotFound />} />)

  return <Switch>{r}</Switch>
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
