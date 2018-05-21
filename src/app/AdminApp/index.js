import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import withAdminAppLayout from '../../hoc/withAdminAppLayout'
import withToastNotification from '../../hoc/withToastNotification'

import routes from './routes'
import GenerateRoutes from '../../components/GenerateRoutes'

class AdminApp extends PureComponent {
  render() {
    return <GenerateRoutes routes={routes} rootPath={this.props.match.url} />
  }
}

AdminApp.propTypes = {
  match: PropTypes.object.isRequired,
}

export default withAdminAppLayout(withToastNotification(AdminApp))
