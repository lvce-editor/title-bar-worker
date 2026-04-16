import type { ComputedTitleBarEntry, TitleBarEntry } from '../TitleBarEntry/TitleBarEntry.ts'
import type { TitleBarMenuBarState } from '../TitleBarMenuBarState/TitleBarMenuBarState.ts'
import { getVisibleTitleBarEntries, OverflowMenuId } from '../GetVisibleTitleBarEntries/GetVisibleTitleBarEntries.ts'

interface EntryWithId {
  readonly id?: string | number
}

const hasOverflowEntry = (entries: readonly EntryWithId[]): boolean => {
  return entries.some((entry) => entry?.id === OverflowMenuId)
}

export const getNavigableTitleBarEntries = (state: TitleBarMenuBarState): readonly ComputedTitleBarEntry<TitleBarEntry>[] => {
  const { focusedIndex, isMenuOpen, titleBarEntries, width } = state
  if (hasOverflowEntry(titleBarEntries)) {
    return titleBarEntries
  }
  return getVisibleTitleBarEntries(titleBarEntries, width, focusedIndex, isMenuOpen)
}
