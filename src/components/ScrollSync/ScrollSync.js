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

class ScrollSync extends PureComponent {
  panes = {}

  static propTypes = {
    children: PropTypes.element.isRequired,
    proportional: PropTypes.bool,
    vertical: PropTypes.bool,
    horizontal: PropTypes.bool,
  }

  static childContextTypes = {
    registerPane: PropTypes.func,
    unregisterPane: PropTypes.func,
  }

  static defaultProps = {
    proportional: true,
    vertical: true,
    horizontal: true,
  }

  getChildContext() {
    return {
      registerPane: this.registerPane,
      unregisterPane: this.unregisterPane,
    }
  }

  registerPane = (node, group) => {
    if (!this.panes[group]) {
      this.panes[group] = []
    }

    if (!this.findPane(node, group)) {
      this.addEvents(node, group)
      this.panes[group].push(node)
    }
  }

  unregisterPane = (node, group) => {
    if (this.findPane(node, group)) {
      this.removeEvents(node)
      this.panes[group].splice(this.panes[group].indexOf(node), 1)
    }
  }

  addEvents = (node, group) => {
    /* For some reason element.addEventListener doesnt work with document.body */
    node.onscroll = this.handlePaneScroll.bind(this, node, group); // eslint-disable-line
  }

  removeEvents = (node) => {
    /* For some reason element.removeEventListener doesnt work with document.body */
    node.onscroll = null; // eslint-disable-line
  }

  findPane = (node, group) => {
    if (!this.panes[group]) {
      return false
    }

    return this.panes[group].find(pane => pane === node)
  }

  handlePaneScroll = (node, group) => {
    window.requestAnimationFrame(() => {
      this.syncScrollPositions(node, group)
    })
  }

  syncScrollPositions = (scrolledPane, group) => {
    const {
      scrollTop,
      scrollHeight,
      clientHeight,
      scrollLeft,
      scrollWidth,
      clientWidth,
    } = scrolledPane

    const scrollTopOffset = scrollHeight - clientHeight
    const scrollLeftOffset = scrollWidth - clientWidth

    const { proportional, vertical, horizontal } = this.props

    this.panes[group].forEach((pane) => {
      const paneGroup = pane
      /* For all panes beside the currently scrolling one */
      if (scrolledPane !== paneGroup) {
        /* Remove event listeners from the node that we'll manipulate */
        this.removeEvents(paneGroup, group)
        /* Calculate the actual pane height */
        const paneHeight = paneGroup.scrollHeight - clientHeight
        const paneWidth = paneGroup.scrollWidth - clientWidth
        /* Adjust the scrollTop position of it accordingly */
        if (vertical && scrollTopOffset > 0) {
          paneGroup.scrollTop = proportional
            ? (paneHeight * scrollTop) / scrollTopOffset
            : scrollTop; // eslint-disable-line
        }
        if (horizontal && scrollLeftOffset > 0) {
          paneGroup.scrollLeft = proportional
            ? (paneWidth * scrollLeft) / scrollLeftOffset
            : scrollLeft; // eslint-disable-line
        }
        /* Re-attach event listeners after we're done scrolling */
        window.requestAnimationFrame(() => {
          this.addEvents(paneGroup, group)
        })
      }
    })
  }

  render() {
    return React.Children.only(this.props.children)
  }
}

export default ScrollSync
