import { AriaRoles, VirtualDomElements } from '@lvce-editor/constants'
import type { TitleBarMenuBarState } from '../TitleBarMenuBarState/TitleBarMenuBarState.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import { getIcon } from '../GetIcon/GetIcon.ts'
import * as GetTitleBarButtonsVirtualDom from '../GetTitleBarButtonsVirtualDom/GetTitleBarButtonsVirtualDom.ts'
import { getTitleBarIconVirtualDom } from '../GetTitleBarIconVirtualDom/GetTitleBarIconVirtualDom.ts'
import * as GetTitleBarMenuBarVirtualDom from '../GetTitleBarMenuBarVirtualDom/GetTitleBarMenuBarVirtualDom.ts'
import { getTitleVirtualDom } from '../GetTitleVirtualDom/GetTitleVirtualDom.ts'
import { getVisibleTitleBarEntries } from '../GetVisibleTitleBarEntries/GetVisibleTitleBarEntries.ts'

export const getTitleBarVirtualDom = (state: TitleBarMenuBarState): readonly VirtualDomNode[] => {
  const { titleBarEntries, width, focusedIndex, isMenuOpen, assetDir, title, titleBarButtons } = state
  const dom: VirtualDomNode[] = [
    {
      type: VirtualDomElements.Div,
      className: 'Viewlet TitleBar',
      id: 'TitleBar',
      role: AriaRoles.ContentInfo,
      ariaLabel: 'Title Bar',
      childCount: 4,
    },
  ]

  // Add icon if enabled
  if (state.titleBarIconEnabled) {
    const iconSrc = getIcon(assetDir)
    const iconDom = getTitleBarIconVirtualDom(iconSrc)
    dom.push(...iconDom)
  }

  // Add menu bar if enabled
  if (state.titleBarMenuBarEnabled) {
    const visibleEntries = getVisibleTitleBarEntries(titleBarEntries, width, focusedIndex, isMenuOpen)
    const menuBarDom = GetTitleBarMenuBarVirtualDom.getTitleBarMenuBarVirtualDom(visibleEntries, focusedIndex)
    dom.push(...menuBarDom)
  }

  // Add title if enabled
  if (state.titleBarTitleEnabled) {
    const titleDom = getTitleVirtualDom(title)
    dom.push(...titleDom)
  }

  // Add buttons if enabled
  if (state.titleBarButtonsEnabled) {
    const buttonsDom = GetTitleBarButtonsVirtualDom.getTitleBarButtonsVirtualDom(titleBarButtons)
    dom.push(...buttonsDom)
  }

  return dom
}
