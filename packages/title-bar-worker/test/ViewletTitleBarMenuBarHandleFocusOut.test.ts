import { expect, test } from '@jest/globals'
import type { TitleBarMenuBarState } from '../src/parts/TitleBarMenuBarState/TitleBarMenuBarState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as ViewletTitleBarMenuBarHandleFocusOut from '../src/parts/TitleBarMenuBar/ViewletTitleBarMenuBarHandleFocusOut.ts'

test('handleFocusOut returns same state', async () => {
  const state: TitleBarMenuBarState = createDefaultState()
  const result = await ViewletTitleBarMenuBarHandleFocusOut.handleFocusOut(state)
  expect(result).toBe(state)
})

test('handleFocusOut returns same state with modified state', async () => {
  const state: TitleBarMenuBarState = {
    ...createDefaultState(),
    focusedIndex: 1,
    isMenuOpen: true,
  }
  const result = await ViewletTitleBarMenuBarHandleFocusOut.handleFocusOut(state)
  expect(result).toBe(state)
})
