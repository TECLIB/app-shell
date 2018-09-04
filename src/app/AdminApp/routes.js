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

import I18n from 'shared/i18n'
import withAsyncComponent from 'hoc/withAsyncComponent'

const routes = [
  {
    path: '/',
    name: I18n.t('commons.home'),
    component: withAsyncComponent(() => import('containers/Home')),
    exact: true,
    authenticate: true,
  },
  {
    path: '/contacts',
    name: I18n.t('commons.contacts'),
    component: withAsyncComponent(() => import('containers/Contact')),
    exact: false,
    authenticate: true,
  },
  {
    path: '/settings',
    name: I18n.t('commons.settings'),
    component: withAsyncComponent(() => import('containers/Settings')),
    exact: false,
  },
  {
    path: '/about',
    name: I18n.t('commons.about'),
    component: withAsyncComponent(() => import('containers/About')),
    exact: false,
  },
]

export default routes
