import { expect, jest, test } from '@jest/globals'
import type { TitleBarMenuBarState } from '../src/parts/TitleBarMenuBarState/TitleBarMenuBarState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'

jest.unstable_mockModule('../src/parts/MenuEntries/MenuEntries.ts', () => ({
  getMenuEntries: async () => [{ command: 'Editor.undo', flags: 0, id: 'undo', label: 'Undo' }],
}))

const ViewletTitleBarMenuBarFocusPrevious = await import('../src/parts/TitleBarMenuBar/ViewletTitleBarMenuBarFocusPrevious.ts')

test('focusPrevious', async () => {
  const state: TitleBarMenuBarState = {
    ...createDefaultState(),
    focusedIndex: 1,
    titleBarEntries: [
      {
        flags: 0,
        isExpanded: false,
        isFocused: false,
        key: 0,
        label: 'File',
        level: 0,
      },
      {
        flags: 0,
        isExpanded: false,
        isFocused: false,
        key: 1,
        label: 'Edit',
        level: 0,
      },
      {
        flags: 0,
        isExpanded: false,
        isFocused: false,
        key: 2,
        label: 'Selection',
        level: 0,
      },
    ],
  }
  const result = await ViewletTitleBarMenuBarFocusPrevious.focusPrevious(state)
  expect(result).toMatchObject({
    focusedIndex: 0,
  })
})

test('focusPrevious - at start', async () => {
  const state: TitleBarMenuBarState = {
    ...createDefaultState(),
    focusedIndex: 0,
    titleBarEntries: [
      {
        flags: 0,
        isExpanded: false,
        isFocused: false,
        key: 0,
        label: 'File',
        level: 0,
      },
      {
        flags: 0,
        isExpanded: false,
        isFocused: false,
        key: 1,
        label: 'Edit',
        level: 0,
      },
      {
        flags: 0,
        isExpanded: false,
        isFocused: false,
        key: 2,
        label: 'Selection',
        level: 0,
      },
    ],
  }
  const result = await ViewletTitleBarMenuBarFocusPrevious.focusPrevious(state)
  expect(result).toMatchObject({
    focusedIndex: 2,
  })
})
