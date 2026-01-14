import { expect, test } from '@jest/globals'
import type { TitleBarMenuBarState } from '../src/parts/TitleBarMenuBarState/TitleBarMenuBarState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as ViewletTitleBarMenuBarHandleFocus from '../src/parts/TitleBarMenuBar/ViewletTitleBarMenuBarHandleFocus.ts'

test('handleFocus sets focus and returns same state', async () => {
  const state: TitleBarMenuBarState = createDefaultState()
  const result = await ViewletTitleBarMenuBarHandleFocus.handleFocus(state)
  expect(result).toEqual({ ...state, focused: true })
})
