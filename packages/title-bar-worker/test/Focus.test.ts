import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as Focus from '../src/parts/Focus/Focus.ts'

test('setFocus - should call ParentRpc.invoke with correct parameters', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Focus.setFocus'() {},
  })

  await Focus.setFocus(42)

  expect(mockRpc.invocations).toEqual([['Focus.setFocus', 42]])
})

test('setFocus - should handle different focus keys', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Focus.setFocus'() {},
  })

  await Focus.setFocus(123)

  expect(mockRpc.invocations).toEqual([['Focus.setFocus', 123]])
})

test('setFocus - should handle zero focus key', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Focus.setFocus'() {},
  })

  await Focus.setFocus(0)

  expect(mockRpc.invocations).toEqual([['Focus.setFocus', 0]])
})
