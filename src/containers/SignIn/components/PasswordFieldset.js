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

  styleTextField = () => (
    {
      fieldGroup: [
        {
          selectors: {
            ':after': {
              content: "''",
            },
          },
        },
      ],
    }
  )

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
          <h2>
            {I18n.t('login.enter_password')}
          </h2>
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
              componentRef={(input) => { this.passwordInput = input }}
              placeholder={I18n.t('commons.password')}
              value={this.props.password}
              onChanged={() => this.props.changeInput({ name: 'password', value: this.passwordInput.value.trim() })}
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
            <Link to={`${publicURL}/forgotPassword`}>
              {I18n.t('login.forgot_my_password')}
            </Link>
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
