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
