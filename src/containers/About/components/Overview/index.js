/** import dependencies */
import React from 'react'
import I18n from 'shared/i18n'
import ContentPane from 'components/ContentPane'

/**
 * @constant Overview
 * @type {component}
 */
const Overview = () => (
  <ContentPane>
    <h2 style={{ margin: '10px' }}>
      {I18n.t('about.overview.title')}
    </h2>
    <div className="about-pane" style={{ margin: '10px' }}>
      <p>
        {I18n.t('about.overview.description')}
      </p>
    </div>
  </ContentPane>
)

export default Overview
