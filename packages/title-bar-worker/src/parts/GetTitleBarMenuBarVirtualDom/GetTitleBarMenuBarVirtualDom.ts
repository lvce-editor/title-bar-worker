import { VirtualDomElements, AriaRoles } from '@lvce-editor/virtual-dom-worker'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import type { VisibleMenuItem } from '../VisibleMenuItem/VisibleMenuItem.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as GetTitleBarMenubarItemsVirtualDom from '../GetTitleBarMenuBarItemsVirtualDom/GetTitleBarMenuBarItemsVirtualDom.ts'
import * as MergeClassNames from '../MergeClassNames/MergeClassNames.ts'

const activeId = 'TitleBarEntryActive'

export const getTitleBarMenuBarVirtualDom = (visibleItems: readonly VisibleMenuItem[], focusedIndex: number): readonly VirtualDomNode[] => {
  return [
    {
      ariaActivedescendant: focusedIndex === -1 ? '' : activeId,
      childCount: visibleItems.length,
      className: MergeClassNames.mergeClassNames(ClassNames.Viewlet, ClassNames.TitleBarMenuBar),
      onFocusIn: DomEventListenerFunctions.HandleFocusIn,
      onFocusOut: DomEventListenerFunctions.HandleFocusOut,
      onMouseDown: DomEventListenerFunctions.HandleClick,
      onPointerOut: DomEventListenerFunctions.HandlePointerOut,
      onPointerOver: DomEventListenerFunctions.HandlePointerOver,
      role: AriaRoles.MenuBar,
      tabIndex: 0,
      type: VirtualDomElements.Div,
    },
    ...GetTitleBarMenubarItemsVirtualDom.getTitleBarMenuBarItemsVirtualDom(visibleItems),
  ]
}
