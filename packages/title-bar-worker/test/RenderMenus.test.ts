import { expect, test } from '@jest/globals'
import type { TitleBarMenuBarState } from '../src/parts/TitleBarMenuBarState/TitleBarMenuBarState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as MenuItemFlags from '../src/parts/MenuItemFlags/MenuItemFlags.ts'
import * as RenderMenus from '../src/parts/RenderMenus/RenderMenus.ts'
import * as RenderMethod from '../src/parts/RenderMethod/RenderMethod.ts'

const UID = 1

const createMenu = (items: readonly any[], focusedIndex: number = -1, expanded: boolean = false, level: number = 0): any => ({
  expanded,
  focusedIndex,
  items,
  level,
})

const createMenuItem = (label: string, flags: number = MenuItemFlags.None, key: number = 0): any => ({
  flags,
  key,
  label,
})

const createStateWithMenus = (menus: readonly any[], uid: number = UID): TitleBarMenuBarState => ({
  ...createDefaultState(uid),
  menus,
})

test('renderMenus with empty states', () => {
  const oldState = createDefaultState()
  const newState = createDefaultState()

  const result = RenderMenus.renderMenus(oldState, newState)

  expect(result).toEqual(['Viewlet.send', UID, RenderMethod.SetMenus, [], UID])
})

test('renderMenus with no changes', () => {
  const menu = createMenu([createMenuItem('File'), createMenuItem('Edit')])

  const oldState = createStateWithMenus([menu])
  const newState = createStateWithMenus([menu])

  const result = RenderMenus.renderMenus(oldState, newState)

  expect(result).toEqual(['Viewlet.send', UID, RenderMethod.SetMenus, [], UID])
})

test('renderMenus with single menu change', () => {
  const oldMenu = createMenu([createMenuItem('File'), createMenuItem('Edit')])

  const newMenu = createMenu([createMenuItem('File'), createMenuItem('View')])

  const oldState = createStateWithMenus([oldMenu])
  const newState = createStateWithMenus([newMenu])

  const result = RenderMenus.renderMenus(oldState, newState)

  expect(result[0]).toBe('Viewlet.send')
  expect(result[1]).toBe(UID)
  expect(result[2]).toBe(RenderMethod.SetMenus)
  expect(result[4]).toBe(UID)

  const changes = result[3] as any[]
  expect(changes).toHaveLength(1)
  expect(changes[0][0]).toBe('updateMenu')
  expect(changes[0][1]).toBe(newMenu)
  expect(changes[0][2]).toBe(1)
})

test('renderMenus with multiple menu changes', () => {
  const oldMenu1 = createMenu([createMenuItem('File')])
  const oldMenu2 = createMenu([createMenuItem('Edit')])

  const newMenu1 = createMenu([createMenuItem('File')])
  const newMenu2 = createMenu([createMenuItem('View')])

  const oldState = createStateWithMenus([oldMenu1, oldMenu2])
  const newState = createStateWithMenus([newMenu1, newMenu2])

  const result = RenderMenus.renderMenus(oldState, newState)

  const changes = result[3] as any[]
  expect(changes).toHaveLength(2)
  expect(changes[0][0]).toBe('updateMenu')
  expect(changes[0][1]).toBe(newMenu1)
  expect(changes[0][2]).toBe(2)
  expect(changes[1][0]).toBe('updateMenu')
  expect(changes[1][1]).toBe(newMenu2)
  expect(changes[1][2]).toBe(2)
})

test('renderMenus adding new menu', () => {
  const oldState = createStateWithMenus([])

  const newMenu = createMenu([createMenuItem('File'), createMenuItem('Edit')])

  const newState = createStateWithMenus([newMenu])

  const result = RenderMenus.renderMenus(oldState, newState)

  const changes = result[3] as any[]
  expect(changes).toHaveLength(1)
  expect(changes[0][0]).toBe('addMenu')
  expect(changes[0][1]).toBe(newMenu)
})

test('renderMenus adding multiple new menus', () => {
  const oldState = createStateWithMenus([])

  const newMenu1 = createMenu([createMenuItem('File')])
  const newMenu2 = createMenu([createMenuItem('Edit')])

  const newState = createStateWithMenus([newMenu1, newMenu2])

  const result = RenderMenus.renderMenus(oldState, newState)

  const changes = result[3] as any[]
  expect(changes).toHaveLength(1)
  expect(changes[0][0]).toBe('addMenu')
  expect(changes[0][1]).toBe(newMenu2)
})

test('renderMenus removing menu', () => {
  const oldMenu = createMenu([createMenuItem('File')])

  const oldState = createStateWithMenus([oldMenu])
  const newState = createStateWithMenus([])

  const result = RenderMenus.renderMenus(oldState, newState)

  const changes = result[3] as any[]
  expect(changes).toHaveLength(1)
  expect(changes[0][0]).toBe('closeMenus')
  expect(changes[0][1]).toBe(0)
})

