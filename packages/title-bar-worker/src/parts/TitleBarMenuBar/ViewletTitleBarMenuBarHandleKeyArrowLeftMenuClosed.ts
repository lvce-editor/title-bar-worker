import type { TitleBarMenuBarState } from '../TitleBarMenuBarState/TitleBarMenuBarState.ts'
import { focusPrevious } from './ViewletTitleBarMenuBarFocusPrevious.ts'

export const handleKeyArrowLeftMenuClosed = (state: TitleBarMenuBarState): TitleBarMenuBarState => {
  // TODO menu collapse
  return focusPrevious(state)
}
