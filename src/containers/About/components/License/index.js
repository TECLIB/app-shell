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

import React, {
  PureComponent,
} from 'react'
import ReactMarkdown from 'react-markdown'
import PropTypes from 'prop-types'
import I18n from 'shared/i18n'
import ContentPane from 'components/ContentPane'
import Loading from 'components/Loading'
import EmptyMessage from 'components/EmptyMessage'
import withHandleMessages from 'hoc/withHandleMessages'

/**
 * Component to show the license information
 * @class License
 * @extends PureComponent
 */
class License extends PureComponent {
  /** @constructor */
  constructor(props) {
    super(props)
    this.state = {
      license: undefined,
    }
  }

  /**
   * Get license information
   * @function componentDidMount
   * @async
   */
  componentDidMount = async () => {
    try {
      const response = await fetch('https://raw.githubusercontent.com/TECLIB/app-shell/develop/LICENSE.md')
      this.setState({
        license: await response.text(),
      })
    } catch (error) {
      this.props.toast.setNotification(this.props.handleMessage({
        type: 'alert',
        message: error,
      }))
      this.setState({
        license: 'no data',
      })
    }
  }

  /**
   * Render component
   * @function render
   */
  render() {
    let renderComponent
    if (this.state.license) {
      if (this.state.license === 'no data') {
        renderComponent = (
          <EmptyMessage message={I18n.t('commons.no_data')} />
        )
      } else {
        renderComponent = (
          <ContentPane>
            <h2 style={{ margin: '10px' }}>
              {I18n.t('about.license.title')}
            </h2>
            <div className="about-pane" style={{ margin: '10px' }}>
              <ReactMarkdown source={this.state.license} />
            </div>
          </ContentPane>
        )
      }
    } else {
      renderComponent = (
        <Loading message={`${I18n.t('commons.loading')}...`} />
      )
    }

    return renderComponent
  }
}

/** License propsTypes */
License.propTypes = {
  toast: PropTypes.object.isRequired,
  handleMessage: PropTypes.func.isRequired,
}

export default withHandleMessages(License)
