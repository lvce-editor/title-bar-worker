import { expect, test } from '@jest/globals'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as ViewletTitleBarMenuBarToggleIndex from '../src/parts/TitleBarMenuBar/ViewletTitleBarMenuBarToggleIndex.ts'

test('toggleIndex with menu closed opens menu at index', async () => {
  const state = {
    ...createDefaultState(),
    isMenuOpen: false,
    titleBarEntries: [{ id: 2 }], // Edit menu ID
  }
  const result = await ViewletTitleBarMenuBarToggleIndex.toggleIndex(state, 0)
  expect(result.isMenuOpen).toBe(true)
  expect(result.focusedIndex).toBe(0)
})

test('toggleIndex with menu open at same index closes menu', async () => {
  const state = {
    ...createDefaultState(),
    focusedIndex: 0,
    isMenuOpen: true,
  }
  const result = await ViewletTitleBarMenuBarToggleIndex.toggleIndex(state, 0)
  expect(result.isMenuOpen).toBe(false)
})

test('toggleIndex with menu open at different index opens new menu', async () => {
  const state = {
    ...createDefaultState(),
    focusedIndex: 0,
    isMenuOpen: true,
    titleBarEntries: [{ id: 2 }, { id: 5 }], // Edit and File menu IDs
  }
  const result = await ViewletTitleBarMenuBarToggleIndex.toggleIndex(state, 1)
  expect(result.isMenuOpen).toBe(true)
  expect(result.focusedIndex).toBe(1)
})
