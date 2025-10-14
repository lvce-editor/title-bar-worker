import { expect, test } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { TitleBarMenuBarState } from '../src/parts/TitleBarMenuBarState/TitleBarMenuBarState.ts'
import * as HandleClickToggleMaximize from '../src/parts/HandleClickToggleMaximize/HandleClickToggleMaximize.ts'

const createMockState = (): TitleBarMenuBarState => ({
  uid: 1,
  titleBarEntries: [],
  focusedIndex: -1,
  isMenuOpen: false,
  menus: [],
  labelFontWeight: 400,
  labelFontSize: 13,
  labelFontFamily: 'system-ui, Ubuntu, Droid Sans, sans-serif',
  labelPadding: 8,
  labelLetterSpacing: 0,
  titleBarHeight: 30,
  x: 0,
  y: 0,
  width: 800,
  height: 600,
  iconWidth: 30,
})

test('handleClickToggleMaximize - calls maximize when not maximized', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'ElectronWindow.maximize') {
        return undefined
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  RendererWorker.set(mockRpc)

  const state = createMockState()
  const result = await HandleClickToggleMaximize.handleClickToggleMaximize(state)
  expect(result).toBe(state)
})

test('handleClickToggleMaximize - calls unmaximize when maximized', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'ElectronWindow.unmaximize') {
        return undefined
      }
      if (method === 'ElectronWindow.maximize') {
        return undefined
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  RendererWorker.set(mockRpc)

  const state = createMockState()
  const result = await HandleClickToggleMaximize.handleClickToggleMaximize(state)
  expect(result).toBe(state)
})
