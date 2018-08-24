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
import { Breadcrumb } from 'office-ui-fabric-react/lib/Breadcrumb'
import { DefaultButton } from 'office-ui-fabric-react/lib/Button'
import { Link } from 'react-router-dom'
import I18n from 'shared/i18n'
import publicURL from 'shared/publicURL'

class HeaderBreadcrumb extends PureComponent {
  breadcrumbs() {
    const breadcrumbs = []
    breadcrumbs.push({ text: I18n.t('commons.dashboard'), key: `${publicURL}/app`, href: `${publicURL}/app` })
    const customDivider = () => (
      <span className="header-breadcrumb">
        &nbsp;/&nbsp;
      </span>
    )
    const addresses = this.props.location.pathname.split('/')

    for (let index = (publicURL === '') ? 2 : 3; index < addresses.length; index += 1) {
      let path = `${publicURL}/app`
      for (let i = (publicURL === '') ? 2 : 3; i < index + 1; i += 1) {
        path += `/${addresses[i]}`
      }
      breadcrumbs.push({ text: addresses[index].replace(/\b\w/g, l => l.toUpperCase()), key: path, href: path })
    }

    const componentBreadcrumbs = (
      <Breadcrumb
        className="header-breadcrumb"
        items={breadcrumbs}
        onRenderItem={this.renderItem}
        dividerAs={customDivider}
        onReduceData={() => { }}
      />)

    return componentBreadcrumbs
  }

  renderItem = eventObject => (
    <Link to={eventObject.href}>
      {eventObject.text}
    </Link>
  )

  render() {
    return (
      <header className="header-block">
        <DefaultButton
          className="header-icon"
          primary
          onClick={this.props.handleToggleExpand}
        >
          <Icon iconName="GlobalNavButton" onClick={this.props.handleToggleExpand} />
        </DefaultButton>
        <nav className="header-breadcrumb">
          {this.breadcrumbs()}
        </nav>
      </header>
    )
  }
}

HeaderBreadcrumb.propTypes = {
  handleToggleExpand: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
}

export default HeaderBreadcrumb
