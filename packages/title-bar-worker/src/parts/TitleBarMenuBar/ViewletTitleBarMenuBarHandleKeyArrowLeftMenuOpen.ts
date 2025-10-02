import type { TitleBarMenuBarState } from '../TitleBarMenuBarState/TitleBarMenuBarState.ts'
import { closeOneMenu } from './ViewletTitleBarMenuBarCloseOneMenu.ts'
import { focusPrevious } from './ViewletTitleBarMenuBarFocusPrevious.ts'

export const handleKeyArrowLeftMenuOpen = async (state: TitleBarMenuBarState): Promise<TitleBarMenuBarState> => {
  const { menus } = state
  if (menus.length > 1) {
    return closeOneMenu(state)
  }
  return focusPrevious(state)
}
