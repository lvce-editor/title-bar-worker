import type { TitleBarMenuBarState } from '../TitleBarMenuBarState/TitleBarMenuBarState.ts'

export const closeMenu = (state: TitleBarMenuBarState, keepFocus: boolean): TitleBarMenuBarState => {
  const { focusedIndex } = state
  // TODO send to renderer process
  // 1. close menu
  // 2. focus top level entry
  const newFocusedIndex = keepFocus ? focusedIndex : -1
  return {
    ...state,
    focusedIndex: newFocusedIndex,
    isMenuOpen: false,
    menus: [],
  }
}
