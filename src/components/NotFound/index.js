import React from 'react'
import I18n from 'shared/i18n'
import logo from 'assets/images/logo.png'

const NotFound = () => (
  <div className="authentication-block " style={{ textAlign: 'center' }}>
    <section className="authentication__section">
      <figure className="authentication__figure">
        <img alt="App Shell" src={logo} />
      </figure>
      <h1>
        {I18n.t('commons.not_found')}
      </h1>
      <h1>
404
      </h1>
    </section>
    <footer className="authenticaton__footer">
      <a href="https://flyve-mdm.com/privacy-policy/">
        {I18n.t('commons.terms_and_conditions')}
      </a>
      <br />
      <span>
© 2017 - 2018 Teclib&apos;.
      </span>
      <br />
    </footer>
  </div>
)

export default NotFound
