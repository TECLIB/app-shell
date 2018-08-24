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

/** @module nativeNotification */
import logo from 'assets/images/logo.png'
/**
 * Get one new native notification
 * @param {string} title message for notification
 * @param {string} body message content for notification
 * @param {string} icon for notification
 * @returns {object} of native notification type
 */
export default function (title, body, icon = logo) {
  let newNotification = null
  if (Notification && Notification.permission !== 'denied') {
    Notification.requestPermission(() => {
      newNotification = new Notification(title, {
        body,
        icon,
      })
    })
  }
  return newNotification
}
