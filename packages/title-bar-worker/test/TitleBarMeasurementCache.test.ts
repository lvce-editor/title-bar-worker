/* eslint-disable jest/no-restricted-jest-methods */
import { expect, jest, test } from '@jest/globals'

const getCacheStorageItem = jest.fn<(...args: readonly [string, string]) => Promise<null | { readonly body: ArrayBuffer }>>(async () => null)
const setCacheStorageItem = jest.fn<
  (...args: readonly [string, string, string, Readonly<Record<string, string>>]) => Promise<{ readonly success: true }>
>(async () => ({ success: true }))

await jest.unstable_mockModule('@lvce-editor/rpc-registry', () => ({
  CacheWorker: {
    getCacheStorageItem,
    setCacheStorageItem,
  },
}))

const TitleBarMeasurementCache = await import('../src/parts/TitleBarMeasurementCache/TitleBarMeasurementCache.ts')
const cacheKeyPattern = /^\/title-bar-measurements\/v2\/[0-9a-f]{28}$/

test('title bar measurement cache keys include ordered labels and typography', async () => {
  const base = await TitleBarMeasurementCache.getCacheKey(['File', 'Edit'], 400, 14, 'Arial', 0)

  await expect(TitleBarMeasurementCache.getCacheKey(['File', 'Edit'], 400, 14, 'Arial', 0)).resolves.toBe(base)
  await expect(TitleBarMeasurementCache.getCacheKey(['Edit', 'File'], 400, 14, 'Arial', 0)).resolves.not.toBe(base)
  await expect(TitleBarMeasurementCache.getCacheKey(['File', 'Edit'], 700, 14, 'Arial', 0)).resolves.not.toBe(base)
  await expect(TitleBarMeasurementCache.getCacheKey(['File', 'Edit'], 400, 16, 'Arial', 0)).resolves.not.toBe(base)
  await expect(TitleBarMeasurementCache.getCacheKey(['File', 'Edit'], 400, 14, 'Helvetica', 0)).resolves.not.toBe(base)
  await expect(TitleBarMeasurementCache.getCacheKey(['File', 'Edit'], 400, 14, 'Arial', 1)).resolves.not.toBe(base)
  await expect(TitleBarMeasurementCache.getCacheKey([], 400, 14, 'Arial', 0)).resolves.toMatch(cacheKeyPattern)
  const unicodeKey = await TitleBarMeasurementCache.getCacheKey(['😀', 'ファイル'], 400, 14, 'Arial', 0)
  await expect(TitleBarMeasurementCache.getCacheKey(['😀', 'ファイル'], 400, 14, 'Arial', 0)).resolves.toBe(unicodeKey)
  expect(unicodeKey).not.toBe(base)
})

test('title bar measurement cache reads and writes widths as persistent JSON', async () => {
  const body = new TextEncoder().encode('[24,40]').buffer
  getCacheStorageItem.mockResolvedValue({ body })

  await expect(TitleBarMeasurementCache.getWidths('/title-bar-measurements/v1/key', 2)).resolves.toEqual([24, 40])

  await TitleBarMeasurementCache.setWidths('/title-bar-measurements/v1/key', [24, 40])

  expect(getCacheStorageItem).toHaveBeenCalledWith('/title-bar-measurements/v1/key', 'lvce-title-bar-measurements-v1')
  expect(setCacheStorageItem).toHaveBeenCalledWith('/title-bar-measurements/v1/key', '[24,40]', 'lvce-title-bar-measurements-v1', {
    'content-type': 'application/json',
  })
})

test('title bar measurement cache ignores invalid width payloads', async () => {
  getCacheStorageItem.mockResolvedValue({ body: new TextEncoder().encode('[24,"40"]').buffer })

  await expect(TitleBarMeasurementCache.getWidths('/title-bar-measurements/v1/key', 2)).resolves.toBeUndefined()
})

test('title bar measurement cache ignores non-array and incomplete payloads', async () => {
  getCacheStorageItem.mockResolvedValueOnce({ body: new TextEncoder().encode('{"widths":[24,40]}').buffer })
  getCacheStorageItem.mockResolvedValueOnce({ body: new TextEncoder().encode('[24]').buffer })

  await expect(TitleBarMeasurementCache.getWidths('/title-bar-measurements/v1/key', 2)).resolves.toBeUndefined()
  await expect(TitleBarMeasurementCache.getWidths('/title-bar-measurements/v1/key', 2)).resolves.toBeUndefined()
})
