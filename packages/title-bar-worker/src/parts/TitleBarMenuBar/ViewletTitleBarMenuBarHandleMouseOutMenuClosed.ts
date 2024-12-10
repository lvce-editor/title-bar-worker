import { focusIndex } from './ViewletTitleBarMenuBarFocusIndex.ts'

export const handleMouseOutMenuClosed = (state: any): any => {
  return focusIndex(state, -1)
}
