import React, {
  PureComponent,
} from 'react'
import PropTypes from 'prop-types'
import { Dropdown } from 'office-ui-fabric-react/lib/Dropdown'

/**
 * Component to create a select input
 * @class DropdownForm
 * @extends PureComponent
 */
class DropdownForm extends PureComponent {
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

  buildOptions = () => {
    const list = []
    this.state.options.map((element, index) => (
      list.push({
        key: `${this.props.name}${index.toString()}`,
        value: element.value,
        text: element.content,
      })
    ))
    return list
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
        <Dropdown
          label={this.props.label}
          name={this.props.name}
          placeHolder="---"
          onChanged={this.change}
          selectedKey={(this.props.value || undefined)}
          options={this.buildOptions()}
          calloutProps={{ directionalHintFixed: false }}
        />
      </div>
    )
  }
}

DropdownForm.defaultProps = {
  options: [],
  label: null,
  value: undefined,
}

DropdownForm.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  options: PropTypes.array,
  function: PropTypes.func.isRequired,
}

export default DropdownForm
