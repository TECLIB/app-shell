import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import handleMessage from '../../shared/handleMessage'

/**
 *
 * @param { React Component } WrappedComponent
 *
 */

const withHandleMessages = WrappedComponent => {
  class HandleMessages extends PureComponent {
    render() {
      return <WrappedComponent {...this.props} />
    }
  }

  HandleMessages.defaultProps = {
    handleMessage: handleMessage,
  }

  HandleMessages.propTypes = {
    history: PropTypes.object.isRequired,
  }

  return HandleMessages
}

export default withHandleMessages
