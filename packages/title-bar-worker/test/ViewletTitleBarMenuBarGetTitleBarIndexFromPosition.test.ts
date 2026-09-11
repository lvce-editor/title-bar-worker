import { expect, jest, test } from '@jest/globals'

jest.unstable_mockModule('../src/parts/MenuEntries/MenuEntries.ts', () => ({
  getMenuEntries: async () => [{ command: 'Editor.undo', flags: 0, id: 'undo', label: 'Undo' }],
}))

const ViewletTitleBarMenuBarGetTitleBarIndexFromPosition = await import('../src/parts/TitleBarMenuBar/ViewletTitleBarMenuBarGetTitleBarIndexFromPosition.ts')

test('getTitleBarIndexFromPosition - first item', () => {
  const titleBarEntries = [
    {
      width: 40,
    },
    {
      width: 40,
    },
  ]
  expect(ViewletTitleBarMenuBarGetTitleBarIndexFromPosition.getTitleBarIndexFromPosition(titleBarEntries, 20, 10)).toBe(0)
})

test('getTitleBarIndexFromPosition - second item', () => {
  const titleBarEntries = [
    {
      width: 40,
    },
    {
      width: 40,
    },
  ]
  expect(ViewletTitleBarMenuBarGetTitleBarIndexFromPosition.getTitleBarIndexFromPosition(titleBarEntries, 50, 10)).toBe(1)
})

test('getTitleBarIndexFromPosition - no match', () => {
  const titleBarEntries = [
    {
      width: 40,
    },
    {
      width: 40,
    },
  ]
  expect(ViewletTitleBarMenuBarGetTitleBarIndexFromPosition.getTitleBarIndexFromPosition(titleBarEntries, 100, 10)).toBe(-1)
})

test('getTitleBarIndexFromPosition - empty entries', () => {
  const titleBarEntries: readonly any[] = []
  expect(ViewletTitleBarMenuBarGetTitleBarIndexFromPosition.getTitleBarIndexFromPosition(titleBarEntries, 50, 10)).toBe(-1)
})
