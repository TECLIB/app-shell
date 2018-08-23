/** import dependencies */
import React from 'react'
import { Icon } from 'office-ui-fabric-react'
import I18n from 'shared/i18n'
import ContentPane from 'components/ContentPane'
import logo from 'assets/images/logo-teclib.png'

/**
 * Contant information
 * @constant Contant
 * @type {component}
 */
const Contact = () => (
  <ContentPane>
    <h2 style={{ margin: '10px' }}>
      {I18n.t('about.contact.title')}
    </h2>
    <div className="about-pane" style={{ margin: '10px' }}>
      {/* eslint-disable global-require */}
      <img src={logo} alt="Teclib" />
      <p>
        {I18n.t('about.contact.description')}
      </p>
      <div className="separator" />
      <div className="content-info">
        <ul className="contact-list">
          <li>
            <Icon iconName="Mail" />
            <div>
              <div>
                {I18n.t('commons.email')}
              </div>
              <a href="mailto:contact@teclib.com">
                contact@teclib.com
              </a>
            </div>
          </li>
          <li>
            <Icon iconName="Phone" />
            <div>
              <div>
                {I18n.t('commons.call')}
              </div>
              <a href="tel:+34512702140">
                +34512702140
              </a>
            </div>
          </li>
          <li>
            <Icon iconName="MapPin" />
            <div>
              <div>
                {I18n.t('commons.map')}
              </div>
              <a href="https://goo.gl/maps/qDijeVyCUwq">
                Barcelona,
                {' '}
                {I18n.t('commons.Spain')}
              </a>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </ContentPane>
)

export default Contact
