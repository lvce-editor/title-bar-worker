import type { TitleBarMenuBarState } from '../TitleBarMenuBarState/TitleBarMenuBarState.ts'
import * as Menu from '../Menu/Menu.ts'
import * as MenuEntries from '../MenuEntries/MenuEntries.ts'

export const selectIndexSubMenu = async (state: TitleBarMenuBarState, menu: any, index: number): Promise<TitleBarMenuBarState> => {
  const { menus } = state
  const { items, x, y, level } = menu
  const item = items[index]
  const subMenuEntries = await MenuEntries.getMenuEntries(item.id)
  const subMenu = {
    level: menus.length,
    items: subMenuEntries,
    focusedIndex: -1,
    x: x + Menu.MENU_WIDTH,
    y: y + index * 25,
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
