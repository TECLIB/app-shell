/** import dependencies */
import React, {
  PureComponent,
} from 'react'
import { Toggle } from 'office-ui-fabric-react/lib/Toggle'
import { Dropdown } from 'office-ui-fabric-react/lib/Dropdown'
import I18n from 'shared/i18n'
import ContentPane from 'components/ContentPane'

/**
 * Component with the notifications section
 * @class Notifications
 * @extends PureComponent
 */
class Notifications extends PureComponent {
  /** @constructor */
  constructor(props) {
    super(props)

    const notificationType = (localStorage.getItem('notificationType') && Notification.permission === 'granted')
      ? localStorage.getItem('notificationType')
      : 'Toast'

    const showNotifications = localStorage.getItem('showNotifications')
      ? (localStorage.getItem('showNotifications') === 'true')
      : true

    this.state = {
      notificationType,
      showNotifications,
    }
  }

  /**
   * Change notification type
   * @function changeNotificationType
   * @param {object} e
   */
  changeNotificationType = (value) => {
    const newNotificationType = value
    if (Notification) {
      Notification.requestPermission((permission) => {
        if (permission === 'granted') {
          localStorage.setItem('notificationType', newNotificationType)
          this.setState({
            notificationType: newNotificationType,
          })
        }
      })
    }
  }

  /**
   * Change show notifications
   * @function changeShowNotifications
   */
  changeShowNotifications = () => {
    localStorage.setItem('showNotifications', !this.state.showNotifications)
    this.setState(prevState => ({
      showNotifications: !prevState.showNotifications,
    }))
  }

  notificationsOptions = () => (
    [
      {
        key: I18n.t('settings.notifications.toast'),
        text: I18n.t('settings.notifications.toast'),
      },
      {
        key: I18n.t('settings.notifications.native'),
        text: I18n.t('settings.notifications.native'),
      },
    ]
  )

  /**
   * Render component
   * @function render
   */
  render() {
    return (
      <ContentPane>
        <h2 style={{ margin: '10px' }}>
          {I18n.t('settings.notifications.title')}
        </h2>
        <div className="list-element">
          <div className="list-element__message">
            {I18n.t('settings.notifications.show')}
            <div className="list-element__detail">
              {I18n.t('settings.notifications.show_deatil')}
            </div>
          </div>
          <div className="list-element__controller">
            <Toggle
              defaultChecked={this.state.showNotifications}
              onChanged={() => this.changeShowNotifications()}
            />
          </div>
        </div>

        <div className="list-element">
          <div className="list-element__message">
            {I18n.t('settings.notifications.type')}
            <div className="list-element__detail">
              {I18n.t('settings.notifications.type_detail')}
            </div>
          </div>
          <div className="list-element__controller" style={{ paddingTop: 10 }}>
            <Dropdown
              onChanged={item => this.changeNotificationType(item.key)}
              selectedKey={this.state.notificationType || undefined}
              options={this.notificationsOptions()}
              styles={{ root: [{ width: '100px' }] }}
              calloutProps={{ directionalHintFixed: false }}
            />
          </div>
        </div>
      </ContentPane>
    )
  }
}

export default Notifications
