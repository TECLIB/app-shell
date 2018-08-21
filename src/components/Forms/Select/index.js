import React, {
  PureComponent,
} from 'react'
import PropTypes from 'prop-types'

/**
 * Component to create a select input
 * @class Select
 * @extends PureComponent
 */
class Select extends PureComponent {
  /** @constructor */
  constructor(props) {
    super(props)
    this.state = {
      options: this.props.options,
    }
  }

  /** Validate the needs of the list of options */
  componentDidMount = () => {
    this.handleRefresh(this.state.options)
  }

  /**
   * Return the name and value to the father
   * @function change
   * @param {object} eventObject
   */
  change = (eventObject) => {
    this.props.function(this.props.name, eventObject.target.value)
  }

  /**
   * Update the list of options
   * @async
   * @function handleRefresh
   */
  handleRefresh = async (options) => {
    const optionsList = []
    options.forEach((element) => {
      if (!element.name) {
        optionsList.push({
          value: element,
          content: element,
        })
      } else {
        optionsList.push({
          value: element.value,
          content: element.name,
        })
      }
    })
    this.setState({
      options: optionsList,
    })
  }

  /**
   * Render component
   * @function render
   */
  render() {
    return (
      <div className="froms__col">
        <p>
          {this.props.label}
        </p>
        <select
          name={this.props.name}
          value={(this.props.value || undefined)}
          onChange={this.change}
          required={this.props.required}
        >
          <option>
            ---
          </option>
          {
            this.state.options.map((element, index) => (
              <option value={element.value} key={`${this.props.name}${index.toString()}`}>
                { element.content }
              </option>
            ))
          }
        </select>
      </div>
    )
  }
}

Select.defaultProps = {
  options: [],
  required: false,
  label: null,
  value: undefined,
}

Select.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  options: PropTypes.array,
  function: PropTypes.func.isRequired,
  required: PropTypes.bool,
}

export default Select
