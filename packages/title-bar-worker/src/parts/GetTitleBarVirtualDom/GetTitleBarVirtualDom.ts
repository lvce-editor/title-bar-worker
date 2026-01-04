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
    titleBarStyleCustom,
    titleBarTitleEnabled,
    width,
  } = state
  if (titleBarStyleCustom) {
    return [
      {
        childCount: 0,
        type: VirtualDomElements.Div,
      },
    ]
  }
  const iconSrc = getIcon(assetDir)
  const visibleEntries = getVisibleTitleBarEntries(titleBarEntries, width, focusedIndex, isMenuOpen)

  return [
    {
      ariaLabel: 'Title Bar', // TODO i18n string
      childCount: 4,
      className: 'Viewlet TitleBar',
      id: 'TitleBar',
      role: AriaRoles.ContentInfo,
      type: VirtualDomElements.Div,
    },
    ...getTitleBarIconVirtualDom(titleBarIconEnabled, iconSrc),
    ...GetTitleBarMenuBarVirtualDom.getTitleBarMenuBarVirtualDom(titleBarMenuBarEnabled, visibleEntries, focusedIndex),
    ...getTitleVirtualDom(titleBarTitleEnabled, title),
    ...GetTitleBarButtonsVirtualDom.getTitleBarButtonsVirtualDom(titleBarButtonsEnabled, titleBarButtons),
  ]
}
