import type { TitleBarMenuBarState } from '../TitleBarMenuBarState/TitleBarMenuBarState.ts'
import * as MouseEventType from '../MouseEventType/MouseEventType.ts'
import * as ViewletTitleBarMenuBarToggleIndex from './ViewletTitleBarMenuBarToggleIndex.ts'

export const handleClick = async (state: TitleBarMenuBarState, button: number, index: number): Promise<TitleBarMenuBarState> => {
  if (button !== MouseEventType.LeftClick) {
    return state
  }
  if (index === -1) {
    return state
  }
  return ViewletTitleBarMenuBarToggleIndex.toggleIndex(state, index)
}
