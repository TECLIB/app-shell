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
import getMode from 'shared/getMode'
import calc100PercentMinus from 'shared/calc100PercentMinus'
import publicURL from 'shared/publicURL'
import GenerateRoutes from 'components/GenerateRoutes'
import ContactList from './components/ContactList'
import routes from './routes'


/**
 * Component with the contacts section
 * @class Contacts
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
      nextProps.history.location.pathname === `${publicURL}/app/contacts`
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
      if ((this.state.selectedItems.length === 0 && this.props.history.location.pathname === `${publicURL}/app/contacts`)
        || this.props.history.location.pathname === `${publicURL}/app/contacts`
        || (this.props.history.location.pathname === `${publicURL}/app/contacts`
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
        (this.state.selectedItems.length === 0 && this.props.history.location.pathname === `${publicURL}/app/contacts`)
        || this.props.history.location.pathname === `${publicURL}/app/contacts`
        || (this.props.history.location.pathname === `${publicURL}/app/contacts` && this.state.selectionMode)
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
