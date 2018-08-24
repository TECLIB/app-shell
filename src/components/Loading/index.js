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
import { Spinner, SpinnerSize, Image } from 'office-ui-fabric-react/lib'
import logo from 'assets/images/logo.png'

const Loading = (props) => {
  const loadComponent = props.small
    ? (
      <div
        className="loading"
        style={{
          display: 'inline-block',
          verticalAlign: 'middle',
          margin: '10px',
        }}
      >
        <Spinner
          size={SpinnerSize.small}
        />
      </div>
    )
    : (
      <div
        className="loading"
        style={{
          display: 'flex',
          height: '100%',
          width: '100%',
          justifyContent: 'center',
          textAlign: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        {
          props.logo
            ? (
              <Image
                src={logo}
                width={160}
                alt="Teclib dashboard"
                style={{ marginBottom: '20px' }}
              />)
            : null
        }
        <Spinner
          size={SpinnerSize.large}
          label={props.message || ''}
          styles={props.style}
        />
      </div>
    )
  return loadComponent
}

Loading.defaultProps = {
  style: {
    circle: {
      height: 64,
      width: 64,
      borderWidth: 3,
    },
  },
  logo: false,
  small: false,
  message: '',
}

Loading.propTypes = {
  message: PropTypes.string,
  logo: PropTypes.bool,
  small: PropTypes.bool,
  style: PropTypes.object,
}

export default Loading
