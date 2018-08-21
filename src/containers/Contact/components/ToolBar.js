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