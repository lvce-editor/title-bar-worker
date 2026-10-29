import type { TitleBarMenuBarState } from '../TitleBarMenuBarState/TitleBarMenuBarState.ts'
// TODO menu should not be needed initially, only when item is selected and menu is opened
import * as MenuItemFlags from '../MenuItemFlags/MenuItemFlags.ts'
import { focusNext } from './ViewletTitleBarMenuBarFocusNext.ts'
import { selectIndexSubMenu } from './ViewletTitleBarMenuBarSelectIndexSubMenu.ts'

export const handleKeyArrowRightMenuOpen = async (state: TitleBarMenuBarState): Promise<TitleBarMenuBarState> => {
  const { menus } = state
  // if menu can open sub menu to the right -> do that
  const menu = menus.at(-1)
  if (!menu) {
    return state
  }
  const { focusedIndex, items } = menu
  if (focusedIndex === -1) {
    return focusNext(state)
  }
  const item = items[focusedIndex]
  if (item.flags === MenuItemFlags.SubMenu && item.id !== undefined) {
    return selectIndexSubMenu(state, menu, focusedIndex, true)
  }
  return focusNext(state)
}
