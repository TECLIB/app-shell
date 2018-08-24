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

class ContentPane extends PureComponent {
  constructor(props) {
    super(props)
    const display = localStorage.getItem('display') ? JSON.parse(localStorage.getItem('display')) : {}
    this.state = {
      updateAnimation: display.animations,
      animate: display.animations ? 'content-pane--animate' : '',
    }
  }

  componentDidMount() {
    this.handleAnimation()
  }

  handleAnimation = () => {
    if (this.state.updateAnimation) {
      this.setState({
        animate: 'content-pane--animate',
      }, () => {
        setTimeout(() => {
          this.setState({
            animate: '',
          })
        }, 2000)
      })
    }
  }

  render() {
    return (
      <div className={`content-pane ${this.state.animate}`}>
        <div id="content-pane-block" className="content-pane-block">
          { this.props.children }
        </div>
      </div>
    )
  }
}

ContentPane.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.array,
  ]).isRequired,
}

export default ContentPane
