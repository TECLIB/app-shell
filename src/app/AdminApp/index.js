import React, { Component } from 'react'
import withAdminAppLayout from '../../hoc/withAdminAppLayout'

import routes from './routes'
import GenerateRoutes from '../../components/GenerateRoutes';

class AdminApp extends Component {
    render() {
        return <GenerateRoutes routes={routes} rootPath={this.props.match.url} />
    }
}

export default withAdminAppLayout(AdminApp)