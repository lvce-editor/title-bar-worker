import * as ListIndex from '../ListIndex/ListIndex.ts'
import { focusIndex } from './ViewletTitleBarMenuBarFocusIndex.ts'

export const focusPrevious = (state: any): any => {
  const { titleBarEntries, focusedIndex } = state
  const indexToFocus = ListIndex.previous(titleBarEntries, focusedIndex)
  return focusIndex(state, indexToFocus)
}
