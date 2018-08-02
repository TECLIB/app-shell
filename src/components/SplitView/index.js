import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import I18n from 'shared/i18n'
import publicURL from 'shared/publicURL'
import logo from 'assets/images/logo.png'
import { ScrollSync, ScrollSyncPane } from '../ScrollSync'
import IconWithPopper from './IconWithPopper'
import ImgWithPopper from './imgWithPopper'
import SpanWithPopper from './spanWithAnchor'

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
                          to={`${publicURL}/app/users`}
                          iconName="Contact"
                          title={I18n.t('commons.user')}
                          disabled={this.props.expanded}
                        />
                      </section>
                      <section className="splitview-wrapped-navbar-wrapped-bottom__section">
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
                        <SpanWithPopper description={I18n.t('commons.user')} to={`${publicURL}/app/users`} />
                      </section>
                      <section className="splitview-wrapped-navbar-wrapped-bottom__section --description">
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
