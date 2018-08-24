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

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { TextField } from 'office-ui-fabric-react/lib/TextField'
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button'
import I18n from 'shared/i18n'
import publicURL from 'shared/publicURL'


class UsernameFieldset extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      errorMessage: '',
    }
  }

  componentDidMount() {
    this.usernameInput.focus()
  }

  LogInServer = (e) => {
    e.preventDefault()
    if (this.props.username) {
      this.props.changePhase(2)
    } else {
      this.setState({
        errorMessage: (
          <p className="color-type-alert">
            <span>
              {' '}
              {I18n.t('login.username_not_registered')}
              {' '}
            </span>
            <a href="/">
              {I18n.t('login.create_an_new')}
            </a>
          </p>
        ),
      })
    }
  }

  styleTextField = () => (
    {
      fieldGroup: [
        {
          selectors: {
            ':after': {
              content: "''",
            },
          },
        },
      ],
    }
  )

  render() {
    return (
      <div className="authentication-email__div">
        <h2>
          {I18n.t('login.title')}
        </h2>
        <p className="paragraph__p --description">
          {I18n.t('login.use_your_account')}
          <br />
          <a href="https://flyve-mdm.com/">
            {I18n.t('login.what_is_this')}
          </a>
        </p>

        {this.state.errorMessage}

        <form onSubmit={this.LogInServer}>
          <TextField
            type="text"
            componentRef={(input) => { this.usernameInput = input }}
            placeholder={I18n.t('commons.username')}
            value={this.props.username}
            onChanged={() => this.props.changeInput({ name: 'username', value: this.usernameInput.value.trim() })}
            required
            styles={this.styleTextField()}
          />
          <br />
          <PrimaryButton type="submit" className="btn">
            {I18n.t('commons.next')}
          </PrimaryButton>
        </form>
        <p>
          {I18n.t('login.no_account')}
          &nbsp;
          <Link to={`${publicURL}/signUp`}>
            {I18n.t('login.create_one')}
          </Link>
        </p>
      </div>
    )
  }
}

UsernameFieldset.propTypes = {
  username: PropTypes.string.isRequired,
  changeInput: PropTypes.func.isRequired,
  changePhase: PropTypes.func.isRequired,
}

export default UsernameFieldset
