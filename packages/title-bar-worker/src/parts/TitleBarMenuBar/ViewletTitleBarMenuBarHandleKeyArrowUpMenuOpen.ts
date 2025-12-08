import type { TitleBarMenuBarState } from '../TitleBarMenuBarState/TitleBarMenuBarState.ts'
import * as Menu from '../Menu/Menu.ts'

export const handleKeyArrowUpMenuOpen = (state: TitleBarMenuBarState): TitleBarMenuBarState => {
  const { menus } = state
  const menu = menus.at(-1)
  if (!menu) {
    return state
  }
  const previousIndex = Menu.getIndexToFocusPrevious(menu)
  const newMenus = [
    ...menus.slice(0, -1),
    {
      ...menu,
      focusedIndex: previousIndex,
    },
  ]
  return {
    ...state,
    menus: newMenus,
  }
}
