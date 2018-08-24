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

import React from 'react'
import history from 'shared/history'
import getQueryString from 'shared/getQueryString'
import I18n from 'shared/i18n'
import logo from 'assets/images/logo.png'

/**
 * Component with the display of the error pages
 * @function ErrorPage
 * @return {component}
 */
export default () => {
  /** Get the error type of the query string 'code' (by default '404'). */
  let errorCode = getQueryString(history).code
  if (errorCode !== '400' && errorCode !== '401' && errorCode !== '403' && errorCode !== '404' && errorCode !== '500') {
    errorCode = '404'
  }
  const title = I18n.t(`error.${errorCode}.title`)
  const message = I18n.t(`error.${errorCode}.message`)
  const path = history.location.pathname.split('/')

  if (errorCode !== 404 && errorCode < 500 && path[1] === 'app') {
    return (
      <div
        className="empty-message"
        style={{ width: '100%' }}
      >
        <div style={{ width: '320px', margin: '0 auto' }}>
          <figure>
            <img
              alt="Flyve MDM Dashboard"
              src={logo}
              style={{
                width: '80px',
              }}
            />
          </figure>
          <h1>
            {title}
          </h1>
          <p>
            {message}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="authentication error" style={{ textAlign: 'center' }}>
      <section>
        <figure>
          <img
            alt="Teclib Dashboard"
            src={logo}
          />
        </figure>
        <h1>
          {I18n.t('commons.error')}
          {' '}
          {errorCode}
        </h1>
        <h3>
          {title}
        </h3>
        <p>
          {message}
        </p>
      </section>
      <footer>
        <a href="https://flyve-mdm.com/privacy-policy/">
          {I18n.t('commons.terms_and_conditions')}
        </a>
        <br />

        <span>
          © 2017 - 2018 Teclib&apos;.
        </span>
        <br />
      </footer>
    </div>
  )
}
