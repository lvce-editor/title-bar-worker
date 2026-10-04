import { MenuEntryId } from '@lvce-editor/constants'

export const MenuIdTitleBarContextMenu = 50
export const MenuIdAppearance = 'appearance'
export const MenuIdAlignPanel = 'alignPanel'
export const MenuIdEditorLayout = 'editorLayout'
export const MenuIdSwitchEditor = 'switchEditor'
export const MenuIdSwitchGroup = 'switchGroup'

export const getMenuIds = (): readonly (string | number)[] => {
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
    MenuIdAppearance,
    MenuIdAlignPanel,
    MenuIdEditorLayout,
    MenuIdSwitchEditor,
    MenuIdSwitchGroup,
    MenuIdTitleBarContextMenu,
    MenuEntryId.TitleBarContextMenu,
  ]
}
