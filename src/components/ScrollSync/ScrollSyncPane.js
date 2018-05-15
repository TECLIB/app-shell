import React, { Children, PureComponent } from 'react'
import PropTypes from 'prop-types'

class ScrollSyncPane extends PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
    attachTo: PropTypes.object,
    group: PropTypes.string,
  }

  static defaultProps = {
    group: 'default',
    attachTo: null,
  }

  static contextTypes = {
    registerPane: PropTypes.func.isRequired,
    unregisterPane: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.node = this.props.attachTo || this.child
    this.context.registerPane(this.node, this.props.group)
  }

  componentDidUpdate(prevProps) {
    if (this.props.group !== prevProps.group) {
      this.context.unregisterPane(this.node, prevProps.group)
      this.context.registerPane(this.node, this.props.group)
    }
  }

  componentWillUnmount() {
    this.context.unregisterPane(this.node, this.props.group)
  }

  render() {
    return (
      <React.Fragment>
        {Children.map(this.props.children, element => React.cloneElement(element, { ref: (idx) => { this.child = idx } }))}
      </React.Fragment>
    )
  }
}

export default ScrollSyncPane
