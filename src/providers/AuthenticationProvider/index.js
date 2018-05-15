import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import publicURL from '../../shared/publicURL'

const AuthenticationContext = React.createContext()

export const AuthenticationConsumer = AuthenticationContext.Consumer

export class AuthenticationProvider extends PureComponent {
  state = {
    configurationPassword: {},
    captcha: {},
    sessionToken: localStorage.getItem('sessionToken') ? localStorage.getItem('sessionToken') : undefined,
    currentUser: localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')) : undefined,
    setCurrentUser: (currentUser, sessionToken) => {
      this.setState({ currentUser, sessionToken }, () => {
        localStorage.setItem('currentUser', JSON.stringify(currentUser))
        localStorage.setItem('sessionToken', sessionToken)
        this.props.children.props.history.push(`${publicURL}/app`)
      })
    },
    logout: () => {
      this.setState(
        {
          currentUser: undefined,
          sessionToken: undefined,
        },
        () => {
          localStorage.removeItem('currentUser')
          localStorage.removeItem('sessionToken')
          this.props.children.props.history.push(`${publicURL}/`)
        },
      )
    },
  }

  render() {
    const value = { ...this.state }
    return (
      <AuthenticationContext.Provider value={{ state: value }}>
        {this.props.children}
      </AuthenticationContext.Provider>
    );
  }
}

AuthenticationProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
  ]).isRequired,
}
