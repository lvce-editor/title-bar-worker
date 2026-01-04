import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as GetWindowId from '../src/parts/GetWindowId/GetWindowId.ts'

test('getWindowId - should return window id from RPC', async () => {
  const windowId: number = 42
  const mockRpc = RendererWorker.registerMockRpc({
    'GetWindowId.getWindowId'() {
      return windowId
    },
  })

  const result: number = await GetWindowId.getWindowId()
  expect(result).toBe(windowId)
  expect(mockRpc.invocations).toEqual([['GetWindowId.getWindowId']])
})

test('getWindowId - should return different window id', async () => {
  const windowId: number = 123
  const mockRpc = RendererWorker.registerMockRpc({
    'GetWindowId.getWindowId'() {
      return windowId
    },
  })

  const result: number = await GetWindowId.getWindowId()
  expect(result).toBe(windowId)
  expect(mockRpc.invocations).toEqual([['GetWindowId.getWindowId']])
})
