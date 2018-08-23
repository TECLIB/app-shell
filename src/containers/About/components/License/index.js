import React, {
  PureComponent,
} from 'react'
import ReactMarkdown from 'react-markdown'
import PropTypes from 'prop-types'
import I18n from 'shared/i18n'
import ContentPane from 'components/ContentPane'
import Loading from 'components/Loading'
import EmptyMessage from 'components/EmptyMessage'
import withHandleMessages from 'hoc/withHandleMessages'

/**
 * Component to show the license information
 * @class License
 * @extends PureComponent
 */
class License extends PureComponent {
  /** @constructor */
  constructor(props) {
    super(props)
    this.state = {
      license: undefined,
    }
  }

  /**
   * Get license information
   * @function componentDidMount
   * @async
   */
  componentDidMount = async () => {
    try {
      const response = await fetch('https://raw.githubusercontent.com/TECLIB/app-shell/develop/LICENSE.md')
      this.setState({
        license: await response.text(),
      })
    } catch (error) {
      this.props.toast.setNotification(this.props.handleMessage({
        type: 'alert',
        message: error,
      }))
      this.setState({
        license: 'no data',
      })
    }
  }

  /**
   * Render component
   * @function render
   */
  render() {
    let renderComponent
    if (this.state.license) {
      if (this.state.license === 'no data') {
        renderComponent = (
          <EmptyMessage message={I18n.t('commons.no_data')} />
        )
      } else {
        renderComponent = (
          <ContentPane>
            <h2 style={{ margin: '10px' }}>
              {I18n.t('about.license.title')}
            </h2>
            <div className="about-pane" style={{ margin: '10px' }}>
              <ReactMarkdown source={this.state.license} />
            </div>
          </ContentPane>
        )
      }
    } else {
      renderComponent = (
        <Loading message={`${I18n.t('commons.loading')}...`} />
      )
    }

    return renderComponent
  }
}

/** License propsTypes */
License.propTypes = {
  toast: PropTypes.object.isRequired,
  handleMessage: PropTypes.func.isRequired,
}

export default withHandleMessages(License)
