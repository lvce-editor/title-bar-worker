import { expect, test } from '@jest/globals'
import type { TitleBarMenuBarState } from '../src/parts/TitleBarMenuBarState/TitleBarMenuBarState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as MenuEntryId from '../src/parts/MenuEntryId/MenuEntryId.ts'
import * as MenuItemFlags from '../src/parts/MenuItemFlags/MenuItemFlags.ts'
import * as ViewletTitleBarMenuBarOpenMenuAtIndex from '../src/parts/TitleBarMenuBar/ViewletTitleBarMenuBarOpenMenuAtIndex.ts'

test('openMenuAtIndex opens menu at specified index', async () => {
  const state: TitleBarMenuBarState = {
    ...createDefaultState(),
    iconWidth: 30,
    titleBarEntries: [{ id: MenuEntryId.Edit, label: 'Edit', width: 50 }],
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
    titleBarEntries: [{ id: MenuEntryId.Edit, label: 'Edit', width: 50 }],
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
    titleBarEntries: [{ id: MenuEntryId.Edit, label: 'Edit', width: 50 }],
    titleBarHeight: 30,
    x: 0,
  }
  const result = await ViewletTitleBarMenuBarOpenMenuAtIndex.openMenuAtIndex(state, 0, true)
  expect(result.menus[0].focusedIndex).toBeGreaterThanOrEqual(0)
})

test('openMenuAtIndex without menu id still updates focused index', async () => {
  const state: TitleBarMenuBarState = {
    ...createDefaultState(),
    focusedIndex: 0,
    isMenuOpen: true,
    menus: [
      {
        focusedIndex: 0,
        items: [],
        level: 0,
        x: 0,
        y: 0,
      },
    ],
    titleBarEntries: [
      { label: 'File', width: 50 },
      { label: 'Edit', width: 50 },
    ],
  }

  const result = await ViewletTitleBarMenuBarOpenMenuAtIndex.openMenuAtIndex(state, 1, false)

  expect(result.focusedIndex).toBe(1)
  expect(result.isMenuOpen).toBe(true)
  expect(result.menus).toEqual([])
})

test('openMenuAtIndex opens overflow menu with hidden top-level entries', async () => {
  const state: TitleBarMenuBarState = {
    ...createDefaultState(),
    iconWidth: 30,
    titleBarEntries: [
      { id: MenuEntryId.File, label: 'File', width: 50 },
      { id: MenuEntryId.Edit, label: 'Edit', width: 50 },
      { id: MenuEntryId.View, label: 'View', width: 40 },
      { id: MenuEntryId.Help, label: 'Help', width: 40 },
    ],
    titleBarHeight: 30,
    width: 140,
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
