import React from 'react'
import PropTypes from 'prop-types'
import { I18n } from 'react-i18nify'

const EmptyMessage = props => (
  <div className="center-block-content">
    {props.icon && props.showIcon ? <span className={`icon-empty-message${props.icon}`} /> : props.showIcon ? <img src="logo.png" alt="Logo" /> : null}
    <h1 className="win-h1 empty-message">
      {props.message}
    </h1>
  </div>
)

EmptyMessage.propTypes = {
  icon: PropTypes.string,
  showIcon: PropTypes.bool,
  message: PropTypes.string.isRequired,
}

EmptyMessage.defaultProps = {
  showIcon: false,
  message: I18n.t('commons.no_selection'),
}

export default EmptyMessage
