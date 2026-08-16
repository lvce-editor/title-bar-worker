import { expect, test } from '@jest/globals'
import type { TitleBarMenuBarState } from '../src/parts/TitleBarMenuBarState/TitleBarMenuBarState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as ViewletTitleBarMenuBarHandleFocusOut from '../src/parts/TitleBarMenuBar/ViewletTitleBarMenuBarHandleFocusOut.ts'

test('handleFocusOut returns same state', async () => {
  const state: TitleBarMenuBarState = createDefaultState()
  const result = await ViewletTitleBarMenuBarHandleFocusOut.handleFocusOut(state)
  expect(result).toBe(state)
})

test('handleFocusOut keeps an open menu unchanged while renderer focus filtering decides whether to close it', async () => {
  const state: TitleBarMenuBarState = {
    ...createDefaultState(),
    focused: true,
    focusedIndex: 1,
    isMenuOpen: true,
    menus: [
      {
        focusedIndex: 0,
        id: 1,
        items: [],
        level: 0,
        x: 0,
        y: 30,
      },
    ],
  }
  const result = await ViewletTitleBarMenuBarHandleFocusOut.handleFocusOut(state)
  expect(result).toBe(state)
})
