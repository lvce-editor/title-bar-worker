import type { TitleBarMenuBarState } from '../TitleBarMenuBarState/TitleBarMenuBarState.ts'
import * as ViewletTitleBarMenuBarHandleMouseOut from '../TitleBarMenuBar/ViewletTitleBarMenuBarHandleMouseOut.ts'

export const handlePointerOut = (state: TitleBarMenuBarState): TitleBarMenuBarState | Promise<TitleBarMenuBarState> => {
  return ViewletTitleBarMenuBarHandleMouseOut.handleMouseOut(state)
}
