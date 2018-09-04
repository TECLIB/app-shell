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
import withAsyncComponent from 'hoc/withAsyncComponent'

const routes = [
  {
    path: `${publicURL}/`,
    component: withAsyncComponent(() => import('containers/SignIn')),
    exact: true,
    authenticate: false,
  },
  {
    path: `${publicURL}/SignUp`,
    component: withAsyncComponent(() => import('containers/SignUp')),
    exact: true,
    authenticate: false,
  },
  {
    path: `${publicURL}/validateAccount`,
    component: withAsyncComponent(() => import('components/ValidateAccount')),
    exact: false,
    private: false,
  },
  {
    path: `${publicURL}/forgotPassword`,
    component: withAsyncComponent(() => import('containers/ForgotPassword')),
    exact: false,
    private: false,
  },
  {
    path: `${publicURL}/resetPassword`,
    component: withAsyncComponent(() => import('containers/ResetPassword')),
    exact: false,
    private: false,
  },
  {
    path: `${publicURL}/app`,
    component: withAsyncComponent(() => import('app/AdminApp')),
    exact: false,
    authenticate: true,
  },
]

export default routes
