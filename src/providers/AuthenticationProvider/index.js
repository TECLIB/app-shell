import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import publicURL from 'shared/publicURL'

const AuthenticationContext = React.createContext()

export const AuthenticationConsumer = AuthenticationContext.Consumer

export class AuthenticationProvider extends PureComponent {
  state = {
    isLoading: false,
    sessionToken: localStorage.getItem('sessionToken') ? localStorage.getItem('sessionToken') : undefined,
    currentUser: localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')) : undefined,
    setCurrentUser: (currentUser, sessionToken) => {
      this.setState({ currentUser, sessionToken }, () => {
        localStorage.setItem('currentUser', JSON.stringify(currentUser))
        localStorage.setItem('sessionToken', sessionToken)
        this.props.children.props.history.push(`${publicURL}/app`)
      })
    },
    fetchSignUp: data => new Promise((resolve, reject) => {
      this.setState(
        {
          isLoading: true,
        },
        () => {
          if (data) {
            setTimeout(() => {
              this.setState({
                isLoading: false,
              }, () => {
                resolve()
              })
            }, 3000)
          }
          setTimeout(() => {
            this.setState({
              isLoading: false,
            }, () => {
              reject()
            })
          }, 3000)
        },
      )
    }),
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
    fetchSignIn: (username, password) => new Promise((resolve, reject) => {
      this.setState(
        {
          isLoading: true,
        },
        () => {
          if (username !== '' && password !== '') {
            setTimeout(() => {
              this.setState({
                isLoading: false,
              }, () => {
                const user = {
                  id: 1,
                  name: 'User App',
                  email: 'user@teclib.com',
                  picture: null,
                }
                this.state.setCurrentUser(user, 'token')
                resolve()
              })
            }, 3000)
          }
          setTimeout(() => {
            this.setState({
              isLoading: false,
            }, () => {
              reject()
            })
          }, 3000)
        },
      )
    }),
    fetchResetPassword: ({ email, token, newPassword }) => new Promise((resolve, reject) => {
      this.setState(
        {
          isLoading: true,
        },
        () => {
          if (email !== '' && token !== '' && newPassword !== '') {
            setTimeout(() => {
              this.setState({
                isLoading: false,
              }, () => {
                resolve()
              })
            }, 3000)
          }
          setTimeout(() => {
            this.setState({
              isLoading: false,
            }, () => {
              reject()
            })
          }, 3000)
        },
      )
    }),
  }

  render() {
    const value = { ...this.state }
    return (
      <AuthenticationContext.Provider value={{ auth: value }}>
        {this.props.children}
      </AuthenticationContext.Provider>
    )
  }
}

AuthenticationProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
  ]).isRequired,
}
