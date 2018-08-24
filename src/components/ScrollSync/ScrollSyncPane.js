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

import React, { Children, PureComponent } from 'react'
import PropTypes from 'prop-types'

class ScrollSyncPane extends PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
    attachTo: PropTypes.object,
    group: PropTypes.string,
  }

  static contextTypes = {
    registerPane: PropTypes.func.isRequired,
    unregisterPane: PropTypes.func.isRequired,
  }

  static defaultProps = {
    group: 'default',
    attachTo: null,
  }

  componentDidMount() {
    this.node = this.props.attachTo || this.child
    this.context.registerPane(this.node, this.props.group)
  }

  componentDidUpdate(prevProps) {
    if (this.props.group !== prevProps.group) {
      this.context.unregisterPane(this.node, prevProps.group)
      this.context.registerPane(this.node, this.props.group)
    }
  }

  componentWillUnmount() {
    this.context.unregisterPane(this.node, this.props.group)
  }

  render() {
    return (
      <React.Fragment>
        {Children.map(this.props.children, element => React.cloneElement(element, { ref: (idx) => { this.child = idx } }))}
      </React.Fragment>
    )
  }
}

export default ScrollSyncPane
