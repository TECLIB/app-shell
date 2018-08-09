import React from 'react'
import PropTypes from 'prop-types'
import GenerateRoutes from 'components/GenerateRoutes'
import withAdminDashboardLayout from 'hoc/withAdminAppLayout'
import withHandleMessages from 'hoc/withHandleMessages'
import withConfirmation from 'hoc/withConfirmation'
import routes from './routes'

/**
 * Represents internal routes
 * @class AdminDashboard
 * @extends Component
 */
const AdminApp = props => (
  <GenerateRoutes
    routes={routes}
    rootPath={props.match.url}
    toast={props.toast}
    confirmation={props.confirmation}
    handleMessage={props.handleMessage}
    changeLanguage={props.changeLanguage}
    languageCurrent={props.languageCurrent}
  />
)

AdminApp.propTypes = {
  toast: PropTypes.object.isRequired,
  confirmation: PropTypes.object.isRequired,
  match: PropTypes.shape({
    url: PropTypes.string,
  }).isRequired,
  handleMessage: PropTypes.func.isRequired,
  changeLanguage: PropTypes.func.isRequired,
  languageCurrent: PropTypes.string.isRequired,
}

export default withConfirmation(withAdminDashboardLayout(withHandleMessages(AdminApp)))
