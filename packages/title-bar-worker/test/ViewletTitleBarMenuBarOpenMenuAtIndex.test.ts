import { expect, test } from '@jest/globals'
import type { TitleBarMenuBarState } from '../src/parts/TitleBarMenuBarState/TitleBarMenuBarState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as ViewletTitleBarMenuBarOpenMenuAtIndex from '../src/parts/TitleBarMenuBar/ViewletTitleBarMenuBarOpenMenuAtIndex.ts'

test('openMenuAtIndex opens menu at specified index', async () => {
  const state: TitleBarMenuBarState = {
    ...createDefaultState(),
    titleBarEntries: [{ id: 2 }], // Edit menu ID
    titleBarHeight: 30,
    x: 0,
    iconWidth: 30,
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
    titleBarEntries: [{ id: 2 }], // Edit menu ID
    titleBarHeight: 30,
    x: 0,
    iconWidth: 30,
  }
  const result = await ViewletTitleBarMenuBarOpenMenuAtIndex.openMenuAtIndex(state, 0, false)
  expect(result.menus[0].focusedIndex).toBe(-1)
})

test('openMenuAtIndex with shouldBeFocused true sets menuFocusedIndex to calculated value', async () => {
  const state: TitleBarMenuBarState = {
    ...createDefaultState(),
    titleBarEntries: [{ id: 2 }], // Edit menu ID
    titleBarHeight: 30,
    x: 0,
    iconWidth: 30,
  }
  const result = await ViewletTitleBarMenuBarOpenMenuAtIndex.openMenuAtIndex(state, 0, true)
  expect(result.menus[0].focusedIndex).toBeGreaterThanOrEqual(0)
})
