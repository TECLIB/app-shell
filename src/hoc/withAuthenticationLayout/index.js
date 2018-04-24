import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { I18n } from 'react-i18nify'
import { changeLanguage } from '../../store/i18n/actions'

function mapDispatchToProps(dispatch) {
    return { 
        changeLanguage: bindActionCreators(changeLanguage, dispatch) 
    }
}

/**
 * Wrapper a component with divs's stylizeds
 * With a select input to change language
 * @param {* component} WrappedComponent   - Component to wrapper it
 * @param {* object } stylesConfiguration  - Config styles of wrapper div
 */
const withAuthenticationLayout = (WrappedComponent, configStyles) => {
    const authenticationLayout = props => {
        const style = {
            textAlign: configStyles.centerContent ? 'center' : null,
            width: props.width
        }

        return (
            <div className="authentication-block " style={style} >
                <section className="authentication__section">
                    <figure className="authentication__figure">
                        <img alt="Flyve MDM Dashboard" src={require('../../assets/images/logo.png')} />
                    </figure>
                    <WrappedComponent {...props} />
                </section>
                <footer className="authenticaton__footer">
                    <a href="http://teclib-edition.com/en/privacy-policy/">
                        {I18n.t('commons.terms_and_conditions')}
                    </a>
                    <br />
                    <span>
                        © 2018 Teclib'.
                    </span>
                    <br/>
                    <select onChange={
                        event => props.changeLanguage(event.target.value)
                    }>
                        <option value='en_GB'>
                            {I18n.t('commons.english')}
                        </option>
                        <option value='pt_BR'>
                            {I18n.t('commons.portuguese')}
                        </option>
                        <option value='fr_FR'>
                            {I18n.t('commons.french')}
                        </option>
                        <option value='es_ES'>
                            {I18n.t('commons.spanish')}
                        </option>
                    </select>
                </footer>
            </div>
        )
    }

    authenticationLayout.defaultProps = {
        centerContent: true,
        width: 340
    }
    
    authenticationLayout.propTypes = {
        centerContent: PropTypes.bool.isRequired,
        width: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]).isRequired
    }

    return connect(null, mapDispatchToProps)(authenticationLayout)
}



export default withAuthenticationLayout