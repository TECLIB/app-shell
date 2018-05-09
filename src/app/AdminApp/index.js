import React, { PureComponent } from 'react'
import withAdminAppLayout from '../../hoc/withAdminAppLayout'
import withToastNotification from '../../hoc/withToastNotification'

import routes from './routes'
import GenerateRoutes from '../../components/GenerateRoutes'

class AdminApp extends PureComponent {
    render() {
        return <GenerateRoutes routes={routes} rootPath={this.props.match.url} toast={this.props.toast}/>
    }
}

export default withAdminAppLayout(withToastNotification(AdminApp))