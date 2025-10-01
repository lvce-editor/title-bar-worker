import type { TitleBarMenuBarState } from '../TitleBarMenuBarState/TitleBarMenuBarState.ts'
import * as ListIndex from '../ListIndex/ListIndex.ts'
import { focusIndex } from './ViewletTitleBarMenuBarFocusIndex.ts'

export const focusNext = (state: TitleBarMenuBarState): Promise<TitleBarMenuBarState> => {
  const { titleBarEntries, focusedIndex } = state
  const indexToFocus = ListIndex.next(titleBarEntries, focusedIndex)
  return focusIndex(state, indexToFocus)
}
