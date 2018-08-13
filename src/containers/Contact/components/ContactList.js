import React, { PureComponent } from 'react'
import {
  DetailsList,
  DetailsListLayoutMode,
  Selection,
  SelectionMode,
} from 'office-ui-fabric-react/lib/DetailsList'
import { lorem } from 'office-ui-fabric-react/lib/utilities/exampleData'
import Loader from 'components/Loader'
import ContactItemList from './ContactItemList'
import ToolBar from './ToolBar'

const items = []

/**
 * Component with the users section
 * @class ToolBarlist
 * @extends PureComponent
 */
class ContactList extends PureComponent {
  constructor(props) {
    super(props)

    this.selection = new Selection({
      onSelectionChanged: () => {},
    })

    //  Populate with items for demos.
    if (items.length === 0) {
      for (let i = 0; i < 30; i += 1) {
        const userName = lorem(2).replace(/[^a-zA-Z ]/g, '')

        items.push({
          name: userName,
        })
      }
    }

    this.columns = [
      {
        key: 'contact',
        name: 'Contact',
        minWidth: 220,
        maxWidth: 320,
        isResizable: true,
        onRender: this.itemListRenderer,
      },
    ]

    this.state = {
      isLoading: false,
      itemList: ['hola'],
      items,
      isModalSelection: false,
    }
  }

  itemListRenderer = ItemList => (<ContactItemList itemList={ItemList} />)

  render() {
    if (this.state.isLoading) {
      return <Loader count={3} />
    }

    if (this.state.itemList) {
      if (this.state.itemList.length > 0) {
        return (
          <React.Fragment>
            <ToolBar />
            <DetailsList
              columns={this.columns}
              items={this.state.items}
              isHeaderVisible={false}
              selectionMode={this.state.isModalSelection ? SelectionMode.multiple : SelectionMode.none}
              setKey="set"
              layoutMode={DetailsListLayoutMode.justified}
              selection={this.selection}
              compact
            />
          </React.Fragment>
        )
      }
    }
    return null
  }
}

export default ContactList
