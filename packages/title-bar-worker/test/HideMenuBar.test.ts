import { expect, test } from '@jest/globals'
import type { TitleBarMenuBarState } from '../src/parts/TitleBarMenuBarState/TitleBarMenuBarState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as HideMenuBar from '../src/parts/HideMenuBar/HideMenuBar.ts'

test('hideMenuBar - should set titleBarMenuBarEnabled to false', async () => {
  const state: TitleBarMenuBarState = createDefaultState()
  const result = await HideMenuBar.hideMenuBar(state)
  expect(result.titleBarMenuBarEnabled).toBe(false)
})

test('hideMenuBar - should preserve other state properties', async () => {
  const state: TitleBarMenuBarState = createDefaultState()
  const result = await HideMenuBar.hideMenuBar(state)
  expect(result.uid).toBe(state.uid)
  expect(result.width).toBe(state.width)
  expect(result.height).toBe(state.height)
  expect(result.title).toBe(state.title)
  expect(result.menus).toBe(state.menus)
  expect(result.buttons).toBe(state.buttons)
  expect(result.focusedIndex).toBe(state.focusedIndex)
  expect(result.isMenuOpen).toBe(state.isMenuOpen)
  expect(result.commandCenterEnabled).toBe(state.commandCenterEnabled)
  expect(result.titleBarButtonsEnabled).toBe(state.titleBarButtonsEnabled)
})

test('hideMenuBar - should work with titleBarMenuBarEnabled already false', async () => {
  const state: TitleBarMenuBarState = {
    ...createDefaultState(),
    titleBarMenuBarEnabled: false,
  }
  const result = await HideMenuBar.hideMenuBar(state)
  expect(result.titleBarMenuBarEnabled).toBe(false)
})

test('hideMenuBar - should work with titleBarMenuBarEnabled true', async () => {
  const state: TitleBarMenuBarState = {
    ...createDefaultState(),
    titleBarMenuBarEnabled: true,
  }
  const result = await HideMenuBar.hideMenuBar(state)
  expect(result.titleBarMenuBarEnabled).toBe(false)
})

test('hideMenuBar - should return new state object', async () => {
  const state: TitleBarMenuBarState = createDefaultState()
  const result = await HideMenuBar.hideMenuBar(state)
  expect(result).not.toBe(state)
})
