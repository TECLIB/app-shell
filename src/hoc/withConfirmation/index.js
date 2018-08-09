import React from 'react'
import { ConfirmationConsumer } from 'providers/ConfirmationProvider'

const withConfirmation = (WrappedComponent) => {
  const confirmation = props => (
    <ConfirmationConsumer>
      {value => <WrappedComponent {...props} confirmation={value} />}
    </ConfirmationConsumer>
  )

  return confirmation
}

export default withConfirmation
