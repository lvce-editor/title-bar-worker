import type { TitleBarMenuBarState } from '../TitleBarMenuBarState/TitleBarMenuBarState.ts'
import * as GetNavigableTitleBarEntries from '../GetNavigableTitleBarEntries/GetNavigableTitleBarEntries.ts'
import * as ViewletTitleBarMenuBarHandleMouseOver from '../TitleBarMenuBar/ViewletTitleBarMenuBarHandleMouseOver.ts'

export const handlePointerOver = (state: TitleBarMenuBarState, name: string): TitleBarMenuBarState | Promise<TitleBarMenuBarState> => {
  const titleBarEntries = GetNavigableTitleBarEntries.getNavigableTitleBarEntries(state)
  const index = titleBarEntries.findIndex((item) => item.label === name)
  if (index === -1) {
    return state
  }
  return ViewletTitleBarMenuBarHandleMouseOver.handleMouseOver(state, index)
}
