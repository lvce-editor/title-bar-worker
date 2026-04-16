import type { TitleBarMenuBarState } from '../TitleBarMenuBarState/TitleBarMenuBarState.ts'
import * as GetNavigableTitleBarEntries from '../GetNavigableTitleBarEntries/GetNavigableTitleBarEntries.ts'
import * as ListIndex from '../ListIndex/ListIndex.ts'
import { focusIndex } from './ViewletTitleBarMenuBarFocusIndex.ts'

export const focusNext = (state: TitleBarMenuBarState): Promise<TitleBarMenuBarState> => {
  const { focusedIndex } = state
  const titleBarEntries = GetNavigableTitleBarEntries.getNavigableTitleBarEntries(state)
  const indexToFocus = ListIndex.next(titleBarEntries, focusedIndex)
  return focusIndex(state, indexToFocus)
}
