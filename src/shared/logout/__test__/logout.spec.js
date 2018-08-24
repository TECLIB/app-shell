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

import history from 'shared/history'
import logout from '../index'

describe('logout', () => {
  beforeEach(() => {
    localStorage.setItem('currentUser', 'my user data')
    localStorage.setItem('sessionToken', '12345678')
    sinon.stub(history, 'push').returns({})
  })

  afterEach(() => {
    localStorage.removeItem('currentUser')
    localStorage.removeItem('sessionToken')
    history.push.restore()
  })

  it('should close the session', async () => {
    logout()
    expect(localStorage.getItem('currentUser')).toBeUndefined()
    expect(localStorage.getItem('sessionToken')).toBeUndefined()
    expect(history.push.called).toEqual(true)
  })
})
