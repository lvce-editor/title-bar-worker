import type { TitleBarMenuBarState } from '../TitleBarMenuBarState/TitleBarMenuBarState.ts'
import * as ViewletTitleBarMenuBarHandleMouseOut from '../TitleBarMenuBar/ViewletTitleBarMenuBarHandleMouseOut.ts'

export const handlePointerOut = (
  state: TitleBarMenuBarState,
  _clientX: number,
  _clientY: number,
): TitleBarMenuBarState | Promise<TitleBarMenuBarState> => {
  return ViewletTitleBarMenuBarHandleMouseOut.handleMouseOut(state)
}
