import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as HandleClickMinimize from '../src/parts/HandleClickMinimize/HandleClickMinimize.ts'

test('handleClickMinimize', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'ElectronWindow.minimize'() {},
  })

  const state = { ...createDefaultState(), height: 600 }
  const result = await HandleClickMinimize.handleClickMinimize(state)
  expect(result).toBe(state)
  expect(mockRpc.invocations).toEqual([['ElectronWindow.minimize']])
})
