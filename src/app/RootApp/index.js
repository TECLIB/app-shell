import React, { Component } from 'react'
import { Switch } from 'react-router-dom'
import withI18NTranslation from '../../hoc/withI18NTranslation'
import withNotification from '../../hoc/withNotification'
import GenerateRoutes from '../../components/GenerateRoutes'
import routes from './routes'

/**
 * Main Component in the React Tree
 * This Render each route of the containers or / and components like 404
 * TODO: Use PrivateRoute if the `private attribute of route is true
 */
class RootApp extends Component {
    render() {
        return (
            <Switch>
                <GenerateRoutes routes={routes} withNotFound />
            </Switch>
        )
    }
}

export default withNotification(
    withI18NTranslation(RootApp)
)