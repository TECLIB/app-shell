/** import dependencies */
import React, {
  PureComponent,
} from 'react'
import PropTypes from 'prop-types'
import LayoutListWithNavLinks from 'components/LayoutListWithNavLinks'
import GenerateRoutes from 'components/GenerateRoutes'
import routes from './routes'

/**
 * Component with the settings section
 * @class Settings
 * @extends PureComponent
 */
class Settings extends PureComponent {
  /**
   * Render component
   * @function render
   */
  render() {
    return (
      <LayoutListWithNavLinks
        routes={routes}
        rootPath={this.props.match.url}
        history={this.props.history}
        languageCurrent={this.props.languageCurrent}
      >
        <GenerateRoutes
          routes={routes}
          rootPath={this.props.match.url}
          toast={this.props.toast}
          handleMessage={this.props.handleMessage}
          changeLanguage={this.props.changeLanguage}
          languageCurrent={this.props.languageCurrent}
        />
      </LayoutListWithNavLinks>
    )
  }
}

Settings.propTypes = {
  toast: PropTypes.shape({
    setNotification: PropTypes.func,
  }).isRequired,
  handleMessage: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  changeLanguage: PropTypes.func.isRequired,
  languageCurrent: PropTypes.string.isRequired,
}

export default Settings
