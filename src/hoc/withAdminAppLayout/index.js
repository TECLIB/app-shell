import React, {
  PureComponent,
} from 'react'
import PropTypes from 'prop-types'
import getMode from 'shared/getMode'
import I18n from 'shared/i18n'
import SplitView from 'components/SplitView'
import HeaderBreadcrumb from 'components/HeaderBreadcrumb'
import withAuthentication from 'hoc/withAuthentication'
import withHandleMessages from 'hoc/withHandleMessages'

/** timeout to contract the lateral menu */
const TIMEOUT_CONTRACT = 150

/**
 * Wrapper component with the basic structure of the admin dashboard layout
 * @param {component} WrappedComponent Component to wrap
 * @return {component} The component with the admin dashboard layout
 */
const withAdminAppLayout = (WrappedComponent) => {
  class AdminAppLayout extends PureComponent {
    /**
     * Create AdminDashboardLayout
     * @param {object} props
     */
    constructor(props) {
      super(props)
      this.state = {
        expanded: false,
        contract: false,
        mode: getMode(),
        iframe: undefined,
      }

      window.addEventListener('resize', this.handleResize)
    }

    /** Remove 'resize' event listener */
    componentWillUnmount() {
      window.removeEventListener('resize', this.handleResize)
    }

    /** Open dialog to handle logout */
    dialogDelete = () => {
      this.props.confirmation.showDialog({ title: I18n.t('logout.close_session'), message: I18n.t('settings.security.close_session_message'), isOk: this.logout })
    }

    /** Close current session */
    logout = () => {
      this.props.auth.logout(this.props.history)
    }

    /** Change 'mode' according to the resolution of the screen */
    handleResize = () => {
      const prevMode = this.state.mode
      const nextMode = getMode()

      if (prevMode !== nextMode) {
        this.setState({
          mode: nextMode,
        })
      }
    }

    /** Expand and collapse the side menu */
    handleToggleExpand = () => {
      this.state.expanded === false ? this.handleExpand() : this.handleContract()
    }

    /** Expand side menu */
    handleExpand = () => {
      this.setState({
        expanded: true,
        contract: false,
      })
    }

    /** Collapse the side menu */
    handleContract = () => {
      this.setState({
        contract: true,
      }, () => {
        this.handleSetTimeOut()
      })
    }

    /** Collapse the side menu after of the timeout */
    handleSetTimeOut = () => {
      if (this.state.contract) {
        setTimeout(() => {
          this.setState({
            expanded: false,
            contract: false,
          })
        }, TIMEOUT_CONTRACT)
      }
    }

    /**
     * Render component
     * @function render
     */
    render() {
      return (
        <main>
          <HeaderBreadcrumb
            handleToggleExpand={this.handleToggleExpand}
            location={this.props.history.location}
            languageCurrent={this.props.languageCurrent}
          />

          {(this.state.iframe || '')}

          <div className="flex-block">
            <SplitView
              expanded={this.state.expanded}
              contract={this.state.contract}
              handleExpand={this.handleExpand}
              handleContract={this.handleContract}
              handleSetTimeOut={this.handleSetTimeOut}
              handleToggleExpand={this.handleToggleExpand}
              mode={this.state.mode}
              logout={this.dialogDelete}
            />
            <WrappedComponent {...this.props} mode={this.state.mode} />
          </div>
        </main>
      )
    }
  }

  AdminAppLayout.propTypes = {
    toast: PropTypes.shape({
      setNotification: PropTypes.func,
    }).isRequired,
    confirmation: PropTypes.object.isRequired,
    handleMessage: PropTypes.func.isRequired,
    auth: PropTypes.shape({
      logout: PropTypes.func,
    }).isRequired,
    history: PropTypes.object.isRequired,
    languageCurrent: PropTypes.string.isRequired,
  }

  return withAuthentication(withHandleMessages(AdminAppLayout))
}


export default withAdminAppLayout
