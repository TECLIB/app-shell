import React from 'react'
import PropTypes from 'prop-types'
import { Spinner, SpinnerSize } from 'office-ui-fabric-react'

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
        <Spinner
          size={SpinnerSize.large}
          label={props.message}
          styles={props.style}
        />
      </div>
    )
  return loadComponent
}

Loading.defaultProps = {
  style: {
    circle: {
      height: 40,
      width: 40,
      borderWidth: 2,
    },
  },
  small: false,
  message: '',
}

Loading.propTypes = {
  message: PropTypes.string,
  small: PropTypes.bool,
  style: PropTypes.object,
}

export default Loading
