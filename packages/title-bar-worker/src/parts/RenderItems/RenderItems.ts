import type { TitleBarMenuBarState } from '../TitleBarMenuBarState/TitleBarMenuBarState.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as GetTitleBarMenuBarVirtualDom from '../GetTitleBarMenuBarVirtualDom/GetTitleBarMenuBarVirtualDom.ts'
import { getVisibleTitleBarEntries } from '../GetVisibleTitleBarEntries/GetVisibleTitleBarEntries.ts'

export const renderItems = (state: TitleBarMenuBarState): readonly VirtualDomNode[] => {
  const { titleBarEntries, width, focusedIndex, isMenuOpen } = state
  const visibleEntries = getVisibleTitleBarEntries(titleBarEntries, width, focusedIndex, isMenuOpen)
  const dom = GetTitleBarMenuBarVirtualDom.getTitleBarMenuBarVirtualDom(visibleEntries, focusedIndex)
  return dom
}
