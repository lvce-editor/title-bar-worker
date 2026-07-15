import { expect, test } from '@jest/globals'
import type { TitleBarMenuBarState } from '../src/parts/TitleBarMenuBarState/TitleBarMenuBarState.ts'
import { commandMap } from '../src/parts/CommandMap/CommandMap.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as TitleBarMenuBarStates from '../src/parts/TitleBarMenuBarStates/TitleBarMenuBarStates.ts'

test('closeMenu updates the registered title bar state', async () => {
  const uid = 42
  const state: TitleBarMenuBarState = {
    ...createDefaultState(uid),
    focusedIndex: 1,
    isMenuOpen: true,
  }
  TitleBarMenuBarStates.set(uid, state, state)

  await commandMap['TitleBar.closeMenu'](uid, false)

  expect(TitleBarMenuBarStates.get(uid).newState).toMatchObject({
    focusedIndex: -1,
    isMenuOpen: false,
  })
})
