import type { TitleBarMenuBarState } from '../TitleBarMenuBarState/TitleBarMenuBarState.ts'
import { handleMenuClick } from './ViewletTitleBarMenuBarHandleMenuClick.ts'

export const handleKeyEnterMenuOpen = (state: TitleBarMenuBarState): Promise<TitleBarMenuBarState> | TitleBarMenuBarState => {
  const { menus } = state
  const menu = menus.at(-1)
  if (!menu) {
    return state
  }
  return handleMenuClick(state, menu.level, menu.focusedIndex)
}
