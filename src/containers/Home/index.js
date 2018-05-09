import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { I18n } from 'react-i18nify'
import withHandleMessages from '../../hoc/withHandleMessages'
import Loading from '../../components/Loading'
import EmptyMessage from '../../components/EmptyMessage'
import ContentPane from '../../components/ContentPane'
import delay from '../../shared/delay'

class Dashboard extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      isLoading: true,
      display: localStorage.getItem('display') ? JSON.parse(localStorage.getItem('display')) : {}
    }
  }

  componentDidMount() {
    delay(2000)
    .then(() => {
      this.setState({
        isLoading: false
      })   
    })
  }

  render() {
    const renderComponent = this.state.isLoading ? <div style={{width: '100%', height: 'calc(100vh - 80px)'}}><Loading message={`${I18n.t('commons.loading')}...`} /></div>:
    (
      <ContentPane>
        <div className="dashboard-block">
            <EmptyMessage message="Teclib Dashboard" showIcon/>
        </div>
      </ContentPane>
    )

    return renderComponent
  }
}

Dashboard.propTypes = {
  history: PropTypes.object.isRequired
}

export default withHandleMessages(Dashboard)
