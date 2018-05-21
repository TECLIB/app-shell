import React, { PureComponent } from 'react'
import withHandleMessages from '../../hoc/withHandleMessages'
import Loading from '../../components/Loading'
import EmptyMessage from '../../components/EmptyMessage'
import ContentPane from '../../components/ContentPane'
import delay from '../../shared/delay'
import i18n from '../../shared/i18n'

class Dashboard extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
    }
  }

  componentDidMount() {
    delay(2000)
      .then(() => {
        this.setState({
          isLoading: false,
        })
      })
  }

  render() {
    const renderComponent = this.state.isLoading ? <div style={{ width: '100%', height: 'calc(100vh - 80px)' }}><Loading message={`${i18n.t('commons.loading')}...`} /></div> :
      (
        <ContentPane>
          <div className="dashboard-block">
            <EmptyMessage message="Teclib Dashboard" showIcon />
          </div>
        </ContentPane>
      )

    return renderComponent
  }
}

export default withHandleMessages(Dashboard)
