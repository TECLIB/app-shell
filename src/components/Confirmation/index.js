import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import ReactWinJS from 'react-winjs'
import i18n from '../../shared/i18n'

class Confirmation extends PureComponent {
  static isOK = async (contentDialog) => {
    const response = await contentDialog.winControl.show().then(({ result }) => result === 'primary')
    return response
  }

  render() {
    return (
      <ReactWinJS.ContentDialog
        ref={this.props.reference}
        title={this.props.title}
        primaryCommandText={i18n.t('commons.ok')}
        secondaryCommandText={i18n.t('commons.cancel')}
      >
        <p>{this.props.message}</p>
      </ReactWinJS.ContentDialog>
    )
  }
}

Confirmation.propTypes = {
  reference: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
}

export default Confirmation
