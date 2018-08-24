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
