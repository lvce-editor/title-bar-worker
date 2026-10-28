import { expect, test } from '@jest/globals'
import { MainAreaWorker, RendererWorker } from '@lvce-editor/rpc-registry'
import { hasOpenTextEditor } from '../src/parts/HasOpenTextEditor/HasOpenTextEditor.ts'

test('queries the getter directly using the owning application MainArea uid', async () => {
  using renderer = RendererWorker.registerMockRpc({ 'Viewlet.getMainAreaUid': () => 42 })
  using main = MainAreaWorker.registerMockRpc({ 'MainArea.hasOpenTextEditor': () => true })
  await expect(hasOpenTextEditor(8)).resolves.toBe(true)
  expect(renderer.invocations).toEqual([['Viewlet.getMainAreaUid', 8]])
  expect(main.invocations).toEqual([['MainArea.hasOpenTextEditor', 42]])
})

test('preserves a false getter result', async () => {
  using _renderer = RendererWorker.registerMockRpc({ 'Viewlet.getMainAreaUid': () => 42 })
  using _main = MainAreaWorker.registerMockRpc({ 'MainArea.hasOpenTextEditor': () => false })
  await expect(hasOpenTextEditor(8)).resolves.toBe(false)
})

test('returns false when the application MainArea is unavailable', async () => {
  using _renderer = RendererWorker.registerMockRpc({ 'Viewlet.getMainAreaUid': () => undefined })
  using main = MainAreaWorker.registerMockRpc({})
  await expect(hasOpenTextEditor(8)).resolves.toBe(false)
  expect(main.invocations).toEqual([])
})

test('returns false when resolving the application fails', async () => {
  using _renderer = RendererWorker.registerMockRpc({})
  await expect(hasOpenTextEditor(8)).resolves.toBe(false)
})

test('returns false when the direct query fails', async () => {
  using _renderer = RendererWorker.registerMockRpc({ 'Viewlet.getMainAreaUid': () => 42 })
  using _main = MainAreaWorker.registerMockRpc({})
  await expect(hasOpenTextEditor(8)).resolves.toBe(false)
})
