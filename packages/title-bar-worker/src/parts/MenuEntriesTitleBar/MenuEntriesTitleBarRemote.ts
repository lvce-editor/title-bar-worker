import * as MenuEntryId from '../MenuEntryId/MenuEntryId.ts'
import * as MenuItemFlags from '../MenuItemFlags/MenuItemFlags.ts'
import * as ViewletTitleBarStrings from '../TitleBarStrings/TitleBarStrings.ts'

export const getMenuEntries = (): any => {
  return [
    {
      id: MenuEntryId.File,
      label: ViewletTitleBarStrings.file(),
      flags: MenuItemFlags.SubMenu,
    },
    {
      id: MenuEntryId.Edit,
      label: ViewletTitleBarStrings.edit(),
      flags: MenuItemFlags.SubMenu,
    },
    {
      id: MenuEntryId.Selection,
      label: ViewletTitleBarStrings.selection(),
      flags: MenuItemFlags.SubMenu,
    },
    {
      id: MenuEntryId.View,
      label: ViewletTitleBarStrings.view(),
      flags: MenuItemFlags.SubMenu,
    },
    {
      id: MenuEntryId.Go,
      label: ViewletTitleBarStrings.go(),
      flags: MenuItemFlags.SubMenu,
    },
    {
      id: MenuEntryId.Run,
      label: ViewletTitleBarStrings.run(),
      keyboardShortCut: 'Alt+r',
      flags: MenuItemFlags.SubMenu,
    },
    {
      id: MenuEntryId.Terminal,
      label: ViewletTitleBarStrings.terminal(),
      keyboardShortCut: 'Alt+t',
      flags: MenuItemFlags.SubMenu,
    },
    {
      id: MenuEntryId.Help,
      label: ViewletTitleBarStrings.help(),
      keyboardShortCut: 'Alt+h',
      flags: MenuItemFlags.SubMenu,
    },
  ]
}
