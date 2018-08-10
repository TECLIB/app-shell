import React from 'react'
import PropTypes from 'prop-types'
import I18n from 'shared/i18n'
import { Image, Icon } from 'office-ui-fabric-react/lib'
import logo from 'assets/images/logo.png'

const EmptyMessage = props => (
  <div className="center-block-content">
    {
      props.icon && props.showIcon
        ? <Icon iconName={props.icon} className="icon-empty-message" />
        : props.showIcon
          ? (
            <Image
              src={logo}
              alt="Logo Teclib"
              width={160}
            />
          )
          : null
    }
    <h2>
      {props.message}
    </h2>
  </div>
)

EmptyMessage.propTypes = {
  icon: PropTypes.string,
  showIcon: PropTypes.bool,
  message: PropTypes.string,
}

EmptyMessage.defaultProps = {
  icon: '',
  showIcon: false,
  message: I18n.t('commons.no_selection'),
}

export default EmptyMessage
