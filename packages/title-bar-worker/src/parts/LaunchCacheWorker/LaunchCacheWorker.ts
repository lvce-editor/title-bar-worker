import { TransferMessagePortRpcParent } from '@lvce-editor/rpc'
import { CacheWorker, RendererWorker } from '@lvce-editor/rpc-registry'

const createCacheWorkerLauncher = (): (() => Promise<void>) => {
  let cacheWorkerPromise: Promise<void> | undefined

  return async (): Promise<void> => {
    if (!cacheWorkerPromise) {
      cacheWorkerPromise = (async (): Promise<void> => {
        const rpc = await TransferMessagePortRpcParent.create({
          commandMap: {},
          async send(port): Promise<void> {
            await RendererWorker.sendMessagePortToCacheWorker(port)
          },
        })
        CacheWorker.set(rpc)
      })()
    }
    try {
      await cacheWorkerPromise
    } catch (error) {
      cacheWorkerPromise = undefined
      throw error
    }
  }
}

export const launchCacheWorker = createCacheWorkerLauncher()
