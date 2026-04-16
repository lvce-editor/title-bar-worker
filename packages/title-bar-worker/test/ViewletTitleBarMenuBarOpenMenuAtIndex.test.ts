import { expect, test } from '@jest/globals'
import type { TitleBarMenuBarState } from '../src/parts/TitleBarMenuBarState/TitleBarMenuBarState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as MenuItemFlags from '../src/parts/MenuItemFlags/MenuItemFlags.ts'
import * as ViewletTitleBarMenuBarOpenMenuAtIndex from '../src/parts/TitleBarMenuBar/ViewletTitleBarMenuBarOpenMenuAtIndex.ts'

test('openMenuAtIndex opens menu at specified index', async () => {
  const state: TitleBarMenuBarState = {
    ...createDefaultState(),
    iconWidth: 30,
    titleBarEntries: [{ id: 2 }], // Edit menu ID
    titleBarHeight: 30,
    x: 0,
  }
  const result = await ViewletTitleBarMenuBarOpenMenuAtIndex.openMenuAtIndex(state, 0, true)
  expect(result.isMenuOpen).toBe(true)
  expect(result.focusedIndex).toBe(0)
  expect(result.menus).toHaveLength(1)
  expect(result.menus[0].id).toBe(2)
  expect(result.menus[0].level).toBe(0)
  expect(result.menus[0].x).toBe(30) // x + iconWidth
  expect(result.menus[0].y).toBe(30) // titleBarHeight
})

test('openMenuAtIndex with shouldBeFocused false sets menuFocusedIndex to -1', async () => {
  const state: TitleBarMenuBarState = {
    ...createDefaultState(),
    iconWidth: 30,
    titleBarEntries: [{ id: 2 }], // Edit menu ID
    titleBarHeight: 30,
    x: 0,
  }
  const result = await ViewletTitleBarMenuBarOpenMenuAtIndex.openMenuAtIndex(state, 0, false)
  expect(result.menus[0].focusedIndex).toBe(-1)
})

test('openMenuAtIndex with shouldBeFocused true sets menuFocusedIndex to calculated value', async () => {
  const state: TitleBarMenuBarState = {
    ...createDefaultState(),
    iconWidth: 30,
    titleBarEntries: [{ id: 2 }], // Edit menu ID
    titleBarHeight: 30,
    x: 0,
  }
  const result = await ViewletTitleBarMenuBarOpenMenuAtIndex.openMenuAtIndex(state, 0, true)
  expect(result.menus[0].focusedIndex).toBeGreaterThanOrEqual(0)
})

test('openMenuAtIndex opens overflow menu with hidden top-level entries', async () => {
  const hiddenEntries = [
    { command: '', flags: MenuItemFlags.None, id: 'View', label: 'View', width: 40 },
    { command: '', flags: MenuItemFlags.None, id: 'Help', label: 'Help', width: 40 },
  ]
  const state: TitleBarMenuBarState = {
    ...createDefaultState(),
    iconWidth: 30,
    titleBarEntries: [
      { command: '', flags: MenuItemFlags.None, id: 'File', label: 'File', width: 50 },
      { command: '', flags: MenuItemFlags.None, id: 'Edit', label: 'Edit', width: 50 },
      { hiddenEntries, id: 'title-bar-overflow', label: '...', width: 38 },
    ],
    titleBarHeight: 30,
    x: 10,
  }

  const result = await ViewletTitleBarMenuBarOpenMenuAtIndex.openMenuAtIndex(state, 2, false)

  expect(result.isMenuOpen).toBe(true)
  expect(result.focusedIndex).toBe(2)
  expect(result.menus).toHaveLength(1)
  expect(result.menus[0].x).toBe(140)
  expect(result.menus[0].y).toBe(30)
  expect(result.menus[0].items).toEqual([
    { command: '', flags: MenuItemFlags.SubMenu, id: 'View', label: 'View' },
    { command: '', flags: MenuItemFlags.SubMenu, id: 'Help', label: 'Help' },
  ])
})
