import { expect, jest, test } from '@jest/globals'
import { PlainMessagePortRpc } from '@lvce-editor/rpc'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import { getMenuEntries } from '../src/parts/MenuEntries/MenuEntries.ts'

test('requests menu worker entries over a direct connection', async () => {
  const entries = [{ command: 'Editor.undo', flags: 0, label: 'Undo' }]
  const getEntries = jest.fn((_id: string | number, _platform: number) => entries)
  let peer: Awaited<ReturnType<typeof PlainMessagePortRpc.create>> | undefined
  using _mockRpc = RendererWorker.registerMockRpc({
    async 'SendMessagePortToExtensionHostWorker.sendMessagePortToMenuWorker'(port: MessagePort) {
      peer = await PlainMessagePortRpc.create({ commandMap: { 'Menu.getTitleBarMenuEntries': getEntries }, messagePort: port })
    },
  })
  try {
    expect(await getMenuEntries('switchEditor', 2)).toEqual(entries)
    expect(getEntries).toHaveBeenCalledWith('switchEditor', 2)
  } finally {
    await peer?.dispose()
  }
})

test('propagates a menu worker failure', async () => {
  let peer: Awaited<ReturnType<typeof PlainMessagePortRpc.create>> | undefined
  using _mockRpc = RendererWorker.registerMockRpc({
    async 'SendMessagePortToExtensionHostWorker.sendMessagePortToMenuWorker'(port: MessagePort) {
      peer = await PlainMessagePortRpc.create({
        commandMap: {
          'Menu.getTitleBarMenuEntries': () => {
            throw new Error('menu unavailable')
          },
        },
        messagePort: port,
      })
    },
  })
  try {
    await expect(getMenuEntries('switchGroup')).rejects.toThrow('menu unavailable')
  } finally {
    await peer?.dispose()
  }
})
