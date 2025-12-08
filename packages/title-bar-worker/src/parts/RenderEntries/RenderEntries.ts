import type { TitleBarMenuBarState } from '../TitleBarMenuBarState/TitleBarMenuBarState.ts'
import * as GetTitleBarMenuBarVirtualDom from '../GetTitleBarMenuBarVirtualDom/GetTitleBarMenuBarVirtualDom.ts'
import * as GetVisibleTitleBarEntries from '../GetVisibleTitleBarEntries/GetVisibleTitleBarEntries.ts'

export const renderEntries = (oldState: TitleBarMenuBarState, newState: TitleBarMenuBarState): readonly any[] => {
  const visibleEntries = GetVisibleTitleBarEntries.getVisibleTitleBarEntries(
    newState.titleBarEntries,
    newState.width,
    newState.focusedIndex,
    newState.isMenuOpen,
  )
  const dom = GetTitleBarMenuBarVirtualDom.getTitleBarMenuBarVirtualDom(newState.titleBarMenuBarEnabled, visibleEntries, newState.focusedIndex)
  return ['Viewlet.setDom2', newState.uid, dom]
}
