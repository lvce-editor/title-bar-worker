import { afterEach, beforeEach } from '@jest/globals'
import { PlainMessagePortRpc } from '@lvce-editor/rpc'
import { RendererWorker } from '@lvce-editor/rpc-registry'

const connections: { dispose(): Promise<void> }[] = []
export const menuWorkerCommands = {
  async 'SendMessagePortToExtensionHostWorker.sendMessagePortToMenuWorker'(port: MessagePort): Promise<void> {
    const rpc = await PlainMessagePortRpc.create({
      commandMap: {
        'Menu.getTitleBarMenuEntries': () => [{ command: 'Editor.undo', flags: 0, id: 'undo', label: 'Undo' }],
      },
      messagePort: port,
    })
    connections.push(rpc)
  },
}
beforeEach(() => {
  RendererWorker.registerMockRpc(menuWorkerCommands)
})
afterEach(async () => {
  await Promise.all(connections.splice(0).map((rpc) => rpc.dispose()))
})
