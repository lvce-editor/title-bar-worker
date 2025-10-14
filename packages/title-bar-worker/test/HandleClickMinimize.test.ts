import { expect, test } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { TitleBarMenuBarState } from '../src/parts/TitleBarMenuBarState/TitleBarMenuBarState.ts'
import * as HandleClickMinimize from '../src/parts/HandleClickMinimize/HandleClickMinimize.ts'

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

test('handleClickMinimize', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'ElectronWindow.minimize') {
        return undefined
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  RendererWorker.set(mockRpc)

  const state = createMockState()
  const result = await HandleClickMinimize.handleClickMinimize(state)
  expect(result).toBe(state)
})
