import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import {
  DetailsList,
  Selection,
  SelectionMode,
} from 'office-ui-fabric-react/lib/DetailsList'
import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar'
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
      itemList: [],
    }
    this.order = 'ASC'
    this.pagination = {
      start: 0,
      page: 1,
      count: 15,
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
      this.pagination = {
        start: 0,
        page: 1,
        count: 15,
      }
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
      this.pagination = {
        start: 0,
        page: 1,
        count: 15,
      }
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
          <DetailsList
            columns={this.columns}
            items={this.state.itemList}
            isHeaderVisible={false}
            selectionMode={this.props.selectionMode ? SelectionMode.multiple : SelectionMode.none}
            setKey="set"
            selection={this.selection}
            compact
          />
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
