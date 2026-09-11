import { expect, jest, test } from '@jest/globals'

jest.unstable_mockModule('../src/parts/MenuEntries/MenuEntries.ts', () => ({
  getMenuEntries: async () => [{ command: 'Editor.undo', flags: 0, id: 'undo', label: 'Undo' }],
}))

const ViewletTitleBarMenuBar = await import('../src/parts/TitleBarMenuBar/TitleBarMenuBar.ts')

test('create', () => {
  // @ts-ignore
  const state = ViewletTitleBarMenuBar.create()
  expect(state).toBeDefined()
})
