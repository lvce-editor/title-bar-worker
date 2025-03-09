import type { TitleBarMenuBarState } from '../TitleBarMenuBarState/TitleBarMenuBarState.ts'
import * as ViewletTitleBarMenuBarGetTitleBarIndexFromPosition from '../TitleBarMenuBar/ViewletTitleBarMenuBarGetTitleBarIndexFromPosition.ts'
import * as ViewletTitleBarMenuBarHandleClick from '../TitleBarMenuBar/ViewletTitleBarMenuBarHandleClick.ts'

export const handleClickAt = async (state: TitleBarMenuBarState, button: number, x: number, y: number): Promise<TitleBarMenuBarState> => {
  const index = ViewletTitleBarMenuBarGetTitleBarIndexFromPosition.getTitleBarIndexFromPosition(state.titleBarEntries, x - state.x, y)
  if (index === -1) {
    return state
  }
  return ViewletTitleBarMenuBarHandleClick.handleClick(state, button, index)
}
