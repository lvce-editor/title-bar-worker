import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import type { VisibleMenuItem } from '../VisibleMenuItem/VisibleMenuItem.ts'
import * as GetMenuItemRenderer from '../GetMenuItemRenderer/GetMenuItemRenderer.ts'

export const getMenuItemVirtualDom = (menuItem: VisibleMenuItem): readonly VirtualDomNode[] => {
  const { flags } = menuItem
  const fn = GetMenuItemRenderer.getMenuItemRenderer(flags)
  return fn(menuItem)
}
