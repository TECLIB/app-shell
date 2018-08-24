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

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Dropdown } from 'office-ui-fabric-react/lib/Dropdown'
import languagesList from 'shared/i18n/languages'
import withI18n from 'hoc/withI18n'
import I18n from 'shared/i18n'
import logo from 'assets/images/logo.png'

/**
 * Wrapper a component with divs's stylizeds
 * With a select input to change language
 * @param {* component} WrappedComponent   - Component to wrapper it
 * @param {* object } stylesConfiguration  - Config styles of wrapper div
 */
const withAuthenticationLayout = (WrappedComponent, configStyles) => {
  class authenticationLayout extends PureComponent {
    constructor(props) {
      super(props)
      this.state = {
        style: {
          textAlign: configStyles.centerContent ? 'center' : null,
          width: props.width,
        },
      }
    }

    render() {
      return (
        <div className="authentication-block " style={this.state.style}>
          <section className="authentication__section">
            <figure className="authentication__figure">
              <img alt="Teclib MDM Dashboard" src={logo} />
            </figure>
            <WrappedComponent {...this.props} />
          </section>
          <footer className="authenticaton__footer">
            <a href="http://teclib-edition.com/en/privacy-policy/">
              {I18n.t('commons.terms_and_conditions')}
            </a>
            <br />
            <span>
© 2018 Teclib&apos;.
            </span>
            <br />
            <div style={{ margin: '10px', textAlign: '-webkit-center' }}>
              <Dropdown
                placeHolder={I18n.t('commons.language')}
                onChanged={item => this.props.changeLanguage(item.key)}
                selectedKey={this.props.languageCurrent || undefined}
                options={languagesList()}
                styles={{ root: [{ width: '220px' }] }}
                calloutProps={{ directionalHintFixed: false }}
              />
            </div>
          </footer>
        </div>
      )
    }
  }

  authenticationLayout.defaultProps = {
    centerContent: true,
    width: 340,
  }

  authenticationLayout.propTypes = {
    centerContent: PropTypes.bool,
    width: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    languageCurrent: PropTypes.string.isRequired,
    changeLanguage: PropTypes.func.isRequired,
  }

  return withI18n(authenticationLayout)
}

export default withAuthenticationLayout
