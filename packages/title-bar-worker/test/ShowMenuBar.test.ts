import { expect, test } from '@jest/globals'
import type { TitleBarMenuBarState } from '../src/parts/TitleBarMenuBarState/TitleBarMenuBarState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as ShowMenuBar from '../src/parts/ShowMenuBar/ShowMenuBar.ts'

test('showMenuBar should enable titleBarMenuBarEnabled', async () => {
  const state: TitleBarMenuBarState = createDefaultState()
  const result = await ShowMenuBar.showMenuBar(state)
  expect(result.titleBarMenuBarEnabled).toBe(true)
})

test('showMenuBar should preserve other state properties', async () => {
  const state: TitleBarMenuBarState = createDefaultState()
  const result = await ShowMenuBar.showMenuBar(state)
  expect(result.title).toBe(state.title)
  expect(result.width).toBe(state.width)
  expect(result.height).toBe(state.height)
  expect(result.focusedIndex).toBe(state.focusedIndex)
  expect(result.isMenuOpen).toBe(state.isMenuOpen)
})

test('showMenuBar should work when titleBarMenuBarEnabled is already true', async () => {
  const state: TitleBarMenuBarState = {
    ...createDefaultState(),
    titleBarMenuBarEnabled: true,
  }
  const result = await ShowMenuBar.showMenuBar(state)
  expect(result.titleBarMenuBarEnabled).toBe(true)
})

test('showMenuBar should work when titleBarMenuBarEnabled is false', async () => {
  const state: TitleBarMenuBarState = {
    ...createDefaultState(),
    titleBarMenuBarEnabled: false,
  }
  const result = await ShowMenuBar.showMenuBar(state)
  expect(result.titleBarMenuBarEnabled).toBe(true)
})
