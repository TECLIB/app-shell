/** import dependencies */
import React, {
  PureComponent,
} from 'react'
import PropTypes from 'prop-types'
import LayoutListWithNavLinks from 'components/LayoutListWithNavLinks'
import GenerateRoutes from 'components/GenerateRoutes'
import routes from './routes'

/**
 * About
 * @class
 */
class About extends PureComponent {
  render() {
    return (
      <LayoutListWithNavLinks
        routes={routes}
        rootPath={this.props.match.url}
        history={this.props.history}
        languageCurrent={this.props.languageCurrent}
      >
        <GenerateRoutes routes={routes} rootPath={this.props.match.url} toast={this.props.toast} handleMessage={this.props.handleMessage} />
      </LayoutListWithNavLinks>
    )
  }
}

/** About propTypes */
About.propTypes = {
  toast: PropTypes.object.isRequired,
  handleMessage: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  languageCurrent: PropTypes.string.isRequired,
}

export default About
