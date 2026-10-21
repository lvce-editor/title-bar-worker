import { expect, test } from '@jest/globals'
import { MainAreaWorker } from '@lvce-editor/rpc-registry'
import { hasOpenTextEditor } from '../src/parts/HasOpenTextEditor/HasOpenTextEditor.ts'

test('hasOpenTextEditor queries the main area worker', async () => {
  using mockRpc = MainAreaWorker.registerMockRpc({
    'MainArea.hasOpenTextEditor'() {
      return true
    },
  })

  await expect(hasOpenTextEditor(42)).resolves.toBe(true)
  expect(mockRpc.invocations).toEqual([['MainArea.hasOpenTextEditor', 42]])
})

test('hasOpenTextEditor returns false when the main area is unavailable', async () => {
  using _mockRpc = MainAreaWorker.registerMockRpc({})

  await expect(hasOpenTextEditor(42)).resolves.toBe(false)
})

test('hasOpenTextEditor returns false when the main area query fails', async () => {
  using _mockRpc = MainAreaWorker.registerMockRpc({
    'MainArea.hasOpenTextEditor'() {
      throw new Error('unavailable')
    },
  })

  await expect(hasOpenTextEditor(42)).resolves.toBe(false)
})

test('hasOpenTextEditor returns false without a main area uid', async () => {
  await expect(hasOpenTextEditor(undefined)).resolves.toBe(false)
})
