import { focusIndex } from './ViewletTitleBarMenuBarFocusIndex.ts'

export const handleMouseOverMenuClosed = (state: any, index: number): any => {
  return focusIndex(state, index)
}
