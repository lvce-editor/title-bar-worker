import { focusIndex } from './ViewletTitleBarMenuBarFocusIndex.ts'

export const handleMouseOverMenuOpen = (state: any, index: number): any => {
  if (index === -1) {
    return state
  }
  return focusIndex(state, index)
}
