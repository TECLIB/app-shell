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
import {
  Link,
} from 'react-router-dom'
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button'
import I18n from 'shared/i18n'
import publicURL from 'shared/publicURL'
import Loading from 'components/Loading'
import ConstructInputs from 'components/Forms'
import ErrorValidation from 'components/ErrorValidation'
import withAuthentication from 'hoc/withAuthentication'
import withAuthenticationLayout from 'hoc/withAuthenticationLayout'
import withHandleMessages from 'hoc/withHandleMessages'

/**
 * Component with the registration form
 * @class SignUp
 * @extends PureComponent
 */
class SignUp extends PureComponent {
  /** @constructor */
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      realName: '',
      password: '',
      passwordConfirmation: '',
      forceValidation: false,
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
   * @function buildDataArray
   * @return {array}
   */
  buildDataArray = () => {
    const dataArray = {
      personalInformation: [
        [{
          label: I18n.t('commons.email'),
          type: 'text',
          name: 'email',
          value: this.state.email,
          placeholder: I18n.t('commons.email'),
          function: this.changeState,
          disabled: false,
          styles: {
            root: [
              {
                width: 340,
              },
            ],
          },
          parametersToEvaluate: {
            isRequired: true,
            isEmail: true,
          },
          forceValidation: this.state.forceValidation,
        },
        {
          label: I18n.t('create_account.full_name'),
          type: 'text',
          name: 'realName',
          value: this.state.realName,
          placeholder: I18n.t('create_account.full_name'),
          function: this.changeState,
          disabled: false,
          styles: {
            width: 340,
          },
          parametersToEvaluate: {
            isRequired: true,
          },
          forceValidation: this.state.forceValidation,
        },
        ],
      ],
      passwordInformation: [
        [{
          label: I18n.t('commons.password'),
          type: 'password',
          name: 'password',
          value: this.state.password,
          placeholder: I18n.t('commons.password'),
          function: this.changeState,
          disabled: false,
          styles: {
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
          styles: {
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
   * Handle submit form
   * @function handleSubmitForm
   * @param {*} event
   */
  handleSubmitForm = (event) => {
    event.preventDefault()
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
      this.props.auth.fetchSignUp(user)
        .then(() => {
          this.props.toast.setNotification({
            title: 'Teclib',
            body: 'Successfully registered user',
            type: 'success',
          })
          this.props.history.push(`${publicURL}/validateAccount`)
        })
        .catch(() => {
          this.props.toast.setNotification(this.props.handleMessage({
            type: 'alert',
            message: 'Error',
            displayErrorPage: false,
          }))
        })
    } else {
      this.props.toast.setNotification(this.props.handleMessage({
        type: 'alert',
        message: 'Error',
        displayErrorPage: false,
      }))

      this.setState({
        forceValidation: true,
      })
    }
  }

  /**
   * Render component
   * @function render
   */
  render() {
    let renderComponent
    if (this.props.auth.isLoading) {
      renderComponent = (
        <div style={{ height: '140px' }}>
          <Loading message={`${I18n.t('commons.loading')}...`} />
        </div>
      )
    } else {
      const user = this.buildDataArray()
      renderComponent = (
        <React.Fragment>
          <h2 style={{ textAlign: 'center' }}>
            {I18n.t('create_account.title')}
          </h2>

          <form onSubmit={event => this.handleSubmitForm(event)}>
            <ConstructInputs data={user.personalInformation} />
            <ConstructInputs data={user.passwordInformation} />
            <div style={{ textAlign: 'center', margin: 20 }}>
              <PrimaryButton type="submit" className="btn">
                {I18n.t('commons.register')}
              </PrimaryButton>
              <p>
                {I18n.t('create_account.already_have_account')}
                &#160;
                <Link to={`${publicURL}`}>
                  {I18n.t('commons.sign_in')}
                </Link>
              </p>
            </div>
          </form>
        </React.Fragment>
      )
    }

    return renderComponent
  }
}

SignUp.propTypes = {
  toast: PropTypes.shape({
    setNotification: PropTypes.func,
  }).isRequired,
  handleMessage: PropTypes.func.isRequired,
  auth: PropTypes.shape({
    isLoading: PropTypes.bool,
    fetchSignUp: PropTypes.func,
  }).isRequired,
  history: PropTypes.object.isRequired,
}

export default withAuthentication(withAuthenticationLayout(withHandleMessages(SignUp), {
  contentCenter: true,
}))
