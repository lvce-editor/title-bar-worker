/* eslint-disable jest/no-restricted-jest-methods */
import { expect, jest, test } from '@jest/globals'

const cacheEntries = new Map<string, unknown>()
const getCacheStorageJsonItem = jest.fn(async (key: string) => {
  const value = cacheEntries.get(key)
  return cacheEntries.has(key) ? { value } : null
})
const setCacheStorageJsonItem = jest.fn(async (key: string, value: unknown) => {
  cacheEntries.set(key, value)
  return { success: true as const }
})
const invoke = jest.fn(async () => [24, 40])

await jest.unstable_mockModule('@lvce-editor/rpc-registry', () => ({
  CacheWorker: {
    getCacheStorageJsonItem,
    setCacheStorageJsonItem,
  },
  TextMeasurementWorker: { invoke },
}))

const MeasureTextWidths2 = await import('../src/parts/MeasureTextWidths2/MeasureTextWidths2.ts')

test('reuses persisted text widths after a title bar reload', async () => {
  await expect(MeasureTextWidths2.measureTextWidths2(['File', 'Edit'], 400, 14, 'Arial', 0)).resolves.toEqual([24, 40])
  expect(invoke).toHaveBeenCalledTimes(1)
  expect(cacheEntries.size).toBe(1)

  await expect(MeasureTextWidths2.measureTextWidths2(['File', 'Edit'], 400, 14, 'Arial', 0)).resolves.toEqual([24, 40])

  expect(getCacheStorageJsonItem).toHaveBeenCalledTimes(2)
  expect(invoke).toHaveBeenCalledTimes(1)
  expect(setCacheStorageJsonItem).toHaveBeenCalledTimes(1)
})

test('measures again when title bar items or typography change', async () => {
  invoke.mockResolvedValue([32, 16])

  await expect(MeasureTextWidths2.measureTextWidths2(['Edit', 'File'], 400, 14, 'Arial', 0)).resolves.toEqual([32, 16])
  await expect(MeasureTextWidths2.measureTextWidths2(['Edit', 'File'], 700, 14, 'Arial', 0)).resolves.toEqual([32, 16])
  await expect(MeasureTextWidths2.measureTextWidths2(['Edit', 'File'], 700, 16, 'Arial', 0)).resolves.toEqual([32, 16])

  expect(invoke).toHaveBeenCalledTimes(4)
})
