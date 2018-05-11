import React, { PureComponent } from 'react'
import SplitView from "../../components/SplitView"
import HeaderBreadcrumb from '../../components/HeaderBreadcrumb'
import getMode from '../../shared/getMode'
import animations from '../../shared/animations'
import { I18n } from "react-i18nify"
import Confirmation from '../../components/Confirmation'
import withAuthentication from '../../hoc/withAuthentication'

// TODO: Passing Routes to props for generate NavLink in SplitView component

const TIMEOUT_CONTRACT = 250

const withAdminAppLayout = WrappedComponent => {
  class AdminAppLayout extends PureComponent {
    constructor(props) {
      super(props)
      this.state = {
        expanded: false,
        contract: false,
        mode: getMode(),
        iframe: ''
      }

      window.addEventListener('resize', this.handleResize)
      animations()
    }

    logout = async () => {
      const isOK = await Confirmation.isOK(this.contentDialog)
      if (isOK) {
        this.props.authentication.logout()
      }
    }

    handleResize = () => {
      let prevMode = this.state.mode
      let nextMode = getMode()

      if (prevMode !== nextMode) {
        this.setState({ mode: nextMode }, () => {
          if (this.state.mode === 'small') {
            this.handleContract()
          }
        })
      }
    }

    componentWillUnmount() {
      window.removeEventListener('resize', this.handleResize)
    }

    handleToggleExpand = () => {
      this.state.expanded === false ? this.handleExpand() : this.handleContract()
    }

    handleExpand = () => {
      this.setState({
        expanded: true,
        contract: false
      })
    }

    handleContract = () => {
      this.setState({
        contract: true
      })
    }

    handleSetTimeOut = () => {
      this.state.contract && setTimeout(() => {
        this.setState({
          contract: false,
          expanded: false
        })
      }, TIMEOUT_CONTRACT)
    }

    render() {
      return (
        <main>

          <HeaderBreadcrumb
            handleToggleExpand={this.handleToggleExpand}
            history={this.props.history}
          />

          {this.state.iframe}

          <div className="flex-block">
            <SplitView
              expanded={this.state.expanded}
              contract={this.state.contract}
              handleExpand={this.handleExpand}
              handleContract={this.handleContract}
              handleSetTimeOut={this.handleSetTimeOut}
              handleToggleExpand={this.handleToggleExpand}
              mode={this.state.mode}
              history={this.props.history}
              logout={this.logout}
            />
            <WrappedComponent {...this.props} mode={this.state.mode} />
            <Confirmation
              title={I18n.t('logout.close_session')}
              message={I18n.t('settings.security.close_session_message')}
              reference={el => this.contentDialog = el}
            />
          </div>

        </main>
      )
    }
  }

  return withAuthentication(AdminAppLayout)
}

export default withAdminAppLayout
