import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import withI18n from '../withI18n'
import i18n from '../../shared/i18n'
import logo from '../../assets/images/logo.png'

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
        <div className="authentication-block " style={this.state.style} >
          <section className="authentication__section">
            <figure className="authentication__figure">
              <img alt="Flyve MDM Dashboard" src={logo} />
            </figure>
            <WrappedComponent {...this.props} />
          </section>
          <footer className="authenticaton__footer">
            <a href="http://teclib-edition.com/en/privacy-policy/">
              {i18n.t('commons.terms_and_conditions')}
            </a>
            <br />
            <span>© 2018 Teclib&apos;.</span>
            <br />
            <select onChange={event => this.props.changeLanguage(event.target.value)}>
              <option value="en_GB">
                {i18n.t('commons.english')}
              </option>
              <option value="pt_BR">
                {i18n.t('commons.portuguese')}
              </option>
              <option value="fr_FR">
                {i18n.t('commons.french')}
              </option>
              <option value="es_ES">
                {i18n.t('commons.spanish')}
              </option>
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
    changeLanguage: PropTypes.func.isRequired,
  }

  return withI18n(authenticationLayout)
}

export default withAuthenticationLayout
