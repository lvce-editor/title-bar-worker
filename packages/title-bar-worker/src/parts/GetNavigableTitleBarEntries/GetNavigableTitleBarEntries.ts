import type { ComputedTitleBarEntry, TitleBarEntry } from '../TitleBarEntry/TitleBarEntry.ts'
import type { TitleBarMenuBarState } from '../TitleBarMenuBarState/TitleBarMenuBarState.ts'
import { getVisibleTitleBarEntries } from '../GetVisibleTitleBarEntries/GetVisibleTitleBarEntries.ts'

export const getNavigableTitleBarEntries = (state: TitleBarMenuBarState): readonly ComputedTitleBarEntry<TitleBarEntry>[] => {
  const { focusedIndex, isMenuOpen, titleBarEntries, width } = state
  return getVisibleTitleBarEntries(titleBarEntries, width, focusedIndex, isMenuOpen)
}
