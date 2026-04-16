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
    iconWidth: 30,
    titleBarEntries: [{ id: 2, width: 100 }], // Edit menu ID with width
    x: 0,
  }
  const result = await ViewletTitleBarMenuBarHandleClickAt.handleClickAt(state, 0, 50, 15) // Click within menu area
  expect(result.isMenuOpen).toBe(true)
  expect(result.focusedIndex).toBe(0)
})

test('handleClickAt opens overflow menu from visible entries only', async () => {
  const state: TitleBarMenuBarState = {
    ...createDefaultState(),
    iconWidth: 30,
    titleBarEntries: [
      { command: '', flags: 0, id: 1, label: 'File', width: 50 },
      { command: '', flags: 0, id: 2, label: 'Edit', width: 50 },
      { command: '', flags: 0, id: 3, label: 'View', width: 50 },
    ],
    titleWidth: 200,
    width: 90,
    x: 0,
  }

  const result = await ViewletTitleBarMenuBarHandleClickAt.handleClickAt(state, 0, 85, 15)

  expect(result.isMenuOpen).toBe(true)
  expect(result.focusedIndex).toBe(1)
  expect(result.menus[0].items).toEqual([
    { command: '', flags: 4, id: 2, label: 'Edit' },
    { command: '', flags: 4, id: 3, label: 'View' },
  ])
})
