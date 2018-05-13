import React, { PureComponent } from 'react'
import { I18n } from 'react-i18nify'
import { withRouter } from 'react-router'
import withI18n from '../withI18n'

import sourceFileTranslation from './i18n/source_file.json'

/**
 * Translations HOC
 * @param {*} WrappedComponent -> React Component
 */
const withI18NTranslation = (WrappedComponent) => {
  class I18NTranslation extends PureComponent {
    constructor(props) {
      super(props)
      I18n.setTranslations({
        [this.props.language.languageDefault]: sourceFileTranslation,
      })
    }

    componentDidMount() {
      this.findI18NString(this.props.language.languageCurrent)
    }

    componentDidUpdate(prevProps) {
      if (this.props.language.languageCurrent !== prevProps.language.languageCurrent) {
        this.findI18NString(this.props.language.languageCurrent)
      }
    }

    /**
    * @param {*} i18nConvention -> String, e.g: 'pt_BR'
    */
    findI18NString = (i18nConvention) => {
      const path = i18nConvention === this.props.language.languageDefault
        ? './i18n/source_file'
        : `./i18n/translations/${i18nConvention}`

      import(`${path}.json`)
        .then((jsonModule) => {
          I18n.setTranslations({
            [i18nConvention]: jsonModule,
          })
          I18n.setLocale(i18nConvention)
          this.forceUpdate()
        }).catch(() => {
          I18n.setTranslations(this.props.language.languageDefault)
          this.forceUpdate()
        })
    }

    render() {
      return <WrappedComponent {...this.props} />
    }
  }

  return withI18n(withRouter(I18NTranslation))
}

export default withI18NTranslation
