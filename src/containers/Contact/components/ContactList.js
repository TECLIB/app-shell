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
import {
  DetailsList,
  Selection,
  SelectionMode,
} from 'office-ui-fabric-react/lib/DetailsList'
import { MarqueeSelection } from 'office-ui-fabric-react/lib/MarqueeSelection'
import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar'
import { ActionButton } from 'office-ui-fabric-react/lib/Button'
import Loading from 'components/Loading'
import I18n from 'shared/i18n'
import publicURL from 'shared/publicURL'
import delay from 'shared/delay'
import contacts from 'data/contacts.json'
import Loader from 'components/Loader'
import EmptyMessage from 'components/EmptyMessage'
import ContactItemList from './ContactItemList'

/**
 * Component with the contacts section
 * @class ContactList
 * @extends PureComponent
 */
export default class ContactList extends PureComponent {
  constructor(props) {
    super(props)

    this.selection = new Selection({
      onSelectionChanged: () => {
        this.handleSelectionChanged()
      },
    })

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
      selectedItems: this.props.selectedItems,
      isLoading: false,
      isLoadingMore: false,
      itemList: [],
    }
  }

  componentDidMount() {
    this.handleRefresh()
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.action === 'reload') {
      this.props.changeAction(null)
      this.handleRefresh()
    }

    if (prevState.selectedItems.length > 0 && this.state.selectedItems.length === 0 && !this.props.selectionMode) {
      this.selection.setAllSelected(false)
    }
  }

  componentWillUnmount() {
    this.props.changeSelectedItems([])
    this.props.changeSelectionMode(false)
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      ...prevState,
      selectedItems: nextProps.selectedItems,
    }
  }

  handleToggleSelectionMode = () => {
    this.props.history.push(`${publicURL}/app/contacts`)
    this.props.changeSelectionMode(!this.props.selectionMode)
    this.props.changeSelectedItems([])
    this.selection.setAllSelected(false)
  }

  handleSelectionChanged = () => {
    const itemSelected = []
    if (this.selection.getSelectedCount() > 0) {
      for (const item of this.selection.getSelection()) {
        itemSelected.push(item)
      }
      this.props.changeSelectedItems(itemSelected)
      if (itemSelected.length === 1 && !this.props.selectionMode) {
        this.props.history.push(`${publicURL}/app/contacts/${itemSelected[0]['User.id']}`)
      }
      if (itemSelected.length > 1 && !this.props.selectionMode) {
        this.props.history.push(`${publicURL}/app/contacts/edit/`)
      }
    }
  }

  handleRefresh = async () => {
    try {
      this.selection.setAllSelected(false)
      this.props.history.push(`${publicURL}/app/contacts`)
      this.props.changeSelectedItems([])

      this.setState({
        isLoading: true,
      })
      await delay(2000)
      const response = contacts

      this.order = response.order
      this.setState({
        isLoading: false,
        itemList: response.data,
      })
    } catch (e) {
      this.order = 'ASC'
      this.setState({
        isLoading: false,
      })
    }
  }

  loadMoreData = async () => {
    try {
      await delay(2000)
      const response = contacts
      let items = []
      for (const item in response.data) {
        if (Object.prototype.hasOwnProperty.call(response.data, item)) {
          items.push(response.data[item])
        }
      }

      items = this.state.itemList.slice(0, this.state.itemList.length - 1).concat(items)

      this.selection.setItems(response.data)

      this.setState({
        isLoadingMore: false,
        itemList: items,
      })

      this.selection.setItems(items)
    } catch (e) {
      this.setState({
        isLoadingMore: false,
      })
    }
  }

  handleEdit = () => {

  }

  dialogDelete = () => {
    this.props.confirmation.showDialog({
      title: I18n.t('users.delete'),
      message: `${this.state.selectedItems.length} ${I18n.t('commons.users')}`,
      isOk: this.handleDelete,
      isCancel: this.cancelDelete,
    })
  }

  cancelDelete = () => {
    this.selection.setAllSelected(false)
    this.props.changeSelectionMode(false)
    this.props.changeSelectedItems([])
  }

  handleDelete = async () => {
    this.setState({
      isLoading: true,
    }, async () => {
      try {
        this.props.toast.setNotification({
          title: I18n.t('commons.success'),
          body: I18n.t('notifications.elements_successfully_removed'),
          type: 'success',
        })
        this.props.changeSelectionMode(false)
        this.props.changeSelectedItems([])
        this.props.changeAction('reload')
      } catch (error) {
        this.props.toast.setNotification(this.props.handleMessage({ type: 'alert', message: error }))
        this.selection.setAllSelected(false)
        this.props.changeSelectionMode(false)
        this.props.changeSelectedItems([])
        this.setState(({
          isLoading: false,
        }))
      }
    })
  }

  handleSort = async () => {
    try {
      this.selection.setAllSelected(false)
      this.props.history.push(`${publicURL}/app/contacts`)
      this.props.changeSelectedItems([])

      this.setState({
        isLoading: true,
      })
      await delay(2000)
      const response = contacts

      this.order = response.order
      this.setState({
        isLoading: false,
        itemList: response.data,
      })
      this.props.history.push(`${publicURL}/app/contacts`)
    } catch (error) {
      this.order = 'ASC'
      this.setState({
        isLoading: false,
      })
    }
  }

  itemListRenderer = ItemList => (<ContactItemList itemList={ItemList} />)

  footerListRenderer = () => (
    <div style={{
      width: '320px',
      height: '48px',
    }}
    >
      <ActionButton
        data-automation-id="loadMore"
        iconProps={{ iconName: 'Refresh' }}
        onClick={() => {
          this.setState({
            isLoadingMore: true,
          }, () => {
            this.loadMoreData()
          })
        }}
      >
        Load more data
      </ActionButton>
      <span style={{ display: this.state.isLoadingMore ? '' : 'none' }}>
        <Loading small />
      </span>
    </div>
  )

  render() {
    const toolbarItems = [
      {
        key: 'SortItem',
        text: I18n.t('commons.sort'),
        iconProps: { iconName: 'Sort' },
        disabled: !this.state.selectedItems.length === 0,
        checked: false,
        style: { display: !this.props.selectionMode ? '' : 'none' },
        onClick: this.handleSort,
      },
      {
        key: 'refreshItem',
        text: I18n.t('commons.refresh'),
        iconProps: { iconName: 'Refresh' },
        disabled: !this.state.selectedItems.length === 0,
        checked: false,
        style: { display: !this.props.selectionMode ? '' : 'none' },
        onClick: this.handleRefresh,
      },
      {
        key: 'EditItem',
        text: I18n.t('commons.edit'),
        iconProps: { iconName: 'Edit' },
        disabled: this.state.selectedItems.length === 0,
        checked: false,
        style: { display: this.props.selectionMode ? '' : 'none' },
      },
      {
        key: 'DeleteItem',
        text: I18n.t('commons.delete'),
        iconProps: { iconName: 'Delete' },
        disabled: this.state.selectedItems.length === 0,
        checked: false,
        style: { display: this.props.selectionMode ? '' : 'none' },
        onClick: this.dialogDelete,
      },
      {
        key: 'SelectionItem',
        text: I18n.t('commons.select'),
        iconProps: { iconName: 'MultiSelectMirrored' },
        disabled: false,
        checked: false,
        style: { display: '' },
        onClick: this.handleToggleSelectionMode,
      },
    ]

    let listComponent

    if (this.state.isLoading) {
      listComponent = <Loader count={3} />
    } else if (this.state.itemList) {
      if (this.state.itemList.length > 0) {
        listComponent = (
          <div style={{ height: 'calc(100% - 88px)', overflowY: 'overlay', overflowX: 'hidden' }}>
            <MarqueeSelection selection={this.selection} isEnabled={false}>
              <DetailsList
                columns={this.columns}
                items={this.state.itemList}
                isHeaderVisible={false}
                selectionMode={this.props.selectionMode ? SelectionMode.multiple : SelectionMode.none}
                setKey="set"
                selection={this.selection}
                compact
                onShouldVirtualize={() => false}
                onRenderDetailsFooter={() => (
                  this.footerListRenderer()
                )}
              />
            </MarqueeSelection>
          </div>
        )
      } else {
        listComponent = <EmptyMessage message={I18n.t('users.not_found')} icon={this.props.icon} showIcon />
      }
    } else {
      listComponent = <EmptyMessage message={I18n.t('users.not_found')} icon={this.props.icon} showIcon />
    }

    return (
      <React.Fragment>
        <CommandBar
          items={toolbarItems}
          onReduceData={() => {}}
        />
        {listComponent}
      </React.Fragment>
    )
  }
}

ContactList.defaultProps = {
  action: '',
}

ContactList.propTypes = {
  confirmation: PropTypes.object.isRequired,
  selectedItems: PropTypes.array.isRequired,
  changeSelectedItems: PropTypes.func.isRequired,
  selectionMode: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired,
  changeSelectionMode: PropTypes.func.isRequired,
  action: PropTypes.string,
  changeAction: PropTypes.func.isRequired,
  toast: PropTypes.object.isRequired,
  icon: PropTypes.string.isRequired,
}
