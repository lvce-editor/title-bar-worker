import { AriaRoles, PlatformType, VirtualDomElements } from '@lvce-editor/constants'
import type { TitleBarMenuBarState } from '../TitleBarMenuBarState/TitleBarMenuBarState.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
<<<<<<< HEAD
import * as ClassNames from '../ClassNames/ClassNames.ts'
=======
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
>>>>>>> origin/main
import { getIcon } from '../GetIcon/GetIcon.ts'
import * as GetTitleBarButtonsVirtualDom from '../GetTitleBarButtonsVirtualDom/GetTitleBarButtonsVirtualDom.ts'
import { getTitleBarIconVirtualDom } from '../GetTitleBarIconVirtualDom/GetTitleBarIconVirtualDom.ts'
import * as GetTitleBarMenuBarVirtualDom from '../GetTitleBarMenuBarVirtualDom/GetTitleBarMenuBarVirtualDom.ts'
import { getTitleVirtualDom } from '../GetTitleVirtualDom/GetTitleVirtualDom.ts'
import { getVisibleTitleBarEntries } from '../GetVisibleTitleBarEntries/GetVisibleTitleBarEntries.ts'
import * as MergeClassNames from '../MergeClassNames/MergeClassNames.ts'
import * as TitleBarStrings from '../TitleBarStrings/TitleBarStrings.ts'

export const getTitleBarVirtualDom = (state: TitleBarMenuBarState): readonly VirtualDomNode[] => {
  const {
    assetDir,
    focusedIndex,
    isMenuOpen,
    platform,
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
  if (platform === PlatformType.Electron && !titleBarStyleCustom) {
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
      ariaLabel: TitleBarStrings.titleBar(),
      childCount: 4,
      className: MergeClassNames.mergeClassNames(ClassNames.Viewlet, ClassNames.TitleBar),
      id: 'TitleBar',
      onContextMenu: DomEventListenerFunctions.HandleTitleBarContextMenu,
      role: AriaRoles.ContentInfo,
      type: VirtualDomElements.Div,
    },
    ...getTitleBarIconVirtualDom(titleBarIconEnabled, iconSrc),
    ...GetTitleBarMenuBarVirtualDom.getTitleBarMenuBarVirtualDom(titleBarMenuBarEnabled, visibleEntries, focusedIndex),
    ...getTitleVirtualDom(titleBarTitleEnabled, title),
    ...GetTitleBarButtonsVirtualDom.getTitleBarButtonsVirtualDom(titleBarButtonsEnabled, titleBarButtons),
  ]
}
