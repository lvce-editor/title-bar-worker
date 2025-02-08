import type { TitleBarMenuBarState } from '../TitleBarMenuBarState/TitleBarMenuBarState.ts'
import { focusIndex } from './ViewletTitleBarMenuBarFocusIndex.ts'

export const handleMouseOverMenuOpen = async (state: TitleBarMenuBarState, index: number): Promise<TitleBarMenuBarState> => {
  if (index === -1) {
    return state
  }
  return focusIndex(state, index)
}
