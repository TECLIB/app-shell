import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ContentPane from '../../../components/ContentPane'
import Confirmation from '../../../components/Confirmation'
import Loading from '../../../components/Loading'
import { I18n } from "react-i18nify"
import getID from '../../../shared/getID'
import publicURL from '../../../shared/publicURL'
import { Icon } from 'office-ui-fabric-react/lib/Icon'
import { CommandBarButton } from 'office-ui-fabric-react/lib/Button';
import {
    Persona,
    PersonaSize,
    PersonaPresence
} from 'office-ui-fabric-react/lib/Persona'

export default class UsersContent extends Component {

    constructor (props) {
        super(props)
        this.state = {
            id: getID(this.props.history.location.pathname),
            data: undefined,
            emails: []
        }
    }

    componentWillReceiveProps(newProps) {
        if (this.state.id !== getID(this.props.history.location.pathname)) {
            this.setState({
                data: undefined,
                emails: [],
                id: getID(this.props.history.location.pathname)
            }, () => this.handleRefresh())
        }
    }

    handleDelete = async () => {
        const isOK = await Confirmation.isOK(this.contentDialog)
        if (isOK) {

            this.setState({
                isLoading: true
            })
            
            try {
                this.props.toast.setNotification({
                    title: I18n.t('commons.success'),
                    body: I18n.t('notifications.elements_successfully_removed'),
                    type: 'success'
                })
                this.props.changeAction('reload')            
                this.props.changeSelectionMode(false)
                this.props.history.push(`${publicURL}/app/users`)
            } catch (error) {                
                this.props.toast.setNotification(this.props.handleMessage({ type: 'alert', message: error }))
            }
            
        }
    }

    componentDidMount() {
        this.handleRefresh()
    }

    handleRefresh = async () => {
        try {
            let user = {}
            if (this.props.selectedItems.length > 0) {
                user = {
                    imageUrl: '',
                    imageInitials: this.props.selectedItems[0]['User.name'] !== '' ? this.props.selectedItems[0]['User.name'].substring(0, 2).toUpperCase() : '',
                    primaryText: this.props.selectedItems[0]['User.name'],
                    secondaryText: 'Software Engineer',
                    tertiaryText: 'In a meeting',
                    optionalText: 'Available at 4:00pm'
                }
            }

            const emails = []
            this.setState({ 
                data: user,
                emails 
            })
        } catch (error) {
            this.props.toast.setNotification(this.props.handleMessage({ type: 'alert', message: error }))
            this.props.history.push(`${publicURL}/app/users`)
        }
    }

    render() {
        let renderComponent 
        if (this.state.data === undefined) {
            renderComponent = <Loading message={`${I18n.t('commons.loading')}...`}/>
        } else {
            renderComponent = (
                <div>
                    <div className="contentHeader">
                        <div className="itemInfo" style={{ padding: '10px 10px'}}>
                            <Persona
                                {...this.state.data}
                                size={PersonaSize.size100}
                                presence={PersonaPresence.online}
                            />
                        </div>
                        <div className="contentStatus" style={{ padding: '0 110px' }}>
                            <br />
                            <div style={{ display: 'flex', alignItems: 'stretch', height: '40px' }}>
                            <CommandBarButton
                                data-automation-id='edit'
                                iconProps={{ iconName: 'edit' }}
                                text='Edit'
                                    onClick={() => this.props.history.push(`${publicURL}/app/users`)}
                            />
                            <CommandBarButton
                                data-automation-id='remove'
                                iconProps={{ iconName: 'delete' }}
                                text='Delete'
                                onClick={this.handleDelete}
                            />
                            </div>
                        </div>
                    </div>
                    <div className="separator" />
                    <div className="contentInfo">
                        <ul>
                            <li>
                                <Icon iconName="phone" />
                                <div className="callContent">
                                    <a href={this.state.data.mobile ? "tel:" + this.state.data.mobile : "#call"}>
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
                                    <a href={this.state.data.phone2 ? "tel:" + this.state.data.phone2 : "#call"}>
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
                                    <a href={this.state.emails.length > 0 ? "mailto:" + this.state.emails[0]["email"] : "#email"}>
                                        {I18n.t('commons.email')}
                                    </a>
                                    <div>
                                        {this.state.emails.length > 0 ? this.state.emails[0]["email"] : I18n.t('commons.not_available')}
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <Confirmation title={I18n.t('users.delete_one')} message="Users" reference={el => this.contentDialog = el} />
                </div>
            )
        }
        return (
            <ContentPane>
                { renderComponent }
            </ContentPane>
        ) 
    }
}
UsersContent.propTypes = {
    selectedItems: PropTypes.array,
    changeAction: PropTypes.func.isRequired,
    changeSelectionMode: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    toast: PropTypes.object.isRequired,
}
