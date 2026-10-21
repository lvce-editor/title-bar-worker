import { expect, test } from '@jest/globals'
import type { TitleBarMenuBarState } from '../src/parts/TitleBarMenuBarState/TitleBarMenuBarState.ts'
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

test('moving inside either menu level preserves highlighting, leaving their bounds clears it', () => {
  const state: TitleBarMenuBarState = {
    ...createDefaultState(),
    menus: [
      { focusedIndex: 0, height: 100, items: [], level: 0, width: 100, x: 10, y: 20 },
      { focusedIndex: 0, height: 100, items: [], level: 1, width: 100, x: 110, y: 50 },
    ],
  }
  const handle = ViewletTitleBarMenuBarHandleMenuMouseLeave.handleMenuMouseLeave
  for (const [x, y] of [
    [10, 20],
    [109, 119],
    [110, 50],
    [209, 149],
  ]) {
    expect(handle(state, x, y)).toBe(state)
  }
  for (const [x, y] of [
    [9, 20],
    [210, 50],
    [10, 120],
    [110, 150],
    [50, 19],
  ]) {
    expect(handle(state, x, y).menus.map((menu) => menu.focusedIndex)).toEqual([-1, -1])
  }
})
