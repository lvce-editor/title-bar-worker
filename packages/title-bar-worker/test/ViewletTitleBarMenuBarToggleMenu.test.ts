import { expect, test } from '@jest/globals'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as ViewletTitleBarMenuBarToggleMenu from '../src/parts/TitleBarMenuBar/ViewletTitleBarMenuBarToggleMenu.ts'

test('toggleMenu with menu closed opens menu', async () => {
  const state = {
    ...createDefaultState(),
    isMenuOpen: false,
    focusedIndex: 0,
    titleBarEntries: [{ id: 2 }], // Edit menu ID
  }
  const result = await ViewletTitleBarMenuBarToggleMenu.toggleMenu(state)
  expect(result.isMenuOpen).toBe(true)
})

test('toggleMenu with menu open closes menu', async () => {
  const state = {
    ...createDefaultState(),
    isMenuOpen: true,
  }
  const result = await ViewletTitleBarMenuBarToggleMenu.toggleMenu(state)
  expect(result.isMenuOpen).toBe(false)
})
