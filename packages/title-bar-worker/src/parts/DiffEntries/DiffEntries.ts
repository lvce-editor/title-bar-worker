import type { TitleBarMenuBarState } from '../TitleBarMenuBarState/TitleBarMenuBarState.ts'
import * as DiffType from '../DiffType/DiffType.ts'

export const diffType = DiffType.RenderEntries

export const isEqual = (oldState: TitleBarMenuBarState, newState: TitleBarMenuBarState): boolean => {
  return (
    oldState.titleBarEntries === newState.titleBarEntries &&
    oldState.width === newState.width &&
    oldState.focusedIndex === newState.focusedIndex &&
    oldState.isMenuOpen === newState.isMenuOpen
  )
}
