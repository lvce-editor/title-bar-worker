import { expect, test } from '@jest/globals'
import type { TitleBarMenuBarState } from '../src/parts/TitleBarMenuBarState/TitleBarMenuBarState.ts'
import { commandMap } from '../src/parts/CommandMap/CommandMap.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { MenuIdTitleBarContextMenu } from '../src/parts/GetMenuIds/GetMenuIds.ts'
import * as MenuItemFlags from '../src/parts/MenuItemFlags/MenuItemFlags.ts'
import * as TitleBarMenuBarStates from '../src/parts/TitleBarMenuBarStates/TitleBarMenuBarStates.ts'

test('closeMenu updates the registered title bar state', async () => {
  const uid = 42
  const state: TitleBarMenuBarState = {
    ...createDefaultState(uid),
    focusedIndex: 1,
    isMenuOpen: true,
  }
  TitleBarMenuBarStates.set(uid, state, state)

  await commandMap['TitleBar.closeMenu'](uid, false)

  expect(TitleBarMenuBarStates.get(uid).newState).toMatchObject({
    focusedIndex: -1,
    isMenuOpen: false,
  })
})

test('setShowSideBarThings hides and restores title bar content while clearing an open menu', async () => {
  const uid = 42
  const state: TitleBarMenuBarState = {
    ...createDefaultState(uid),
    focused: true,
    focusedIndex: 1,
    isMenuOpen: true,
    menus: [{ focusedIndex: 0, id: 'menu', items: [], level: 0, x: 0, y: 0 }],
  }
  TitleBarMenuBarStates.set(uid, state, state)

  await commandMap['TitleBar.setShowSideBarThings'](uid, false)

  expect(TitleBarMenuBarStates.get(uid).newState).toMatchObject({
    focused: false,
    focusedIndex: -1,
    isMenuOpen: false,
    menus: [],
    showSideBarThings: false,
  })

  await commandMap['TitleBar.setShowSideBarThings'](uid, false)
  await commandMap['TitleBar.setShowSideBarThings'](uid, true)

  expect(TitleBarMenuBarStates.get(uid).newState).toMatchObject({
    focused: false,
    focusedIndex: -1,
    isMenuOpen: false,
    menus: [],
    showSideBarThings: true,
  })
})

test('getMenuEntries2 reads the registered title bar state', async () => {
  const uid = 42
  const state: TitleBarMenuBarState = {
    ...createDefaultState(uid),
    titleBarMenuBarEnabled: true,
  }
  TitleBarMenuBarStates.set(uid, state, state)

  const entries = await commandMap['TitleBar.getMenuEntries2'](uid, { menuId: MenuIdTitleBarContextMenu })

  expect(entries[0]).toEqual({
    args: [uid, 'hideMenuBar'],
    command: 'Viewlet.executeViewletCommand',
    flags: MenuItemFlags.Checked,
    id: 'MenuBar',
    label: 'Menu Bar',
  })
})
