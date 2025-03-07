import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as GetMenuItemRenderer from '../GetMenuItemRenderer/GetMenuItemRenderer.ts'

export const getMenuItemVirtualDom = (menuItem: any): readonly VirtualDomNode[] => {
  const { flags } = menuItem
  const fn = GetMenuItemRenderer.getMenuItemRenderer(flags)
  return fn(menuItem)
}
