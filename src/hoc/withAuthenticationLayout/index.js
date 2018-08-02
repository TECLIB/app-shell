import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import languagesList from 'shared/i18n/languages'
import withI18n from 'hoc/withI18n'
import I18n from 'shared/i18n'
import logo from 'assets/images/logo.png'

/**
 * Wrapper a component with divs's stylizeds
 * With a select input to change language
 * @param {* component} WrappedComponent   - Component to wrapper it
 * @param {* object } stylesConfiguration  - Config styles of wrapper div
 */
const withAuthenticationLayout = (WrappedComponent, configStyles) => {
  class authenticationLayout extends PureComponent {
    constructor(props) {
      super(props)
      this.state = {
        style: {
          textAlign: configStyles.centerContent ? 'center' : null,
          width: props.width,
        },
      }
    }

    render() {
      return (
        <div className="authentication-block " style={this.state.style}>
          <section className="authentication__section">
            <figure className="authentication__figure">
              <img alt="Flyve MDM Dashboard" src={logo} />
            </figure>
            <WrappedComponent {...this.props} />
          </section>
          <footer className="authenticaton__footer">
            <a href="http://teclib-edition.com/en/privacy-policy/">
              {I18n.t('commons.terms_and_conditions')}
            </a>
            <br />
            <span>
© 2018 Teclib&apos;.
            </span>
            <br />
            <select
              onChange={event => this.props.changeLanguage(event.target.value)}
              value={this.props.languageCurrent}
            >
              {languagesList()}
            </select>
          </footer>
        </div>
      )
    }
  }

  authenticationLayout.defaultProps = {
    centerContent: true,
    width: 340,
  }

  authenticationLayout.propTypes = {
    centerContent: PropTypes.bool,
    width: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    languageCurrent: PropTypes.string.isRequired,
    changeLanguage: PropTypes.func.isRequired,
  }

  return withI18n(authenticationLayout)
}

export default withAuthenticationLayout
