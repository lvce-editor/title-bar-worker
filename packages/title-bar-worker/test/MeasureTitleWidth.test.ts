import { expect, jest, test } from '@jest/globals'

const mockMeasureTextWidths = jest.fn<(...args: readonly unknown[]) => Promise<readonly number[]>>()

jest.unstable_mockModule('../src/parts/MeasureTextWidths/MeasureTextWidths.ts', () => ({
  measureTextWidths: mockMeasureTextWidths,
}))

const { measureTitleWidth } = await import('../src/parts/MeasureTitleWidth/MeasureTitleWidth.ts')

test.each([
  [[42], 42],
  [[], 0],
] as const)('measureTitleWidth handles measurement %j', async (widths, expected) => {
  mockMeasureTextWidths.mockResolvedValue(widths)
  expect(await measureTitleWidth('Editor', 400, 13, 'Arial', 0)).toBe(expected)
  expect(mockMeasureTextWidths).toHaveBeenLastCalledWith(['Editor'], 400, 13, 'Arial', 0)
})
