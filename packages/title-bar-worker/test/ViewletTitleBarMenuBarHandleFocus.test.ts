import { expect, jest, test } from '@jest/globals'
import type { TitleBarMenuBarState } from '../src/parts/TitleBarMenuBarState/TitleBarMenuBarState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'

jest.unstable_mockModule('../src/parts/MenuEntries/MenuEntries.ts', () => ({
  getMenuEntries: async () => [{ command: 'Editor.undo', flags: 0, id: 'undo', label: 'Undo' }],
}))

const ViewletTitleBarMenuBarHandleFocus = await import('../src/parts/TitleBarMenuBar/ViewletTitleBarMenuBarHandleFocus.ts')

test('handleFocus sets focus and returns same state', async () => {
  const state: TitleBarMenuBarState = createDefaultState()
  const result = await ViewletTitleBarMenuBarHandleFocus.handleFocus(state)
  expect(result).toEqual({ ...state, focused: true })
})
