import React from 'react'

/**
 * List of years between 1980 and 2100
 * @function years
 * @return {component} List of options for a select
 */
export default () => {
  const years = []
  for (let index = 1980; index <= 2100; index += 1) {
    years.push(
      <option value={index} key={`year${index}`}>
        { index }
      </option>,
    )
  }
  return years
}
