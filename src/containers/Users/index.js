import React, { PureComponent } from 'react'
import routes from './routes'
import withHandleMessages from '../../hoc/withHandleMessages'
import withToasNotification from '../../hoc/withHandleMessages'
import GenerateRoutes from '../../components/GenerateRoutes'
import UsersList from './components/UsersList'
import getMode from '../../shared/getMode'
import calc100PercentMinus from '../../shared/calc100PercentMinus'
import publicURL from '../../shared/publicURL'

class Users extends PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      icon: 'peopleIcon',
      mode: getMode(),
      itemListPaneWidth: getMode() === 'small' ? '100%' : 320,
      selectionMode: false,
      action: null,
      selectedItems: []
    }

    window.addEventListener('resize', this.handleResize)
  }

  handleResize = () => {
    let nextMode = getMode()

    if (nextMode === 'small') {
      this.setState({
        itemListPaneWidth: '100%'
      })
    } else {
      this.setState({
        itemListPaneWidth: 320
      })
    }

    if (this.state.mode !== nextMode) {
      this.setState({
        mode: nextMode
      })
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.history.location.pathname === `${publicURL}/app/users` && prevState.selectedItems.length > 0) {
      return {
        ...prevState,
        selectedItems: []
      }
    } else {
      return {
        ...prevState
      }
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize)
  }

  propsData = () => {
    return {
      icon: this.state.icon,
      changeSelectionMode: this.changeSelectionMode,
      selectionMode: this.state.selectionMode,
      selectedItems: this.state.selectedItems,
      changeSelectedItems: this.changeSelectedItems,
      action: this.state.action,
      changeAction: this.changeAction,
      history: this.props.history,
      handleMessage: this.props.handleMessage,
      toast: this.props.toast,
    }
  }

  changeSelectedItems = selectedItems => this.setState({ selectedItems })
  changeAction = action => this.setState({ action })
  changeSelectionMode = selectionMode => this.setState({ selectionMode })

  stylesList = () => {

    let styles = {
      width: this.state.itemListPaneWidth
    }

    if (this.state.mode === 'small') {
      if ((this.state.selectedItems.length === 0 && this.props.history.location.pathname === `${publicURL}/app/users`) ||
        this.props.history.location.pathname === `${publicURL}/app/users` ||
        (this.props.history.location.pathname === `${publicURL}/app/users` &&
          this.state.selectionMode)) {
        styles.display = 'inline-block'
      } else {
        styles.display = 'none'
      }

    } else {
      styles.display = 'inline-block'
    }

    return styles
  }

  stylesContent = () => {

    const validWidth = this.state.itemListPaneWidth === '100%' ? 0 : this.state.itemListPaneWidth
    let styles = {
      width: calc100PercentMinus(validWidth),
      height: '100%'
    }

    if (this.state.mode === 'small') {
      if ((this.state.selectedItems.length === 0 && this.props.history.location.pathname === `${publicURL}/app/users`) ||
        this.props.history.location.pathname === `${publicURL}/app/users` ||
        (this.props.history.location.pathname === `${publicURL}/app/users` &&
          this.state.selectionMode)) {
        styles.display = 'none'
      } else {
        styles.display = 'inline-flex'
      }

    } else {
      styles.display = 'inline-flex'
    }

    return styles
  }

  render() {
    let renderComponents = (

      <React.Fragment>
        <div className="listPane flex-block-list" style={{ ...this.stylesList() }}>
          <UsersList
            key="list"
            {...this.propsData()}
          />
        </div>
        <div className="flex-block-content" style={{ ...this.stylesContent() }}>
          <GenerateRoutes
            key="content"
            routes={routes}
            rootPath={this.props.match.url}
            data={{ ...this.propsData() }}
          />
        </div>
      </React.Fragment>

    )

    return (
      <div className="flex-block --with-scroll">
        {renderComponents}
      </div>
    )
  }
}

export default withToasNotification(withHandleMessages(Users))
