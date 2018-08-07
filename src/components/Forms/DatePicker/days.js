import React from 'react'

/**
 * List of days depending on the month and the year
 * @function days
 * @return {component} List of options for a select
 */
export default (year, month) => {
  const daysList = {
    January: 31,
    February: 28,
    March: 31,
    April: 30,
    May: 31,
    June: 30,
    July: 31,
    August: 31,
    September: 30,
    October: 31,
    November: 30,
    December: 31,
  }

  if (year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0)) {
    daysList.February = 29
  }

  const days = []

  if (month) {
    for (let index = 1; index <= daysList[month]; index += 1) {
      days.push((
        <option value={index} key={`day-${index.toString()}`}>
          { index }
        </option>
      ))
    }
  }

  return days
}
