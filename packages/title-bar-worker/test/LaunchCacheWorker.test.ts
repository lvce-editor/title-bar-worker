/* eslint-disable jest/no-restricted-jest-methods */
import { expect, jest, test } from '@jest/globals'

const rpc = {}
const create = jest.fn(async () => rpc)
const set = jest.fn()
const sendMessagePortToCacheWorker = jest.fn(async () => {})

await jest.unstable_mockModule('@lvce-editor/rpc', () => ({
  TransferMessagePortRpcParent: { create },
}))
await jest.unstable_mockModule('@lvce-editor/rpc-registry', () => ({
  CacheWorker: { set },
  RendererWorker: { sendMessagePortToCacheWorker },
}))

const LaunchCacheWorker = await import('../src/parts/LaunchCacheWorker/LaunchCacheWorker.ts')

test('retries cache worker connection after launch fails', async () => {
  create.mockRejectedValueOnce(new Error('Cache worker unavailable'))

  await expect(LaunchCacheWorker.launchCacheWorker()).rejects.toThrow('Cache worker unavailable')
  await expect(LaunchCacheWorker.launchCacheWorker()).resolves.toBeUndefined()

  expect(create).toHaveBeenCalledTimes(2)
  expect(set).toHaveBeenCalledWith(rpc)
})

test('launches a shared cache worker connection', async () => {
  await LaunchCacheWorker.launchCacheWorker()
  await LaunchCacheWorker.launchCacheWorker()

  expect(create).toHaveBeenCalledTimes(2)
  expect(set).toHaveBeenCalledWith(rpc)
})
