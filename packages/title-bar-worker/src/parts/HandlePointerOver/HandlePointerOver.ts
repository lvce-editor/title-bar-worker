import type { TitleBarMenuBarState } from '../TitleBarMenuBarState/TitleBarMenuBarState.ts'
import * as ViewletTitleBarMenuBarGetTitleBarIndexFromPosition from '../TitleBarMenuBar/ViewletTitleBarMenuBarGetTitleBarIndexFromPosition.ts'
import * as ViewletTitleBarMenuBarHandleMouseOver from '../TitleBarMenuBar/ViewletTitleBarMenuBarHandleMouseOver.ts'

export const handlePointerOver = (
  state: TitleBarMenuBarState,
  clientX: number,
  clientY: number,
): TitleBarMenuBarState | Promise<TitleBarMenuBarState> => {
  const { titleBarEntries, x } = state
  const index = ViewletTitleBarMenuBarGetTitleBarIndexFromPosition.getTitleBarIndexFromPosition(titleBarEntries, clientX - x, clientY)
  if (index === -1) {
    return state
  }
  return ViewletTitleBarMenuBarHandleMouseOver.handleMouseOver(state, index)
}
