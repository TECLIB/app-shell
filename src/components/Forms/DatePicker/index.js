import React, {
  PureComponent,
} from 'react'
import PropTypes from 'prop-types'
import YEARS from './years'
import MONTHS from './months'
import DAYS from './days'
import monthsList from './monthsList.json'

/**
 * Component to create a date picker
 * @class DatePicker
 * @extends PureComponent
 */
class DatePicker extends PureComponent {
  /** @constructor */
  constructor(props) {
    super(props)
    const date = new Date(this.props.value)
    this.state = {
      year: this.props.value ? date.getFullYear() : undefined,
      month: this.props.value ? monthsList[date.getMonth()] : undefined,
      day: this.props.value ? date.getDate() : undefined,
    }
  }

  /**
   * Return the name and value to the father
   * @function change
   * @param {object} eventObject
   */
  change = (eventObject) => {
    const currentDate = new Date()
    const newDate = {
      year: this.state.year ? this.state.year : currentDate.getFullYear(),
      month: this.state.month ? this.state.month : monthsList[currentDate.getMonth()],
      day: this.state.day ? this.state.day : 1,
    }

    newDate[eventObject.target.name] = eventObject.target.value

    this.setState({ ...newDate },
      this.props.function(this.props.name, new Date(`${newDate.year} ${newDate.month} ${newDate.day}`)))
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

        <div className="win-disposable win-datepicker">
          <select
            required={this.props.required}
            className="win-datepicker-month win-order0"
            name="month"
            value={this.state.month}
            onChange={this.change}
          >
            <option>
              ---
            </option>
            { MONTHS() }
          </select>

          <select
            className="win-datepicker-date win-order1"
            name="day"
            value={this.state.day}
            onChange={this.change}
          >
            <option>
              ---
            </option>
            { DAYS(this.state.year, this.state.month) }
          </select>

          <select
            className="win-datepicker-year win-order2"
            name="year"
            value={this.state.year}
            onChange={this.change}
          >
            <option>
              ---
            </option>
            { YEARS() }
          </select>
        </div>
      </div>
    )
  }
}

DatePicker.defaultProps = {
  required: false,
  value: undefined,
}

DatePicker.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  value: PropTypes.instanceOf(Date),
  function: PropTypes.func.isRequired,
  required: PropTypes.bool,
}

export default DatePicker
