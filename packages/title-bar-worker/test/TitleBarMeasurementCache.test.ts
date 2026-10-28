/* eslint-disable jest/no-restricted-jest-methods */
import { expect, jest, test } from '@jest/globals'

const getCacheStorageJsonItem = jest.fn<(...args: readonly [string, string]) => Promise<null | { readonly value: unknown }>>(async () => null)
const setCacheStorageJsonItem = jest.fn<(...args: readonly [string, unknown, string]) => Promise<{ readonly success: true }>>(async () => ({
  success: true,
}))

await jest.unstable_mockModule('@lvce-editor/rpc-registry', () => ({
  CacheWorker: {
    getCacheStorageJsonItem,
    setCacheStorageJsonItem,
  },
}))

const TitleBarMeasurementCache = await import('../src/parts/TitleBarMeasurementCache/TitleBarMeasurementCache.ts')

test('title bar measurement cache keys include ordered labels and typography', async () => {
  const base = await TitleBarMeasurementCache.getCacheKey(['File', 'Edit'], 400, 14, 'Arial', 0)

  expect(base).toBe('https://cache.invalid/title-bar-measurements/v2/13ede2acd4f49b1bfa3d7b0589ef')
  await expect(TitleBarMeasurementCache.getCacheKey(['File', 'Edit'], 400, 14, 'Arial', 0)).resolves.toBe(base)
  await expect(TitleBarMeasurementCache.getCacheKey(['Edit', 'File'], 400, 14, 'Arial', 0)).resolves.not.toBe(base)
  await expect(TitleBarMeasurementCache.getCacheKey(['File', 'Edit'], 700, 14, 'Arial', 0)).resolves.not.toBe(base)
  await expect(TitleBarMeasurementCache.getCacheKey(['File', 'Edit'], 400, 16, 'Arial', 0)).resolves.not.toBe(base)
  await expect(TitleBarMeasurementCache.getCacheKey(['File', 'Edit'], 400, 14, 'Helvetica', 0)).resolves.not.toBe(base)
  await expect(TitleBarMeasurementCache.getCacheKey(['File', 'Edit'], 400, 14, 'Arial', 1)).resolves.not.toBe(base)
  await expect(TitleBarMeasurementCache.getCacheKey([], 400, 14, 'Arial', 0)).resolves.toBe(
    'https://cache.invalid/title-bar-measurements/v2/0d84511f1eb9ac10eb4b2d0aba9a',
  )
  const unicodeKey = await TitleBarMeasurementCache.getCacheKey(['😀', 'ファイル'], 400, 14, 'Arial', 0)
  expect(unicodeKey).toBe('https://cache.invalid/title-bar-measurements/v2/01b3a6c43a1cbc0bddea6810766b')
  await expect(TitleBarMeasurementCache.getCacheKey(['😀', 'ファイル'], 400, 14, 'Arial', 0)).resolves.toBe(unicodeKey)
  expect(unicodeKey).not.toBe(base)
})

test('title bar measurement cache reads and writes widths as persistent JSON', async () => {
  getCacheStorageJsonItem.mockResolvedValue({ value: [24, 40] })

  await expect(TitleBarMeasurementCache.getWidths('/title-bar-measurements/v1/key', 2)).resolves.toEqual([24, 40])

  await TitleBarMeasurementCache.setWidths('/title-bar-measurements/v1/key', [24, 40])

  expect(getCacheStorageJsonItem).toHaveBeenCalledWith('/title-bar-measurements/v1/key', 'lvce-title-bar-measurements-v1')
  expect(setCacheStorageJsonItem).toHaveBeenCalledWith('/title-bar-measurements/v1/key', [24, 40], 'lvce-title-bar-measurements-v1')
})

test('title bar measurement cache ignores invalid width payloads', async () => {
  getCacheStorageJsonItem.mockResolvedValue({ value: [24, '40'] })

  await expect(TitleBarMeasurementCache.getWidths('/title-bar-measurements/v1/key', 2)).resolves.toBeUndefined()
})

test('title bar measurement cache ignores non-array and incomplete payloads', async () => {
  getCacheStorageJsonItem.mockResolvedValueOnce({ value: { widths: [24, 40] } })
  getCacheStorageJsonItem.mockResolvedValueOnce({ value: [24] })

  await expect(TitleBarMeasurementCache.getWidths('/title-bar-measurements/v1/key', 2)).resolves.toBeUndefined()
  await expect(TitleBarMeasurementCache.getWidths('/title-bar-measurements/v1/key', 2)).resolves.toBeUndefined()
})
