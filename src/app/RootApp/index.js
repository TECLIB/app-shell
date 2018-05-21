import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Switch } from 'react-router-dom'
import withToastNotification from '../../hoc/withToastNotification'
import GenerateRoutes from '../../components/GenerateRoutes'
import routes from './routes'

/**
 * Main Component in the React Tree
 * This Render each route of the containers or / and components like 404
 * TODO: Use PrivateRoute if the `private attribute of route is true
 */
class RootApp extends PureComponent {
  render() {
    return (
      <Switch>
        <GenerateRoutes routes={routes} withNotFound {...this.props} />
      </Switch>
    )
  }
}

RootApp.propTypes = {
  toast: PropTypes.object.isRequired,
}

export default withToastNotification(RootApp)
