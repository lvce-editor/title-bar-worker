import { LazyTransferMessagePortRpcParent, WebWorkerRpcClient } from '@lvce-editor/rpc'
import { CacheWorker, RendererWorker, TextMeasurementWorker } from '@lvce-editor/rpc-registry'
import * as CommandMap from '../CommandMap/CommandMap.ts'
import { registerCommands } from '../TitleBarMenuBarStates/TitleBarMenuBarStates.ts'

const registerCacheWorker = async (): Promise<void> => {
  const lazyRpc = await LazyTransferMessagePortRpcParent.create({
    commandMap: {},
    async send(port): Promise<void> {
      try {
        await RendererWorker.sendMessagePortToCacheWorker(port)
      } catch (error) {
        // The lazy RPC retains a failed connection promise. Let the next cache operation retry.
        await registerCacheWorker()
        throw error
      }
    },
  })
  CacheWorker.set(lazyRpc)
}

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
  await registerCacheWorker()
  await registerTextMeasurementWorker()
}
