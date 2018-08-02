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

    this.changeInput = event => changeInput(this, event.target)
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
