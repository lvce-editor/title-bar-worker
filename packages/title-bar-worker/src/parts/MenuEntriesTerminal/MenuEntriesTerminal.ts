import type { MenuEntry } from '../MenuEntry/MenuEntry.ts'
import * as MenuEntryId from '../MenuEntryId/MenuEntryId.ts'
import * as MenuItemFlags from '../MenuItemFlags/MenuItemFlags.ts'
import * as TerminalStrings from '../TerminalStrings/TerminalStrings.ts'

export const id = MenuEntryId.Terminal

export const getMenuEntries = (): readonly MenuEntry[] => {
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
