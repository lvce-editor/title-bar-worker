import type { TitleBarMenuBarState } from '../TitleBarMenuBarState/TitleBarMenuBarState.ts'

export const closeMenu = (state: TitleBarMenuBarState, keepFocus: boolean): TitleBarMenuBarState => {
  const { focused, focusedIndex, isMenuOpen, menus } = state
  // TODO send to renderer process
  // 1. close menu
  // 2. focus top level entry
  const newFocused = keepFocus ? focused : false
  const newFocusedIndex = keepFocus ? focusedIndex : -1
  if (!isMenuOpen && menus.length === 0 && focused === newFocused && focusedIndex === newFocusedIndex) {
    return state
  }
  return {
    ...state,
    focused: newFocused,
    focusedIndex: newFocusedIndex,
    isMenuOpen: false,
    menus: [],
  }
}
