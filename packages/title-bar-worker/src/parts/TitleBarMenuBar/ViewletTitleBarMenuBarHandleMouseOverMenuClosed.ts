import { focusIndex } from './ViewletTitleBarMenuBarFocusIndex.ts'

export const handleMouseOverMenuClosed = (state, index) => {
  return focusIndex(state, index)
}
