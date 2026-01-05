import type { Rpc } from '@lvce-editor/rpc'
import { TransferMessagePortRpcParent } from '@lvce-editor/rpc'
import { RendererWorker } from '@lvce-editor/rpc-registry'

export const launchTextMeasurementWorker = async (): Promise<Rpc> => {
  const rpc = await TransferMessagePortRpcParent.create({
    commandMap: {},
    async send(port) {
      await RendererWorker.sendMessagePortToTextMeasurementWorker(port)
    },
  })
  return rpc
}
