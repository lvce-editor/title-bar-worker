import type { TitleBarMenuBarState } from '../TitleBarMenuBarState/TitleBarMenuBarState.ts'
import * as Menu from '../Menu/Menu.ts'

export const handleKeyArrowDownMenuOpen = (state: TitleBarMenuBarState): TitleBarMenuBarState => {
  const { menus } = state
  const menu = menus.at(-1)
  if (!menu) {
    return state
  }
  const newFocusedIndex = Menu.getIndexToFocusNext(menu)
  const newMenus = [
    ...menus.slice(0, -1),
    {
      ...menu,
      focusedIndex: newFocusedIndex,
    },
  ]
  return {
    ...state,
    menus: newMenus,
  }
}