test('renderMenus removing multiple menus', () => {
  const oldMenu1 = createMenu([createMenuItem('File')])
  const oldMenu2 = createMenu([createMenuItem('Edit')])

  const oldState = createStateWithMenus([oldMenu1, oldMenu2])
  const newState = createStateWithMenus([])

  const result = RenderMenus.renderMenus(oldState, newState)

  const changes = result[3] as any[]
  expect(changes).toHaveLength(1)
  expect(changes[0][0]).toBe('closeMenus')
  expect(changes[0][1]).toBe(0)
})

test('renderMenus with mixed changes - update and add', () => {
  const oldMenu = createMenu([createMenuItem('File')])
  const newMenu = createMenu([createMenuItem('File Updated')])
  const additionalMenu = createMenu([createMenuItem('Edit')])

  const oldState = createStateWithMenus([oldMenu])
  const newState = createStateWithMenus([newMenu, additionalMenu])

  const result = RenderMenus.renderMenus(oldState, newState)

  const changes = result[3] as any[]
  expect(changes).toHaveLength(2)
  expect(changes[0][0]).toBe('updateMenu')
  expect(changes[0][1]).toBe(newMenu)
  expect(changes[0][2]).toBe(2)
  expect(changes[1][0]).toBe('addMenu')
  expect(changes[1][1]).toBe(additionalMenu)
})

test('renderMenus with mixed changes - update and remove', () => {
  const oldMenu1 = createMenu([createMenuItem('File')])
  const oldMenu2 = createMenu([createMenuItem('Edit')])
  const newMenu1 = createMenu([createMenuItem('File Updated')])

  const oldState = createStateWithMenus([oldMenu1, oldMenu2])
  const newState = createStateWithMenus([newMenu1])

  const result = RenderMenus.renderMenus(oldState, newState)

  const changes = result[3] as any[]
  expect(changes).toHaveLength(2)
  expect(changes[0][0]).toBe('updateMenu')
  expect(changes[0][1]).toBe(newMenu1)
  expect(changes[0][2]).toBe(1)
  expect(changes[1][0]).toBe('closeMenus')
  expect(changes[1][1]).toBe(1)
})

test('renderMenus with menu items having different flags', () => {
  const oldMenu = createMenu([createMenuItem('File', MenuItemFlags.None), createMenuItem('Edit', MenuItemFlags.Separator)])

  const newMenu = createMenu([createMenuItem('File', MenuItemFlags.Checked), createMenuItem('Edit', MenuItemFlags.Disabled)])

  const oldState = createStateWithMenus([oldMenu])
  const newState = createStateWithMenus([newMenu])

  const result = RenderMenus.renderMenus(oldState, newState)

  const changes = result[3] as any[]
  expect(changes).toHaveLength(1)
  expect(changes[0][0]).toBe('updateMenu')
  expect(changes[0][1]).toBe(newMenu)
})

test('renderMenus with focused menu items', () => {
  const oldMenu = createMenu([createMenuItem('File'), createMenuItem('Edit')], 0, false, 0)

  const newMenu = createMenu([createMenuItem('File'), createMenuItem('Edit')], 1, true, 1)

  const oldState = createStateWithMenus([oldMenu])
  const newState = createStateWithMenus([newMenu])

  const result = RenderMenus.renderMenus(oldState, newState)

  const changes = result[3] as any[]
  expect(changes).toHaveLength(1)
  expect(changes[0][0]).toBe('updateMenu')
  expect(changes[0][1]).toBe(newMenu)
})

test('renderMenus with submenu items', () => {
  const oldMenu = createMenu([createMenuItem('File', MenuItemFlags.None), createMenuItem('New', MenuItemFlags.SubMenu)])

  const newMenu = createMenu([createMenuItem('File', MenuItemFlags.None), createMenuItem('Open', MenuItemFlags.SubMenu)])

  const oldState = createStateWithMenus([oldMenu])
  const newState = createStateWithMenus([newMenu])

  const result = RenderMenus.renderMenus(oldState, newState)

  const changes = result[3] as any[]
  expect(changes).toHaveLength(1)
  expect(changes[0][0]).toBe('updateMenu')
  expect(changes[0][1]).toBe(newMenu)
})

test('renderMenus with checked/unchecked items', () => {
  const oldMenu = createMenu([createMenuItem('Option 1', MenuItemFlags.Unchecked), createMenuItem('Option 2', MenuItemFlags.Checked)])

  const newMenu = createMenu([createMenuItem('Option 1', MenuItemFlags.Checked), createMenuItem('Option 2', MenuItemFlags.Unchecked)])

  const oldState = createStateWithMenus([oldMenu])
  const newState = createStateWithMenus([newMenu])

  const result = RenderMenus.renderMenus(oldState, newState)

  const changes = result[3] as any[]
  expect(changes).toHaveLength(1)
  expect(changes[0][0]).toBe('updateMenu')
  expect(changes[0][1]).toBe(newMenu)
})

