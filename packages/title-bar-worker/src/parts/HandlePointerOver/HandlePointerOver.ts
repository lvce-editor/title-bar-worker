import type { TitleBarMenuBarState } from '../TitleBarMenuBarState/TitleBarMenuBarState.ts'
import * as ViewletTitleBarMenuBarHandleMouseOver from '../TitleBarMenuBar/ViewletTitleBarMenuBarHandleMouseOver.ts'

export const handlePointerOver = (state: TitleBarMenuBarState, name: string): TitleBarMenuBarState | Promise<TitleBarMenuBarState> => {
  const { titleBarEntries } = state
  const index = titleBarEntries.findIndex((item) => item.label === name)
  if (index === -1) {
    return state
  }
  return ViewletTitleBarMenuBarHandleMouseOver.handleMouseOver(state, index)
}
