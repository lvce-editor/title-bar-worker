import type { TitleBarMenuBarState } from '../TitleBarMenuBarState/TitleBarMenuBarState.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import { getIcon } from '../GetIcon/GetIcon.ts'
import { getTitleBarButtonsVirtualDom } from '../GetTitleBarButtonsVirtualDom/GetTitleBarButtonsVirtualDom.ts'
import { getTitleBarIconVirtualDom } from '../GetTitleBarIconVirtualDom/GetTitleBarIconVirtualDom.ts'
import * as GetTitleBarMenuBarVirtualDom from '../GetTitleBarMenuBarVirtualDom/GetTitleBarMenuBarVirtualDom.ts'
import { getTitleVirtualDom } from '../GetTitleVirtualDom/GetTitleVirtualDom.ts'
import { getVisibleTitleBarEntries } from '../GetVisibleTitleBarEntries/GetVisibleTitleBarEntries.ts'

export const renderItems = (state: TitleBarMenuBarState): readonly VirtualDomNode[] => {
  const { assetDir, buttons, focusedIndex, isMenuOpen, title, titleBarEntries, width } = state
  const visibleEntries = getVisibleTitleBarEntries(titleBarEntries, width, focusedIndex, isMenuOpen)
  const iconSrc = getIcon(assetDir)
  const iconDom = getTitleBarIconVirtualDom(iconSrc)
  const menuBarDom = GetTitleBarMenuBarVirtualDom.getTitleBarMenuBarVirtualDom(visibleEntries, focusedIndex)
  const titleDom = getTitleVirtualDom(title)
  const buttonsDom = getTitleBarButtonsVirtualDom(buttons)
  const dom = [...iconDom, ...menuBarDom, ...titleDom, ...buttonsDom]
  return dom
}
