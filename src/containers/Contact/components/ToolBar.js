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
import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar'

/**
 * Component with the users section
 * @class ToolBarlist
 * @extends PureComponent
 */
class ToolBar extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      items: [
        {
          key: 'SortItem',
          text: 'Sort',
          iconProps: { iconName: 'Sort' },
          disabled: false,
          checked: false,
          style: { display: '' },
        },
        {
          key: 'refreshItem',
          text: 'Refresh',
          iconProps: { iconName: 'Refresh' },
          disabled: false,
          checked: false,
          style: { display: '' },
        },
        {
          key: 'EditItem',
          text: 'Edit',
          iconProps: { iconName: 'Edit' },
          disabled: false,
          checked: false,
          style: { display: 'none' },
        },
        {
          key: 'DeleteItem',
          text: 'Delete',
          iconProps: { iconName: 'Delete' },
          disabled: false,
          checked: false,
          style: { display: 'none' },
        },
        {
          key: 'SelectionItem',
          text: 'Selection mode',
          iconProps: { iconName: 'MultiSelectMirrored' },
          disabled: false,
          checked: false,
          style: { display: '' },
        },
      ],
    }
  }

  render() {
    return (
      <CommandBar
        items={this.state.items}
      />
    )
  }
}

export default ToolBar
