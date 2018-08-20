import React, {
    PureComponent,
  } from 'react'
import PropTypes from 'prop-types'
import { TextField } from 'office-ui-fabric-react/lib/TextField'

/**
 * Component to create a custom input
 * @class Input
 * @extends PureComponent
 */
class Input extends PureComponent {
  /** @constructor */
  constructor(props) {
    super(props)
    this.state = {
      isCorrect: true,
      errors: [],
      className: 'win-textbox',
    }
  }
}

export default Input
