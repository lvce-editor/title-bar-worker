import { expect, test } from '@jest/globals'
import type { TitleBarMenuBarState } from '../src/parts/TitleBarMenuBarState/TitleBarMenuBarState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as ViewletTitleBarMenuBarOpenMenu from '../src/parts/TitleBarMenuBar/ViewletTitleBarMenuBarOpenMenu.ts'

test('openMenu with focusedIndex -1 returns same state', async () => {
  const state: TitleBarMenuBarState = createDefaultState()
  const result = await ViewletTitleBarMenuBarOpenMenu.openMenu(state, false)
  expect(result).toBe(state)
})

test('openMenu with valid focusedIndex calls openMenuAtIndex', async () => {
  const state: TitleBarMenuBarState = {
    ...createDefaultState(),
    focusedIndex: 0,
    titleBarEntries: [{ id: 2 }], // Edit menu ID
  }
  const result = await ViewletTitleBarMenuBarOpenMenu.openMenu(state, true)
  expect(result.isMenuOpen).toBe(true)
  expect(result.focusedIndex).toBe(0)
  expect(result.menus).toHaveLength(1)
})
