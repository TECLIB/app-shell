import React, { PureComponent } from 'react'

const NotificationsContext = React.createContext()

export const NotificationsConsumer = NotificationsContext.Consumer

export class NotificationsProvider extends PureComponent {
  state = {
    notification: {
      title: '',
      body: '',
      type: 'info'
    },
    show: false,
    setNotification: (notification) => {
      this.setState(
        {
          show: true,
          notification,
        },
        () => {}
      )
    },
    hidenNotification: () => {
      this.setState(
        {
          show: false,
        },
        () => {}
      )
    },
  }

  render() {
    return (
      <NotificationsContext.Provider value={{ state: this.state }}>
        {this.props.children}
      </NotificationsContext.Provider>
    );
  }
}
