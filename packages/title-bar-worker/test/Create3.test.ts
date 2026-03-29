import { expect, test } from '@jest/globals'
import * as Create3 from '../src/parts/Create3/Create3.ts'
import * as GetTitleBarButtons from '../src/parts/GetTitleBarButtons/GetTitleBarButtons.ts'
import * as PlatformType from '../src/parts/PlatformType/PlatformType.ts'
import * as TitleBarMenuBarStates from '../src/parts/TitleBarMenuBarStates/TitleBarMenuBarStates.ts'

test('create3 - should initialize state for electron windows', () => {
  const uid = 301

  Create3.create3(uid, 'file:///workspace', 10, 20, 800, 32, PlatformType.Electron, false, true, '/assets')

  const { oldState, newState } = TitleBarMenuBarStates.get(uid)

  expect(oldState).toBe(newState)
  expect(newState.uid).toBe(uid)
  expect(newState.assetDir).toBe('/assets')
  expect(newState.platform).toBe(PlatformType.Electron)
  expect(newState.x).toBe(10)
  expect(newState.y).toBe(20)
  expect(newState.width).toBe(800)
  expect(newState.height).toBe(32)
  expect(newState.titleBarHeight).toBe(32)
  expect(newState.titleBarStyleCustom).toBe(true)
  expect(newState.controlsOverlayEnabled).toBe(false)
  expect(newState.workspaceUri).toBe('')
  expect(newState.titleBarButtons).toEqual(GetTitleBarButtons.getTitleBarButtons(PlatformType.Electron, false, true))
})

test('create3 - should initialize empty buttons for web layout with controls overlay', () => {
  const uid = 302

  Create3.create3(uid, 'file:///workspace', 0, 0, 640, 40, PlatformType.Web, true, false, '/web-assets')

  const { newState } = TitleBarMenuBarStates.get(uid)

  expect(newState.assetDir).toBe('/web-assets')
  expect(newState.platform).toBe(PlatformType.Web)
  expect(newState.controlsOverlayEnabled).toBe(true)
  expect(newState.titleBarStyleCustom).toBe(false)
  expect(newState.titleBarButtons).toEqual([])
  expect(newState.focusedIndex).toBe(-1)
  expect(newState.menus).toEqual([])
  expect(newState.titleBarEntries).toEqual([])
})