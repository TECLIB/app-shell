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
import { Redirect } from 'react-router'
import I18n from 'shared/i18n'
import withAuthenticationLayout from 'hoc/withAuthenticationLayout'
import withAuthentication from 'hoc/withAuthentication'
import withHandleMessages from 'hoc/withHandleMessages'
import publicURL from 'shared/publicURL'
// Async Component
import AsyncPasswordFieldset from 'async/asyncPasswordFielset'
import Loading from 'components/Loading'
import UsernameFieldset from './components/UsernameFieldset'
import { changeInput, changePhase, handleFormSubmit } from './actions'

class SignIn extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      username: '',
      password: '',
      phase: 1,
    }

    this.changeInput = event => changeInput(this, event)
    this.changePhase = newPhase => changePhase(this, newPhase)
    this.handleFormSubmit = event => handleFormSubmit(this, event)
  }

  render() {
    if (this.props.auth.currentUser && this.props.auth.sessionToken) {
      return <Redirect to={`${publicURL}/app`} />
    }
    let form
    if (this.state.phase === 1) {
      form = (
        <UsernameFieldset
          username={this.state.username}
          changeInput={this.changeInput}
          changePhase={this.changePhase}
        />
      )
    } else {
      form = (
        <AsyncPasswordFieldset
          username={this.state.username}
          password={this.state.password}
          changeInput={this.changeInput}
          changePhase={this.changePhase}
          history={this.props.history}
          handleOnSubmit={this.handleFormSubmit}
        />
      )
    }
    return this.state.isLoading ? (
      <div style={{ height: '140px' }}>
        <Loading message={`${I18n.t('commons.loading')}...`} />
      </div>
    ) : form
  }
}

SignIn.propTypes = {
  auth: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
}

export default withAuthentication(withAuthenticationLayout(withHandleMessages(SignIn), { centerContent: true }))
