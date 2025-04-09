import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import type { VisibleMenuItem } from '../VisibleMenuItem/VisibleMenuItem.ts'

export interface MenuItemRenderer {
  (menuItem: VisibleMenuItem): readonly VirtualDomNode[]
}
