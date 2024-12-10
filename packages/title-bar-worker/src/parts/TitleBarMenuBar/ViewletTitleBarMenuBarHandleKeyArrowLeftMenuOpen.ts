import { closeOneMenu } from './ViewletTitleBarMenuBarCloseOneMenu.ts'
import { focusPrevious } from './ViewletTitleBarMenuBarFocusPrevious.ts'

export const handleKeyArrowLeftMenuOpen = (state) => {
  const { menus } = state
  if (menus.length > 1) {
    return closeOneMenu(state)
  }
  return focusPrevious(state)
}
