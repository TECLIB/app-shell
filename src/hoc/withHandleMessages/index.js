import React, {
  PureComponent,
} from 'react'
import handleMessage from 'shared/handleMessage'

/**
 * Wrapper component to pass to the props the 'handleMessage' function
 * @param {component} WrappedComponent Component to wrap
 * @return {component} The component with the message function
 */
const withHandleMessages = (WrappedComponent) => {
  class HandleMessages extends PureComponent {
    /**
     * Render component
     * @function render
     */
    render() {
      return <WrappedComponent handleMessage={handleMessage} {...this.props} />
    }
  }

  return HandleMessages
}

export default withHandleMessages
