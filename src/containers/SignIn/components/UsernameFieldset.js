import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button'
import i18n from '../../../shared/i18n'
import { selfRegistration } from '../../../config/config.json'
import publicURL from '../../../shared/publicURL'


class UsernameFieldset extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      classInput: 'win-textbox',
      errorMessage: '',
    }
  }

  componentDidMount() {
    this.usernameInput.focus()
  }

  LogInServer = (e) => {
    e.preventDefault()
    if (this.props.username) {
      this.props.changePhase(2)
    } else {
      this.setState({
        classInput: 'win-textbox color-line-alert',
        errorMessage: (
          <p className="color-type-alert">
            <span> {i18n.t('login.username_not_registered')} </span>
            <a href="/">{i18n.t('login.create_an_new')}</a>
          </p>
        ),
      })
    }
  }

  render() {
    return (
      <div className="authentication-email__div">
        <h2 className="win-h2">
          {i18n.t('login.title')}
        </h2>
        <p className="paragraph__p --description">
          {i18n.t('login.use_your_account')}
          <br />
          <a href="https://flyve-mdm.com/">
            {i18n.t('login.what_is_this')}
          </a>
        </p>

        {this.state.errorMessage}

        <form onSubmit={this.LogInServer}>
          <input
            type="text"
            name="username"
            ref={(input) => { this.usernameInput = input; }}
            className={this.state.classInput}
            placeholder={i18n.t('commons.username')}
            value={this.props.username}
            onChange={this.props.changeInput}
            required
          />
          <PrimaryButton type="submit" className="btn">
            {i18n.t('commons.next')}
          </PrimaryButton>
        </form>
        {
          !selfRegistration ? '' : (
            <p>
              {i18n.t('login.no_account')}
              &nbsp;
              <Link to={`${publicURL}/`}>
                {i18n.t('login.create_one')}
              </Link>
            </p>
          )
        }

      </div>

    )
  }
}

UsernameFieldset.propTypes = {
  username: PropTypes.string.isRequired,
  changeInput: PropTypes.func.isRequired,
  changePhase: PropTypes.func.isRequired,
}

export default UsernameFieldset
