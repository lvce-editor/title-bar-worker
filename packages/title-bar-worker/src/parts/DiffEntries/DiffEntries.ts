import type { TitleBarMenuBarState } from '../TitleBarMenuBarState/TitleBarMenuBarState.ts'

export const isEqual = (oldState: TitleBarMenuBarState, newState: TitleBarMenuBarState): boolean => {
  return (
    oldState.titleBarEntries === newState.titleBarEntries &&
    oldState.width === newState.width &&
    oldState.focusedIndex === newState.focusedIndex &&
    oldState.isMenuOpen === newState.isMenuOpen &&
    oldState.title === newState.title &&
    oldState.workspaceUri === newState.workspaceUri
  )
}
