import type { TitleBarMenuBarState } from '../TitleBarMenuBarState/TitleBarMenuBarState.ts'
import { closeMenu } from './ViewletTitleBarMenuBarCloseMenu.ts'
import { openMenuAtIndex } from './ViewletTitleBarMenuBarOpenMenuAtIndex.ts'

export const toggleIndex = async (state: TitleBarMenuBarState, index: number): Promise<TitleBarMenuBarState> => {
  const { isMenuOpen, focusedIndex } = state
  if (isMenuOpen && focusedIndex === index) {
    return closeMenu(state, /* keepFocus */ true)
  }
  return openMenuAtIndex(state, index, /* focus */ false)
}
