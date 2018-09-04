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

/** import dependencies */
import withAsyncComponent from 'hoc/withAsyncComponent'

/**
 * Represents all private routes from About
 * @constant
 * @type {Array}
 */
const routes = [{
  path: '/',
  name: 'commons.no_selection',
  component: withAsyncComponent(() => import('components/EmptyMessage')),
  exact: true,
},
{
  path: '/overview',
  name: 'about.overview.title',
  component: withAsyncComponent(() => import('./components/Overview')),
  exact: true,
},
{
  path: '/contact',
  name: 'about.contact.title',
  component: withAsyncComponent(() => import('./components/Contact')),
  exact: true,
},
{
  path: '/release',
  name: 'about.release_notes.title',
  component: withAsyncComponent(() => import('./components/ReleaseNotes')),
  exact: false,
},
{
  path: '/term',
  name: 'about.term_of_use.title',
  component: withAsyncComponent(() => import('./components/TermsOfUse')),
  exact: false,
},
{
  path: '/license',
  name: 'about.license.title',
  component: withAsyncComponent(() => import('./components/License')),
  exact: false,
},
]

export default routes
