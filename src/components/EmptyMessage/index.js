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
import PropTypes from 'prop-types'
import I18n from 'shared/i18n'
import { Image, Icon } from 'office-ui-fabric-react/lib'
import logo from 'assets/images/logo.png'

const EmptyMessage = props => (
  <div className="center-block-content">
    {
      props.icon && props.showIcon
        ? <Icon iconName={props.icon} className="icon-empty-message" />
        : props.showIcon
          ? (
            <Image
              src={logo}
              alt="Logo Teclib"
              width={160}
            />
          )
          : null
    }
    <h2>
      {props.message}
    </h2>
  </div>
)

EmptyMessage.propTypes = {
  icon: PropTypes.string,
  showIcon: PropTypes.bool,
  message: PropTypes.string,
}

EmptyMessage.defaultProps = {
  icon: '',
  showIcon: false,
  message: I18n.t('commons.no_selection'),
}

export default EmptyMessage
