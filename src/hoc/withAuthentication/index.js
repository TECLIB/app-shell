import React from 'react'
import { AuthenticationConsumer } from '../../providers/AuthenticationProvider'

const withAuthentication = (WrappedComponent) => {
  const authentication = props => (
    <AuthenticationConsumer>
      {value => <WrappedComponent {...props} authentication={value.state} />}
    </AuthenticationConsumer>
  )

  return authentication
}

export default withAuthentication
