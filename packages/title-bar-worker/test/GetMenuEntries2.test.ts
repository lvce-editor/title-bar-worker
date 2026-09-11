import { expect, jest, test } from '@jest/globals'
import { MenuEntryId } from '@lvce-editor/constants'
import { PlainMessagePortRpc } from '@lvce-editor/rpc'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { getMenuEntries2 } from '../src/parts/GetMenuEntries2/GetMenuEntries2.ts'

test('forwards the explicit platform and falls back to the state platform', async () => {
  const entries = [{ command: 'Editor.undo', flags: 0, label: 'Undo' }]
  const getEntries = jest.fn((_id: string | number, _platform: number) => entries)
  let peer: Awaited<ReturnType<typeof PlainMessagePortRpc.create>> | undefined
  using _mockRpc = RendererWorker.registerMockRpc({
    async 'SendMessagePortToExtensionHostWorker.sendMessagePortToMenuWorker'(port: MessagePort) {
      peer = await PlainMessagePortRpc.create({ commandMap: { 'Menu.getTitleBarMenuEntries': getEntries }, messagePort: port })
    },
  })
  try {
    const state = { ...createDefaultState(), platform: 2 }
    expect(await getMenuEntries2(state, { menuId: MenuEntryId.File, platform: 1 })).toEqual(entries)
    expect(getEntries).toHaveBeenLastCalledWith(MenuEntryId.File, 1)
    expect(await getMenuEntries2(state, { menuId: MenuEntryId.OpenRecent })).toEqual(entries)
    expect(getEntries).toHaveBeenLastCalledWith(MenuEntryId.OpenRecent, 2)
  } finally {
    await peer?.dispose()
  }
})
