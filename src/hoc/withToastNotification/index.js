import React, { Component } from 'react'
import WinJS from 'winjs'
import { withRouter } from 'react-router'
import withNotifications from '../withNotifications'
import validateNotifications from '../../shared/validateNotifications'
import nativeNotification from '../../shared/nativeNotification'
import { Icon } from 'office-ui-fabric-react/lib/Icon'

const withToastNotification = WrappedComponent => {
	class ToastNotification extends Component {
		constructor(props) {
			super(props)
			this.state = {
				timer: {},
			}
		}

		componentWillReceiveProps(nextProps) {
			if (nextProps.toast.notification.title !== this.props.toast.notification.title || nextProps.toast.notification.body !== this.props.toast.notification.body) {
				const notification = validateNotifications()
				if (notification.show || nextProps.toast.notification.type === "alert") {
					if (notification.type === "Toast") {
						this.setState({
							type: nextProps.toast.notification.type,
							timer: setTimeout(() => {
								this.hideNotification()
							}, 4000)
						})
					} else {
						nativeNotification(nextProps.toast.notification.title, nextProps.toast.notification.body, nextProps.icon)
					}
				}
			}
		}

		hideNotification = () => {
			WinJS.UI.Animation.exitContent(
				document.getElementsByClassName('toast'), { top: '0px', left: '20px' }
			).then(() => {
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

	return withNotifications(withRouter(ToastNotification))
}

export default withToastNotification