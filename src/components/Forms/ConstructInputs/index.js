import React from 'react'
import PropTypes from 'prop-types'
import { Icon } from 'office-ui-fabric-react'
import createListElement from './createListElement'

/**
 * Component to create a list of form entries
 * @function ConstructInputs
 * @param {object} props
 * @return {component} List of form entries
 */
const ConstructInputs = (props) => {
  let icon

  if (props.icon) {
    icon = (
      <div className="froms__row froms__row--icon">
        <Icon iconName={props.icon} />
        {
          props.title
            ? (
              <span style={{ marginLeft: '10px' }}>
                {props.title}
              </span>
            )
            : null
        }
      </div>
    )
  }

  return (
    <React.Fragment>
      { icon }
      {
        props.data.map((elements, index) => createListElement({
          icon: props.icon,
          elements,
          index,
        }))
      }
    </React.Fragment>
  )
}

ConstructInputs.propTypes = {
  data: PropTypes.array.isRequired,
  icon: PropTypes.string,
  title: PropTypes.string,
}

ConstructInputs.defaultProps = {
  icon: null,
  title: null,
}

export default ConstructInputs
