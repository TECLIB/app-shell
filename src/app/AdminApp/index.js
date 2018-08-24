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
import GenerateRoutes from 'components/GenerateRoutes'
import withAdminDashboardLayout from 'hoc/withAdminAppLayout'
import withHandleMessages from 'hoc/withHandleMessages'
import withConfirmation from 'hoc/withConfirmation'
import routes from './routes'

/**
 * Represents internal routes
 * @class AdminDashboard
 * @extends Component
 */
const AdminApp = props => (
  <GenerateRoutes
    routes={routes}
    rootPath={props.match.url}
    toast={props.toast}
    confirmation={props.confirmation}
    handleMessage={props.handleMessage}
    changeLanguage={props.changeLanguage}
    languageCurrent={props.languageCurrent}
  />
)

AdminApp.propTypes = {
  toast: PropTypes.object.isRequired,
  confirmation: PropTypes.object.isRequired,
  match: PropTypes.shape({
    url: PropTypes.string,
  }).isRequired,
  handleMessage: PropTypes.func.isRequired,
  changeLanguage: PropTypes.func.isRequired,
  languageCurrent: PropTypes.string.isRequired,
}

export default withConfirmation(withAdminDashboardLayout(withHandleMessages(AdminApp)))
