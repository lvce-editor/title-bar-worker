import type { MenuEntryId } from '@lvce-editor/constants'

export interface MenuPropsBase {
  readonly menuId: number
}

export interface MenuPropsContextMenu extends MenuPropsBase {
  readonly menuId: typeof MenuEntryId.TitleBarContextMenu | 50
}

export interface MenuPropsFile extends MenuPropsBase {
  readonly menuId: typeof MenuEntryId.File
  readonly platform: number
}

export interface MenuPropsEdit extends MenuPropsBase {
  readonly menuId: typeof MenuEntryId.Edit
}

export interface MenuPropsGo extends MenuPropsBase {
  readonly menuId: typeof MenuEntryId.Go
}

export interface MenuPropsHelp extends MenuPropsBase {
  readonly menuId: typeof MenuEntryId.Help
  readonly platform: number
}

export interface MenuPropsOpenRecent extends MenuPropsBase {
  readonly menuId: typeof MenuEntryId.OpenRecent
}

export interface MenuPropsRun extends MenuPropsBase {
  readonly menuId: typeof MenuEntryId.Run
}

export interface MenuPropsSelection extends MenuPropsBase {
  readonly menuId: typeof MenuEntryId.Selection
}

export interface MenuPropsTerminal extends MenuPropsBase {
  readonly menuId: typeof MenuEntryId.Terminal
}

export interface MenuPropsTitleBar extends MenuPropsBase {
  readonly menuId: typeof MenuEntryId.TitleBar
  readonly platform: number
}

export interface MenuPropsView extends MenuPropsBase {
  readonly menuId: typeof MenuEntryId.View
}

export type ContextMenuProps =
  | MenuPropsContextMenu
  | MenuPropsEdit
  | MenuPropsFile
  | MenuPropsSelection
  | MenuPropsTerminal
  | MenuPropsOpenRecent
  | MenuPropsTitleBar
  | MenuPropsView
  | MenuPropsRun
  | MenuPropsGo
  | MenuPropsHelp
