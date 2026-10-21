/* eslint-disable jest/no-restricted-jest-methods */
import { beforeEach, expect, jest, test } from '@jest/globals'

const invoke = jest.fn<(...args: readonly any[]) => Promise<readonly number[]>>()
const getCacheKey = jest.fn<(...args: readonly [readonly string[], number, number, string, number]) => Promise<string>>(
  async () => '/title-bar-measurements/v1/key',
)
const getWidths = jest.fn<(...args: readonly [string, number]) => Promise<readonly number[] | undefined>>(async () => undefined)
const setWidths = jest.fn<(...args: readonly [string, readonly number[]]) => Promise<void>>(async () => {})

await jest.unstable_mockModule('@lvce-editor/rpc-registry', () => ({
  TextMeasurementWorker: { invoke },
}))
await jest.unstable_mockModule('../src/parts/TitleBarMeasurementCache/TitleBarMeasurementCache.ts', () => ({
  getCacheKey,
  getWidths,
  setWidths,
}))

const MeasureTextWidths2 = await import('../src/parts/MeasureTextWidths2/MeasureTextWidths2.ts')

beforeEach(() => {
  jest.clearAllMocks()
  getCacheKey.mockResolvedValue('/title-bar-measurements/v1/key')
  getWidths.mockResolvedValue(undefined)
})

test('measureTextWidths2 measures text through the registered worker', async () => {
  invoke.mockResolvedValue([24, 40])

  await expect(MeasureTextWidths2.measureTextWidths2(['foo', 'hello'], 400, 14, 'Arial', 0)).resolves.toEqual([24, 40])

  expect(getCacheKey).toHaveBeenCalledWith(['foo', 'hello'], 400, 14, 'Arial', 0)
  expect(getWidths).toHaveBeenCalledWith('/title-bar-measurements/v1/key', 2)
  expect(setWidths).toHaveBeenCalledWith('/title-bar-measurements/v1/key', [24, 40])
  expect(invoke).toHaveBeenCalledWith('TextMeasurement.measureTextWidths', ['foo', 'hello'], 400, 14, 'Arial', 0, false, 0)
})

test('measureTextWidths2 reuses valid cached widths without launching the measurement worker', async () => {
  getWidths.mockResolvedValue([24, 40])

  await expect(MeasureTextWidths2.measureTextWidths2(['foo', 'hello'], 400, 14, 'Arial', 0)).resolves.toEqual([24, 40])

  expect(invoke).not.toHaveBeenCalled()
  expect(setWidths).not.toHaveBeenCalled()
})

test('measureTextWidths2 measures text when reading the cache fails', async () => {
  getWidths.mockRejectedValue(new Error('Cache unavailable'))
  invoke.mockResolvedValue([24])

  await expect(MeasureTextWidths2.measureTextWidths2(['foo'], 400, 14, 'Arial', 0)).resolves.toEqual([24])

  expect(invoke).toHaveBeenCalled()
})

test('measureTextWidths2 waits for cache reads beyond the former timeout', async () => {
  jest.useFakeTimers()
  try {
    const { promise: cachedWidths, resolve: resolveWidths } = Promise.withResolvers<readonly number[] | undefined>()
    getWidths.mockReturnValue(cachedWidths)
    const measurePromise = MeasureTextWidths2.measureTextWidths2(['foo'], 400, 14, 'Arial', 0)

    await jest.advanceTimersByTimeAsync(501)
    expect(getWidths).toHaveBeenCalled()
    expect(invoke).not.toHaveBeenCalled()
    resolveWidths([24])
    await expect(measurePromise).resolves.toEqual([24])

    expect(invoke).not.toHaveBeenCalled()
  } finally {
    jest.useRealTimers()
  }
})

test('measureTextWidths2 waits for a late cache key and uses it for cache writes', async () => {
  jest.useFakeTimers()
  const cacheKey = Promise.withResolvers<string>()
  const measurement = Promise.withResolvers<readonly number[]>()
  getCacheKey.mockImplementation(() => cacheKey.promise)
  invoke.mockImplementation(() => measurement.promise)

  try {
    const result = MeasureTextWidths2.measureTextWidths2(['foo'], 400, 14, 'Arial', 0)
    await jest.advanceTimersByTimeAsync(501)
    expect(invoke).not.toHaveBeenCalled()
    expect(getWidths).not.toHaveBeenCalled()
    cacheKey.resolve('/title-bar-measurements/v1/late-key')
    await Promise.resolve()
    await Promise.resolve()
    measurement.resolve([24])
    await expect(result).resolves.toEqual([24])

    expect(setWidths).toHaveBeenCalledWith('/title-bar-measurements/v1/late-key', [24])
  } finally {
    jest.useRealTimers()
  }
})

test('measureTextWidths2 does not schedule a timeout for a cache miss', async () => {
  jest.useFakeTimers()
  invoke.mockResolvedValue([24])

  try {
    await expect(MeasureTextWidths2.measureTextWidths2(['foo'], 400, 14, 'Arial', 0)).resolves.toEqual([24])

    expect(jest.getTimerCount()).toBe(0)
  } finally {
    jest.useRealTimers()
  }
})

test('measureTextWidths2 measures text when creating the cache key fails', async () => {
  getCacheKey.mockRejectedValue(new Error('Cache unavailable'))
  invoke.mockResolvedValue([24])

  await expect(MeasureTextWidths2.measureTextWidths2(['foo'], 400, 14, 'Arial', 0)).resolves.toEqual([24])

  expect(getWidths).not.toHaveBeenCalled()
  expect(setWidths).not.toHaveBeenCalled()
  expect(invoke).toHaveBeenCalled()
})

test('measureTextWidths2 keeps measurement failures when caching is unavailable', async () => {
  setWidths.mockRejectedValue(new Error('Cache unavailable'))
  invoke.mockResolvedValue([24])

  await expect(MeasureTextWidths2.measureTextWidths2(['foo'], 400, 14, 'Arial', 0)).resolves.toEqual([24])
})

test('measureTextWidths2 does not wait for cache writes', async () => {
  setWidths.mockImplementation(() => new Promise<void>(() => {}))
  invoke.mockResolvedValue([24])

  await expect(MeasureTextWidths2.measureTextWidths2(['foo'], 400, 14, 'Arial', 0)).resolves.toEqual([24])
})

test('measureTextWidths2 propagates measurement failures without disposing the shared worker', async () => {
  invoke.mockRejectedValue(new Error('Failed to measure text'))

  await expect(MeasureTextWidths2.measureTextWidths2(['foo'], 400, 14, 'Arial', 0)).rejects.toThrow('Failed to measure text')

  expect(invoke).toHaveBeenCalledTimes(1)
})

test('measureTextWidths2 rejects an invalid letter spacing', async () => {
  await expect(MeasureTextWidths2.measureTextWidths2(['foo'], 400, 14, 'Arial', undefined as any)).rejects.toThrow(
    'letterSpacing must be of type number',
  )

  expect(invoke).not.toHaveBeenCalled()
})
