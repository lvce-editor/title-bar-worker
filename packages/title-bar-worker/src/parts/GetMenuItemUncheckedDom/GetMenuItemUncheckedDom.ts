import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import type { VisibleMenuItem } from '../VisibleMenuItem/VisibleMenuItem.ts'
import * as AriaRoles from '../AriaRoles/AriaRoles.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as VirtualDomElements from '../VirtualDomElements/VirtualDomElements.ts'
import { text } from '../VirtualDomHelpers/VirtualDomHelpers.ts'

const checkboxUnchecked: VirtualDomNode = {
  type: VirtualDomElements.Div,
  className: ClassNames.MenuItem,
  role: AriaRoles.MenuItemCheckBox,
  ariaChecked: false,
  tabIndex: -1,
  childCount: 1,
}

export const getMenuItemUncheckedDom = (menuItem: VisibleMenuItem): readonly VirtualDomNode[] => {
  const { label } = menuItem
  return [checkboxUnchecked, text(label)]
}
