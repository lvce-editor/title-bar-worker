import { closeMenu } from './ViewletTitleBarMenuBarCloseMenu.ts'
import { openMenu } from './ViewletTitleBarMenuBarOpenMenu.ts'

export const toggleMenu = (state) => {
  const { isMenuOpen } = state
  if (isMenuOpen) {
    return closeMenu(state, /* keepFocus */ true)
  }
  return openMenu(state, /* focus */ false)
}