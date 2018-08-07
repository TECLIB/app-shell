import React from 'react'
import PropTypes from 'prop-types'

/**
 * Component to create a textArea input
 * @function TextArea
 * @param {object} props
 * @return {component}
 */
const TextArea = props => (
  <div className="froms__col">
    <p>
      {props.label}
    </p>
    <textarea
      rows={props.rows}
      className="win-textarea"
      name={props.name}
      value={(props.value || undefined)}
      placeholder={props.placeholder}
      onChange={event => props.function(props.name, event.target.value)}
      disabled={props.disabled}
      style={props.style}
      required={props.required}
    />
  </div>
)

TextArea.defaultProps = {
  label: '',
  required: false,
  rows: 6,
  placeholder: null,
  function: () => {},
  style: {},
  disabled: false,
  value: undefined,
}

TextArea.propTypes = {
  label: PropTypes.string,
  name: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  function: PropTypes.func,
  disabled: PropTypes.bool,
  style: PropTypes.object,
  required: PropTypes.bool,
  rows: PropTypes.number,
}

export default TextArea
