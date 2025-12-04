import { VirtualDomElements, AriaRoles } from '@lvce-editor/virtual-dom-worker'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import type { VisibleMenuItem } from '../VisibleMenuItem/VisibleMenuItem.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import { text } from '../VirtualDomHelpers/VirtualDomHelpers.ts'

const checkboxUnchecked: VirtualDomNode = {
  ariaChecked: false,
  childCount: 1,
  className: ClassNames.MenuItem,
  role: AriaRoles.MenuItemCheckBox,
  tabIndex: -1,
  type: VirtualDomElements.Div,
}

export const getMenuItemUncheckedDom = (menuItem: VisibleMenuItem): readonly VirtualDomNode[] => {
  const { label } = menuItem
  return [checkboxUnchecked, text(label)]
}
