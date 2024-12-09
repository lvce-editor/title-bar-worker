import { closeMenu } from './ViewletTitleBarMenuBarCloseMenu.ts'
import { closeOneMenu } from './ViewletTitleBarMenuBarCloseOneMenu.ts'

export const handleKeyEscapeMenuOpen = (state) => {
  const { menus } = state
  if (menus.length > 1) {
    return closeOneMenu(state)
  }
  return closeMenu(state, /* keepFocus */ true)
}
