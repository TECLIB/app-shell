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
import withHandleMessages from 'hoc/withHandleMessages'
import Loading from 'components/Loading'
import EmptyMessage from 'components/EmptyMessage'
import ContentPane from 'components/ContentPane'
import delay from 'shared/delay'

class Dashboard extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
    }
  }

  componentDidMount() {
    delay(2000)
      .then(() => {
        this.setState({
          isLoading: false,
        })
      })
  }

  render() {
    const renderComponent = this.state.isLoading ? (
      <div style={{ width: '100%', height: 'calc(100vh - 80px)' }}>
        <Loading logo />
      </div>
    )
      : (
        <ContentPane>
          <div className="dashboard-block">
            <EmptyMessage message="Teclib Dashboard" showIcon />
          </div>
        </ContentPane>
      )

    return renderComponent
  }
}

export default withHandleMessages(Dashboard)
