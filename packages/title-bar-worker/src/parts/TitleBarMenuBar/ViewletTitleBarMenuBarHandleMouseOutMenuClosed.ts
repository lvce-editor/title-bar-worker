import type { TitleBarMenuBarState } from '../TitleBarMenuBarState/TitleBarMenuBarState.ts'
import { focusIndex } from './ViewletTitleBarMenuBarFocusIndex.ts'

export const handleMouseOutMenuClosed = (state: TitleBarMenuBarState): Promise<TitleBarMenuBarState> => {
  return focusIndex(state, -1)
}
