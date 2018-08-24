/*
 *  LICENSE
 *
 *  This file is part of app-shell
 *
 *  app-shell is a subproject of Teclib.
 *
 *  app-shell is free software: you can redistribute it and/or
 *  modify it under the terms of the GNU General Public License
 *  as published by the Free Software Foundation; either version 3
 *  of the License, or (at your option) any later version.
 *
 *  app-shell is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *  ------------------------------------------------------------------------------
 *  @author     Hector Rondon (hrondon@teclib.com)
 *  @copyright  Copyright © 2018 Teclib. All rights reserved.
 *  @license    GPLv3 https://www.gnu.org/licenses/gpl-3.0.html
 *  @link       https://github.com/TECLIB/app-shell
 *  @link       https://teclib.github.io/app-shell
 *  @link       https://teclib-edition.com/en
 *  ------------------------------------------------------------------------------
 */

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Icon } from 'office-ui-fabric-react/lib/Icon'
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
    },
  }

  render() {
    const context = { ...this.state }
    const notification = validateNotifications()
    let toast = null
    if (context.show && notification.type === 'Toast') {
      toast = (
        <div className={`toast --${context.notification.type}`}>
          <Icon iconName="cancel" style={{ float: 'right', cursor: 'pointer', color: '#ffffff' }} onClick={() => { context.hidenNotification() }} />
          <div className="toast-title">
            {context.notification.title}
          </div>
          <div className="toast-body">
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
