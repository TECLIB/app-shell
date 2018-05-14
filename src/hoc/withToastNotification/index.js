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
    static getDerivedStateFromProps(nextProps, prevState) {
      if (nextProps.title !== prevState.title || nextProps.body !== prevState.body) {
        const notification = validateNotifications()
        if (notification.show || nextProps.type === 'alert') {
          if (notification.type === 'Toast') {
            return {
              type: nextProps.type,
              title: nextProps.title,
              body: nextProps.body,
            }
          }
          nativeNotification(nextProps.title, nextProps.body, nextProps.icon)
          return {
            ...prevState,
          }
        }
      } else {
        return {
          ...prevState,
        }
      }
      return {
        ...prevState,
      }
    }

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
        this.setState({
          timer: setTimeout(() => {
            this.hideNotification()
          }, 4000),
        })
      }
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
          <div className={`toast --${this.props.toast.notification.type}`}>
            <Icon iconName="cancel" style={{ float: 'right', cursor: 'pointer', color: '#ffffff' }} />
            <div className="toast-title">
              {this.props.toast.notification.title}
            </div>
            <div className="toast-body">
              {this.props.toast.notification.body}
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

  ToastNotification.propTypes = {
    toast: PropTypes.object,
  }

  return withNotifications(withRouter(ToastNotification))
}

export default withToastNotification
