import { expect, test } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as HandleClickToggleMaximize from '../src/parts/HandleClickToggleMaximize/HandleClickToggleMaximize.ts'

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

  const state = { ...createDefaultState(), height: 600 }
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

  const state = { ...createDefaultState(), height: 600 }
  const result = await HandleClickToggleMaximize.handleClickToggleMaximize(state)
  expect(result).toBe(state)
})
