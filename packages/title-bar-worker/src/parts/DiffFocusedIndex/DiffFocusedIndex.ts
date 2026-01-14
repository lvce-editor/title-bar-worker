import type { TitleBarMenuBarState } from '../TitleBarMenuBarState/TitleBarMenuBarState.ts'

export const isEqual = (oldState: TitleBarMenuBarState, newState: TitleBarMenuBarState): boolean => {
  return oldState.focusedIndex === newState.focusedIndex && oldState.isMenuOpen === newState.isMenuOpen
}
