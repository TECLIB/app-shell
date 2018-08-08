/** import dependencies */
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button'
import {
  Link,
} from 'react-router-dom'
import I18n from 'shared/i18n'
import publicURL from 'shared/publicURL'
import Loading from 'components/Loading'
import ConstructInputs from 'components/Forms'
import ErrorValidation from 'components/ErrorValidation'
import withAuthentication from 'hoc/withAuthentication'
import withAuthenticationLayout from 'hoc/withAuthenticationLayout'
import withHandleMessages from 'hoc/withHandleMessages'

/**
 * Component with the reset password section
 * @class ResetPassword
 * @extends PureComponent
 */
class ResetPassword extends PureComponent {
  /** @constructor */
  constructor(props) {
    super(props)
    // url example http://localhost:3000/resetPassword?token=83e87e374cc6a6c3b02ae12aa178d5c43f9a335c
    const { search } = this.props.location
    const params = new URLSearchParams(search)
    const token = params.get('token')

    if (!token) {
      this.props.history.push(`${publicURL}/`)
    }

    this.state = {
      token,
      isResetSent: false,
      email: '',
      password: '',
      passwordConfirmation: '',
      forceValidation: false,
    }
  }

  /**
   * Create the element to render
   * @function createRenderElament
   * @return {component}
   */
  createRenderElament = () => {
    let element
    if (!this.state.isResetSent) {
      const reset = this.buildDataArray()
      element = (
        <React.Fragment>
          <div style={{ textAlign: 'left' }}>
            <ConstructInputs data={reset.resetInformation} />
          </div>
          <div style={{ textAlign: 'center', margin: '20px' }}>
            <PrimaryButton onClick={this.handleResetPassword} className="btn">
              {I18n.t('login.reset_password')}
            </PrimaryButton>
          </div>
        </React.Fragment>
      )
    } else {
      element = (
        <div>
          <p>
            {I18n.t('forgot_password.reset_your_password')}
          </p>
          <p>
            <Link to={`${publicURL}/`}>
              {I18n.t('commons.sign_in')}
            </Link>
          </p>
        </div>
      )
    }
    return element
  }

  /**
   * Validate new password and save this in glpi
   * @function handleResetPassword
   */
  handleResetPassword = () => {
    const user = this.buildDataArray()
    let isCorrect = true

    for (const key in user) {
      if (Object.prototype.hasOwnProperty.call(user, key)) {
        const elements = user[key]
        for (let index = 0; index < elements[0].length; index += 1) {
          const element = elements[0][index]
          if (!ErrorValidation.validation(element.parametersToEvaluate, element.value).isCorrect) { isCorrect = false }
        }
      }
    }
    if (isCorrect) {
      this.setState({
        isResetSent: true,
      })
      this.props.auth.fetchResetPassword({
        email: this.state.email,
        token: this.state.token,
        newPassword: this.state.password,
      })
        .then((response) => {
          this.props.toast.setNotification(response)
        })
        .catch((error) => {
          this.props.toast.setNotification(this.props.handleMessage({
            type: 'alert',
            message: error,
          }))
        })
    } else {
      this.setState({
        forceValidation: true,
      })
    }
  }

  /**
   * Handle change state
   * @function changeState
   * @return {function}
   */
  changeState = (name, value) => {
    this.setState({
      [name]: value,
    })
  }

  /**
   * Build the array to generate the form
   * @param {object} I18n
   * @return {array}
   */
  buildDataArray = () => {
    const dataArray = {
      resetInformation: [
        [{
          label: I18n.t('commons.email'),
          type: 'text',
          name: 'email',
          value: this.state.email,
          placeholder: I18n.t('commons.email'),
          function: this.changeState,
          disabled: false,
          style: {
            width: 340,
          },
          parametersToEvaluate: {
            isRequired: true,
            isEmail: true,
          },
          forceValidation: this.state.forceValidation,
        },
        {
          label: I18n.t('commons.password'),
          type: 'password',
          name: 'password',
          value: this.state.password,
          placeholder: I18n.t('commons.password'),
          function: this.changeState,
          disabled: false,
          style: {
            width: 340,
          },
          parametersToEvaluate: {
            isRequired: true,
            ...this.state.configurationPassword,
          },
          forceValidation: this.state.forceValidation,
        },
        {
          label: I18n.t('commons.password_confirmation'),
          type: 'password',
          name: 'passwordConfirmation',
          value: this.state.passwordConfirmation,
          placeholder: I18n.t('commons.password_confirmation'),
          function: this.changeState,
          disabled: false,
          style: {
            width: 340,
          },
          parametersToEvaluate: {
            isRequired: true,
            ...this.state.configurationPassword,
            isEqualTo: {
              value: this.state.password,
              message: I18n.t('commons.passwords_not_match'),
            },
          },
          forceValidation: this.state.forceValidation,
        },
        ],
      ],
    }
    return dataArray
  }


  /**
   * Render component
   * @function render
   */
  render() {
    if (this.props.auth.isLoading) {
      return (
        <div style={{ height: '140px' }}>
          <Loading message={`${I18n.t('commons.sending')}...`} />
        </div>
      )
    }
    return (
      <React.Fragment>
        <h2 style={{ textAlign: 'center' }}>
          {I18n.t('login.reset_password')}
        </h2>
        {this.createRenderElament()}
      </React.Fragment>
    )
  }
}

ResetPassword.defaultProps = {
}

ResetPassword.propTypes = {
  toast: PropTypes.shape({
    setNotification: PropTypes.func,
  }).isRequired,
  handleMessage: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
}

export default withAuthentication(withAuthenticationLayout((withHandleMessages(ResetPassword)), {
  centerContent: true,
}))
