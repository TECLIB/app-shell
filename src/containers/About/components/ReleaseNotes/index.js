import React, {
  PureComponent,
} from 'react'
import ReactMarkdown from 'react-markdown'
import PropTypes from 'prop-types'
import I18n from 'shared/i18n'
import ContentPane from 'components/ContentPane'
import Loading from 'components/Loading'
import EmptyMessage from 'components/EmptyMessage'

/**
 * Component to show the release notes
 * @class ReleaseNotes
 * @extends PureComponent
 */
class ReleaseNotes extends PureComponent {
  /** @constructor */
  constructor(props) {
    super(props)
    this.state = {
      release: undefined,
    }
  }

  /**
   * Get release notes
   * @function componentDidMount
   * @async
   */
  componentDidMount = async () => {
    try {
      const response = await fetch(
        'https://raw.githubusercontent.com/TECLIB/app-shell/gh-pages/CHANGELOG.md',
      )
      this.setState({
        release: await response.text(),
      })
    } catch (error) {
      this.props.toast.setNotification(this.props.handleMessage({
        type: 'alert',
        message: error,
      }))
      this.setState({
        release: 'no data',
      })
    }
  }

  /**
   * Render component
   * @function render
   */
  render() {
    let renderComponent
    if (this.state.release) {
      if (this.state.release === 'no data') {
        renderComponent = (
          <EmptyMessage message={I18n.t('commons.no_data')} />
        )
      } else {
        renderComponent = (
          <ContentPane>
            <h2 style={{ margin: '10px' }}>
              {I18n.t('about.release_notes.title')}
            </h2>
            <div className="about-pane" style={{ margin: '10px' }}>
              <ReactMarkdown source={this.state.release} />
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

/** ReleaseNotes propsTypes */
ReleaseNotes.propTypes = {
  toast: PropTypes.object.isRequired,
  handleMessage: PropTypes.func.isRequired,
}

export default ReleaseNotes
