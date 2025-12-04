import type { TitleBarMenuBarState } from '../TitleBarMenuBarState/TitleBarMenuBarState.ts'
import { getMenuOffset } from '../GetMenuOffset/GetMenuOffset.ts'
import * as ViewletTitleBarMenuBarGetTitleBarIndexFromPosition from '../TitleBarMenuBar/ViewletTitleBarMenuBarGetTitleBarIndexFromPosition.ts'
import * as ViewletTitleBarMenuBarHandleMouseOut from '../TitleBarMenuBar/ViewletTitleBarMenuBarHandleMouseOut.ts'

export const handlePointerOut = (
  state: TitleBarMenuBarState,
  clientX: number,
  clientY: number,
): TitleBarMenuBarState | Promise<TitleBarMenuBarState> => {
  const { iconWidth, titleBarEntries, x } = state
  const menuX = getMenuOffset(x, clientX, iconWidth)
  const index = ViewletTitleBarMenuBarGetTitleBarIndexFromPosition.getTitleBarIndexFromPosition(titleBarEntries, menuX, clientY)
  if (index === -1) {
    return state
  }
  return ViewletTitleBarMenuBarHandleMouseOut.handleMouseOut(state)
}
