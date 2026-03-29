import { expect, test } from '@jest/globals'
import type { TitleBarMenuBarState } from '../src/parts/TitleBarMenuBarState/TitleBarMenuBarState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as HandleTitleBarContextMenu from '../src/parts/HandleTitleBarContextMenu/HandleTitleBarContextMenu.ts'

test('handleTitleBarContextMenu - returns same state', async () => {
  const state: TitleBarMenuBarState = {
    ...createDefaultState(),
    uid: 5,
    width: 1200,
  }

  const result = await HandleTitleBarContextMenu.handleTitleBarContextMenu(state)

  expect(result).toBe(state)
})