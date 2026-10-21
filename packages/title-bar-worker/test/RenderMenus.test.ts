import { expect, test } from '@jest/globals'
import type { IMenu } from '../src/parts/IMenu/IMenu.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as DomEventListenerFunctions from '../src/parts/DomEventListenerFunctions/DomEventListenerFunctions.ts'
import { getMenuRootVirtualDom } from '../src/parts/GetMenuRootVirtualDom/GetMenuRootVirtualDom.ts'
import * as MenuItemFlags from '../src/parts/MenuItemFlags/MenuItemFlags.ts'
import { renderMenus } from '../src/parts/RenderMenus/RenderMenus.ts'

const menu: IMenu = {
  focusedIndex: 0,
  items: [
    { command: '', flags: MenuItemFlags.None, label: 'Open' },
    { command: '', flags: MenuItemFlags.Separator, label: '' },
    { command: '', flags: MenuItemFlags.SubMenu, label: 'Recent' },
  ],
  level: 0,
  x: 30,
  y: 30,
}
const state = { ...createDefaultState(101), menuRevision: 12, menus: [], menuUid: 202 }

test('opening declares exactly one root widget with worker-defined listeners and parent event routing', () => {
  const commands = renderMenus(state, { ...state, menus: [menu] })
  expect(commands.filter((command) => command[0] === 'Viewlet.createFunctionalRoot')).toEqual([
    ['Viewlet.createFunctionalRoot', 'TitleBarMenu', 202, true, undefined, 101],
  ])
  expect(commands).toContainEqual(['Viewlet.setWidgets', 101, 12, [202]])
  const registration = commands.find((command) => command[0] === 'Viewlet.registerEventListeners')
  expect(registration?.[2]).toContainEqual({
    name: DomEventListenerFunctions.HandleMenuItemClick,
    params: ['handleMenuItemClick', 'event.target.name'],
  })
  const outside = commands.find((command) => command[0] === 'Viewlet.registerOutsideEventListeners')
  expect(outside?.slice(1, 3)).toEqual([202, 101])
  expect(outside?.[3]).toContainEqual({ event: 'click', ignoreSelectors: ['.TitleBarMenuBar'], params: ['closeMenu', false] })
  expect(commands.at(-1)).toEqual(['Viewlet.focusSelector', 202, '#Menu-0 > :nth-child(1)'])
})

test('all menu levels share one root and preserve semantics, item indices and positioning', () => {
  const dom = getMenuRootVirtualDom([menu, { ...menu, level: 1, x: 280, y: 82 }])
  expect(dom[0]).toMatchObject({ childCount: 2, className: 'TitleBarMenuRoot' })
  expect(dom.filter((node) => node.className === 'TitleBarMenuRoot')).toHaveLength(1)
  expect(dom.filter((node) => node.role === 'menu').map((node) => node.id)).toEqual(['Menu-0', 'Menu-1'])
  expect(dom.find((node) => node.id === 'Menu-1')).toMatchObject({ childCount: 3, style: 'left:280px;top:82px;width:250px;height:71px' })
  expect(dom.find((node) => node.name === '1:2')).toMatchObject({ ariaHasPopup: true, role: 'menuitem' })
})

test('updates rerender the same widget and closing declares no remaining roots', () => {
  const open = { ...state, menus: [menu] }
  const commands = renderMenus(open, { ...open, menus: [menu, { ...menu, focusedIndex: -1, level: 1 }] })
  expect(commands.filter((command) => command[0] === 'Viewlet.createFunctionalRoot')).toEqual([])
  expect(commands).toContainEqual(['Viewlet.setWidgets', 101, 12, [202]])
  expect(commands.at(-1)).toEqual(['Viewlet.focusSelector', 202, '#Menu-0 > :nth-child(1)'])
  expect(renderMenus(open, state)).toEqual([['Viewlet.setWidgets', 101, 12, []]])
})

test('mouse opening retains focus in the menu bar until an item is selected', () => {
  const commands = renderMenus(state, { ...state, menus: [{ ...menu, focusedIndex: -1 }] })
  expect(commands.some((command) => command[0] === 'Viewlet.focusSelector')).toBe(false)
})

test('keyboard opening of a submenu focuses its selected item after declaring the widget', () => {
  const open = { ...state, menus: [menu] }
  const commands = renderMenus(open, { ...open, menus: [menu, { ...menu, focusedIndex: 2, level: 1 }] })
  expect(commands.at(-1)).toEqual(['Viewlet.focusSelector', 202, '#Menu-1 > :nth-child(3)'])
})

test('missing runtime widget identity is detected before rendering an open menu', () => {
  const oldState = createDefaultState()
  expect(renderMenus(oldState, oldState)).toEqual([])
  expect(() => renderMenus(oldState, { ...oldState, menus: [menu] })).toThrow('Title bar menu widget UID was not allocated')
})

test('explicit menu dimensions and empty menu focus are preserved', () => {
  const emptyMenu = { ...menu, focusedIndex: -1, height: 8, items: [], width: 300 }
  const open = { ...state, menus: [menu] }
  const commands = renderMenus(open, { ...state, menus: [emptyMenu] })
  expect(commands.at(-1)).toEqual(['Viewlet.focusSelector', 202, '#Menu-0'])
  const dom = getMenuRootVirtualDom([emptyMenu])
  expect(dom[1]).toMatchObject({ childCount: 0, style: 'left:30px;top:30px;width:300px;height:8px' })
})
