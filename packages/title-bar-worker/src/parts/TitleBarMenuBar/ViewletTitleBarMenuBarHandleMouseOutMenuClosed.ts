import { focusIndex } from './ViewletTitleBarMenuBarFocusIndex.ts'

export const handleMouseOutMenuClosed = (state) => {
  return focusIndex(state, -1)
}
