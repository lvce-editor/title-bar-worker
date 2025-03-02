import * as Assert from '../Assert/Assert.ts'
import * as Menu from '../Menu/Menu.ts'
import * as MenuEntries from '../MenuEntries/MenuEntries.ts'
import * as MenuItemFlags from '../MenuItemFlags/MenuItemFlags.ts'

export const handleMenuMouseOver = async (state: any, level: number, index: number): Promise<any> => {
  Assert.object(state)
  Assert.number(level)
  Assert.number(index)
  const { menus } = state
  const menu = menus[level]
  const { items, focusedIndex, y, x } = menu
  const item = items[index]
  if (focusedIndex === index) {
    if (index === -1) {
      return state
    }
    if (item.flags === MenuItemFlags.SubMenu && level === menus.length - 2) {
      const subMenu = menus[level + 1]
      if (subMenu.focusedIndex !== -1) {
        const newSubMenu = {
          ...subMenu,
          focusedIndex: -1,
        }
        const newMenus = [...menus.slice(0, -1), newSubMenu]
        return {
          ...state,
          menus: newMenus,
        }
      }
    }
    return state
  }
  if (index === -1) {
    const newMenus = [
      ...menus.slice(0, level),
      {
        ...menu,
        focusedIndex: -1,
      },
    ]
    return {
      ...state,
      menus: newMenus,
    }
  }
  if (item.flags === MenuItemFlags.SubMenu) {
    const item = items[index]
    const subMenuEntries = await MenuEntries.getMenuEntries(item.id)
    const subMenu = {
      level: menus.length,
      items: subMenuEntries,
      focusedIndex: -1,
      y: y + index * 25,
      x: x + Menu.MENU_WIDTH,
    }
    const newParentMenu = {
      ...menu,
      focusedIndex: index,
    }
    const newMenus = [...menus.slice(0, level - 1), newParentMenu, subMenu]
    return {
      ...state,
      menus: newMenus,
    }
  }
  const newMenus = [
    ...menus.slice(0, level),
    {
      ...menu,
      focusedIndex: index,
    },
  ]
  return {
    ...state,
    menus: newMenus,
  }
}
