import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Persona, PersonaSize, PersonaPresence } from 'office-ui-fabric-react/lib/Persona'

export default class ContactItemList extends PureComponent {
  render() {
    const dataPersona = {
      text: this.props.itemList.name,
      secondaryText: this.props.itemList.name,
    }

    return (
      <Persona
        {...dataPersona}
        size={PersonaSize.size32}
        presence={PersonaPresence.online}
        showSecondaryText
      />
    )
  }
}
ContactItemList.propTypes = {
  itemList: PropTypes.object.isRequired,
}
