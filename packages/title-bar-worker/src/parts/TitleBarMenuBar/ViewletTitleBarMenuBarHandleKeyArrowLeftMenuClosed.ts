import { focusPrevious } from './ViewletTitleBarMenuBarFocusPrevious.ts'

export const handleKeyArrowLeftMenuClosed = (state: any): any => {
  // TODO menu collapse
  return focusPrevious(state)
}
