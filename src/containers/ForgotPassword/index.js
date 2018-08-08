/** import dependencies */
import React, {
  PureComponent,
} from 'react'
import PropTypes from 'prop-types'
import {
  Link,
} from 'react-router-dom'
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/Button'
import I18n from 'shared/i18n'
import publicURL from 'shared/publicURL'
import Loading from 'components/Loading'
import Input from 'components/Forms/Input'
import withAuthenticationLayout from 'hoc/withAuthenticationLayout'
import withHandleMessages from 'hoc/withHandleMessages'

/**
 * Component with the ForgotPassword section
 * @class ForgotPassword
 * @extends PureComponent
 */
class ForgotPassword extends PureComponent {
  /** @constructor */
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      isRecoverSent: false,
      text: '',
    }
  }

  /**
   * Focus the form input
   * @function componentDidMount
   */
  componentDidMount() {
    if (this.textInput) this.textInput.focus()
  }

  /**
   * Close the active session (if it exists) and make the request to recover password
   * @function handleRecover
   * @async
   * @param {object} event
   */
  handleRecover = (event) => {
    event.preventDefault()
    this.setState({
      isLoading: true,
    }, () => {
      if (this.state.text !== '') {
        setTimeout(() => {
          this.setState({
            isRecoverSent: true,
            isLoading: false,
          }, () => {
            this.props.toast.setNotification(this.props.handleMessage({
              type: 'success',
              message: I18n.t('notifications.request_sent'),
            }))
          })
        }, 3000)
      } else {
        setTimeout(() => {
          this.setState({
            isLoading: false,
          }, () => {
            this.props.toast.setNotification(this.props.handleMessage({
              type: 'warning',
              message: 'Error',
            }))
          })
        }, 3000)
      }
    })
  }

  /**
   * Validate if necessary the form or the button to go home
   * @function renderElement
   * @return {component}
   */
  renderElement = () => {
    let element
    if (!this.state.isRecoverSent) {
      element = (
        <div className="authentication__forgot-password">
          <p>
            {I18n.t('forgot_password.help_reset_password')}
          </p>
          <form onSubmit={this.handleRecover}>
            <Input
              label=""
              type="text"
              name="text"
              value={this.state.text}
              placeholder={I18n.t('commons.teclib_email')}
              required
              function={(name, value) => { this.setState({ text: value }) }}
              inputRef={(input) => { this.textInput = input }}
            />

            <DefaultButton className="btn" onClick={() => this.props.history.push(`${publicURL}/`)}>
              {I18n.t('commons.back')}
            </DefaultButton>
            &nbsp;
            <PrimaryButton type="submit" className="btn">
              {I18n.t('login.reset_password')}
            </PrimaryButton>
          </form>
        </div>
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
   * Render component
   * @function render
   */
  render() {
    if (this.state.isLoading) {
      return (
        <div style={{ height: '140px' }}>
          <Loading message={`${I18n.t('commons.sending')}...`} />
        </div>
      )
    }
    return (
      <React.Fragment>
        <h2>
          {I18n.t('forgot_password.title')}
        </h2>
        { this.renderElement() }
      </React.Fragment>
    )
  }
}

ForgotPassword.propTypes = {
  toast: PropTypes.shape({
    setNotification: PropTypes.func,
  }).isRequired,
  handleMessage: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
}

export default withAuthenticationLayout((withHandleMessages(ForgotPassword)), {
  centerContent: true,
})
