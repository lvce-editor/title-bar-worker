import { MenuEntryId } from '@lvce-editor/constants'

export const MenuIdTitleBarContextMenu = 50

export const getMenuIds = (): readonly number[] => {
  return [
    MenuEntryId.Edit,
    MenuEntryId.File,
    MenuEntryId.Go,
    MenuEntryId.Help,
    MenuEntryId.OpenRecent,
    MenuEntryId.Run,
    MenuEntryId.Selection,
    MenuEntryId.Terminal,
    MenuEntryId.TitleBar,
    MenuEntryId.View,
    MenuIdTitleBarContextMenu,
    MenuEntryId.TitleBarContextMenu,
  ]
}

/**
 * @deprecated
 * @returns
 */
export const getMenuEntries = async (id: number, platform: number): Promise<readonly any[]> => {
  return []
}
