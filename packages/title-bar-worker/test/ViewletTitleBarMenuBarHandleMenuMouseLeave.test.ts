import { expect, test } from '@jest/globals'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as ViewletTitleBarMenuBarHandleMenuMouseLeave from '../src/parts/TitleBarMenuBar/ViewletTitleBarMenuBarHandleMenuMouseLeave.ts'

test('handleMenuMouseLeave clears focused items in the open menu tree', () => {
  const state = {
    ...createDefaultState(),
    isMenuOpen: true,
    menus: [
      { focusedIndex: 2, items: [], level: 0, x: 0, y: 0 },
      { focusedIndex: 1, items: [], level: 1, x: 100, y: 50 },
    ],
  }
  expect(ViewletTitleBarMenuBarHandleMenuMouseLeave.handleMenuMouseLeave(state)).toMatchObject({
    isMenuOpen: true,
    menus: [{ focusedIndex: -1 }, { focusedIndex: -1 }],
  })
})

test('handleMenuMouseLeave preserves the state if no menu item is focused', () => {
  const state = {
    ...createDefaultState(),
    menus: [{ focusedIndex: -1, items: [], level: 0, x: 0, y: 0 }],
  }
  expect(ViewletTitleBarMenuBarHandleMenuMouseLeave.handleMenuMouseLeave(state)).toBe(state)
})
