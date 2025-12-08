import type { TitleBarMenuBarState } from '../TitleBarMenuBarState/TitleBarMenuBarState.ts'
// TODO menu should not be needed initially, only when item is selected and menu is opened
import * as Menu from '../Menu/Menu.ts'
import * as MenuEntries from '../MenuEntries/MenuEntries.ts'
import * as MenuItemFlags from '../MenuItemFlags/MenuItemFlags.ts'
import { focusNext } from './ViewletTitleBarMenuBarFocusNext.ts'

export const handleKeyArrowRightMenuOpen = async (state: TitleBarMenuBarState): Promise<TitleBarMenuBarState> => {
  const { menus } = state
  // if menu can open sub menu to the right -> do that
  const menu = menus.at(-1)
  if (!menu) {
    return state
  }
  const { focusedIndex, items, x, y } = menu
  if (focusedIndex === -1) {
    return focusNext(state)
  }
  const item = items[focusedIndex]
  if (item.flags === MenuItemFlags.SubMenu) {
    const subMenuEntries = await MenuEntries.getMenuEntries(item.id)
    const subMenu = {
      focusedIndex: 0,
      items: subMenuEntries,
      level: menus.length,
      x: x + Menu.MENU_WIDTH,
      y: y + focusedIndex * 25,
    }
    const newParentMenu = {
      ...menu,
      expanded: true,
    }
    const newMenus = [...menus.slice(0, -1), newParentMenu, subMenu]
    return {
      ...state,
      menus: newMenus,
    }
  }
  return focusNext(state)
}
