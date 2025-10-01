import { VirtualDomElements, AriaRoles } from '@lvce-editor/virtual-dom-worker'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as GetTitleBarMenubarItemsVirtualDom from '../GetTitleBarMenuBarItemsVirtualDom/GetTitleBarMenuBarItemsVirtualDom.ts'
import * as MergeClassNames from '../MergeClassNames/MergeClassNames.ts'
const activeId = 'TitleBarEntryActive'

export const getTitleBarMenuBarVirtualDom = (visibleItems: any, focusedIndex: number): readonly VirtualDomNode[] => {
  return [
    {
      type: VirtualDomElements.Div,
      className: MergeClassNames.mergeClassNames(ClassNames.Viewlet, ClassNames.TitleBarMenuBar),
      role: AriaRoles.MenuBar,
      tabIndex: 0,
      childCount: visibleItems.length,
      onMouseDown: DomEventListenerFunctions.HandleClick,
      onFocusOut: DomEventListenerFunctions.HandleFocusOut,
      onFocusIn: DomEventListenerFunctions.HandleFocusIn,
      onPointerOver: DomEventListenerFunctions.HandlePointerOver,
      onPointerOut: DomEventListenerFunctions.HandlePointerOut,
      ariaActivedescendant: focusedIndex === -1 ? '' : activeId,
    },
    ...GetTitleBarMenubarItemsVirtualDom.getTitleBarMenuBarItemsVirtualDom(visibleItems),
  ]
}
