import { expect, jest, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as MenuItemFlags from '../src/parts/MenuItemFlags/MenuItemFlags.ts'

jest.unstable_mockModule('../src/parts/MenuEntries/MenuEntries.ts', () => ({
  getMenuEntries: async () => [{ command: 'Editor.undo', flags: 0, id: 'undo', label: 'Undo' }],
}))

const { closeOneMenu } = await import('../src/parts/TitleBarMenuBar/ViewletTitleBarMenuBarCloseOneMenu.ts')
const { handleFocusOut } = await import('../src/parts/TitleBarMenuBar/ViewletTitleBarMenuBarHandleFocusOut.ts')
const { handleKeyArrowLeftMenuOpen } = await import('../src/parts/TitleBarMenuBar/ViewletTitleBarMenuBarHandleKeyArrowLeftMenuOpen.ts')
const { handleKeyArrowUpMenuOpen } = await import('../src/parts/TitleBarMenuBar/ViewletTitleBarMenuBarHandleKeyArrowUpMenuOpen.ts')
const { handleKeyEscapeMenuOpen } = await import('../src/parts/TitleBarMenuBar/ViewletTitleBarMenuBarHandleKeyEscapeMenuOpen.ts')
const { handleMenuClick } = await import('../src/parts/TitleBarMenuBar/ViewletTitleBarMenuBarHandleMenuClick.ts')
const { handleMenuMouseOver } = await import('../src/parts/TitleBarMenuBar/ViewletTitleBarMenuBarHandleMenuMouseOver.ts')
const { handleMouseOverMenuOpen } = await import('../src/parts/TitleBarMenuBar/ViewletTitleBarMenuBarHandleMouseOverMenuOpen.ts')
const { openMenuAtIndex } = await import('../src/parts/TitleBarMenuBar/ViewletTitleBarMenuBarOpenMenuAtIndex.ts')

const menu = { focusedIndex: -1, items: [], level: 0, x: 0, y: 0 }

test('navigation without a menu leaves state unchanged', async () => {
  const state = createDefaultState()
  expect(closeOneMenu(state)).toBe(state)
  expect(handleKeyArrowUpMenuOpen(state)).toBe(state)
  expect(await handleMouseOverMenuOpen(state, -1)).toBe(state)
  expect(await openMenuAtIndex(state, -1, true)).toBe(state)
  expect(await handleFocusOut(state)).toEqual(state)
})

test('escape closes the only menu and retains title bar focus', () => {
  const state = { ...createDefaultState(), focusedIndex: 0, isMenuOpen: true, menus: [menu] }
  const result = handleKeyEscapeMenuOpen(state)
  expect(result.menus).toEqual([])
  expect(result.isMenuOpen).toBe(false)
  expect(result.focusedIndex).toBe(0)
})

test('up arrow starts at the last focusable menu item', () => {
  const items = [
    { command: '', flags: MenuItemFlags.None, label: 'Run' },
    { command: '', flags: MenuItemFlags.Separator, label: '' },
  ]
  const state = { ...createDefaultState(), menus: [{ ...menu, items }] }
  expect(handleKeyArrowUpMenuOpen(state).menus[0].focusedIndex).toBe(0)
})

test.each([MenuItemFlags.None, MenuItemFlags.Unchecked, MenuItemFlags.Ignore, MenuItemFlags.RestoreFocus])(
  'menu click dispatches flag %s',
  async (flags) => {
    using mockRpc = RendererWorker.registerMockRpc({ 'Test.run': () => {} })
    const state = { ...createDefaultState(), isMenuOpen: true, menus: [{ ...menu, items: [{ command: 'Test.run', flags, label: 'Run' }] }] }
    const result = await handleMenuClick(state, 0, 0)
    expect(mockRpc.invocations).toEqual([['Test.run']])
    const expected = flags === MenuItemFlags.Ignore ? state : { ...state, isMenuOpen: false, menus: [] }
    expect(result).toEqual(expected)
  },
)

test('menu click ignores missing, disabled and unidentified submenu items', async () => {
  const state = {
    ...createDefaultState(),
    menus: [
      {
        ...menu,
        items: [
          { command: '', flags: MenuItemFlags.Disabled, label: 'Disabled' },
          { command: '', flags: MenuItemFlags.SubMenu, label: 'Submenu' },
        ],
      },
    ],
  }
  expect(await handleMenuClick(state, 0, -1)).toBe(state)
  expect(await handleMenuClick(state, 0, 0)).toBe(state)
  expect(await handleMenuClick(state, 0, 1)).toBe(state)
  expect(await handleMenuMouseOver(state, 0, 1)).toBe(state)
})

test('left arrow in the root menu opens the previous title bar entry', async () => {
  const state = {
    ...createDefaultState(),
    focusedIndex: 1,
    isMenuOpen: true,
    menus: [menu],
    titleBarEntries: [
      { flags: 0, isExpanded: false, isFocused: false, key: 0, label: 'File', level: 0 },
      { flags: 0, isExpanded: false, isFocused: false, key: 1, label: 'Edit', level: 0 },
    ],
  }
  expect(await handleKeyArrowLeftMenuOpen(state)).toMatchObject({ focusedIndex: 0, isMenuOpen: true })
})
