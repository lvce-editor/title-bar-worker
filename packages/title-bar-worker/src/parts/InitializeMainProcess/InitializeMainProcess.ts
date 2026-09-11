import { RpcId } from '@lvce-editor/constants'
import { LazyTransferMessagePortRpcParent } from '@lvce-editor/rpc'
import { get, MainProcess, RendererWorker } from '@lvce-editor/rpc-registry'

const send = async (port: MessagePort): Promise<void> => {
  await RendererWorker.invokeAndTransfer(
    'SendMessagePortToMainProcess.sendMessagePortToMainProcess',
    port,
    'HandleElectronMessagePort.handleElectronMessagePort',
    0,
  )
}

export const initializeMainProcess = async (): Promise<void> => {
  if (get(RpcId.MainProcess)) {
    return
  }
  const rpc = await LazyTransferMessagePortRpcParent.create({
    commandMap: {},
    send,
  })
  MainProcess.set(rpc)
}
