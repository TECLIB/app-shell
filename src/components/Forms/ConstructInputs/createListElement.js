import React from 'react'
import PropTypes from 'prop-types'
import Select from '../Select'
import DatePicker from '../DatePicker'
import TextFieldForm from '../TextFieldForm'

/**
 * Component to select the type of the form entry
 * @function createListElement
 * @param {string} icon
 * @param {array} elements
 * @param {number} index
 * @return {component} Form entry
 */
const createListElement = ({
  icon,
  elements,
  index,
}) => {
  const style = icon ? {
    marginLeft: 30,
    overflow: 'hidden',
  } : {
    overflow: 'hidden',
  }
  return (
    <div className="froms__row" style={style} key={`fromsRow-${index.toString()}`}>
      {
        elements.map((element) => {
          let renderElement
          if (element.type === 'select') {
            renderElement = (
              <Select
                label={element.label}
                name={element.name}
                value={element.value}
                options={element.options}
                function={element.function}
                glpi={element.glpi}
                request={element.request}
                key={element.name}
              />
            )
          } else if (element.type === 'date') {
            renderElement = (
              <DatePicker
                label={element.label}
                name={element.name}
                value={element.value}
                function={element.function}
                key={element.name}
              />
            )
          } else {
            let isMultiLine = null
            if (element.multiline) {
              isMultiLine = {
                multiline: true,
                rows: element.rows,
              }
            }
            renderElement = (
              <TextFieldForm
                {...isMultiLine}
                label={element.label}
                type={element.type}
                name={element.name}
                value={element.value}
                placeholder={element.placeholder}
                function={element.function}
                disabled={element.disabled}
                styles={element.styles}
                delete={element.delete}
                parametersToEvaluate={element.parametersToEvaluate}
                forceValidation={element.forceValidation}
                key={element.name}
              />
            )
          }
          return renderElement
        })
      }
    </div>
  )
}

createListElement.propTypes = {
  icon: PropTypes.string,
  elements: PropTypes.array.isRequired,
  index: PropTypes.number.isRequired,
}

createListElement.defaultProps = {
  icon: null,
}

export default createListElement
