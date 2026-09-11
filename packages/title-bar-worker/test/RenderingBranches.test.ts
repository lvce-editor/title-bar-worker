import { expect, test } from '@jest/globals'
import { PlatformType, VirtualDomElements } from '@lvce-editor/constants'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as DiffType from '../src/parts/DiffType/DiffType.ts'
import { getMenuEntries2 } from '../src/parts/GetMenuEntries2/GetMenuEntries2.ts'
import { getMenuItemSubMenuDom } from '../src/parts/GetMenuItemSubMenuDom/GetMenuItemSubMenuDom.ts'
import { getRenderer } from '../src/parts/GetRenderer/GetRenderer.ts'
import { getTitleBarIconVirtualDom } from '../src/parts/GetTitleBarIconVirtualDom/GetTitleBarIconVirtualDom.ts'
import { getTitleBarVirtualDom } from '../src/parts/GetTitleBarVirtualDom/GetTitleBarVirtualDom.ts'
import { getMenuEntries } from '../src/parts/MenuEntriesHelp/MenuEntriesHelp.ts'
import * as MenuItemFlags from '../src/parts/MenuItemFlags/MenuItemFlags.ts'
import { renderFocusContext } from '../src/parts/RenderFocusContext/RenderFocusContext.ts'
import { renderMenus } from '../src/parts/RenderMenus/RenderMenus.ts'
import { toMenuItem } from '../src/parts/ToMenuItem/ToMenuItem.ts'

test('disabled title bar icon produces no nodes', () => {
  expect(getTitleBarIconVirtualDom(false, '/icon.png')).toEqual([])
})

test('native Electron title bar produces an empty container', () => {
  const state = { ...createDefaultState(), platform: PlatformType.Electron, titleBarStyleCustom: false }
  expect(getTitleBarVirtualDom(state)).toEqual([{ childCount: 0, type: VirtualDomElements.Div }])
})

test('expanded focused submenu exposes its owned menu', () => {
  const dom = getMenuItemSubMenuDom({ flags: MenuItemFlags.SubMenu, isExpanded: true, isFocused: true, key: 0, label: 'More', level: 1 })
  expect(dom[0]).toMatchObject({ ariaExpanded: true, ariaOwns: 'Menu-2', className: 'MenuItem MenuItemSubMenu MenuItemFocused' })
})

test('focus context renderer is available through dispatch', () => {
  expect(getRenderer(DiffType.RenderFocusContext)).toBe(renderFocusContext)
})

test('unknown context menu has no entries', async () => {
  expect(await getMenuEntries2(createDefaultState(), { menuId: -1, platform: PlatformType.Web })).toEqual([])
})

test('web help excludes desktop tools and updates', async () => {
  const entries = await getMenuEntries(PlatformType.Web)
  expect(entries.map((entry) => entry.id)).not.toContain('toggleDeveloperTools')
  expect(entries.map((entry) => entry.id)).not.toContain('checkForUpdates')
  expect(entries[0].id).toBe('showAllCommands')
})

test('recent filesystem paths use the path command', () => {
  expect(toMenuItem('/tmp/project')).toMatchObject({ args: ['/tmp/project'], command: 'Workspace.setPath' })
})

test('renderMenus preserves unchanged menus and accepts omitted expanded state', () => {
  const menu = { focusedIndex: -1, items: [], level: 0, x: 0, y: 0 }
  const state = { ...createDefaultState(), menus: [menu] }
  expect(renderMenus(state, state)[3]).toEqual([])
  expect(renderMenus(createDefaultState(), state)[3][0][0]).toBe('addMenu')
  expect(renderMenus(state, { ...state, menus: [{ ...menu, focusedIndex: 0 }] })[3][0][0]).toBe('updateMenu')
})
