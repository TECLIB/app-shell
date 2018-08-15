import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import getMode from 'shared/getMode'
import calc100PercentMinus from 'shared/calc100PercentMinus'
import publicURL from 'shared/publicURL'
import GenerateRoutes from 'components/GenerateRoutes'
import ContactList from './components/ContactList'
import routes from './routes'


/**
 * Component with the users section
 * @class Users
 * @extends PureComponent
 */
class Contact extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      icon: 'Contact',
      mode: getMode(),
      itemListPaneWidth: getMode() === 'small' ? '100%' : 320,
      selectionMode: false,
      action: null,
      selectedItems: [],
    }
    window.addEventListener('resize', this.handleResize)
  }

  /**
   * Remove event listener 'resize'
   * @function componentWillUnmount
   */
  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize)
  }

  /**
   * Make sure that the state and props are in sync for when it is required
   * @static
   * @function getDerivedStateFromProps
   * @param {object} nextProps
   * @param {object} prevState
   */
  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      nextProps.history.location.pathname === `${publicURL}/app/users`
      && prevState.selectedItems.length > 0
      && prevState.selectionMode === false
    ) {
      return {
        ...prevState,
        selectedItems: [],
      }
    }
    return null
  }

  /**
   * Change state according to the resolution of the screen
   * @function handleResize
   */
  handleResize = () => {
    const nextMode = getMode()

    if (nextMode === 'small') {
      this.setState({
        itemListPaneWidth: '100%',
      })
    } else {
      this.setState({
        itemListPaneWidth: 320,
      })
    }

    if (this.state.mode !== nextMode) {
      this.setState({
        mode: nextMode,
      })
    }
  }

  /**
   * Construct the props data
   * @function propsData
   * @return {object}
   */
  propsData = () => ({
    icon: this.state.icon,
    showIcon: true,
    selectionMode: this.state.selectionMode,
    selectedItems: this.state.selectedItems,
    action: this.state.action,
    history: this.props.history,
    handleMessage: this.props.handleMessage,
    changeSelectionMode: this.changeSelectionMode,
    changeSelectedItems: this.changeSelectedItems,
    toast: this.props.toast,
    confirmation: this.props.confirmation,
    changeAction: this.changeAction,
  })

  /**
   * Change selected items
   * @function changeSelectedItems
   * @param {array} selectedItems
   */
  changeSelectedItems = selectedItems => this.setState({
    selectedItems,
  })

  /**
   * Change action
   * @function changeAction
   * @param {string} action
   */
  changeAction = action => this.setState({
    action,
  })

  /**
   * Change selection mode
   * @function changeSelectionMode
   * @param {boolean} selectionMode
   */
  changeSelectionMode = selectionMode => this.setState({
    selectionMode,
  })

  /**
   * Construct the styles of the list
   * @function stylesList
   * @return {object}
   */
  stylesList = () => {
    const styles = {
      width: this.state.itemListPaneWidth,
    }

    if (this.state.mode === 'small') {
      if ((this.state.selectedItems.length === 0 && this.props.history.location.pathname === `${publicURL}/app/users`)
        || this.props.history.location.pathname === `${publicURL}/app/users`
        || (this.props.history.location.pathname === `${publicURL}/app/users`
          && this.state.selectionMode)) {
        styles.display = 'inline-block'
      } else {
        styles.display = 'none'
      }
    } else {
      styles.display = 'inline-block'
    }

    return styles
  }

  /**
   * Construct the styles of the content
   * @function stylesContent
   * @return {object}
   */
  stylesContent = () => {
    const validWidth = this.state.itemListPaneWidth === '100%' ? 0 : this.state.itemListPaneWidth
    const styles = {
      width: calc100PercentMinus(validWidth),
      height: '100%',
    }

    if (this.state.mode === 'small') {
      if (
        (this.state.selectedItems.length === 0 && this.props.history.location.pathname === `${publicURL}/app/users`)
        || this.props.history.location.pathname === `${publicURL}/app/users`
        || (this.props.history.location.pathname === `${publicURL}/app/users` && this.state.selectionMode)
      ) {
        styles.display = 'none'
      } else {
        styles.display = 'inline-flex'
      }
    } else {
      styles.display = 'inline-flex'
    }

    return styles
  };

  render() {
    return (
      <div style={{ display: 'block', width: '100%' }}>
        <div className="flex-block flex-block--with-scroll">
          <div className="list-pane flex-block__list" style={{ ...this.stylesList() }}>
            <ContactList key="list" {...this.propsData()} />
          </div>
          <div className="flex-block__content" style={{ ...this.stylesContent() }}>
            <GenerateRoutes key="content" routes={routes} rootPath={this.props.match.url} {...this.propsData()} />
          </div>
        </div>
      </div>
    )
  }
}

Contact.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  handleMessage: PropTypes.func.isRequired,
  toast: PropTypes.object.isRequired,
  confirmation: PropTypes.object.isRequired,
}

export default Contact
