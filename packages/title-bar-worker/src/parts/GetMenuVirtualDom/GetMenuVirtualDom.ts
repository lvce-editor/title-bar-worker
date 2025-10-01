import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import type { VisibleMenuItem } from '../VisibleMenuItem/VisibleMenuItem.ts'
import * as AriaRoles from '../AriaRoles/AriaRoles.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import { getMenuItemVirtualDom } from '../GetMenuItemVirtualDom/GetMenuItemVirtualDom.ts'

export const getMenuVirtualDom = (menuItems: readonly VisibleMenuItem[]): readonly VirtualDomNode[] => {
  const dom: readonly VirtualDomNode[] = [
    {
      type: VirtualDomElements.Div,
      className: ClassNames.Menu,
      role: AriaRoles.Menu,
      tabIndex: -1,
      childCount: menuItems.length,
    },
    ...menuItems.flatMap(getMenuItemVirtualDom),
  ]
  return dom
}
