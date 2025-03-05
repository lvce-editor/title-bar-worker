import * as ViewletTitleBarMenuBarGetTitleBarIndexFromPosition from '../TitleBarMenuBar/ViewletTitleBarMenuBarGetTitleBarIndexFromPosition.ts'
import * as ViewletTitleBarMenuBarHandleMouseOut from '../TitleBarMenuBar/ViewletTitleBarMenuBarHandleMouseOut.ts'
import type { TitleBarMenuBarState } from '../TitleBarMenuBarState/TitleBarMenuBarState.ts'

export const handlePointerOut = (state: TitleBarMenuBarState, clientX: number, clientY: number): TitleBarMenuBarState => {
  const index = ViewletTitleBarMenuBarGetTitleBarIndexFromPosition.getTitleBarIndexFromPosition(state.titleBarEntries, clientX - state.x, clientY)
  if (index === -1) {
    return state
  }
  return ViewletTitleBarMenuBarHandleMouseOut.handleMouseOut(state, index)
}
