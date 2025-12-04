import type { TitleBarMenuBarState } from '../TitleBarMenuBarState/TitleBarMenuBarState.ts'
import { getMenuOffset } from '../GetMenuOffset/GetMenuOffset.ts'
import * as ViewletTitleBarMenuBarGetTitleBarIndexFromPosition from '../TitleBarMenuBar/ViewletTitleBarMenuBarGetTitleBarIndexFromPosition.ts'
import * as ViewletTitleBarMenuBarHandleClick from '../TitleBarMenuBar/ViewletTitleBarMenuBarHandleClick.ts'

export const handleClickAt = async (state: TitleBarMenuBarState, button: number, eventX: number, eventY: number): Promise<TitleBarMenuBarState> => {
  const { iconWidth, titleBarEntries, x } = state
  const menuOffset = getMenuOffset(x, eventX, iconWidth)
  const index = ViewletTitleBarMenuBarGetTitleBarIndexFromPosition.getTitleBarIndexFromPosition(titleBarEntries, menuOffset, eventY)
  if (index === -1) {
    return state
  }
  return ViewletTitleBarMenuBarHandleClick.handleClick(state, button, index)
}
