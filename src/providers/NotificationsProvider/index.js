import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import WinJS from 'winjs'
import validateNotifications from 'shared/validateNotifications'
import nativeNotification from 'shared/nativeNotification'

const NotificationsContext = React.createContext()

export const NotificationsConsumer = NotificationsContext.Consumer

export class NotificationsProvider extends PureComponent {
  state = {
    notification: {
      title: '',
      body: '',
      type: 'info',
    },
    show: false,
    setNotification: (notification = {}) => {
      let getNotification = notification
      if (typeof getNotification !== 'object') {
        getNotification = {}
      }
      this.setState(
        {
          show: true,
          notification: getNotification,
        },
        () => {
          const { type } = validateNotifications()
          if (type === 'Native') {
            nativeNotification(
              getNotification.title,
              getNotification.body,
            )
          }
          setTimeout(() => {
            this.state.hidenNotification()
          }, 4000)
        },
      )
    },
    hidenNotification: () => {
      WinJS.UI.Animation.exitContent(
        document.getElementsByClassName('toast'), {
          top: '0px',
          left: '20px',
        },
      ).then(() => {
        this.setState(
          {
            show: false,
            notification: {
              title: '',
              body: '',
              type: 'info',
            },
          },
          () => { },
        )
      })
    },
  }

  render() {
    const context = { ...this.state }
    const notification = validateNotifications()
    let toast = null
    if (context.show && notification.type === 'Toast') {
      toast = (
        <div className={`toast toast--${context.notification.type}`}>
          <span
            className="iconFont cancelIcon"
            style={{ float: 'right', cursor: 'pointer', color: '#ffffff' }}
            onClick={() => {
              context.hidenNotification()
            }}
            role="button"
            tabIndex="0"
          />
          <div className="toast__title">
            {context.notification.title}
          </div>
          <div className="toast__body">
            {context.notification.body}
          </div>
        </div>)
    }

    return (
      <React.Fragment>
        {toast}
        <NotificationsContext.Provider value={{ toast: context }}>
          {this.props.children}
        </NotificationsContext.Provider>
      </React.Fragment>
    )
  }
}

NotificationsProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
  ]).isRequired,
}
