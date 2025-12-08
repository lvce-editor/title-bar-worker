import type { TitleBarMenuBarState } from '../TitleBarMenuBarState/TitleBarMenuBarState.ts'
import * as Assert from '../Assert/Assert.ts'
import * as Menu from '../Menu/Menu.ts'
import * as MenuEntries from '../MenuEntries/MenuEntries.ts'
import * as MenuItemFlags from '../MenuItemFlags/MenuItemFlags.ts'

const getNewMenus = async (menus: readonly any[], level: number, index: number, flags: number): Promise<readonly any[]> => {
  const menu = menus[level]
  if (!menu) {
    return menus
  }
  const { focusedIndex, items, x, y } = menu
  const item = items[index]
  if (focusedIndex === index) {
    if (index === -1) {
      return menus
    }
    if (item.flags === MenuItemFlags.SubMenu && level === menus.length - 2) {
      const subMenu = menus[level + 1]
      if (subMenu.focusedIndex !== -1) {
        const newSubMenu = {
          ...subMenu,
          focusedIndex: -1,
        }
        const newMenus = [...menus.slice(0, -1), newSubMenu]
        return newMenus
      }
    }
    return menus
  }
  if (index === -1) {
    const newMenus = [
      ...menus.slice(0, level),
      {
        ...menu,
        focusedIndex: -1,
      },
    ]
    return newMenus
  }
  if (item.flags === MenuItemFlags.SubMenu) {
    const item = items[index]
    const subMenuEntries = await MenuEntries.getMenuEntries(item.id)
    const subMenu = {
      focusedIndex: -1,
      items: subMenuEntries,
      level: menus.length,
      x: x + Menu.MENU_WIDTH,
      y: y + index * 25,
    }
    const newParentMenu = {
      ...menu,
      focusedIndex: index,
    }
    const newMenus = [...menus.slice(0, level - 1), newParentMenu, subMenu]
    return newMenus
  }
  const newMenus = [
    ...menus.slice(0, level),
    {
      ...menu,
      focusedIndex: index,
    },
  ]
  return newMenus
}

export const handleMenuMouseOver = async (state: TitleBarMenuBarState, level: number, index: number): Promise<TitleBarMenuBarState> => {
  Assert.object(state)
  Assert.number(level)
  Assert.number(index)
  const { menus } = state
  const menu = menus[level]
  if (!menu) {
    return state
  }
  const { items } = menu
  const item = items[index]
  if (!item) {
    return state
  }
  const newMenus = await getNewMenus(menus, level, index, item.flags)
  if (menus === newMenus) {
    return state
  }
  return {
    ...state,
    menus: newMenus,
  }
}
