import * as ListIndex from '../ListIndex/ListIndex.ts'
import { focusIndex } from './ViewletTitleBarMenuBarFocusIndex.ts'

export const focusLast = (state: any): any => {
  const { titleBarEntries } = state
  const indexToFocus = ListIndex.last(titleBarEntries)
  return focusIndex(state, indexToFocus)
}
