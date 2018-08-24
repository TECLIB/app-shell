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
import { Dropdown } from 'office-ui-fabric-react/lib/Dropdown'
import { Toggle } from 'office-ui-fabric-react/lib/Toggle'
import PropTypes from 'prop-types'
import I18n from 'shared/i18n'
import languageList from 'shared/i18n/languages'
import ContentPane from 'components/ContentPane'

/**
 * Component with the display section
 * @class Display
 * @extends PureComponent
 */
class Display extends PureComponent {
  /** @constructor */
  constructor(props) {
    super(props)
    const display = localStorage.getItem('display') ? JSON.parse(localStorage.getItem('display')) : {}
    this.state = {
      animations: display.animations !== undefined ? display.animations : true,
    }
  }

  /**
   * Change local storage
   * @function componentDidUpdate
   */
  componentDidUpdate() {
    localStorage.setItem('display', JSON.stringify(this.state))
  }

  /**
   * Handle change state
   * @function changeLocalStorage
   * @param {string} name
   */
  changeLocalStorage = (name) => {
    const { [name]: currentValue } = this.state
    this.setState({
      [name]: !currentValue,
    })
  }

  /**
   * Render component
   * @function render
   */
  render() {
    const {
      animations,
    } = this.state

    return (
      <ContentPane>
        <h2 style={{ margin: '10px' }}>
          {I18n.t('settings.display.title')}
        </h2>

        <div className="list-element">
          <div className="list-element__message">
            {I18n.t('settings.display.change_interface')}
          </div>
          <div
            className="list-element__controller"
            style={{
              paddingTop: 10,
            }}
          >
            <Dropdown
              placeHolder={I18n.t('commons.language')}
              onChanged={item => this.props.changeLanguage(item.key)}
              selectedKey={this.props.languageCurrent || undefined}
              options={languageList()}
              styles={{ root: [{ width: '160px' }] }}
              calloutProps={{ directionalHintFixed: false }}
            />
          </div>
        </div>

        <div className="list-element">
          <div className="list-element__message">
            {animations ? I18n.t('settings.display.disable_animations') : I18n.t('settings.display.enable_animations')}
          </div>
          <div className="list-element__controller">
            <Toggle
              defaultChecked={animations}
              onChanged={() => this.changeLocalStorage('animations')}
            />
          </div>
        </div>
      </ContentPane>
    )
  }
}

Display.propTypes = {
  changeLanguage: PropTypes.func.isRequired,
  languageCurrent: PropTypes.string.isRequired,
}

export default Display
