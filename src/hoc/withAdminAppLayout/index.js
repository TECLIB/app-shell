import React, { Component } from 'react'
import SplitView from "../../components/SplitView"
import HeaderBreadcrumb from '../../components/HeaderBreadcrumb'
import getMode from '../../shared/getMode'
import animations from '../../shared/animations'
import { I18n } from "react-i18nify"
import Confirmation from '../../components/Confirmation'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { logout } from '../../store/authentication/actions'
import publicURL from '../../shared/publicURL'

// TODO: Passing Routes to props for generate NavLink in SplitView component

const TIMEOUT_CONTRACT = 250

function mapDispatchToProps(dispatch) {
  const actions = {
    logout: bindActionCreators(logout, dispatch)
  }
  return { actions }
}

const withAdminAppLayout = WrappedComponent => {
  class AdminAppLayout extends Component {
    constructor (props) {
      super(props)
      this.state = {
        expanded: false,
        contract: false,
        mode: getMode(),
        iframe: ''
      }
    }

    logout = async () => {
      const isOK = await Confirmation.isOK(this.contentDialog)
      if (isOK) {
        localStorage.removeItem('currentUser')
        localStorage.removeItem('sessionToken')
        this.props.history.push(`${publicURL}/`)
      }
    }

    handleResize = () => {
      let prevMode = this.state.mode
      let nextMode = getMode()

      if (prevMode !== nextMode) {
          this.setState({mode: nextMode})
      }
    }

    componentWillMount () {
      window.addEventListener('resize', this.handleResize)
      animations()
    }

    componentWillUnmount () {
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
  
  return connect(
      null,
      mapDispatchToProps
    )(AdminAppLayout)
}

export default  withAdminAppLayout
