/*
 *  LICENSE
 *
 *  This file is part of app-shell
 *
 *  app-shell is a subproject of Teclib.
 *
 *  app-shell is free software: you can redistribute it and/or
 *  modify it under the terms of the GNU General Public License
 *  as published by the Free Software Foundation; either version 3
 *  of the License, or (at your option) any later version.
 *
 *  app-shell is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *  ------------------------------------------------------------------------------
 *  @author     Hector Rondon (hrondon@teclib.com)
 *  @copyright  Copyright © 2018 Teclib. All rights reserved.
 *  @license    GPLv3 https://www.gnu.org/licenses/gpl-3.0.html
 *  @link       https://github.com/TECLIB/app-shell
 *  @link       https://teclib.github.io/app-shell
 *  @link       https://teclib-edition.com/en
 *  ------------------------------------------------------------------------------
 */

import React from 'react'
import PropTypes from 'prop-types'
import DropdownForm from '../DropdownForm'
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
          if (element.type === 'dropdown') {
            renderElement = (
              <DropdownForm
                label={element.label}
                name={element.name}
                value={element.value}
                options={element.options}
                function={element.function}
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
