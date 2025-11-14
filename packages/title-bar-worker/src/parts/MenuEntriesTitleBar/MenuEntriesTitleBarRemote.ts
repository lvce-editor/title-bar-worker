import type { MenuEntry } from '../MenuEntry/MenuEntry.ts'
import * as MenuEntryId from '../MenuEntryId/MenuEntryId.ts'
import * as MenuItemFlags from '../MenuItemFlags/MenuItemFlags.ts'
import * as ViewletTitleBarStrings from '../TitleBarStrings/TitleBarStrings.ts'

export const getMenuEntries = (): readonly MenuEntry[] => {
  return [
    {
      id: MenuEntryId.File,
      label: ViewletTitleBarStrings.file(),
      flags: MenuItemFlags.SubMenu,
      command: '',
    },
    {
      id: MenuEntryId.Edit,
      label: ViewletTitleBarStrings.edit(),
      flags: MenuItemFlags.SubMenu,
      command: '',
    },
    {
      id: MenuEntryId.Selection,
      label: ViewletTitleBarStrings.selection(),
      flags: MenuItemFlags.SubMenu,
      command: '',
    },
    {
      id: MenuEntryId.View,
      label: ViewletTitleBarStrings.view(),
      flags: MenuItemFlags.SubMenu,
      command: '',
    },
    {
      id: MenuEntryId.Go,
      label: ViewletTitleBarStrings.go(),
      flags: MenuItemFlags.SubMenu,
      command: '',
    },
    {
      id: MenuEntryId.Run,
      label: ViewletTitleBarStrings.run(),
      keyboardShortCut: 'Alt+r',
      flags: MenuItemFlags.SubMenu,
      command: '',
    },
    {
      id: MenuEntryId.Terminal,
      label: ViewletTitleBarStrings.terminal(),
      keyboardShortCut: 'Alt+t',
      flags: MenuItemFlags.SubMenu,
      command: '',
    },
    {
      id: MenuEntryId.Help,
      label: ViewletTitleBarStrings.help(),
      keyboardShortCut: 'Alt+h',
      flags: MenuItemFlags.SubMenu,
      command: '',
    },
  ]
}
