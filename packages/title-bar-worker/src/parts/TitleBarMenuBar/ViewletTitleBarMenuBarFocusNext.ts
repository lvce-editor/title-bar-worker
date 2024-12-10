import * as ListIndex from '../ListIndex/ListIndex.ts'
import { focusIndex } from './ViewletTitleBarMenuBarFocusIndex.ts'

export const focusNext = (state: any): any => {
  const { titleBarEntries, focusedIndex } = state
  const indexToFocus = ListIndex.next(titleBarEntries, focusedIndex)
  return focusIndex(state, indexToFocus)
}
