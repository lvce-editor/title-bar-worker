import { expect, test } from '@jest/globals'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as ViewletTitleBarMenuBarFocus from '../src/parts/TitleBarMenuBar/ViewletTitleBarMenuBarFocus.ts'

test('focus', async () => {
  const state = {
    ...createDefaultState(),
    focusedIndex: 42,
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
    ],
  }
  const result = await ViewletTitleBarMenuBarFocus.focus(state)
  expect(result).toMatchObject({
    focusedIndex: 0,
  })
})
