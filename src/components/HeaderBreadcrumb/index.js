import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Icon } from 'office-ui-fabric-react/lib/Icon'
import { Breadcrumb } from 'office-ui-fabric-react/lib/Breadcrumb'
import { DefaultButton } from 'office-ui-fabric-react/lib/Button'
import { Link } from 'react-router-dom'
import i18n from '../../shared/i18n'
import publicURL from '../../shared/publicURL'

class HeaderBreadcrumb extends PureComponent {
  breadcrumbs() {
    const breadcrumbs = []
    breadcrumbs.push({ text: i18n.t('commons.dashboard'), key: `${publicURL}/app`, href: `${publicURL}/app` })
    const customDivider = () => <span className="header-breadcrumb">&nbsp;/&nbsp;</span>
    const addresses = this.props.location.pathname.split('/')

    for (let index = (publicURL === '') ? 2 : 3; index < addresses.length; index += 1) {
      let path = `${publicURL}/app`
      for (let i = (publicURL === '') ? 2 : 3; i < index + 1; i += 1) {
        path += `/${addresses[i]}`
      }
      breadcrumbs.push({ text: addresses[index].replace(/\b\w/g, l => l.toUpperCase()), key: path, href: path })
    }

    const componentBreadcrumbs = (
      <Breadcrumb
        className="header-breadcrumb"
        items={breadcrumbs}
        onRenderItem={this.renderItem}
        dividerAs={customDivider}
        onReduceData={() => { }}
      />)

    return componentBreadcrumbs
  }

  renderItem = eventObject => <Link to={eventObject.href}>{eventObject.text}</Link>

  render() {
    return (
      <header className="header-block">
        <DefaultButton
          className="header-icon"
          primary
          onClick={this.props.handleToggleExpand}
        >
          <Icon iconName="CollapseMenu" onClick={this.props.handleToggleExpand} />
        </DefaultButton>
        <nav className="header-breadcrumb">
          {this.breadcrumbs()}
        </nav>
      </header>
    )
  }
}

HeaderBreadcrumb.propTypes = {
  handleToggleExpand: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
}

export default HeaderBreadcrumb
