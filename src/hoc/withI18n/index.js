import React from 'react'
import { I18nConsumer } from '../../providers/I18nProvider'

const withI18n = WrappedComponent => {
  const i18n = props => {

    return (
      <I18nConsumer>
        {(value) => <WrappedComponent {...props} language={value.state} />}
      </I18nConsumer>
    )
  }

  return i18n
}

export default withI18n
