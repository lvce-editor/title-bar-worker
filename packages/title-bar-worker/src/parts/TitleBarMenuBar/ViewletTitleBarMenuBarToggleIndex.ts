import { closeMenu } from './ViewletTitleBarMenuBarCloseMenu.ts'
import { openMenuAtIndex } from './ViewletTitleBarMenuBarOpenMenuAtIndex.ts'

export const toggleIndex = (state: any, index: number): any => {
  const { isMenuOpen, focusedIndex } = state
  if (isMenuOpen && focusedIndex === index) {
    return closeMenu(state, /* keepFocus */ true)
  }
  return openMenuAtIndex(state, index, /* focus */ false)
}
