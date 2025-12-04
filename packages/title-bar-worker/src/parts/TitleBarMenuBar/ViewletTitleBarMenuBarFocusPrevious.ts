import type { TitleBarMenuBarState } from '../TitleBarMenuBarState/TitleBarMenuBarState.ts'
import * as ListIndex from '../ListIndex/ListIndex.ts'
import { focusIndex } from './ViewletTitleBarMenuBarFocusIndex.ts'

export const focusPrevious = (state: TitleBarMenuBarState): Promise<TitleBarMenuBarState> => {
  const { focusedIndex, titleBarEntries } = state
  const indexToFocus = ListIndex.previous(titleBarEntries, focusedIndex)
  return focusIndex(state, indexToFocus)
}
