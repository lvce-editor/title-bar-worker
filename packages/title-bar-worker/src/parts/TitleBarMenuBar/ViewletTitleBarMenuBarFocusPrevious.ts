import type { TitleBarMenuBarState } from '../TitleBarMenuBarState/TitleBarMenuBarState.ts'
import * as GetNavigableTitleBarEntries from '../GetNavigableTitleBarEntries/GetNavigableTitleBarEntries.ts'
import * as ListIndex from '../ListIndex/ListIndex.ts'
import { focusIndex } from './ViewletTitleBarMenuBarFocusIndex.ts'

export const focusPrevious = (state: TitleBarMenuBarState): Promise<TitleBarMenuBarState> => {
  const { focusedIndex } = state
  const titleBarEntries = GetNavigableTitleBarEntries.getNavigableTitleBarEntries(state)
  const indexToFocus = ListIndex.previous(titleBarEntries, focusedIndex)
  return focusIndex(state, indexToFocus)
}
