import type { MenuEntry } from '../MenuEntry/MenuEntry.ts'
import * as MenuEntrySeparator from '../MenuEntrySeparator/MenuEntrySeparator.ts'
import * as MenuItemFlags from '../MenuItemFlags/MenuItemFlags.ts'
import * as TitleBarStrings from '../TitleBarStrings/TitleBarStrings.ts'

const notImplementedArgs = [{ message: 'not implemented' }]

const entry = (id: string, label: string, keyboardShortCut = ''): MenuEntry => {
  return {
    args: notImplementedArgs,
    command: 'Dialog.showMessage',
    flags: MenuItemFlags.None,
    id,
    keyboardShortCut,
    label,
  }
}

const checkedEntry = (id: string, label: string, keyboardShortCut = ''): MenuEntry => {
  return {
    args: notImplementedArgs,
    command: 'Dialog.showMessage',
    flags: MenuItemFlags.Checked,
    id,
    keyboardShortCut,
    label,
  }
}

const commandEntry = (id: string, label: string, command: string, keyboardShortCut = '', flags = MenuItemFlags.None): MenuEntry => {
  return {
    command,
    flags,
    id,
    keyboardShortCut,
    label,
  }
}

export const getMenuEntries = (): readonly MenuEntry[] => {
  return [
    {
      command: 'Window.toggleFullScreen',
      flags: MenuItemFlags.None,
      id: 'fullScreen',
      keyboardShortCut: 'F11',
      label: TitleBarStrings.fullScreen(),
    },
    entry('zenMode', 'Zen Mode', 'Ctrl+K Z'),
    entry('centeredLayout', 'Centered Layout'),
    MenuEntrySeparator.menuEntrySeparator,
    checkedEntry('menuBar', 'Menu Bar'),
    commandEntry('primarySideBar', 'Primary Side Bar', 'Layout.toggleSideBar', 'Ctrl+B'),
    commandEntry('secondarySideBar', 'Secondary Side Bar', 'Layout.toggleSecondarySideBar', 'Ctrl+Alt+B'),
    commandEntry('statusBar', 'Status Bar', 'Layout.toggleStatusBar', '', MenuItemFlags.Checked),
    commandEntry('panel', 'Panel', 'Layout.togglePanel', 'Ctrl+J', MenuItemFlags.Checked),
    MenuEntrySeparator.menuEntrySeparator,
    entry('movePrimarySideBarLeft', 'Move Primary Side Bar Left'),
    entry('activityBarPosition', 'Activity Bar Position'),
    entry('panelPosition', 'Panel Position'),
    entry('alignPanel', 'Align Panel'),
    entry('tabBar', 'Tab Bar'),
    entry('editorActionsPosition', 'Editor Actions Position'),
    MenuEntrySeparator.menuEntrySeparator,
    entry('minimap', 'Minimap'),
    entry('breadcrumbs', 'Breadcrumbs'),
    entry('stickyScroll', 'Sticky Scroll'),
    entry('renderWhitespace', 'Render Whitespace'),
    checkedEntry('renderControlCharacters', 'Render Control Characters'),
    MenuEntrySeparator.menuEntrySeparator,
    entry('zoomIn', 'Zoom In', 'Ctrl+='),
    entry('zoomOut', 'Zoom Out', 'Ctrl+-'),
    entry('resetZoom', 'Reset Zoom', 'Ctrl+NumPad0'),
  ]
}
