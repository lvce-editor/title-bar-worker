import { LazyTransferMessagePortRpcParent, WebWorkerRpcClient } from '@lvce-editor/rpc'
import { RendererWorker, TextMeasurementWorker } from '@lvce-editor/rpc-registry'
import * as CommandMap from '../CommandMap/CommandMap.ts'
import * as RegisterCacheWorker from '../RegisterCacheWorker/RegisterCacheWorker.ts'
import { registerCommands } from '../TitleBarMenuBarStates/TitleBarMenuBarStates.ts'

const registerTextMeasurementWorker = async (): Promise<void> => {
  const lazyRpc = await LazyTransferMessagePortRpcParent.create({
    commandMap: {},
    async send(port): Promise<void> {
      try {
        await RendererWorker.sendMessagePortToTextMeasurementWorker(port)
      } catch (error) {
        // The lazy RPC retains a failed connection promise. Let the next measurement retry.
        await registerTextMeasurementWorker()
        throw error
      }
    },
  })
  TextMeasurementWorker.set(lazyRpc)
}

export const listen = async (): Promise<void> => {
  registerCommands(CommandMap.commandMap)
  const rpc = await WebWorkerRpcClient.create({
    commandMap: CommandMap.commandMap,
  })
  RendererWorker.set(rpc)
  await RegisterCacheWorker.registerCacheWorker()
  await registerTextMeasurementWorker()
}
