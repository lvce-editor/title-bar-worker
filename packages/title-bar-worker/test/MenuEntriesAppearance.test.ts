import { expect, test } from '@jest/globals'
import { getMenuEntries } from '../src/parts/MenuEntriesAppearance/MenuEntriesAppearance.ts'
import * as MenuEntrySeparator from '../src/parts/MenuEntrySeparator/MenuEntrySeparator.ts'
import * as MenuItemFlags from '../src/parts/MenuItemFlags/MenuItemFlags.ts'

const notImplementedArgs = [{ message: 'not implemented' }]

test('getMenuEntries', async () => {
  const sideBarRight = 2
  const result = await getMenuEntries(sideBarRight)
  expect(result).toEqual([
    {
      command: 'Window.toggleFullScreen',
      flags: MenuItemFlags.None,
      id: 'fullScreen',
      keyboardShortCut: 'F11',
      label: 'Full Screen',
    },
    {
      args: notImplementedArgs,
      command: 'Dialog.showMessage',
      flags: MenuItemFlags.None,
      id: 'zenMode',
      keyboardShortCut: 'Ctrl+K Z',
      label: 'Zen Mode',
    },
    {
      args: notImplementedArgs,
      command: 'Dialog.showMessage',
      flags: MenuItemFlags.None,
      id: 'centeredLayout',
      keyboardShortCut: '',
      label: 'Centered Layout',
    },
    MenuEntrySeparator.menuEntrySeparator,
    {
      args: notImplementedArgs,
      command: 'Dialog.showMessage',
      flags: MenuItemFlags.Checked,
      id: 'menuBar',
      keyboardShortCut: '',
      label: 'Menu Bar',
    },
    {
      command: 'Layout.toggleSideBar',
      flags: MenuItemFlags.None,
      id: 'primarySideBar',
      keyboardShortCut: 'Ctrl+B',
      label: 'Primary Side Bar',
    },
    {
      command: 'Layout.toggleSecondarySideBar',
      flags: MenuItemFlags.None,
      id: 'secondarySideBar',
      keyboardShortCut: 'Ctrl+Alt+B',
      label: 'Secondary Side Bar',
    },
    {
      command: 'Layout.toggleStatusBar',
      flags: MenuItemFlags.Checked,
      id: 'statusBar',
      keyboardShortCut: '',
      label: 'Status Bar',
    },
    {
      command: 'Layout.togglePanel',
      flags: MenuItemFlags.Checked,
      id: 'panel',
      keyboardShortCut: 'Ctrl+J',
      label: 'Panel',
    },
    MenuEntrySeparator.menuEntrySeparator,
    {
      command: 'Layout.moveSideBarLeft',
      flags: MenuItemFlags.None,
      id: 'movePrimarySideBarLeft',
      keyboardShortCut: '',
      label: 'Move Primary Side Bar Left',
    },
    {
      args: notImplementedArgs,
      command: 'Dialog.showMessage',
      flags: MenuItemFlags.None,
      id: 'activityBarPosition',
      keyboardShortCut: '',
      label: 'Activity Bar Position',
    },
    {
      args: notImplementedArgs,
      command: 'Dialog.showMessage',
      flags: MenuItemFlags.None,
      id: 'panelPosition',
      keyboardShortCut: '',
      label: 'Panel Position',
    },
    {
      args: notImplementedArgs,
      command: 'Dialog.showMessage',
      flags: MenuItemFlags.None,
      id: 'alignPanel',
      keyboardShortCut: '',
      label: 'Align Panel',
    },
    {
      args: notImplementedArgs,
      command: 'Dialog.showMessage',
      flags: MenuItemFlags.None,
      id: 'tabBar',
      keyboardShortCut: '',
      label: 'Tab Bar',
    },
    {
      args: notImplementedArgs,
      command: 'Dialog.showMessage',
      flags: MenuItemFlags.None,
      id: 'editorActionsPosition',
      keyboardShortCut: '',
      label: 'Editor Actions Position',
    },
    MenuEntrySeparator.menuEntrySeparator,
    {
      args: notImplementedArgs,
      command: 'Dialog.showMessage',
      flags: MenuItemFlags.None,
      id: 'minimap',
      keyboardShortCut: '',
      label: 'Minimap',
    },
    {
      args: notImplementedArgs,
      command: 'Dialog.showMessage',
      flags: MenuItemFlags.None,
      id: 'breadcrumbs',
      keyboardShortCut: '',
      label: 'Breadcrumbs',
    },
    {
      args: notImplementedArgs,
      command: 'Dialog.showMessage',
      flags: MenuItemFlags.None,
      id: 'stickyScroll',
      keyboardShortCut: '',
      label: 'Sticky Scroll',
    },
    {
      args: notImplementedArgs,
      command: 'Dialog.showMessage',
      flags: MenuItemFlags.None,
      id: 'renderWhitespace',
      keyboardShortCut: '',
      label: 'Render Whitespace',
    },
    {
      args: notImplementedArgs,
      command: 'Dialog.showMessage',
      flags: MenuItemFlags.Checked,
      id: 'renderControlCharacters',
      keyboardShortCut: '',
      label: 'Render Control Characters',
    },
    MenuEntrySeparator.menuEntrySeparator,
    {
      command: 'Window.zoomIn',
      flags: MenuItemFlags.None,
      id: 'zoomIn',
      keyboardShortCut: 'Ctrl+=',
      label: 'Zoom In',
    },
    {
      command: 'Window.zoomOut',
      flags: MenuItemFlags.None,
      id: 'zoomOut',
      keyboardShortCut: 'Ctrl+-',
      label: 'Zoom Out',
    },
    {
      command: 'Window.zoomReset',
      flags: MenuItemFlags.None,
      id: 'resetZoom',
      keyboardShortCut: 'Ctrl+NumPad0',
      label: 'Reset Zoom',
    },
  ])
})

test('getMenuEntries - primary side bar is left', async () => {
  const sideBarLeft = 1
  const result = await getMenuEntries(sideBarLeft)

  expect(result).toContainEqual({
    command: 'Layout.moveSideBarRight',
    flags: MenuItemFlags.None,
    id: 'movePrimarySideBarRight',
    keyboardShortCut: '',
    label: 'Move Primary Side Bar Right',
  })
})
