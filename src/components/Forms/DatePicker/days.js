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
