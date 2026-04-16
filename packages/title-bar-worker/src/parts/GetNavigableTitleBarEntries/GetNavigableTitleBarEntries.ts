import type { TitleBarMenuBarState } from '../TitleBarMenuBarState/TitleBarMenuBarState.ts'
import { getVisibleTitleBarEntries, OverflowMenuId } from '../GetVisibleTitleBarEntries/GetVisibleTitleBarEntries.ts'

const hasOverflowEntry = (entries: readonly any[]): boolean => {
  return entries.some((entry) => entry?.id === OverflowMenuId)
}

export const getNavigableTitleBarEntries = (state: TitleBarMenuBarState): readonly any[] => {
  const { focusedIndex, isMenuOpen, titleBarEntries, width } = state
  if (hasOverflowEntry(titleBarEntries)) {
    return titleBarEntries
  }
  return getVisibleTitleBarEntries(titleBarEntries, width, focusedIndex, isMenuOpen)
}