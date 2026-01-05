import { TransferMessagePortRpcParent } from '@lvce-editor/rpc'
import { RendererWorker } from '@lvce-editor/rpc-registry'

interface Rpc2 {
  readonly invoke: (method: string, ...params: readonly any[]) => Promise<any>
  readonly [Symbol.asyncDispose]: () => Promise<void>
}

export const launchTextMeasurementWorker = async (): Promise<Rpc2> => {
  const rpc = await TransferMessagePortRpcParent.create({
    commandMap: {},
    async send(port) {
      await RendererWorker.sendMessagePortToTextMeasurementWorker(port)
    },
  })
  return {
    invoke: rpc.invoke.bind(rpc),
    async [Symbol.asyncDispose](): Promise<void> {
      await rpc.dispose()
    },
  }
}
