import type { TitleBarMenuBarState } from '../TitleBarMenuBarState/TitleBarMenuBarState.ts'
import * as ListIndex from '../ListIndex/ListIndex.ts'
import { focusIndex } from './ViewletTitleBarMenuBarFocusIndex.ts'

export const focusFirst = (state: TitleBarMenuBarState): Promise<TitleBarMenuBarState> => {
  const indexToFocus = ListIndex.first()
  return focusIndex(state, indexToFocus)
}
