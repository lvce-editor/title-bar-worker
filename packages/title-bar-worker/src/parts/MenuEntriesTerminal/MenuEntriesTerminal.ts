import type { MenuEntry } from '../MenuEntry/MenuEntry.ts'
import * as I18NString from '../I18NString/I18NString.ts'
import * as MenuEntryId from '../MenuEntryId/MenuEntryId.ts'
import * as MenuItemFlags from '../MenuItemFlags/MenuItemFlags.ts'
import * as UiStrings from '../UiStrings/UiStrings.ts'

export const id = MenuEntryId.Terminal

export const getMenuEntries = (): readonly MenuEntry[] => {
  return [
    {
      args: ['Terminal'],
      command: 'Layout.togglePanel',
      flags: MenuItemFlags.None,
      id: 'newTerminal',
      label: I18NString.i18nString(UiStrings.NewTerminal),
    },
  ]
}
