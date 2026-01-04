import * as ElectronMenuItemRole from '../ElectronMenuItemRole/ElectronMenuItemRole.ts'
import * as ElectronMenuItemType from '../ElectronMenuItemType/ElectronMenuItemType.ts'
import * as MenuItemFlags from '../MenuItemFlags/MenuItemFlags.ts'

/**
 * @enum {string}
 */
const UiStrings = {
  About: 'About',
  Copy: 'Copy',
  Cut: 'Cut',
  Edit: 'Edit',
  Exit: 'Exit',
  File: 'File',
  Help: 'Help',
  Paste: 'Paste',
  Redo: 'Redo',
  SelectAll: 'Select All',
  ToggleDeveloperTools: 'Toggle Developer Tools',
  Undo: 'Undo',
}

export const toElectronMenuItem = (entry: any): any => {
  switch (entry.label) {
    case UiStrings.Copy:
      return {
        label: entry.label,
        role: ElectronMenuItemRole.Copy,
      }
    case UiStrings.Cut:
      return {
        label: entry.label,
        role: ElectronMenuItemRole.Cut,
      }
    case UiStrings.Edit:
      return {
        label: entry.label,
        role: ElectronMenuItemRole.EditMenu,
        submenu: [],
      }
    case UiStrings.Exit:
      return {
        label: entry.label,
        role: ElectronMenuItemRole.Quit,
      }
    case UiStrings.File:
      return {
        label: entry.label,
        role: ElectronMenuItemRole.FileMenu,
        submenu: [],
      }
    case UiStrings.Help:
      return {
        label: entry.label,
        role: ElectronMenuItemRole.Help,
        submenu: [],
      }
    case UiStrings.Paste:
      return {
        label: entry.label,
        role: ElectronMenuItemRole.Paste,
      }
    case UiStrings.Redo:
      return {
        label: entry.label,
        role: ElectronMenuItemRole.Redo,
      }
    case UiStrings.SelectAll:
      return {
        label: entry.label,
        role: ElectronMenuItemRole.SelectAll,
      }
    case UiStrings.ToggleDeveloperTools:
      return {
        label: entry.label,
        role: ElectronMenuItemRole.ToggleDevTools,
      }
    case UiStrings.Undo:
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
