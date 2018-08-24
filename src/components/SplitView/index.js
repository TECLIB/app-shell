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
import I18n from 'shared/i18n'
import publicURL from 'shared/publicURL'
import logo from 'assets/images/logo.png'
import { ScrollSync, ScrollSyncPane } from 'components/ScrollSync'
import ImgWithPopper from './ImgWithPopper'
import IconWithPopper from './IconWithPopper'
import SpanWithPopper from './SpanWithPopper'

class SplitView extends PureComponent {
  logout = () => {
    this.props.logout()
  }

  render() {
    this.props.handleSetTimeOut()

    let toRender = ''

    if (this.props.mode !== 'small' || this.props.expanded) {
      toRender = (
        <React.Fragment>
          <ScrollSync>
            <div className="splitview-block">
              <div className="splitview-wrapper__div">
                <nav className="splitview-wrapped__navbar">

                  <ScrollSyncPane>
                    <div className="splitview-wrapper-wrapper__div">
                      <section className="splitview-wrapped-navbar-wrapped-top__section">
                        <ImgWithPopper
                          to={`${publicURL}/app`}
                          alt="Teclib Dashboard"
                          img={logo}
                          title={I18n.t('commons.dashboard')}
                          disabled={this.props.expanded}
                        />
                        <IconWithPopper
                          to={`${publicURL}/app/contacts`}
                          iconName="Contact"
                          title={I18n.t('commons.contacts')}
                          disabled={this.props.expanded}
                        />
                      </section>
                      <section className="splitview-wrapped-navbar-wrapped-bottom__section">
                        <IconWithPopper
                          to={`${publicURL}/app/settings`}
                          iconName="Settings"
                          title={I18n.t('commons.settings')}
                        />
                        <IconWithPopper
                          to={`${publicURL}/app/about`}
                          iconName="ContactInfo"
                          title={I18n.t('commons.about_flyve_mdm')}
                        />
                        <IconWithPopper
                          click={this.logout}
                          iconName="SignOut"
                          title={I18n.t('commons.logout')}
                          disabled={this.props.expanded}
                        />
                      </section>
                    </div>
                  </ScrollSyncPane>
                </nav>
                { this.props.expanded && (
                <nav className="splitview-wrapped__navbar" onClick={this.props.mode === 'small' ? this.props.handleContract : null}>
                  <ScrollSyncPane>
                    <div className={`splitview-wrapper-wrapper__div --large --end --opening ${
                      this.props.contract && '--closing'
                    }`}
                    >
                      <section className="splitview-wrapped-navbar-wrapped-top__section --description">
                        <SpanWithPopper description={I18n.t('commons.dashboard')} to={`${publicURL}/app`} />
                        <SpanWithPopper description={I18n.t('commons.contacts')} to={`${publicURL}/app/contacts`} />
                      </section>
                      <section className="splitview-wrapped-navbar-wrapped-bottom__section --description">
                        <SpanWithPopper description={I18n.t('commons.settings')} to={`${publicURL}/app/settings`} />
                        <SpanWithPopper description={I18n.t('commons.about')} to={`${publicURL}/app/about`} />
                        <SpanWithPopper description={I18n.t('commons.logout')} click={this.logout} />
                      </section>
                    </div>
                  </ScrollSyncPane>
                </nav>
                )}
              </div>
            </div>
          </ScrollSync>
        </React.Fragment>
      )
    }

    return toRender
  }
}

SplitView.propTypes = {
  expanded: PropTypes.bool.isRequired,
  contract: PropTypes.bool.isRequired,
  handleContract: PropTypes.func.isRequired,
  handleSetTimeOut: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  mode: PropTypes.string.isRequired,
}

export default SplitView
