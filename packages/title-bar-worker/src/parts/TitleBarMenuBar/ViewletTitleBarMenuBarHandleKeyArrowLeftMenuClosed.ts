import { focusPrevious } from './ViewletTitleBarMenuBarFocusPrevious.ts'

export const handleKeyArrowLeftMenuClosed = (state) => {
  // TODO menu collapse
  return focusPrevious(state)
}
