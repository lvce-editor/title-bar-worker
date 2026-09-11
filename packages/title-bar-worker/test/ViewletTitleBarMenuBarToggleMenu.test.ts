import { expect, jest, test } from '@jest/globals'
import type { TitleBarMenuBarState } from '../src/parts/TitleBarMenuBarState/TitleBarMenuBarState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'

jest.unstable_mockModule('../src/parts/MenuEntries/MenuEntries.ts', () => ({
  getMenuEntries: async () => [{ command: 'Editor.undo', flags: 0, id: 'undo', label: 'Undo' }],
}))

const ViewletTitleBarMenuBarToggleMenu = await import('../src/parts/TitleBarMenuBar/ViewletTitleBarMenuBarToggleMenu.ts')

test('toggleMenu with menu closed opens menu', async () => {
  const state: TitleBarMenuBarState = {
    ...createDefaultState(),
    focusedIndex: 0,
    isMenuOpen: false,
    titleBarEntries: [{ id: 2 }], // Edit menu ID
  }
  const result = await ViewletTitleBarMenuBarToggleMenu.toggleMenu(state)
  expect(result.isMenuOpen).toBe(true)
})

test('toggleMenu with menu open closes menu', async () => {
  const state: TitleBarMenuBarState = {
    ...createDefaultState(),
    isMenuOpen: true,
  }
  const result = await ViewletTitleBarMenuBarToggleMenu.toggleMenu(state)
  expect(result.isMenuOpen).toBe(false)
})
