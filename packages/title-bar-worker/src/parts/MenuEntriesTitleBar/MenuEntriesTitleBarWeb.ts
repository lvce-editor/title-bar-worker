import type { MenuEntry } from '../MenuEntry/MenuEntry.ts'
import * as MenuEntryId from '../MenuEntryId/MenuEntryId.ts'
import * as MenuItemFlags from '../MenuItemFlags/MenuItemFlags.ts'
import * as ViewletTitleBarStrings from '../TitleBarStrings/TitleBarStrings.ts'

export const getMenuEntries = (): readonly MenuEntry[] => {
  return [
    {
      command: '',
      flags: MenuItemFlags.None,
      id: MenuEntryId.File,
      label: ViewletTitleBarStrings.file(),
    },
    {
      command: '',
      flags: MenuItemFlags.None,
      id: MenuEntryId.Edit,
      label: ViewletTitleBarStrings.edit(),
    },
    {
      command: '',
      flags: MenuItemFlags.None,
      id: MenuEntryId.Selection,
      label: ViewletTitleBarStrings.selection(),
    },
    {
      command: '',
      flags: MenuItemFlags.None,
      id: MenuEntryId.View,
      label: ViewletTitleBarStrings.view(),
    },
    {
      command: '',
      flags: MenuItemFlags.None,
      id: MenuEntryId.Go,
      label: ViewletTitleBarStrings.go(),
    },
    {
      command: '',
      flags: MenuItemFlags.None,
      id: MenuEntryId.Help,
      label: ViewletTitleBarStrings.help(),
    },
  ]
}
