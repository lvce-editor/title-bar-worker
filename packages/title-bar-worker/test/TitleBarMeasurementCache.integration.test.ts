/* eslint-disable jest/no-restricted-jest-methods */
import { expect, jest, test } from '@jest/globals'

const cacheEntries = new Map<string, ArrayBuffer>()
const getCacheStorageItem = jest.fn(async (key: string) => {
  const body = cacheEntries.get(key)
  return body ? { body } : null
})
const setCacheStorageItem = jest.fn(async (key: string, body: string) => {
  cacheEntries.set(key, new TextEncoder().encode(body).buffer)
  return { success: true as const }
})
const invoke = jest.fn(async () => [24, 40])
const dispose = jest.fn(async () => {})
const launchTextMeasurementWorker = async (): Promise<{ readonly invoke: typeof invoke; readonly [Symbol.asyncDispose]: typeof dispose }> => ({
  invoke,
  [Symbol.asyncDispose]: dispose,
})

await jest.unstable_mockModule('@lvce-editor/rpc-registry', () => ({
  CacheWorker: {
    getCacheStorageItem,
    setCacheStorageItem,
  },
}))
await jest.unstable_mockModule('../src/parts/LaunchTextMeasurementWorker/LaunchTextMeasurementWorker.ts', () => ({
  launchTextMeasurementWorker,
}))

const MeasureTextWidths2 = await import('../src/parts/MeasureTextWidths2/MeasureTextWidths2.ts')

test('reuses persisted text widths after a title bar reload', async () => {
  await expect(MeasureTextWidths2.measureTextWidths2(['File', 'Edit'], 400, 14, 'Arial', 0)).resolves.toEqual([24, 40])
  expect(invoke).toHaveBeenCalledTimes(1)
  expect(cacheEntries.size).toBe(1)

  await expect(MeasureTextWidths2.measureTextWidths2(['File', 'Edit'], 400, 14, 'Arial', 0)).resolves.toEqual([24, 40])

  expect(getCacheStorageItem).toHaveBeenCalledTimes(2)
  expect(invoke).toHaveBeenCalledTimes(1)
  expect(setCacheStorageItem).toHaveBeenCalledTimes(1)
})

test('measures again when title bar items or typography change', async () => {
  invoke.mockResolvedValue([32, 16])

  await expect(MeasureTextWidths2.measureTextWidths2(['Edit', 'File'], 400, 14, 'Arial', 0)).resolves.toEqual([32, 16])
  await expect(MeasureTextWidths2.measureTextWidths2(['Edit', 'File'], 700, 14, 'Arial', 0)).resolves.toEqual([32, 16])
  await expect(MeasureTextWidths2.measureTextWidths2(['Edit', 'File'], 700, 16, 'Arial', 0)).resolves.toEqual([32, 16])

  expect(invoke).toHaveBeenCalledTimes(4)
})
