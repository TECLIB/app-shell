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

import I18n from '..'

describe('Check if translations are available', () => {
  it('login page should have english translations', () => {
    expect(I18n.t('login.title')).toBe('Sign in')
    expect(I18n.t('login.username_not_registered')).toBe('The username entered is not registered. Try a different account or')
    expect(I18n.t('login.use_your_account')).toBe('Use your Teclib account')
    expect(I18n.t('login.what_is_this')).toBe('What\'s this?')
    expect(I18n.t('login.no_account')).toBe('No account?')
    expect(I18n.t('login.create_one')).toBe('Create one!')
    expect(I18n.t('login.enter_password')).toBe('Enter password')
    expect(I18n.t('login.enter_password_for')).toBe('Enter the password for')
    expect(I18n.t('login.forgot_my_password')).toBe('Forgot my password')
  })
})
