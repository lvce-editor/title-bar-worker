import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as GetWindowId from '../src/parts/GetWindowId/GetWindowId.ts'

test('getWindowId - returns window id', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'GetWindowId.getWindowId'() {
      return 1
    },
  })

  const result = await GetWindowId.getWindowId()
  expect(result).toBe(1)
  expect(mockRpc.invocations).toEqual([['GetWindowId.getWindowId']])
})

test('getWindowId - returns different window id', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'GetWindowId.getWindowId'() {
      return 42
    },
  })

  const result = await GetWindowId.getWindowId()
  expect(result).toBe(42)
  expect(mockRpc.invocations).toEqual([['GetWindowId.getWindowId']])
})

test('getWindowId - returns zero', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'GetWindowId.getWindowId'() {
      return 0
    },
  })

  const result = await GetWindowId.getWindowId()
  expect(result).toBe(0)
  expect(mockRpc.invocations).toEqual([['GetWindowId.getWindowId']])
})
