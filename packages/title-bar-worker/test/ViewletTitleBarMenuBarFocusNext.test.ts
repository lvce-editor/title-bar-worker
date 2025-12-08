import { expect, test } from '@jest/globals'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as ViewletTitleBarMenuBarFocusNext from '../src/parts/TitleBarMenuBar/ViewletTitleBarMenuBarFocusNext.ts'

test('focusNext', async () => {
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
  const result = await ViewletTitleBarMenuBarFocusNext.focusNext(state)
  expect(result).toMatchObject({
    focusedIndex: 1,
  })
})

test('focusNext - with disabled items', async () => {
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
  const result = await ViewletTitleBarMenuBarFocusNext.focusNext(state)
  expect(result).toMatchObject({
    focusedIndex: 1,
  })
})

test('focusNext - at end', async () => {
  const state = {
    ...createDefaultState(),
    focusedIndex: 2,
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
  const result = await ViewletTitleBarMenuBarFocusNext.focusNext(state)
  expect(result).toMatchObject({
    focusedIndex: 0,
  })
})
