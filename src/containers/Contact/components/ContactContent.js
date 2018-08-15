import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Icon } from 'office-ui-fabric-react/lib/Icon'
import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar'
import {
  Persona,
  PersonaSize,
  PersonaPresence,
} from 'office-ui-fabric-react/lib/Persona'
import I18n from 'shared/i18n'
import ContentPane from 'components/ContentPane'
import Loading from 'components/Loading'
import getID from 'shared/getID'
import publicURL from 'shared/publicURL'

export default class ContactsContent extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      id: getID(this.props.history.location.pathname),
      data: undefined,
      emails: [],
    }
  }

  componentDidMount() {
    this.handleRefresh()
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.id !== this.state.id) {
      this.handleRefresh()
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.id !== getID(nextProps.history.location.pathname)) {
      return {
        id: getID(nextProps.history.location.pathname),
        data: undefined,
        emails: [],
      }
    }
    return null
  }

  dialogDelete = () => {
    this.props.confirmation.showDialog({
      title: I18n.t('users.delete_one'),
      message: I18n.t('commons.contacts'),
      isOk: this.handleDelete,
      isCancel: this.cancelDelete,
    })
  }

  cancelDelete = () => {
    this.props.changeSelectionMode(false)
  }

  handleDelete = async () => {
    this.setState({
      isLoading: true,
    }, () => {
      setTimeout(() => {
        this.props.toast.setNotification({
          title: I18n.t('commons.success'),
          body: I18n.t('notifications.elements_successfully_removed'),
          type: 'success',
        })
        this.props.changeAction('reload')
        this.props.changeSelectionMode(false)
        this.props.history.push(`${publicURL}/app/contacts`)
      }, 3000)
    })
  }

  handleRefresh = async () => {
    try {
      let user = {}
      if (this.props.selectedItems.length > 0) {
        user = {
          imageUrl: '',
          imageInitials: this.props.selectedItems[0]['User.name'] !== '' ? this.props.selectedItems[0]['User.name'].substring(0, 2).toUpperCase() : '',
          text: this.props.selectedItems[0]['User.name'],
          secondaryText: 'Software Engineer',
          tertiaryText: 'In a meeting',
          optionalText: 'Available at 4:00pm',
        }
      }

      const emails = []
      this.setState({
        data: user,
        emails,
      })
    } catch (error) {
      this.props.toast.setNotification(this.props.handleMessage({ type: 'alert', message: error }))
      this.props.history.push(`${publicURL}/app/contacts`)
    }
  }

  render() {
    let renderComponent
    if (this.state.data === undefined || this.state.isLoading) {
      renderComponent = <Loading message={`${I18n.t('commons.loading')}...`} />
    } else {
      renderComponent = (
        <div>
          <div className="contentHeader">
            <div className="itemInfo" style={{ padding: '10px 10px' }}>
              <Persona
                {...this.state.data}
                size={PersonaSize.size100}
                presence={PersonaPresence.online}
              />
            </div>
          </div>
          <div className="separator" />
          <div className="contentInfo">
            <ul>
              <li>
                <Icon iconName="phone" />
                <div className="callContent">
                  <a href={this.state.data.mobile ? `tel:${this.state.data.mobile}` : '#call'}>
                    {I18n.t('commons.call_mobile')}
                  </a>
                  <div>
                    {this.state.data.mobile ? this.state.data.mobile : I18n.t('commons.not_available')}
                  </div>
                </div>
              </li>
              <li>
                <Icon iconName="phone" />
                <div className="callContent">
                  <a href={this.state.data.phone2 ? `tel:${this.state.data.phone2}` : '#call'}>
                    {I18n.t('commons.call_work')}
                  </a>
                  <div>
                    {this.state.data.phone2 ? this.state.data.phone2 : I18n.t('commons.not_available')}
                  </div>
                </div>
              </li>
              <li>
                <Icon iconName="mail" />
                <div className="callContent">
                  <a href={this.state.emails.length > 0 ? `mailto:${this.state.emails[0].email}` : '#email'}>
                    {I18n.t('commons.email')}
                  </a>
                  <div>
                    {this.state.emails.length > 0 ? this.state.emails[0].email : I18n.t('commons.not_available')}
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      )
    }
    return (
      <ContentPane>
        <CommandBar
          farItems={
            [
              {
                key: 'EditContent',
                text: 'Edit',
                iconProps: { iconName: 'Edit' },
                disabled: false,
                checked: false,
                style: { display: '' },
                onClick: () => this.props.history.push(`${publicURL}/app/contacts`),
              },
              {
                key: 'DeleteContent',
                text: 'Delete',
                iconProps: { iconName: 'Delete' },
                disabled: false,
                checked: false,
                style: { display: '' },
                onClick: this.dialogDelete,
              },
            ]
          }
        />
        {renderComponent}
      </ContentPane>
    )
  }
}

ContactsContent.defaultProps = {
  selectedItems: [],
}

ContactsContent.propTypes = {
  confirmation: PropTypes.object.isRequired,
  selectedItems: PropTypes.array,
  changeAction: PropTypes.func.isRequired,
  changeSelectionMode: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  toast: PropTypes.object.isRequired,
  handleMessage: PropTypes.func.isRequired,
}
