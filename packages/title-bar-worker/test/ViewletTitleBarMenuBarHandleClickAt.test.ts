import { expect, test } from '@jest/globals'
import type { TitleBarMenuBarState } from '../src/parts/TitleBarMenuBarState/TitleBarMenuBarState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as ViewletTitleBarMenuBarHandleClickAt from '../src/parts/TitleBarMenuBar/ViewletTitleBarMenuBarHandleClickAt.ts'

test('handleClickAt with invalid position returns same state', async () => {
  const state: TitleBarMenuBarState = createDefaultState()
  const result = await ViewletTitleBarMenuBarHandleClickAt.handleClickAt(state, 0, 1000, 1000) // Click outside menu area
  expect(result).toBe(state)
})

test('handleClickAt with valid position calls handleClick', async () => {
  const state: TitleBarMenuBarState = {
    ...createDefaultState(),
    titleBarEntries: [{ id: 2, width: 100 }], // Edit menu ID with width
    x: 0,
    iconWidth: 30,
  }
  const result = await ViewletTitleBarMenuBarHandleClickAt.handleClickAt(state, 0, 50, 15) // Click within menu area
  expect(result.isMenuOpen).toBe(true)
  expect(result.focusedIndex).toBe(0)
})
