import React from 'react'
import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar'


/**
 * Component with the users section
 * @class ToolBarlist
 * @extends PureComponent
 */
const ToolBarlist = () => (
  <div style={{ width: '100%' }}>
    <CommandBar
      items={
        [
          {
            key: 'newItem',
            name: 'New',
            icon: 'Add',
            ariaLabel: 'New. Use left and right arrow keys to navigate',
            onClick: () => {},
          },
          {
            key: 'upload',
            name: 'Upload',
            icon: 'Upload',
            onClick: () => {},
          },
          {
            key: 'share',
            name: 'Share',
            icon: 'Share',
            onClick: () => {},
          },
        ]
      }
      overflowItems={
        [
          {
            key: 'newItem',
            name: 'Add',
            icon: 'Add',
            ariaLabel: 'New. Use left and right arrow keys to navigate',
            onClick: () => {},
            subMenuProps: {
              items: [
                {
                  key: 'emailMessage',
                  name: 'Email message',
                  icon: 'Mail',
                },
                {
                  key: 'calendarEvent',
                  name: 'Calendar event',
                  icon: 'Calendar',
                },
              ],
            },
          },
          {
            key: 'move',
            name: 'Move to...',
            icon: 'MoveToFolder',
            onClick: () => {},
          },
          {
            key: 'copy',
            name: 'Copy to...',
            icon: 'Copy',
            onClick: () => {},
          },
          {
            key: 'rename',
            name: 'Rename...',
            icon: 'Edit',
            onClick: () => {},
          },
          {
            key: 'disabled',
            name: 'Disabled...',
            icon: 'Cancel',
            disabled: true,
            onClick: () => {},
          },
        ]
      }
      ariaLabel="Use left and right arrow keys to navigate between commands"
    />
  </div>
)

export default ToolBarlist
