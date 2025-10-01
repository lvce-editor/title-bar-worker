import type { TitleBarMenuBarState } from '../TitleBarMenuBarState/TitleBarMenuBarState.ts'
import { focusIndex } from './ViewletTitleBarMenuBarFocusIndex.ts'

export const handleMouseOverMenuClosed = (state: TitleBarMenuBarState, index: number): Promise<TitleBarMenuBarState> => {
  return focusIndex(state, index)
}
