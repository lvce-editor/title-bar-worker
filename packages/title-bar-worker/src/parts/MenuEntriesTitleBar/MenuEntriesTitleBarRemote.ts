import type { MenuEntry } from '../MenuEntry/MenuEntry.ts'
import * as MenuEntryId from '../MenuEntryId/MenuEntryId.ts'
import * as MenuItemFlags from '../MenuItemFlags/MenuItemFlags.ts'
import * as ViewletTitleBarStrings from '../TitleBarStrings/TitleBarStrings.ts'

export const getMenuEntries = (): readonly MenuEntry[] => {
  return [
    {
      command: '',
      flags: MenuItemFlags.SubMenu,
      id: MenuEntryId.File,
      label: ViewletTitleBarStrings.file(),
    },
    {
      command: '',
      flags: MenuItemFlags.SubMenu,
      id: MenuEntryId.Edit,
      label: ViewletTitleBarStrings.edit(),
    },
    {
      command: '',
      flags: MenuItemFlags.SubMenu,
      id: MenuEntryId.Selection,
      label: ViewletTitleBarStrings.selection(),
    },
    {
      command: '',
      flags: MenuItemFlags.SubMenu,
      id: MenuEntryId.View,
      label: ViewletTitleBarStrings.view(),
    },
    {
      command: '',
      flags: MenuItemFlags.SubMenu,
      id: MenuEntryId.Go,
      label: ViewletTitleBarStrings.go(),
    },
    {
      command: '',
      flags: MenuItemFlags.SubMenu,
      id: MenuEntryId.Run,
      keyboardShortCut: 'Alt+r',
      label: ViewletTitleBarStrings.run(),
    },
    {
      command: '',
      flags: MenuItemFlags.SubMenu,
      id: MenuEntryId.Terminal,
      keyboardShortCut: 'Alt+t',
      label: ViewletTitleBarStrings.terminal(),
    },
    {
      command: '',
      flags: MenuItemFlags.SubMenu,
      id: MenuEntryId.Help,
      keyboardShortCut: 'Alt+h',
      label: ViewletTitleBarStrings.help(),
    },
  ]
}
