import type { TitleBarMenuBarState } from '../TitleBarMenuBarState/TitleBarMenuBarState.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import { getIcon } from '../GetIcon/GetIcon.ts'
import { getTitleBarButtonsVirtualDom } from '../GetTitleBarButtonsVirtualDom/GetTitleBarButtonsVirtualDom.ts'
import { getTitleBarIconVirtualDom } from '../GetTitleBarIconVirtualDom/GetTitleBarIconVirtualDom.ts'
import * as GetTitleBarMenuBarVirtualDom from '../GetTitleBarMenuBarVirtualDom/GetTitleBarMenuBarVirtualDom.ts'
import { getTitleVirtualDom } from '../GetTitleVirtualDom/GetTitleVirtualDom.ts'
import { getVisibleTitleBarEntries } from '../GetVisibleTitleBarEntries/GetVisibleTitleBarEntries.ts'

export const renderItems = (state: TitleBarMenuBarState): readonly VirtualDomNode[] => {
  const {
    assetDir,
    focusedIndex,
    isMenuOpen,
    title,
    titleBarButtons,
    titleBarButtonsEnabled,
    titleBarEntries,
    titleBarIconEnabled,
    titleBarMenuBarEnabled,
    titleBarTitleEnabled,
    width,
  } = state
  const visibleEntries = getVisibleTitleBarEntries(titleBarEntries, width, focusedIndex, isMenuOpen)
  const iconSrc = getIcon(assetDir)
  const iconDom = getTitleBarIconVirtualDom(titleBarIconEnabled, iconSrc)
  const menuBarDom = GetTitleBarMenuBarVirtualDom.getTitleBarMenuBarVirtualDom(titleBarMenuBarEnabled, visibleEntries, focusedIndex)
  const titleDom = getTitleVirtualDom(titleBarTitleEnabled, title)
  const buttonsDom = getTitleBarButtonsVirtualDom(titleBarButtonsEnabled, titleBarButtons)
  const dom = [...iconDom, ...menuBarDom, ...titleDom, ...buttonsDom]
  return dom
}
