import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as HandleClickToggleMaximize from '../src/parts/HandleClickToggleMaximize/HandleClickToggleMaximize.ts'

test('handleClickToggleMaximize - calls maximize when not maximized', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'ElectronWindow.maximize'() {},
  })

  const state = { ...createDefaultState(), height: 600 }
  const result = await HandleClickToggleMaximize.handleClickToggleMaximize(state)
  expect(result).toBe(state)
  expect(mockRpc.invocations).toEqual([['ElectronWindow.maximize']])
})

test('handleClickToggleMaximize - calls unmaximize when maximized', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'ElectronWindow.unmaximize'() {},
    'ElectronWindow.maximize'() {},
  })

  const state = { ...createDefaultState(), height: 600, isMaximized: true }
  const result = await HandleClickToggleMaximize.handleClickToggleMaximize(state)
  expect(result).toBe(state)
  expect(mockRpc.invocations).toEqual([['ElectronWindow.unmaximize']])
})
