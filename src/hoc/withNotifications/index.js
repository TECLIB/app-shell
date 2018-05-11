import React from 'react'
import { NotificationsConsumer } from '../../providers/NotificationsProvider'

const withNotifications = (WrappedComponent) => {
  const notification = props => (
    <NotificationsConsumer>
      {value => <WrappedComponent {...props} toast={value.state} />}
    </NotificationsConsumer>
  )

  return notification
}

export default withNotifications
