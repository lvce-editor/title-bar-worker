import { LazyTransferMessagePortRpcParent } from '@lvce-editor/rpc'
import { CacheWorker, RendererWorker } from '@lvce-editor/rpc-registry'

export const registerCacheWorker = async (): Promise<void> => {
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
