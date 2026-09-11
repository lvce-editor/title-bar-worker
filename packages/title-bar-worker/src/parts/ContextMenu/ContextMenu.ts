import { TransferMessagePortRpcParent } from '@lvce-editor/rpc'
import { RendererWorker } from '@lvce-editor/rpc-registry'

export const show2 = async (uid: number, menuId: string | number, x: number, y: number, args: any): Promise<void> => {
  const rpc = await TransferMessagePortRpcParent.create({
    commandMap: {},
    async send(port) {
      await RendererWorker.invokeAndTransfer('Menu.prepareContextMenu', port)
    },
  })
  try {
    await rpc.invoke('Menu.show2', uid, menuId, x, y, args)
  } catch (error) {
    await RendererWorker.invoke('Menu.hide')
    throw error
  } finally {
    await rpc.dispose()
  }
}
