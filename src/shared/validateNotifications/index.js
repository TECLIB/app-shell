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

/** @module validateNotification */

/**
 * Validate notification type
 * @returns {object} if the notification should be shown and type
 */
export default () => {
  let show = localStorage.getItem('showNotifications') ? (localStorage.getItem('showNotifications') === 'true')
    : undefined
  let type = localStorage.getItem('notificationType')

  if (!show && show !== false) {
    localStorage.setItem('showNotifications', 'true')
    show = true
  }

  if (!type) {
    localStorage.setItem('notificationType', 'Toast')
    type = 'Toast'
  }

  return {
    show,
    type,
  }
}
