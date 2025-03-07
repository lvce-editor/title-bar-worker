import * as AriaRoles from '../AriaRoles/AriaRoles.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as VirtualDomElements from '../VirtualDomElements/VirtualDomElements.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'

const separator: VirtualDomNode = {
  type: VirtualDomElements.Div,
  className: ClassNames.MenuItemSeparator,
  role: AriaRoles.Separator,
  childCount: 1,
}

const separatorLine: VirtualDomNode = {
  type: VirtualDomElements.Div,
  className: ClassNames.MenuItemSeparatorLine,
  childCount: 0,
}

export const getMenuItemSeparatorDom = (menuItem: any): readonly VirtualDomNode[] => {
  return [separator, separatorLine]
}
