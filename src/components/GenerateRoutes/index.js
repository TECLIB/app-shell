/*
 *  LICENSE
 *
 *  This file is part of app-shell
 *
 *  app-shell is a subproject of Teclib.
 *
 *  app-shell is free software: you can redistribute it and/or
 *  modify it under the terms of the GNU General Public License
 *  as published by the Free Software Foundation; either version 3
 *  of the License, or (at your option) any later version.
 *
 *  app-shell is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *  ------------------------------------------------------------------------------
 *  @author     Hector Rondon (hrondon@teclib.com)
 *  @copyright  Copyright © 2018 Teclib. All rights reserved.
 *  @license    GPLv3 https://www.gnu.org/licenses/gpl-3.0.html
 *  @link       https://github.com/TECLIB/app-shell
 *  @link       https://teclib.github.io/app-shell
 *  @link       https://teclib-edition.com/en
 *  ------------------------------------------------------------------------------
 */

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
