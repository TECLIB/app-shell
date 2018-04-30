import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { I18n } from "react-i18nify"
import publicURL from '../../shared/publicURL'
import { Icon } from 'office-ui-fabric-react/lib/Icon'
import { Breadcrumb } from 'office-ui-fabric-react/lib/Breadcrumb'

class HeaderBreadcrumb extends React.Component {

    renderItem = (eventObject) => {
        return (<Link to={eventObject.href}>
            {eventObject.text}
        </Link>)
    }

    breadcrumbs() {
        let breadcrumbs = []
        breadcrumbs.push({ text: I18n.t('commons.dashboard'), key: `${publicURL}/app`, href: `${publicURL}/app` })
        const customDivider = () => <span className="header-breadcrumb-separator">&nbsp;/&nbsp;</span>
        const addresses = this.props.history.location.pathname.split("/")

        for (let index = (publicURL === '') ? 2 : 3; index < addresses.length; index++) {
            let path = `${publicURL}/app`
            for (let i = (publicURL === '') ? 2 : 3; i < index + 1; i++) {
                path += `/${addresses[i]}`
            }
            breadcrumbs.push({ text: addresses[index].replace(/\b\w/g, l => l.toUpperCase()), key: path, href: path })
        }

        let componentBreadcrumbs = (
            <div style={{ display: 'inline-block' }}>
                <Breadcrumb 
                    className="header-breadcrumb-separator"
                    items={breadcrumbs}
                    onRenderItem={this.renderItem}
                    dividerAs={customDivider}
                    maxDisplayedItems={3}
                />
            </div>)

        return componentBreadcrumbs
    }

    render() {
        return (
            <header className="header-block">
                <div className="header-icon">
                    <Icon iconName="CollapseMenu" onClick={this.props.handleToggleExpand} />
                </div>

                <nav className="header-breadcrumb">
                    {this.breadcrumbs()}
                </nav>
            </header>
        )
    }
}

HeaderBreadcrumb.propTypes = {
    handleToggleExpand: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired
}

export default HeaderBreadcrumb
