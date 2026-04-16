import type { TitleBarMenuBarState } from '../TitleBarMenuBarState/TitleBarMenuBarState.ts'
import * as GetNavigableTitleBarEntries from '../GetNavigableTitleBarEntries/GetNavigableTitleBarEntries.ts'
import * as ListIndex from '../ListIndex/ListIndex.ts'
import { focusIndex } from './ViewletTitleBarMenuBarFocusIndex.ts'

export const focusLast = (state: TitleBarMenuBarState): Promise<TitleBarMenuBarState> => {
  const titleBarEntries = GetNavigableTitleBarEntries.getNavigableTitleBarEntries(state)
  const indexToFocus = ListIndex.last(titleBarEntries)
  return focusIndex(state, indexToFocus)
}
