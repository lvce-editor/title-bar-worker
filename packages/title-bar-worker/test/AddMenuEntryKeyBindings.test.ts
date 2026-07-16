import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as AddMenuEntryKeyBindings from '../src/parts/AddMenuEntryKeyBindings/AddMenuEntryKeyBindings.ts'

test('addMenuEntryKeyBindings - adds returned keys', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Layout.getKeyBindings'(entries: readonly unknown[]) {
      expect(entries).toEqual([
        {
          args: undefined,
          command: 'Main.newFile',
        },
        {
          args: ['Terminal'],
          command: 'Layout.togglePanel',
        },
        {
          args: undefined,
          command: 'missing',
        },
      ])
      return [2090, 2137, 0]
    },
  })

  const entries = [
    {
      command: 'Main.newFile',
      flags: 0,
      label: 'New File',
    },
    {
      args: ['Terminal'],
      command: 'Layout.togglePanel',
      flags: 0,
      label: 'New Terminal',
    },
    {
      command: 'missing',
      flags: 0,
      label: 'Missing',
    },
  ]

  await expect(AddMenuEntryKeyBindings.addMenuEntryKeyBindings(entries)).resolves.toEqual([
    {
      command: 'Main.newFile',
      flags: 0,
      key: 2090,
      label: 'New File',
    },
    {
      args: ['Terminal'],
      command: 'Layout.togglePanel',
      flags: 0,
      key: 2137,
      label: 'New Terminal',
    },
    {
      command: 'missing',
      flags: 0,
      label: 'Missing',
    },
  ])
  expect(mockRpc.invocations).toHaveLength(1)
})

test('addMenuEntryKeyBindings - preserves entries without keys', async () => {
  using _mockRpc = RendererWorker.registerMockRpc({
    'Layout.getKeyBindings'() {
      return [0]
    },
  })
  const entries = [
    {
      command: '',
      flags: 1,
      label: '',
    },
  ]

  await expect(AddMenuEntryKeyBindings.addMenuEntryKeyBindings(entries)).resolves.toBe(entries)
})

test('addMenuEntryKeyBindings - preserves entries when query fails', async () => {
  using _mockRpc = RendererWorker.registerMockRpc({
    'Layout.getKeyBindings'() {
      throw new Error('Failed')
    },
  })
  const entries = [
    {
      command: 'Main.newFile',
      flags: 0,
      label: 'New File',
    },
  ]

  await expect(AddMenuEntryKeyBindings.addMenuEntryKeyBindings(entries)).resolves.toBe(entries)
})
