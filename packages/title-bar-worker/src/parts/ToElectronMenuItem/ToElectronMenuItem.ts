import * as ElectronMenuItemRole from '../ElectronMenuItemRole/ElectronMenuItemRole.ts'
import * as ElectronMenuItemType from '../ElectronMenuItemType/ElectronMenuItemType.ts'
import * as MenuItemFlags from '../MenuItemFlags/MenuItemFlags.ts'
import * as TitleBarStrings from '../TitleBarStrings/TitleBarStrings.ts'

export const toElectronMenuItem = (entry: any): any => {
  switch (entry.label) {
    case TitleBarStrings.copy():
      return {
        label: entry.label,
        role: ElectronMenuItemRole.Copy,
      }
    case TitleBarStrings.cut():
      return {
        label: entry.label,
        role: ElectronMenuItemRole.Cut,
      }
    case TitleBarStrings.edit():
      return {
        label: entry.label,
        role: ElectronMenuItemRole.EditMenu,
        submenu: [],
      }
    case TitleBarStrings.exit():
      return {
        label: entry.label,
        role: ElectronMenuItemRole.Quit,
      }
    case TitleBarStrings.file():
      return {
        label: entry.label,
        role: ElectronMenuItemRole.FileMenu,
        submenu: [],
      }
    case TitleBarStrings.help():
      return {
        label: entry.label,
        role: ElectronMenuItemRole.Help,
        submenu: [],
      }
    case TitleBarStrings.paste():
      return {
        label: entry.label,
        role: ElectronMenuItemRole.Paste,
      }
    case TitleBarStrings.redo():
      return {
        label: entry.label,
        role: ElectronMenuItemRole.Redo,
      }
    case TitleBarStrings.selectAll():
      return {
        label: entry.label,
        role: ElectronMenuItemRole.SelectAll,
      }
    case TitleBarStrings.toggleDeveloperTools():
      return {
        label: entry.label,
        role: ElectronMenuItemRole.ToggleDevTools,
      }
    case TitleBarStrings.undo():
      return {
        label: entry.label,
        role: ElectronMenuItemRole.Undo,
      }
    default:
      break
  }
  switch (entry.flags) {
    case MenuItemFlags.Separator:
      return {
        type: ElectronMenuItemType.Separator,
      }
    case MenuItemFlags.SubMenu:
      return {
        label: entry.label,
        submenu: [],
        type: ElectronMenuItemType.SubMenu,
      }
    default:
      return {
        label: entry.label,
      }
  }
}
