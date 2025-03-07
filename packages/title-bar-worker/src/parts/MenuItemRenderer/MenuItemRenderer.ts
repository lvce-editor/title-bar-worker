import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'

export interface MenuItemRenderer {
  (menuItem: any): readonly VirtualDomNode[]
}
