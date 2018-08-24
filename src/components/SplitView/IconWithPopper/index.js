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
import { NavLink } from 'react-router-dom'
import { Icon } from 'office-ui-fabric-react/lib/Icon'


class IconWithPopper extends PureComponent {
  render() {
    if (this.props.to) {
      return (
        <div>
          <NavLink to={this.props.to} activeClassName="selected">
            <span title={this.props.title}>
              <Icon iconName={this.props.iconName} />
            </span>
          </NavLink>
        </div>
      )
    }
    return (
      <div role="button" tabIndex="0" onClick={this.props.click}>
        <a>
          <span title={this.props.title}>
            <Icon iconName={this.props.iconName} />
          </span>
        </a>
      </div>
    )
  }
}

IconWithPopper.defaultProps = {
  to: null,
  click: () => {},
  title: '',
}

IconWithPopper.propTypes = {
  to: PropTypes.string,
  iconName: PropTypes.string.isRequired,
  click: PropTypes.func,
  title: PropTypes.string,
}

export default IconWithPopper
