import React, { Children, Component } from 'react'
import PropTypes from 'prop-types'
import i18n from '../../shared/i18n'

const I18nContext = React.createContext()
export const I18nConsumer = I18nContext.Consumer

export class I18nProvider extends Component {
  constructor(props) {
    super(props)
    this.state = {
      languageCurrent: i18n.languageCurrent,
      changeLanguage: this.changeLanguage,
      changeLanguageFallBack: this.changeLanguageFallBack,
    }
  }

  changeLanguage = (language = i18n.languageDefault) => {
    i18n.setPolyglot(language)
    this.setState({ languageCurrent: language })
  }

  changeLanguageFallBack = () => {
    i18n.setPolyglot(i18n.languageDefault)
    this.setState({
      languageCurrent: i18n.languageDefault,
    })
  }

  render() {
    const context = { ...this.state }
    return Children.only(<I18nContext.Provider value={{ ...context }}>{this.props.children}</I18nContext.Provider>)
  }
}

I18nProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
  ]).isRequired,
}
