import { expect, test } from '@jest/globals'
import type { TitleBarMenuBarState } from '../src/parts/TitleBarMenuBarState/TitleBarMenuBarState.ts'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as PlatformType from '../src/parts/PlatformType/PlatformType.ts'
import * as SetPlatform from '../src/parts/SetPlatform/SetPlatform.ts'

test('setPlatform - should update platform to Web', () => {
  const state: TitleBarMenuBarState = CreateDefaultState.createDefaultState()
  const newState = SetPlatform.setPlatform(state, PlatformType.Web)
  expect(newState.platform).toBe(PlatformType.Web)
  expect(newState).not.toBe(state)
})

test('setPlatform - should update platform to Electron', () => {
  const state: TitleBarMenuBarState = CreateDefaultState.createDefaultState()
  const newState = SetPlatform.setPlatform(state, PlatformType.Electron)
  expect(newState.platform).toBe(PlatformType.Electron)
  expect(newState).not.toBe(state)
})

test('setPlatform - should update platform to Remote', () => {
  const state: TitleBarMenuBarState = CreateDefaultState.createDefaultState()
  const newState = SetPlatform.setPlatform(state, PlatformType.Remote)
  expect(newState.platform).toBe(PlatformType.Remote)
  expect(newState).not.toBe(state)
})

test('setPlatform - should preserve other state properties', () => {
  const state: TitleBarMenuBarState = CreateDefaultState.createDefaultState()
  const newState = SetPlatform.setPlatform(state, PlatformType.Web)
  expect(newState.uid).toBe(state.uid)
  expect(newState.width).toBe(state.width)
  expect(newState.height).toBe(state.height)
  expect(newState.title).toBe(state.title)
  expect(newState.menus).toBe(state.menus)
  expect(newState.buttons).toBe(state.buttons)
})
