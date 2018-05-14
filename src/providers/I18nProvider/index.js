import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

const I18nContext = React.createContext()

export const I18nConsumer = I18nContext.Consumer

export class I18nProvider extends PureComponent {
  state = {
    languageDefault: 'en_GB',
    languageCurrent: 'en_GB',
    changeLanguage: (language) => {
      this.setState({
        languageCurrent: language,
      })
    },
    changeLanguageFallBack: () => {
      this.setState({
        languageCurrent: this.state.languageDefault,
      })
    },
  }
  render() {
    return (
      <I18nContext.Provider value={{ state: this.state }}>
        {this.props.children}
      </I18nContext.Provider>
    );
  }
}

I18nProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
  ]).isRequired,
}
