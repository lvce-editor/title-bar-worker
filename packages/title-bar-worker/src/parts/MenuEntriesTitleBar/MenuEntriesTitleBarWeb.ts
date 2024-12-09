import * as MenuEntryId from '../MenuEntryId/MenuEntryId.ts'
import * as MenuItemFlags from '../MenuItemFlags/MenuItemFlags.ts'
import * as ViewletTitleBarStrings from '../ViewletTitleBar/ViewletTitleBarStrings.ts'

export const getMenuEntries = (): any => {
  return [
    {
      id: MenuEntryId.File,
      label: ViewletTitleBarStrings.file(),
      flags: MenuItemFlags.None,
    },
    {
      id: MenuEntryId.Edit,
      label: ViewletTitleBarStrings.edit(),
      flags: MenuItemFlags.None,
    },
    {
      id: MenuEntryId.Selection,
      label: ViewletTitleBarStrings.selection(),
      flags: MenuItemFlags.None,
    },
    {
      id: MenuEntryId.View,
      label: ViewletTitleBarStrings.view(),
      flags: MenuItemFlags.None,
    },
    {
      id: MenuEntryId.Go,
      label: ViewletTitleBarStrings.go(),
      flags: MenuItemFlags.None,
    },
    {
      id: MenuEntryId.Help,
      label: ViewletTitleBarStrings.help(),
      flags: MenuItemFlags.None,
    },
  ]
}
