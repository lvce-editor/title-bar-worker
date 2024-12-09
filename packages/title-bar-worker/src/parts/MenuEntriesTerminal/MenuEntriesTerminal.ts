import * as MenuItemFlags from '../MenuItemFlags/MenuItemFlags.ts'
import * as TerminalStrings from '../TerminalStrings/TerminalStrings.js'
import * as MenuEntryId from '../MenuEntryId/MenuEntryId.ts'

export const id = MenuEntryId.Terminal

export const getMenuEntries = () => {
  return [
    {
      id: 'newTerminal',
      label: TerminalStrings.newTerminal(),
      flags: MenuItemFlags.None,
      command: 'Layout.togglePanel',
      args: ['Terminal'],
    },
  ]
}
