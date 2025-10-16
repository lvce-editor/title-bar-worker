import { expect, test } from '@jest/globals'
import type { TitleBarMenuBarState } from '../src/parts/TitleBarMenuBarState/TitleBarMenuBarState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as ViewletTitleBarMenuBarHandleClick from '../src/parts/TitleBarMenuBar/ViewletTitleBarMenuBarHandleClick.ts'

test('handleClick with non-left click returns same state', async () => {
  const state: TitleBarMenuBarState = createDefaultState()
  const result = await ViewletTitleBarMenuBarHandleClick.handleClick(state, 1, 0) // Right click
  expect(result).toBe(state)
})

test('handleClick with index -1 returns same state', async () => {
  const state: TitleBarMenuBarState = createDefaultState()
  const result = await ViewletTitleBarMenuBarHandleClick.handleClick(state, 0, -1) // Left click but invalid index
  expect(result).toBe(state)
})

test('handleClick with left click and valid index calls toggleIndex', async () => {
  const state: TitleBarMenuBarState = {
    ...createDefaultState(),
    titleBarEntries: [{ id: 2 }], // Edit menu ID
  }
  const result = await ViewletTitleBarMenuBarHandleClick.handleClick(state, 0, 0) // Left click on index 0
  expect(result.isMenuOpen).toBe(true)
  expect(result.focusedIndex).toBe(0)
})
