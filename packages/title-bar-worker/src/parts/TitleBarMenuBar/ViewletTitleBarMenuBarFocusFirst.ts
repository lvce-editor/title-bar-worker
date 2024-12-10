import * as ListIndex from '../ListIndex/ListIndex.ts'
import { focusIndex } from './ViewletTitleBarMenuBarFocusIndex.ts'

export const focusFirst = (state) => {
  const indexToFocus = ListIndex.first()
  return focusIndex(state, indexToFocus)
}
