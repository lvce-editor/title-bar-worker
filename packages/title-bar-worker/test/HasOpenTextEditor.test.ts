import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import { hasOpenTextEditor } from '../src/parts/HasOpenTextEditor/HasOpenTextEditor.ts'

test('hasOpenTextEditor - no open editor', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'GetActiveEditor.getOpenEditorUris'() {
      return []
    },
  })

  await expect(hasOpenTextEditor()).resolves.toBe(false)
  expect(mockRpc.invocations).toEqual([['GetActiveEditor.getOpenEditorUris']])
})

test('hasOpenTextEditor - empty editor URI', async () => {
  using _mockRpc = RendererWorker.registerMockRpc({
    'GetActiveEditor.getOpenEditorUris'() {
      return ['']
    },
  })

  await expect(hasOpenTextEditor()).resolves.toBe(false)
})

test('hasOpenTextEditor - text editor', async () => {
  using _mockRpc = RendererWorker.registerMockRpc({
    'GetActiveEditor.getOpenEditorUris'() {
      return ['memfs:///test/file.txt']
    },
  })

  await expect(hasOpenTextEditor()).resolves.toBe(true)
})

test('hasOpenTextEditor - extension detail', async () => {
  using _mockRpc = RendererWorker.registerMockRpc({
    'GetActiveEditor.getOpenEditorUris'() {
      return ['extension-detail://builtin.cobalt2']
    },
  })

  await expect(hasOpenTextEditor()).resolves.toBe(false)
})

test('hasOpenTextEditor - image editor', async () => {
  using _mockRpc = RendererWorker.registerMockRpc({
    'GetActiveEditor.getOpenEditorUris'() {
      return ['file:///test/image.PNG?version=1']
    },
  })

  await expect(hasOpenTextEditor()).resolves.toBe(false)
})

test('hasOpenTextEditor - unavailable getter', async () => {
  using mockRpc = RendererWorker.registerMockRpc({})

  await expect(hasOpenTextEditor()).resolves.toBe(false)
  expect(mockRpc.invocations).toEqual([['GetActiveEditor.getOpenEditorUris'], ['GetActiveEditor.getActiveEditorId']])
})

test('hasOpenTextEditor - active text editor fallback', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'GetActiveEditor.getActiveEditorId'() {
      return 42
    },
  })

  await expect(hasOpenTextEditor()).resolves.toBe(true)
  expect(mockRpc.invocations).toEqual([['GetActiveEditor.getOpenEditorUris'], ['GetActiveEditor.getActiveEditorId']])
})
