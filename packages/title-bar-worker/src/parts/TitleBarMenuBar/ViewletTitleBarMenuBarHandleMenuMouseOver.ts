import type { IMenu } from '../IMenu/IMenu.ts'
import type { TitleBarMenuBarState } from '../TitleBarMenuBarState/TitleBarMenuBarState.ts'
import * as Assert from '../Assert/Assert.ts'
import * as MenuItemFlags from '../MenuItemFlags/MenuItemFlags.ts'
import { selectIndexSubMenu } from './ViewletTitleBarMenuBarSelectIndexSubMenu.ts'

const getNewMenus = async (state: TitleBarMenuBarState, level: number, index: number, flags: number): Promise<readonly IMenu[]> => {
  const { menus } = state
  const menu = menus[level]
  if (!menu) {
    return menus
  }
  const { focusedIndex, items } = menu
  if (flags === MenuItemFlags.Separator) {
    return menus
  }
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
    const newState = await selectIndexSubMenu(state, menu, index)
    return newState.menus
  }
  const newMenus = [
    ...menus.slice(0, level),
    {
      ...menu,
      expanded: false,
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
  const newMenus = await getNewMenus(state, level, index, item.flags)
  if (menus === newMenus) {
    return state
  }
  return {
    ...state,
    menus: newMenus,
  }
}
