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
