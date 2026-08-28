/* eslint-disable jest/no-restricted-jest-methods */
import { beforeEach, expect, jest, test } from '@jest/globals'

const invoke = jest.fn<(...args: readonly any[]) => Promise<readonly number[]>>()
const dispose = jest.fn<() => Promise<void>>()
const launchTextMeasurementWorker = jest.fn(async () => ({
  invoke,
  [Symbol.asyncDispose]: dispose,
}))

await jest.unstable_mockModule('../src/parts/LaunchTextMeasurementWorker/LaunchTextMeasurementWorker.ts', () => ({
  launchTextMeasurementWorker,
}))

const MeasureTextWidths2 = await import('../src/parts/MeasureTextWidths2/MeasureTextWidths2.ts')

beforeEach(() => {
  jest.clearAllMocks()
})

test('measureTextWidths2 measures text and disposes the worker', async () => {
  invoke.mockResolvedValue([24, 40])

  await expect(MeasureTextWidths2.measureTextWidths2(['foo', 'hello'], 400, 14, 'Arial', 0)).resolves.toEqual([24, 40])

  expect(invoke).toHaveBeenCalledWith('TextMeasurement.measureTextWidths', ['foo', 'hello'], 400, 14, 'Arial', 0, false, 0)
  expect(dispose).toHaveBeenCalledTimes(1)
})

test('measureTextWidths2 disposes the worker when measurement fails', async () => {
  invoke.mockRejectedValue(new Error('Failed to measure text'))

  await expect(MeasureTextWidths2.measureTextWidths2(['foo'], 400, 14, 'Arial', 0)).rejects.toThrow('Failed to measure text')

  expect(dispose).toHaveBeenCalledTimes(1)
})

test('measureTextWidths2 rejects an invalid letter spacing', async () => {
  await expect(MeasureTextWidths2.measureTextWidths2(['foo'], 400, 14, 'Arial', undefined as any)).rejects.toThrow(
    'letterSpacing must be of type number',
  )

  expect(launchTextMeasurementWorker).not.toHaveBeenCalled()
})
