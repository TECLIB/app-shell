import React, {
  PureComponent,
} from 'react'

/**
 * Import a component asynchronously
 * @param {function} importComponent
 * @return {component} The imported component
 */
const withAsyncComponent = importComponent => class AsyncComponent extends PureComponent {
    state = {
      component: null,
    }

    /** Import the component */
    componentDidMount() {
      importComponent()
        .then((cmp) => {
          this.setState({
            component: cmp.default,
          })
        })
    }

    /**
     * Render component
     * @function render
     */
    render() {
      const C = this.state.component

      return C ? <C {...this.props} /> : null
    }
}

export default withAsyncComponent
