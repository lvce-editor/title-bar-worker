import { expect, test } from '@jest/globals'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as ViewletTitleBarMenuBarCloseMenu from '../src/parts/TitleBarMenuBar/ViewletTitleBarMenuBarCloseMenu.ts'

test("closeMenu - don't keep focus", () => {
  const state = {
    ...createDefaultState(),
    focusedIndex: 0,
    isMenuOpen: true,
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
  const result = ViewletTitleBarMenuBarCloseMenu.closeMenu(state, /* keepFocus */ false)
  expect(result).toMatchObject({
    focusedIndex: -1,
    isMenuOpen: false,
  })
})

test('closeMenu - keep focus', () => {
  const state = {
    ...createDefaultState(),
    focusedIndex: 0,
    isMenuOpen: true,
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
  const result = ViewletTitleBarMenuBarCloseMenu.closeMenu(state, /* keepFocus */ true)
  expect(result).toMatchObject({
    focusedIndex: 0,
    isMenuOpen: false,
  })
})
