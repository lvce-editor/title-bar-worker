import { expect, test } from '@jest/globals'
import type { TitleBarMenuBarState } from '../src/parts/TitleBarMenuBarState/TitleBarMenuBarState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as ShowCommandCenter from '../src/parts/ShowCommandCenter/ShowCommandCenter.ts'

test('showCommandCenter - should set commandCenterEnabled to true', async () => {
  const state: TitleBarMenuBarState = createDefaultState()
  const result = await ShowCommandCenter.showCommandCenter(state)
  expect(result.commandCenterEnabled).toBe(true)
})

test('showCommandCenter - should preserve other state properties', async () => {
  const state: TitleBarMenuBarState = createDefaultState()
  const result = await ShowCommandCenter.showCommandCenter(state)
  expect(result.uid).toBe(state.uid)
  expect(result.width).toBe(state.width)
  expect(result.height).toBe(state.height)
  expect(result.title).toBe(state.title)
  expect(result.menus).toBe(state.menus)
  expect(result.buttons).toBe(state.buttons)
  expect(result.focusedIndex).toBe(state.focusedIndex)
  expect(result.isMenuOpen).toBe(state.isMenuOpen)
})

test('showCommandCenter - should work with commandCenterEnabled already true', async () => {
  const state: TitleBarMenuBarState = {
    ...createDefaultState(),
    commandCenterEnabled: true,
  }
  const result = await ShowCommandCenter.showCommandCenter(state)
  expect(result.commandCenterEnabled).toBe(true)
})

test('showCommandCenter - should work with commandCenterEnabled false', async () => {
  const state: TitleBarMenuBarState = {
    ...createDefaultState(),
    commandCenterEnabled: false,
  }
  const result = await ShowCommandCenter.showCommandCenter(state)
  expect(result.commandCenterEnabled).toBe(true)
})

test('showCommandCenter - should return new state object', async () => {
  const state: TitleBarMenuBarState = createDefaultState()
  const result = await ShowCommandCenter.showCommandCenter(state)
  expect(result).not.toBe(state)
})
