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
import I18n from 'shared/i18n'
import logo from 'assets/images/logo.png'

const NotFound = () => (
  <div className="authentication-block " style={{ textAlign: 'center' }}>
    <section className="authentication__section">
      <figure className="authentication__figure">
        <img alt="App Shell" src={logo} />
      </figure>
      <h1>
        {I18n.t('commons.not_found')}
      </h1>
      <h1>
404
      </h1>
    </section>
    <footer className="authenticaton__footer">
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

export default NotFound
