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
import { TextField } from 'office-ui-fabric-react/lib/TextField'
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/Button'
import { Link } from 'react-router-dom'
import I18n from 'shared/i18n'
import Loading from 'components/Loading'
import publicURL from 'shared/publicURL'

class PasswordFieldset extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      errorMessage: '',
      isLoading: false,
    }
  }

  componentDidMount() {
    if (this.passwordInput) {
      this.passwordInput.focus()
    }
  }

  styleTextField = () => ({
    fieldGroup: [
      {
        selectors: {
          ':after': {
            content: "''",
          },
        },
      },
    ],
  });

  render() {
    let renderComponent
    if (this.state.isLoading) {
      renderComponent = (
        <div style={{ margin: 50, height: '140px' }}>
          <Loading message={`${I18n.t('commons.loading')}...`} />
        </div>
      )
    } else {
      renderComponent = (
        <div className="authentication-password__div">
          <h2>{I18n.t('login.enter_password')}</h2>
          <p>
            {I18n.t('login.enter_password_for')}
            <br />
            {this.props.username}
            <br />
            {this.state.errorMessage}
          </p>
          <form onSubmit={this.props.handleOnSubmit}>
            <TextField
              type="password"
              componentRef={(input) => {
                this.passwordInput = input
              }}
              placeholder={I18n.t('commons.password')}
              value={this.props.password}
              onChange={() => this.props.changeInput({ name: 'password', value: this.passwordInput.value.trim() })}
              required
              styles={this.styleTextField()}
            />
            <br />
            <DefaultButton className="btn" onClick={() => this.props.changePhase(1)}>
              {I18n.t('commons.back')}
            </DefaultButton>
            &nbsp;
            <PrimaryButton type="submit" className="btn">
              {I18n.t('commons.sign_in')}
            </PrimaryButton>
          </form>
          <p>
            <Link to={`${publicURL}/forgotPassword`}>{I18n.t('login.forgot_my_password')}</Link>
          </p>
        </div>
      )
    }

    return renderComponent
  }
}

PasswordFieldset.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  changeInput: PropTypes.func.isRequired,
  changePhase: PropTypes.func.isRequired,
  handleOnSubmit: PropTypes.func.isRequired,
}

export default PasswordFieldset
