import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import WinJS from 'winjs'
import { Icon } from 'office-ui-fabric-react/lib/Icon'
import withNotifications from '../withNotifications'
import validateNotifications from '../../shared/validateNotifications'
import nativeNotification from '../../shared/nativeNotification'

const withToastNotification = (WrappedComponent) => {
  class ToastNotification extends PureComponent {
    constructor(props) {
      super(props)
      this.state = {
        timer: {},
        title: this.props.toast.notification.title,
        body: this.props.toast.notification.body,
        type: this.props.toast.notification.type,
      }
    }

    componentDidUpdate(prevProps) {
      if (prevProps.toast.notification.title !== this.props.toast.notification.title || prevProps.toast.notification.body !== this.props.toast.notification.body) {
        this.setDalay()
      }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
      if (nextProps.toast.notification.title !== prevState.title || nextProps.toast.notification.body !== prevState.body) {
        const notification = validateNotifications()
        if (notification.show || nextProps.toast.notification.type === 'alert') {
          if (notification.type === 'Toast') {
            return {
              type: nextProps.toast.notification.type,
              title: nextProps.toast.notification.title,
              body: nextProps.toast.notification.body,
            }
          }
          nativeNotification(nextProps.toast.notification.title, nextProps.toast.notification.body, nextProps.toast.notification.icon)
          return {
            type: nextProps.toast.notification.type,
            title: nextProps.toast.notification.title,
            body: nextProps.toast.notification.body,
          }
        }
      } else {
        return null
      }
      return null
    }

    setDalay = () => {
      this.setState({
        timer: setTimeout(() => {
          this.hideNotification()
        }, 4000),
      })
    }

    hideNotification = () => {
      WinJS.UI.Animation.exitContent(document.getElementsByClassName('toast'), { top: '0px', left: '20px' }).then(() => {
        clearTimeout(this.state.timer)
        this.props.toast.hidenNotification()
      })
    }

    render() {
      let toast = null

      if (this.props.toast.show) {
        toast = (
          <div className={`toast --${this.state.type}`}>
            <Icon iconName="cancel" style={{ float: 'right', cursor: 'pointer', color: '#ffffff' }} />
            <div className="toast-title">
              {this.state.title}
            </div>
            <div className="toast-body">
              {this.state.body}
            </div>
          </div>
        )
      }
      return (
        <React.Fragment>
          {toast}
          <WrappedComponent {...this.props} />
        </React.Fragment>
      )
    }
  }

  ToastNotification.defaultProps = {
    toast: {},
  }

  ToastNotification.propTypes = {
    toast: PropTypes.object,
  }

  return withNotifications(withRouter(ToastNotification))
}

export default withToastNotification
