import React from 'react'
import monthsList from './monthsList.json'

/**
 * List months of the year
 * @function months
 * @return {component} List of options for a select
 */
export default () => {
  const months = []
  monthsList.forEach((month) => {
    months.push((
      <option value={month} key={`month${month}`}>
        { month }
      </option>
    ))
  })
  return months
}
