import type { TitleBarMenuBarState } from '../TitleBarMenuBarState/TitleBarMenuBarState.ts'
import { focusFirst } from './ViewletTitleBarMenuBarFocusFirst.ts'

export const focus = (state: TitleBarMenuBarState): Promise<TitleBarMenuBarState> => {
  return focusFirst(state)
}
