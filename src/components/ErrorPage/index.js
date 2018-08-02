import React from 'react'
import history from 'shared/history'
import getQueryString from 'shared/getQueryString'
import I18n from 'shared/i18n'
import logo from 'assets/images/logo.png'

/**
 * Component with the display of the error pages
 * @function ErrorPage
 * @return {component}
 */
export default () => {
  /** Get the error type of the query string 'code' (by default '404'). */
  let errorCode = getQueryString(history).code
  if (errorCode !== '400' && errorCode !== '401' && errorCode !== '403' && errorCode !== '404' && errorCode !== '500') {
    errorCode = '404'
  }
  const title = I18n.t(`error.${errorCode}.title`)
  const message = I18n.t(`error.${errorCode}.message`)
  const path = history.location.pathname.split('/')

  if (errorCode !== 404 && errorCode < 500 && path[1] === 'app') {
    return (
      <div
        className="empty-message"
        style={{ width: '100%' }}
      >
        <div style={{ width: '320px', margin: '0 auto' }}>
          <figure>
            <img
              alt="Flyve MDM Dashboard"
              src={logo}
              style={{
                width: '80px',
              }}
            />
          </figure>
          <h1>
            {title}
          </h1>
          <p>
            {message}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="authentication error" style={{ textAlign: 'center' }}>
      <section>
        <figure>
          <img
            alt="Flyve MDM Dashboard"
            src={logo}
          />
        </figure>
        <h1>
          {I18n.t('commons.error')}
          {' '}
          {errorCode}
        </h1>
        <h3>
          {title}
        </h3>
        <p>
          {message}
        </p>
      </section>
      <footer>
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
}
