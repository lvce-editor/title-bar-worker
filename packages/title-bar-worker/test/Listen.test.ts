/* eslint-disable jest/no-restricted-jest-methods */
import { afterEach, expect, jest, test } from '@jest/globals'
import * as Rpc from '@lvce-editor/rpc'
import { CacheWorker, RendererWorker, TextMeasurementWorker } from '@lvce-editor/rpc-registry'

const rendererRpc = Rpc.createMockRpc({})
const create = jest.fn(async (_options: { readonly commandMap: Readonly<Record<string, unknown>> }) => rendererRpc)
const registerCommands = jest.fn()

await jest.unstable_mockModule('@lvce-editor/rpc', () => ({
  ...Rpc,
  WebWorkerRpcClient: { create },
}))
await jest.unstable_mockModule('../src/parts/CommandMap/CommandMap.ts', () => ({ commandMap: {} }))
await jest.unstable_mockModule('../src/parts/TitleBarMenuBarStates/TitleBarMenuBarStates.ts', () => ({ registerCommands }))

const { listen } = await import('../src/parts/Listen/Listen.ts')
const connections: Awaited<ReturnType<typeof Rpc.PlainMessagePortRpc.create>>[] = []

const connect = async (port: MessagePort): Promise<void> => {
  const rpc = await Rpc.PlainMessagePortRpc.create({
    commandMap: {
      'Cache.getCacheStorageItem': (): null => null,
      'Cache.setCacheStorageItem': (): { readonly success: true } => ({ success: true }),
      'TextMeasurement.measureTextWidths': (): readonly number[] => [24],
    },
    messagePort: port,
  })
  connections.push(rpc)
}

afterEach(async () => {
  await Promise.all(connections.map((rpc) => rpc.dispose()))
  connections.length = 0
})

test('registers the renderer and a lazy cache connection during listen', async () => {
  await listen()
  expect(create).toHaveBeenCalledWith({ commandMap: {} })
  expect(registerCommands).toHaveBeenCalledWith({})

  using renderer = RendererWorker.registerMockRpc({
    'SendMessagePortToExtensionHostWorker.sendMessagePortToCacheWorker': connect,
  })
  expect(renderer.invocations).toEqual([])
  await expect(CacheWorker.getCacheStorageItem('/key', 'measurements')).resolves.toBeNull()
  expect(renderer.invocations).toHaveLength(1)
  await CacheWorker.dispose()
})

test('shares the first cache connection between concurrent reads and writes', async () => {
  await listen()
  using renderer = RendererWorker.registerMockRpc({
    'SendMessagePortToExtensionHostWorker.sendMessagePortToCacheWorker': connect,
  })

  await expect(
    Promise.all([CacheWorker.getCacheStorageItem('/key', 'measurements'), CacheWorker.setCacheStorageItem('/key', '[24,40]', 'measurements', {})]),
  ).resolves.toEqual([null, { success: true }])
  expect(renderer.invocations).toHaveLength(1)
  await CacheWorker.dispose()
})

test('registers a lazy text measurement connection and shares concurrent first use', async () => {
  await listen()
  using renderer = RendererWorker.registerMockRpc({
    'SendMessagePortToExtensionHostWorker.sendMessagePortToTextMeasurementWorker': connect,
  })

  expect(renderer.invocations).toEqual([])
  await expect(
    Promise.all([
      TextMeasurementWorker.invoke('TextMeasurement.measureTextWidths', ['foo']),
      TextMeasurementWorker.invoke('TextMeasurement.measureTextWidths', ['bar']),
    ]),
  ).resolves.toEqual([[24], [24]])
  expect(renderer.invocations).toHaveLength(1)
  await expect(TextMeasurementWorker.invoke('TextMeasurement.measureTextWidths', ['baz'])).resolves.toEqual([24])
  expect(renderer.invocations).toHaveLength(1)
  await TextMeasurementWorker.dispose()
})

test('allows the next measurement to retry after a failed shared handoff', async () => {
  await listen()
  const send = jest.fn(connect).mockImplementationOnce(async (port) => {
    port.close()
    throw new Error('Text measurement worker unavailable')
  })
  using renderer = RendererWorker.registerMockRpc({
    'SendMessagePortToExtensionHostWorker.sendMessagePortToTextMeasurementWorker': send,
  })

  const results = await Promise.allSettled([
    TextMeasurementWorker.invoke('TextMeasurement.measureTextWidths', ['foo']),
    TextMeasurementWorker.invoke('TextMeasurement.measureTextWidths', ['bar']),
  ])
  expect(results).toEqual([
    { reason: expect.objectContaining({ message: expect.stringContaining('Text measurement worker unavailable') }), status: 'rejected' },
    { reason: expect.objectContaining({ message: expect.stringContaining('Text measurement worker unavailable') }), status: 'rejected' },
  ])
  await expect(TextMeasurementWorker.invoke('TextMeasurement.measureTextWidths', ['baz'])).resolves.toEqual([24])
  expect(send).toHaveBeenCalledTimes(2)
  expect(renderer.invocations).toHaveLength(2)
  await TextMeasurementWorker.dispose()
})

test('allows the next cache operation to retry after a failed shared handoff', async () => {
  await listen()
  const send = jest.fn(connect).mockImplementationOnce(async (port) => {
    port.close()
    throw new Error('Cache worker unavailable')
  })
  using renderer = RendererWorker.registerMockRpc({
    'SendMessagePortToExtensionHostWorker.sendMessagePortToCacheWorker': send,
  })

  const results = await Promise.allSettled([
    CacheWorker.getCacheStorageItem('/key', 'measurements'),
    CacheWorker.getCacheStorageItem('/other', 'measurements'),
  ])
  expect(results).toEqual([
    { reason: expect.objectContaining({ message: expect.stringContaining('Cache worker unavailable') }), status: 'rejected' },
    { reason: expect.objectContaining({ message: expect.stringContaining('Cache worker unavailable') }), status: 'rejected' },
  ])
  expect(send).toHaveBeenCalledTimes(1)
  await expect(CacheWorker.getCacheStorageItem('/key', 'measurements')).resolves.toBeNull()
  expect(send).toHaveBeenCalledTimes(2)
  expect(renderer.invocations).toHaveLength(2)
  await CacheWorker.dispose()
})
