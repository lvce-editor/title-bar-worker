import { expect, test } from '@jest/globals'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as ViewletTitleBarMenuBarFocusPrevious from '../src/parts/TitleBarMenuBar/ViewletTitleBarMenuBarFocusPrevious.ts'

test('focusPrevious', async () => {
  const state = {
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
  const state = {
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
