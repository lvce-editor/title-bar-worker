import type { TitleBarMenuBarState } from '../TitleBarMenuBarState/TitleBarMenuBarState.ts'
import { closeMenu } from './ViewletTitleBarMenuBarCloseMenu.ts'
import { openMenu } from './ViewletTitleBarMenuBarOpenMenu.ts'

export const toggleMenu = async (state: TitleBarMenuBarState): Promise<TitleBarMenuBarState> => {
  const { isMenuOpen } = state
  if (isMenuOpen) {
    return closeMenu(state, /* keepFocus */ true)
  }
  return openMenu(state, /* focus */ false)
}
