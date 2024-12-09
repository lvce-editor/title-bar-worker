import * as AriaRoles from '../AriaRoles/AriaRoles.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as GetTitleBarMenubarItemsVirtualDom from '../GetTitleBarMenuBarItemsVirtualDom/GetTitleBarMenuBarItemsVirtualDom.ts'
import * as VirtualDomElements from '../VirtualDomElements/VirtualDomElements.ts'

export const getTitleBarMenuBarVirtualDom = (visibleItems: any): any => {
  return [
    {
      type: VirtualDomElements.Div,
      className: 'Viewlet TitleBarMenuBar',
      role: AriaRoles.MenuBar,
      tabIndex: 0,
      childCount: visibleItems.length,
      onMouseDown: DomEventListenerFunctions.HandleClick,
      onFocusOut: DomEventListenerFunctions.HandleFocusOut,
      onFocusIn: DomEventListenerFunctions.HandleFocusIn,
      onPointerOver: DomEventListenerFunctions.HandlePointerOver,
      onPointerOut: DomEventListenerFunctions.HandlePointerOut,
    },
    ...GetTitleBarMenubarItemsVirtualDom.getTitleBarMenuBarItemsVirtualDom(visibleItems),
  ]
}
