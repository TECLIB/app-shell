import React from 'react'
import {
  Switch,
} from 'react-router-dom'
import GenerateRoutes from 'components/GenerateRoutes'
import withI18n from 'hoc/withI18n'
import withNotification from 'hoc/withNotification'
import routes from './routes'

/**
 * Main Component in the React Tree
 * This Render each route of the containers or / and components like 404
 * @class RootApp
 * @extends Component
 */
const RootApp = props => (
  <Switch>
    <GenerateRoutes routes={routes} withNotFound {...props} />
  </Switch>
)

export default withI18n(
  withNotification(RootApp),
)
