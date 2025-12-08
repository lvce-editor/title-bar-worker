import { expect, test } from '@jest/globals'
import type { TitleBarMenuBarState } from '../src/parts/TitleBarMenuBarState/TitleBarMenuBarState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as HideCommandCenter from '../src/parts/HideCommandCenter/HideCommandCenter.ts'

test('hideCommandCenter - should set commandCenterEnabled to false', async () => {
  const state: TitleBarMenuBarState = createDefaultState()
  const result = await HideCommandCenter.hideCommandCenter(state)
  expect(result.commandCenterEnabled).toBe(false)
})

test('hideCommandCenter - should preserve other state properties', async () => {
  const state: TitleBarMenuBarState = createDefaultState()
  const result = await HideCommandCenter.hideCommandCenter(state)
  expect(result.uid).toBe(state.uid)
  expect(result.width).toBe(state.width)
  expect(result.height).toBe(state.height)
  expect(result.title).toBe(state.title)
  expect(result.menus).toBe(state.menus)
  expect(result.buttons).toBe(state.buttons)
  expect(result.focusedIndex).toBe(state.focusedIndex)
  expect(result.isMenuOpen).toBe(state.isMenuOpen)
})

test('hideCommandCenter - should work with commandCenterEnabled already false', async () => {
  const state: TitleBarMenuBarState = {
    ...createDefaultState(),
    commandCenterEnabled: false,
  }
  const result = await HideCommandCenter.hideCommandCenter(state)
  expect(result.commandCenterEnabled).toBe(false)
})

test('hideCommandCenter - should work with commandCenterEnabled true', async () => {
  const state: TitleBarMenuBarState = {
    ...createDefaultState(),
    commandCenterEnabled: true,
  }
  const result = await HideCommandCenter.hideCommandCenter(state)
  expect(result.commandCenterEnabled).toBe(false)
})

test('hideCommandCenter - should return new state object', async () => {
  const state: TitleBarMenuBarState = createDefaultState()
  const result = await HideCommandCenter.hideCommandCenter(state)
  expect(result).not.toBe(state)
})
