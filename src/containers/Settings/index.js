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
import React, {
  PureComponent,
} from 'react'
import PropTypes from 'prop-types'
import LayoutListWithNavLinks from 'components/LayoutListWithNavLinks'
import GenerateRoutes from 'components/GenerateRoutes'
import routes from './routes'

/**
 * Component with the settings section
 * @class Settings
 * @extends PureComponent
 */
class Settings extends PureComponent {
  /**
   * Render component
   * @function render
   */
  render() {
    return (
      <LayoutListWithNavLinks
        routes={routes}
        rootPath={this.props.match.url}
        history={this.props.history}
        languageCurrent={this.props.languageCurrent}
      >
        <GenerateRoutes
          routes={routes}
          rootPath={this.props.match.url}
          toast={this.props.toast}
          handleMessage={this.props.handleMessage}
          changeLanguage={this.props.changeLanguage}
          languageCurrent={this.props.languageCurrent}
        />
      </LayoutListWithNavLinks>
    )
  }
}

Settings.propTypes = {
  toast: PropTypes.shape({
    setNotification: PropTypes.func,
  }).isRequired,
  handleMessage: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  changeLanguage: PropTypes.func.isRequired,
  languageCurrent: PropTypes.string.isRequired,
}

export default Settings
