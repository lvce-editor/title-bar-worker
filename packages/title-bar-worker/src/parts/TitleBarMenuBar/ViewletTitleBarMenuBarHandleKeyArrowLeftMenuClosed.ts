import type { TitleBarMenuBarState } from '../TitleBarMenuBarState/TitleBarMenuBarState.ts'
import { focusPrevious } from './ViewletTitleBarMenuBarFocusPrevious.ts'

export const handleKeyArrowLeftMenuClosed = (state: TitleBarMenuBarState): Promise<TitleBarMenuBarState> => {
  // TODO menu collapse
  return focusPrevious(state)
}
