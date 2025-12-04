import { VirtualDomElements, AriaRoles } from '@lvce-editor/virtual-dom-worker'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import type { VisibleMenuItem } from '../VisibleMenuItem/VisibleMenuItem.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'

const separator: VirtualDomNode = {
  childCount: 1,
  className: ClassNames.MenuItemSeparator,
  role: AriaRoles.Separator,
  type: VirtualDomElements.Div,
}

const separatorLine: VirtualDomNode = {
  childCount: 0,
  className: ClassNames.MenuItemSeparatorLine,
  type: VirtualDomElements.Div,
}

export const getMenuItemSeparatorDom = (menuItem: VisibleMenuItem): readonly VirtualDomNode[] => {
  return [separator, separatorLine]
}
