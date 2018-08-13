import React, { PureComponent } from 'react'
import { DetailsList } from 'office-ui-fabric-react/lib/DetailsList'
import { createListItems } from 'office-ui-fabric-react/lib/utilities/exampleData'
import ToolBarList from './ToolBarList'

/**
 * Component with the users section
 * @class Users
 * @extends PureComponent
 */
class ListView extends PureComponent {
  constructor(props) {
    super(props)
    this.items = createListItems(10)
  }

  render() {
    return (
      <div style={{ display: 'block', width: '100%' }}>
        <ToolBarList />
        <div style={{ display: 'block', width: '320px' }}>
          <DetailsList items={this.items} />
        </div>
      </div>
    )
  }
}

export default ListView
