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
  const dom: VirtualDomNode[] = [
    {
      ariaLabel: 'Title Bar',
      childCount: 4,
      className: 'Viewlet TitleBar',
      id: 'TitleBar',
      role: AriaRoles.ContentInfo,
      type: VirtualDomElements.Div,
    },
  ]

  const iconSrc = getIcon(assetDir)
  const iconDom = getTitleBarIconVirtualDom(titleBarIconEnabled, iconSrc)
  dom.push(...iconDom)

  const visibleEntries = getVisibleTitleBarEntries(titleBarEntries, width, focusedIndex, isMenuOpen)
  const menuBarDom = GetTitleBarMenuBarVirtualDom.getTitleBarMenuBarVirtualDom(titleBarMenuBarEnabled, visibleEntries, focusedIndex)
  dom.push(...menuBarDom)

  const titleDom = getTitleVirtualDom(titleBarTitleEnabled, title)
  dom.push(...titleDom)

  const buttonsDom = GetTitleBarButtonsVirtualDom.getTitleBarButtonsVirtualDom(titleBarButtonsEnabled, titleBarButtons)
  dom.push(...buttonsDom)

  return dom
}
