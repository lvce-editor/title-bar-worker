import * as MenuEntryId from '../MenuEntryId/MenuEntryId.ts'

export const getMenuIds = (): readonly number[] => {
  return [
    MenuEntryId.Edit,
    MenuEntryId.File,
    MenuEntryId.Go,
    MenuEntryId.Help,
    MenuEntryId.Run,
    MenuEntryId.Selection,
    MenuEntryId.Terminal,
    MenuEntryId.TitleBar,
    MenuEntryId.View,
    MenuEntryId.OpenRecent,
  ]
}
