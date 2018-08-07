import React, {
  PureComponent,
} from 'react'
import {
  Link,
} from 'react-router-dom'
import publicURL from 'shared/publicURL'
import I18n from 'shared/i18n'
import withAuthenticationLayout from 'hoc/withAuthenticationLayout'
import withHandleMessages from 'hoc/withHandleMessages'
import Loading from 'components/Loading'

/**
 * Component with page of 'validate account'
 * @class ValidateAccount
 * @extends PureComponent
 */
class ValidateAccount extends PureComponent {
  /** @constructor */
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
    }
  }

  /**
   * Render component
   * @function render
   */
  render() {
    let renderComponent
    if (this.state.isLoading) {
      renderComponent = (
        <div style={{ height: '140px' }}>
          <Loading message={`${I18n.t('commons.loading')}...`} />
        </div>
      )
    } else {
      renderComponent = (
        <React.Fragment>
          <h2>
            {I18n.t('validate_account.title')}
          </h2>
          <p>
            {I18n.t('validate_account.is_validated')}
            <br />
          </p>
          <p>
            <Link to={`${publicURL}/`}>
              {I18n.t('commons.sign_in')}
            </Link>
          </p>
        </React.Fragment>
      )
    }
    return renderComponent
  }
}

export default withAuthenticationLayout(withHandleMessages(ValidateAccount), {
  centerContent: true,
})