test('renderMenus with separator items', () => {
  const oldMenu = createMenu([
    createMenuItem('File', MenuItemFlags.None),
    createMenuItem('', MenuItemFlags.Separator),
    createMenuItem('Edit', MenuItemFlags.None),
  ])

  const newMenu = createMenu([
    createMenuItem('File', MenuItemFlags.None),
    createMenuItem('', MenuItemFlags.Separator),
    createMenuItem('View', MenuItemFlags.None),
  ])

  const oldState = createStateWithMenus([oldMenu])
  const newState = createStateWithMenus([newMenu])

  const result = RenderMenus.renderMenus(oldState, newState)

  const changes = result[3] as any[]
  expect(changes).toHaveLength(1)
  expect(changes[0][0]).toBe('updateMenu')
  expect(changes[0][1]).toBe(newMenu)
})

test('renderMenus with disabled items', () => {
  const oldMenu = createMenu([createMenuItem('File', MenuItemFlags.None), createMenuItem('Edit', MenuItemFlags.Disabled)])

  const newMenu = createMenu([createMenuItem('File', MenuItemFlags.None), createMenuItem('Edit', MenuItemFlags.None)])

  const oldState = createStateWithMenus([oldMenu])
  const newState = createStateWithMenus([newMenu])

  const result = RenderMenus.renderMenus(oldState, newState)

  const changes = result[3] as any[]
  expect(changes).toHaveLength(1)
  expect(changes[0][0]).toBe('updateMenu')
  expect(changes[0][1]).toBe(newMenu)
})

test('renderMenus with restore focus items', () => {
  const oldMenu = createMenu([createMenuItem('File', MenuItemFlags.RestoreFocus)])

  const newMenu = createMenu([createMenuItem('File', MenuItemFlags.None)])

  const oldState = createStateWithMenus([oldMenu])
  const newState = createStateWithMenus([newMenu])

  const result = RenderMenus.renderMenus(oldState, newState)

  const changes = result[3] as any[]
  expect(changes).toHaveLength(1)
  expect(changes[0][0]).toBe('updateMenu')
  expect(changes[0][1]).toBe(newMenu)
})

test('renderMenus with ignore items', () => {
  const oldMenu = createMenu([createMenuItem('File', MenuItemFlags.Ignore)])

  const newMenu = createMenu([createMenuItem('File', MenuItemFlags.None)])

  const oldState = createStateWithMenus([oldMenu])
  const newState = createStateWithMenus([newMenu])

  const result = RenderMenus.renderMenus(oldState, newState)

  const changes = result[3] as any[]
  expect(changes).toHaveLength(1)
  expect(changes[0][0]).toBe('updateMenu')
  expect(changes[0][1]).toBe(newMenu)
})

test('renderMenus with different UIDs', () => {
  const UID_1 = 1
  const UID_2 = 2

  const oldState = createDefaultState(UID_1)
  const newState = createDefaultState(UID_2)

  const result = RenderMenus.renderMenus(oldState, newState)

  expect(result[1]).toBe(UID_2)
  expect(result[4]).toBe(UID_2)
})

test('renderMenus with complex menu structure', () => {
  const oldMenu = createMenu(
    [
      createMenuItem('File', MenuItemFlags.None),
      createMenuItem('New', MenuItemFlags.SubMenu),
      createMenuItem('', MenuItemFlags.Separator),
      createMenuItem('Open', MenuItemFlags.None),
      createMenuItem('Save', MenuItemFlags.Checked),
      createMenuItem('Exit', MenuItemFlags.Disabled),
    ],
    2,
    true,
    0,
  )

  const newMenu = createMenu(
    [
      createMenuItem('File', MenuItemFlags.None),
      createMenuItem('New', MenuItemFlags.SubMenu),
      createMenuItem('', MenuItemFlags.Separator),
      createMenuItem('Open Recent', MenuItemFlags.None),
      createMenuItem('Save', MenuItemFlags.Unchecked),
      createMenuItem('Exit', MenuItemFlags.None),
    ],
    3,
    false,
    1,
  )

  const oldState = createStateWithMenus([oldMenu])
  const newState = createStateWithMenus([newMenu])

  const result = RenderMenus.renderMenus(oldState, newState)

  const changes = result[3] as any[]
  expect(changes).toHaveLength(1)
  expect(changes[0][0]).toBe('updateMenu')
  expect(changes[0][1]).toBe(newMenu)
  expect(changes[0][2]).toBe(1)
})

test('renderMenus with empty menu items', () => {
  const oldMenu = createMenu([])
  const newMenu = createMenu([createMenuItem('File')])

  const oldState = createStateWithMenus([oldMenu])
  const newState = createStateWithMenus([newMenu])

  const result = RenderMenus.renderMenus(oldState, newState)

  const changes = result[3] as any[]
  expect(changes).toHaveLength(1)
  expect(changes[0][0]).toBe('updateMenu')
  expect(changes[0][1]).toBe(newMenu)
})

test('renderMenus with same menu reference should not update', () => {
  const menu = createMenu([createMenuItem('File')])

  const oldState = createStateWithMenus([menu])
  const newState = createStateWithMenus([menu]) // Same reference

  const result = RenderMenus.renderMenus(oldState, newState)

  const changes = result[3] as any[]
  expect(changes).toHaveLength(0)
})
