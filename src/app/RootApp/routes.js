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

import publicURL from 'shared/publicURL'
import asyncValidateAccount from './async/asyncValidateAccount'
import asyncForgotPassword from './async/asyncForgotPassword'
import asyncResetPassword from './async/asyncResetPassword'
import asyncAdminApp from './async/asyncAdminApp'
import asyncSignUp from './async/asyncSignUp'
import asyncSignIn from './async/asyncSignIn'

const routes = [
  {
    path: `${publicURL}/`,
    component: asyncSignIn,
    exact: true,
    authenticate: false,
  },
  {
    path: `${publicURL}/SignUp`,
    component: asyncSignUp,
    exact: true,
    authenticate: false,
  },
  {
    path: `${publicURL}/validateAccount`,
    component: asyncValidateAccount,
    exact: false,
    private: false,
  },
  {
    path: `${publicURL}/forgotPassword`,
    component: asyncForgotPassword,
    exact: false,
    private: false,
  },
  {
    path: `${publicURL}/resetPassword`,
    component: asyncResetPassword,
    exact: false,
    private: false,
  },
  {
    path: `${publicURL}/app`,
    component: asyncAdminApp,
    exact: false,
    authenticate: true,
  },
]

export default routes
